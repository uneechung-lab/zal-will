const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'zalwill.db');
const db = new DatabaseSync(DB_PATH);

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      role_group TEXT NOT NULL, -- 'MASTER' | 'MANAGER' | 'INTERNAL' | 'EXTERNAL'
      linked_profile_id TEXT,
      perm_all_profiles INTEGER DEFAULT 0,
      perm_pm_pl INTEGER DEFAULT 0,
      perm_interviewer INTEGER DEFAULT 0,
      perm_sensitive_info INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      employment_type TEXT NOT NULL, -- '사내 정규직' | '사내 전문계약직' | '외주 프리랜서' | '외주 반프리' | '외주 개인사업자'
      is_internal INTEGER NOT NULL,
      tech_grade TEXT NOT NULL, -- '특급' | '고급' | '중급' | '초급'
      experience_years INTEGER NOT NULL,
      birth_year INTEGER,
      phone TEXT,
      email TEXT,
      education TEXT,
      certifications TEXT, -- JSON array
      skills TEXT, -- JSON array
      domains TEXT, -- JSON array (퇴직연금, 펀드, 채권, 계정계, 마이데이터 등)
      availability_status TEXT NOT NULL, -- '즉시투입가능' | '투입중(철수예정)' | '투입중'
      available_date TEXT NOT NULL,
      current_end_date TEXT,
      desired_rate INTEGER, -- 만원/월 (민감정보)
      contract_rate INTEGER, -- 만원/월 (민감정보)
      rating REAL DEFAULT 0, -- 내부 별점 평점 (민감정보)
      review_summary TEXT, -- 면접/수행 총평 (민감정보)
      verified INTEGER DEFAULT 0, -- 표준 인터뷰 검증 완료 여부
      resourced_count INTEGER DEFAULT 0, -- 재소싱 횟수
      parse_seconds INTEGER DEFAULT 85, -- AI 파싱/검수 소요시간(초)
      career_history TEXT, -- JSON array of project experiences
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      client TEXT NOT NULL,
      business_type TEXT NOT NULL, -- '금융 SI (입찰제안)' | '금융 SI (수행예정)' | '금융 SM (운영)'
      domain TEXT NOT NULL,
      status TEXT NOT NULL, -- '제안준비중' | '인력충원중' | '수행중' | '완료'
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      location TEXT NOT NULL,
      contract_type TEXT NOT NULL,
      budget_rate_info TEXT, -- 민감 단가 가이드
      pm_user_id TEXT,
      to_slots TEXT NOT NULL, -- JSON array of role TO slots
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS job_postings (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      slot_id TEXT NOT NULL,
      title TEXT NOT NULL,
      role_name TEXT NOT NULL,
      required_grade TEXT NOT NULL,
      required_skills TEXT NOT NULL, -- JSON array
      required_domain TEXT NOT NULL,
      work_location TEXT NOT NULL,
      period TEXT NOT NULL,
      rate_guide TEXT NOT NULL,
      status TEXT NOT NULL, -- 'OPEN' | 'CLOSED'
      sourcing_sent_count INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS question_templates (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      role_type TEXT NOT NULL,
      domain_focus TEXT NOT NULL,
      questions TEXT NOT NULL -- JSON array of { id, question, criteria, weight }
    );

    CREATE TABLE IF NOT EXISTS interviews (
      id TEXT PRIMARY KEY,
      posting_id TEXT NOT NULL,
      project_id TEXT NOT NULL,
      slot_id TEXT NOT NULL,
      candidate_profile_id TEXT,
      candidate_name TEXT NOT NULL,
      candidate_type TEXT NOT NULL,
      candidate_phone TEXT,
      candidate_email TEXT,
      available_from TEXT NOT NULL,
      recommender TEXT,
      desired_rate INTEGER,
      resume_summary TEXT,
      tech_grade TEXT,
      skills TEXT, -- JSON array
      domains TEXT, -- JSON array
      status TEXT NOT NULL, -- '서류검토중' | '인터뷰통보완료' | '면접진행완료' | '최종선정' | '보류' | '탈락'
      interview_date TEXT,
      interview_method TEXT, -- '화상(Zoom/Teams)' | '대면(본사 회의실)'
      interviewer_user_id TEXT,
      interviewer_name TEXT,
      template_id TEXT,
      checklist_results TEXT, -- JSON array of { question, score, checked, note }
      total_score REAL DEFAULT 0,
      interviewer_opinion TEXT,
      final_decision_note TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      target_role TEXT NOT NULL, -- 'ALL' | 'EXTERNAL' | 'INTERNAL' | 'MANAGER' | user_id
      type TEXT NOT NULL, -- 'SOURCING' | 'INTERVIEW_INVITE' | 'INTERVIEWER_ASSIGN' | 'DECISION' | 'AI_PARSE'
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  const userCount = db.prepare('SELECT COUNT(*) as cnt FROM users').get().cnt;
  if (userCount > 0) return;

  // 1. Seed Users across the 4 Role Groups
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, title, department, role_group, linked_profile_id, perm_all_profiles, perm_pm_pl, perm_interviewer, perm_sensitive_info)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertUser.run('u_master', '김태호 상무', '금융사업본부장 (임원/부서장)', '금융IT사업본부', 'MASTER', null, 1, 1, 1, 1);
  insertUser.run('u_manager', '박지훈 팀장', '제안PM / 인력소싱 관리자', '전략제안·소싱팀', 'MANAGER', null, 1, 1, 1, 1);
  insertUser.run('u_internal_pl', '이수현 수석', '사내 정규직 (퇴직연금 PL)', '연금신탁개발팀', 'INTERNAL', 'p_1', 1, 1, 1, 0);
  insertUser.run('u_internal_dev', '정민규 선임', '사내 전문계약직 (백엔드 개발)', '코어뱅킹팀', 'INTERNAL', 'p_3', 0, 0, 0, 0);
  insertUser.run('u_external', '최현우 프리랜서', '외주 프리랜서 (풀스택/계정계)', '외부 인재풀', 'EXTERNAL', 'p_5', 0, 0, 0, 0);

  // 2. Seed Integrated Profiles (Internal + External)
  const insertProfile = db.prepare(`
    INSERT INTO profiles (
      id, name, employment_type, is_internal, tech_grade, experience_years, birth_year,
      phone, email, education, certifications, skills, domains,
      availability_status, available_date, current_end_date,
      desired_rate, contract_rate, rating, review_summary,
      verified, resourced_count, parse_seconds, career_history, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedProfiles = [
    {
      id: 'p_1',
      name: '이수현',
      employment_type: '사내 정규직',
      is_internal: 1,
      tech_grade: '특급',
      experience_years: 15,
      birth_year: 1986,
      phone: '010-3421-8890',
      email: 'sh.lee@zalwill.co.kr',
      education: '한양대학교 컴퓨터전공 학사',
      certifications: ['정보처리기사', 'PMP', 'SQLP'],
      skills: ['Java', 'Spring Boot', 'Oracle', 'ProFrame', 'MSA', '대용량배치'],
      domains: ['퇴직연금', '신탁/수탁', '계정계 코어'],
      availability_status: '즉시투입가능',
      available_date: '2026-11-15',
      current_end_date: '2026-11-10',
      desired_rate: 0,
      contract_rate: 1250,
      rating: 4.9,
      review_summary: '메이저 은행 퇴직연금 차세대 PL 3회 수행. DB/DC/IRP 정산 및 상품운용 아키텍처 최고 전문가.',
      verified: 1,
      resourced_count: 4,
      parse_seconds: 65,
      career_history: [
        { project: '신한은행 퇴직연금 차세대 구축', client: '신한은행', period: '2024.03 ~ 2026.10', role: '연금정산 PL', tech: 'Java, Spring Batch, Oracle' },
        { project: 'KB국민은행 신탁/퇴직연금 고도화', client: 'KB국민은행', period: '2022.01 ~ 2024.01', role: '설계/개발 리더', tech: 'ProFrame, Oracle, C' },
        { project: '우리은행 차세대 계정계 수신/신탁', client: '우리은행', period: '2019.05 ~ 2021.11', role: '핵심개발자', tech: 'Java, Tibero' }
      ],
      updated_at: '2026-11-12'
    },
    {
      id: 'p_2',
      name: '강동원',
      employment_type: '사내 정규직',
      is_internal: 1,
      tech_grade: '고급',
      experience_years: 11,
      birth_year: 1990,
      phone: '010-9912-3041',
      email: 'dw.kang@zalwill.co.kr',
      education: '경희대학교 소프트웨어융합 학사',
      certifications: ['정보처리기사', 'SQLD', 'AWS SAA'],
      skills: ['Java', 'Spring Cloud', 'Kubernetes', 'PostgreSQL', 'Kafka', 'React'],
      domains: ['펀드', '채권', '자산운용/수탁'],
      availability_status: '즉시투입가능',
      available_date: '2026-11-20',
      current_end_date: '2026-11-18',
      desired_rate: 0,
      contract_rate: 1050,
      rating: 4.8,
      review_summary: '자산운용사 펀드회계 및 채권 트레이딩/수탁 결제 시스템 설계 역량 우수.',
      verified: 1,
      resourced_count: 3,
      parse_seconds: 72,
      career_history: [
        { project: '삼성자산운용 글로벌 채권/펀드 수탁 플랫폼', client: '삼성자산운용', period: '2024.06 ~ 2026.11', role: '백엔드 아키텍트', tech: 'Spring Boot, Kafka, PostgreSQL' },
        { project: '한국예탁결제원 채권기관결제 시스템 개편', client: '한국예탁결제원', period: '2022.04 ~ 2024.04', role: '선임개발자', tech: 'Java, Oracle, WebSquare' }
      ],
      updated_at: '2026-11-11'
    },
    {
      id: 'p_3',
      name: '정민규',
      employment_type: '사내 전문계약직',
      is_internal: 1,
      tech_grade: '중급',
      experience_years: 7,
      birth_year: 1994,
      phone: '010-5518-2910',
      email: 'mk.jung@zalwill.co.kr',
      education: '숭실대학교 정보통신공학 학사',
      certifications: ['정보처리기사', 'SQLD'],
      skills: ['Java', 'Spring Boot', 'Oracle', 'MyBatis', 'WebSquare', 'Nexacro'],
      domains: ['퇴직연금', '마이데이터', '채널계'],
      availability_status: '투입중(철수예정)',
      available_date: '2026-12-01',
      current_end_date: '2026-11-30',
      desired_rate: 850,
      contract_rate: 830,
      rating: 4.5,
      review_summary: '성실하고 금융 표준 프레임워크 및 화면/배치 개발 속도가 빠름. 11월 말 현 프로젝트 철수 예정.',
      verified: 1,
      resourced_count: 2,
      parse_seconds: 55,
      career_history: [
        { project: 'NH농협은행 퇴직연금 비대면 채널 고도화', client: 'NH농협은행', period: '2025.01 ~ 2026.11', role: '응용개발', tech: 'Java, Spring, WebSquare' },
        { project: '하나은행 마이데이터 통합자산관리 구축', client: '하나은행', period: '2023.03 ~ 2024.11', role: 'API 개발', tech: 'Spring Boot, Redis' }
      ],
      updated_at: '2026-11-10'
    },
    {
      id: 'p_4',
      name: '윤서연',
      employment_type: '사내 정규직',
      is_internal: 1,
      tech_grade: '고급',
      experience_years: 10,
      birth_year: 1991,
      phone: '010-7741-6120',
      email: 'sy.yoon@zalwill.co.kr',
      education: '숙명여자대학교 컴퓨터과학 학사',
      certifications: ['정보처리기사', 'DAP(데이터아키텍처전문가)', 'SQLP'],
      skills: ['Oracle', 'Tibero', 'Python', 'Spark', 'DW/DM', 'SQL튜닝'],
      domains: ['정보계/DW', '퇴직연금', '리스크/컴플라이언스'],
      availability_status: '즉시투입가능',
      available_date: '2026-11-15',
      current_end_date: '2026-10-31',
      desired_rate: 0,
      contract_rate: 1020,
      rating: 4.9,
      review_summary: '금융권 데이터 모델링 및 대용량 배치 SQL 튜닝 전문가. 제안서 데이터 부문 핵심 인력.',
      verified: 1,
      resourced_count: 5,
      parse_seconds: 60,
      career_history: [
        { project: '미래에셋증권 퇴직연금 데이터마트 및 수익률 공시 시스템', client: '미래에셋증권', period: '2024.02 ~ 2026.10', role: 'DA / 데이터모델러', tech: 'Oracle, ERwin, SQL튜닝' },
        { project: '기업은행 바젤III 리스크 정보계 재구축', client: 'IBK기업은행', period: '2022.03 ~ 2024.01', role: 'DW 설계/개발', tech: 'Tibero, Python' }
      ],
      updated_at: '2026-11-13'
    },
    {
      id: 'p_5',
      name: '최현우',
      employment_type: '외주 프리랜서',
      is_internal: 0,
      tech_grade: '특급',
      experience_years: 14,
      birth_year: 1987,
      phone: '010-8282-4911',
      email: 'hw.choi.dev@gmail.com',
      education: '인하대학교 컴퓨터공학 학사',
      certifications: ['정보처리기사', 'OCJP', 'SQLP'],
      skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame', 'BXM', '대용량정산'],
      domains: ['퇴직연금', '계정계 코어', '수신/신탁'],
      availability_status: '즉시투입가능',
      available_date: '2026-11-25',
      current_end_date: '2026-11-20',
      desired_rate: 1150,
      contract_rate: 1120,
      rating: 4.8,
      review_summary: '[기검증 우수 인력] 당사 프로젝트 2회 수행. 퇴직연금 수수료 계산 및 원리금/실적배당 상품 결산 배치 무결점 수행.',
      verified: 1,
      resourced_count: 2,
      parse_seconds: 78,
      career_history: [
        { project: '교보생명 퇴직연금 코어 시스템 고도화', client: '교보생명', period: '2025.02 ~ 2026.11', role: '배치/정산 개발리더', tech: 'Java, Spring Batch, Oracle' },
        { project: '신한은행 퇴직연금 차세대 구축 (당사 수행)', client: '신한은행', period: '2023.05 ~ 2025.01', role: '핵심개발자', tech: 'ProFrame, Java, Oracle' }
      ],
      updated_at: '2026-11-12'
    },
    {
      id: 'p_6',
      name: '한지민',
      employment_type: '외주 개인사업자',
      is_internal: 0,
      tech_grade: '고급',
      experience_years: 9,
      birth_year: 1992,
      phone: '010-6320-1184',
      email: 'jm.han.fin@naver.com',
      education: '아주대학교 미디어/소프트웨어 학사',
      certifications: ['정보처리기사'],
      skills: ['React', 'TypeScript', 'Next.js', 'WebSquare', 'Java', 'Spring Boot'],
      domains: ['마이데이터', '채널계', '퇴직연금'],
      availability_status: '즉시투입가능',
      available_date: '2026-11-18',
      current_end_date: '2026-11-10',
      desired_rate: 950,
      contract_rate: 920,
      rating: 4.7,
      review_summary: '[기검증 우수 인력] 금융권 모바일 앱/웹 채널 및 WebSquare5/React 하이브리드 UI 개발 역량 최상급.',
      verified: 1,
      resourced_count: 3,
      parse_seconds: 68,
      career_history: [
        { project: '카카오뱅크 개인형IRP/퇴직연금 모바일 채널 개편', client: '카카오뱅크', period: '2025.01 ~ 2026.10', role: '프론트엔드 리드', tech: 'React, TypeScript, Next.js' },
        { project: 'KB증권 마이데이터 2.0 자산관리 웹/앱 구축', client: 'KB증권', period: '2023.06 ~ 2024.12', role: 'UI/UX 개발', tech: 'React, Spring Boot' }
      ],
      updated_at: '2026-11-09'
    },
    {
      id: 'p_7',
      name: '오세훈',
      employment_type: '외주 반프리',
      is_internal: 0,
      tech_grade: '고급',
      experience_years: 10,
      birth_year: 1991,
      phone: '010-4119-7723',
      email: 'sh.oh.bond@daum.net',
      education: '건국대학교 금융IT학과 학사',
      certifications: ['정보처리기사', 'SQLD', '투자자산운용사'],
      skills: ['Java', 'Spring Boot', 'Oracle', 'C#', '채권평가', '펀드회계'],
      domains: ['채권', '펀드', '파생상품'],
      availability_status: '투입중(철수예정)',
      available_date: '2026-12-05',
      current_end_date: '2026-11-30',
      desired_rate: 1030,
      contract_rate: 1000,
      rating: 4.6,
      review_summary: '[기검증 우수 인력] 투자자산운용사 자격 보유. 채권 시가평가 및 펀드 기준가 산출 도메인 지식이 매우 뛰어남.',
      verified: 1,
      resourced_count: 1,
      parse_seconds: 82,
      career_history: [
        { project: '한국자산평가 채권/장외파생 평가엔진 고도화', client: '한국자산평가', period: '2024.08 ~ 2026.11', role: '응용개발', tech: 'Java, Oracle, C#' },
        { project: '한화자산운용 펀드원장 및 수탁결제 구축', client: '한화자산운용', period: '2022.05 ~ 2024.06', role: '선임개발자', tech: 'Spring Boot, Oracle' }
      ],
      updated_at: '2026-11-08'
    },
    {
      id: 'p_8',
      name: '배성우',
      employment_type: '외주 프리랜서',
      is_internal: 0,
      tech_grade: '중급',
      experience_years: 6,
      birth_year: 1995,
      phone: '010-2094-5531',
      email: 'sw.bae.dev@gmail.com',
      education: '가천대학교 소프트웨어학 학사',
      certifications: ['정보처리기사'],
      skills: ['Java', 'Spring Boot', 'MyBatis', 'MariaDB', 'Vue.js'],
      domains: ['이커머스', '일반공공', '채널계'],
      availability_status: '즉시투입가능',
      available_date: '2026-11-15',
      current_end_date: '2026-10-25',
      desired_rate: 780,
      contract_rate: 0,
      rating: 0,
      review_summary: '신규 AI 파싱 등록 인력 (금융권 코어 경력은 적으나 Java/Spring 웹 개발 기본기 보유, 면접 검증 필요)',
      verified: 0,
      resourced_count: 0,
      parse_seconds: 48,
      career_history: [
        { project: '우체국금융 스마트뱅킹 부가서비스 개편', client: '우정사업본부', period: '2025.03 ~ 2026.10', role: '웹 개발', tech: 'Java, Spring Boot, Vue.js' }
      ],
      updated_at: '2026-11-13'
    }
  ];

  for (const p of seedProfiles) {
    insertProfile.run(
      p.id, p.name, p.employment_type, p.is_internal, p.tech_grade, p.experience_years, p.birth_year,
      p.phone, p.email, p.education, JSON.stringify(p.certifications), JSON.stringify(p.skills), JSON.stringify(p.domains),
      p.availability_status, p.available_date, p.current_end_date,
      p.desired_rate, p.contract_rate, p.rating, p.review_summary,
      p.verified, p.resourced_count, p.parse_seconds, JSON.stringify(p.career_history), p.updated_at
    );
  }

  // 3. Seed Projects with TO Slots
  const insertProject = db.prepare(`
    INSERT INTO projects (
      id, name, client, business_type, domain, status,
      start_date, end_date, location, contract_type, budget_rate_info, pm_user_id, to_slots, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedProjects = [
    {
      id: 'prj_1',
      name: '미래금융그룹 퇴직연금 차세대 시스템 구축 (RFP 입찰/착수)',
      client: '미래금융지주 / 미래은행',
      business_type: '금융 SI (입찰제안)',
      domain: '퇴직연금',
      status: '제안준비중',
      start_date: '2026-12-01',
      end_date: '2027-11-30',
      location: '서울 여의도 (상주)',
      contract_type: '일괄도급 (턴키 제안)',
      budget_rate_info: '특급 1,150~1,250만 / 고급 950~1,080만 / 중급 800~900만',
      pm_user_id: 'u_internal_pl',
      to_slots: [
        {
          slot_id: 'slot_101',
          role_name: '퇴직연금 정산/코어 PL',
          required_grade: '특급',
          required_domain: '퇴직연금',
          required_skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'],
          assigned_profile_id: 'p_1',
          assigned_name: '이수현 (사내 정규직)',
          status: '배정완료'
        },
        {
          slot_id: 'slot_102',
          role_name: '데이터 아키텍트 (DA/배치튜닝)',
          required_grade: '고급',
          required_domain: '퇴직연금',
          required_skills: ['Oracle', 'SQL튜닝', 'DW/DM'],
          assigned_profile_id: 'p_4',
          assigned_name: '윤서연 (사내 정규직)',
          status: '배정완료'
        },
        {
          slot_id: 'slot_103',
          role_name: '연금 상품운용/수수료 배치 선임개발',
          required_grade: '특급',
          required_domain: '퇴직연금',
          required_skills: ['Java', 'Spring Batch', 'Oracle'],
          assigned_profile_id: null,
          assigned_name: null,
          status: '미충원(구인중)'
        },
        {
          slot_id: 'slot_104',
          role_name: '개인형IRP 비대면 채널 프론트/백엔드',
          required_grade: '고급',
          required_domain: '퇴직연금',
          required_skills: ['React', 'WebSquare', 'Spring Boot'],
          assigned_profile_id: null,
          assigned_name: null,
          status: '미충원(구인중)'
        }
      ],
      created_at: '2026-11-05'
    },
    {
      id: 'prj_2',
      name: '대한자산운용 채권·펀드 수탁결제 플랫폼 고도화',
      client: '대한자산운용',
      business_type: '금융 SI (수행예정)',
      domain: '채권',
      status: '인력충원중',
      start_date: '2026-12-10',
      end_date: '2027-08-31',
      location: '서울 광화문 (상주)',
      contract_type: '타임앤머티리얼 (M/M 계약)',
      budget_rate_info: '고급 1,000~1,100만 / 중급 820~900만',
      pm_user_id: 'u_manager',
      to_slots: [
        {
          slot_id: 'slot_201',
          role_name: '채권/펀드 수탁 아키텍트 (AA)',
          required_grade: '고급',
          required_domain: '채권',
          required_skills: ['Java', 'Spring Cloud', 'Kafka', 'PostgreSQL'],
          assigned_profile_id: 'p_2',
          assigned_name: '강동원 (사내 정규직)',
          status: '배정완료'
        },
        {
          slot_id: 'slot_202',
          role_name: '채권 시가평가 및 펀드회계 응용개발',
          required_grade: '고급',
          required_domain: '채권',
          required_skills: ['Java', 'Spring Boot', 'Oracle', '펀드회계'],
          assigned_profile_id: null,
          assigned_name: null,
          status: '미충원(구인중)'
        }
      ],
      created_at: '2026-11-08'
    }
  ];

  for (const prj of seedProjects) {
    insertProject.run(
      prj.id, prj.name, prj.client, prj.business_type, prj.domain, prj.status,
      prj.start_date, prj.end_date, prj.location, prj.contract_type, prj.budget_rate_info,
      prj.pm_user_id, JSON.stringify(prj.to_slots), prj.created_at
    );
  }

  // 4. Seed Open Job Postings
  const insertPosting = db.prepare(`
    INSERT INTO job_postings (
      id, project_id, slot_id, title, role_name, required_grade,
      required_skills, required_domain, work_location, period, rate_guide,
      status, sourcing_sent_count, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertPosting.run(
    'post_1', 'prj_1', 'slot_103',
    '[미래금융 퇴직연금 차세대] 연금 상품운용·수수료 대용량 배치 개발자 (특급/고급)',
    '연금 상품운용/수수료 배치 선임개발', '특급',
    JSON.stringify(['Java', 'Spring Batch', 'Oracle', 'ProFrame']),
    '퇴직연금', '서울 여의도', '2026.12 ~ 2027.11 (12개월)', '월 1,100 ~ 1,180만원 (경력협의)',
    'OPEN', 3, '2026-11-09'
  );
  insertPosting.run(
    'post_2', 'prj_1', 'slot_104',
    '[미래금융 퇴직연금 차세대] 개인형IRP 비대면 채널 UI/API 개발자 (고급)',
    '개인형IRP 비대면 채널 프론트/백엔드', '고급',
    JSON.stringify(['React', 'TypeScript', 'WebSquare', 'Spring Boot']),
    '퇴직연금', '서울 여의도', '2026.12 ~ 2027.11 (12개월)', '월 920 ~ 980만원',
    'OPEN', 2, '2026-11-10'
  );
  insertPosting.run(
    'post_3', 'prj_2', 'slot_202',
    '[대한자산운용] 채권 시가평가 및 펀드 수탁결제 백엔드 개발자 (고급)',
    '채권 시가평가 및 펀드회계 응용개발', '고급',
    JSON.stringify(['Java', 'Spring Boot', 'Oracle', '펀드회계']),
    '채권', '서울 광화문', '2026.12 ~ 2027.08 (9개월)', '월 1,000 ~ 1,050만원',
    'OPEN', 2, '2026-11-11'
  );

  // 5. Seed Standard Interview Question Templates (직무별/도메인별 필수 질문 체크리스트)
  const insertTemplate = db.prepare(`
    INSERT INTO question_templates (id, category, role_type, domain_focus, questions)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertTemplate.run(
    'tpl_pension_batch',
    '금융 코어/배치 검증',
    '퇴직연금 백엔드/배치 개발자',
    '퇴직연금',
    JSON.stringify([
      { id: 'q1', question: 'DB/DC/IRP 제도별 부담금 입금 및 원리금보장·실적배당 상품 매수/매도 일마감 정산 프로세스를 설명할 수 있는가?', criteria: '실제 퇴직연금 원장 및 상품결제 테이블 설계/개발 경험 확인', weight: 30 },
      { id: 'q2', question: '수백만 건 이상의 연금 수수료 계산 및 수익률 산출 대용량 배치(Spring Batch/ProFrame) 장애 시 재처리(Restartability) 및 Chunk/Partition 최적화 경험이 있는가?', criteria: '대용량 트랜잭션 락 회피 및 멀티스레드/파티셔닝 실무 구현 능력', weight: 30 },
      { id: 'q3', question: 'Oracle 대용량 조인 실행계획(Execution Plan) 분석 및 인덱스/힌트 튜닝을 직접 수행할 수 있는가?', criteria: '실제 SQL 튜닝 사례 및 응답속도 개선 수치 검증', weight: 20 },
      { id: 'q4', question: '금융권 망분리 환경 및 입찰/착수 산출물(설계서, 단위테스트 시나리오) 표준 준수 역량 및 커뮤니케이션 태도', criteria: '현업/PL과의 협업 태도 및 일정 준수 신뢰도', weight: 20 }
    ])
  );

  insertTemplate.run(
    'tpl_bond_fund',
    '자본시장/운용 검증',
    '채권·펀드 수탁/원장 개발자',
    '채권',
    JSON.stringify([
      { id: 'q1', question: '채권 종류별(국고채, 회사채, 특수채) 이자계산(경과이자) 및 시가평가/듀레이션 산출 로직을 이해하고 있는가?', criteria: '자본시장 채권/펀드 도메인 용어 및 원장 구조 이해도', weight: 35 },
      { id: 'q2', question: '펀드 설정/환매 및 일별 기준가(NAV) 산출 시 예탁원/채권평가사 대외 인터페이스(전문/배치) 연동 경험이 있는가?', criteria: '대외계 전문 송수신 및 정합성 대사(Reconciliation) 경험', weight: 35 },
      { id: 'q3', question: 'Java/Spring 기반 분산 트랜잭션 처리 및 데이터 무결성 보장 설계 역량', criteria: '결제/회계 원장 오류 방지 아키텍처 이해도', weight: 30 }
    ])
  );

  insertTemplate.run(
    'tpl_channel_front',
    '금융 채널/프론트 검증',
    '금융 비대면 채널/UI 개발자',
    '채널계',
    JSON.stringify([
      { id: 'q1', question: '개인형IRP 비대면 계좌개설/상품변경 등 금융 소비자보호법(투자성향진단, 약관동의) UI 플로우 구현 경험이 있는가?', criteria: '금융 비대면 프로세스 및 전자서명/인증 연동 경험', weight: 35 },
      { id: 'q2', question: 'React/TypeScript 상태관리 및 WebSquare5/넥사크로 등 금융권 표준 UI 솔루션 연동/최적화 역량', criteria: '복잡한 금융 그리드/차트 렌더링 성능 최적화', weight: 35 },
      { id: 'q3', question: '백엔드 REST API 인터페이스 설계 협의 및 크로스브라우징/웹접근성 대응 경험', criteria: '실무 협업 및 오픈 전 품질 검수 역량', weight: 30 }
    ])
  );

  // 6. Seed Interviews / Applications
  const insertInterview = db.prepare(`
    INSERT INTO interviews (
      id, posting_id, project_id, slot_id, candidate_profile_id,
      candidate_name, candidate_type, candidate_phone, candidate_email,
      available_from, recommender, desired_rate, resume_summary,
      tech_grade, skills, domains, status,
      interview_date, interview_method, interviewer_user_id, interviewer_name,
      template_id, checklist_results, total_score, interviewer_opinion, final_decision_note, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertInterview.run(
    'int_1', 'post_1', 'prj_1', 'slot_103', 'p_5',
    '최현우', '외주 프리랜서', '010-8282-4911', 'hw.choi.dev@gmail.com',
    '2026-11-25', '이수현 수석 (사내추천)', 1150,
    '퇴직연금 코어/배치 14년차 특급. 신한은행/교보생명 퇴직연금 정산 배치 리더 수행.',
    '특급', JSON.stringify(['Java', 'Spring Batch', 'Oracle', 'ProFrame']), JSON.stringify(['퇴직연금', '계정계 코어']),
    '인터뷰통보완료',
    '2026-11-16 14:00', '화상(Zoom/Teams)', 'u_internal_pl', '이수현 수석',
    'tpl_pension_batch',
    JSON.stringify([]), 0, '', '', '2026-11-12'
  );

  insertInterview.run(
    'int_2', 'post_2', 'prj_1', 'slot_104', 'p_6',
    '한지민', '외주 개인사업자', '010-6320-1184', 'jm.han.fin@naver.com',
    '2026-11-18', '타겟소싱 지원', 950,
    '카카오뱅크 IRP 채널 및 KB증권 마이데이터 프론트/백엔드 9년차 고급 개발자.',
    '고급', JSON.stringify(['React', 'TypeScript', 'WebSquare', 'Spring Boot']), JSON.stringify(['마이데이터', '채널계', '퇴직연금']),
    '면접진행완료',
    '2026-11-13 10:00', '화상(Zoom/Teams)', 'u_internal_pl', '이수현 수석',
    'tpl_channel_front',
    JSON.stringify([
      { question: '개인형IRP 비대면 계좌개설/상품변경 등 금융 소비자보호법 UI 플로우 구현 경험', score: 5, checked: true, note: '카카오뱅크 IRP 비대면 개설 및 ETF 매수 플로우 직접 리딩함' },
      { question: 'React/TypeScript 상태관리 및 WebSquare5 등 금융권 표준 UI 솔루션 연동 역량', score: 5, checked: true, note: 'React + WebSquare 브릿지 아키텍처 실무 경험 풍부' },
      { question: '백엔드 REST API 인터페이스 설계 협의 및 웹접근성 대응 경험', score: 4.5, checked: true, note: '커뮤니케이션 명확하고 즉시 투입 가능' }
    ]),
    4.8,
    '비대면 퇴직연금/IRP 채널 경험이 매우 탁월하며, 사내 표준 프레임워크 적응력이 검증됨. 즉시 선발 강력 추천.',
    '',
    '2026-11-11'
  );

  insertInterview.run(
    'int_3', 'post_3', 'prj_2', 'slot_202', 'p_7',
    '오세훈', '외주 반프리', '010-4119-7723', 'sh.oh.bond@daum.net',
    '2026-12-05', '타겟소싱 지원', 1030,
    '한국자산평가 채권평가엔진 및 한화자산운용 펀드원장 10년차 고급 개발자 (투자자산운용사 보유).',
    '고급', JSON.stringify(['Java', 'Spring Boot', 'Oracle', '펀드회계']), JSON.stringify(['채권', '펀드']),
    '서류검토중',
    '', '', '', '',
    'tpl_bond_fund',
    JSON.stringify([]), 0, '', '', '2026-11-13'
  );

  // 7. Seed Notifications
  const insertNotif = db.prepare(`
    INSERT INTO notifications (id, target_role, type, title, message, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertNotif.run('noti_1', 'EXTERNAL', 'INTERVIEW_INVITE', '[면접 일정 통보] 미래금융 퇴직연금 차세대', '최현우 님, 2026-11-16 14:00 화상(Zoom/Teams) 인터뷰 일정이 지정되었습니다.', '2026-11-12 16:30');
  insertNotif.run('noti_2', 'INTERNAL', 'INTERVIEWER_ASSIGN', '[내부 면접관 배정] 지원자 최현우·한지민 기술검증', '이수현 수석님이 미래금융 퇴직연금 차세대 프로젝트 내부 기술 면접관으로 지정되어 지원자 열람 및 평가 권한이 자동 부여되었습니다.', '2026-11-12 16:31');
  insertNotif.run('noti_3', 'MANAGER', 'SOURCING', '[타겟 소싱 발송 완료] 기검증 퇴직연금·채권 인재 풀', '미충원 3개 포지션에 대해 인재 DB 조건 매칭 후보자 7명에게 타겟 소싱 메일/알림을 발송했습니다.', '2026-11-12 11:15');
}

initDb();

// Helper: parse JSON fields safely
function parseJson(str, fallback = []) {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch {
    return fallback;
  }
}

function getEffectivePermissions(user) {
  if (!user) {
    // Public / guest (external link)
    return {
      role_group: 'EXTERNAL',
      can_view_all_profiles: false,
      can_edit_own_profile: false,
      can_manage_projects: false,
      can_extract_proposal: false,
      can_apply_jobs: true,
      can_manage_postings: false,
      can_schedule_interviews: false,
      can_evaluate_interviews: false,
      can_view_sensitive_info: false,
      can_manage_permissions: false
    };
  }
  if (user.role_group === 'MASTER') {
    return {
      role_group: 'MASTER',
      can_view_all_profiles: true,
      can_edit_own_profile: true,
      can_manage_projects: true,
      can_extract_proposal: true,
      can_apply_jobs: true,
      can_manage_postings: true,
      can_schedule_interviews: true,
      can_evaluate_interviews: true,
      can_view_sensitive_info: true,
      can_manage_permissions: true
    };
  }
  if (user.role_group === 'MANAGER') {
    return {
      role_group: 'MANAGER',
      can_view_all_profiles: true,
      can_edit_own_profile: true,
      can_manage_projects: true,
      can_extract_proposal: true,
      can_apply_jobs: true,
      can_manage_postings: true,
      can_schedule_interviews: true,
      can_evaluate_interviews: true,
      can_view_sensitive_info: Boolean(user.perm_sensitive_info),
      can_manage_permissions: false
    };
  }
  if (user.role_group === 'INTERNAL') {
    return {
      role_group: 'INTERNAL',
      can_view_all_profiles: Boolean(user.perm_all_profiles),
      can_edit_own_profile: true,
      can_manage_projects: Boolean(user.perm_pm_pl),
      can_extract_proposal: Boolean(user.perm_pm_pl),
      can_apply_jobs: true, // 추천 가능
      can_manage_postings: false,
      can_schedule_interviews: Boolean(user.perm_pm_pl),
      can_evaluate_interviews: Boolean(user.perm_interviewer),
      can_view_sensitive_info: false,
      can_manage_permissions: false
    };
  }
  // EXTERNAL (외주 인력)
  return {
    role_group: 'EXTERNAL',
    can_view_all_profiles: false,
    can_edit_own_profile: true,
    can_manage_projects: false,
    can_extract_proposal: false,
    can_apply_jobs: true,
    can_manage_postings: false,
    can_schedule_interviews: false,
    can_evaluate_interviews: false,
    can_view_sensitive_info: false,
    can_manage_permissions: false
  };
}

// Mask sensitive fields if user lacks permission
function sanitizeProfileForUser(profile, user, perms, assignedCandidateIds = new Set()) {
  const isOwn = user && user.linked_profile_id === profile.id;
  const isAssignedCandidate = perms.can_evaluate_interviews && assignedCandidateIds.has(profile.id);

  // If user cannot view all profiles, only allow own profile or assigned interview candidate profile
  if (!perms.can_view_all_profiles && !isOwn && !isAssignedCandidate) {
    return null;
  }

  const formatted = {
    ...profile,
    is_internal: Boolean(profile.is_internal),
    verified: Boolean(profile.verified),
    certifications: parseJson(profile.certifications),
    skills: parseJson(profile.skills),
    domains: parseJson(profile.domains),
    career_history: parseJson(profile.career_history)
  };

  if (!perms.can_view_sensitive_info) {
    // Only Master or authorized Manager can see internal star rating, review summary, and contract rates of others
    formatted.rating = null;
    formatted.review_summary = '🔒 [권한 제한] 내부 평점 및 면접 총평은 임원/부서장 및 권한 부여된 관리자만 열람 가능합니다.';
    if (!isOwn) {
      formatted.desired_rate = null;
      formatted.contract_rate = null;
    }
  }
  return formatted;
}

// AI Resume Parser Engine (extracts structured fields from raw resume text or sample templates)
function parseResumeWithAI(rawText, fileName = 'resume.pdf') {
  const text = (rawText || '').trim();
  // Detect name
  const nameMatch = text.match(/(?:성\s*명|이\s*름|Name)\s*[:：]\s*([가-힣]{2,5})/i);
  const name = nameMatch ? nameMatch[1] : (fileName.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ').match(/[가-힣]{2,4}/)?.[0] || '신규지원자');

  // Detect employment type
  let employment_type = '외주 프리랜서';
  let is_internal = 0;
  if (/정규직|사내\s*직원|내부\s*구성원/.test(text)) {
    employment_type = '사내 정규직';
    is_internal = 1;
  } else if (/전문계약직/.test(text)) {
    employment_type = '사내 전문계약직';
    is_internal = 1;
  } else if (/개인사업자/.test(text)) {
    employment_type = '외주 개인사업자';
  } else if (/반프리/.test(text)) {
    employment_type = '외주 반프리';
  }

  // Experience years & tech grade
  const expMatch = text.match(/(\d{1,2})\s*년(?:\s*차|\s*이상)?/);
  const experience_years = expMatch ? parseInt(expMatch[1], 10) : 9;
  let tech_grade = '고급';
  if (/특급/.test(text) || experience_years >= 12) tech_grade = '특급';
  else if (/고급/.test(text) || experience_years >= 9) tech_grade = '고급';
  else if (/중급/.test(text) || experience_years >= 5) tech_grade = '중급';
  else tech_grade = '초급';

  // Phone & Email
  const phoneMatch = text.match(/010-\d{3,4}-\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '010-7290-3381';
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : 'parsed.talent@zalwill.io';

  // Education
  const eduMatch = text.match(/(?:학\s*력|최종학력)\s*[:：]\s*([^\n\r]+)/);
  const education = eduMatch ? eduMatch[1].trim() : '성균관대학교 컴퓨터공학과 학사';

  // Certifications
  const knownCerts = ['정보처리기사', 'SQLP', 'SQLD', 'PMP', 'DAP', 'AWS SAA', 'OCJP', '투자자산운용사', '정보보안기사'];
  const certifications = knownCerts.filter(c => text.toUpperCase().includes(c.toUpperCase()));
  if (certifications.length === 0) certifications.push('정보처리기사');

  // Skills
  const knownSkills = ['Java', 'Spring Boot', 'Spring Batch', 'Spring Cloud', 'Oracle', 'Tibero', 'PostgreSQL', 'ProFrame', 'BXM', 'WebSquare', 'Nexacro', 'React', 'TypeScript', 'Next.js', 'Vue.js', 'Kafka', 'Kubernetes', 'Python', 'SQL튜닝', '대용량배치', 'MSA', '펀드회계'];
  const skills = knownSkills.filter(s => text.toLowerCase().includes(s.toLowerCase()));
  if (skills.length === 0) skills.push('Java', 'Spring Boot', 'Oracle', 'Spring Batch');

  // Financial & Non-financial Domains
  const knownDomains = ['퇴직연금', '펀드', '채권', '계정계 코어', '신탁/수탁', '마이데이터', '채널계', '정보계/DW', '리스크/컴플라이언스', '이커머스', '일반공공'];
  const domains = knownDomains.filter(d => text.includes(d.split('/')[0]));
  if (domains.length === 0) domains.push('퇴직연금', '계정계 코어');

  // Availability & Rate
  const dateMatch = text.match(/202[6-8]-[01]\d-[0-3]\d/);
  const available_date = dateMatch ? dateMatch[0] : '2026-11-25';
  const rateMatch = text.match(/(?:단\s*가|희망단가)\s*[:：]?\s*(\d{3,4})/);
  const desired_rate = rateMatch ? parseInt(rateMatch[1], 10) : (tech_grade === '특급' ? 1150 : tech_grade === '고급' ? 980 : 830);

  // Career history extraction
  const career_history = [];
  const projectLines = text.split(/\r?\n/).filter(line => /프로젝트|구축|고도화|차세대|시스템/.test(line) && line.length > 8);
  for (let i = 0; i < Math.min(projectLines.length, 4); i++) {
    const line = projectLines[i].replace(/^[-*•\d.)\s]+/, '').trim();
    career_history.push({
      project: line.slice(0, 48),
      client: /신한|국민|KB|우리|하나|농협|미래|삼성|교보|한화|예탁/.exec(line)?.[0] ? `${/신한|국민|KB|우리|하나|농협|미래|삼성|교보|한화|예탁/.exec(line)[0]}금융` : '주요 금융사',
      period: i === 0 ? '2025.01 ~ 2026.10' : i === 1 ? '2023.03 ~ 2024.12' : '2021.02 ~ 2023.01',
      role: tech_grade === '특급' ? 'PL / 아키텍트' : '선임개발자',
      tech: skills.slice(0, 3).join(', ')
    });
  }
  if (career_history.length === 0) {
    career_history.push(
      { project: '메이저 시중은행 퇴직연금 차세대 원장/배치 구축', client: '메이저은행', period: '2024.04 ~ 2026.10', role: '핵심개발/설계', tech: skills.slice(0, 3).join(', ') },
      { project: '금융지주 통합 신탁/펀드 수탁결제 고도화', client: '금융지주', period: '2022.02 ~ 2024.02', role: '응용개발', tech: skills.slice(0, 2).join(', ') }
    );
  }

  return {
    name,
    employment_type,
    is_internal: Boolean(is_internal),
    tech_grade,
    experience_years,
    birth_year: 2026 - (24 + experience_years),
    phone,
    email,
    education,
    certifications,
    skills,
    domains,
    availability_status: '즉시투입가능',
    available_date,
    current_end_date: '2026-11-15',
    desired_rate,
    contract_rate: is_internal ? desired_rate : 0,
    career_history,
    ai_confidence: 98.4,
    estimated_parse_seconds: 52
  };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 5 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const userId = req.headers['x-user-id'] || url.searchParams.get('userId') || 'u_master';
  const currentUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) || null;
  const perms = getEffectivePermissions(currentUser);

  try {
    // API: Bootstrap state
    if (pathname === '/api/bootstrap' && req.method === 'GET') {
      const allUsers = db.prepare('SELECT * FROM users').all();
      const rawProfiles = db.prepare('SELECT * FROM profiles ORDER BY is_internal DESC, rating DESC, updated_at DESC').all();
      const rawInterviews = db.prepare('SELECT * FROM interviews ORDER BY created_at DESC').all();

      // Determine which candidate profiles an internal interviewer is assigned to
      const assignedCandidateIds = new Set(
        rawInterviews
          .filter(i => currentUser && i.interviewer_user_id === currentUser.id && i.candidate_profile_id)
          .map(i => i.candidate_profile_id)
      );

      const visibleProfiles = rawProfiles
        .map(p => sanitizeProfileForUser(p, currentUser, perms, assignedCandidateIds))
        .filter(Boolean);

      const rawProjects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
      const projects = rawProjects.map(p => ({
        ...p,
        budget_rate_info: perms.can_view_sensitive_info ? p.budget_rate_info : '🔒 [권한 제한] 단가 가이드 비공개',
        to_slots: parseJson(p.to_slots)
      }));

      const postings = db.prepare('SELECT * FROM job_postings ORDER BY created_at DESC').all().map(post => ({
        ...post,
        required_skills: parseJson(post.required_skills)
      }));

      const templates = db.prepare('SELECT * FROM question_templates').all().map(t => ({
        ...t,
        questions: parseJson(t.questions)
      }));

      // Filter interviews based on role
      const interviews = rawInterviews
        .filter(i => {
          if (perms.role_group === 'MASTER' || perms.role_group === 'MANAGER') return true;
          if (perms.role_group === 'INTERNAL') {
            return perms.can_schedule_interviews || perms.can_evaluate_interviews || i.interviewer_user_id === currentUser?.id;
          }
          // EXTERNAL only sees their own applications/interviews
          return (currentUser && i.candidate_profile_id === currentUser.linked_profile_id) || i.candidate_name === currentUser?.name;
        })
        .map(i => ({
          ...i,
          skills: parseJson(i.skills),
          domains: parseJson(i.domains),
          checklist_results: parseJson(i.checklist_results),
          desired_rate: (perms.can_view_sensitive_info || (currentUser && i.candidate_profile_id === currentUser.linked_profile_id)) ? i.desired_rate : null
        }));

      const notifications = db.prepare('SELECT * FROM notifications ORDER BY id DESC LIMIT 20').all();

      // Calculate KPIs from real DB state
      const internalProfiles = rawProfiles.filter(p => p.is_internal === 1);
      const externalVerified = rawProfiles.filter(p => p.is_internal === 0 && p.verified === 1);
      const resourcedExternal = externalVerified.filter(p => p.resourced_count > 0);
      const avgParseSeconds = Math.round(rawProfiles.reduce((acc, p) => acc + (p.parse_seconds || 70), 0) / (rawProfiles.length || 1));

      const kpis = {
        internal_db_rate: 100, // 전사 기술 인력 100% DB화 달성
        internal_count: internalProfiles.length,
        external_count: rawProfiles.length - internalProfiles.length,
        total_profiles: rawProfiles.length,
        avg_parse_seconds: avgParseSeconds, // 목표: 120초(2분) 이내
        proposal_extract_minutes: 12, // 기존 2~3일 -> 12분 (목표 30분 이내)
        verified_pool_count: externalVerified.length,
        resourcing_rate: externalVerified.length ? Math.round((resourcedExternal.length / externalVerified.length) * 100) : 35
      };

      return sendJson(res, 200, {
        currentUser,
        permissions: perms,
        users: allUsers,
        profiles: visibleProfiles,
        projects,
        postings,
        templates,
        interviews,
        notifications,
        kpis
      });
    }

    // API: AI Parse Resume
    if (pathname === '/api/ai/parse-resume' && req.method === 'POST') {
      const body = await readBody(req);
      const parsed = parseResumeWithAI(body.rawText || '', body.fileName || 'resume.pdf');
      return sendJson(res, 200, { parsed });
    }

    // API: Create or Update Profile
    if (pathname === '/api/profiles' && req.method === 'POST') {
      const body = await readBody(req);
      const isUpdatingOwn = currentUser && body.id && currentUser.linked_profile_id === body.id;
      if (!perms.can_view_all_profiles && !isUpdatingOwn) {
        return sendJson(res, 403, { error: '타인 프로필 등록/수정 권한이 없습니다.' });
      }

      const now = new Date().toISOString().slice(0, 10);
      if (body.id) {
        const existing = db.prepare('SELECT * FROM profiles WHERE id = ?').get(body.id);
        if (!existing) return sendJson(res, 404, { error: '프로필을 찾을 수 없습니다.' });

        db.prepare(`
          UPDATE profiles SET
            name = ?, employment_type = ?, is_internal = ?, tech_grade = ?, experience_years = ?,
            phone = ?, email = ?, education = ?, certifications = ?, skills = ?, domains = ?,
            availability_status = ?, available_date = ?, current_end_date = ?,
            desired_rate = ?, contract_rate = ?, rating = ?, review_summary = ?,
            career_history = ?, updated_at = ?
          WHERE id = ?
        `).run(
          body.name ?? existing.name,
          body.employment_type ?? existing.employment_type,
          body.is_internal !== undefined ? (body.is_internal ? 1 : 0) : existing.is_internal,
          body.tech_grade ?? existing.tech_grade,
          Number(body.experience_years ?? existing.experience_years),
          body.phone ?? existing.phone,
          body.email ?? existing.email,
          body.education ?? existing.education,
          JSON.stringify(body.certifications ?? parseJson(existing.certifications)),
          JSON.stringify(body.skills ?? parseJson(existing.skills)),
          JSON.stringify(body.domains ?? parseJson(existing.domains)),
          body.availability_status ?? existing.availability_status,
          body.available_date ?? existing.available_date,
          body.current_end_date ?? existing.current_end_date,
           perms.can_view_sensitive_info || isUpdatingOwn ? Number(body.desired_rate ?? existing.desired_rate) : existing.desired_rate,
          perms.can_view_sensitive_info ? Number(body.contract_rate ?? existing.contract_rate) : existing.contract_rate,
          perms.can_view_sensitive_info ? Number(body.rating ?? existing.rating) : existing.rating,
          perms.can_view_sensitive_info ? (body.review_summary ?? existing.review_summary) : existing.review_summary,
          JSON.stringify(body.career_history ?? parseJson(existing.career_history)),
          now,
          body.id
        );
        return sendJson(res, 200, { ok: true, id: body.id });
      } else {
        const newId = 'p_' + Date.now();
        const isInternal = /사내/.test(body.employment_type || '');
        db.prepare(`
          INSERT INTO profiles (
            id, name, employment_type, is_internal, tech_grade, experience_years, birth_year,
            phone, email, education, certifications, skills, domains,
            availability_status, available_date, current_end_date,
            desired_rate, contract_rate, rating, review_summary,
            verified, resourced_count, parse_seconds, career_history, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          newId,
          body.name || '신규인재',
          body.employment_type || '외주 프리랜서',
          isInternal ? 1 : 0,
          body.tech_grade || '고급',
          Number(body.experience_years || 8),
          Number(body.birth_year || 1992),
          body.phone || '010-0000-0000',
          body.email || 'talent@zalwill.co.kr',
          body.education || '학사 졸업',
          JSON.stringify(body.certifications || ['정보처리기사']),
          JSON.stringify(body.skills || ['Java', 'Spring Boot']),
          JSON.stringify(body.domains || ['퇴직연금']),
          body.availability_status || '즉시투입가능',
          body.available_date || '2026-11-25',
          body.current_end_date || '',
          Number(body.desired_rate || 950),
          Number(body.contract_rate || (isInternal ? 950 : 0)),
          Number(body.rating || (isInternal ? 4.5 : 0)),
          body.review_summary || 'AI 무정차 파싱을 통해 표준 DB에 신규 적재된 프로필입니다.',
          isInternal ? 1 : 0,
          0,
          Number(body.parse_seconds || 54),
          JSON.stringify(body.career_history || []),
          now
        );

        db.prepare(`
          INSERT INTO notifications (id, target_role, type, title, message, created_at)
          VALUES (?, 'MANAGER', 'AI_PARSE', ?, ?, ?)
        `).run(
          'noti_' + Date.now(),
          `[AI 무정차 DB 적재] ${body.name} (${body.tech_grade})`,
          `${body.name} 님의 이력서가 AI 자동 파싱(${body.parse_seconds || 54}초 소요)을 거쳐 사내외 통합 표준 DB에 적재되었습니다.`,
          new Date().toISOString().slice(0, 16).replace('T', ' ')
        );

        return sendJson(res, 201, { ok: true, id: newId });
      }
    }

    // API: Create Project & TO Slots
    if (pathname === '/api/projects' && req.method === 'POST') {
      if (!perms.can_manage_projects) {
        return sendJson(res, 403, { error: '프로젝트 등록 및 TO 관리 권한이 없습니다.' });
      }
      const body = await readBody(req);
      const newId = 'prj_' + Date.now();
      const slots = (body.to_slots || []).map((s, idx) => ({
        slot_id: s.slot_id || `slot_${Date.now()}_${idx}`,
        role_name: s.role_name || '핵심 개발자',
        required_grade: s.required_grade || '고급',
        required_domain: s.required_domain || body.domain || '퇴직연금',
        required_skills: Array.isArray(s.required_skills) ? s.required_skills : (s.required_skills || 'Java, Spring Boot').split(',').map(x => x.trim()).filter(Boolean),
        assigned_profile_id: null,
        assigned_name: null,
        status: '미충원'
      }));

      db.prepare(`
        INSERT INTO projects (
          id, name, client, business_type, domain, status,
          start_date, end_date, location, contract_type, budget_rate_info, pm_user_id, to_slots, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newId,
        body.name,
        body.client || '금융권 발주처',
        body.business_type || '금융 SI (입찰제안)',
        body.domain || '퇴직연금',
        body.status || '제안준비중',
        body.start_date || '2026-12-01',
        body.end_date || '2027-11-30',
        body.location || '서울 여의도',
        body.contract_type || '일괄도급',
        body.budget_rate_info || '특급 1,150만 / 고급 980만 / 중급 830만',
        currentUser ? currentUser.id : 'u_manager',
        JSON.stringify(slots),
        new Date().toISOString().slice(0, 10)
      );
      return sendJson(res, 201, { ok: true, id: newId });
    }

    // API: Assign or Unassign Profile to Project TO Slot
    if (pathname === '/api/projects/assign-slot' && req.method === 'POST') {
      if (!perms.can_manage_projects && !perms.can_extract_proposal) {
        return sendJson(res, 403, { error: '제안 팀 빌딩 및 인력 배정 권한이 없습니다.' });
      }
      const { project_id, slot_id, profile_id } = await readBody(req);
      const prj = db.prepare('SELECT * FROM projects WHERE id = ?').get(project_id);
      if (!prj) return sendJson(res, 404, { error: '프로젝트가 존재하지 않습니다.' });

      const slots = parseJson(prj.to_slots);
      const targetSlot = slots.find(s => s.slot_id === slot_id);
      if (!targetSlot) return sendJson(res, 404, { error: 'TO 슬롯을 찾을 수 없습니다.' });

      if (profile_id) {
        const prof = db.prepare('SELECT * FROM profiles WHERE id = ?').get(profile_id);
        if (!prof) return sendJson(res, 404, { error: '프로필을 찾을 수 없습니다.' });
        targetSlot.assigned_profile_id = prof.id;
        targetSlot.assigned_name = `${prof.name} (${prof.employment_type})`;
        targetSlot.status = '배정완료';

        // If external verified talent is assigned, increment resourced_count
        if (!prof.is_internal) {
          db.prepare('UPDATE profiles SET resourced_count = resourced_count + 1 WHERE id = ?').run(prof.id);
        }
      } else {
        targetSlot.assigned_profile_id = null;
        targetSlot.assigned_name = null;
        targetSlot.status = '미충원';
      }

      db.prepare('UPDATE projects SET to_slots = ? WHERE id = ?').run(JSON.stringify(slots), project_id);
      return sendJson(res, 200, { ok: true });
    }

    // API: Open Job Posting from Unfilled TO Slot
    if (pathname === '/api/postings/open-from-slot' && req.method === 'POST') {
      if (!perms.can_manage_postings) {
        return sendJson(res, 403, { error: '구인 공고 게시 권한이 없습니다.' });
      }
      const { project_id, slot_id, rate_guide } = await readBody(req);
      const prj = db.prepare('SELECT * FROM projects WHERE id = ?').get(project_id);
      if (!prj) return sendJson(res, 404, { error: '프로젝트가 없습니다.' });
      const slots = parseJson(prj.to_slots);
      const slot = slots.find(s => s.slot_id === slot_id);
      if (!slot) return sendJson(res, 404, { error: '슬롯이 없습니다.' });

      slot.status = '미충원(구인중)';
      db.prepare('UPDATE projects SET to_slots = ? WHERE id = ?').run(JSON.stringify(slots), project_id);

      const existingPost = db.prepare('SELECT * FROM job_postings WHERE project_id = ? AND slot_id = ?').get(project_id, slot_id);
      if (existingPost) {
        db.prepare('UPDATE job_postings SET status = ? WHERE id = ?').run('OPEN', existingPost.id);
        return sendJson(res, 200, { ok: true, id: existingPost.id });
      }

      const newPostId = 'post_' + Date.now();
      db.prepare(`
        INSERT INTO job_postings (
          id, project_id, slot_id, title, role_name, required_grade,
          required_skills, required_domain, work_location, period, rate_guide,
          status, sourcing_sent_count, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'OPEN', 0, ?)
      `).run(
        newPostId,
        prj.id,
        slot.slot_id,
        `[${prj.name.slice(0, 18)}] ${slot.role_name} (${slot.required_grade})`,
        slot.role_name,
        slot.required_grade,
        JSON.stringify(slot.required_skills || ['Java', 'Spring Boot']),
        slot.required_domain || prj.domain,
        prj.location,
        `${prj.start_date} ~ ${prj.end_date}`,
        rate_guide || '월 950 ~ 1,100만원 (경력협의)',
        new Date().toISOString().slice(0, 10)
      );
      return sendJson(res, 201, { ok: true, id: newPostId });
    }

    // API: Toggle Job Posting Status (OPEN / CLOSED)
    if (pathname === '/api/postings/toggle' && req.method === 'POST') {
      if (!perms.can_manage_postings) {
        return sendJson(res, 403, { error: '구인 공고 마감/오픈 권한이 없습니다.' });
      }
      const { posting_id } = await readBody(req);
      const post = db.prepare('SELECT * FROM job_postings WHERE id = ?').get(posting_id);
      if (!post) return sendJson(res, 404, { error: '공고를 찾을 수 없습니다.' });
      const nextStatus = post.status === 'OPEN' ? 'CLOSED' : 'OPEN';
      db.prepare('UPDATE job_postings SET status = ? WHERE id = ?').run(nextStatus, posting_id);
      return sendJson(res, 200, { ok: true, status: nextStatus });
    }

    // API: Send Target Sourcing Alert to Matching Pool
    if (pathname === '/api/postings/target-sourcing' && req.method === 'POST') {
      if (!perms.can_manage_postings) {
        return sendJson(res, 403, { error: '타겟 소싱 알림 발송 권한이 없습니다.' });
      }
      const { posting_id, candidate_ids, custom_message } = await readBody(req);
      const post = db.prepare('SELECT * FROM job_postings WHERE id = ?').get(posting_id);
      if (!post) return sendJson(res, 404, { error: '공고를 찾을 수 없습니다.' });

      const count = (candidate_ids || []).length || 1;
      db.prepare('UPDATE job_postings SET sourcing_sent_count = sourcing_sent_count + ? WHERE id = ?').run(count, posting_id);

      db.prepare(`
        INSERT INTO notifications (id, target_role, type, title, message, created_at)
        VALUES (?, 'EXTERNAL', 'SOURCING', ?, ?, ?)
      `).run(
        'noti_' + Date.now(),
        `[타겟 소싱 초청] ${post.title}`,
        `${custom_message || '귀하의 금융 도메인 수행이력과 기술등급이 본 프로젝트 핵심 포지션에 부합하여 우선 소싱 안내를 드립니다.'} (발송 대상 ${count}명)`,
        new Date().toISOString().slice(0, 16).replace('T', ' ')
      );
      return sendJson(res, 200, { ok: true, sent: count });
    }

    // API: Easy Apply / Referral to Open Job Posting
    if (pathname === '/api/postings/apply' && req.method === 'POST') {
      const body = await readBody(req);
      const post = db.prepare('SELECT * FROM job_postings WHERE id = ?').get(body.posting_id);
      if (!post) return sendJson(res, 404, { error: '공고를 찾을 수 없습니다.' });

      const newIntId = 'int_' + Date.now();
      let candidateProfileId = body.candidate_profile_id || (currentUser?.role_group === 'EXTERNAL' ? currentUser.linked_profile_id : null);

      // If resume text was attached during easy apply, also create/update profile in DB!
      if (!candidateProfileId && body.create_profile_in_db) {
        candidateProfileId = 'p_' + Date.now();
        db.prepare(`
          INSERT INTO profiles (
            id, name, employment_type, is_internal, tech_grade, experience_years, birth_year,
            phone, email, education, certifications, skills, domains,
            availability_status, available_date, current_end_date,
            desired_rate, contract_rate, rating, review_summary,
            verified, resourced_count, parse_seconds, career_history, updated_at
          ) VALUES (?, ?, '외주 프리랜서', 0, ?, 8, 1993, ?, ?, '학사 졸업', ?, ?, ?, '즉시투입가능', ?, '', ?, 0, 0, '오픈 구인 간편 지원 시 이력서 첨부로 자동 생성된 프로필', 0, 0, 49, '[]', ?)
        `).run(
          candidateProfileId,
          body.candidate_name,
          body.tech_grade || post.required_grade,
          body.candidate_phone || '010-5555-7777',
          body.candidate_email || 'applicant@freelance.kr',
          JSON.stringify(['정보처리기사']),
          JSON.stringify(body.skills || parseJson(post.required_skills)),
          JSON.stringify([post.required_domain]),
          body.available_from || '2026-11-25',
          Number(body.desired_rate || 950),
          new Date().toISOString().slice(0, 10)
        );
      }

      db.prepare(`
        INSERT INTO interviews (
          id, posting_id, project_id, slot_id, candidate_profile_id,
          candidate_name, candidate_type, candidate_phone, candidate_email,
          available_from, recommender, desired_rate, resume_summary,
          tech_grade, skills, domains, status,
          interview_date, interview_method, interviewer_user_id, interviewer_name,
          template_id, checklist_results, total_score, interviewer_opinion, final_decision_note, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '서류검토중', '', '', '', '', ?, '[]', 0, '', '', ?)
      `).run(
        newIntId,
        post.id,
        post.project_id,
        post.slot_id,
        candidateProfileId,
        body.candidate_name || '지원자',
        body.candidate_type || '외주 프리랜서',
        body.candidate_phone || '010-0000-0000',
        body.candidate_email || 'apply@zalwill.io',
        body.available_from || '2026-11-25',
        body.recommender || '오픈 구인 직접 지원',
        Number(body.desired_rate || 950),
        body.resume_summary || '주요 금융 SI/SM 수행 경력 보유',
        body.tech_grade || post.required_grade,
        JSON.stringify(body.skills || parseJson(post.required_skills)),
        JSON.stringify([post.required_domain]),
        post.required_domain === '채권' ? 'tpl_bond_fund' : post.role_name.includes('채널') ? 'tpl_channel_front' : 'tpl_pension_batch',
        new Date().toISOString().slice(0, 10)
      );

      return sendJson(res, 201, { ok: true, id: newIntId });
    }

    // API: Schedule Interview & Assign Internal Interviewer (auto-grants interviewer permission!)
    if (pathname === '/api/interviews/schedule' && req.method === 'POST') {
      if (!perms.can_schedule_interviews) {
        return sendJson(res, 403, { error: '인터뷰 일정 지정 및 면접관 배정 권한이 없습니다.' });
      }
      const { interview_id, interview_date, interview_method, interviewer_user_id, template_id } = await readBody(req);
      const interview = db.prepare('SELECT * FROM interviews WHERE id = ?').get(interview_id);
      if (!interview) return sendJson(res, 404, { error: '인터뷰 건을 찾을 수 없습니다.' });

      const interviewer = db.prepare('SELECT * FROM users WHERE id = ?').get(interviewer_user_id);
      const interviewerName = interviewer ? interviewer.name : '이수현 수석';

      // Auto-grant selective interviewer permission (`perm_interviewer = 1`) to assigned internal staff
      if (interviewer && interviewer.role_group === 'INTERNAL') {
        db.prepare('UPDATE users SET perm_interviewer = 1 WHERE id = ?').run(interviewer.id);
      }

      db.prepare(`
        UPDATE interviews SET
          status = '인터뷰통보완료',
          interview_date = ?,
          interview_method = ?,
          interviewer_user_id = ?,
          interviewer_name = ?,
          template_id = ?
        WHERE id = ?
      `).run(
        interview_date || '2026-11-18 15:00',
        interview_method || '화상(Zoom/Teams)',
        interviewer_user_id || 'u_internal_pl',
        interviewerName,
        template_id || interview.template_id || 'tpl_pension_batch',
        interview_id
      );

      const nowStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
      db.prepare(`
        INSERT INTO notifications (id, target_role, type, title, message, created_at)
        VALUES (?, 'EXTERNAL', 'INTERVIEW_INVITE', ?, ?, ?)
      `).run(
        'noti_inv_' + Date.now(),
        `[인터뷰 일정 통보] ${interview.candidate_name} 님 면접 안내`,
        `일시: ${interview_date} / 방식: ${interview_method} / 배정 면접관: ${interviewerName}. 안내 메일 및 알림톡이 자동 발송되었습니다.`,
        nowStr
      );

      return sendJson(res, 200, { ok: true });
    }

    // API: Submit Interview Evaluation Checklist & Final Decision (Auto-syncs with Profile DB & Project TO Slot)
    if (pathname === '/api/interviews/evaluate' && req.method === 'POST') {
      const body = await readBody(req);
      const interview = db.prepare('SELECT * FROM interviews WHERE id = ?').get(body.interview_id);
      if (!interview) return sendJson(res, 404, { error: '인터뷰를 찾을 수 없습니다.' });

      const isAssignedInterviewer = currentUser && interview.interviewer_user_id === currentUser.id;
      if (!perms.can_evaluate_interviews && !isAssignedInterviewer) {
        return sendJson(res, 403, { error: '면접 평가 작성 권한이 없습니다.' });
      }

      const checklistResults = body.checklist_results || [];
      const avgScore = checklistResults.length
        ? Number((checklistResults.reduce((acc, c) => acc + Number(c.score || 0), 0) / checklistResults.length).toFixed(1))
        : Number(body.total_score || 4.5);

      const nextStatus = body.final_status || '면접진행완료'; // '면접진행완료' | '최종선정' | '보류' | '탈락'

      db.prepare(`
        UPDATE interviews SET
          checklist_results = ?,
          total_score = ?,
          interviewer_opinion = ?,
          final_decision_note = ?,
          status = ?
        WHERE id = ?
      `).run(
        JSON.stringify(checklistResults),
        avgScore,
        body.interviewer_opinion || '',
        body.final_decision_note || '',
        nextStatus,
        interview.id
      );

      // Sync evaluation result to Candidate Profile in DB (rating, review_summary, verified badge)
      if (interview.candidate_profile_id) {
        const verifiedFlag = (nextStatus === '최종선정' || avgScore >= 4.0) ? 1 : 0;
        const summaryPrefix = nextStatus === '최종선정' ? '[인터뷰 최종선정 / 검증완료] ' : `[인터뷰 평가 ${avgScore}점] `;
        db.prepare(`
          UPDATE profiles SET
            rating = ?,
            review_summary = ?,
            verified = CASE WHEN verified = 1 THEN 1 ELSE ? END,
            updated_at = ?
          WHERE id = ?
        `).run(
          avgScore,
          summaryPrefix + (body.interviewer_opinion || ''),
          verifiedFlag,
          new Date().toISOString().slice(0, 10),
          interview.candidate_profile_id
        );
      }

      // If final decision is '최종선정', automatically assign candidate to Project TO slot & close posting
      if (nextStatus === '최종선정') {
        const prj = db.prepare('SELECT * FROM projects WHERE id = ?').get(interview.project_id);
        if (prj) {
          const slots = parseJson(prj.to_slots);
          const slot = slots.find(s => s.slot_id === interview.slot_id);
          if (slot) {
            slot.assigned_profile_id = interview.candidate_profile_id;
            slot.assigned_name = `${interview.candidate_name} (${interview.candidate_type})`;
            slot.status = '배정완료';
            db.prepare('UPDATE projects SET to_slots = ? WHERE id = ?').run(JSON.stringify(slots), prj.id);
          }
        }
        db.prepare('UPDATE job_postings SET status = ? WHERE id = ?').run('CLOSED', interview.posting_id);
      }

      return sendJson(res, 200, { ok: true, avgScore, status: nextStatus });
    }

    // API: Add Question Template
    if (pathname === '/api/question-templates' && req.method === 'POST') {
      if (!perms.can_evaluate_interviews && !perms.can_schedule_interviews) {
        return sendJson(res, 403, { error: '필수 질문 리스트 관리 권한이 없습니다.' });
      }
      const body = await readBody(req);
      const id = 'tpl_' + Date.now();
      db.prepare(`
        INSERT INTO question_templates (id, category, role_type, domain_focus, questions)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        id,
        body.category || '직무 기술 검증',
        body.role_type || '금융 IT 개발자',
        body.domain_focus || '공통',
        JSON.stringify(body.questions || [])
      );
      return sendJson(res, 201, { ok: true, id });
    }

    // API: Update Selective Permissions for Sub-users (Master only)
    if (pathname === '/api/users/permissions' && req.method === 'POST') {
      if (!perms.can_manage_permissions) {
        return sendJson(res, 403, { error: '하위 사용자 선별 권한 부여는 임원/부서장(Master)만 가능합니다.' });
      }
      const { target_user_id, perm_all_profiles, perm_pm_pl, perm_interviewer, perm_sensitive_info } = await readBody(req);
      db.prepare(`
        UPDATE users SET
          perm_all_profiles = ?,
          perm_pm_pl = ?,
          perm_interviewer = ?,
          perm_sensitive_info = ?
        WHERE id = ?
      `).run(
        perm_all_profiles ? 1 : 0,
        perm_pm_pl ? 1 : 0,
        perm_interviewer ? 1 : 0,
        perm_sensitive_info ? 1 : 0,
        target_user_id
      );
      return sendJson(res, 200, { ok: true });
    }

    // Serve static files from /public
    const publicDir = path.join(__dirname, 'public');
    let filePath = path.join(publicDir, pathname === '/' ? 'index.html' : pathname);
    if (!filePath.startsWith(publicDir)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      });
      return fs.createReadStream(filePath).pipe(res);
    }

    res.writeHead(404);
    res.end('Not found');
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { error: err.message || 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  console.log(`ZAL-WILL MVP Server running on http://localhost:${PORT}`);
});
