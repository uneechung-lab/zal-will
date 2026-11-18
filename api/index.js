const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const zlib = require('node:zlib');

const TMP_STORE_PATH = path.join(os.tmpdir(), 'zalwill-vercel-store-v21.json');

function getInitialStore() {
  return {
    users: [
      { id: 'u_master', name: '조성현 상무', title: '금융사업본부장 (임원/부서장)', department: '금융IT사업본부', role_group: 'MASTER', linked_profile_id: null, perm_all_profiles: 1, perm_pm_pl: 1, perm_interviewer: 1, perm_sensitive_info: 1 },
      { id: 'u_manager', name: '김지영 이사', title: '제안PM / 인력소싱 관리자', department: '전략제안·소싱팀', role_group: 'MANAGER', linked_profile_id: null, perm_all_profiles: 1, perm_pm_pl: 1, perm_interviewer: 1, perm_sensitive_info: 1 },
      { id: 'u_internal_pl', name: '정윤희 부장', title: '정규직 (UI/UX 기획 PL)', department: 'UI/UX전략팀', role_group: 'INTERNAL', linked_profile_id: 'p_1', perm_all_profiles: 1, perm_pm_pl: 1, perm_interviewer: 1, perm_sensitive_info: 0 },
      { id: 'u_internal_dev', name: '신은숙 부장', title: '전문계약직 (백엔드 개발)', department: '코어뱅킹팀', role_group: 'INTERNAL', linked_profile_id: 'p_3', perm_all_profiles: 0, perm_pm_pl: 0, perm_interviewer: 0, perm_sensitive_info: 0 },
      { id: 'u_external', name: '양동근 과장', title: '프리랜서 (계정계)', department: '외부 인재풀', role_group: 'EXTERNAL', linked_profile_id: 'p_5', perm_all_profiles: 0, perm_pm_pl: 0, perm_interviewer: 0, perm_sensitive_info: 0 }
    ],
    profiles: [
      {
        id: 'p_1',
        name: '정윤희',
        ssn_masked: '750204 - 2******',
        gender_age: '여 [51 세 ]',
        company_name: '다음정보시스템즈',
        job_title: '부장',
        available_date_display: '',
        school_name: '이화여대 대학원',
        grad_ym: '2000.08',
        major: '제품디자인',
        degree: '석사',
        career_ym_text: '24 년 0 개월',
        main_skill: 'UI/UX',
        participation_yn: '',
        employment_type: '정규직',
        is_internal: 1,
        tech_grade: '특급',
        experience_years: 24,
        birth_year: 1975,
        phone: '010-8748-6503',
        email: 'unee@daum.net',
        location: '서울특별시 동작구',
        work_preference: '여의도 프로젝트 선호',
        education: '이화여대 대학원 제품디자인 석사',
        certifications: [],
        cert_details: [],
        company_history: [
          { company: '다음정보시스템즈', period: '2026.04 ~ 현 재', position: '부장', duty: 'UI/UX' },
          { company: '프리랜서', period: '2009.02 ~ 2025.09', position: '부장', duty: 'UI/UX' },
          { company: '갤럭시아컴즈', period: '2005.10 ~ 2008.03', position: '과장', duty: 'UI/UX' },
          { company: '이너큐브', period: '2003.11 ~ 2005.07', position: '과장', duty: 'UI/UX' },
          { company: '프리랜서', period: '2001.04 ~ 2003.11', position: '대리', duty: 'UI/UX' },
          { company: '인터넷프라자시티', period: '2000.09 ~ 2001.03', position: '사원', duty: 'UI/UX' }
        ],
        skills: ['UI/UX', 'UI/UX 기획 PL', 'UI/UX 디자인', '퍼블리싱'],
        domains: ['퇴직연금', '마이데이터', '채널계'],
        availability_status: '즉시투입가능',
        available_date: '2026-11-18',
        current_end_date: '2026-11-16',
        desired_rate: 0,
        contract_rate: 1250,
        rating: 4.9,
        review_summary: '금융·공공·엔터프라이즈 UI/UX 기획 PL 및 디자인·퍼블리싱 24년 경력 특급 전문가.',
        verified: 1,
        resourced_count: 4,
        parse_seconds: 65,
        career_history: [
          { project: '정부디지털지갑', period: '24.06~25.09', role: 'UI/UX, 기획 PL', client: '행정안전부', tech: 'UI/UX, 기획 PL' },
          { project: 'LG 전자 대표사이트 (lge.co.kr)', period: '24.01~24.05', role: 'UI/UX, 기획 PL', client: '엘지전자', tech: 'UI/UX, 기획 PL' },
          { project: 'LH 공사 ( 업무지원 챗봇 / 검색 )', period: '23.08~23.10', role: 'UI/UX, 기획 PL', client: 'LH 공사', tech: 'UI/UX, 기획 PL' },
          { project: '산업은행 ( 퇴직연금 )', period: '23.03~23.07', role: 'UI/UX, 기획 PL', client: '산업은행', tech: 'UI/UX, 기획 PL' },
          { project: '대신증권 (MTS)', period: '22.08~23.02', role: 'UI/UX, 기획', client: '대신증권', tech: 'UI/UX, 기획' },
          { project: 'LG CNS ( 하루조각 - 마이데이터 )', period: '22.05~22.07', role: 'UI/UX, 기획', client: 'LG CNS', tech: 'UI/UX, 기획' },
          { project: 'LG U+ ( 외국인 고객 경험 개선 )', period: '21.11~22.04', role: 'UI/UX, 기획', client: 'LG U+', tech: 'UI/UX, 기획' },
          { project: '제주항공 ( 차세대 여객시스템 JLINK)', period: '21.08~21.10', role: 'UI/UX 디자인 / 퍼블리싱', client: '제주항공', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: 'CJ PLM (PC 웹사이트 )', period: '21.05~21.07', role: 'UI/UX, 기획', client: 'CJ', tech: 'UI/UX, 기획' },
          { project: '인천도시공사 ( 스마트시티 )', period: '21.02~21.05', role: 'UI/UX, 기획 PL', client: '인천도시공사', tech: 'UI/UX, 기획 PL' },
          { project: 'LG U+ ( 유플러스 웹사이트 )', period: '20.12~21.02', role: 'UI/UX, 기획', client: 'LG U+', tech: 'UI/UX, 기획' },
          { project: 'NH 농협은행 ( 스마트고지서 )', period: '20.09~20.12', role: 'UI/UX, 기획 PL', client: '농협은행', tech: 'UI/UX, 기획 PL' },
          { project: '삼성건설 ( 헤스티아 )', period: '20.05~20.08', role: 'UI/UX, 기획 / 디자인', client: '삼성건설', tech: 'UI/UX, 기획 / 디자인' },
          { project: 'SAP (HANA DB 모니터링 툴 )', period: '20.04~20.04', role: 'UI/UX, 기획 / 디자인', client: 'SAP', tech: 'UI/UX, 기획 / 디자인' },
          { project: '현대자동차 ( 스마트세일즈케어 )', period: '20.02~20.03', role: 'UI/UX, 기획', client: '현대자동차', tech: 'UI/UX, 기획' },
          { project: '수협 ( 바다로 )', period: '19.11~20.01', role: 'UI/UX, 기획', client: '수협중앙회', tech: 'UI/UX, 기획' },
          { project: '서울시 민원분석시스템 ( 웹 어플리케이션 )', period: '19.08~19.10', role: 'UI/UX, 기획 PL', client: '서울시청', tech: 'UI/UX, 기획 PL' },
          { project: '인공지능 챗봇 ( 웹 어플리케이션 )', period: '19.06~19.07', role: 'UI/UX, 기획 / 디자인', client: '한국서부발전', tech: 'UI/UX, 기획 / 디자인' },
          { project: '직원우대 탑승 우선순위 관리시스템 ( 반응형 웹 )', period: '19.03~19.06', role: 'UI/UX, 디자인 / 퍼블리싱', client: '아시아나 항공', tech: 'UI/UX, 디자인 / 퍼블리싱' },
          { project: 'LG U+( 스마트 가입 )', period: '18.08~19.02', role: 'UI/UX, 기획', client: 'LG U+', tech: 'UI/UX, 기획' },
          { project: 'JT 저축은행 ( 원더풀론 )', period: '18.07~18.08', role: 'UI/UX, 기획', client: 'JT 저축은행', tech: 'UI/UX, 기획' },
          { project: '미래엔 (EIS)', period: '18.03~18.06', role: 'UI/UX, 디자인 / 퍼블리싱', client: '미래엔', tech: 'UI/UX, 디자인 / 퍼블리싱' },
          { project: '삼성전자 ( 마켓커뮤니케이션시스템 )', period: '17.11~18.02', role: 'UI/UX, 기획', client: '삼성전자', tech: 'UI/UX, 기획' },
          { project: 'SKT TIO 포털 ( 지능형 초연결망 선도사업 )', period: '17.09~17.10', role: 'UI/UX, 기획', client: 'SKT', tech: 'UI/UX, 기획' },
          { project: '코스콤 SignKorea ( 통합 인증 앱 )', period: '17.06~17.08', role: 'UI/UX, 디자인 / 퍼블리싱', client: '코스콤', tech: 'UI/UX, 디자인 / 퍼블리싱' },
          { project: '오티스 엘레베이터 OKBS+', period: '17.04~17.05', role: 'UI/UX, 기획', client: '오티스엘레베이터', tech: 'UI/UX, 기획' },
          { project: '정부 디렉토리 시스템', period: '16.11~17.02', role: 'UI/UX, 디자인 PL', client: '행자부', tech: 'UI/UX, 디자인 PL' },
          { project: 'LG U+( 모바일 로밍 )', period: '16.08~16.10', role: 'UI/UX, 기획 / 디자인', client: 'LG U+', tech: 'UI/UX, 기획 / 디자인' },
          { project: 'CJ FPMS', period: '16.06~16.07', role: 'UI/UX, 디자인 / 퍼블리싱', client: 'CJ', tech: 'UI/UX, 디자인 / 퍼블리싱' },
          { project: 'KB Liiv Bank', period: '16.03~16.05', role: 'UI/UX, 디자인 PL', client: 'KB 국민은행', tech: 'UI/UX, 디자인 PL' },
          { project: 'CellWe Collaboration(SNS 형 업무 협업 시스템 )', period: '15.10~16.02', role: 'UI/UX, 디자인 PL', client: '삼성 SDS', tech: 'UI/UX, 디자인 PL' },
          { project: '삼성 SDS EHR 프로젝트', period: '15.04~15.09', role: 'UI/UX, 디자인', client: '삼성 SDS', tech: 'UI/UX, 디자인' },
          { project: 'SAIGLE ( 반응형 웹 에너지 관리 시스템 )', period: '14.09~15.03', role: 'UI/UX 디자인 / 퍼블리싱', client: '에스아이티', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: '삼성전자 AMS 프로젝트', period: '14.08~14.09', role: 'UI/UX, 디자인', client: '삼성전자', tech: 'UI/UX, 디자인' },
          { project: '삼성전자 EHS 프로젝트', period: '14.06~14.07', role: 'UI/UX, 디자인', client: '삼성전자', tech: 'UI/UX, 디자인' },
          { project: '삼성 SDS Smart BMS( 빌딩매니지먼트솔루션 )', period: '12.03~14.03', role: 'UI/UX, 디자인 PL', client: '삼성 SDS', tech: 'UI/UX, 디자인 PL' },
          { project: '삼성 GMES2.0', period: '11.07~12.02', role: 'UI/UX, 디자인', client: '삼성전자', tech: 'UI/UX, 디자인' },
          { project: '삼성화재 ( 모바일 웹사이트 , 어플 )', period: '11.04~11.07', role: 'UI/UX, 디자인', client: '삼성화재', tech: 'UI/UX, 디자인' },
          { project: 'ITMC ( 대시보드 , 웹포털 , 웹어플 )', period: '11.01~11.04', role: 'UI/UX, 디자인 / 퍼블리싱', client: '기아자동차', tech: 'UI/UX, 디자인 / 퍼블리싱' },
          { project: 'KT 올레닷컴', period: '10.10~10.12', role: 'UI/UX, 디자인 PL', client: 'KT', tech: 'UI/UX, 디자인 PL' },
          { project: 'KT 에코노베이션 , 올레스토어', period: '10.08~10.10', role: 'UI/UX , 디자인 PL', client: 'KT', tech: 'UI/UX , 디자인 PL' },
          { project: "자산관리 서비스 '닥터 .S'", period: '10.05~10.08', role: 'UI/UX, 디자인', client: '신한투자금융', tech: 'UI/UX, 디자인' },
          { project: 'LG CNS 협력사 포털', period: '09.03~10.05', role: 'UI/UX 기획 디자인 / 퍼블리싱', client: 'LG CNS (주)', tech: 'UI/UX 기획 디자인 / 퍼블리싱' },
          { project: '8142 모바일 키워드검색', period: '09.10~10.03', role: 'UI/UX , 디자인', client: 'CG 네트워크스(주)', tech: 'UI/UX , 디자인' },
          { project: '삼성 리모 SDK', period: '09.02~09.09', role: 'UI/UX , 디자인', client: '삼성전자', tech: 'UI/UX , 디자인' },
          { project: 'MODION Editor', period: '07.06~08.01', role: 'UI/UX, 기획 / 디자인', client: 'SKT', tech: 'UI/UX, 기획 / 디자인' },
          { project: 'STAR Personal multimedia station', period: '07.02~07.06', role: 'UI/UX, 기획 / 디자인', client: '갤럭시아컴즈(주)', tech: 'UI/UX, 기획 / 디자인' },
          { project: 'MODION SKT 모바일용 인코딩 툴', period: '05.10-06.11', role: 'UI/UX 기획 / 디자인', client: 'SKT', tech: 'UI/UX 기획 / 디자인' },
          { project: 'SK CMO 위원회', period: '05.08 – 05.10', role: 'UI/UX 디자인 / 퍼블리싱', client: 'SK (주)', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: 'MOZEN KTF & HMC 텔래매틱스 (WIPI, KUN)', period: '05.03 – 05.07', role: 'UI/UX 기획 디자인 / 퍼블리싱', client: 'KTF/ 현대자동차', tech: 'UI/UX 기획 디자인 / 퍼블리싱' },
          { project: '이너큐브 2005 Ver', period: '05.05 – 05.06', role: 'UI/UX 기획 디자인 / 퍼블리싱', client: '이너큐브', tech: 'UI/UX 기획 디자인 / 퍼블리싱' },
          { project: '원샷 ! 교통정보 KTF Magic® (WIPI)', period: '05.03 - 05.05', role: 'UI/UX 기획 / 디자인', client: 'KTF', tech: 'UI/UX 기획 / 디자인' },
          { project: '용평모바일존 SKT(WAP)/KTF(KUN)/LGT', period: '05.01 - 05.01', role: 'UI/UX 기획 / 디자인', client: '이너큐브', tech: 'UI/UX 기획 / 디자인' },
          { project: 'SK NATE 용평모빌 (SKVM)', period: '04.10 - 04.12', role: 'UI/UX 기획 / 디자인', client: 'SKT', tech: 'UI/UX 기획 / 디자인' },
          { project: 'KTF Magic® M- 에버웨이 (BREW)', period: '04.07 - 04.09', role: 'UI/UX 기획 / 디자인', client: 'KTF', tech: 'UI/UX 기획 / 디자인' },
          { project: 'KTF Magic® 차량제어서비스 (BREW)', period: '04.07 – 04.07', role: 'UI/UX 기획 / 디자인', client: 'KTF', tech: 'UI/UX 기획 / 디자인' },
          { project: 'EVERWAYKTF&SMC 텔래매틱스 무선 웹 Ver2', period: '04.05 – 04.07', role: 'UI/UX 기획 / 디자인', client: 'KTF', tech: 'UI/UX 기획 / 디자인' },
          { project: '아이비즈업', period: '04.03 - 04.05', role: 'UI/UX 기획 디자인 / 퍼블리싱', client: '이너큐브', tech: 'UI/UX 기획 디자인 / 퍼블리싱' },
          { project: 'EVERWAY KTF&SMC 텔래매틱스', period: '04.01 – 04.02', role: 'UI/UX 기획 디자인 / 퍼블리싱', client: 'KTF', tech: 'UI/UX 기획 디자인 / 퍼블리싱' },
          { project: '에듀 GPS', period: '04.01 – 04.01', role: 'UI/UX 디자인', client: '이너큐브', tech: 'UI/UX 디자인' },
          { project: '이너큐브 2004 Ver', period: '03.12 – 04.01', role: 'UI/UX 디자인 / 퍼블리싱', client: '이너큐브', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: 'EVERWAY KTF&SICC 텔래매틱스 Ver1', period: '03.05 – 03.11', role: 'UI/UX 디자인 / 퍼블리싱', client: 'KTF/ 쌍용자동차', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: 'KT Neoss PDA UI', period: '03.05 - 03.05', role: 'UI/UX 디자인', client: 'KT', tech: 'UI/UX 디자인' },
          { project: '민주당 국회의원 관련 웹사이트 디자인', period: '03.01 - 03.05', role: 'UI/UX 디자인 / 퍼블리싱', client: '민주당', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: '차세대웹단말시스템 ( 업무용 웹 어플리케이션 ) UI', period: '02.09 - 02.12', role: 'UI/UX 디자인 / 퍼블리싱', client: '외환카드', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: '경영관리시스템 內의 5 개 시스템 UI', period: '02.08 - 02.09', role: 'UI/UX 디자인 / 퍼블리싱', client: '산업은행', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: '이벤트 & 프로모션 관련 웹 디자인', period: '01.12 - 02.08', role: 'UI/UX 디자인 / 퍼블리싱', client: '현대캐피탈', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: '도그팅 / 헬로산타 인터넷쇼핑몰', period: '02.04 - 02.07', role: 'UI/UX 디자인 / 퍼블리싱', client: '드림소프트', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: 'Good Friends 웹마일리지 후원센터', period: '01.10 - 01.11', role: 'UI/UX 디자인 / 퍼블리싱', client: '인터파크구스닥', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: 'DAKS 2001 FW 웹 사이트', period: '01.08 - 01.09', role: 'UI/UX 디자인 / 퍼블리싱', client: '엘지패션', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: '장안동 현대홈타운 홈 오토메이션 시스템 UI', period: '01.04 - 01.08', role: 'UI/UX 디자인 / 퍼블리싱', client: '현대홈타운', tech: 'UI/UX 디자인 / 퍼블리싱' },
          { project: '도메인 비즈니스 포탈사이트', period: '00.09 - 01.04', role: 'UI/UX 디자인 / 퍼블리싱', client: '인터넷프라자시티(주)', tech: 'UI/UX 디자인 / 퍼블리싱' }
        ],
        updated_at: '2026-11-12'
      },
      {
        id: 'p_2', name: '강동원', employment_type: '정규직', is_internal: 1, tech_grade: '고급', experience_years: 11, birth_year: 1990,
        phone: '010-9912-3041', email: 'dw.kang@zalwill.co.kr', education: '경희대학교 소프트웨어융합 학사',
        certifications: ['정보처리기사', 'SQLD', 'AWS SAA'],
        skills: ['Java', 'Spring Cloud', 'Kubernetes', 'PostgreSQL', 'Kafka', 'React'],
        domains: ['펀드', '채권', '자산운용/수탁'],
        availability_status: '즉시투입가능', available_date: '2026-11-23', current_end_date: '2026-11-19',
        desired_rate: 0, contract_rate: 1050, rating: 4.8,
        review_summary: '자산운용사 펀드회계 및 채권 트레이딩/수탁 결제 시스템 설계 역량 우수.',
        verified: 1, resourced_count: 3, parse_seconds: 72,
        career_history: [
          { project: '삼성자산운용 글로벌 채권/펀드 수탁 플랫폼', client: '삼성자산운용', period: '2024.06 ~ 2026.11', role: '백엔드 아키텍트', tech: 'Spring Boot, Kafka, PostgreSQL' }
        ],
        updated_at: '2026-11-11'
      },
      {
        id: 'p_3', name: '신은숙', employment_type: '전문계약직', is_internal: 1, tech_grade: '특급', experience_years: 14, birth_year: 1987,
        phone: '010-5518-2910', email: 'es.shin@zalwill.co.kr', education: '숭실대학교 정보통신공학 학사',
        certifications: ['정보처리기사', 'SQLP', 'SQLD'],
        skills: ['Java', 'Spring Boot', 'Oracle', 'MyBatis', 'WebSquare', 'Nexacro'],
        domains: ['퇴직연금', '마이데이터', '채널계'],
        availability_status: '투입중(철수예정)', available_date: '2026-12-01', current_end_date: '2026-11-30',
        desired_rate: 1150, contract_rate: 1120, rating: 4.8,
        review_summary: '부장급 사내 전문계약직 리더. 금융 표준 프레임워크 및 채널·배치 개발 역량이 뛰어남.',
        verified: 1, resourced_count: 2, parse_seconds: 55,
        career_history: [
          { project: 'NH농협은행 퇴직연금 비대면 채널 고도화', client: 'NH농협은행', period: '2025.01 ~ 2026.11', role: '응용개발 리더(부장)', tech: 'Java, Spring, WebSquare' }
        ],
        updated_at: '2026-11-10'
      },
      {
        id: 'p_4', name: '윤서연', employment_type: '정규직', is_internal: 1, tech_grade: '고급', experience_years: 10, birth_year: 1991,
        phone: '010-7741-6120', email: 'sy.yoon@zalwill.co.kr', education: '숙명여자대학교 컴퓨터과학 학사',
        certifications: ['정보처리기사', 'DAP(데이터아키텍처전문가)', 'SQLP'],
        skills: ['Oracle', 'Tibero', 'Python', 'Spark', 'DW/DM', 'SQL튜닝'],
        domains: ['정보계/DW', '퇴직연금', '리스크/컴플라이언스'],
        availability_status: '즉시투입가능', available_date: '2026-11-18', current_end_date: '2026-11-16',
        desired_rate: 0, contract_rate: 1020, rating: 4.9,
        review_summary: '금융권 데이터 모델링 및 대용량 배치 SQL 튜닝 전문가.',
        verified: 1, resourced_count: 5, parse_seconds: 60,
        career_history: [
          { project: '미래에셋증권 퇴직연금 데이터마트 및 수익률 공시 시스템', client: '미래에셋증권', period: '2024.02 ~ 2026.10', role: 'DA / 데이터모델러', tech: 'Oracle, ERwin, SQL튜닝' }
        ],
        updated_at: '2026-11-13'
      },
      {
        id: 'p_5', name: '양동근', employment_type: '프리랜서', is_internal: 0, tech_grade: '중급', experience_years: 7, birth_year: 1994,
        phone: '010-8282-4911', email: 'dg.yang.dev@gmail.com', education: '인하대학교 컴퓨터공학 학사',
        certifications: ['정보처리기사', 'OCJP', 'SQLD'],
        skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame', 'BXM', '대용량정산'],
        domains: ['퇴직연금', '계정계 코어', '수신/신탁'],
        availability_status: '즉시투입가능', available_date: '2026-11-25', current_end_date: '2026-11-20',
        desired_rate: 850, contract_rate: 830, rating: 4.8,
        review_summary: '[기검증 우수 인력] 당사 프로젝트 2회 수행(과장급). 퇴직연금 수수료 계산 및 원리금/실적배당 결산 배치 무결점 수행.',
        verified: 1, resourced_count: 2, parse_seconds: 78,
        career_history: [
          { project: '교보생명 퇴직연금 코어 시스템 고도화', client: '교보생명', period: '2025.02 ~ 2026.11', role: '배치/정산 선임개발(과장)', tech: 'Java, Spring Batch, Oracle' }
        ],
        updated_at: '2026-11-12'
      },
      {
        id: 'p_6', name: '한지민', employment_type: '개인사업자', is_internal: 0, tech_grade: '고급', experience_years: 9, birth_year: 1992,
        phone: '010-6320-1184', email: 'jm.han.fin@naver.com', education: '아주대학교 미디어/소프트웨어 학사',
        certifications: ['정보처리기사'],
        skills: ['React', 'TypeScript', 'Next.js', 'WebSquare', 'Java', 'Spring Boot'],
        domains: ['마이데이터', '채널계', '퇴직연금'],
        availability_status: '즉시투입가능', available_date: '2026-11-20', current_end_date: '2026-11-18',
        desired_rate: 950, contract_rate: 920, rating: 4.7,
        review_summary: '[기검증 우수 인력] 금융권 모바일 앱/웹 채널 및 WebSquare5/React 하이브리드 UI 개발 역량 최상급.',
        verified: 1, resourced_count: 3, parse_seconds: 68,
        career_history: [
          { project: '카카오뱅크 개인형IRP/퇴직연금 모바일 채널 개편', client: '카카오뱅크', period: '2025.01 ~ 2026.10', role: '프론트엔드 리드', tech: 'React, TypeScript, Next.js' }
        ],
        updated_at: '2026-11-09'
      },
      {
        id: 'p_7', name: '오세훈', employment_type: '반프리', is_internal: 0, tech_grade: '고급', experience_years: 10, birth_year: 1991,
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
        id: 'p_8', name: '김도현', employment_type: '협력사', is_internal: 0, tech_grade: '특급', experience_years: 11, birth_year: 1990,
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
        id: 'p_9', name: '이준호', employment_type: '프리랜서', is_internal: 0, tech_grade: '고급', experience_years: 9, birth_year: 1992,
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
          { slot_id: 'slot_101', role_name: '퇴직연금 정산/코어 PL', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (정규직)', status: '확정' },
          { slot_id: 'slot_102', role_name: '데이터 아키텍트 (DA/배치튜닝)', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['Oracle', 'SQL튜닝', 'DW/DM'], assigned_profile_id: 'p_4', assigned_name: '윤서연 (정규직)', status: '확정' },
          { slot_id: 'slot_103', role_name: '연금 로보일임·수수료 배치 선임개발', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: null, assigned_name: null, status: '구인중' },
          { slot_id: 'slot_104', role_name: '개인형IRP 비대면 채널 프론트/백엔드', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['React', 'WebSquare', 'Spring Boot'], assigned_profile_id: null, assigned_name: null, status: '구인중' }
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
          { slot_id: 'slot_201', role_name: '채권/외화펀드 수탁 아키텍트 (AA)', required_grade: '고급', required_domain: '채권', required_skills: ['Java', 'Spring Cloud', 'Kafka', 'PostgreSQL'], assigned_profile_id: 'p_2', assigned_name: '강동원 (정규직)', status: '확정' },
          { slot_id: 'slot_202', role_name: '외화채권 시가평가 및 펀드결제 응용개발', required_grade: '고급', required_domain: '채권', required_skills: ['Java', 'Spring Boot', 'Oracle', '펀드회계'], assigned_profile_id: null, assigned_name: null, status: '구인중' }
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
          { slot_id: 'slot_301', role_name: '퇴직연금 업무/상품 PI 수석 컨설턴트', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Oracle', 'ProFrame'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (정규직)', status: '확정' },
          { slot_id: 'slot_302', role_name: '연금 채널/마이데이터 목표모델 설계', required_grade: '고급', required_domain: '마이데이터', required_skills: ['React', 'Spring Boot', 'MSA'], assigned_profile_id: null, assigned_name: null, status: '구인중' }
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
          { slot_id: 'slot_401', role_name: '퇴직연금 일임형 로보 정산 PL', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (정규직)', status: '확정' },
          { slot_id: 'slot_402', role_name: '로보 포트폴리오 리밸런싱 배치 개발', required_grade: '중급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Boot', 'Oracle'], assigned_profile_id: 'p_3', assigned_name: '신은숙 (전문계약직)', status: '확정' },
          { slot_id: 'slot_403', role_name: '퇴직연금 로보 채널 UI/API 연동 개발', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['React', 'WebSquare', 'Spring Boot'], assigned_profile_id: 'p_5', assigned_name: '양동근 (프리랜서)', status: '확정' }
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
          { slot_id: 'slot_501', role_name: '외화펀드 매매/환전 결제 아키텍트', required_grade: '고급', required_domain: '펀드', required_skills: ['Java', 'Spring Cloud', 'PostgreSQL'], assigned_profile_id: 'p_2', assigned_name: '강동원 (정규직)', status: '확정' },
          { slot_id: 'slot_502', role_name: '외화펀드 기준가/예탁 결제 개발', required_grade: '고급', required_domain: '채권', required_skills: ['Java', 'Spring Boot', 'Oracle', '펀드회계'], assigned_profile_id: 'p_7', assigned_name: '오세훈 (반프리)', status: '확정' }
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
          { slot_id: 'slot_601', role_name: '연금 고객 데이터마트 및 수익률 분석 DA', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['Oracle', 'SQL튜닝', 'DW/DM'], assigned_profile_id: 'p_4', assigned_name: '윤서연 (정규직)', status: '확정' },
          { slot_id: 'slot_602', role_name: '모바일 연금 자산관리 대시보드 프론트엔드', required_grade: '고급', required_domain: '채널계', required_skills: ['React', 'TypeScript', 'Next.js'], assigned_profile_id: 'p_6', assigned_name: '한지민 (개인사업자)', status: '확정' }
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
          { slot_id: 'slot_701', role_name: '퇴직연금 원장/배치 고도화 PL', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (정규직)', status: '확정' },
          { slot_id: 'slot_702', role_name: '퇴직연금 정산 배치 개발', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Oracle'], assigned_profile_id: 'p_5', assigned_name: '양동근 (프리랜서)', status: '확정' }
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
          { slot_id: 'slot_703', role_name: 'IRP ETF 실시간 매매 연동 개발', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Boot', 'Oracle'], assigned_profile_id: 'p_2', assigned_name: '강동원 (정규직)', status: '확정' },
          { slot_id: 'slot_704', role_name: 'IRP ETF 주문 채널 화면 개발', required_grade: '중급', required_domain: '퇴직연금', required_skills: ['WebSquare', 'Java'], assigned_profile_id: 'p_3', assigned_name: '신은숙 (전문계약직)', status: '확정' }
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
          { slot_id: 'slot_705', role_name: '퇴직연금 신시스템 코어 PL', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (정규직)', status: '확정' },
          { slot_id: 'slot_706', role_name: '퇴직연금 데이터 모델링 DA', required_grade: '고급', required_domain: '퇴직연금', required_skills: ['Oracle', 'DW/DM', 'SQL튜닝'], assigned_profile_id: 'p_4', assigned_name: '윤서연 (정규직)', status: '확정' }
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
          { slot_id: 'slot_707', role_name: '퇴직연금 사업 추진 PI 리드 컨설턴트', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Oracle', 'ProFrame'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (정규직)', status: '확정' }
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
          { slot_id: 'slot_708', role_name: '퇴직연금 실물이전 대외전문/결제 개발', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Spring Batch', 'Oracle'], assigned_profile_id: 'p_5', assigned_name: '양동근 (프리랜서)', status: '확정' }
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
          { slot_id: 'slot_709', role_name: '펀드 판매솔루션 아키텍처 컨설팅', required_grade: '고급', required_domain: '펀드', required_skills: ['Java', 'Spring Cloud', 'Kafka'], assigned_profile_id: 'p_2', assigned_name: '강동원 (정규직)', status: '확정' }
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
          { slot_id: 'slot_710', role_name: '퇴직연금 차세대 요건정의 수석 컨설턴트', required_grade: '특급', required_domain: '퇴직연금', required_skills: ['Java', 'Oracle'], assigned_profile_id: 'p_1', assigned_name: '정윤희 (정규직)', status: '확정' }
        ],
        created_at: '2024-06-01'
      }
    ],
    postings: [
      { id: 'post_1', project_id: 'prj_1', slot_id: 'slot_103', title: '[미래에셋증권 퇴직연금 차세대] 연금 로보일임·수수료 대용량 배치 개발자 (특급/고급)', role_name: '연금 로보일임·수수료 배치 선임개발', required_grade: '특급', required_skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'], required_domain: '퇴직연금', work_location: '서울 을지로', period: '2026.12 ~ 2027.10 (11개월)', rate_guide: '월 1,100 ~ 1,180만원 (경력협의)', status: 'OPEN', sourcing_sent_count: 3, applicant_count: 3, applicants: ['양동근', '김도현', '이준호'], created_at: '2026-11-09' },
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
        candidate_name: '양동근', candidate_type: '프리랜서', candidate_phone: '010-8282-4911', candidate_email: 'dg.yang.dev@gmail.com',
        available_from: '2026-11-25', recommender: '정윤희 부장 (사내추천)', desired_rate: 850,
        resume_summary: '퇴직연금 코어/배치 7년차 중급(과장급). 신한은행/교보생명 퇴직연금 정산 배치 수행.',
        tech_grade: '중급', skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'], domains: ['퇴직연금', '계정계 코어'],
        status: '인터뷰통보완료', interview_date: '2026-11-16 14:00', interview_method: '화상(Zoom/Teams)',
        interviewer_user_id: 'u_master', interviewer_name: '조성현 상무', template_id: 'tpl_pension_batch',
        checklist_results: [], total_score: 0, interviewer_opinion: '', final_decision_note: '', created_at: '2026-11-12'
      },
      {
        id: 'int_2', posting_id: 'post_2', project_id: 'prj_1', slot_id: 'slot_104', candidate_profile_id: 'p_6',
        candidate_name: '한지민', candidate_type: '개인사업자', candidate_phone: '010-6320-1184', candidate_email: 'jm.han.fin@naver.com',
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
        candidate_name: '김도현', candidate_type: '협력사', candidate_phone: '010-5512-7789', candidate_email: 'dh.kim.batch@gmail.com',
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
        candidate_name: '오세훈', candidate_type: '반프리', candidate_phone: '010-4119-7723', candidate_email: 'sh.oh.bond@daum.net',
        available_from: '2026-12-05', recommender: '김지영 이사 (기검증풀 초청)', desired_rate: 1030,
        resume_summary: '한국자산평가 채권/장외파생 시가평가 엔진 및 외화펀드 기준가(NAV) 결제 개발 10년차.',
        tech_grade: '고급', skills: ['Java', 'Spring Boot', 'Oracle', '채권평가', '펀드회계'], domains: ['채권', '펀드'],
        status: '인터뷰통보완료', interview_date: '2026-11-18 11:00', interview_method: '대면(여의도)',
        interviewer_user_id: 'u_manager', interviewer_name: '김지영 이사', template_id: 'tpl_bond_fund',
        checklist_results: [], total_score: 0, interviewer_opinion: '', final_decision_note: '', created_at: '2026-11-12'
      }
    ],
    notifications: [
      { id: 'noti_1', target_role: 'EXTERNAL', type: 'INTERVIEW_INVITE', title: '[면접 일정 통보] 미래금융 퇴직연금 차세대', message: '양동근 님, 2026-11-16 14:00 화상(Zoom/Teams) 인터뷰 일정이 지정되었습니다.', created_at: '2026-11-12 16:30' },
      { id: 'noti_2', target_role: 'INTERNAL', type: 'INTERVIEWER_ASSIGN', title: '[내부 면접관 배정] 지원자 양동근·한지민 기술검증', message: '정윤희 부장님이 미래금융 퇴직연금 차세대 프로젝트 내부 기술 면접관으로 지정되어 지원자 열람 및 평가 권한이 자동 부여되었습니다.', created_at: '2026-11-12 16:31' },
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

function xmlToStructuredText(xmlStr) {
  // Join paragraphs inside table cells (<a:tc>, <w:tc>, <hp:tc>) with spaces, separate cells with " | ", and rows with "\n"
  const withTableStructure = xmlStr
    .replace(/<(a:tc|w:tc|hp:tc)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _tag, inner) => {
      const cellText = inner
        .replace(/<\/(a:p|w:p|hp:p)>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
      return cellText + ' | ';
    })
    .replace(/<\/(a:tr|w:tr|hp:tr|row)>/gi, '\n')
    .replace(/<\/(a:p|w:p|hp:p|p|si)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

  return withTableStructure
    .split(/\r?\n/)
    .map(line => line.replace(/[ \t]+/g, ' ').replace(/(\s*\|\s*)+$/g, '').trim())
    .filter(Boolean)
    .join('\n');
}

function isTargetOfficeXmlEntry(entryName) {
  return (
    /^word\/document\.xml$/i.test(entryName) ||
    /^ppt\/slides\/slide\d+\.xml$/i.test(entryName) ||
    /^xl\/sharedStrings\.xml$/i.test(entryName) ||
    /^Contents\/section\d+\.xml$/i.test(entryName)
  );
}

function extractTextFromBuffer(buf, fileName = '') {
  if (!buf || !buf.length) return '';
  const ext = path.extname(fileName).toLowerCase();

  // 1. ZIP-based Office / HWPX documents (.pptx, .docx, .xlsx, .hwpx) using Central Directory + Local Header fallback
  if (buf.length > 4 && buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) {
    const entries = [];

    // Locate End of Central Directory (EOCD: 0x06054b50)
    let eocdOffset = -1;
    const minSearch = Math.max(0, buf.length - 65557);
    for (let i = buf.length - 22; i >= minSearch; i--) {
      if (buf.readUInt32LE(i) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }

    if (eocdOffset >= 0) {
      const totalEntries = buf.readUInt16LE(eocdOffset + 10);
      let cdPos = buf.readUInt32LE(eocdOffset + 16);
      for (let idx = 0; idx < totalEntries && cdPos + 46 <= buf.length; idx++) {
        if (buf.readUInt32LE(cdPos) !== 0x02014b50) break;
        const compression = buf.readUInt16LE(cdPos + 10);
        const compressedSize = buf.readUInt32LE(cdPos + 20);
        const nameLen = buf.readUInt16LE(cdPos + 28);
        const extraLen = buf.readUInt16LE(cdPos + 30);
        const commentLen = buf.readUInt16LE(cdPos + 32);
        const localHeaderOffset = buf.readUInt32LE(cdPos + 42);
        const entryName = buf.subarray(cdPos + 46, cdPos + 46 + nameLen).toString('utf8');
        cdPos += 46 + nameLen + extraLen + commentLen;

        if (isTargetOfficeXmlEntry(entryName) && localHeaderOffset + 30 <= buf.length) {
          const lNameLen = buf.readUInt16LE(localHeaderOffset + 26);
          const lExtraLen = buf.readUInt16LE(localHeaderOffset + 28);
          const dataStart = localHeaderOffset + 30 + lNameLen + lExtraLen;
          const dataEnd = dataStart + compressedSize;
          if (dataEnd <= buf.length) {
            entries.push({ entryName, compression, rawEntry: buf.subarray(dataStart, dataEnd) });
          }
        }
      }
    }

    // Fallback to sequential Local File Headers if Central Directory was not found
    if (entries.length === 0) {
      let offset = 0;
      while (offset + 30 <= buf.length) {
        if (buf.readUInt32LE(offset) !== 0x04034b50) break;
        const compression = buf.readUInt16LE(offset + 8);
        const compressedSize = buf.readUInt32LE(offset + 18);
        const nameLen = buf.readUInt16LE(offset + 26);
        const extraLen = buf.readUInt16LE(offset + 28);
        const entryName = buf.subarray(offset + 30, offset + 30 + nameLen).toString('utf8');
        const dataStart = offset + 30 + nameLen + extraLen;
        if (compressedSize === 0) break;
        const dataEnd = dataStart + compressedSize;
        if (dataEnd > buf.length) break;
        if (isTargetOfficeXmlEntry(entryName)) {
          entries.push({ entryName, compression, rawEntry: buf.subarray(dataStart, dataEnd) });
        }
        offset = dataEnd;
      }
    }

    // Sort entries naturally so slide1.xml, slide2.xml, slide3.xml are in numeric order
    entries.sort((a, b) => a.entryName.localeCompare(b.entryName, undefined, { numeric: true }));

    const chunks = [];
    for (const item of entries) {
      try {
        const xmlBuf = item.compression === 8
          ? zlib.inflateRawSync(item.rawEntry)
          : item.compression === 0
            ? item.rawEntry
            : null;
        if (xmlBuf) {
          chunks.push(xmlToStructuredText(xmlBuf.toString('utf8')));
        }
      } catch {}
    }

    if (chunks.length > 0) {
      return chunks.join('\n').trim();
    }
  }

  // 2. PDF documents (with ToUnicode CMap + FlateDecode stream extraction)
  if (ext === '.pdf' || (buf.length > 4 && buf.subarray(0, 4).toString('ascii') === '%PDF')) {
    const rawLatin = buf.toString('latin1');
    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    const inflatedStreams = [];
    const cmap = new Map();
    let m;

    while ((m = streamRegex.exec(rawLatin)) !== null) {
      try {
        const streamBuf = Buffer.from(m[1], 'latin1');
        const inflated = zlib.inflateSync(streamBuf);
        const s = inflated.toString('latin1');
        inflatedStreams.push({ s, utf8: inflated.toString('utf8') });

        if (s.includes('beginbfchar') || s.includes('beginbfrange')) {
          const bfcharBlocks = s.match(/beginbfchar([\s\S]*?)endbfchar/g) || [];
          for (const blk of bfcharBlocks) {
            const pairRe = /<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g;
            let pm;
            while ((pm = pairRe.exec(blk)) !== null) {
              const src = pm[1].toUpperCase();
              const dstHex = pm[2];
              let dstStr = '';
              for (let i = 0; i < dstHex.length; i += 4) {
                const cp = parseInt(dstHex.slice(i, i + 4), 16);
                if (!Number.isNaN(cp)) dstStr += String.fromCodePoint(cp);
              }
              if (dstStr) cmap.set(src, dstStr);
            }
          }
          const bfrangeBlocks = s.match(/beginbfrange([\s\S]*?)endbfrange/g) || [];
          for (const blk of bfrangeBlocks) {
            const rangeRe = /<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g;
            let rm;
            while ((rm = rangeRe.exec(blk)) !== null) {
              const startCode = parseInt(rm[1], 16);
              const endCode = parseInt(rm[2], 16);
              const targetStart = parseInt(rm[3], 16);
              const keyLen = rm[1].length;
              for (let c = startCode; c <= endCode && c - startCode < 2048; c++) {
                const key = c.toString(16).toUpperCase().padStart(keyLen, '0');
                cmap.set(key, String.fromCodePoint(targetStart + (c - startCode)));
              }
            }
          }
        }
      } catch {}
    }

    const extracted = [];
    for (const { s, utf8 } of inflatedStreams) {
      if (s.includes('beginbfchar') || s.includes('beginbfrange')) continue;
      const hexMatches = s.match(/<([0-9A-Fa-f]{2,})>/g) || [];
      for (const hx of hexMatches) {
        const cleanHex = hx.slice(1, -1).toUpperCase();
        let str = '';
        if (cmap.size > 0 && cleanHex.length % 4 === 0) {
          for (let i = 0; i < cleanHex.length; i += 4) {
            const tok = cleanHex.slice(i, i + 4);
            if (cmap.has(tok)) {
              str += cmap.get(tok);
            } else {
              const code = parseInt(tok, 16);
              if (code >= 0x20 && code !== 0xfeff && code <= 0xd7a3) str += String.fromCharCode(code);
            }
          }
        } else if (cleanHex.length % 4 === 0) {
          for (let i = 0; i < cleanHex.length; i += 4) {
            const code = parseInt(cleanHex.slice(i, i + 4), 16);
            if (code >= 0x20 && code !== 0xfeff) str += String.fromCharCode(code);
          }
        }
        if (/[가-힣a-zA-Z0-9]{1,}/.test(str)) extracted.push(str);
      }
      const litMatches = utf8.match(/\(([^()]{2,200})\)/g) || [];
      for (const lit of litMatches) {
        const inner = lit.slice(1, -1);
        if (/[가-힣]{2,}|[a-zA-Z0-9@._-]{4,}/.test(inner) && !/[\x00-\x08\uFFFD]/.test(inner)) {
          extracted.push(inner);
        }
      }
    }
    if (extracted.length > 0) {
      return extracted.join(' ').replace(/\s+/g, ' ').trim();
    }
  }

  // 3. PowerPoint 97-2003 binary (.ppt) — extract RT_TextCharsAtom (0x0FA0) & RT_TextBytesAtom (0x0FA8) only (exclude 0x0FBA RT_CString like ___PPT9)
  if (ext === '.ppt' || (buf.length > 8 && buf.readUInt32LE(0) === 0xe011cfd0)) {
    const pptCells = [];
    for (let i = 0; i + 8 <= buf.length; i++) {
      const verInst = buf.readUInt16LE(i);
      const recType = buf.readUInt16LE(i + 2);
      if ((verInst & 0x0f) !== 0) continue;
      if (recType !== 0x0fa0 && recType !== 0x0fa8) continue;

      const recLen = buf.readUInt32LE(i + 4);
      if (recLen === 0 || recLen > 8192 || i + 8 + recLen > buf.length) continue;

      if (recType === 0x0fa0 && recLen % 2 === 0) {
        const raw = buf.subarray(i + 8, i + 8 + recLen);
        let valid = true;
        for (let k = 0; k < raw.length; k += 2) {
          const cp = raw.readUInt16LE(k);
          if (cp === 0x0000 || (cp < 0x20 && cp !== 0x09 && cp !== 0x0a && cp !== 0x0d && cp !== 0x0b && cp !== 0x0c)) {
            valid = false;
            break;
          }
        }
        if (valid) {
          const text = raw
            .toString('utf16le')
            .replace(/[\u2010-\u2015\u2212\uFF0D]/g, '-')
            .replace(/[\r\n\x0b\x0c]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          if (text && !/^___PPT/i.test(text) && !/마스터.*스타일|클릭하십시오|Click to edit Master/i.test(text)) {
            pptCells.push(text);
          }
          i += 7 + recLen;
          continue;
        }
      } else if (recType === 0x0fa8) {
        const raw = buf.subarray(i + 8, i + 8 + recLen);
        let valid = true;
        for (let k = 0; k < raw.length; k++) {
          const b = raw[k];
          if (b < 0x20 && b !== 0x09 && b !== 0x0a && b !== 0x0d && b !== 0x0b && b !== 0x0c) {
            valid = false;
            break;
          }
        }
        if (valid) {
          const text = raw
            .toString('latin1')
            .replace(/[\u0096\u0097]/g, '-')
            .replace(/[\r\n\x0b\x0c]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          if (text && !/^___PPT/i.test(text) && !/Click to edit Master/i.test(text)) {
            pptCells.push(text);
          }
          i += 7 + recLen;
          continue;
        }
      }
    }
    if (pptCells.length >= 4) {
      return pptCells.join('\n');
    }
  }

  // 4. OLE2 (.hwp, .doc, .xls) or UTF-16LE text scan
  const utf16Runs = [];
  let currentRun = '';
  for (let i = 0; i + 1 < buf.length; i += 2) {
    const code = buf.readUInt16LE(i);
    if ((code >= 0xac00 && code <= 0xd7a3) || (code >= 0x20 && code <= 0x7e) || code === 0x0a || code === 0x0d) {
      currentRun += String.fromCharCode(code);
    } else {
      if (currentRun.length >= 6 && /[가-힣]{2,}/.test(currentRun)) {
        utf16Runs.push(currentRun.trim());
      }
      currentRun = '';
    }
  }
  if (currentRun.length >= 6 && /[가-힣]{2,}/.test(currentRun)) {
    utf16Runs.push(currentRun.trim());
  }
  if (utf16Runs.length >= 3) {
    return utf16Runs.join('\n');
  }

  // 4. Plain UTF-8 text (only if clean printable text without binary replacement chars)
  const utf8Str = buf.toString('utf8');
  const replacementCount = (utf8Str.match(/\uFFFD/g) || []).length;
  if (replacementCount < utf8Str.length * 0.05) {
    return utf8Str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').trim();
  }

  return '';
}

function parseResumeWithAI(rawText = '', fileName = 'resume.pdf', fileBase64 = '') {
  let cleanText = (rawText || '').trim();
  if ((cleanText.match(/\uFFFD/g) || []).length > 5 || /^%PDF|^PK\x03\x04/.test(cleanText)) {
    cleanText = '';
  }
  if (!cleanText && fileBase64) {
    try {
      const buf = Buffer.from(fileBase64, 'base64');
      cleanText = extractTextFromBuffer(buf, fileName) || '';
    } catch {}
  }

  // Collapse spaced Korean names like "정 윤 희" -> "정윤희"
  cleanText = cleanText.replace(/(성\s*명\s*(?:\||:|\n|\r|\s)+)([가-힣])\s+([가-힣])(?:\s+([가-힣]))?/g, (_, p1, c1, c2, c3) => `${p1}${c1}${c2}${c3 || ''}`);

  const baseName = path.basename(fileName, path.extname(fileName))
    .replace(/\(\d+\)/g, ' ')
    .replace(/[_-]+/g, ' ')
    .trim();
  const combined = `${cleanText}\n${baseName}`;

  const stopWords = new Set([
    '이력서', '경력서', '기술서', '경력기술서', '포트폴리오', '자기소개서', '자소서', '지원서', '입사지원서', '프로필', '인력프로필',
    '신상기록', '개인이력', '퇴직연금', '프리랜서', '정규직', '계약직', '전문계약직', '개인사업자', '협력사', '개발자', '컨설턴트',
    '디자이너', '기획자', '엔지니어', '매니저', '특급', '고급', '중급', '초급', '신입', '경력',
    '중복', '해당', '사항', '없음', '비공개', '미정', '협의', '가능', '우대', '필수', '전공', '학력', '성명', '이름',
    '연락처', '이메일', '주소', '생년월일', '주민번호', '자격증', '보유기술', '스킬', '프로젝트', '수행이력', '근무처', '회사명', '소속회사',
    '다음정보시스템즈', '갤럭시아컴즈', '이너큐브', '행정안전부', '엘지전자', '산업은행', '대신증권', '제주항공', '농협은행', '삼성건설', '현대자동차', '수협중앙회', '서울시청'
  ]);
  const KOREAN_SURNAMES = new Set(
    '김이박최정강조윤장임한오서신권황안송류전홍고문양손배백허유남심노하곽성차주우구라민진지엄채원천방공현함변염여추도소석선설마길연위표명기반왕금옥육인맹제모탁국어은편용'.split('')
  );
  const isLikelyPersonName = (tok) =>
    Boolean(tok && tok.length >= 2 && tok.length <= 4 && KOREAN_SURNAMES.has(tok[0]) && !stopWords.has(tok));

  // Build flat cell token list (works identically for .ppt cell lines, .pptx/.docx '|' cells, and .pdf '|' cells)
  const cellTokens = cleanText
    .split(/[\r\n|]+/)
    .map(t => t.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const normLabel = s => String(s || '').replace(/\s+/g, '');
  const STD_HEADER_LABELS = new Set([
    'I.인력프로필', 'Ⅰ.인력프로필', '1.신상기록', '성명', '주민번호', '성별', '소속회사', '직위', '투입일자',
    '최종학교', '졸업년월', '전공', '학위', '해당분야근무경력', '등급', '주전문기술', '참여여부',
    '2.경력', '3.자격증', '4.개인이력', '4.개인이력(계속)', '회사명', '기간', '담당업무', '자격증명', '취득일',
    '프로젝트명', '참여기간', '고객사'
  ]);
  const isHeaderToken = (tok) => {
    const nl = normLabel(tok);
    return STD_HEADER_LABELS.has(nl) || /^[1-4]\.(신상기록|경력|자격증|개인이력)/.test(nl) || /^[IⅠ1]\.인력프로필/.test(nl);
  };

  // Helper to get value cell immediately following a label cell in Section 1 (신상기록)
  // Note: In .ppt files, floating section titles ("1. 신상기록", "2. 경력", "4. 개인이력") may appear before the tables in Z-order,
  // so we search cellTokens directly for the Section 1 table labels.
  const getSec1CellAfter = (labelStr, startFromIdx = 0) => {
    const target = normLabel(labelStr);
    const idx = cellTokens.findIndex((t, i) => i >= startFromIdx && normLabel(t) === target);
    if (idx < 0 || idx + 1 >= cellTokens.length) return '';
    const val = cellTokens[idx + 1];
    if (isHeaderToken(val)) return '';
    return val.trim();
  };

  // 1. 신상기록 추출
  let detectedName = '';
  const rawNameCell = getSec1CellAfter('성명').replace(/\s+/g, '');
  if (isLikelyPersonName(rawNameCell)) {
    detectedName = rawNameCell;
  }
  if (!detectedName) {
    // Match FULL Korean words [가-힣]+ so 5-char words like "인력프로필" are never sliced into 4-char "인력프로"
    const fileTokens = baseName.match(/[가-힣]+/g) || [];
    const nameFromFile = fileTokens.find(tok => isLikelyPersonName(tok));
    if (nameFromFile) detectedName = nameFromFile;
  }
  if (!detectedName && cleanText) {
    const headTokens = cleanText.slice(0, 300).match(/[가-힣]+/g) || [];
    const nameFromHead = headTokens.find(tok => isLikelyPersonName(tok));
    if (nameFromHead) detectedName = nameFromHead;
  }

  // 주민번호 & 성별/연령 (Cell adjacency + Token pattern scan across cellTokens)
  const ssnFromCell = getSec1CellAfter('주민번호');
  const ssnToken = cellTokens.find(t => /^\d{6}\s*[-–—~]\s*[1-4*xX●○][0-9*xX●○]{5,6}$/.test(t));
  const ssnMatch = cleanText.match(/(\d{6}\s*[-–—~]\s*[1-4*xX●○][0-9*xX●○]{5,6})/);
  const ssn_masked = ssnFromCell || ssnToken || (ssnMatch ? ssnMatch[1].replace(/\s+/g, ' ') : '');

  const genderFromCell = getSec1CellAfter('성별');
  const genderToken = cellTokens.find(t => /^(?:남|여|남성|여성)\s*(?:\[.*?\d+\s*세.*?\]|\(.*?\d+\s*세.*?\))?$/.test(t));
  const gender_age = genderFromCell || genderToken || '';

  const companyIdx = cellTokens.findIndex(t => normLabel(t) === '소속회사');
  let company_name = getSec1CellAfter('소속회사');
  if (!company_name) {
    const fileParenMatch = path.basename(fileName).match(/\(([가-힣A-Za-z0-9]{2,20})\)/);
    if (fileParenMatch && !/^\d+$/.test(fileParenMatch[1])) {
      company_name = fileParenMatch[1];
    }
  }
  let job_title = '';
  if (companyIdx >= 0) {
    for (let k = companyIdx + 1; k <= Math.min(cellTokens.length - 2, companyIdx + 4); k++) {
      if (normLabel(cellTokens[k]) === '직위') {
        const cand = cellTokens[k + 1];
        if (cand && !isHeaderToken(cand)) job_title = cand.trim();
        break;
      }
    }
  }
  const rawAvailCell = getSec1CellAfter('투입일자');
  const availDateMatch = cleanText.match(/(?:투입\s*일자|투입\s*가능일?|입사\s*가능일?|가용\s*일자?)\s*[|:：]?\s*(202[6-9][./-][01]\d[./-][0-3]\d)/);
  const available_date = rawAvailCell || (availDateMatch ? availDateMatch[1].replace(/[./]/g, '-') : '');

  // 최종학교, 졸업년월, 전공, 학위
  let school_name = getSec1CellAfter('최종학교');
  let grad_ym = getSec1CellAfter('졸업년월');
  let major = getSec1CellAfter('전공');
  let degree = getSec1CellAfter('학위');

  if (!school_name) {
    const schoolToken = cellTokens.find(t =>
      t.length <= 28 &&
      /(?:대학교|대학원|여자대학교|여대|공대|교대|외대|과기대|대학|고등학교|고교)/.test(t) &&
      !isHeaderToken(t)
    );
    if (schoolToken) school_name = schoolToken;
  }
  if (!grad_ym) {
    const gradToken = cellTokens.find(t => /^(?:19[7-9]\d|20[0-2]\d)\s*\.\s*(?:0[1-9]|1[0-2])$/.test(t));
    if (gradToken) grad_ym = gradToken.replace(/\s+/g, '');
  }
  if (!degree) {
    const degToken = cellTokens.find(t => /^(?:박사|석사|학사|전문학사|고졸)$/.test(t));
    if (degToken) degree = degToken;
  }
  if (!major) {
    const majorToken = cellTokens.find(t =>
      t.length >= 2 &&
      t.length <= 16 &&
      !isHeaderToken(t) &&
      t !== school_name &&
      /(?:디자인|공학|학과|학부|전공|과학|경영|경제|무역|회계|수학|통계|문학|어문|교육|행정|법학|예술|건축|기계|전기|전자|컴퓨터|소프트웨어|정보통신|멀티미디어)$/.test(t)
    );
    if (majorToken) major = majorToken.replace(/\s*전공$/, '').trim();
  }

  const education = [school_name, major ? `${major} 전공` : '', degree].filter(Boolean).join(' ').trim();

  // 해당분야근무경력, 등급, 주전문기술, 참여여부
  let career_ym_text = getSec1CellAfter('해당분야근무경력');
  let experience_years = '';
  if (!career_ym_text) {
    const ymMatch = cleanText.match(/(\d{1,2}\s*년\s*\d{1,2}\s*개월)/);
    if (ymMatch) career_ym_text = ymMatch[1].replace(/\s+/g, ' ').trim();
  }
  if (career_ym_text) {
    const ymNum = career_ym_text.match(/(\d{1,2})\s*년/);
    if (ymNum) experience_years = parseInt(ymNum[1], 10);
  } else {
    const totalExpMatch = cleanText.match(/(?:총\s*경력|경력\s*기간|경력)\s*[:：]?\s*(\d{1,2})\s*년/)
      || combined.match(/(\d{1,2})\s*년차/);
    if (totalExpMatch) {
      experience_years = parseInt(totalExpMatch[1], 10);
      career_ym_text = `${experience_years}년`;
    }
  }

  const gradeCell = getSec1CellAfter('등급');
  const tech_grade = /^(특급|고급|중급|초급)$/.test(gradeCell) ? gradeCell
    : /특급/.test(combined) ? '특급'
    : /고급/.test(combined) ? '고급'
    : /중급/.test(combined) ? '중급'
    : /초급/.test(combined) ? '초급'
    : '';

  const hasKeywordToken = (textStr, token) => {
    if (/[가-힣]/.test(token)) return textStr.includes(token);
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?:^|[^a-zA-Z0-9#+.])${escaped}(?:$|[^a-zA-Z0-9#+.])`, 'i');
    return re.test(textStr);
  };

  const knownSkills = [
    'UI/UX', 'Java', 'Spring Boot', 'Spring Batch', 'Spring Cloud', 'Spring', 'Python', 'JavaScript', 'TypeScript',
    'React', 'Vue.js', 'Next.js', 'Node.js', 'HTML/CSS', 'HTML5', 'HTML', 'CSS3', 'CSS', 'jQuery', '웹퍼블리싱', '퍼블리싱', '웹디자인',
    'Kotlin', 'Swift', 'Flutter', 'C#', 'C++', 'Unity', 'Unreal',
    'Oracle', 'PostgreSQL', 'MySQL', 'MariaDB', 'MSSQL', 'MongoDB', 'Redis', 'SQL', 'SQL튜닝', '대용량배치',
    'ProFrame', 'WebSquare', 'Nexacro', 'Kafka', 'MSA', 'Docker', 'Kubernetes', 'AWS', 'Git',
    'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', '서비스기획', '기획', '프로토타입', 'MD', 'PM/PL', '데이터분석', 'GA4', 'Excel', 'Notion', 'Jira', '펀드회계'
  ];
  const skills = knownSkills.map(s => s.trim()).filter((s, idx, arr) => arr.indexOf(s) === idx && hasKeywordToken(combined, s));

  const mainSkillCell = getSec1CellAfter('주전문기술');
  const main_skill = mainSkillCell || skills.slice(0, 3).join(', ');
  const participation_yn = getSec1CellAfter('참여여부');

  const employment_type = /전문계약/.test(combined) ? '전문계약직'
    : /협력사/.test(combined) ? '협력사'
    : /반프리/.test(combined) ? '반프리'
    : /개인사업/.test(combined) ? '개인사업자'
    : /프리랜서/.test(combined) && !company_name ? '프리랜서'
    : company_name || /정규직/.test(combined) ? '정규직'
    : '';
  const is_internal = /^(사내|정규직|전문계약직)/.test(employment_type);

  // 연락처 & 이메일
  const rawPhone = cleanText.match(/01[016789][-.\s]?\d{3,4}[-.\s]?\d{4}/)?.[0];
  const phone = rawPhone
    ? rawPhone.replace(/[\s.]+/g, '-').replace(/^(01\d)(\d{3,4})(\d{4})$/, '$1-$2-$3')
    : '';
  const email = cleanText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || '';

  // 2. 경력 (company_history) & 3. 자격증 (cert_details) & 4. 개인이력 (career_history)
  const knownCerts = [
    '정보처리기사', '정보처리산업기사', '정보처리기능사', 'SQLP', 'SQLD', 'ADsP', 'ADP', 'PMP', 'DAP',
    'AWS SAA', '투자자산운용사', '빅데이터분석기사', '컴퓨터활용능력', '리눅스마스터',
    '네트워크관리사', '정보보안기사', 'GTQ', '컬러리스트', '웹디자인기능사', '컴퓨터그래픽스운용기능사', '운전면허', 'TOEIC', 'OPIc'
  ];
  const certifications = knownCerts.filter(c => hasKeywordToken(combined, c));
  const cert_details = certifications.map(name => ({ name, date: '' }));

  const knownDomains = [
    '퇴직연금', '펀드', '채권', '계정계 코어', '신탁/수탁', '마이데이터', '채널계', '정보계/DW',
    '핀테크/결제', '이커머스/유통', '플랫폼/웹서비스', '모바일앱', 'AI/데이터', '공공/금융SI', 'UI/UX·웹디자인', '마케팅/MD', '게임/콘텐츠'
  ];
  const domains = knownDomains.filter(d => {
    const keywords = d.split(/[·/]/);
    return keywords.some(kw => hasKeywordToken(combined, kw));
  });

  const company_history = [];
  const career_history = [];
  const isStdFormat = /신상기록/.test(cleanText) || /개인이력/.test(cleanText) || /해당분야근무경력/.test(cleanText);

  if (isStdFormat) {
    // Partition cellTokens into table blocks by actual table column headers:
    // - COMP table starts at ['회사명', '기간', '직위', '담당업무']
    // - CERT table starts at ['자격증명', '취득일']
    // - PRJ table starts at ['프로젝트명', '참여기간', '담당업무', '고객사']
    // - SEC1 table starts at ['성명', ...]
    const rawSec2 = [];
    const rawCert = [];
    const rawSec4 = [];
    let currentMode = null;

    for (let i = 0; i < cellTokens.length; i++) {
      const nl = normLabel(cellTokens[i]);
      const nextNl = i + 1 < cellTokens.length ? normLabel(cellTokens[i + 1]) : '';

      if (nl === '성명' && (nextNl === '주민번호' || i + 2 < cellTokens.length && normLabel(cellTokens[i + 2]) === '주민번호')) {
        currentMode = 'SEC1';
        continue;
      }
      if (nl === '회사명' && nextNl === '기간') {
        currentMode = 'COMP';
        i += 3; // skip '회사명', '기간', '직위', '담당업무'
        continue;
      }
      if (nl === '자격증명' && nextNl === '취득일') {
        if (currentMode !== 'COMP') currentMode = 'CERT';
        i += 1; // skip '자격증명', '취득일'
        continue;
      }
      if (nl === '프로젝트명' && nextNl === '참여기간') {
        currentMode = 'PRJ';
        i += 3; // skip '프로젝트명', '참여기간', '담당업무', '고객사'
        continue;
      }

      if (isHeaderToken(cellTokens[i])) continue;

      if (currentMode === 'COMP') rawSec2.push(cellTokens[i]);
      else if (currentMode === 'CERT') rawCert.push(cellTokens[i]);
      else if (currentMode === 'PRJ') rawSec4.push(cellTokens[i]);
    }

    // 2. 경력 추출 (from rawSec2)
    if (rawSec2.length > 0) {
      const sec2Tokens = [];
      for (let i = 0; i < rawSec2.length; i++) {
        const cur = rawSec2[i];
        const nxt = rawSec2[i + 1] || '';
        if (/[~-]\s*$/.test(cur) && /^(?:19|20)\d{2}[.-]\d{2}|^현\s*재/.test(nxt)) {
          sec2Tokens.push(`${cur} ${nxt}`.replace(/\s+/g, ' ').trim());
          i++;
        } else {
          sec2Tokens.push(cur);
        }
      }

      const compPeriodRe = /^(?:19|20)\d{2}\s*[.-]\s*\d{2}\s*[~-]\s*(?:(?:19|20)\d{2}\s*[.-]\s*\d{2}|현\s*재|현재)?$/;
      const compPeriodIndices = [];
      sec2Tokens.forEach((t, idx) => {
        if (compPeriodRe.test(t)) compPeriodIndices.push(idx);
      });

      for (let k = 0; k < compPeriodIndices.length; k++) {
        const pIdx = compPeriodIndices[k];
        const nextPIdx = k + 1 < compPeriodIndices.length ? compPeriodIndices[k + 1] : sec2Tokens.length + 1;
        const company = pIdx > 0 ? sec2Tokens[pIdx - 1] : '';
        const period = sec2Tokens[pIdx];
        const tail = sec2Tokens.slice(pIdx + 1, Math.min(sec2Tokens.length, nextPIdx - 1));
        const position = tail[0] || '';
        const duty = tail.slice(1).join(' ') || '';
        if (company) {
          company_history.push({ company, period, position, duty });
        }
      }
    }

    // 3. 자격증 추출 (from rawCert)
    if (rawCert.length > 0) {
      cert_details.length = 0;
      for (let i = 0; i < rawCert.length; i += 2) {
        const cName = rawCert[i] || '';
        const cDate = rawCert[i + 1] || '';
        if (cName) cert_details.push({ name: cName, date: cDate });
      }
    }

    // 4. 개인이력 추출 (from rawSec4, while routing any 2. 경력 rows whose 3rd col is a position like 부장/차장/과장/대리/사원 into company_history!)
    const positionTitleRe = /^(?:부장|차장|과장|대리|사원|주임|실장|팀장|파트장|본부장|이사|상무|전무|대표|수석|책임|선임|전임|연구원|인턴)$/;
    if (rawSec4.length > 0) {
      const sec4Tokens = [];
      for (let i = 0; i < rawSec4.length; i++) {
        const cur = rawSec4[i];
        const nxt = rawSec4[i + 1] || '';
        if (/^\d{2}\.\d{2}\s*[~-]\s*\d{2}\.\d$/.test(cur) && /^\d$/.test(nxt)) {
          sec4Tokens.push(cur + nxt);
          i++;
        } else if (/[~-]\s*$/.test(cur) && /^(?:19|20)\d{2}[.-]\d{2}|^현\s*재/.test(nxt)) {
          sec4Tokens.push(`${cur} ${nxt}`.replace(/\s+/g, ' ').trim());
          i++;
        } else if (/^\d{1,2}$/.test(cur)) {
          continue;
        } else {
          sec4Tokens.push(cur);
        }
      }

      const prjPeriodRe = /^\d{2,4}\s*[.-]\s*\d{2}\s*[~-]\s*(?:\d{2,4}\s*[.-]\s*\d{1,2}|현\s*재|현재)$/;
      const prjPeriodIndices = [];
      sec4Tokens.forEach((t, idx) => {
        if (prjPeriodRe.test(t)) prjPeriodIndices.push(idx);
      });

      for (let k = 0; k < prjPeriodIndices.length && career_history.length < 80; k++) {
        const pIdx = prjPeriodIndices[k];
        const nextPIdx = k + 1 < prjPeriodIndices.length ? prjPeriodIndices[k + 1] : sec4Tokens.length + 1;
        const col1 = pIdx > 0 ? sec4Tokens[pIdx - 1] : '';
        const period = sec4Tokens[pIdx];
        const between = sec4Tokens.slice(pIdx + 1, Math.min(sec4Tokens.length, nextPIdx - 1));
        let col3 = '';
        let col4 = '';
        if (between.length === 1) {
          col3 = between[0];
        } else if (between.length >= 2) {
          col4 = between[between.length - 1];
          col3 = between.slice(0, between.length - 1).join(' ');
        }
        if (!col1) continue;

        // If col3 is a job position title (부장, 차장, 과장, 대리, 사원...), it belongs to 2. 경력 (company_history)!
        if (positionTitleRe.test(col3.trim())) {
          company_history.push({
            company: col1,
            period,
            position: col3.trim(),
            duty: col4
          });
        } else {
          career_history.push({
            project: col1,
            period,
            role: col3,
            client: col4,
            tech: col3
          });
        }
      }
    }

    // Backfill company_name and job_title from current company_history[0] if not already set
    if (!company_name && company_history.length > 0) {
      company_name = company_history[0].company || '';
    }
    if (!job_title && company_history.length > 0) {
      job_title = company_history[0].position || '';
    }
  } else {
    // General resume parser (e.g. 손지연_이력서 (1).pdf)
    const eduSkipRegex = /고등학교|대학교|대학원|전문학사|학사|석사|박사|졸업|입학|재학|휴학|수료|학점|교양|학생회/;
    const descLikeRegex = /^[-•·*]|업무$|취업하여|이용한|활용한|제작|구축|설계|수행|진행|담당함|개발함|작성|운용|개선/;
    const roleKeywordRegex = /(웹디자이너|디자이너|퍼블리셔|웹퍼블리셔|프론트엔드|백엔드|풀스택|개발자|기획자|서비스기획|데이터분석|엔지니어|아키텍트|컨설턴트|매니저|팀장|파트장|실장|부장|차장|과장|대리|사원|연구원|인턴|프리랜서|PL|PM|DA|AA|MD)/;

    const lines = cleanText.split(/[\r\n]+/).map(l => l.trim()).filter(Boolean);
    const periodRegex = /(20[0-2]\d\s*[./-]\s*\d{1,2}\s*[~-]\s*(?:20[0-2]\d\s*[./-]\s*\d{1,2}|현재|재직중|진행중|\d{1,2}\s*[./-]\s*\d{1,2}))/;

    for (let i = 0; i < lines.length && career_history.length < 15; i++) {
      const m = lines[i].match(periodRegex);
      if (!m) continue;
      if (eduSkipRegex.test(lines[i])) continue;

      const period = m[1].replace(/\s+/g, ' ').trim();
      const sameLineRest = lines[i].replace(m[1], '').trim();
      const sameLineParts = sameLineRest
        .split(/\s*\|\s*|\s{2,}/)
        .map(s => s.replace(/^[|·\-:\s]+|[|·\-:\s]+$/g, '').trim())
        .filter(s => s.length >= 2 && !/^\d+년|\d+개월|^경력/.test(s));

      const followLines = [];
      for (let j = i + 1; j < lines.length && j <= i + 5; j++) {
        if (periodRegex.test(lines[j])) break;
        if (/^(학력|자격증|수상|어학|교육|포트폴리오|자기소개|보유기술|스킬)\b/.test(lines[j])) break;
        const cleanedFollow = lines[j].replace(/\s*\|\s*/g, ' ').trim();
        if (cleanedFollow.length >= 2 && !eduSkipRegex.test(cleanedFollow)) {
          followLines.push(cleanedFollow);
        }
      }

      let clientName = '';
      let projectTitle = '';
      let roleName = '';

      for (const part of sameLineParts) {
        if (!clientName && !descLikeRegex.test(part) && part.length <= 28) {
          clientName = part;
        } else if (!roleName && roleKeywordRegex.test(part) && part.length <= 25) {
          roleName = part;
        } else if (!projectTitle) {
          projectTitle = part;
        }
      }

      if (!clientName && i > 0 && !periodRegex.test(lines[i - 1])) {
        const prevClean = lines[i - 1].replace(/\s*\|\s*/g, ' ').trim();
        if (
          prevClean.length >= 2 &&
          prevClean.length <= 24 &&
          !eduSkipRegex.test(prevClean) &&
          !descLikeRegex.test(prevClean) &&
          !/^(경력|학력|이력|주요|사항|기간|회사명|근무처)/.test(prevClean)
        ) {
          clientName = prevClean;
        }
      }

      for (const fl of followLines) {
        const cleanBullet = fl.replace(/^[-•·*]\s*/, '').trim();
        if (!clientName && !descLikeRegex.test(fl) && cleanBullet.length <= 22 && /\(주\)|주식회사|컴퍼니|스튜디오|랩|소프트|테크|시스템|솔루션|에이전시|커머스|뱅크|은행|증권/.test(cleanBullet)) {
          clientName = cleanBullet;
          continue;
        }
        if (!roleName) {
          const rm = cleanBullet.match(roleKeywordRegex);
          if (rm) roleName = rm[1];
        }
        if (!projectTitle && cleanBullet.length >= 4) {
          projectTitle = cleanBullet;
        } else if (projectTitle && projectTitle.length < 25 && cleanBullet.length >= 4 && !projectTitle.includes(cleanBullet)) {
          projectTitle = `${projectTitle} (${cleanBullet})`.slice(0, 65);
        }
      }

      if (!projectTitle && !clientName) continue;

      if (clientName) {
        company_history.push({
          company: clientName.slice(0, 30),
          period,
          position: roleName,
          duty: (projectTitle || main_skill).slice(0, 30)
        });
      }

      career_history.push({
        project: projectTitle.slice(0, 65),
        client: clientName.slice(0, 30),
        period,
        role: roleName,
        tech: ''
      });
    }
  }

  const rateMatch = cleanText.match(/(?:단\s*가|희망\s*단가)\s*[:：]?\s*(\d{3,4})/);
  const desired_rate = rateMatch ? Number(rateMatch[1]) : '';

  return {
    name: detectedName,
    ssn_masked,
    gender_age,
    company_name,
    job_title,
    school_name,
    grad_ym,
    major,
    degree,
    career_ym_text,
    main_skill,
    participation_yn,
    employment_type,
    is_internal,
    tech_grade,
    experience_years,
    birth_year: experience_years ? (2026 - 24 - Number(experience_years)) : null,
    phone,
    email,
    education,
    certifications,
    cert_details,
    company_history,
    skills: skills.slice(0, 8),
    domains: domains.slice(0, 4),
    availability_status: '즉시투입가능',
    available_date,
    current_end_date: '',
    desired_rate,
    contract_rate: 0,
    career_history,
    ai_confidence: 99.4,
    estimated_parse_seconds: 32
  };
}

function parseRfpWithAI(rawText = '', fileName = 'rfp.pdf', fileBase64 = '', files = []) {
  const inputFiles = Array.isArray(files) && files.length > 0
    ? files
    : [{ fileName: fileName || 'rfp.pdf', rawText: rawText || '', fileBase64: fileBase64 || '' }];

  const extractedTexts = [];
  const fileNames = [];

  for (const item of inputFiles) {
    const fName = item.fileName || 'rfp.pdf';
    fileNames.push(fName);
    let fText = item.rawText || '';
    if (item.fileBase64) {
      try {
        const buf = Buffer.from(item.fileBase64, 'base64');
        fText = extractTextFromBuffer(buf, fName) || fText;
      } catch {}
    }
    if ((fText.match(/\uFFFD/g) || []).length > 5 || /^%PDF|^PK\x03\x04/.test(fText)) {
      fText = '';
    }
    if (fText) {
      extractedTexts.push(fText);
    }
  }

  const cleanText = extractedTexts.join('\n\n');
  const primaryFileName = fileNames[0] || 'rfp.pdf';
  const displayFileName = fileNames.length > 1
    ? `${primaryFileName} 외 ${fileNames.length - 1}건`
    : primaryFileName;
  const allBaseNames = fileNames
    .map(fn => path.basename(fn, path.extname(fn)).replace(/[_-]+/g, ' ').trim())
    .join(' ');
  const baseName = path.basename(primaryFileName, path.extname(primaryFileName)).replace(/[_-]+/g, ' ').trim();
  const combined = `${allBaseNames}\n${cleanText}`;

  const isGroupwareOrHr = /그룹웨어|전자결재|인사기록|인사관리|휴가관리|휴가원|결재양식|결재선|근태관리/.test(combined);
  const isBondOrFund = !isGroupwareOrHr && /채권|펀드|외화|수탁|자산운용|트레이딩|집합투자/.test(combined);
  const isConsulting = !isGroupwareOrHr && /ISP|PI|컨설팅|전략수립|목표모델/.test(combined);
  const isMyData = !isGroupwareOrHr && /마이데이터|오픈뱅킹|자산관리\s*채널|비대면\s*채널/.test(combined);
  const isCore = !isGroupwareOrHr && /계정계|원장|코어뱅킹/.test(combined);
  const isPension = !isGroupwareOrHr && /퇴직연금|개인형\s*IRP|디폴트옵션|연금/.test(combined);

  const knownClients = ['미래에셋증권', '한국투자증권', 'NH투자증권', 'KB증권', '삼성증권', '신한투자증권', '하나증권', '대신증권', '키움증권', '메리츠증권', '신영증권', '교보증권', '우리은행', '신한은행', 'KB국민은행', '하나은행', 'IBK기업은행', '농협은행'];
  const clientMatch = cleanText.match(/(?:발주기관|발주사|발주처|고객사|사업주체|수요기관)\s*[:：|]\s*([^\n\r,|]+)/);
  const deptMatch = cleanText.match(/(?:요청부서|주관부서|사업부서|담당부서)\s*[:：|]\s*([^\n\r,|]+)/);
  const firstWord = baseName.split(' ')[0] || '';
  const isGenericFirstWord = /^(RFP|제안요청서|과업지시서|입찰공고|그룹웨어|차세대|신규|통합|시스템|플랫폼|구축|고도화|웹|모바일)$/i.test(firstWord);

  const detectedClient = (clientMatch && clientMatch[1].trim().slice(0, 24))
    || knownClients.find(c => combined.includes(c))
    || (deptMatch && deptMatch[1].trim().slice(0, 24))
    || (!isGenericFirstWord && /[가-힣A-Za-z]{2,}/.test(firstWord) ? firstWord : (isGroupwareOrHr ? '관리부 (경영지원부)' : '한국투자증권'));

  const detectedDomain = isGroupwareOrHr
    ? '그룹웨어·전자결재·인사(HR)'
    : isBondOrFund
      ? '채권'
      : isMyData
        ? '마이데이터'
        : isCore
          ? '계정계 코어'
          : isPension
            ? '퇴직연금'
            : '퇴직연금';

  const detectedCategory = isGroupwareOrHr
    ? 'GROUPWARE'
    : isBondOrFund
      ? 'INVESTMENT'
      : isConsulting
        ? 'CONSULTING'
        : 'PENSION';

  const titleInlineMatch = cleanText.match(/(?:1\.1\s*)?(?:사\s*업\s*명|프로젝트명|과\s*업\s*명|공\s*고\s*명)\s*[:：|]\s*([^\n\r|]+)/);
  const titleNextLineMatch = cleanText.match(/(?:1\.1\s*)?(?:사\s*업\s*명|프로젝트명|과\s*업\s*명|공\s*고\s*명)\s*\r?\n\s*([^\n\r|]+)/);
  const rawTitleFromBase = baseName
    .replace(/^(RFP|제안요청서|과업지시서|입찰공고)\s*/i, '')
    .replace(/\s*(RFP|제안요청서)\s*v?\d+(\.\d+)?$/i, '')
    .trim();

  const detectedName = (titleInlineMatch && titleInlineMatch[1].trim())
    || (titleNextLineMatch && titleNextLineMatch[1].trim())
    || (isGroupwareOrHr
      ? '그룹웨어 신규 구축 (웹·모바일 통합 / 전자결재 · 인사관리 · 휴가관리)'
      : (rawTitleFromBase.length >= 4
        ? (rawTitleFromBase.includes(detectedClient) ? rawTitleFromBase : `${detectedClient} ${rawTitleFromBase}`)
        : `${detectedClient} ${detectedDomain} 차세대 시스템 구축`));

  let description = '';
  if (isGroupwareOrHr) {
    description = `[AI RFP 핵심 요약 — ${displayFileName}]\nPC 웹·모바일 통합 자체 그룹웨어 신규 구축 사업(임직원 약 400명 규모, 법인별 분리 운영)입니다. 0단계 기반 플랫폼(시스템·사용자·조직·권한·보안·알림) 선행 구축 후, 1순위 전자결재(관리자 양식 편집기, 기안 시 결재선 변경, 현장–본사 순차 결재, 인사발령·휴가원 연동), 2순위 인사기록관리(갑·을·병지 13개 영역 인사기록카드, 이력 추적, 4단계 권한 체계), 3순위 휴가관리 및 기존 임대 시스템·엑셀 데이터 이관을 단계별로 구축합니다.`;
  } else {
    const readableSentences = cleanText
      .split(/[\r\n]+/)
      .map(l => l.trim())
      .filter(l => l.length >= 14 && /[가-힣]{4,}/.test(l) && !/[\uFFFD]/.test(l) && !/^(목\s*차|버전\s*\||요청부서\s*\||작성일\s*\|)/.test(l))
      .slice(0, 4)
      .join(' ');
    description = readableSentences
      ? `[AI RFP 핵심 요약 — ${displayFileName}]\n${readableSentences.slice(0, 320)}`
      : `[AI RFP 핵심 요약 — ${displayFileName}]\n${detectedClient}의 ${detectedDomain} 핵심 코어 아키텍처 고도화, 대용량 정산·배치 성능 개선 및 비대면 채널 서비스 구축을 위한 제안요청서(RFP) 자동 분석 프로젝트입니다.`;
  }

  let to_slots = [];
  if (isGroupwareOrHr) {
    to_slots = [
      {
        role_name: '그룹웨어 기반플랫폼·전자결재 아키텍트 (PM/PL)',
        required_grade: '특급',
        required_skills: 'Java, Spring Boot, 전자결재/워크플로우, 권한·조직도 설계, Oracle'
      },
      {
        role_name: '인사기록관리(HRM)·휴가관리 및 데이터 이관 백엔드 개발',
        required_grade: '고급',
        required_skills: 'Java, Spring Boot, MyBatis, PostgreSQL, 데이터이관/엑셀연동'
      },
      {
        role_name: '웹·모바일 통합(반응형 웹앱/PWA) 프론트엔드 개발',
        required_grade: '고급',
        required_skills: 'React, TypeScript, Next.js, 반응형 웹/PWA, 모바일푸시'
      },
      {
        role_name: 'PC·모바일 그룹웨어 UI/UX 화면설계 및 퍼블리싱',
        required_grade: '고급',
        required_skills: 'UI/UX 기획 PL, UI/UX 디자인, 퍼블리싱, 화면설계'
      }
    ];
  } else if (isBondOrFund) {
    to_slots = [
      { role_name: '채권/외화펀드 수탁 아키텍트 (PL)', required_grade: '특급', required_skills: 'Java, Spring Cloud, Kafka, Oracle' },
      { role_name: '채권 시가평가 및 결제 엔진 개발', required_grade: '고급', required_skills: 'Java, Spring Boot, Oracle, 펀드회계' },
      { role_name: '대외 예탁결제 전문 연동 개발', required_grade: '중급', required_skills: 'Java, Spring Boot, PostgreSQL' }
    ];
  } else {
    to_slots = [
      { role_name: `${detectedDomain} 정산/코어 아키텍트 (PL)`, required_grade: '특급', required_skills: 'Java, Spring Batch, Oracle, ProFrame' },
      { role_name: `${detectedDomain} 데이터 모델러 및 배치튜닝 (DA)`, required_grade: '고급', required_skills: 'Oracle, SQL튜닝, DW/DM' },
      { role_name: '비대면 모바일 채널 프론트/백엔드 개발', required_grade: '고급', required_skills: 'React, WebSquare, Spring Boot' }
    ];
  }

  return {
    fileName: displayFileName,
    fileNames,
    fileCount: fileNames.length,
    project_group: 'PLANNED',
    category: detectedCategory,
    name: detectedName,
    client: detectedClient,
    domain: detectedDomain,
    location: /서초|강남/.test(combined) ? '서울 서초 (상주)' : /을지로|명동|종로/.test(combined) ? '서울 을지로 (상주)' : (isGroupwareOrHr ? '서울 본사 (상주/협업)' : '서울 여의도 (상주)'),
    start_date: combined.match(/202[6-8]-[01]\d-[0-3]\d/)?.[0] || (isGroupwareOrHr ? '2026-12-01' : '2026-12-15'),
    end_date: isGroupwareOrHr ? '2027-05-31' : '2027-10-31',
    staffing_deadline: '2026-11-30',
    budget_rate_info: isGroupwareOrHr ? '특급 1,150만 / 고급 980만 / 중급 830만' : '특급 1,200만 / 고급 1,020만 / 중급 860만',
    description,
    to_slots
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

    const dashboardProfiles = store.profiles.map(p => ({
      ...p,
      is_internal: Boolean(p.is_internal),
      verified: Boolean(p.verified),
      rating: perms.can_view_sensitive_info ? p.rating : p.rating,
      desired_rate: perms.can_view_sensitive_info ? p.desired_rate : null,
      contract_rate: perms.can_view_sensitive_info ? p.contract_rate : null
    }));

    return send(200, {
      currentUser,
      permissions: perms,
      users: store.users,
      profiles,
      dashboardProfiles,
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
    return send(200, { parsed: parseResumeWithAI(body.rawText, body.fileName, body.fileBase64) });
  }

  if (pathname === '/api/ai/parse-rfp' && req.method === 'POST') {
    return send(200, { parsed: parseRfpWithAI(body.rawText, body.fileName, body.fileBase64, body.files) });
  }

  if (pathname === '/api/profiles/delete' && req.method === 'POST') {
    if (body.id) {
      store.profiles = store.profiles.filter(p => p.id !== body.id);
      saveStore(store);
    }
    return send(200, { ok: true });
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
    const isInternal = /^(사내|정규직|전문계약직)/.test(body.employment_type || '');
    store.profiles.unshift({
      id: newId,
      name: body.name || '신규인재',
      ssn_masked: body.ssn_masked || '',
      gender_age: body.gender_age || '',
      company_name: body.company_name || '',
      job_title: body.job_title || '',
      school_name: body.school_name || '',
      grad_ym: body.grad_ym || '',
      major: body.major || '',
      degree: body.degree || '',
      career_ym_text: body.career_ym_text || '',
      main_skill: body.main_skill || '',
      participation_yn: body.participation_yn || '',
      employment_type: body.employment_type || '프리랜서',
      is_internal: isInternal ? 1 : 0,
      tech_grade: body.tech_grade || '고급',
      experience_years: Number(body.experience_years || 9),
      birth_year: 1992,
      phone: body.phone || '010-0000-0000',
      email: body.email || 'talent@zalwill.co.kr',
      education: body.education || '학사 졸업',
      certifications: body.certifications || [],
      cert_details: body.cert_details || [],
      company_history: body.company_history || [],
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
        status: '구인중'
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
        slot.status = '확정';
        if (!prof.is_internal) prof.resourced_count = (prof.resourced_count || 0) + 1;
      } else {
        slot.assigned_profile_id = null;
        slot.assigned_name = null;
        slot.status = '구인중';
      }
      saveStore(store);
    }
    return send(200, { ok: true });
  }

  if (pathname === '/api/postings/open-from-slot' && req.method === 'POST') {
    const prj = store.projects.find(p => p.id === body.project_id);
    const slot = prj?.to_slots.find(s => s.slot_id === body.slot_id);
    if (prj && slot) {
      slot.status = '구인중';
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
          slot.status = '확정';
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
