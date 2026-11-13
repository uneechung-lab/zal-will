const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const TMP_STORE_PATH = path.join(os.tmpdir(), 'zalwill-vercel-store-v11.json');

function getInitialStore() {
  return {
    users: [
      { id: 'u_master', name: '조성현 상무', title: '금융사업본부장 (임원/부서장)', department: '금융IT사업본부', role_group: 'MASTER', linked_profile_id: null, perm_all_profiles: 1, perm_pm_pl: 1, perm_interviewer: 1, perm_sensitive_info: 1 },
      { id: 'u_manager', name: '김지영 이사', title: '제안PM / 인력소싱 관리자', department: '전략제안·소싱팀', role_group: 'MANAGER', linked_profile_id: null, perm_all_profiles: 1, perm_pm_pl: 1, perm_interviewer: 1, perm_sensitive_info: 1 },
      { id: 'u_internal_pl', name: '정윤희 부장', title: '사내 정규직 (퇴직연금 PL)', department: '연금신탁개발팀', role_group: 'INTERNAL', linked_profile_id: 'p_1', perm_all_profiles: 1, perm_pm_pl: 1, perm_interviewer: 1, perm_sensitive_info: 0 },
      { id: 'u_internal_dev', name: '조진희 차장', title: '사내 전문계약직 (백엔드 개발)', department: '코어뱅킹팀', role_group: 'INTERNAL', linked_profile_id: 'p_3', perm_all_profiles: 0, perm_pm_pl: 0, perm_interviewer: 0, perm_sensitive_info: 0 },
      { id: 'u_external', name: '신은숙 부장', title: '외주 인력 (프리랜서/계정계)', department: '외부 인재풀', role_group: 'EXTERNAL', linked_profile_id: 'p_5', perm_all_profiles: 0, perm_pm_pl: 0, perm_interviewer: 0, perm_sensitive_info: 0 }
    ],
    profiles: [
      {
        id: 'p_1', name: '정윤희', employment_type: '사내 정규직', is_internal: 1, tech_grade: '특급', experience_years: 15, birth_year: 1986,
        phone: '010-3421-8890', email: 'yh.jung@zalwill.co.kr', education: '한양대학교 컴퓨터전공 학사',
        certifications: ['정보처리기사', 'PMP', 'SQLP'],
        skills: ['Java', 'Spring Boot', 'Oracle', 'ProFrame', 'MSA', '대용량배치'],
        domains: ['퇴직연금', '신탁/수탁', '계정계 코어'],
        availability_status: '즉시투입가능', available_date: '2026-11-15', current_end_date: '2026-11-10',
        desired_rate: 0, contract_rate: 1250, rating: 4.9,
        review_summary: '메이저 은행 퇴직연금 차세대 PL 3회 수행. DB/DC/IRP 정산 및 상품운용 아키텍처 최고 전문가.',
        verified: 1, resourced_count: 4, parse_seconds: 65,
        career_history: [
          { project: '신한은행 퇴직연금 차세대 구축', client: '신한은행', period: '2024.03 ~ 2026.10', role: '연금정산 PL', tech: 'Java, Spring Batch, Oracle' },
          { project: 'KB국민은행 신탁/퇴직연금 고도화', client: 'KB국민은행', period: '2022.01 ~ 2024.01', role: '설계/개발 리더', tech: 'ProFrame, Oracle, C' }
        ],
        updated_at: '2026-11-12'
      },
      {
        id: 'p_2', name: '강동원', employment_type: '사내 정규직', is_internal: 1, tech_grade: '고급', experience_years: 11, birth_year: 1990,
        phone: '010-9912-3041', email: 'dw.kang@zalwill.co.kr', education: '경희대학교 소프트웨어융합 학사',
        certifications: ['정보처리기사', 'SQLD', 'AWS SAA'],
        skills: ['Java', 'Spring Cloud', 'Kubernetes', 'PostgreSQL', 'Kafka', 'React'],
        domains: ['펀드', '채권', '자산운용/수탁'],
        availability_status: '즉시투입가능', available_date: '2026-11-20', current_end_date: '2026-11-18',
        desired_rate: 0, contract_rate: 1050, rating: 4.8,
        review_summary: '자산운용사 펀드회계 및 채권 트레이딩/수탁 결제 시스템 설계 역량 우수.',
        verified: 1, resourced_count: 3, parse_seconds: 72,
        career_history: [
          { project: '삼성자산운용 글로벌 채권/펀드 수탁 플랫폼', client: '삼성자산운용', period: '2024.06 ~ 2026.11', role: '백엔드 아키텍트', tech: 'Spring Boot, Kafka, PostgreSQL' }
        ],
        updated_at: '2026-11-11'
      },
      {
        id: 'p_3', name: '조진희', employment_type: '사내 전문계약직', is_internal: 1, tech_grade: '중급', experience_years: 7, birth_year: 1994,
        phone: '010-5518-2910', email: 'jh.cho@zalwill.co.kr', education: '숭실대학교 정보통신공학 학사',
        certifications: ['정보처리기사', 'SQLD'],
        skills: ['Java', 'Spring Boot', 'Oracle', 'MyBatis', 'WebSquare', 'Nexacro'],
        domains: ['퇴직연금', '마이데이터', '채널계'],
        availability_status: '투입중(철수예정)', available_date: '2026-12-01', current_end_date: '2026-11-30',
        desired_rate: 850, contract_rate: 830, rating: 4.5,
        review_summary: '성실하고 금융 표준 프레임워크 및 화면/배치 개발 속도가 빠름.',
        verified: 1, resourced_count: 2, parse_seconds: 55,
        career_history: [
          { project: 'NH농협은행 퇴직연금 비대면 채널 고도화', client: 'NH농협은행', period: '2025.01 ~ 2026.11', role: '응용개발', tech: 'Java, Spring, WebSquare' }
        ],
        updated_at: '2026-11-10'
      },
      {
        id: 'p_4', name: '윤서연', employment_type: '사내 정규직', is_internal: 1, tech_grade: '고급', experience_years: 10, birth_year: 1991,
        phone: '010-7741-6120', email: 'sy.yoon@zalwill.co.kr', education: '숙명여자대학교 컴퓨터과학 학사',
        certifications: ['정보처리기사', 'DAP(데이터아키텍처전문가)', 'SQLP'],
        skills: ['Oracle', 'Tibero', 'Python', 'Spark', 'DW/DM', 'SQL튜닝'],
        domains: ['정보계/DW', '퇴직연금', '리스크/컴플라이언스'],
        availability_status: '즉시투입가능', available_date: '2026-11-15', current_end_date: '2026-10-31',
        desired_rate: 0, contract_rate: 1020, rating: 4.9,
        review_summary: '금융권 데이터 모델링 및 대용량 배치 SQL 튜닝 전문가.',
        verified: 1, resourced_count: 5, parse_seconds: 60,
        career_history: [
          { project: '미래에셋증권 퇴직연금 데이터마트 및 수익률 공시 시스템', client: '미래에셋증권', period: '2024.02 ~ 2026.10', role: 'DA / 데이터모델러', tech: 'Oracle, ERwin, SQL튜닝' }
        ],
        updated_at: '2026-11-13'
      },
      {
        id: 'p_5', name: '신은숙', employment_type: '외주 프리랜서', is_internal: 0, tech_grade: '특급', experience_years: 14, birth_year: 1987,
        phone: '010-8282-4911', email: 'es.shin.dev@gmail.com', education: '인하대학교 컴퓨터공학 학사',
        certifications: ['정보처리기사', 'OCJP', 'SQLP'],
        skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame', 'BXM', '대용량정산'],
        domains: ['퇴직연금', '계정계 코어', '수신/신탁'],
        availability_status: '즉시투입가능', available_date: '2026-11-25', current_end_date: '2026-11-20',
        desired_rate: 1150, contract_rate: 1120, rating: 4.8,
        review_summary: '[기검증 우수 인력] 당사 프로젝트 2회 수행. 퇴직연금 수수료 계산 및 원리금/실적배당 결산 배치 무결점 수행.',
        verified: 1, resourced_count: 2, parse_seconds: 78,
        career_history: [
          { project: '교보생명 퇴직연금 코어 시스템 고도화', client: '교보생명', period: '2025.02 ~ 2026.11', role: '배치/정산 개발리더', tech: 'Java, Spring Batch, Oracle' }
        ],
        updated_at: '2026-11-12'
      },
      {
        id: 'p_6', name: '한지민', employment_type: '외주 개인사업자', is_internal: 0, tech_grade: '고급', experience_years: 9, birth_year: 1992,
        phone: '010-6320-1184', email: 'jm.han.fin@naver.com', education: '아주대학교 미디어/소프트웨어 학사',
        certifications: ['정보처리기사'],
        skills: ['React', 'TypeScript', 'Next.js', 'WebSquare', 'Java', 'Spring Boot'],
        domains: ['마이데이터', '채널계', '퇴직연금'],
        availability_status: '즉시투입가능', available_date: '2026-11-18', current_end_date: '2026-11-10',
        desired_rate: 950, contract_rate: 920, rating: 4.7,
        review_summary: '[기검증 우수 인력] 금융권 모바일 앱/웹 채널 및 WebSquare5/React 하이브리드 UI 개발 역량 최상급.',
        verified: 1, resourced_count: 3, parse_seconds: 68,
        career_history: [
          { project: '카카오뱅크 개인형IRP/퇴직연금 모바일 채널 개편', client: '카카오뱅크', period: '2025.01 ~ 2026.10', role: '프론트엔드 리드', tech: 'React, TypeScript, Next.js' }
        ],
        updated_at: '2026-11-09'
      },
      {
        id: 'p_7', name: '오세훈', employment_type: '외주 반프리', is_internal: 0, tech_grade: '고급', experience_years: 10, birth_year: 1991,
        phone: '010-4119-7723', email: 'sh.oh.bond@daum.net', education: '건국대학교 금융IT학과 학사',
        certifications: ['정보처리기사', 'SQLD', '투자자산운용사'],
        skills: ['Java', 'Spring Boot', 'Oracle', 'C#', '채권평가', '펀드회계'],
        domains: ['채권', '펀드', '파생상품'],
        availability_status: '투입중(철수예정)', available_date: '2026-12-05', current_end_date: '2026-11-30',
        desired_rate: 1030, contract_rate: 1000, rating: 4.6,
        review_summary: '[기검증 우수 인력] 투자자산운용사 자격 보유. 채권 시가평가 및 펀드 기준가 산출 도메인 지식이 매우 뛰어남.',
        verified: 1, resourced_count: 1, parse_seconds: 82,
        career_history: [
          { project: '한국자산평가 채권/장외파생 평가엔진 고도화', client: '한국자산평가', period: '2024.08 ~ 2026.11', role: '응용개발', tech: 'Java, Oracle, C#' }
        ],
        updated_at: '2026-11-08'
      },
      {
        id: 'p_8', name: '김도현', employment_type: '외주 프리랜서', is_internal: 0, tech_grade: '특급', experience_years: 11, birth_year: 1990,
        phone: '010-5512-7789', email: 'dh.kim.batch@gmail.com', education: '성균관대학교 소프트웨어학과 학사',
        certifications: ['정보처리기사', 'SQLP'],
        skills: ['Java', 'Spring Batch', 'Oracle', 'SQL튜닝', 'ProFrame'],
        domains: ['퇴직연금', '계정계 코어'],
        availability_status: '즉시투입가능', available_date: '2026-11-22', current_end_date: '2026-11-15',
        desired_rate: 1080, contract_rate: 0, rating: 0,
        review_summary: '[신규 지원 인력] 당사 프로젝트 수행 이력 없음 (타사 농협·우리은행 퇴직연금 배치 수행 · 인터뷰 검증 완료)',
        verified: 0, resourced_count: 0, parse_seconds: 58,
        career_history: [
          { project: 'NH농협은행 퇴직연금 디폴트옵션 및 수수료 정산 구축', client: 'NH농협은행', period: '2024.05 ~ 2026.10', role: '배치 선임개발', tech: 'Java, Spring Batch, Oracle' },
          { project: '우리은행 차세대 퇴직연금 원장/배치 고도화', client: '우리은행', period: '2022.03 ~ 2024.02', role: '코어/배치 개발', tech: 'ProFrame, Oracle, SQL튜닝' }
        ],
        updated_at: '2026-11-11'
      },
      {
        id: 'p_9', name: '이준호', employment_type: '외주 프리랜서', is_internal: 0, tech_grade: '고급', experience_years: 9, birth_year: 1992,
        phone: '010-3901-8821', email: 'jh.lee.pension@naver.com', education: '동국대학교 컴퓨터공학과 학사',
        certifications: ['정보처리기사', 'SQLD'],
        skills: ['Java', 'Spring Boot', 'Spring Batch', 'Oracle'],
        domains: ['퇴직연금', '수신/신탁'],
        availability_status: '즉시투입가능', available_date: '2026-11-28', current_end_date: '2026-11-20',
        desired_rate: 960, contract_rate: 0, rating: 0,
        review_summary: '[신규 파싱 인력] 당사 프로젝트 수행 이력 없음 (오픈 구인 신규 지원자)',
        verified: 0, resourced_count: 0, parse_seconds: 51,
        career_history: [
          { project: '기업은행 퇴직연금 비대면 운용지시 및 정산 개선', client: 'IBK기업은행', period: '2024.04 ~ 2026.09', role: '백엔드/배치 개발', tech: 'Java, Spring Batch, Oracle' }
        ],
        updated_at: '2026-11-12'
      }
    ],
    projects: [
      // 1. 예정(입찰) 프로젝트 (3건)
      {
        id: 'prj_1',
        project_group: 'PLANNED',
        category: 'PENSION',
        name: '미래에셋증권 퇴직연금 로보어드바이저 및 디폴트옵션 차세대 구축',
        client: '미래에셋증권',
        period_label: '2026.12 ~ 2027.10',
        business_type: '금융 SI (입찰제안)',
        domain: '퇴직연금',
        status: 'PLANNED',
        start_date: '2026-12-01',
        end_date: '2027-10-31',
        staffing_deadline: '2026-11-25',
        applicant_count: 5,
        location: '서울 을지로 (상주)',
        contract_type: '일괄도급 (턴키 제안)',
        budget_rate_info: '특급 1,150~1,250만 / 고급 950~1,080만 / 중급 800~900만',
        description: '미래에셋증권의 퇴직연금(DB/DC/IRP) 가입자를 대상으로 AI 로보어드바이저 일임 운용 및 디폴트옵션(사전지정운용제도) 자동 리밸런싱·정산 코어 시스템을 차세대로 전면 재구축하는 프로젝트입니다. 대용량 일마감 배치(Spring Batch/Oracle) 튜닝과 비대면 모바일 IRP 채널 고도화가 핵심 과업입니다.',
        pm_user_id: 'u_internal_pl',
        to_slots: [
          { slot_id: 'slot_101', role_name: '퇴직연금 정산/코어 PL', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_102', role_name: '데이터 아키텍트 (DA/배치튜닝)', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['Oracle', 'SQL튜닝', 'DW/DM'], assigned_profile_id: 'p_4', assigned_name: '윤서연 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_103', role_name: '연금 로보일임·수수료 배치 선임개발', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: null, assigned_name: null, status: '미충원(구인중)' },
          { slot_id: 'slot_104', role_name: '개인형IRP 비대면 채널 프론트/백엔드', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['React', 'WebSquare', 'Spring Boot'], assigned_profile_id: null, assigned_name: null, status: '미충원(구인중)' }
        ],
        created_at: '2026-11-10'
      },
      {
        id: 'prj_2',
        project_group: 'PLANNED',
        category: 'INVESTMENT',
        name: 'KB증권 글로벌 채권·외화펀드 통합 중개 플랫폼 구축',
        client: 'KB증권',
        period_label: '2027.01 ~ 2027.09',
        business_type: '금융 SI (입찰제안)',
        domain: '채권',
        status: 'PLANNED',
        start_date: '2027-01-05',
        end_date: '2027-09-30',
        staffing_deadline: '2026-12-10',
        applicant_count: 3,
        location: '서울 여의도 (상주)',
        contract_type: '타임앤머티리얼 (M/M 제안)',
        budget_rate_info: '고급 1,000~1,100만 / 중급 820~900만',
        description: 'KB증권의 해외 채권 및 외화표시 펀드 실시간 매매·중개·환전 결제 프로세스를 단일 MSA 플랫폼으로 통합 구축하는 사업입니다. 글로벌 예탁기관/채권평가사 대외 전문 연동, 실시간 외화 기준가(NAV) 산출, 채권 시가평가 및 경과이자 계산 엔진 개발 역량이 요구됩니다.',
        pm_user_id: 'u_manager',
        to_slots: [
          { slot_id: 'slot_201', role_name: '채권/외화펀드 수탁 아키텍트 (AA)', required_grade: '고급', required_domain: '채권', required_skills: ['Java', 'Spring Cloud', 'Kafka', 'PostgreSQL'], assigned_profile_id: 'p_2', assigned_name: '강동원 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_202', role_name: '외화채권 시가평가 및 펀드결제 응용개발', required_grade: '고급', required_domain: '채권', required_skills: ['Java', 'Spring Boot', 'Oracle', '펀드회계'], assigned_profile_id: null, assigned_name: null, status: '미충원(구인중)' }
        ],
        created_at: '2026-11-11'
      },
      {
        id: 'prj_3',
        project_group: 'PLANNED',
        category: 'CONSULTING',
        name: 'NH투자증권 차세대 연금자산관리 플랫폼 ISP/PI 컨설팅',
        client: 'NH투자증권',
        period_label: '2026.12 ~ 2027.04',
        business_type: '금융 컨설팅 (입찰제안)',
        domain: '퇴직연금',
        status: 'PLANNED',
        start_date: '2026-12-15',
        end_date: '2027-04-30',
        staffing_deadline: '2026-11-30',
        applicant_count: 2,
        location: '서울 여의도 (상주)',
        contract_type: '전략 컨설팅 (ISP/PI)',
        budget_rate_info: '특급 컨설턴트 1,250만 / 고급 1,050만',
        description: 'NH투자증권의 차세대 퇴직연금 및 개인연금 통합 자산관리 플랫폼 구축을 위한 사전 ISP/PI(업무 프로세스 혁신) 컨설팅 프로젝트입니다. 연금 제도 개편 대응, 마이데이터 기반 초개인화 은퇴설계 서비스 모델 수립, 차세대 IT 목표 아키텍처 및 본사업 RFP 요건 정의를 수행합니다.',
        pm_user_id: 'u_master',
        to_slots: [
          { slot_id: 'slot_301', role_name: '퇴직연금 업무/상품 PI 수석 컨설턴트', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Oracle', 'ProFrame'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_302', role_name: '연금 채널/마이데이터 목표모델 설계', required_grade: '고급', required_domain: '마이데이터', required_skills: ['React', 'Spring Boot', 'MSA'], assigned_profile_id: null, assigned_name: null, status: '미충원' }
        ],
        created_at: '2026-11-12'
      },

      // 2. 진행중인 프로젝트 (3건 - 첨부 이미지 기준)
      {
        id: 'prj_ong_1',
        project_group: 'ONGOING',
        category: 'PENSION',
        name: '하나증권 퇴직연금 일임형로보구축',
        client: '하나증권',
        period_label: '2026.08 ~ 2027.03',
        business_type: '금융 SI (수행중)',
        domain: '퇴직연금',
        status: 'ONGOING',
        start_date: '2026-08-01',
        end_date: '2027-03-31',
        staffing_deadline: '2026-07-25',
        applicant_count: 4,
        location: '서울 여의도 (상주)',
        contract_type: '일괄도급',
        budget_rate_info: '특급 1,180만 / 고급 1,000만 / 중급 850만',
        description: '하나증권 퇴직연금(IRP/DC) 일임형 로보어드바이저 서비스 구축 프로젝트로, 외부 알고리즘 제휴사 연동, 자동 포트폴리오 리밸런싱 주문 생성, 일별 수익률 및 수수료 정산 배치를 구축합니다.',
        pm_user_id: 'u_internal_pl',
        to_slots: [
          { slot_id: 'slot_401', role_name: '퇴직연금 일임형 로보 정산 PL', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_402', role_name: '로보 포트폴리오 리밸런싱 배치 개발', required_grade: '중급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Boot', 'Oracle'], assigned_profile_id: 'p_3', assigned_name: '조진희 (사내 전문계약직)', status: '배정완료' },
          { slot_id: 'slot_403', role_name: '퇴직연금 로보 채널 UI/API 연동 개발', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['React', 'WebSquare', 'Spring Boot'], assigned_profile_id: 'p_5', assigned_name: '신은숙 (외주 프리랜서)', status: '배정완료' }
        ],
        created_at: '2026-08-01'
      },
      {
        id: 'prj_ong_2',
        project_group: 'ONGOING',
        category: 'INVESTMENT',
        name: '외화표시펀드 매매 시스템 구축',
        client: '신영증권',
        period_label: '2026.07 ~ 현재',
        business_type: '금융 SI (수행중)',
        domain: '펀드',
        status: 'ONGOING',
        start_date: '2026-07-01',
        end_date: '2027-02-28',
        staffing_deadline: '2026-06-20',
        applicant_count: 3,
        location: '서울 여의도 (상주)',
        contract_type: '일괄도급',
        budget_rate_info: '고급 1,020만 / 중급 850만',
        description: '신영증권 고객이 달러(USD) 등 외화로 직접 펀드를 매수·환매할 수 있는 외화표시펀드 매매 및 외화예탁금 결제 시스템을 구축하는 프로젝트입니다.',
        pm_user_id: 'u_manager',
        to_slots: [
          { slot_id: 'slot_501', role_name: '외화펀드 매매/환전 결제 아키텍트', required_grade: '고급', required_domain: '펀드', required_skills: ['Java', 'Spring Cloud', 'PostgreSQL'], assigned_profile_id: 'p_2', assigned_name: '강동원 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_502', role_name: '외화펀드 기준가/예탁 결제 개발', required_grade: '고급', required_domain: '채권', required_skills: ['Java', 'Spring Boot', 'Oracle', '펀드회계'], assigned_profile_id: 'p_7', assigned_name: '오세훈 (외주 반프리)', status: '배정완료' }
        ],
        created_at: '2026-07-01'
      },
      {
        id: 'prj_ong_3',
        project_group: 'ONGOING',
        category: 'PENSION',
        name: '연금 고객중심 서비스 개선',
        client: '삼성증권',
        period_label: '2026.03 ~ 2026.10',
        business_type: '금융 SI (수행중)',
        domain: '퇴직연금',
        status: 'ONGOING',
        start_date: '2026-03-01',
        end_date: '2026-10-31',
        staffing_deadline: '2026-02-20',
        applicant_count: 2,
        location: '서울 서초 (상주)',
        contract_type: '일괄도급',
        budget_rate_info: '고급 980만 / 중급 830만',
        description: '삼성증권 모바일(mPOP) 연금 고객의 가입·이전·상품교체 UX/UI를 개편하고 개인별 연금 수익률/절세 혜택 시뮬레이션 데이터마트를 고도화하는 사업입니다.',
        pm_user_id: 'u_internal_pl',
        to_slots: [
          { slot_id: 'slot_601', role_name: '연금 고객 데이터마트 및 수익률 분석 DA', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['Oracle', 'SQL튜닝', 'DW/DM'], assigned_profile_id: 'p_4', assigned_name: '윤서연 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_602', role_name: '모바일 연금 자산관리 대시보드 프론트엔드', required_grade: '고급', required_domain: '채널계', required_skills: ['React', 'TypeScript', 'Next.js'], assigned_profile_id: 'p_6', assigned_name: '한지민 (외주 개인사업자)', status: '배정완료' }
        ],
        created_at: '2026-03-01'
      },

      // 3. 완료된 프로젝트 (7건 - 첨부 이미지 기준)
      {
        id: 'prj_cmp_1',
        project_group: 'COMPLETED',
        category: 'PENSION',
        name: '퇴직연금시스템 고도화',
        client: '하나증권',
        period_label: '2025.07 ~ 2025.07',
        business_type: '금융 SI (완료)',
        domain: '퇴직연금',
        status: 'COMPLETED',
        start_date: '2025-07-01',
        end_date: '2025-07-31',
        staffing_deadline: '2025-06-20',
        applicant_count: 2,
        location: '서울 여의도',
        contract_type: '일괄도급',
        budget_rate_info: '특급 1,150만 / 고급 950만',
        description: '하나증권 퇴직연금 원장 정산 프로세스 개선 및 대용량 배치 처리 성능 고도화를 성공적으로 완수한 프로젝트입니다.',
        pm_user_id: 'u_internal_pl',
        to_slots: [
          { slot_id: 'slot_701', role_name: '퇴직연금 원장/배치 고도화 PL', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_702', role_name: '퇴직연금 정산 배치 개발', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Oracle'], assigned_profile_id: 'p_5', assigned_name: '신은숙 (외주 프리랜서)', status: '배정완료' }
        ],
        created_at: '2025-07-01'
      },
      {
        id: 'prj_cmp_2',
        project_group: 'COMPLETED',
        category: 'PENSION',
        name: 'IRP시스템 ETF 개발',
        client: '우리투자증권',
        period_label: '2025.06 ~ 2025.06',
        business_type: '금융 SI (완료)',
        domain: '퇴직연금',
        status: 'COMPLETED',
        start_date: '2025-06-01',
        end_date: '2025-06-30',
        staffing_deadline: '2025-05-20',
        applicant_count: 2,
        location: '서울 여의도',
        contract_type: '일괄도급',
        budget_rate_info: '고급 980만 / 중급 830만',
        description: '우리투자증권 개인형IRP 및 퇴직연금 계좌 내 실시간 ETF 매매·호가 연동 및 주문 정산 시스템을 구축 완료한 프로젝트입니다.',
        pm_user_id: 'u_manager',
        to_slots: [
          { slot_id: 'slot_703', role_name: 'IRP ETF 실시간 매매 연동 개발', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Boot', 'Oracle'], assigned_profile_id: 'p_2', assigned_name: '강동원 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_704', role_name: 'IRP ETF 주문 채널 화면 개발', required_grade: '중급', required_domain: '퇴직연금', required_skills: ['WebSquare', 'Java'], assigned_profile_id: 'p_3', assigned_name: '조진희 (사내 전문계약직)', status: '배정완료' }
        ],
        created_at: '2025-06-01'
      },
      {
        id: 'prj_cmp_3',
        project_group: 'COMPLETED',
        category: 'PENSION',
        name: '퇴직연금 신시스템 구축',
        client: '키움증권',
        period_label: '2025.04 ~ 2026.06',
        business_type: '금융 SI (완료)',
        domain: '퇴직연금',
        status: 'COMPLETED',
        start_date: '2025-04-01',
        end_date: '2026-06-30',
        staffing_deadline: '2025-03-20',
        applicant_count: 4,
        location: '서울 여의도',
        contract_type: '일괄도급',
        budget_rate_info: '특급 1,150만 / 고급 950만',
        description: '키움증권의 퇴직연금 사업 신규 진출에 따른 DB/DC/IRP 전 제도 원장, 상품운용, 수수료 정산 및 비대면 MTS 채널 신시스템을 구축 완료한 프로젝트입니다.',
        pm_user_id: 'u_internal_pl',
        to_slots: [
          { slot_id: 'slot_705', role_name: '퇴직연금 신시스템 코어 PL', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (사내 정규직)', status: '배정완료' },
          { slot_id: 'slot_706', role_name: '퇴직연금 데이터 모델링 DA', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['Oracle', 'DW/DM', 'SQL튜닝'], assigned_profile_id: 'p_4', assigned_name: '윤서연 (사내 정규직)', status: '배정완료' }
        ],
        created_at: '2025-04-01'
      },
      {
        id: 'prj_cmp_4',
        project_group: 'COMPLETED',
        category: 'CONSULTING',
        name: '연금사업 추진 PI(퇴직연금시스템 구축 컨설팅지원)',
        client: '키움증권',
        period_label: '2025.02 ~ 2025.02',
        business_type: '금융 컨설팅 (완료)',
        domain: '퇴직연금',
        status: 'COMPLETED',
        start_date: '2025-02-01',
        end_date: '2025-02-28',
        staffing_deadline: '2025-01-20',
        applicant_count: 1,
        location: '서울 여의도',
        contract_type: '컨설팅 계약',
        budget_rate_info: '특급 컨설턴트 1,200만',
        description: '키움증권 퇴직연금 신시스템 본사업 착수 전 업무 프로세스 설계(PI) 및 요건 정의를 수행한 컨설팅 프로젝트입니다.',
        pm_user_id: 'u_master',
        to_slots: [
          { slot_id: 'slot_707', role_name: '퇴직연금 사업 추진 PI 리드 컨설턴트', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Oracle', 'ProFrame'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (사내 정규직)', status: '배정완료' }
        ],
        created_at: '2025-02-01'
      },
      {
        id: 'prj_cmp_5',
        project_group: 'COMPLETED',
        category: 'PENSION',
        name: '퇴직연금 실물이전 추가개발',
        client: '대신증권',
        period_label: '2024.12 ~ 2024.12',
        business_type: '금융 SI (완료)',
        domain: '퇴직연금',
        status: 'COMPLETED',
        start_date: '2024-12-01',
        end_date: '2024-12-31',
        staffing_deadline: '2024-11-20',
        applicant_count: 1,
        location: '서울 을지로',
        contract_type: '일괄도급',
        budget_rate_info: '특급 1,120만 / 고급 950만',
        description: '퇴직연금 사업자 간 기존 운용상품 해지 없이 그대로 이전하는 퇴직연금 실물이전 제도 시행에 따른 예탁원/타기관 전문 연동 및 이전 정산 추가개발 프로젝트입니다.',
        pm_user_id: 'u_internal_pl',
        to_slots: [
          { slot_id: 'slot_708', role_name: '퇴직연금 실물이전 대외전문/결제 개발', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: 'p_5', assigned_name: '신은숙 (외주 프리랜서)', status: '배정완료' }
        ],
        created_at: '2024-12-01'
      },
      {
        id: 'prj_cmp_6',
        project_group: 'COMPLETED',
        category: 'CONSULTING',
        name: '집합투자증권 인가컨설팅(판매솔루션 포함)',
        client: '토스뱅크',
        period_label: '2024.09 ~ 2026.06',
        business_type: '금융 컨설팅 (완료)',
        domain: '펀드',
        status: 'COMPLETED',
        start_date: '2024-09-01',
        end_date: '2026-06-30',
        staffing_deadline: '2024-08-20',
        applicant_count: 2,
        location: '서울 역삼',
        contract_type: '컨설팅 및 구축',
        budget_rate_info: '고급 1,050만',
        description: '토스뱅크의 집합투자증권(펀드) 투자중개업 본인가 획득을 위한 물적·전산 설비 요건 컨설팅 및 비대면 펀드 판매솔루션 구축을 완료한 사업입니다.',
        pm_user_id: 'u_manager',
        to_slots: [
          { slot_id: 'slot_709', role_name: '펀드 판매솔루션 아키텍처 컨설팅', required_grade: '고급', required_domain: '펀드', required_skills: ['Java', 'Spring Cloud', 'Kafka'], assigned_profile_id: 'p_2', assigned_name: '강동원 (사내 정규직)', status: '배정완료' }
        ],
        created_at: '2024-09-01'
      },
      {
        id: 'prj_cmp_7',
        project_group: 'COMPLETED',
        category: 'CONSULTING',
        name: '차세대 사전준비 프로젝트(퇴직연금 업무컨설팅)',
        client: '현대차증권',
        period_label: '2024.06 ~ 2024.06',
        business_type: '금융 컨설팅 (완료)',
        domain: '퇴직연금',
        status: 'COMPLETED',
        start_date: '2024-06-01',
        end_date: '2024-06-30',
        staffing_deadline: '2024-05-20',
        applicant_count: 1,
        location: '서울 여의도',
        contract_type: '컨설팅 계약',
        budget_rate_info: '특급 컨설턴트 1,200만',
        description: '현대차증권 차세대 시스템 구축을 앞두고 퇴직연금 부문 현행(As-Is) 업무 분석 및 미래(To-Be) 개선 과제를 도출한 업무컨설팅 프로젝트입니다.',
        pm_user_id: 'u_master',
        to_slots: [
          { slot_id: 'slot_710', role_name: '퇴직연금 차세대 요건정의 수석 컨설턴트', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Oracle'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (사내 정규직)', status: '배정완료' }
        ],
        created_at: '2024-06-01'
      }
    ],
    postings: [
      { id: 'post_1', project_id: 'prj_1', slot_id: 'slot_103', title: '[미래에셋증권 퇴직연금 차세대] 연금 로보일임·수수료 대용량 배치 개발자 (특급/고급)', role_name: '연금 로보일임·수수료 배치 선임개발', required_grade: '특급', required_skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'], required_domain: '퇴직연금', work_location: '서울 을지로', period: '2026.12 ~ 2027.10 (11개월)', rate_guide: '월 1,100 ~ 1,180만원 (경력협의)', status: 'OPEN', sourcing_sent_count: 3, applicant_count: 3, applicants: ['신은숙', '김도현', '이준호'], created_at: '2026-11-09' },
      { id: 'post_2', project_id: 'prj_1', slot_id: 'slot_104', title: '[미래에셋증권 퇴직연금 차세대] 개인형IRP 비대면 채널 UI/API 개발자 (고급)', role_name: '개인형IRP 비대면 채널 프론트/백엔드', required_grade: '고급', required_skills: ['React', 'TypeScript', 'WebSquare', 'Spring Boot'], required_domain: '퇴직연금', work_location: '서울 을지로', period: '2026.12 ~ 2027.10 (11개월)', rate_guide: '월 920 ~ 980만원', status: 'OPEN', sourcing_sent_count: 2, applicant_count: 2, applicants: ['한지민', '박성진'], created_at: '2026-11-10' },
      { id: 'post_3', project_id: 'prj_2', slot_id: 'slot_202', title: '[KB증권 글로벌 채권·외화펀드] 외화채권 시가평가 및 펀드결제 백엔드 개발자 (고급)', role_name: '외화채권 시가평가 및 펀드결제 응용개발', required_grade: '고급', required_skills: ['Java', 'Spring Boot', 'Oracle', '펀드회계'], required_domain: '채권', work_location: '서울 여의도', period: '2027.01 ~ 2027.09 (9개월)', rate_guide: '월 1,000 ~ 1,050만원', status: 'OPEN', sourcing_sent_count: 2, applicant_count: 3, applicants: ['오세훈', '김도윤', '최민수'], created_at: '2026-11-11' }
    ],
    templates: [
      {
        id: 'tpl_pension_batch', category: '금융 코어/배치 검증', role_type: '퇴직연금 백엔드/배치 개발자', domain_focus: '퇴직연금',
        questions: [
          { id: 'q1', type: '직무역량', question: 'DB/DC/IRP 제도별 부담금 입금 및 원리금보장·실적배당 상품 매수/매도 일마감 정산 프로세스를 설명할 수 있는가?', criteria: '실제 퇴직연금 원장 및 상품결제 테이블 설계/개발 경험 확인', weight: 25 },
          { id: 'q2', type: '직무역량', question: '수백만 건 이상의 연금 수수료 계산 및 수익률 산출 대용량 배치(Spring Batch/ProFrame) 재처리 및 최적화 경험이 있는가?', criteria: '대용량 트랜잭션 락 회피 및 파티셔닝 실무 능력', weight: 25 },
          { id: 'q3', type: '직무역량', question: 'Oracle 대용량 조인 실행계획 분석 및 인덱스/힌트 튜닝을 직접 수행할 수 있는가?', criteria: '실제 SQL 튜닝 사례 검증', weight: 20 },
          { id: 'q4', type: '성향·소통', question: '고객사 현업 담당자 또는 타 파트(기획/채널)와 요건 해석이나 설계 이견이 발생했을 때 어떻게 조율하고 해결하는 편인가?', criteria: '갈등 관리 방식, 커뮤니케이션 유연성 및 협업 태도', weight: 15 },
          { id: 'q5', type: '성향·책임감', question: '오픈 직전 통합테스트 중 긴급 결함이나 대용량 배치 지연 이슈가 발생했을 때 본인의 대처 방식과 스트레스 관리 성향은?', criteria: '압박 상황 대처 능력, 완수 책임감 및 중도이탈 방지 검증', weight: 15 }
        ]
      },
      {
        id: 'tpl_bond_fund', category: '자본시장/운용 검증', role_type: '채권·펀드 수탁/원장 개발자', domain_focus: '채권',
        questions: [
          { id: 'q1', type: '직무역량', question: '채권 종류별 경과이자 계산 및 시가평가/듀레이션 산출 로직을 이해하고 있는가?', criteria: '자본시장 채권/펀드 도메인 이해도', weight: 30 },
          { id: 'q2', type: '직무역량', question: '펀드 설정/환매 및 일별 기준가(NAV) 산출 시 예탁원/채권평가사 대외 전문 연동 경험이 있는가?', criteria: '대외계 전문 송수신 및 대사 경험', weight: 30 },
          { id: 'q3', type: '성향·소통', question: '운용역/회계팀 등 현업의 잦은 산식 변경 요청이나 긴급 데이터 검증 요청 시 어떻게 소통하며 우선순위를 조율하는가?', criteria: '현업 응대 태도, 침착성 및 원만한 커뮤니케이션 성향', weight: 20 },
          { id: 'q4', type: '성향·팀워크', question: '사내 정규직 PL 및 외부 프리랜서 동료들과 상주 협업할 때 본인이 선호하는 업무 공유 방식과 팀 적응 스타일은?', criteria: '조직 융화력, 이슈 투명 공유 성향 및 근태 신뢰도', weight: 20 }
        ]
      },
      {
        id: 'tpl_channel_front', category: '금융 채널/프론트 검증', role_type: '금융 비대면 채널/UI 개발자', domain_focus: '채널계',
        questions: [
          { id: 'q1', type: '직무역량', question: '개인형IRP 비대면 계좌개설/상품변경 등 금융 소비자보호법 UI 플로우 구현 경험이 있는가?', criteria: '금융 비대면 프로세스 구현 경험', weight: 30 },
          { id: 'q2', type: '직무역량', question: 'React/TypeScript 상태관리 및 WebSquare5 등 금융권 표준 UI 솔루션 연동 역량', criteria: '금융 그리드/차트 성능 최적화', weight: 30 },
          { id: 'q3', type: '성향·소통', question: '기획자·디자이너·백엔드 개발자 사이에서 UI/UX 변경이나 API 스펙 수정이 빈번할 때 본인의 협업 및 피드백 스타일은?', criteria: '타 직군 존중 태도, 적극적 소통 및 유연한 문제 해결 성향', weight: 20 },
          { id: 'q4', type: '성향·책임감', question: '일정이 촉박한 프로젝트 후반부(통합테스트/리허설)에서 본인의 업무 페이스를 유지하고 마감을 지키는 나만의 방식은?', criteria: '성실성, 일정 준수 의지 및 프로젝트 완주 책임감', weight: 20 }
        ]
      }
    ],
    interviews: [
      {
        id: 'int_1', posting_id: 'post_1', project_id: 'prj_1', slot_id: 'slot_103', candidate_profile_id: 'p_5',
        candidate_name: '신은숙', candidate_type: '외주 프리랜서', candidate_phone: '010-8282-4911', candidate_email: 'es.shin.dev@gmail.com',
        available_from: '2026-11-25', recommender: '정윤희 부장 (사내추천)', desired_rate: 1150,
        resume_summary: '퇴직연금 코어/배치 14년차 특급. 신한은행/교보생명 퇴직연금 정산 배치 리더 수행.',
        tech_grade: '특급', skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'], domains: ['퇴직연금', '계정계 코어'],
        status: '인터뷰통보완료', interview_date: '2026-11-16 14:00', interview_method: '화상(Zoom/Teams)',
        interviewer_user_id: 'u_master', interviewer_name: '조성현 상무', template_id: 'tpl_pension_batch',
        checklist_results: [], total_score: 0, interviewer_opinion: '', final_decision_note: '', created_at: '2026-11-12'
      },
      {
        id: 'int_2', posting_id: 'post_2', project_id: 'prj_1', slot_id: 'slot_104', candidate_profile_id: 'p_6',
        candidate_name: '한지민', candidate_type: '외주 개인사업자', candidate_phone: '010-6320-1184', candidate_email: 'jm.han.fin@naver.com',
        available_from: '2026-11-18', recommender: '타겟소싱 지원', desired_rate: 950,
        resume_summary: '카카오뱅크 IRP 채널 및 KB증권 마이데이터 프론트/백엔드 9년차 고급 개발자.',
        tech_grade: '고급', skills: ['React', 'TypeScript', 'WebSquare', 'Spring Boot'], domains: ['마이데이터', '채널계', '퇴직연금'],
        status: '면접진행완료', interview_date: '2026-11-13 10:00', interview_method: '화상(Zoom/Teams)',
        interviewer_user_id: 'u_master', interviewer_name: '조성현 상무', template_id: 'tpl_channel_front',
        checklist_results: [
          { question: '개인형IRP 비대면 계좌개설 UI 플로우 구현 경험', score: 5, checked: true, note: '카카오뱅크 IRP 비대면 개설 리딩' },
          { question: 'React/TypeScript 및 WebSquare5 연동 역량', score: 4.5, checked: true, note: '즉시 투입 가능' },
          { question: '기획·디자인·백엔드 간 UI/API 스펙 조율 및 협업 스타일', score: 5, checked: true, note: '커뮤니케이션이 매우 유연하고 적극적임' },
          { question: '통합테스트/일정 압박 상황에서의 책임감 및 마감 준수 성향', score: 4.5, checked: true, note: '차분하고 책임감 있게 완수하는 성향' }
        ],
        total_score: 4.8, interviewer_opinion: '비대면 퇴직연금/IRP 채널 경험이 매우 탁월함. 즉시 선발 강력 추천.',
        final_decision_note: '', created_at: '2026-11-11'
      },
      {
        id: 'int_3', posting_id: 'post_1', project_id: 'prj_1', slot_id: 'slot_103', candidate_profile_id: 'p_8',
        candidate_name: '김도현', candidate_type: '외주 프리랜서', candidate_phone: '010-5512-7789', candidate_email: 'dh.kim.batch@gmail.com',
        available_from: '2026-11-22', recommender: '타겟소싱 지원 (신규)', desired_rate: 1080,
        resume_summary: '농협은행·우리은행 퇴직연금 디폴트옵션 및 일마감 정산 배치 개발 11년차 고급/특급 개발자.',
        tech_grade: '특급', skills: ['Java', 'Spring Batch', 'Oracle', 'SQL튜닝', 'ProFrame'], domains: ['퇴직연금', '계정계 코어'],
        status: '면접진행완료', interview_date: '2026-11-13 15:00', interview_method: '화상(Zoom/Teams)',
        interviewer_user_id: 'u_master', interviewer_name: '조성현 상무', template_id: 'tpl_pension_batch',
        checklist_results: [
          { question: 'DB/DC/IRP 제도별 퇴직연금 부담금 산출 및 수수료 정산 배치 설계 경험이 있는가?', score: 4.5, checked: true, note: '농협·우리은행 디폴트옵션 정산 배치 직접 구현' },
          { question: 'Spring Batch Chunk/Tasklet 대용량 처리 시 데드락 및 재처리 아키텍처를 설명할 수 있는가?', score: 4.5, checked: true, note: 'Skip/Retry 및 일마감 재시작 설계 이해도 우수' },
          { question: '야간 일마감 배치 장애나 현업의 급박한 요건 변경 상황에서 동료·PL과 어떻게 소통하며 해결하는가?', score: 4.5, checked: true, note: '침착하게 원인 공유 후 해결하는 태도' },
          { question: '장기 금융 SI 상주 프로젝트에서 팀워크를 해치지 않고 본인의 책임을 끝까지 완수하는 성향인가?', score: 5.0, checked: true, note: '성실하고 책임감이 높음' }
        ],
        total_score: 4.6, interviewer_opinion: '당사 프로젝트 수행 이력은 없으나, 타사 퇴직연금 배치 경험과 직무·성향 인터뷰 평가 결과가 우수하여 신규 투입 추천함.',
        final_decision_note: '', created_at: '2026-11-12'
      },
      {
        id: 'int_4', posting_id: 'post_3', project_id: 'prj_2', slot_id: 'slot_202', candidate_profile_id: 'p_7',
        candidate_name: '오세훈', candidate_type: '외주 반프리', candidate_phone: '010-4119-7723', candidate_email: 'sh.oh.bond@daum.net',
        available_from: '2026-12-05', recommender: '김지영 이사 (기검증풀 초청)', desired_rate: 1030,
        resume_summary: '한국자산평가 채권/장외파생 시가평가 엔진 및 외화펀드 기준가(NAV) 결제 개발 10년차.',
        tech_grade: '고급', skills: ['Java', 'Spring Boot', 'Oracle', '채권평가', '펀드회계'], domains: ['채권', '펀드'],
        status: '인터뷰통보완료', interview_date: '2026-11-18 11:00', interview_method: '대면(여의도)',
        interviewer_user_id: 'u_manager', interviewer_name: '김지영 이사', template_id: 'tpl_bond_fund',
        checklist_results: [], total_score: 0, interviewer_opinion: '', final_decision_note: '', created_at: '2026-11-12'
      }
    ],
    notifications: [
      { id: 'noti_1', target_role: 'EXTERNAL', type: 'INTERVIEW_INVITE', title: '[면접 일정 통보] 미래금융 퇴직연금 차세대', message: '신은숙 님, 2026-11-16 14:00 화상(Zoom/Teams) 인터뷰 일정이 지정되었습니다.', created_at: '2026-11-12 16:30' },
      { id: 'noti_2', target_role: 'INTERNAL', type: 'INTERVIEWER_ASSIGN', title: '[내부 면접관 배정] 지원자 신은숙·한지민 기술검증', message: '정윤희 부장님이 미래금융 퇴직연금 차세대 프로젝트 내부 기술 면접관으로 지정되어 지원자 열람 및 평가 권한이 자동 부여되었습니다.', created_at: '2026-11-12 16:31' },
      { id: 'noti_3', target_role: 'MANAGER', type: 'SOURCING', title: '[타겟 소싱 발송 완료] 기검증 퇴직연금·채권 인재 풀', message: '미충원 3개 포지션에 대해 인재 DB 조건 매칭 후보자 7명에게 타겟 소싱 메일/알림을 발송했습니다.', created_at: '2026-11-12 11:15' }
    ]
  };
}

function loadStore() {
  try {
    if (fs.existsSync(TMP_STORE_PATH)) {
      return JSON.parse(fs.readFileSync(TMP_STORE_PATH, 'utf8'));
    }
  } catch {}
  const initial = getInitialStore();
  saveStore(initial);
  return initial;
}

function saveStore(store) {
  try {
    fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(store), 'utf8');
  } catch {}
}

function getEffectivePermissions(user) {
  if (!user) {
    return { role_group: 'EXTERNAL', can_view_all_profiles: false, can_edit_own_profile: false, can_manage_projects: false, can_extract_proposal: false, can_apply_jobs: true, can_manage_postings: false, can_schedule_interviews: false, can_evaluate_interviews: false, can_view_sensitive_info: false, can_manage_permissions: false };
  }
  if (user.role_group === 'MASTER') {
    return { role_group: 'MASTER', can_view_all_profiles: true, can_edit_own_profile: true, can_manage_projects: true, can_extract_proposal: true, can_apply_jobs: true, can_manage_postings: true, can_schedule_interviews: true, can_evaluate_interviews: true, can_view_sensitive_info: true, can_manage_permissions: true };
  }
  if (user.role_group === 'MANAGER') {
    return { role_group: 'MANAGER', can_view_all_profiles: true, can_edit_own_profile: true, can_manage_projects: true, can_extract_proposal: true, can_apply_jobs: true, can_manage_postings: true, can_schedule_interviews: true, can_evaluate_interviews: true, can_view_sensitive_info: Boolean(user.perm_sensitive_info), can_manage_permissions: false };
  }
  if (user.role_group === 'INTERNAL') {
    return { role_group: 'INTERNAL', can_view_all_profiles: Boolean(user.perm_all_profiles), can_edit_own_profile: true, can_manage_projects: Boolean(user.perm_pm_pl), can_extract_proposal: Boolean(user.perm_pm_pl), can_apply_jobs: true, can_manage_postings: false, can_schedule_interviews: Boolean(user.perm_pm_pl), can_evaluate_interviews: Boolean(user.perm_interviewer), can_view_sensitive_info: false, can_manage_permissions: false };
  }
  return { role_group: 'EXTERNAL', can_view_all_profiles: false, can_edit_own_profile: true, can_manage_projects: false, can_extract_proposal: false, can_apply_jobs: true, can_manage_postings: false, can_schedule_interviews: false, can_evaluate_interviews: false, can_view_sensitive_info: false, can_manage_permissions: false };
}

function parseResumeWithAI(rawText = '', fileName = 'resume.pdf') {
  const text = rawText.trim();
  const nameMatch = text.match(/(?:성\s*명|이\s*름|Name)\s*[:：]\s*([가-힣]{2,5})/i);
  const name = nameMatch ? nameMatch[1] : '김도윤';
  let employment_type = /정규직/.test(text) ? '사내 정규직' : /반프리/.test(text) ? '외주 반프리' : '외주 프리랜서';
  const is_internal = /사내/.test(employment_type);
  const expMatch = text.match(/(\d{1,2})\s*년/);
  const experience_years = expMatch ? parseInt(expMatch[1], 10) : 11;
  const tech_grade = /특급/.test(text) || experience_years >= 12 ? '특급' : /고급/.test(text) || experience_years >= 9 ? '고급' : '중급';
  const knownCerts = ['정보처리기사', 'SQLP', 'SQLD', 'PMP', 'DAP', 'AWS SAA', '투자자산운용사'];
  const certifications = knownCerts.filter(c => text.toUpperCase().includes(c.toUpperCase()));
  if (!certifications.length) certifications.push('정보처리기사');
  const knownSkills = ['Java', 'Spring Boot', 'Spring Batch', 'Spring Cloud', 'Oracle', 'PostgreSQL', 'ProFrame', 'WebSquare', 'React', 'TypeScript', 'Next.js', 'Kafka', 'SQL튜닝', '대용량배치', 'MSA', '펀드회계'];
  const skills = knownSkills.filter(s => text.toLowerCase().includes(s.toLowerCase()));
  if (!skills.length) skills.push('Java', 'Spring Boot', 'Oracle');
  const knownDomains = ['퇴직연금', '펀드', '채권', '계정계 코어', '신탁/수탁', '마이데이터', '채널계', '정보계/DW'];
  const domains = knownDomains.filter(d => text.includes(d.split('/')[0]));
  if (!domains.length) domains.push('퇴직연금');

  return {
    name, employment_type, is_internal, tech_grade, experience_years, birth_year: 1990,
    phone: text.match(/010-\d{3,4}-\d{4}/)?.[0] || '010-5812-9034',
    email: text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || 'talent@zalwill.co.kr',
    education: text.match(/(?:학\s*력|최종학력)\s*[:：]\s*([^\n\r]+)/)?.[1]?.trim() || '고려대학교 컴퓨터정보학과 학사',
    certifications, skills, domains,
    availability_status: '즉시투입가능',
    available_date: text.match(/202[6-8]-[01]\d-[0-3]\d/)?.[0] || '2026-11-22',
    current_end_date: '2026-11-15',
    desired_rate: Number(text.match(/(?:단\s*가|희망단가)\s*[:：]?\s*(\d{3,4})/)?.[1] || 1100),
    contract_rate: 0,
    career_history: [
      { project: '금융권 차세대 원장/배치 시스템 구축', client: '메이저금융', period: '2024.04 ~ 2026.10', role: 'PL/선임개발', tech: skills.slice(0, 3).join(', ') }
    ],
    ai_confidence: 98.4,
    estimated_parse_seconds: 52
  };
}

module.exports = async (req, res) => {
  const store = loadStore();
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const userId = req.headers['x-user-id'] || url.searchParams.get('userId') || 'u_master';
  const currentUser = store.users.find(u => u.id === userId) || null;
  const perms = getEffectivePermissions(currentUser);

  const send = (status, data) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
  };

  let body = {};
  if (req.method === 'POST') {
    if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else {
      body = await new Promise(resolve => {
        let raw = '';
        req.on('data', chunk => (raw += chunk));
        req.on('end', () => {
          try { resolve(raw ? JSON.parse(raw) : {}); } catch { resolve({}); }
        });
      });
    }
  }

  if (pathname === '/api/bootstrap' && req.method === 'GET') {
    const assignedCandidateIds = new Set(
      store.interviews.filter(i => currentUser && i.interviewer_user_id === currentUser.id && i.candidate_profile_id).map(i => i.candidate_profile_id)
    );
    const profiles = store.profiles.map(p => {
      const isOwn = currentUser && currentUser.linked_profile_id === p.id;
      const isAssigned = perms.can_evaluate_interviews && assignedCandidateIds.has(p.id);
      if (!perms.can_view_all_profiles && !isOwn && !isAssigned) return null;
      return {
        ...p,
        is_internal: Boolean(p.is_internal),
        verified: Boolean(p.verified),
        rating: perms.can_view_sensitive_info ? p.rating : null,
        review_summary: perms.can_view_sensitive_info ? p.review_summary : '🔒 [권한 제한] 내부 평점 및 면접 총평은 임원/부서장 및 권한 부여된 관리자만 열람 가능합니다.',
        desired_rate: (perms.can_view_sensitive_info || isOwn) ? p.desired_rate : null,
        contract_rate: perms.can_view_sensitive_info ? p.contract_rate : null
      };
    }).filter(Boolean);

    const internalProfiles = store.profiles.filter(p => p.is_internal);
    const externalVerified = store.profiles.filter(p => !p.is_internal && p.verified);
    const resourcedExternal = externalVerified.filter(p => p.resourced_count > 0);
    const avgParseSeconds = Math.round(store.profiles.reduce((a, p) => a + (p.parse_seconds || 68), 0) / store.profiles.length);

    return send(200, {
      currentUser,
      permissions: perms,
      users: store.users,
      profiles,
      projects: store.projects.map(p => ({
        ...p,
        budget_rate_info: perms.can_view_sensitive_info ? p.budget_rate_info : '🔒 [권한 제한] 단가 가이드 비공개'
      })),
      postings: store.postings,
      templates: store.templates,
      interviews: store.interviews,
      notifications: store.notifications.slice(0, 20),
      kpis: {
        internal_db_rate: 100,
        internal_count: internalProfiles.length,
        external_count: store.profiles.length - internalProfiles.length,
        total_profiles: store.profiles.length,
        avg_parse_seconds: avgParseSeconds,
        proposal_extract_minutes: 12,
        verified_pool_count: externalVerified.length,
        resourcing_rate: externalVerified.length ? Math.round((resourcedExternal.length / externalVerified.length) * 100) : 75
      }
    });
  }

  if (pathname === '/api/ai/parse-resume' && req.method === 'POST') {
    return send(200, { parsed: parseResumeWithAI(body.rawText, body.fileName) });
  }

  if (pathname === '/api/profiles' && req.method === 'POST') {
    const now = new Date().toISOString().slice(0, 10);
    if (body.id) {
      const idx = store.profiles.findIndex(p => p.id === body.id);
      if (idx >= 0) {
        store.profiles[idx] = { ...store.profiles[idx], ...body, updated_at: now };
        saveStore(store);
      }
      return send(200, { ok: true, id: body.id });
    }
    const newId = 'p_' + Date.now();
    const isInternal = /사내/.test(body.employment_type || '');
    store.profiles.unshift({
      id: newId,
      name: body.name || '신규인재',
      employment_type: body.employment_type || '외주 프리랜서',
      is_internal: isInternal ? 1 : 0,
      tech_grade: body.tech_grade || '고급',
      experience_years: Number(body.experience_years || 9),
      birth_year: 1992,
      phone: body.phone || '010-0000-0000',
      email: body.email || 'talent@zalwill.co.kr',
      education: body.education || '학사 졸업',
      certifications: body.certifications || ['정보처리기사'],
      skills: body.skills || ['Java', 'Spring Boot'],
      domains: body.domains || ['퇴직연금'],
      availability_status: body.availability_status || '즉시투입가능',
      available_date: body.available_date || '2026-11-25',
      current_end_date: body.current_end_date || '',
      desired_rate: Number(body.desired_rate || 980),
      contract_rate: isInternal ? Number(body.desired_rate || 980) : 0,
      rating: isInternal ? 4.6 : 0,
      review_summary: 'AI 무정차 파싱으로 표준 DB에 적재된 프로필입니다.',
      verified: isInternal ? 1 : 0,
      resourced_count: 0,
      parse_seconds: 52,
      career_history: body.career_history || [],
      updated_at: now
    });
    saveStore(store);
    return send(201, { ok: true, id: newId });
  }

  if (pathname === '/api/projects' && req.method === 'POST') {
    const newId = 'prj_' + Date.now();
    const grp = body.project_group || 'PLANNED';
    const cat = body.category || (body.domain === '채권' || body.domain === '펀드' ? 'INVESTMENT' : 'PENSION');
    const periodLabel = body.period_label || `${(body.start_date || '').slice(0, 7).replace('-', '.')} ~ ${(body.end_date || '').slice(0, 7).replace('-', '.')}`;
    store.projects.unshift({
      id: newId,
      project_group: grp,
      category: cat,
      name: body.name,
      client: body.client,
      period_label: periodLabel,
      business_type: body.business_type,
      domain: body.domain,
      status: grp,
      start_date: body.start_date,
      end_date: body.end_date,
      staffing_deadline: body.staffing_deadline || '2026-12-05',
      applicant_count: Number(body.applicant_count || 0),
      location: body.location,
      contract_type: '일괄도급',
      budget_rate_info: body.budget_rate_info,
      description: body.description || `${body.client} ${body.name} 사업의 핵심 시스템 설계 및 구축 프로젝트입니다.`,
      pm_user_id: currentUser?.id || 'u_manager',
      to_slots: (body.to_slots || []).map((s, i) => ({
        slot_id: `slot_${Date.now()}_${i}`,
        role_name: s.role_name,
        required_grade: s.required_grade,
        required_domain: s.required_domain,
        required_skills: s.required_skills || ['Java', 'Spring Boot'],
        assigned_profile_id: null,
        assigned_name: null,
        status: '미충원'
      })),
      created_at: new Date().toISOString().slice(0, 10)
    });
    saveStore(store);
    return send(201, { ok: true, id: newId });
  }

  if (pathname === '/api/projects/assign-slot' && req.method === 'POST') {
    const prj = store.projects.find(p => p.id === body.project_id);
    const slot = prj?.to_slots.find(s => s.slot_id === body.slot_id);
    if (slot) {
      if (body.profile_id) {
        const prof = store.profiles.find(p => p.id === body.profile_id);
        slot.assigned_profile_id = prof.id;
        slot.assigned_name = `${prof.name} (${prof.employment_type})`;
        slot.status = '배정완료';
        if (!prof.is_internal) prof.resourced_count = (prof.resourced_count || 0) + 1;
      } else {
        slot.assigned_profile_id = null;
        slot.assigned_name = null;
        slot.status = '미충원';
      }
      saveStore(store);
    }
    return send(200, { ok: true });
  }

  if (pathname === '/api/postings/open-from-slot' && req.method === 'POST') {
    const prj = store.projects.find(p => p.id === body.project_id);
    const slot = prj?.to_slots.find(s => s.slot_id === body.slot_id);
    if (prj && slot) {
      slot.status = '미충원(구인중)';
      store.postings.unshift({
        id: 'post_' + Date.now(),
        project_id: prj.id,
        slot_id: slot.slot_id,
        title: `[${prj.name.slice(0, 16)}] ${slot.role_name} (${slot.required_grade})`,
        role_name: slot.role_name,
        required_grade: slot.required_grade,
        required_skills: slot.required_skills || ['Java', 'Spring Boot'],
        required_domain: slot.required_domain || prj.domain,
        work_location: prj.location,
        period: `${prj.start_date} ~ ${prj.end_date}`,
        rate_guide: '월 950 ~ 1,100만원 (경력협의)',
        status: 'OPEN',
        sourcing_sent_count: 0,
        applicant_count: 0,
        applicants: [],
        created_at: new Date().toISOString().slice(0, 10)
      });
      saveStore(store);
    }
    return send(201, { ok: true });
  }

  if (pathname === '/api/postings/toggle' && req.method === 'POST') {
    const post = store.postings.find(p => p.id === body.posting_id);
    if (post) {
      post.status = post.status === 'OPEN' ? 'CLOSED' : 'OPEN';
      saveStore(store);
    }
    return send(200, { ok: true });
  }

  if (pathname === '/api/postings/target-sourcing' && req.method === 'POST') {
    const post = store.postings.find(p => p.id === body.posting_id);
    const count = (body.candidate_ids || []).length || 1;
    if (post) {
      post.sourcing_sent_count += count;
      store.notifications.unshift({
        id: 'noti_' + Date.now(),
        target_role: 'EXTERNAL',
        type: 'SOURCING',
        title: `[타겟 소싱 초청] ${post.title}`,
        message: `${body.custom_message || ''} (발송 대상 ${count}명)`,
        created_at: new Date().toISOString().slice(0, 16).replace('T', ' ')
      });
      saveStore(store);
    }
    return send(200, { ok: true, sent: count });
  }

  if (pathname === '/api/postings/apply' && req.method === 'POST') {
    const post = store.postings.find(p => p.id === body.posting_id);
    if (post) {
      const candId = 'p_' + Date.now();
      if (body.create_profile_in_db) {
        store.profiles.unshift({
          id: candId,
          name: body.candidate_name,
          employment_type: body.candidate_type || '외주 프리랜서',
          is_internal: 0,
          tech_grade: body.tech_grade || post.required_grade,
          experience_years: 9,
          birth_year: 1992,
          phone: body.candidate_phone,
          email: body.candidate_email,
          education: '학사 졸업',
          certifications: ['정보처리기사'],
          skills: post.required_skills,
          domains: [post.required_domain],
          availability_status: '즉시투입가능',
          available_date: body.available_from,
          current_end_date: '',
          desired_rate: Number(body.desired_rate || 1000),
          contract_rate: 0,
          rating: 0,
          review_summary: '오픈 구인 간편 지원으로 자동 생성된 프로필',
          verified: 0,
          resourced_count: 0,
          parse_seconds: 48,
          career_history: [],
          updated_at: new Date().toISOString().slice(0, 10)
        });
      }
      store.interviews.unshift({
        id: 'int_' + Date.now(),
        posting_id: post.id,
        project_id: post.project_id,
        slot_id: post.slot_id,
        candidate_profile_id: candId,
        candidate_name: body.candidate_name,
        candidate_type: body.candidate_type || '외주 프리랜서',
        candidate_phone: body.candidate_phone,
        candidate_email: body.candidate_email,
        available_from: body.available_from,
        recommender: body.recommender,
        desired_rate: Number(body.desired_rate || 1000),
        resume_summary: body.resume_summary,
        tech_grade: body.tech_grade || post.required_grade,
        skills: post.required_skills,
        domains: [post.required_domain],
        status: '서류검토중',
        interview_date: '',
        interview_method: '',
        interviewer_user_id: '',
        interviewer_name: '',
        template_id: 'tpl_pension_batch',
        checklist_results: [],
        total_score: 0,
        interviewer_opinion: '',
        final_decision_note: '',
        created_at: new Date().toISOString().slice(0, 10)
      });
      const fullName = (body.candidate_name || '지원자').trim();
      post.applicants = Array.isArray(post.applicants) ? [...post.applicants, fullName] : [fullName];
      post.applicant_count = (post.applicant_count || 0) + 1;
      const prj = store.projects.find(p => p.id === post.project_id);
      if (prj) {
        prj.applicant_count = (prj.applicant_count || 0) + 1;
      }
      saveStore(store);
    }
    return send(201, { ok: true });
  }

  if (pathname === '/api/interviews/schedule' && req.method === 'POST') {
    const inv = store.interviews.find(i => i.id === body.interview_id);
    const interviewer = store.users.find(u => u.id === body.interviewer_user_id);
    if (inv) {
      inv.status = '인터뷰통보완료';
      inv.interview_date = body.interview_date;
      inv.interview_method = body.interview_method;
      inv.interviewer_user_id = body.interviewer_user_id;
      inv.interviewer_name = interviewer ? interviewer.name : '정윤희 부장';
      inv.template_id = body.template_id;
      if (interviewer && interviewer.role_group === 'INTERNAL') interviewer.perm_interviewer = 1;
      saveStore(store);
    }
    return send(200, { ok: true });
  }

  if (pathname === '/api/interviews/evaluate' && req.method === 'POST') {
    const inv = store.interviews.find(i => i.id === body.interview_id);
    const results = body.checklist_results || [];
    const avgScore = results.length ? Number((results.reduce((a, c) => a + Number(c.score || 0), 0) / results.length).toFixed(1)) : 4.5;
    if (inv) {
      inv.checklist_results = results;
      inv.total_score = avgScore;
      inv.interviewer_opinion = body.interviewer_opinion;
      inv.status = body.final_status || '면접진행완료';
      const prof = store.profiles.find(p => p.id === inv.candidate_profile_id);
      if (prof) {
        prof.rating = avgScore;
        prof.review_summary = `[인터뷰 ${inv.status}] ${body.interviewer_opinion}`;
        if (inv.status === '최종선정' || avgScore >= 4.0) prof.verified = 1;
      }
      if (inv.status === '최종선정') {
        const prj = store.projects.find(p => p.id === inv.project_id);
        const slot = prj?.to_slots.find(s => s.slot_id === inv.slot_id);
        if (slot) {
          slot.assigned_profile_id = inv.candidate_profile_id;
          slot.assigned_name = `${inv.candidate_name} (${inv.candidate_type})`;
          slot.status = '배정완료';
        }
        const post = store.postings.find(p => p.id === inv.posting_id);
        if (post) post.status = 'CLOSED';
      }
      saveStore(store);
    }
    return send(200, { ok: true, avgScore, status: body.final_status });
  }

  if (pathname === '/api/question-templates' && req.method === 'POST') {
    store.templates.push({
      id: 'tpl_' + Date.now(),
      category: body.category || '직무 검증',
      role_type: body.role_type,
      domain_focus: body.domain_focus,
      questions: body.questions || []
    });
    saveStore(store);
    return send(201, { ok: true });
  }

  if (pathname === '/api/users/permissions' && req.method === 'POST') {
    const u = store.users.find(x => x.id === body.target_user_id);
    if (u) {
      u.perm_all_profiles = body.perm_all_profiles ? 1 : 0;
      u.perm_pm_pl = body.perm_pm_pl ? 1 : 0;
      u.perm_interviewer = body.perm_interviewer ? 1 : 0;
      u.perm_sensitive_info = body.perm_sensitive_info ? 1 : 0;
      saveStore(store);
    }
    return send(200, { ok: true });
  }

  return send(404, { error: 'Not Found' });
};
