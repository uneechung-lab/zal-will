// ZAL : 잘될 (ZAL-WILL) — ZAL Universe Look & Feel Frontend
const state = {
  userId: 'u_master',
  activeTab: 'dashboard',
  selectedProjectId: null,
  selectedProfileId: null,
  selectedPostingId: null,
  selectedProjectFilter: 'PLANNED',
  projectKeyword: '',
  calTab: 'ALL',
  calYear: 2026,
  calMonth: 11,
  calExpanded: false,
  calSelectedDay: null,
  analyticsSection: 'UTILIZATION',
  data: null,
  profileFilters: {
    empType: 'ALL',
    jobCategory: 'ALL',
    grade: 'ALL',
    domain: 'ALL',
    availability: 'ALL',
    verifiedType: 'ALL',
    keyword: '',
    skill: 'ALL',
    minExp: 'ALL',
    minScore: 'ALL',
    availBefore: 'ALL',
    maxRate: 'ALL',
    onlyFavorites: false,
    detailPopoverOpen: false,
    compareIds: []
  },
  sourcingFilters: {
    status: 'ALL',
    grade: 'ALL',
    domain: 'ALL',
    keyword: '',
    sortBy: 'URGENT',
    viewMode: 'CARD',
    kpiFilter: 'ALL',
    skill: 'ALL',
    startMonth: 'ALL',
    location: 'ALL',
    maxRate: 'ALL',
    detailPopoverOpen: false,
    openMenuPostingId: null,
    expandedApplicantPostings: []
  },
  interviewFilters: {
    status: 'ALL',
    grade: 'ALL',
    keyword: '',
    skill: 'ALL',
    minExp: 'ALL',
    minScore: 'ALL',
    availBefore: 'ALL',
    maxRate: 'ALL',
    verified: 'ALL',
    onlyFavorites: false,
    onlyAssignedToMe: false,
    detailPopoverOpen: false,
    compareIds: []
  }
};

const SAMPLE_RESUMES = {
  sample1: {
    fileName: '경력기술서_김도윤_퇴직연금_특급.pdf',
    rawText: `성명: 김도윤
소속구분: 외주 프리랜서 (특급 기술자 / 13년차)
연락처: 010-5812-9034 | 이메일: dy.kim.pension@gmail.com
최종학력: 고려대학교 컴퓨터정보학과 학사
보유자격증: 정보처리기사, SQLP, PMP
보유스킬: Java, Spring Boot, Spring Batch, Oracle, ProFrame, 대용량배치, SQL튜닝
금융도메인: 퇴직연금, 신탁/수탁, 계정계 코어
투입가능일: 2026-11-22
희망단가: 1160만원
주요수행이력:
- 하나은행 퇴직연금 차세대 원장 및 수수료 정산 배치 구축 (2024.04 ~ 2026.10)
- KB국민은행 개인형IRP/DC 상품운용 결제 시스템 고도화 (2022.02 ~ 2024.02)
- 신한은행 계정계 수신/신탁 코어 시스템 개선 프로젝트 (2020.01 ~ 2021.12)`
  },
  sample2: {
    fileName: '이력서_서지훈_채권펀드수탁_고급.docx',
    rawText: `성명: 서지훈
소속구분: 외주 반프리 (고급 기술자 / 10년차)
연락처: 010-3389-1204 | 이메일: jh.seo.bond@naver.com
최종학력: 중앙대학교 금융IT공학 학사
보유자격증: 정보처리기사, 투자자산운용사, SQLD
보유스킬: Java, Spring Boot, Spring Cloud, Oracle, PostgreSQL, Kafka, 펀드회계
금융도메인: 채권, 펀드, 신탁/수탁
투입가능일: 2026-12-01
희망단가: 1020만원
주요수행이력:
- 미래에셋자산운용 글로벌 채권/펀드 수탁결제 플랫폼 구축 (2024.05 ~ 2026.11)
- 한국예탁결제원 채권기관결제 및 기준가 산출 시스템 고도화 (2022.03 ~ 2024.03)`
  },
  sample3: {
    fileName: '사내인력프로필_장하늘_마이데이터채널_고급.xlsx',
    rawText: `성명: 장하늘
소속구분: 사내 정규직 (고급 기술자 / 9년차)
연락처: 010-7190-4451 | 이메일: hn.jang@zalwill.co.kr
최종학력: 서울시립대학교 컴퓨터과학부 학사
보유자격증: 정보처리기사, AWS SAA, SQLD
보유스킬: React, TypeScript, Next.js, WebSquare, Java, Spring Boot, MSA
금융도메인: 마이데이터, 채널계, 퇴직연금
투입가능일: 2026-11-15
희망단가: 1000만원
주요수행이력:
- 우리금융그룹 유니버설 뱅킹 마이데이터 2.0 및 비대면 IRP 채널 구축 (2024.06 ~ 2026.10)
- NH농협은행 모바일뱅킹 퇴직연금/자산관리 UI/API 개편 프로젝트 (2022.07 ~ 2024.04)`
  }
};

const MALE_AVATAR_IMAGES = [1, 2, 3, 5, 7, 9].map(n => `/profile (${n}).jpg?v=2`);
const FEMALE_AVATAR_IMAGES = [4, 6, 8, 10].map(n => `/profile (${n}).jpg?v=2`);

// 사람별 1:1 고정 아바타 매핑 (새로고침해도 항상 동일하게 유지)
const FIXED_AVATAR_MAP = {
  // 여성 인재 4명 <-> 여성 아바타 4종 (4, 6, 8, 10) 1:1 매칭
  'p_1': '/profile (4).jpg?v=2',
  'u_internal_pl': '/profile (4).jpg?v=2',
  '정윤희': '/profile (4).jpg?v=2',
  '정윤희 부장': '/profile (4).jpg?v=2',

  'p_3': '/profile (10).jpg?v=2',
  'u_internal_dev': '/profile (10).jpg?v=2',
  '신은숙': '/profile (10).jpg?v=2',
  '신은숙 부장': '/profile (10).jpg?v=2',

  'p_4': '/profile (6).jpg?v=2',
  '윤서연': '/profile (6).jpg?v=2',

  'p_6': '/profile (8).jpg?v=2',
  '한지민': '/profile (8).jpg?v=2',
  '권지민': '/profile (8).jpg?v=2',

  'u_manager': '/profile (6).jpg?v=2',
  '김지영': '/profile (6).jpg?v=2',
  '김지영 이사': '/profile (6).jpg?v=2',

  // 남성 인재 6명 <-> 남성 아바타 6종 (1, 2, 3, 5, 7, 9) 1:1 매칭
  'u_master': '/profile (1).jpg?v=2',
  '조성현': '/profile (1).jpg?v=2',
  '조성현 상무': '/profile (1).jpg?v=2',

  'p_2': '/profile (2).jpg?v=2',
  '강동원': '/profile (2).jpg?v=2',

  'p_5': '/profile (5).jpg?v=2',
  'u_external': '/profile (5).jpg?v=2',
  '양동근': '/profile (5).jpg?v=2',
  '양동근 과장': '/profile (5).jpg?v=2',

  'p_7': '/profile (3).jpg?v=2',
  '오세훈': '/profile (3).jpg?v=2',

  'p_8': '/profile (7).jpg?v=2',
  '김도현': '/profile (7).jpg?v=2',

  'p_9': '/profile (9).jpg?v=2',
  '이준호': '/profile (9).jpg?v=2'
};

function isFemaleProfileKey(key = '') {
  const clean = String(key || '').trim();
  const allProfiles = [
    ...(state?.data?.profiles || []),
    ...(state?.data?.dashboardProfiles || []),
    ...(state?.data?.users || [])
  ];
  const found = allProfiles.find(item => item && (item.id === clean || item.name === clean));
  const targetName = String(found?.name || clean).replace(/\s+(상무|이사|부장|차장|과장|대리|사원|팀장|수석|선임|책임)$/, '').trim();
  return /(윤희|은숙|서연|지민|지영|수진|미영|혜진|유진|지현|민지|은지|수빈|아름|나연|소연|다은|채원|하은|서윤|지우|보람|유리|미나|연희|정희|영희|숙|희|연)$/.test(targetName);
}

function getAvatarForId(str = '') {
  const key = String(str || 'default').trim();
  if (FIXED_AVATAR_MAP[key]) {
    return FIXED_AVATAR_MAP[key];
  }
  const allProfiles = [
    ...(state?.data?.profiles || []),
    ...(state?.data?.dashboardProfiles || []),
    ...(state?.data?.users || [])
  ];
  const found = allProfiles.find(item => item && (item.id === key || item.name === key));
  if (found) {
    if (FIXED_AVATAR_MAP[found.id]) return FIXED_AVATAR_MAP[found.id];
    if (FIXED_AVATAR_MAP[found.name]) return FIXED_AVATAR_MAP[found.name];
  }

  const isFemale = isFemaleProfileKey(key);
  const pool = isFemale ? FEMALE_AVATAR_IMAGES : MALE_AVATAR_IMAGES;
  const hash = Array.from(key).reduce((acc, ch, idx) => acc + ch.charCodeAt(0) * (idx + 17), 0);
  return pool[hash % pool.length];
}

function svgIcon(name, size = 15) {
  const paths = {
    clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    megaphone: '<path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    award: '<circle cx="12" cy="8" r="6"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    dollar: '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
  };
  return `<svg class="ui-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; flex-shrink:0;">${paths[name] || paths.file}</svg>`;
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function openModal(title, htmlContent) {
  const dialog = document.getElementById('modalDialog');
  const header = dialog?.querySelector('.modal-header');
  if (dialog) {
    dialog.classList.remove('util-exec-modal-dialog');
    dialog.classList.remove('wide-compare-modal-dialog');
  }
  if (header) header.style.display = 'flex';
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = htmlContent;
  document.getElementById('modalBackdrop').classList.remove('hidden');
}

function closeModal() {
  const dialog = document.getElementById('modalDialog');
  const header = dialog?.querySelector('.modal-header');
  if (dialog) {
    dialog.classList.remove('util-exec-modal-dialog');
    dialog.classList.remove('wide-compare-modal-dialog');
  }
  if (header) header.style.display = 'flex';
  document.getElementById('modalBackdrop').classList.add('hidden');
}

async function apiCall(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': state.userId
    }
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(path, opts);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || '요청 처리 중 오류가 발생했습니다.');
  }
  return data;
}

async function loadState() {
  const data = await apiCall(`/api/bootstrap?userId=${encodeURIComponent(state.userId)}`);
  state.data = data;
  renderHeaderAndPermissions();
  renderActiveTab();
}

function renderHeaderAndPermissions() {
  const { users, currentUser, permissions } = state.data;
  const select = document.getElementById('userRoleSelect');

  const rolePrefixMap = {
    MASTER: '임원/부서장 (Master)',
    MANAGER: '인력/제안 관리자',
    INTERNAL: '내부 구성원',
    EXTERNAL: '외주 인력 (외부)'
  };

  select.innerHTML = [
    ...users.map(u => `<option value="${u.id}" ${u.id === state.userId ? 'selected' : ''}>${rolePrefixMap[u.role_group] || '구성원'} — ${u.name}</option>`),
    `<option value="guest_external" ${state.userId === 'guest_external' ? 'selected' : ''}>오픈 구인 방문자 (비회원)</option>`
  ].join('');

  // Update Avatar
  const avatarEl = document.getElementById('currentUserAvatar');
  if (avatarEl) avatarEl.src = getAvatarForId(state.userId);

  // Render Right Member/Role Quick Chips (Exact match to 전체 | 나 | 조상무 | 정다음 in 잘됨)
  const chipsContainer = document.getElementById('quickRoleChips');
  if (chipsContainer) {
    chipsContainer.innerHTML = [
      ...users.map(u => {
        const isActive = u.id === state.userId;
        return `<button type="button" class="zal-chip-btn ${isActive ? 'active' : ''}" onclick="switchUserRole('${u.id}')">${u.name}</button>`;
      }),
      `<button type="button" class="zal-chip-btn ${state.userId === 'guest_external' ? 'active' : ''}" onclick="switchUserRole('guest_external')">오픈지원링크</button>`
    ].join('');
  }

  // Permission strip hidden on top bar per design
  const strip = document.getElementById('permissionStrip');
  if (strip) {
    strip.innerHTML = '';
  }
}

function switchUserRole(userId) {
  state.userId = userId;
  loadState();
  showToast('접속 계정 및 역할 권한이 전환되었습니다.');
}

function handleHeaderProjectChange(projectId) {
  state.selectedProjectFilter = projectId;
  renderActiveTab();
}

async function handleQuickAiInput() {
  const input = document.getElementById('aiQuickInput');
  const text = (input?.value || '').trim();
  if (!text) {
    triggerSampleParse('sample1');
    return;
  }
  input.value = '';
  if (/추천|매칭|찾아|탐색|제안/.test(text)) {
    switchTab('projects');
    openRfpMatchModal('prj_1', 'slot_103');
    showToast(`🤖 AI 잘될이가 '${text}' 조건에 맞는 사내외 적임자를 매칭했습니다.`);
  } else {
    openAiParseReviewModal('AI_프롬프트_이력서_추출.txt', text);
  }
}

function buildNavigationUrl(tabName, projectId, profileId, postingId) {
  const params = new URLSearchParams(window.location.search);
  if (tabName && tabName !== 'dashboard') {
    params.set('tab', tabName);
  } else {
    params.delete('tab');
  }
  if (projectId) {
    params.set('project', projectId);
  } else {
    params.delete('project');
  }
  if (profileId) {
    params.set('profile', profileId);
  } else {
    params.delete('profile');
  }
  if (postingId) {
    params.set('posting', postingId);
  } else {
    params.delete('posting');
  }
  const qs = params.toString();
  return `${window.location.pathname}${qs ? `?${qs}` : ''}`;
}

function pushNavigationState(replace = false) {
  const navState = {
    tab: state.activeTab,
    projectId: state.selectedProjectId || null,
    profileId: state.selectedProfileId || null,
    postingId: state.selectedPostingId || null
  };
  const nextUrl = buildNavigationUrl(navState.tab, navState.projectId, navState.profileId, navState.postingId);
  const curState = window.history.state;
  if (
    !replace &&
    curState &&
    curState.tab === navState.tab &&
    (curState.projectId || null) === navState.projectId &&
    (curState.profileId || null) === navState.profileId &&
    (curState.postingId || null) === navState.postingId
  ) {
    return;
  }
  if (replace) {
    window.history.replaceState(navState, '', nextUrl);
  } else {
    window.history.pushState(navState, '', nextUrl);
  }
}

function applyTabDomState(tabName) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.rail-btn[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
  });
}

function switchTab(tabName, options = {}) {
  if (tabName === 'projects' && !options.keepProject) {
    state.selectedProjectId = null;
  }
  if (tabName === 'profiles' && !options.keepProfile) {
    state.selectedProfileId = null;
  }
  if (tabName === 'sourcing' && !options.keepPosting) {
    state.selectedPostingId = null;
  }
  state.activeTab = tabName;
  applyTabDomState(tabName);
  if (!options.fromPopState) {
    pushNavigationState(Boolean(options.replaceHistory));
  }
  renderActiveTab();
}

function renderActiveTab() {
  if (!state.data) return;
  switch (state.activeTab) {
    case 'dashboard': renderDashboardTab(); break;
    case 'profiles': renderProfilesTab(); break;
    case 'projects': renderProjectsTab(); break;
    case 'sourcing': renderSourcingTab(); break;
    case 'interviews': renderInterviewsTab(); break;
    case 'analytics': renderAnalyticsTab(); break;
    case 'permissions': renderPermissionsTab(); break;
  }
}

/* =========================================================================
   TAB 1: EXECUTIVE (MASTER) 1-PAGE GOLDEN RATIO DASHBOARD
   ========================================================================= */
const INTERNAL_UTIL_MODAL_STATE = {
  barMode: 'ROLE',
  activeMonthIdx: 3,
  matchPopoverOpen: false
};

const INTERNAL_UTIL_DONUT_SEGMENTS = [
  { key: 'billable', label: '유상 수행', shortLabel: '유상 수행', count: 33, pct: '82.5', gradId: 'iumDonutGrad0', gradStart: '#93C5FD', gradEnd: '#3B82F6', cssGrad: 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)', color: '#3B82F6', note: '고객사 현업 프로젝트 유상 투입 중' },
  { key: 'rnd', label: '사내 R&D · 제안 지원', shortLabel: '사내 R&D·제안', count: 3, pct: '7.5', gradId: 'iumDonutGrad1', gradStart: '#A5B4FC', gradEnd: '#6366F1', cssGrad: 'linear-gradient(135deg, #A5B4FC 0%, #6366F1 100%)', color: '#6366F1', note: '차세대 RFP 제안 및 사내 AI R&D' },
  { key: 'confirmed', label: '차기 확정 대기', shortLabel: '차기 확정 대기', count: 3, pct: '7.5', gradId: 'iumDonutGrad2', gradStart: '#6EE7B7', gradEnd: '#10B981', cssGrad: 'linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)', color: '#10B981', note: '11/23 미래에셋 투입 예정 등' },
  { key: 'unconfirmed', label: '미확정 대기 (집중관리)', shortLabel: '미확정 대기', count: 1, pct: '2.5', gradId: 'iumDonutGrad3', gradStart: '#FCD34D', gradEnd: '#F59E0B', cssGrad: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)', color: '#F59E0B', note: '김민수 차장 (대기 8일차)' }
];

const INTERNAL_UTIL_BAR_DATA = {
  ROLE: [
    { name: 'PM / 서비스기획', total: 8, active: 7, confirmed: 1, unconfirmed: 0, rate: 88 },
    { name: '프론트엔드 개발', total: 10, active: 9, confirmed: 1, unconfirmed: 0, rate: 90 },
    { name: '백엔드 / 코어·계정계', total: 16, active: 14, confirmed: 1, unconfirmed: 1, rate: 88 },
    { name: 'UI/UX · QA', total: 6, active: 6, confirmed: 0, unconfirmed: 0, rate: 100 }
  ],
  GRADE: [
    { name: '특급 기술자', total: 12, active: 11, confirmed: 1, unconfirmed: 0, rate: 92 },
    { name: '고급 기술자', total: 15, active: 13, confirmed: 1, unconfirmed: 1, rate: 87 },
    { name: '중급 기술자', total: 9, active: 8, confirmed: 1, unconfirmed: 0, rate: 89 },
    { name: '초급 기술자', total: 4, active: 4, confirmed: 0, unconfirmed: 0, rate: 100 }
  ]
};

const INTERNAL_UTIL_TREND_MONTHS = [
  {
    label: '9월(실적)',
    rate: 88,
    billableRate: 80,
    targetRate: 85,
    deploy: 3,
    rolloff: 1,
    isForecast: false,
    reason: '9월(실적): 하반기 증권사 퇴직연금 고도화 3명 신규 투입으로 손익분기 목표(85%) 상회 달성'
  },
  {
    label: '10월(실적)',
    rate: 92,
    billableRate: 85,
    targetRate: 85,
    deploy: 2,
    rolloff: 0,
    isForecast: false,
    reason: '10월(실적): 연금·외화펀드 수행 안정화 및 추가 투입(+2명)으로 하반기 최고 가동률(92%) 기록'
  },
  {
    label: '11월(현재)',
    rate: 90,
    billableRate: 82.5,
    targetRate: 85,
    deploy: 4,
    rolloff: 5,
    isForecast: false,
    reason: '11월(현재): 정규직 40명 중 36명 가동(유상 33 · 사내R&D/제안 3), 차기확정 3명 · 미확정 1명'
  },
  {
    label: '12월(예상)',
    rate: 82,
    billableRate: 75,
    targetRate: 85,
    deploy: 4,
    rolloff: 7,
    isForecast: true,
    reason: '11월 말 삼성증권(2명)·신영증권(2명)·하나증권(3명) 철수 도래 대비 신규 투입 4명으로 가동률 하락 예상'
  },
  {
    label: '1월(예상)',
    rate: 78,
    billableRate: 72.5,
    targetRate: 85,
    deploy: 2,
    rolloff: 4,
    isForecast: true,
    reason: '1월(예상): 연말 프로젝트 종료분 추가 철수(-4명) 대비 KB증권 채권 플랫폼(+2명) 투입 예정 — 선제 영업 필요'
  }
];

function buildSmoothCatmullBezierPath(pts) {
  if (!pts || pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
    const cp1x = (p1.x + (p2.x - p0.x) / 5.5).toFixed(1);
    const cp1y = (p1.y + (p2.y - p0.y) / 5.5).toFixed(1);
    const cp2x = (p2.x - (p3.x - p1.x) / 5.5).toFixed(1);
    const cp2y = (p2.y - (p3.y - p1.y) / 5.5).toFixed(1);
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function buildRoundedDonutSectorPath(cx, cy, rIn, rOut, startDeg, endDeg, cornerRadius = 5) {
  const a0 = (startDeg * Math.PI) / 180;
  const a1 = (endDeg * Math.PI) / 180;
  const span = Math.max(0.02, a1 - a0);
  const rc = Math.max(1, Math.min(cornerRadius, (rOut - rIn) / 2 - 0.5, (span * rIn) / 2.2));
  const dOut = rc / rOut;
  const dIn = rc / rIn;

  const p1x = (cx + (rOut - rc) * Math.cos(a0)).toFixed(2);
  const p1y = (cy + (rOut - rc) * Math.sin(a0)).toFixed(2);
  const c1x = (cx + rOut * Math.cos(a0)).toFixed(2);
  const c1y = (cy + rOut * Math.sin(a0)).toFixed(2);
  const p2x = (cx + rOut * Math.cos(a0 + dOut)).toFixed(2);
  const p2y = (cy + rOut * Math.sin(a0 + dOut)).toFixed(2);

  const p3x = (cx + rOut * Math.cos(a1 - dOut)).toFixed(2);
  const p3y = (cy + rOut * Math.sin(a1 - dOut)).toFixed(2);
  const c2x = (cx + rOut * Math.cos(a1)).toFixed(2);
  const c2y = (cy + rOut * Math.sin(a1)).toFixed(2);
  const p4x = (cx + (rOut - rc) * Math.cos(a1)).toFixed(2);
  const p4y = (cy + (rOut - rc) * Math.sin(a1)).toFixed(2);

  const p5x = (cx + (rIn + rc) * Math.cos(a1)).toFixed(2);
  const p5y = (cy + (rIn + rc) * Math.sin(a1)).toFixed(2);
  const c3x = (cx + rIn * Math.cos(a1)).toFixed(2);
  const c3y = (cy + rIn * Math.sin(a1)).toFixed(2);
  const p6x = (cx + rIn * Math.cos(a1 - dIn)).toFixed(2);
  const p6y = (cy + rIn * Math.sin(a1 - dIn)).toFixed(2);

  const p7x = (cx + rIn * Math.cos(a0 + dIn)).toFixed(2);
  const p7y = (cy + rIn * Math.sin(a0 + dIn)).toFixed(2);
  const c4x = (cx + rIn * Math.cos(a0)).toFixed(2);
  const c4y = (cy + rIn * Math.sin(a0)).toFixed(2);
  const p8x = (cx + (rIn + rc) * Math.cos(a0)).toFixed(2);
  const p8y = (cy + (rIn + rc) * Math.sin(a0)).toFixed(2);

  const largeArcOut = span - 2 * dOut > Math.PI ? 1 : 0;
  const largeArcIn = span - 2 * dIn > Math.PI ? 1 : 0;

  return [
    `M ${p1x} ${p1y}`,
    `Q ${c1x} ${c1y} ${p2x} ${p2y}`,
    `A ${rOut} ${rOut} 0 ${largeArcOut} 1 ${p3x} ${p3y}`,
    `Q ${c2x} ${c2y} ${p4x} ${p4y}`,
    `L ${p5x} ${p5y}`,
    `Q ${c3x} ${c3y} ${p6x} ${p6y}`,
    `A ${rIn} ${rIn} 0 ${largeArcIn} 0 ${p7x} ${p7y}`,
    `Q ${c4x} ${c4y} ${p8x} ${p8y}`,
    'Z'
  ].join(' ');
}

function hoverInternalUtilDonut(idx) {
  const rateEl = document.getElementById('iumDonutRate');
  const subEl = document.getElementById('iumDonutSub');
  const capEl = document.getElementById('iumDonutCap');
  const arcs = document.querySelectorAll('.ium-donut-arc');
  const legends = document.querySelectorAll('.ium-legend-item');

  if (idx === null || idx === undefined || !INTERNAL_UTIL_DONUT_SEGMENTS[idx]) {
    if (rateEl) {
      rateEl.textContent = '90%';
      rateEl.style.color = '#0F172A';
    }
    if (subEl) subEl.textContent = '36 / 40명 가동';
    if (capEl) capEl.textContent = '유상 33 · 사내 3';
    arcs.forEach(a => {
      a.setAttribute('stroke-width', '22');
      a.style.opacity = '1';
    });
    legends.forEach(l => l.classList.remove('active'));
    return;
  }

  const seg = INTERNAL_UTIL_DONUT_SEGMENTS[idx];
  if (rateEl) {
    rateEl.textContent = `${seg.pct}%`;
    rateEl.style.color = seg.color;
  }
  if (subEl) subEl.textContent = `${seg.count} / 40명`;
  if (capEl) capEl.textContent = seg.shortLabel;

  arcs.forEach((a, i) => {
    a.setAttribute('stroke-width', i === idx ? '26' : '19');
    a.style.opacity = i === idx ? '1' : '0.32';
  });
  legends.forEach((l, i) => l.classList.toggle('active', i === idx));
}

function renderInternalUtilBarListHtml(mode = 'ROLE') {
  const rows = INTERNAL_UTIL_BAR_DATA[mode] || INTERNAL_UTIL_BAR_DATA.ROLE;
  return rows.map(r => {
    const activePct = Math.round((r.active / r.total) * 1000) / 10;
    const confirmedPct = Math.round((r.confirmed / r.total) * 1000) / 10;
    const unconfirmedPct = Math.round((r.unconfirmed / r.total) * 1000) / 10;
    const isFull = r.rate === 100 && r.unconfirmed === 0;
    const hasUnconfirmed = r.unconfirmed > 0;

    return `
      <div class="ium-bar-row">
        <div class="ium-bar-top">
          <div>
            <span class="ium-bar-name">${r.name}</span>
            <span class="ium-bar-total">(총 ${r.total}명 · 수행 ${r.active}${r.confirmed ? ` · 확정대기 ${r.confirmed}` : ''}${r.unconfirmed ? ` · 미확정 ${r.unconfirmed}` : ''})</span>
          </div>
          <div class="ium-bar-meta">
            ${isFull ? `<span class="ium-mini-badge full">풀가동</span>` : ''}
            ${hasUnconfirmed ? `<span class="ium-mini-badge alert">미확정 ${r.unconfirmed}명</span>` : ''}
            <span class="ium-bar-rate">${r.rate}%</span>
          </div>
        </div>
        <div class="ium-bar-track">
          <div class="ium-bar-seg" style="width:${activePct}%; background:linear-gradient(90deg, #93c5fd 0%, #3b82f6 100%);" title="수행 ${r.active}명"></div>
          ${r.confirmed > 0 ? `<div class="ium-bar-seg" style="width:${confirmedPct}%; background:linear-gradient(90deg, #6ee7b7 0%, #10b981 100%);" title="확정대기 ${r.confirmed}명"></div>` : ''}
          ${r.unconfirmed > 0 ? `<div class="ium-bar-seg" style="width:${unconfirmedPct}%; background:linear-gradient(90deg, #fcd34d 0%, #f59e0b 100%);" title="미확정대기 ${r.unconfirmed}명"></div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function switchInternalUtilBarMode(mode) {
  INTERNAL_UTIL_MODAL_STATE.barMode = mode;
  const listEl = document.getElementById('iumBarListContainer');
  if (listEl) {
    listEl.innerHTML = renderInternalUtilBarListHtml(mode);
  }
  document.querySelectorAll('.ium-pill-btn[data-bar-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.barMode === mode);
  });
}

function selectInternalUtilMonth(idx) {
  const item = INTERNAL_UTIL_TREND_MONTHS[idx];
  if (!item) return;
  INTERNAL_UTIL_MODAL_STATE.activeMonthIdx = idx;
  const reasonEl = document.getElementById('iumComboReasonText');
  if (reasonEl) {
    reasonEl.textContent = item.reason;
  }
  document.querySelectorAll('.ium-month-hit-col').forEach((el, i) => {
    el.setAttribute('fill', i === idx ? 'rgba(59, 130, 246, 0.05)' : 'transparent');
  });
  document.querySelectorAll('.ium-month-point-ring').forEach((el, i) => {
    el.setAttribute('r', i === idx ? '6.5' : '4.5');
    el.setAttribute('stroke-width', i === idx ? '3' : '2.2');
  });
  document.querySelectorAll('.ium-month-x-label').forEach((el, i) => {
    el.setAttribute('font-weight', i === idx ? '800' : '600');
    el.setAttribute('fill', i === idx ? '#0f172a' : '#94a3b8');
  });
}

function toggleInternalUtilMatchPopover(event) {
  if (event) event.stopPropagation();
  const pop = document.getElementById('iumMatchPopover');
  if (!pop) return;
  const isHidden = pop.style.display === 'none' || !pop.style.display;
  pop.style.display = isHidden ? 'block' : 'none';
}

function quickProposeUnassignedToSlot(projectTitle, slotRole, fitPct, projectId, slotId) {
  const pop = document.getElementById('iumMatchPopover');
  if (pop) pop.style.display = 'none';
  showToast(`✅ [AI 추천 가배정] 김민수 차장(고급·백엔드)을 '${projectTitle} (${slotRole} · 적합도 ${fitPct}%)' 후보로 제안 등록했습니다.`);
  if (projectId && slotId) {
    closeModal();
    openRfpMatchModal(projectId, slotId);
  }
}

function buildInternalUtilizationSectionHtml() {
  // Subtle Modern Donut Chart with Linear Gradients (No gap, flat edges)
  const r = 68;
  const C = 2 * Math.PI * r;
  let cumLen = 0;
  const donutGradsSvg = INTERNAL_UTIL_DONUT_SEGMENTS.map((seg, i) => `
    <linearGradient id="${seg.gradId}" gradientUnits="userSpaceOnUse" x1="${i % 2 === 0 ? 15 : 165}" y1="15" x2="${i % 2 === 0 ? 165 : 15}" y2="165">
      <stop offset="0%" stop-color="${seg.gradStart}" />
      <stop offset="100%" stop-color="${seg.gradEnd}" />
    </linearGradient>
  `).join('');
  const donutArcsSvg = INTERNAL_UTIL_DONUT_SEGMENTS.map((seg, idx) => {
    const segLen = (seg.count / 40) * C;
    const drawLen = Math.max(2, segLen - 1);
    const dashOffset = -cumLen;
    cumLen += segLen;
    return `
      <circle
        class="ium-donut-arc"
        cx="90" cy="90" r="${r}"
        fill="none"
        stroke="url(#${seg.gradId})"
        stroke-width="22"
        stroke-dasharray="${drawLen.toFixed(2)} ${C.toFixed(2)}"
        stroke-dashoffset="${dashOffset.toFixed(2)}"
        transform="rotate(-90 90 90)"
        style="cursor:pointer; transition: stroke-width 0.18s ease, opacity 0.18s ease;"
        onmouseenter="hoverInternalUtilDonut(${idx})"
        onmouseleave="hoverInternalUtilDonut(null)"
      />
    `;
  }).join('');

  // Multi-Spline Smooth Bezier Chart
  const xCoords = [110, 240, 370, 500, 630];
  const yForRate = (rate) => Math.round(126 - ((rate - 68) / 28) * 94);
  const points = INTERNAL_UTIL_TREND_MONTHS.map((m, i) => ({
    ...m,
    x: xCoords[i],
    y: yForRate(m.rate),
    yBill: yForRate(m.billableRate),
    yTarget: yForRate(m.targetRate)
  }));

  const totalRatePath = buildSmoothCatmullBezierPath(points.map(p => ({ x: p.x, y: p.y })));
  const billableRatePath = buildSmoothCatmullBezierPath(points.map(p => ({ x: p.x, y: p.yBill })));
  const targetWavePath = buildSmoothCatmullBezierPath([
    { x: xCoords[0], y: yForRate(84) },
    { x: xCoords[1], y: yForRate(86) },
    { x: xCoords[2], y: yForRate(85) },
    { x: xCoords[3], y: yForRate(85.5) },
    { x: xCoords[4], y: yForRate(85) }
  ]);
  const totalAreaPath = `${totalRatePath} L ${points[4].x} 136 L ${points[0].x} 136 Z`;
  const billAreaPath = `${billableRatePath} L ${points[4].x} 136 L ${points[0].x} 136 Z`;

  const curBarMode = INTERNAL_UTIL_MODAL_STATE.barMode || 'ROLE';
  const curMonthIdx = INTERNAL_UTIL_MODAL_STATE.activeMonthIdx ?? 3;

  return `
    <div class="ium-wrap" onclick="const p=document.getElementById('iumMatchPopover'); if(p) p.style.display='none';">
      <!-- [1] 최상단 4개 KPI 카드 (홈 화면과 동일한 구성) -->
      <section class="exec-kpi-grid">
        <article class="exec-kpi-card" style="cursor:default;">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">정규직 총원</span>
            <span class="exec-kpi-icon">${svgIcon('users', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">40<span class="exec-kpi-unit">명</span> <span class="exec-kpi-sub-val">(2026.11.18 기준)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>수행 36명 · 확정대기 3명 · 미확정 1명</span>
          </div>
        </article>

        <article class="exec-kpi-card" style="cursor:default;">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">현재 가동률</span>
            <span class="exec-kpi-icon">${svgIcon('award', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">90<span class="exec-kpi-unit">%</span> <span class="exec-kpi-sub-val">(36/40명 가동)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>손익분기 목표(85%) 대비 <strong style="color:#dc2626; font-weight:700;">+5%</strong> 상회</span>
          </div>
        </article>

        <article class="exec-kpi-card" style="cursor:default;">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">유상 가동률</span>
            <span class="exec-kpi-icon">${svgIcon('briefcase', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">82.5<span class="exec-kpi-unit">%</span> <span class="exec-kpi-sub-val">(33/40명 빌링)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>고객사 유상 33명 · 사내 R&D/제안 3명</span>
          </div>
        </article>

        <article class="exec-kpi-card" style="cursor:default;">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">12월 예상 가동률</span>
            <span class="exec-kpi-icon">${svgIcon('file', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">82<span class="exec-kpi-unit">%</span> <span class="exec-kpi-sub-val" style="color:#2563eb; font-weight:700;">(-8%)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>유상 가동률 75.0% (<strong style="color:#2563eb; font-weight:700;">-7.5%</strong>) · 30/40명 빌링</span>
          </div>
        </article>
      </section>

      <!-- 본문 -->
      <div class="ium-body">
        <!-- [2] 상단 2열 그리드 차트 영역 -->
        <div class="ium-top-grid">
          <!-- 좌측 카드: 투입 성격별 구성 (Interactive SVG 도넛 차트) -->
          <section class="ium-card">
            <div class="ium-card-head">
              <div>
                <h4 class="ium-card-title">투입 성격별 구성</h4>
                <span class="ium-card-subtitle">도넛 또는 범례에 마우스를 올리면 상세 비율이 표시됩니다</span>
              </div>
              <span style="font-size:11.5px; font-weight:700; color:#2563eb; background:#eff6ff; border:1px solid #dbeafe; padding:3px 10px; border-radius:999px;">총 40명</span>
            </div>

            <div class="ium-donut-layout">
              <div class="ium-donut-box" style="width:180px; height:180px;">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  <defs>${donutGradsSvg}</defs>
                  <circle cx="90" cy="90" r="${r}" fill="none" stroke="#f1f5f9" stroke-width="22" />
                  ${donutArcsSvg}
                </svg>
                <div class="ium-donut-center">
                  <span id="iumDonutRate" class="ium-donut-rate" style="color:#0F172A;">90%</span>
                  <span id="iumDonutSub" class="ium-donut-sub">36 / 40명 가동</span>
                  <span id="iumDonutCap" class="ium-donut-caption">유상 33 · 사내 3</span>
                </div>
              </div>

              <div class="ium-legend-list">
                ${INTERNAL_UTIL_DONUT_SEGMENTS.map((seg, idx) => `
                  <div class="ium-legend-item" onmouseenter="hoverInternalUtilDonut(${idx})" onmouseleave="hoverInternalUtilDonut(null)">
                    <div class="ium-legend-left">
                      <span class="ium-legend-dot" style="background:${seg.cssGrad};"></span>
                      <div style="min-width:0;">
                        <span class="ium-legend-label">${seg.label}</span>
                        <span class="ium-legend-note">${seg.note}</span>
                      </div>
                    </div>
                    <div class="ium-legend-val">
                      ${seg.count}명<span class="ium-legend-pct">(${seg.pct}%)</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- 우측 카드: 직군·등급별 가동 편차 (Soft Capsule Progress Bars) -->
          <section class="ium-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div class="ium-card-head">
                <div>
                  <h4 class="ium-card-title">직군·등급별 가동 편차</h4>
                  <span class="ium-card-subtitle">직군 및 기술등급별 가동률과 대기 인원 분포</span>
                </div>
                <div class="ium-pill-toggle">
                  <button type="button" class="ium-pill-btn ${curBarMode === 'ROLE' ? 'active' : ''}" data-bar-mode="ROLE" onclick="switchInternalUtilBarMode('ROLE')">직군별</button>
                  <button type="button" class="ium-pill-btn ${curBarMode === 'GRADE' ? 'active' : ''}" data-bar-mode="GRADE" onclick="switchInternalUtilBarMode('GRADE')">등급별</button>
                </div>
              </div>

              <div id="iumBarListContainer" class="ium-bar-list">
                ${renderInternalUtilBarListHtml(curBarMode)}
              </div>
            </div>

            <div style="display:flex; align-items:center; justify-content:center; gap:18px; margin-top:14px; padding-top:12px; border-top:1px dashed #e2e8f0; font-size:11.5px; font-weight:600; color:#64748b;">
              <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#3b82f6; display:inline-block;"></span>수행중</span>
              <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#10b981; display:inline-block;"></span>확정대기</span>
              <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#f59e0b; display:inline-block;"></span>미확정</span>
            </div>
          </section>
        </div>

        <!-- [3] 중단 와이드 카드: 향후 3개월 가동률 추이 및 투입·철수 밸런스 (Multi-Wave Smooth Spline Chart) -->
        <section class="ium-card">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; min-height:30px; margin-bottom:10px;">
            <h4 class="ium-card-title">향후 3개월 가동률 추이 및 투입·철수 밸런스</h4>
            <div class="ium-combo-reason-box">
              <span style="color:#3b82f6;">●</span>
              <span id="iumComboReasonText">${INTERNAL_UTIL_TREND_MONTHS[curMonthIdx]?.reason || INTERNAL_UTIL_TREND_MONTHS[3].reason}</span>
            </div>
          </div>

          <div class="spline-chart-wrap">
            <svg width="100%" height="225" viewBox="0 0 710 205" style="display:block; overflow:visible;">
              <defs>
                <linearGradient id="iumBlueAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.11" />
                  <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0" />
                </linearGradient>
                <linearGradient id="iumMintAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10B981" stop-opacity="0.08" />
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <!-- 2D Dashed Grid Lines -->
              <line x1="48" y1="28" x2="680" y2="28" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 4" />
              <line x1="48" y1="64" x2="680" y2="64" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 4" />
              <line x1="48" y1="100" x2="680" y2="100" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 4" />
              <line x1="48" y1="136" x2="680" y2="136" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 4" />
              <line x1="48" y1="174" x2="680" y2="174" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 4" />

              ${xCoords.map(xc => `
                <line x1="${xc}" y1="18" x2="${xc}" y2="174" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 4" />
              `).join('')}

              <!-- Y-Axis Labels -->
              <text x="38" y="32" text-anchor="end" font-size="10" font-weight="600" fill="#94a3b8">95%</text>
              <text x="38" y="68" text-anchor="end" font-size="10" font-weight="600" fill="#94a3b8">85%</text>
              <text x="38" y="104" text-anchor="end" font-size="10" font-weight="600" fill="#94a3b8">75%</text>
              <text x="38" y="140" text-anchor="end" font-size="10" font-weight="600" fill="#94a3b8">68%</text>

              <!-- Subtle Translucent Gradient Area Fills -->
              <path d="${totalAreaPath}" fill="url(#iumBlueAreaGrad)" />
              <path d="${billAreaPath}" fill="url(#iumMintAreaGrad)" />

              <!-- Smooth Cubic Bezier Curves (Amber Target, Emerald Billable, Soft Blue Total) -->
              <path d="${targetWavePath}" fill="none" stroke="#F59E0B" stroke-width="1.8" stroke-dasharray="5 4" stroke-linecap="round" />
              <path d="${billableRatePath}" fill="none" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" />
              <path d="${totalRatePath}" fill="none" stroke="#3B82F6" stroke-width="2.6" stroke-linecap="round" />

              ${points.map((p, idx) => {
                const isSelected = idx === curMonthIdx;
                const deployH = Math.max(4, p.deploy * 3.8);
                const rolloffH = Math.max(3, p.rolloff * 3.8);
                const baseBarY = 174;
                const mainColor = p.isForecast ? '#D97706' : '#2563EB';
                return `
                  <g style="cursor:pointer;" onmouseenter="selectInternalUtilMonth(${idx})" onclick="selectInternalUtilMonth(${idx})">
                    <rect class="ium-month-hit-col" x="${p.x - 54}" y="12" width="108" height="184" rx="12" fill="${isSelected ? 'rgba(59, 130, 246, 0.05)' : 'transparent'}" />

                    <!-- Billable Curve Node -->
                    <circle cx="${p.x}" cy="${p.yBill}" r="3.6" fill="#ffffff" stroke="#10B981" stroke-width="2" />
                    <text x="${p.x}" y="${p.yBill + 13}" text-anchor="middle" font-size="9.5" font-weight="600" fill="#059669">${p.billableRate}%</text>

                    <!-- Total Utilization Curve Node -->
                    <text x="${p.x}" y="${p.y - 10}" text-anchor="middle" font-size="11.5" font-weight="800" fill="${mainColor}">${p.rate}%</text>
                    <circle class="ium-month-point-ring" cx="${p.x}" cy="${p.y}" r="${isSelected ? '6.5' : '4.5'}" fill="#ffffff" stroke="${mainColor}" stroke-width="${isSelected ? '3' : '2.2'}" />

                    <!-- Mini Capsule Bars for Deploy (+) / Rolloff (-) -->
                    <rect x="${p.x - 19}" y="${baseBarY - deployH}" width="15" height="${deployH}" rx="4" fill="#93C5FD" />
                    <text x="${p.x - 11.5}" y="${baseBarY - deployH - 3}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#2563EB">+${p.deploy}</text>

                    <rect x="${p.x + 4}" y="${baseBarY - rolloffH}" width="15" height="${rolloffH}" rx="4" fill="${p.rolloff >= 5 ? '#FCD34D' : '#6EE7B7'}" />
                    <text x="${p.x + 11.5}" y="${baseBarY - rolloffH - 3}" text-anchor="middle" font-size="9.5" font-weight="700" fill="${p.rolloff >= 5 ? '#D97706' : '#059669'}">${p.rolloff > 0 ? `-${p.rolloff}` : '0'}</text>

                    <text class="ium-month-x-label" x="${p.x}" y="194" text-anchor="middle" font-size="11.5" font-weight="${isSelected ? '800' : '600'}" fill="${isSelected ? '#0f172a' : '#94a3b8'}">${p.label}</text>
                  </g>
                `;
              }).join('')}
            </svg>

            <!-- Right-Side Line Legend Column -->
            <div class="spline-side-legend">
              <div class="spline-legend-block">
                <div class="spline-legend-line" style="background:#3B82F6;"></div>
                <span class="spline-legend-title">전체 가동률</span>
                <span class="spline-legend-sub">실적 · 예측 추이</span>
              </div>
              <div class="spline-legend-block">
                <div class="spline-legend-line" style="background:#10B981;"></div>
                <span class="spline-legend-title">유상 가동률</span>
                <span class="spline-legend-sub">고객사 빌링 기준</span>
              </div>
              <div class="spline-legend-block">
                <div class="spline-legend-line" style="background:#F59E0B;"></div>
                <span class="spline-legend-title">목표 기준선</span>
                <span class="spline-legend-sub">손익분기 85%</span>
              </div>
              <div class="spline-legend-block">
                <div class="spline-legend-line" style="background:linear-gradient(90deg, #93C5FD 50%, #6EE7B7 50%);"></div>
                <span class="spline-legend-title">투입 · 철수</span>
                <span class="spline-legend-sub">월별 인력 증감</span>
              </div>
            </div>
          </div>
        </section>

        <!-- [4] 하단 포커스 액션 배너 -->
        <div class="ium-focus-banner">
          <div class="ium-focus-left">
            <span class="ium-focus-tag">집중 관리</span>
            <span>
              <strong>차기 미확정 대기 1명</strong> — <strong>김민수 차장</strong>
              <span style="color:#64748b; font-size:12px;">(고급 · 백엔드 · #퇴직연금 #계정계코어 · 대기 8일차)</span>
            </span>
          </div>

          <div class="ium-focus-actions">
            <button type="button" class="btn btn-primary btn-sm" style="background:#0f172a; border-color:#0f172a; height:34px; padding:0 14px; font-size:12.5px; font-weight:700;" onclick="toggleInternalUtilMatchPopover(event)">
              ✨ AI 추천 TO 매칭
            </button>
          </div>

          <div id="iumMatchPopover" class="ium-match-popover" style="display:none;" onclick="event.stopPropagation()">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid #f3f4f6;">
              <strong style="font-size:12.5px; color:#111827;">🤖 김민수 차장 맞춤 미충원 TO 추천 (2건)</strong>
              <button type="button" style="border:none; background:none; color:#9ca3af; cursor:pointer; font-size:16px; line-height:1;" onclick="toggleInternalUtilMatchPopover(event)">&times;</button>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; padding:8px 10px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                <div style="min-width:0;">
                  <div style="font-size:12px; font-weight:700; color:#111827;">미래에셋증권 퇴직연금 2석</div>
                  <div style="font-size:11px; color:#6b7280;">연금 로보일임·수수료 배치 선임개발 · <strong style="color:#059669;">적합도 96%</strong></div>
                </div>
                <button type="button" class="btn btn-primary btn-sm" style="height:28px; padding:0 10px; font-size:11.5px; white-space:nowrap;" onclick="quickProposeUnassignedToSlot('미래에셋증권 퇴직연금', '배치 선임개발', 96, 'prj_1', 'slot_103')">가배정/제안</button>
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; padding:8px 10px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                <div style="min-width:0;">
                  <div style="font-size:12px; font-weight:700; color:#111827;">NH투자증권 연금채널 1석</div>
                  <div style="font-size:11px; color:#6b7280;">연금 채널/마이데이터 목표모델 설계 · <strong style="color:#2563eb;">적합도 89%</strong></div>
                </div>
                <button type="button" class="btn btn-primary btn-sm" style="height:28px; padding:0 10px; font-size:11.5px; white-space:nowrap;" onclick="quickProposeUnassignedToSlot('NH투자증권 연금채널', '목표모델 설계', 89, 'prj_3', 'slot_302')">가배정/제안</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openInternalUtilizationModal() {
  openAnalyticsFromDashboard('UTILIZATION');
}

/* =========================================================================
   DEPLOYED PERSONNEL STRUCTURE & PROJECT ALLOCATION MODAL (DeployedPersonnelModal)
   ========================================================================= */
const DEPLOYED_PERSONNEL_MODAL_STATE = {
  barMode: 'EMP',
  activeWeekIdx: 1,
  retentionPopoverOpen: false
};

const DEPLOYED_DONUT_SEGMENTS = [
  { key: 'regular', label: '정규직 (내부)', shortLabel: '정규직 (내부)', count: 36, pct: '75.0', gradId: 'dpmDonutGrad0', gradStart: '#93C5FD', gradEnd: '#3B82F6', cssGrad: 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)', color: '#3B82F6', pastelFill: '#93C5FD', note: '고객사 유상 33명 · 사내 지원 3명' },
  { key: 'freelancer', label: '프리랜서 (개인/반프리)', shortLabel: '프리랜서', count: 8, pct: '16.7', gradId: 'dpmDonutGrad1', gradStart: '#A5B4FC', gradEnd: '#6366F1', cssGrad: 'linear-gradient(135deg, #A5B4FC 0%, #6366F1 100%)', color: '#6366F1', pastelFill: '#A5B4FC', note: '기검증 금융 도메인 전문 프리랜서' },
  { key: 'partner', label: '협력사 (도급/파견)', shortLabel: '협력사 인력', count: 4, pct: '8.3', gradId: 'dpmDonutGrad2', gradStart: '#6EE7B7', gradEnd: '#10B981', cssGrad: 'linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)', color: '#10B981', pastelFill: '#6EE7B7', note: '전략 파트너사 전문 기술인력' }
];

const DEPLOYED_PROJECT_BARS = [
  {
    name: '삼성증권 연금 고객중심 서비스 개선',
    total: 18,
    badge: '11/18 일부철수(2명)',
    badgeType: 'alert',
    emp: [
      { label: '정규직', count: 13, color: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)' },
      { label: '프리랜서', count: 3, color: 'linear-gradient(90deg, #A5B4FC 0%, #6366F1 100%)' },
      { label: '협력사', count: 2, color: 'linear-gradient(90deg, #6EE7B7 0%, #10B981 100%)' }
    ],
    grade: [
      { label: '특급', count: 5, color: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)' },
      { label: '고급', count: 8, color: 'linear-gradient(90deg, #A5B4FC 0%, #6366F1 100%)' },
      { label: '중급', count: 4, color: 'linear-gradient(90deg, #6EE7B7 0%, #10B981 100%)' },
      { label: '초급', count: 1, color: 'linear-gradient(90deg, #E2E8F0 0%, #94A3B8 100%)' }
    ]
  },
  {
    name: '하나증권 퇴직연금 일임형로보구축',
    total: 16,
    badge: '11/30 일부철수(3명)',
    badgeType: 'alert',
    emp: [
      { label: '정규직', count: 12, color: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)' },
      { label: '프리랜서', count: 3, color: 'linear-gradient(90deg, #A5B4FC 0%, #6366F1 100%)' },
      { label: '협력사', count: 1, color: 'linear-gradient(90deg, #6EE7B7 0%, #10B981 100%)' }
    ],
    grade: [
      { label: '특급', count: 5, color: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)' },
      { label: '고급', count: 6, color: 'linear-gradient(90deg, #A5B4FC 0%, #6366F1 100%)' },
      { label: '중급', count: 3, color: 'linear-gradient(90deg, #6EE7B7 0%, #10B981 100%)' },
      { label: '초급', count: 2, color: 'linear-gradient(90deg, #E2E8F0 0%, #94A3B8 100%)' }
    ]
  },
  {
    name: '신영증권 외화표시펀드 매매 시스템',
    total: 11,
    badge: '11/20 일부철수(2명)',
    badgeType: 'alert',
    emp: [
      { label: '정규직', count: 8, color: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)' },
      { label: '프리랜서', count: 2, color: 'linear-gradient(90deg, #A5B4FC 0%, #6366F1 100%)' },
      { label: '협력사', count: 1, color: 'linear-gradient(90deg, #6EE7B7 0%, #10B981 100%)' }
    ],
    grade: [
      { label: '특급', count: 3, color: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)' },
      { label: '고급', count: 5, color: 'linear-gradient(90deg, #A5B4FC 0%, #6366F1 100%)' },
      { label: '중급', count: 2, color: 'linear-gradient(90deg, #6EE7B7 0%, #10B981 100%)' },
      { label: '초급', count: 1, color: 'linear-gradient(90deg, #E2E8F0 0%, #94A3B8 100%)' }
    ]
  },
  {
    name: '사내 R&D · 신규 제안 지원',
    total: 3,
    badge: '100% 내부',
    badgeType: 'full',
    emp: [
      { label: '정규직', count: 3, color: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)' }
    ],
    grade: [
      { label: '특급', count: 1, color: 'linear-gradient(90deg, #93C5FD 0%, #3B82F6 100%)' },
      { label: '고급', count: 1, color: 'linear-gradient(90deg, #A5B4FC 0%, #6366F1 100%)' },
      { label: '중급', count: 1, color: 'linear-gradient(90deg, #6EE7B7 0%, #10B981 100%)' }
    ]
  }
];

const DEPLOYED_GRADE_PYRAMID = [
  { grade: '특급', count: 14, pct: 29, color: '#3B82F6', gradId: 'dpmPyrGrad0', gradStart: '#93C5FD', gradEnd: '#3B82F6' },
  { grade: '고급', count: 20, pct: 42, color: '#6366F1', gradId: 'dpmPyrGrad1', gradStart: '#A5B4FC', gradEnd: '#6366F1' },
  { grade: '중급', count: 10, pct: 21, color: '#10B981', gradId: 'dpmPyrGrad2', gradStart: '#6EE7B7', gradEnd: '#10B981' },
  { grade: '초급', count: 4, pct: 8, color: '#94A3B8', gradId: 'dpmPyrGrad3', gradStart: '#CBD5E1', gradEnd: '#94A3B8' }
];

const DEPLOYED_WEEKLY_SCHEDULE = [
  {
    week: '11월 3주',
    deploy: 1,
    rolloff: 4,
    summary: '11월 3주: 삼성증권 연금 개선(2명 · 11/18) 및 신영증권 외화펀드(2명 · 11/20) 철수 도래'
  },
  {
    week: '11월 4주',
    deploy: 6,
    rolloff: 3,
    summary: '11월 4주: 미래에셋 차세대(4명)·NH투자 ISP(2명) 투입 및 하나증권(3명 · 11/30) 철수'
  },
  {
    week: '12월 1주',
    deploy: 4,
    rolloff: 1,
    summary: '12월 1주: 미래에셋 퇴직연금 본착수 추가 투입(+4명) 및 단기 기술지원(-1명) 종료'
  },
  {
    week: '12월 2주',
    deploy: 2,
    rolloff: 0,
    summary: '12월 2주: NH투자증권 연금자산관리 플랫폼 ISP 추가 본투입(+2명) · 철수 없음'
  }
];

function hoverDeployedDonut(idx) {
  const rateEl = document.getElementById('dpmDonutMain');
  const subEl = document.getElementById('dpmDonutSub');
  const capEl = document.getElementById('dpmDonutCap');
  const arcs = document.querySelectorAll('.dpm-donut-arc');
  const legends = document.querySelectorAll('.dpm-legend-item');

  if (idx === null || idx === undefined || !DEPLOYED_DONUT_SEGMENTS[idx]) {
    if (rateEl) {
      rateEl.textContent = '48명';
      rateEl.style.color = '#0F172A';
    }
    if (subEl) subEl.textContent = '정규 36 · 외부 12';
    if (capEl) capEl.textContent = '내부 75% · 외주 25%';
    arcs.forEach(a => {
      a.setAttribute('stroke-width', '22');
      a.style.opacity = '1';
    });
    legends.forEach(l => l.classList.remove('active'));
    return;
  }

  const seg = DEPLOYED_DONUT_SEGMENTS[idx];
  if (rateEl) {
    rateEl.textContent = `${seg.count}명`;
    rateEl.style.color = seg.color;
  }
  if (subEl) subEl.textContent = `비중 ${seg.pct}%`;
  if (capEl) capEl.textContent = seg.shortLabel;

  arcs.forEach((a, i) => {
    a.setAttribute('stroke-width', i === idx ? '26' : '19');
    a.style.opacity = i === idx ? '1' : '0.32';
  });
  legends.forEach((l, i) => l.classList.toggle('active', i === idx));
}

function renderDeployedPrjBarListHtml(mode = 'EMP') {
  const maxTotal = 18;
  return DEPLOYED_PROJECT_BARS.map(prj => {
    const items = mode === 'GRADE' ? prj.grade : prj.emp;
    const widthRatio = Math.max(24, Math.round((prj.total / maxTotal) * 100));
    const detailText = items.map(it => `${it.label} ${it.count}`).join(' · ');

    return `
      <div class="ium-bar-row">
        <div class="ium-bar-top">
          <div style="min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
            <span class="ium-bar-name">${prj.name}</span>
            <span class="ium-bar-total">(${detailText})</span>
          </div>
          <div class="ium-bar-meta" style="flex-shrink:0;">
            <span class="ium-mini-badge ${prj.badgeType}">${prj.badge}</span>
            <span class="ium-bar-rate" style="min-width:36px;">${prj.total}명</span>
          </div>
        </div>
        <div class="ium-bar-track">
          <div style="width:${widthRatio}%; height:100%; display:flex; gap:2px; border-radius:999px; overflow:hidden;">
            ${items.map(it => {
              const segPct = Math.round((it.count / prj.total) * 1000) / 10;
              return `<div class="ium-bar-seg" style="width:${segPct}%; background:${it.color};" title="${it.label} ${it.count}명"></div>`;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderDeployedPrjLegendHtml(mode = 'EMP') {
  if (mode === 'GRADE') {
    return `
      <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#3B82F6; display:inline-block;"></span>특급</span>
      <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#818CF8; display:inline-block;"></span>고급</span>
      <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#34D399; display:inline-block;"></span>중급</span>
      <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#CBD5E1; display:inline-block;"></span>초급</span>
    `;
  }
  return `
    <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#60A5FA; display:inline-block;"></span>정규직</span>
    <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#818CF8; display:inline-block;"></span>프리랜서</span>
    <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:10px; height:6px; border-radius:99px; background:#34D399; display:inline-block;"></span>협력사</span>
  `;
}

function switchDeployedPrjBarMode(mode) {
  DEPLOYED_PERSONNEL_MODAL_STATE.barMode = mode;
  const listEl = document.getElementById('dpmPrjBarListContainer');
  if (listEl) {
    listEl.innerHTML = renderDeployedPrjBarListHtml(mode);
  }
  const legendEl = document.getElementById('dpmPrjBarLegendContainer');
  if (legendEl) {
    legendEl.innerHTML = renderDeployedPrjLegendHtml(mode);
  }
  document.querySelectorAll('.ium-pill-btn[data-dpm-bar-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.dpmBarMode === mode);
  });
}

function selectDeployedWeekCol(idx) {
  const item = DEPLOYED_WEEKLY_SCHEDULE[idx];
  if (!item) return;
  DEPLOYED_PERSONNEL_MODAL_STATE.activeWeekIdx = idx;
  const summaryEl = document.getElementById('dpmWeekReasonText');
  if (summaryEl) {
    summaryEl.textContent = item.summary;
  }
  document.querySelectorAll('.dpm-week-hit-col').forEach((el, i) => {
    el.setAttribute('fill', i === idx ? 'rgba(59, 130, 246, 0.05)' : 'transparent');
  });
  document.querySelectorAll('.dpm-week-x-label').forEach((el, i) => {
    el.setAttribute('font-weight', i === idx ? '800' : '600');
    el.setAttribute('fill', i === idx ? '#0f172a' : '#94a3b8');
  });
}

function toggleDeployedRetentionPopover(event) {
  if (event) event.stopPropagation();
  const pop = document.getElementById('dpmRetentionPopover');
  if (!pop) return;
  const isHidden = pop.style.display === 'none' || !pop.style.display;
  pop.style.display = isHidden ? 'block' : 'none';
}

function sendRetentionProposalToTalent(talentName, targetPrj, fitPct) {
  const pop = document.getElementById('dpmRetentionPopover');
  if (pop) pop.style.display = 'none';
  showToast(`🚀 [우수 외주 리텐션] ${talentName}님께 '${targetPrj} (적합도 ${fitPct}%)' 차기 프로젝트 우선 연장/재투입 제안을 발송했습니다!`);
}

function sendAllRetentionProposals() {
  const pop = document.getElementById('dpmRetentionPopover');
  if (pop) pop.style.display = 'none';
  showToast('🚀 [일괄 리텐션 발송 완료] 권지민·양동근·오세훈 (★4.5 이상 핵심 외부 인력 3명)에게 차기 프로젝트 우선 제안을 일괄 발송했습니다!');
}

function buildDeployedPersonnelSectionHtml() {
  // Subtle Modern Donut Chart with Linear Gradients (No gap, flat edges)
  const r = 68;
  const C = 2 * Math.PI * r;
  let cumLen = 0;
  const donutGradsSvg = DEPLOYED_DONUT_SEGMENTS.map((seg, i) => `
    <linearGradient id="${seg.gradId}" gradientUnits="userSpaceOnUse" x1="${i % 2 === 0 ? 15 : 165}" y1="15" x2="${i % 2 === 0 ? 165 : 15}" y2="165">
      <stop offset="0%" stop-color="${seg.gradStart}" />
      <stop offset="100%" stop-color="${seg.gradEnd}" />
    </linearGradient>
  `).join('');
  const donutArcsSvg = DEPLOYED_DONUT_SEGMENTS.map((seg, idx) => {
    const segLen = (seg.count / 48) * C;
    const drawLen = Math.max(2, segLen - 1);
    const dashOffset = -cumLen;
    cumLen += segLen;
    return `
      <circle
        class="dpm-donut-arc"
        cx="90" cy="90" r="${r}"
        fill="none"
        stroke="url(#${seg.gradId})"
        stroke-width="22"
        stroke-dasharray="${drawLen.toFixed(2)} ${C.toFixed(2)}"
        stroke-dashoffset="${dashOffset.toFixed(2)}"
        transform="rotate(-90 90 90)"
        style="cursor:pointer; transition: stroke-width 0.18s ease, opacity 0.18s ease;"
        onmouseenter="hoverDeployedDonut(${idx})"
        onmouseleave="hoverDeployedDonut(null)"
      />
    `;
  }).join('');

  const pyrX = [46, 122, 198, 274];
  const pyrBaseY = 122;
  const wkX = [64, 174, 284, 394];
  const wkBaseY = 122;
  const curBarMode = DEPLOYED_PERSONNEL_MODAL_STATE.barMode || 'EMP';
  const curWeekIdx = DEPLOYED_PERSONNEL_MODAL_STATE.activeWeekIdx ?? 1;

  // Overlapping Translucent Polygon Area Points for 4-Week Schedule (Soft Blue & Soft Emerald)
  const deployPts = DEPLOYED_WEEKLY_SCHEDULE.map((w, i) => ({
    x: wkX[i],
    y: wkBaseY - Math.max(8, w.deploy * 12.5)
  }));
  const rolloffPts = DEPLOYED_WEEKLY_SCHEDULE.map((w, i) => ({
    x: wkX[i],
    y: wkBaseY - Math.max(8, w.rolloff * 14)
  }));
  const deployLinePath = deployPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const deployAreaPoly = `${deployLinePath} L ${wkX[3]} ${wkBaseY} L ${wkX[0]} ${wkBaseY} Z`;
  const rolloffLinePath = rolloffPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const rolloffAreaPoly = `${rolloffLinePath} L ${wkX[3]} ${wkBaseY} L ${wkX[0]} ${wkBaseY} Z`;

  return `
    <div class="ium-wrap" onclick="const p=document.getElementById('dpmRetentionPopover'); if(p) p.style.display='none';">
      <!-- [1] 최상단 4개 KPI 카드 (홈 화면과 동일한 구성) -->
      <section class="exec-kpi-grid">
        <article class="exec-kpi-card" style="cursor:default;">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">총 수행 인원</span>
            <span class="exec-kpi-icon">${svgIcon('users', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">48<span class="exec-kpi-unit">명</span> <span class="exec-kpi-sub-val">(2026.11.18 기준)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>수행 과제 3건(45명) · 사내 지원 3명</span>
          </div>
        </article>

        <article class="exec-kpi-card" style="cursor:default;">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">내부 인력 비중</span>
            <span class="exec-kpi-icon">${svgIcon('award', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">75.0<span class="exec-kpi-unit">%</span> <span class="exec-kpi-sub-val">(36/48명)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>고객사 유상 33명 · 사내 R&D/제안 3명</span>
          </div>
        </article>

        <article class="exec-kpi-card" style="cursor:default;">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">외주(프리·협력) 비중</span>
            <span class="exec-kpi-icon">${svgIcon('briefcase', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">25.0<span class="exec-kpi-unit">%</span> <span class="exec-kpi-sub-val">(12/48명)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>프리랜서 8명 · 협력사 4명 (상한 30%)</span>
          </div>
        </article>

        <article class="exec-kpi-card" style="cursor:default;">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">이달 철수 예정</span>
            <span class="exec-kpi-icon">${svgIcon('file', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">7<span class="exec-kpi-unit">명</span> <span class="exec-kpi-sub-val" style="color:#d97706; font-weight:700;">(11월 말 도래)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>삼성 2명 · 신영 2명 · 하나 3명 철수 예정</span>
          </div>
        </article>
      </section>

      <!-- 본문 -->
      <div class="ium-body">
        <!-- [2] 상단 2열 그리드 차트 영역 -->
        <div class="ium-top-grid">
          <!-- 좌측 카드: 고용 형태별 인력 구조 (Interactive SVG 도넛 차트 - 가동률 분석과 동일 위치/규격) -->
          <section class="ium-card">
            <div class="ium-card-head">
              <div>
                <h4 class="ium-card-title">고용 형태별 인력 구조</h4>
                <span class="ium-card-subtitle">도넛 조각 또는 범례 호버 시 상세 인원·비중 표시</span>
              </div>
              <span style="font-size:11.5px; font-weight:700; color:#2563eb; background:#eff6ff; border:1px solid #dbeafe; padding:3px 10px; border-radius:999px;">총 48명</span>
            </div>

            <div class="ium-donut-layout">
              <div class="ium-donut-box" style="width:180px; height:180px;">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  <defs>${donutGradsSvg}</defs>
                  <circle cx="90" cy="90" r="${r}" fill="none" stroke="#f1f5f9" stroke-width="22" />
                  ${donutArcsSvg}
                </svg>
                <div class="ium-donut-center">
                  <span id="dpmDonutMain" class="ium-donut-rate" style="color:#0F172A;">48명</span>
                  <span id="dpmDonutSub" class="ium-donut-sub">정규 36 · 외부 12</span>
                  <span id="dpmDonutCap" class="ium-donut-caption">내부 75% · 외주 25%</span>
                </div>
              </div>

              <div class="ium-legend-list">
                ${DEPLOYED_DONUT_SEGMENTS.map((seg, idx) => `
                  <div class="ium-legend-item dpm-legend-item" onmouseenter="hoverDeployedDonut(${idx})" onmouseleave="hoverDeployedDonut(null)">
                    <div class="ium-legend-left">
                      <span class="ium-legend-dot" style="background:${seg.cssGrad};"></span>
                      <div style="min-width:0;">
                        <span class="ium-legend-label">${seg.label}</span>
                        <span class="ium-legend-note">${seg.note}</span>
                      </div>
                    </div>
                    <div class="ium-legend-val">
                      ${seg.count}명<span class="ium-legend-pct">(${seg.pct}%)</span>
                    </div>
                  </div>
                `).join('')}
                <div class="ium-legend-item" style="background:#ecfdf5; border-color:#a7f3d0; cursor:default;">
                  <div class="ium-legend-left">
                    <span class="ium-legend-dot" style="background:linear-gradient(135deg, #6EE7B7 0%, #10B981 100%);"></span>
                    <div style="min-width:0;">
                      <span class="ium-legend-label" style="color:#047857;">적정 외주 비중 유지 중</span>
                      <span class="ium-legend-note" style="color:#059669;">권장 상한선 30% 이내 안정 운영</span>
                    </div>
                  </div>
                  <div class="ium-legend-val" style="color:#047857;">
                    25.0%<span class="ium-legend-pct" style="color:#059669;">(적정)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 우측 카드: 수행 프로젝트별 투입 인원 및 구성비 (Soft Capsule Horizontal Bars) -->
          <section class="ium-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div class="ium-card-head">
                <div>
                  <h4 class="ium-card-title">수행 프로젝트별 투입 인원 및 구성비</h4>
                  <span class="ium-card-subtitle">각 수행 과제의 고용형태·기술등급별 인력 비중</span>
                </div>
                <div class="ium-pill-toggle">
                  <button type="button" class="ium-pill-btn ${curBarMode === 'EMP' ? 'active' : ''}" data-dpm-bar-mode="EMP" onclick="switchDeployedPrjBarMode('EMP')">고용형태별</button>
                  <button type="button" class="ium-pill-btn ${curBarMode === 'GRADE' ? 'active' : ''}" data-dpm-bar-mode="GRADE" onclick="switchDeployedPrjBarMode('GRADE')">기술등급별</button>
                </div>
              </div>

              <div id="dpmPrjBarListContainer" class="ium-bar-list">
                ${renderDeployedPrjBarListHtml(curBarMode)}
              </div>
            </div>

            <div id="dpmPrjBarLegendContainer" style="display:flex; align-items:center; justify-content:center; gap:18px; margin-top:14px; padding-top:12px; border-top:1px dashed #e2e8f0; font-size:11.5px; font-weight:600; color:#64748b;">
              ${renderDeployedPrjLegendHtml(curBarMode)}
            </div>
          </section>
        </div>

        <!-- [3] 중단 와이드 카드: 전체 수행 인력 등급 분포 & 주차별 철수·교체 타임라인 (5 : 7 분할) -->
        <section class="ium-card">
          <div class="dpm-mid-split">
            <!-- 좌측 (5): 기술 등급 수직 바 차트 + Dashed Horizontal Grid -->
            <div class="dpm-mid-left">
              <div style="display:flex; align-items:center; justify-content:space-between; min-height:30px; margin-bottom:10px;">
                <h4 class="ium-card-title">전체 수행 인력 등급 분포</h4>
                <span style="font-size:11px; font-weight:700; color:#4f46e5; background:#eef2ff; border:1px solid #e0e7ff; padding:2px 9px; border-radius:999px;">고급 이상 71% 포진</span>
              </div>

              <svg width="100%" height="181" viewBox="0 0 320 146" style="display:block; overflow:visible;">
                <defs>
                  ${DEPLOYED_GRADE_PYRAMID.map(g => `
                    <linearGradient id="${g.gradId}" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="${g.gradStart}" />
                      <stop offset="100%" stop-color="${g.gradEnd}" />
                    </linearGradient>
                  `).join('')}
                </defs>
                <!-- Dashed Horizontal Grid Lines -->
                <line x1="16" y1="34" x2="304" y2="34" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
                <line x1="16" y1="64" x2="304" y2="64" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
                <line x1="16" y1="94" x2="304" y2="94" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
                <line x1="16" y1="${pyrBaseY}" x2="304" y2="${pyrBaseY}" stroke="#cbd5e1" stroke-width="1.2" />

                ${DEPLOYED_GRADE_PYRAMID.map((g, i) => {
                  const barH = Math.max(14, Math.round((g.count / 20) * 78));
                  const bx = pyrX[i];
                  const by = pyrBaseY - barH;
                  return `
                    <g>
                      <!-- Soft Translucent Track Column -->
                      <rect x="${bx - 16}" y="30" width="32" height="${pyrBaseY - 30}" rx="5" fill="#f1f5f9" />
                      <text x="${bx}" y="${by - 14}" text-anchor="middle" font-size="11" font-weight="800" fill="#1e293b">${g.count}명</text>
                      <text x="${bx}" y="${by - 3}" text-anchor="middle" font-size="9.5" font-weight="600" fill="#64748b">(${g.pct}%)</text>
                      <rect x="${bx - 16}" y="${by}" width="32" height="${barH}" rx="5" fill="url(#${g.gradId})" />
                      <text x="${bx}" y="139" text-anchor="middle" font-size="11.5" font-weight="700" fill="#475569">${g.grade}</text>
                    </g>
                  `;
                }).join('')}
              </svg>

              <div style="margin-top:10px; height:34px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:11.5px; font-weight:600; color:#64748b; text-align:center; background:#f8fafc; padding:0 10px; border-radius:10px; border:1px solid #e2e8f0;">
                <span>고급 이상 핵심 기술인력 <strong style="color:#0f172a;">71%(34명)</strong> 포진 · 안정적 수행 품질 확보</span>
              </div>
            </div>

            <!-- 우측 (7): 향후 4주 인력 변동 스케줄 (Subtle Overlapping Translucent Area) -->
            <div class="dpm-mid-right">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; min-height:30px; margin-bottom:10px;">
                <h4 class="ium-card-title">향후 4주 인력 투입·철수 변동 스케줄</h4>
                <div style="display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:700; margin-left:auto;">
                  <span style="display:inline-flex; align-items:center; gap:5px; background:#eff6ff; color:#2563eb; border:1px solid #dbeafe; padding:2px 9px; border-radius:8px;">신규 투입(+)</span>
                  <span style="display:inline-flex; align-items:center; gap:5px; background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; padding:2px 9px; border-radius:8px;">종료/철수(-)</span>
                </div>
              </div>

              <svg width="100%" height="181" viewBox="0 0 460 146" style="display:block; overflow:visible;">
                <!-- Dashed 2D Grid Lines -->
                <line x1="20" y1="36" x2="440" y2="36" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
                <line x1="20" y1="65" x2="440" y2="65" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
                <line x1="20" y1="94" x2="440" y2="94" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />
                <line x1="20" y1="${wkBaseY}" x2="440" y2="${wkBaseY}" stroke="#cbd5e1" stroke-width="1.2" />
                ${wkX.map(wx => `<line x1="${wx}" y1="22" x2="${wx}" y2="${wkBaseY}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3 3" />`).join('')}

                <!-- Overlapping Translucent Polygon Areas (Soft Blue & Soft Emerald - Home Screen Timeline Palette) -->
                <path d="${rolloffAreaPoly}" fill="rgba(16, 185, 129, 0.14)" />
                <path d="${deployAreaPoly}" fill="rgba(59, 130, 246, 0.16)" />
                <path d="${rolloffLinePath}" fill="none" stroke="#10B981" stroke-width="2" stroke-linejoin="round" />
                <path d="${deployLinePath}" fill="none" stroke="#3B82F6" stroke-width="2.2" stroke-linejoin="round" />

                ${DEPLOYED_WEEKLY_SCHEDULE.map((w, idx) => {
                  const isSel = idx === curWeekIdx;
                  const wx = wkX[idx];
                  const depY = deployPts[idx].y;
                  const rolY = rolloffPts[idx].y;
                  return `
                    <g style="cursor:pointer;" onmouseenter="selectDeployedWeekCol(${idx})" onclick="selectDeployedWeekCol(${idx})">
                      <rect class="dpm-week-hit-col" x="${wx - 48}" y="12" width="96" height="130" rx="10" fill="${isSel ? 'rgba(59, 130, 246, 0.05)' : 'transparent'}" />

                      <!-- Deploy Node & Label -->
                      <circle cx="${wx}" cy="${depY}" r="4.2" fill="#ffffff" stroke="#3B82F6" stroke-width="2.2" />
                      <text x="${wx - 14}" y="${depY - 7}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#2563EB">${w.deploy > 0 ? `+${w.deploy}명` : '0'}</text>

                      <!-- Rolloff Node & Label -->
                      <circle cx="${wx}" cy="${rolY}" r="4.2" fill="#ffffff" stroke="#10B981" stroke-width="2.2" />
                      <text x="${wx + 14}" y="${rolY - 7}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#059669">${w.rolloff > 0 ? `-${w.rolloff}명` : '0'}</text>

                      <text class="dpm-week-x-label" x="${wx}" y="139" text-anchor="middle" font-size="11.5" font-weight="${isSel ? '800' : '600'}" fill="${isSel ? '#0f172a' : '#94a3b8'}">${w.week}</text>
                    </g>
                  `;
                }).join('')}
              </svg>

              <div class="ium-combo-reason-box" style="width:100%; height:34px; box-sizing:border-box; margin-top:10px;">
                <span style="color:#3b82f6;">●</span>
                <span id="dpmWeekReasonText">${DEPLOYED_WEEKLY_SCHEDULE[curWeekIdx]?.summary || DEPLOYED_WEEKLY_SCHEDULE[1].summary}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- [4] 하단 포커스 액션 배너: 우수 외부 인력 이탈 방지 -->
        <div class="dpm-retention-banner">
          <div class="ium-focus-left">
            <span class="dpm-retention-tag">우수 외주 리텐션</span>
            <span>
              <strong>철수 임박 ★4.5 이상 핵심 외부 인력 3명</strong> —
              <strong>권지민</strong>(고급·D-2), <strong>양동근</strong>(중급·D-4), <strong>오세훈</strong>(고급·D-14)
            </span>
          </div>

          <div class="ium-focus-actions">
            <button type="button" class="btn btn-primary btn-sm" style="background:#0f172a; border-color:#0f172a; height:34px; padding:0 14px; font-size:12.5px; font-weight:700;" onclick="toggleDeployedRetentionPopover(event)">
              🎯 차기 프로젝트 우선 제안
            </button>
          </div>

          <div id="dpmRetentionPopover" class="ium-match-popover" style="display:none; width:460px;" onclick="event.stopPropagation()">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid #f3f4f6;">
              <strong style="font-size:12.5px; color:#111827;">🎯 핵심 외부 인력 차기 프로젝트 매칭 (3명)</strong>
              <div style="display:inline-flex; align-items:center; gap:6px;">
                <button type="button" class="btn btn-primary btn-sm" style="height:24px; padding:0 8px; font-size:11px; background:#4f46e5; border-color:#4f46e5;" onclick="sendAllRetentionProposals()">일괄 발송</button>
                <button type="button" style="border:none; background:none; color:#9ca3af; cursor:pointer; font-size:16px; line-height:1;" onclick="toggleDeployedRetentionPopover(event)">&times;</button>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:7px;">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; padding:7px 10px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                <div style="min-width:0;">
                  <div style="font-size:12px; font-weight:700; color:#111827;">권지민 <span style="color:#f59e0b;">★4.8</span> <span style="font-size:11px; color:#6b7280; font-weight:500;">(고급 · 희망 950만 · D-2)</span></div>
                  <div style="font-size:11px; color:#4f46e5; font-weight:600;">→ 미래에셋 퇴직연금 비대면 채널 매칭 (적합도 95%)</div>
                </div>
                <button type="button" class="btn btn-primary btn-sm" style="height:27px; padding:0 9px; font-size:11px; white-space:nowrap;" onclick="sendRetentionProposalToTalent('권지민', '미래에셋 퇴직연금 채널', 95)">우선 제안</button>
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; padding:7px 10px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                <div style="min-width:0;">
                  <div style="font-size:12px; font-weight:700; color:#111827;">양동근 <span style="color:#f59e0b;">★4.8</span> <span style="font-size:11px; color:#6b7280; font-weight:500;">(중급 · 희망 850만 · D-4)</span></div>
                  <div style="font-size:11px; color:#4f46e5; font-weight:600;">→ 미래에셋 계정계 코어·정산 배치 매칭 (적합도 93%)</div>
                </div>
                <button type="button" class="btn btn-primary btn-sm" style="height:27px; padding:0 9px; font-size:11px; white-space:nowrap;" onclick="sendRetentionProposalToTalent('양동근', '미래에셋 계정계 코어 배치', 93)">우선 제안</button>
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; padding:7px 10px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                <div style="min-width:0;">
                  <div style="font-size:12px; font-weight:700; color:#111827;">오세훈 <span style="color:#f59e0b;">★4.6</span> <span style="font-size:11px; color:#6b7280; font-weight:500;">(고급 · 희망 1,030만 · D-14)</span></div>
                  <div style="font-size:11px; color:#4f46e5; font-weight:600;">→ KB증권 글로벌 채권/펀드 결제 매칭 (적합도 96%)</div>
                </div>
                <button type="button" class="btn btn-primary btn-sm" style="height:27px; padding:0 9px; font-size:11px; white-space:nowrap;" onclick="sendRetentionProposalToTalent('오세훈', 'KB증권 글로벌 채권/펀드', 96)">우선 제안</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openDeployedPersonnelModal() {
  openAnalyticsFromDashboard('DEPLOYED');
}

function openAnalyticsFromDashboard(sectionKey = 'UTILIZATION') {
  state.analyticsSection = sectionKey;
  switchTab('analytics');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setAnalyticsSection(sectionKey) {
  state.analyticsSection = sectionKey;
  renderAnalyticsTab();
}

function renderAnalyticsTab() {
  const el = document.getElementById('tab-analytics');
  if (!el) return;
  const activeSec = state.analyticsSection || 'UTILIZATION';

  el.innerHTML = `
    <div class="filter-bar">
      <button type="button" class="zal-chip-btn ${activeSec === 'UTILIZATION' ? 'active' : ''}" onclick="setAnalyticsSection('UTILIZATION')">
        가동률 분석
      </button>
      <button type="button" class="zal-chip-btn ${activeSec === 'DEPLOYED' ? 'active' : ''}" onclick="setAnalyticsSection('DEPLOYED')">
        인력 현황
      </button>
    </div>

    <div style="margin-top:4px;">
      ${activeSec === 'DEPLOYED' ? buildDeployedPersonnelSectionHtml() : buildInternalUtilizationSectionHtml()}
    </div>
  `;
}

function filterProfilesFromDashboard(empType = 'ALL', grade = 'ALL', domain = 'ALL') {
  state.profileFilters.empType = empType;
  state.profileFilters.jobCategory = 'ALL';
  state.profileFilters.grade = grade;
  state.profileFilters.domain = domain;
  state.profileFilters.availability = 'ALL';
  state.profileFilters.verifiedType = 'ALL';
  state.profileFilters.keyword = '';
  switchTab('profiles');
}

function jumpToPlannedProjectsFromDashboard(groupKey = 'PLANNED') {
  state.selectedProjectFilter = groupKey;
  state.selectedProjectId = null;
  switchTab('projects');
}

function switchDashboardCalTab(tabKey) {
  state.calTab = tabKey;
  state.calSelectedDay = null;
  renderDashboardTab();
}

function changeDashboardCalMonth(delta) {
  let y = Number(state.calYear || 2026);
  let m = Number(state.calMonth || 11) + Number(delta || 0);
  if (m < 1) {
    m = 12;
    y -= 1;
  } else if (m > 12) {
    m = 1;
    y += 1;
  }
  state.calYear = y;
  state.calMonth = m;
  renderDashboardTab();
}

function toggleDashboardCalExpand() {
  state.calExpanded = !state.calExpanded;
  renderDashboardTab();
}

function selectDashboardCalDay(day) {
  if (!day || state.calSelectedDay === day) {
    state.calSelectedDay = null;
  } else {
    state.calSelectedDay = day;
  }
  renderDashboardTab();
}

async function quickConfirmCandidateSelection(interviewId) {
  const inv = (state.data?.interviews || []).find(i => i.id === interviewId);
  if (!inv) return;
  await apiCall('/api/interviews/final-decision', 'POST', {
    interview_id: inv.id,
    final_result: '선정',
    final_decision_note: inv.final_decision_note || '임원 최종 검토를 통해 프로젝트 투입 적임자로 선정 확정함.',
    sync_to_profile_db: true,
    assign_to_slot: true
  });
  closeModal();
  showToast(`✅ ${inv.candidate_name} (${inv.tech_grade}) 후보자 최종 선정이 확정되어 인재 DB 자산화 및 프로젝트 슬롯 배정이 완료되었습니다.`);
  await loadState();
}

function openQuickAssignForProfile(profileId) {
  const allProfiles = state.data?.dashboardProfiles || state.data?.profiles || [];
  const prof = allProfiles.find(p => p.id === profileId);
  const plannedProjects = (state.data?.projects || []).filter(p => (p.project_group || 'PLANNED') === 'PLANNED');

  // Find a matching unfilled slot in planned projects
  for (const prj of plannedProjects) {
    for (const slot of prj.to_slots) {
      if (!slot.assigned_profile_id && prof && (prof.domains || []).includes(slot.required_domain)) {
        openRfpMatchModal(prj.id, slot.slot_id);
        return;
      }
    }
  }
  for (const prj of plannedProjects) {
    for (const slot of prj.to_slots) {
      if (!slot.assigned_profile_id) {
        openRfpMatchModal(prj.id, slot.slot_id);
        return;
      }
    }
  }
  openProfileDetailModal(profileId);
}

function renderDashboardTab() {
  const { kpis, projects, interviews, postings, permissions } = state.data;
  const allProfiles = state.data.dashboardProfiles || state.data.profiles || [];
  const el = document.getElementById('tab-dashboard');
  const canViewSensitive = Boolean(permissions?.can_view_sensitive_info);

  // 1. Project & Slot Aggregations
  const ongoingProjects = projects.filter(p => p.project_group === 'ONGOING');
  const plannedProjects = projects.filter(p => (p.project_group || 'PLANNED') === 'PLANNED');

  const plannedTotalSlots = plannedProjects.reduce((acc, p) => acc + p.to_slots.length, 0);
  const plannedFilledSlots = plannedProjects.reduce((acc, p) => acc + p.to_slots.filter(s => s.assigned_profile_id).length, 0);
  const plannedUnfilledSlots = plannedTotalSlots - plannedFilledSlots;
  const plannedFillRate = plannedTotalSlots ? Math.round((plannedFilledSlots / plannedTotalSlots) * 100) : 100;

  const ongoingUnfilledSlots = ongoingProjects.reduce((acc, p) => acc + p.to_slots.filter(s => !s.assigned_profile_id).length, 0);
  const totalUnfilledSlots = plannedUnfilledSlots + ongoingUnfilledSlots;
  const openPostingsCount = postings.filter(p => p.status === 'OPEN').length;

  // Map profileId -> next assigned PLANNED project
  const nextAssignmentMap = {};
  plannedProjects.forEach(prj => {
    prj.to_slots.forEach(slot => {
      if (slot.assigned_profile_id && !nextAssignmentMap[slot.assigned_profile_id]) {
        nextAssignmentMap[slot.assigned_profile_id] = {
          projectId: prj.id,
          projectName: prj.name,
          client: prj.client,
          roleName: slot.role_name
        };
      }
    });
  });

  // Map profileId -> current ONGOING project
  const currentOngoingMap = {};
  ongoingProjects.forEach(prj => {
    prj.to_slots.forEach(slot => {
      if (slot.assigned_profile_id && !currentOngoingMap[slot.assigned_profile_id]) {
        currentOngoingMap[slot.assigned_profile_id] = {
          projectId: prj.id,
          projectName: prj.name,
          client: prj.client,
          roleName: slot.role_name
        };
      }
    });
  });

  // 2. Internal & External Workforce Aggregations
  const internalList = allProfiles.filter(p => p.is_internal);
  const externalList = allProfiles.filter(p => !p.is_internal);
  const verifiedExternalList = externalList.filter(p => p.verified);

  const totalInternalHeadcount = 40;
  const waitingInternalCount = internalList.length; // 4명
  const activeInternalCount = totalInternalHeadcount - waitingInternalCount; // 36명
  const nextConfirmedInternalCount = internalList.filter(p => nextAssignmentMap[p.id]).length; // 3명
  const unassignedInternalList = internalList.filter(p => !nextAssignmentMap[p.id]); // 1명
  const nextUnconfirmedInternalCount = unassignedInternalList.length;
  const internalUtilizationRate = Math.round((activeInternalCount / totalInternalHeadcount) * 100);

  const deployedExternalList = externalList.filter(p => currentOngoingMap[p.id]);
  const deployedExternalCount = deployedExternalList.length;
  const expiringExternalList = deployedExternalList.filter(p => p.current_end_date && p.current_end_date <= '2026-12-05');

  // 3. Middle-Left: Roll-off Timeline Items (Internal + Verified External sorted by current_end_date)
  const rollOffCandidates = allProfiles
    .filter(p => p.is_internal || p.verified)
    .slice()
    .sort((a, b) => String(a.current_end_date || a.available_date).localeCompare(String(b.current_end_date || b.available_date)));

  const getWeekBucketLabel = (dateStr = '') => {
    if (!dateStr) return '상시 가용';
    const d = dateStr.slice(5); // MM-DD
    if (d <= '11-15') return '11월 2주차 (철수완료)';
    if (d <= '11-22') return '11월 3주차 (철수임박)';
    if (d <= '11-30') return '11월 4주차 (월말철수)';
    return '12월 1주차 이후';
  };

  const unassignedRollOffCount = rollOffCandidates.filter(p => !nextAssignmentMap[p.id]).length;

  // 4. Middle-Right: Domain x Tech Grade Mini Heatmap
  const heatmapRows = [
    { label: '퇴직연금', filterDomain: '퇴직연금', matchDomains: ['퇴직연금'] },
    { label: '채권 · 펀드', filterDomain: '채권', matchDomains: ['채권', '펀드', '자산운용/수탁', '파생상품'] },
    { label: '채널 · 마이데이터', filterDomain: '마이데이터', matchDomains: ['마이데이터', '채널계'] },
    { label: '계정계 코어 · DW', filterDomain: '계정계 코어', matchDomains: ['계정계 코어', '정보계/DW', '신탁/수탁', '수신/신탁'] }
  ];
  const grades = ['특급', '고급', '중급'];

  // 5. Bottom-Left: Executive Interview Briefing & Approval Queue
  const sortedInterviews = interviews.slice().sort((a, b) => {
    const order = { '평가 완료': 1, '면접진행완료': 1, '평가 대기': 2, '인터뷰 진행': 3, '인터뷰 예정': 4, '인터뷰통보완료': 4, '서류 검토': 5, '서류검토중': 5, '최종 결과': 6, '최종선정': 6 };
    return (order[a.status] || 9) - (order[b.status] || 9);
  });
  const pendingApprovalCount = interviews.filter(i => i.status === '평가 완료' || i.status === '면접진행완료').length;
  const scheduledInterviewCount = interviews.filter(i => ['인터뷰 예정', '인터뷰 진행', '인터뷰통보완료'].includes(i.status)).length;

  // 6. Bottom-Right: Risk Watch (Urgent Unfilled TOs + Top External Talent >= 4.5 Ending Soon)
  const urgentUnfilledItems = [];
  plannedProjects.forEach(prj => {
    const openSlots = prj.to_slots.filter(s => !s.assigned_profile_id);
    if (openSlots.length > 0) {
      const deadline = prj.staffing_deadline || '2026-11-30';
      const baseDate = new Date('2026-11-16T00:00:00');
      const targetDate = new Date(`${deadline}T00:00:00`);
      const diffDays = Math.max(1, Math.round((targetDate - baseDate) / (1000 * 60 * 60 * 24)));
      urgentUnfilledItems.push({
        prj,
        openSlots,
        deadline,
        diffDays
      });
    }
  });
  urgentUnfilledItems.sort((a, b) => a.diffDays - b.diffDays);

  const starExternalTalents = externalList
    .filter(p => p.verified && Number(p.rating || 0) >= 4.5 && !nextAssignmentMap[p.id])
    .slice()
    .sort((a, b) => String(a.current_end_date || '').localeCompare(String(b.current_end_date || '')));

  const totalRiskWatchCount = urgentUnfilledItems.length + starExternalTalents.length;

  const greetingName = state.data?.currentUser?.name || '조성현 상무';
  const canCreateProject = ['MASTER', 'MANAGER'].includes(state.data?.currentUser?.role_group);

  el.innerHTML = `
    <div class="exec-dashboard-wrap">
      <div class="exec-greeting-block">
        <div class="exec-greeting-left">
          <img src="/zal-will.png" alt="잘될이" class="exec-greeting-mascot" />
          <div class="exec-greeting-text-wrap">
            <h2 class="exec-greeting-text">${greetingName}님, 안녕하세요.</h2>
            <p class="exec-greeting-sub">오늘도 잘될이와 모든게 잘될거예요!</p>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          ${canCreateProject ? `
            <button type="button" class="btn btn-primary" style="width:170px; height:42px; padding:0 14px; font-size:14.5px; font-weight:700; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="openNewProjectModal()">
              ${svgIcon('file', 15)} 프로젝트 등록하기
            </button>
          ` : ''}
          <button type="button" class="btn btn-primary" style="width:170px; height:42px; padding:0 14px; font-size:14.5px; font-weight:700; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="openNewTalentModal()">
            ${svgIcon('user', 15)} 인재 등록하기
          </button>
        </div>
      </div>

      <!-- TOP 4 KPI CARDS -->
      <section class="exec-kpi-grid">
        <!-- KPI 1: 입찰 예정 -->
        <article class="exec-kpi-card" onclick="jumpToPlannedProjectsFromDashboard('PLANNED')">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">입찰 예정</span>
            <span class="exec-kpi-icon">${svgIcon('file', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">${plannedProjects.length}<span class="exec-kpi-unit">건</span> <span class="exec-kpi-sub-val">(${plannedFilledSlots}/${plannedTotalSlots}석 확정 · ${plannedFillRate}%)</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>잔여 ${plannedUnfilledSlots}석 매칭중</span>
          </div>
        </article>

        <!-- KPI 2: 수행 프로젝트 -->
        <article class="exec-kpi-card" onclick="jumpToPlannedProjectsFromDashboard('ONGOING')">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">수행 프로젝트</span>
            <span class="exec-kpi-icon">${svgIcon('briefcase', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">${ongoingProjects.length}<span class="exec-kpi-unit">건</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>수행중 결원 ${ongoingUnfilledSlots}석</span>
          </div>
        </article>

        <!-- KPI 3: 내부 가동률 -->
        <article class="exec-kpi-card" onclick="openInternalUtilizationModal()">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">내부 가동률</span>
            <span class="exec-kpi-icon">${svgIcon('users', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">${internalUtilizationRate}<span class="exec-kpi-unit">%</span> <span class="exec-kpi-sub-val">(${activeInternalCount}/${totalInternalHeadcount})</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>수행중 ${activeInternalCount}명 · 대기중 ${waitingInternalCount}명 (차기확정 ${nextConfirmedInternalCount}명 · 미확정 ${nextUnconfirmedInternalCount}명)</span>
          </div>
        </article>

        <!-- KPI 4: 수행 인원 -->
        <article class="exec-kpi-card" onclick="openDeployedPersonnelModal()">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">수행 인원</span>
            <span class="exec-kpi-icon">${svgIcon('award', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">${activeInternalCount + 12}<span class="exec-kpi-unit">명</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>정규직 ${activeInternalCount}명 · 프리랜서 8명 · 협력사 4명</span>
          </div>
        </article>
      </section>

      <!-- 2-COLUMN MASONRY GRID -->
      <div class="exec-quad-grid">
        <!-- LEFT MASONRY COLUMN -->
        <div class="exec-masonry-col">
        <!-- MIDDLE LEFT: 투입 · 철수 타임라인 (프로젝트별 간트 타임라인) -->
        <section class="exec-widget-card cal-timeline-widget">
          <div class="exec-widget-header">
            <div class="exec-widget-title-row">
              <h3 class="exec-widget-title">투입 · 철수 타임라인</h3>
            </div>
            <div class="tl-header-controls">
              <div class="tl-seg-control">
                <button type="button" class="tl-seg-btn ${!['DEPLOY', 'ROLLOFF'].includes(state.calTab) ? 'active' : ''}" onclick="switchDashboardCalTab('ALL')">전체</button>
                <button type="button" class="tl-seg-btn ${state.calTab === 'DEPLOY' ? 'active' : ''}" onclick="switchDashboardCalTab('DEPLOY')">투입</button>
                <button type="button" class="tl-seg-btn ${state.calTab === 'ROLLOFF' ? 'active' : ''}" onclick="switchDashboardCalTab('ROLLOFF')">철수</button>
              </div>
            </div>
          </div>

          ${(() => {
            const sparkleSvg = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"/></svg>`;
            const userCountIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;

            const curY = Number(state.calYear || 2026);
            const curM = Number(state.calMonth || 11);
            const ymKey = `${curY}-${String(curM).padStart(2, '0')}`;
            const ymLabel = `${curY}.${String(curM).padStart(2, '0')}`;
            const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
            const fmtDateCol = (dayNum) => {
              const dt = new Date(curY, curM - 1, dayNum);
              const dow = dayNames[dt.getDay()] || '월';
              return `${curM}/${String(dayNum).padStart(2, '0')} (${dow})`;
            };
            const dateCols = ymKey === '2026-11'
              ? ['11/16 (월)', '11/23 (월)', '11/30 (월)']
              : [fmtDateCol(5), fmtDateCol(15), fmtDateCol(25)];

            const monthlyPresetMap = {
              '2026-10': [
                {
                  projectId: 'prj_cmp_3',
                  projectName: '키움증권 퇴직연금 신시스템 안정화',
                  kind: 'ROLLOFF',
                  barColor: 'green',
                  barText: '철수 완료 (10/15)',
                  headcount: 2,
                  leftPct: 10,
                  widthPct: 45
                },
                {
                  projectId: 'prj_ong_3',
                  projectName: '삼성증권 연금 고객중심 서비스 개선',
                  kind: 'DEPLOY',
                  barColor: 'blue',
                  barText: '단계 오픈 (10/26)',
                  headcount: 2,
                  leftPct: 48,
                  widthPct: 44
                }
              ],
              '2026-11': [
                {
                  projectId: 'prj_ong_3',
                  projectName: '삼성증권 연금 고객중심 서비스 개선',
                  kind: 'ROLLOFF',
                  barColor: 'green',
                  barText: '철수 예정 (11/18)',
                  headcount: 2,
                  leftPct: 2,
                  widthPct: 48
                },
                {
                  projectId: 'prj_ong_2',
                  projectName: '신영증권 외화표시펀드 매매 시스템',
                  kind: 'ROLLOFF',
                  barColor: 'green',
                  barText: '철수 예정 (11/20)',
                  headcount: 2,
                  leftPct: 14,
                  widthPct: 46
                },
                {
                  projectId: 'prj_1',
                  projectName: '미래에셋증권 퇴직연금 차세대 구축',
                  kind: 'DEPLOY',
                  barColor: 'blue',
                  barText: '투입 예정 (11/23)',
                  headcount: 4,
                  leftPct: 33,
                  widthPct: 48
                },
                {
                  projectId: 'prj_ong_1',
                  projectName: '하나증권 퇴직연금 일임형로보구축',
                  kind: 'ROLLOFF',
                  barColor: 'green',
                  barText: '철수 예정 (11/30)',
                  headcount: 3,
                  leftPct: 54,
                  widthPct: 44
                },
                {
                  projectId: 'prj_3',
                  projectName: 'NH투자증권 연금자산관리 플랫폼 ISP',
                  kind: 'DEPLOY',
                  barColor: 'blue',
                  barText: '투입 예정 (11/30)',
                  headcount: 2,
                  leftPct: 58,
                  widthPct: 40
                }
              ],
              '2026-12': [
                {
                  projectId: 'prj_1',
                  projectName: '미래에셋증권 퇴직연금 차세대 구축',
                  kind: 'DEPLOY',
                  barColor: 'blue',
                  barText: '본착수 투입 (12/01)',
                  headcount: 4,
                  leftPct: 4,
                  widthPct: 48
                },
                {
                  projectId: 'prj_3',
                  projectName: 'NH투자증권 연금자산관리 플랫폼 ISP',
                  kind: 'DEPLOY',
                  barColor: 'blue',
                  barText: '투입 예정 (12/15)',
                  headcount: 2,
                  leftPct: 32,
                  widthPct: 46
                },
                {
                  projectId: 'prj_2',
                  projectName: 'KB증권 글로벌 채권·외화펀드 중개 플랫폼',
                  kind: 'DEPLOY',
                  barColor: 'blue',
                  barText: '사전투입 (12/28)',
                  headcount: 2,
                  leftPct: 54,
                  widthPct: 42
                }
              ],
              '2027-01': [
                {
                  projectId: 'prj_2',
                  projectName: 'KB증권 글로벌 채권·외화펀드 중개 플랫폼',
                  kind: 'DEPLOY',
                  barColor: 'blue',
                  barText: '본투입 예정 (01/05)',
                  headcount: 2,
                  leftPct: 8,
                  widthPct: 50
                }
              ]
            };

            const baseRows = (monthlyPresetMap[ymKey] || []).slice();
            const existingIds = new Set(baseRows.map(r => `${r.projectId}_${r.kind}`));
            projects.forEach((p, idx) => {
              if ((p.start_date || '').startsWith(ymKey) && !existingIds.has(`${p.id}_DEPLOY`)) {
                const dayStr = p.start_date.slice(8, 10) || '15';
                const dayNum = Math.max(1, Math.min(31, Number(dayStr) || 15));
                baseRows.push({
                  projectId: p.id,
                  projectName: p.name,
                  kind: 'DEPLOY',
                  barColor: 'blue',
                  barText: `투입 예정 (${curM}/${dayStr})`,
                  headcount: (p.to_slots || []).length || 2,
                  leftPct: Math.min(56, Math.max(4, Math.round((dayNum / 31) * 58))),
                  widthPct: 42
                });
              }
              if ((p.end_date || '').startsWith(ymKey) && !existingIds.has(`${p.id}_ROLLOFF`)) {
                const dayStr = p.end_date.slice(8, 10) || '28';
                const dayNum = Math.max(1, Math.min(31, Number(dayStr) || 28));
                baseRows.push({
                  projectId: p.id,
                  projectName: p.name,
                  kind: 'ROLLOFF',
                  barColor: 'green',
                  barText: `철수 예정 (${curM}/${dayStr})`,
                  headcount: (p.to_slots || []).length || 2,
                  leftPct: Math.min(54, Math.max(4, Math.round((dayNum / 31) * 56) + (idx % 3) * 4)),
                  widthPct: 42
                });
              }
            });

            const visibleRows = baseRows.filter(r => {
              if (state.calTab === 'DEPLOY') return r.kind === 'DEPLOY';
              if (state.calTab === 'ROLLOFF') return r.kind === 'ROLLOFF';
              return true;
            });

            return `
              <div class="prj-gantt-table">
                <div class="prj-gantt-head">
                  <div class="prj-gantt-col-name">
                    <div class="prj-gantt-month-nav" style="display:inline-flex; align-items:center; gap:6px; white-space:nowrap;">
                      <button type="button" class="prj-gantt-nav-btn" onclick="changeDashboardCalMonth(-1)" title="이전 달" style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; padding:0; border:none; background:transparent; color:#64748b; border-radius:6px; cursor:pointer;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                      </button>
                      <span class="prj-gantt-month-label" style="font-size:12.5px; font-weight:700; color:#334155; min-width:50px; text-align:center;">${ymLabel}</span>
                      <button type="button" class="prj-gantt-nav-btn" onclick="changeDashboardCalMonth(1)" title="다음 달" style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; padding:0; border:none; background:transparent; color:#64748b; border-radius:6px; cursor:pointer;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </div>
                  </div>
                  <div class="prj-gantt-col-track">
                    ${dateCols.map(dc => `<div class="prj-gantt-date-col">${dc}</div>`).join('')}
                  </div>
                  <div class="prj-gantt-col-meta">인원</div>
                </div>

                <div class="prj-gantt-body">
                  ${visibleRows.length > 0 ? visibleRows.map(row => `
                    <div class="prj-gantt-row" onclick="selectProjectDetail('${row.projectId}')">
                      <div class="prj-gantt-col-name">
                        <span class="prj-gantt-title" title="${row.projectName}">${row.projectName}</span>
                      </div>
                      <div class="prj-gantt-col-track">
                        <div class="prj-gantt-grid-lines">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <div class="prj-gantt-bar ${row.barColor}" style="left: ${row.leftPct}%; width: ${row.widthPct}%;">
                          <span class="prj-gantt-bar-icon">${sparkleSvg}</span>
                          <span class="prj-gantt-bar-label">${row.barText}</span>
                        </div>
                      </div>
                      <div class="prj-gantt-col-meta">
                        <span class="prj-gantt-count-badge ${row.barColor}">
                          ${userCountIcon}
                          <span>인원 ${row.headcount}명</span>
                        </span>
                      </div>
                    </div>
                  `).join('') : `
                    <div style="padding:28px 12px; text-align:center; color:#94a3b8; font-size:13px;">
                      ${ymLabel}월에 예정된 프로젝트 투입·철수 일정이 없습니다.
                    </div>
                  `}
                </div>
              </div>
            `;
          })()}
        </section>

        <!-- BOTTOM LEFT: 인터뷰 (2열 서브카드 배치) -->
        <section class="exec-widget-card">
          <div class="exec-widget-header">
            <div class="exec-widget-title-row">
              <h3 class="exec-widget-title">인터뷰</h3>
              <span class="zal-status-pill ${pendingApprovalCount > 0 ? 'amber' : 'green'}">
                최종컨펌 대기 ${pendingApprovalCount}건 · 예정 ${scheduledInterviewCount}건
              </span>
            </div>
            <button type="button" class="exec-header-link-btn" onclick="switchTab('interviews')">면접·검증 전체 ›</button>
          </div>

          <div class="exec-interview-list">
            ${(() => {
              const formatShortIntDate = (dtStr = '') => {
                if (!dtStr) return '11.16 (월) 14:00';
                const [datePart, timePart = '14:00'] = dtStr.trim().split(/\s+/);
                const d = new Date(`${datePart}T00:00:00`);
                const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
                const dow = !isNaN(d.getTime()) ? dayNames[d.getDay()] : '월';
                return `${datePart.slice(5).replace('-', '.')} (${dow}) ${timePart}`;
              };

              return sortedInterviews.map(inv => {
                const targetPrj = projects.find(p => p.id === inv.project_id);
                const candProf = allProfiles.find(p => p.id === inv.candidate_profile_id || p.name === inv.candidate_name);
                const isReadyToApprove = inv.status === '평가 완료' || inv.status === '면접진행완료';
                const isApproved = inv.status === '최종 결과' || inv.status === '최종선정';
                const isPendingEval = inv.status === '평가 대기';
                const scoreNum = Number(inv.total_score || candProf?.rating || 0);
                const summaryText = inv.interviewer_opinion || inv.resume_summary || '금융 코어·채널 실무 경력 보유';
                const dateTimeText = inv.interview_date ? formatShortIntDate(inv.interview_date) : '일정 조율중';

                return `
                  <div class="exec-interview-item" onclick="openCandidateResumeModal('${inv.id}')">
                    <div class="exec-int-top-row">
                      <div class="exec-int-name-group">
                        <strong class="exec-int-cand-name">${inv.candidate_name}</strong>
                        <span class="exec-int-cand-meta">${inv.candidate_type} · ${inv.tech_grade}</span>
                      </div>
                      <span class="exec-int-status-pill ${isApproved ? 'green' : isReadyToApprove ? 'blue' : 'amber'}">
                        ${isApproved ? `최종 · ${inv.final_result || '선정'}` : isReadyToApprove ? '결정대기' : isPendingEval ? '평가대기' : inv.status}
                      </span>
                    </div>

                    <div class="exec-int-domain-row">
                      ${targetPrj ? targetPrj.client : '미래에셋증권'} · ${(inv.domains || []).join('/')}
                    </div>

                    <div class="exec-int-star-row">
                      ${scoreNum > 0 ? `<span class="star-mark">★</span><span>${scoreNum.toFixed(1)}</span>` : `<span style="font-size:12px; color:#64748b; font-weight:500;">평가 전</span>`}
                    </div>

                    <div class="exec-int-desc-row">
                      ${summaryText}
                    </div>

                    <div class="exec-int-bottom-row" onclick="event.stopPropagation();">
                      <span class="exec-int-date-label">
                        ${svgIcon('calendar', 14)} ${dateTimeText}
                      </span>
                      ${isReadyToApprove || isApproved ? `
                        <button type="button" class="exec-action-btn green" onclick="openInterviewResultViewModal('${inv.id}')">
                          결과브리핑
                        </button>
                      ` : `
                        <button type="button" class="exec-action-btn yellow" onclick="openEvaluateChecklistModal('${inv.id}')">
                          면접평가 입력
                        </button>
                      `}
                    </div>
                  </div>
                `;
              }).join('');
            })()}
          </div>
        </section>
        </div>

        <!-- RIGHT MASONRY COLUMN -->
        <div class="exec-masonry-col">
        <!-- MIDDLE RIGHT: 1. 미충원 TO -->
        <section class="exec-widget-card">
          <div class="exec-widget-header">
            <div class="exec-widget-title-row">
              <h3 class="exec-widget-title">미충원 TO</h3>
              <span class="zal-status-pill red">미충원 ${plannedUnfilledSlots}석</span>
            </div>
            <button type="button" class="exec-header-link-btn" onclick="jumpToPlannedProjectsFromDashboard('PLANNED')">전체보기 ›</button>
          </div>

          <div class="exec-risk-group">
            ${urgentUnfilledItems.length > 0 ? urgentUnfilledItems.map(item => {
              const isOrange = item.diffDays >= 20;
              const allSlots = item.prj.to_slots || [];
              const sortedSlots = allSlots.slice().sort((a, b) => (b.assigned_profile_id ? 1 : 0) - (a.assigned_profile_id ? 1 : 0));
              const renderChairBtn = (slot) => {
                const filled = Boolean(slot.assigned_profile_id);
                const titleText = filled
                  ? `[충원완료] ${slot.role_name} — ${slot.assigned_name || ''}`
                  : `[미충원 · 클릭 시 즉시배정] ${slot.role_name} (${slot.required_grade})`;
                const clickAction = filled
                  ? `openProfileDetailModal('${slot.assigned_profile_id}')`
                  : `openRfpMatchModal('${item.prj.id}', '${slot.slot_id}')`;
                const chairOutlinePath = `M9.65,42q-0.6,0-1.05-0.45T8.15,40.5V38.4H7.5q-2.29,0-3.9-1.6T2,32.9V20.7q0-2.55 1.55-3.88T7.2,15.5V11.2q0-2.3 1.45-3.75T12.4,6H35.65q2.3,0 3.73,1.45T40.8,11.2v4.3q2.1,0 3.65,1.32T46,20.7V32.9q0,2.29-1.6,3.9t-3.9,1.6H39.85v2.1q0,0.6-0.45,1.05T38.35,42T37.3,41.55T36.85,40.5V38.4H11.15v2.1q0,0.6-0.45,1.05T9.65,42ZM7.5,35.4h33q1,0 1.75-0.75T43,32.9V20.7q0-1-0.6-1.6t-1.6-0.6t-1.6,0.6t-0.6,1.6v8.8H9.4V20.7q0-1-0.6-1.6T7.2,18.5T5.6,19.1T5,20.7V32.9q0,1 0.75,1.75T7.5,35.4Zm4.9-8.9H35.6V20.7q0-1.55 0.7-2.57t1.5-1.63V11.2q0-1-0.6-1.6T35.61,9H12.39Q11.4,9 10.8,9.6t-0.6,1.6v5.3q0.8,0.6 1.5,1.63t0.7,2.57v5.8Z`;
                const chairInnerFillPath = `M7.5,35.4h33q1,0 1.75-0.75T43,32.9V20.7q0-1-0.6-1.6t-1.6-0.6t-1.6,0.6t-0.6,1.6v8.8H9.4V20.7q0-1-0.6-1.6T7.2,18.5T5.6,19.1T5,20.7V32.9q0,1 0.75,1.75T7.5,35.4ZM12.4,26.5H35.6V20.7q0-1.55 0.7-2.57t1.5-1.63V11.2q0-1-0.6-1.6T35.61,9H12.39Q11.4,9 10.8,9.6t-0.6,1.6v5.3q0.8,0.6 1.5,1.63t0.7,2.57v5.8Z`;
                const chairSvgMarkup = filled
                  ? `<svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                      <path d="${chairInnerFillPath}" fill="currentColor" fill-opacity="0.45"/>
                      <path d="${chairOutlinePath}" fill="currentColor"/>
                    </svg>`
                  : `<svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                      <path d="${chairOutlinePath}" fill="currentColor"/>
                    </svg>`;
                return `
                  <button type="button" class="exec-chair-btn ${filled ? 'filled' : 'empty'}" title="${escAttr(titleText)}" onclick="${clickAction}">
                    ${chairSvgMarkup}
                  </button>
                `;
              };
              return `
                <div class="exec-risk-item danger" onclick="selectProjectDetail('${item.prj.id}')">
                  <div class="exec-risk-left">
                    <div class="exec-risk-top-line">
                      <span class="exec-to-dday-badge ${isOrange ? 'orange' : ''}">D-${item.diffDays}</span>
                      <span class="exec-risk-main-title">${item.prj.client} — 미충원 ${item.openSlots.length}석</span>
                    </div>
                    <div class="exec-risk-sub-desc">
                      ${item.openSlots.map(s => `${s.role_name}(${s.required_grade})`).join(', ')}
                    </div>
                  </div>
                  <div class="exec-risk-actions" onclick="event.stopPropagation();">
                    <div class="exec-chair-list" aria-label="투입 좌석 현황">
                      ${sortedSlots.map(s => renderChairBtn(s)).join('')}
                    </div>
                  </div>
                </div>
              `;
            }).join('') : `
              <div style="padding:12px; font-size:13px; color:#059669; background:#ecfdf5; border-radius:10px;">
                모든 입찰 예정 프로젝트의 핵심 TO 편성이 완료되었습니다.
              </div>
            `}
          </div>
        </section>

        <!-- BOTTOM RIGHT: 2. 우수 인력 철수 알림 -->
        <section class="exec-widget-card">
          <div class="exec-widget-header">
            <div class="exec-widget-title-row">
              <h3 class="exec-widget-title">우수 인력 철수 알림</h3>
              <span class="zal-status-pill amber">★ 4.5 이상 인재 ${starExternalTalents.length}명</span>
            </div>
            <button type="button" class="exec-header-link-btn" onclick="switchTab('sourcing')">인재 추천 보기 ›</button>
          </div>

          <div class="exec-risk-group">
            ${starExternalTalents.map(p => {
              const rateLabel = canViewSensitive && p.desired_rate ? `희망 ${p.desired_rate}만` : '기검증 우수';
              const tagList = [...(p.domains || []), ...(p.skills || [])].slice(0, 3);
              const baseD = new Date('2026-11-16T00:00:00');
              const endD = new Date(`${p.current_end_date || '2026-11-20'}T00:00:00`);
              const diffDays = Math.max(1, Math.round((endD - baseD) / (1000 * 60 * 60 * 24)));
              return `
                <div class="exec-talent-pool-item" onclick="openProfileDetailModal('${p.id}')">
                  <img src="${getAvatarForId(p.id)}" alt="${p.name}" class="exec-talent-avatar" />
                  <div class="exec-risk-left">
                    <div class="exec-talent-top-line">
                      <strong>${p.name}</strong>
                      <span>${p.employment_type} · ${p.tech_grade} (${rateLabel})</span>
                      <span class="exec-talent-dday-badge">D-${diffDays}</span>
                    </div>
                    <div class="exec-talent-tags-line">
                      ${tagList.map(t => `#${t}`).join('  ')}
                    </div>
                  </div>
                  <div class="exec-risk-actions" onclick="event.stopPropagation();">
                    <button type="button" class="exec-action-btn yellow" onclick="openQuickAssignForProfile('${p.id}')">
                      매칭 제안
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
        </div>
      </div>
    </div>
  `;
}

/* =========================================================================
   TAB 2: INTEGRATED TALENT DB & AI NON-STOP RESUME PARSING
   ========================================================================= */
function matchesProfileJobCategory(p, cat) {
  if (!cat || cat === 'ALL') return true;
  if (p.job_category && p.job_category === cat) return true;
  const hay = `${p.main_skill || ''} ${(p.skills || []).join(' ')} ${(p.domains || []).join(' ')} ${p.review_summary || ''} ${(p.career_history || []).map(c => `${c.role || ''} ${c.tech || ''} ${c.project || ''}`).join(' ')}`;
  if (cat === '디자인') return /디자인|디자이너|UI\/UX|GUI|Figma|XD|Sketch|BX|BI/i.test(hay);
  if (cat === '퍼블리싱') return /퍼블리싱|퍼블리셔|HTML|CSS|마크업|WebSquare/i.test(hay);
  if (cat === '기획') return /기획|화면설계|스토리보드|PMO|요구사항|ISP|PI|UI\/UX/i.test(hay);
  if (cat === '컨설팅') return /컨설팅|컨설턴트|ISP|PI|BPR|아키텍트|AA|DA|TA|데이터모델/i.test(hay);
  if (cat === '개발') {
    if (/디자인|디자이너|퍼블리셔/i.test(p.main_skill || '') && !/Java|Spring|Oracle|React|Python|C#/i.test(hay)) return false;
    return /개발|Java|Spring|Oracle|React|TypeScript|Next\.js|Python|C#|배치|코어|백엔드|프론트엔드|PL|SQL/i.test(hay) || !p.main_skill;
  }
  return true;
}

function getFilteredProfilesList() {
  const { profiles } = state.data;
  const f = state.profileFilters;
  return profiles.filter(p => {
    if (f.empType === 'INTERNAL' && !p.is_internal) return false;
    if (f.empType === 'EXTERNAL' && p.is_internal) return false;
    if (!['ALL', 'INTERNAL', 'EXTERNAL'].includes(f.empType) && !String(p.employment_type || '').includes(f.empType)) return false;
    if (!matchesProfileJobCategory(p, f.jobCategory)) return false;
    if (f.grade !== 'ALL' && p.tech_grade !== f.grade) return false;
    if (f.domain !== 'ALL' && !p.domains.includes(f.domain)) return false;
    if (f.availability !== 'ALL' && p.availability_status !== f.availability) return false;
    if (f.verifiedType === 'VERIFIED' && !p.verified) return false;
    if (f.verifiedType === 'NEW' && p.verified) return false;
    if (f.onlyFavorites && !p.favorite) return false;
    if (f.skill && f.skill !== 'ALL') {
      const skillsLower = (p.skills || []).map(s => String(s).toLowerCase());
      if (!skillsLower.includes(String(f.skill).toLowerCase())) return false;
    }
    if (f.minExp && f.minExp !== 'ALL') {
      if (Number(p.experience_years || 0) < Number(f.minExp)) return false;
    }
    if (f.minScore && f.minScore !== 'ALL') {
      const scoreVal = Number(p.rating || 0);
      if (f.minScore === 'UNRATED') {
        if (scoreVal > 0) return false;
      } else {
        if (scoreVal < Number(f.minScore)) return false;
      }
    }
    if (f.availBefore && f.availBefore !== 'ALL') {
      const avail = String(p.available_date || '2026-11-20');
      if (avail > f.availBefore) return false;
    }
    if (f.maxRate && f.maxRate !== 'ALL') {
      const rateNum = Number(p.is_internal ? (p.contract_rate || p.desired_rate || 0) : (p.desired_rate || p.contract_rate || 0));
      if (rateNum > 0 && rateNum > Number(f.maxRate)) return false;
    }
    if (f.keyword) {
      const kw = f.keyword.toLowerCase();
      const hay = `${p.name} ${p.employment_type} ${p.skills.join(' ')} ${p.domains.join(' ')} ${p.certifications.join(' ')}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    return true;
  }).sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
}

function getActiveProfileDetailFilterCount() {
  const f = state.profileFilters || {};
  let cnt = 0;
  if (f.domain && f.domain !== 'ALL') cnt++;
  if (f.skill && f.skill !== 'ALL') cnt++;
  if (f.minExp && f.minExp !== 'ALL') cnt++;
  if (f.minScore && f.minScore !== 'ALL') cnt++;
  if (f.availBefore && f.availBefore !== 'ALL') cnt++;
  if (f.maxRate && f.maxRate !== 'ALL') cnt++;
  if (f.availability && f.availability !== 'ALL') cnt++;
  if (f.verifiedType && f.verifiedType !== 'ALL') cnt++;
  if (f.onlyFavorites) cnt++;
  return cnt;
}

function resetProfileDetailFilters() {
  state.profileFilters.domain = 'ALL';
  state.profileFilters.skill = 'ALL';
  state.profileFilters.minExp = 'ALL';
  state.profileFilters.minScore = 'ALL';
  state.profileFilters.availBefore = 'ALL';
  state.profileFilters.maxRate = 'ALL';
  state.profileFilters.availability = 'ALL';
  state.profileFilters.verifiedType = 'ALL';
  state.profileFilters.onlyFavorites = false;
  renderProfilesTab();
}

async function toggleProfileFavorite(profileId, event) {
  if (event) event.stopPropagation();
  const p = (state.data?.profiles || []).find(x => x.id === profileId);
  if (!p) return;
  p.favorite = !p.favorite;
  renderActiveTab();
  try {
    await apiCall('/api/profiles/favorite', 'POST', {
      profile_id: profileId,
      favorite: p.favorite
    });
  } catch {}
  showToast(p.favorite ? `★ ${p.name} 인재를 관심 인재로 등록했습니다.` : `${p.name} 인재의 관심 등록을 해제했습니다.`);
}

function toggleProfileCompareSelection(profileId, event) {
  if (event) event.stopPropagation();
  if (!state.profileFilters.compareIds) state.profileFilters.compareIds = [];
  const list = state.profileFilters.compareIds;
  const idx = list.indexOf(profileId);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    if (list.length >= 4) {
      showToast('인재 비교는 최대 4명까지 선택할 수 있습니다.');
      return;
    }
    list.push(profileId);
  }
  renderActiveTab();
}

function removeProfileFromComparison(profileId) {
  if (!state.profileFilters.compareIds) state.profileFilters.compareIds = [];
  state.profileFilters.compareIds = state.profileFilters.compareIds.filter(id => id !== profileId);
  renderActiveTab();
  openProfileComparisonModal();
}

function compareFavoriteProfiles() {
  const { profiles = [] } = state.data || {};
  const favIds = profiles.filter(p => p.favorite).map(p => p.id).slice(0, 4);
  if (favIds.length === 0) {
    showToast('★ 관심 인재로 등록된 인원이 없습니다. 카드 우측 상단의 별 아이콘을 눌러 등록해 보세요.');
    return;
  }
  state.profileFilters.compareIds = favIds;
  renderActiveTab();
  openProfileComparisonModal();
}

function openProfileComparisonModal() {
  const { permissions, currentUser, profiles = [] } = state.data || {};
  const hideSensitive = currentUser?.role_group === 'INTERNAL' || !permissions?.can_view_sensitive_info;
  const compareIds = state.profileFilters?.compareIds || [];
  const targets = profiles.filter(p => compareIds.includes(p.id));
  const favIds = profiles.filter(p => p.favorite).map(p => p.id).slice(0, 4);

  openModal(`인재 핵심 역량 및 조건 비교 분석 (${targets.length}명)`, `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
        <div>
          <div style="font-size:12px; color:#64748b;">인재 DB 비교 기준</div>
          <div style="font-size:13.5px; font-weight:700; color:#0f172a; margin-top:2px;">
            인재별 기술 역량 · 경력 연수 · 투입 가용일${!hideSensitive ? ' · 기준/희망 단가' : ''} · 수행 평가 점수 비교
          </div>
        </div>
        ${favIds.length > 0 ? `
          <button type="button" class="btn btn-outline btn-sm" onclick="compareFavoriteProfiles()">
            ★ 관심 인재 일괄 불러오기 (${favIds.length}명)
          </button>
        ` : ''}
      </div>

      ${targets.length > 0 ? `
        <div style="overflow-x:auto;">
          <table class="src-compare-table">
            <thead>
              <tr>
                <th style="width:140px;">비교 항목</th>
                ${targets.map(p => `
                  <th>
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                      <div style="display:flex; align-items:center; gap:9px;">
                        <img src="${getAvatarForId(p.id)}" alt="${p.name}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:1.5px solid #e2e8f0;" />
                        <div>
                          <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                            <strong style="font-size:14.5px; color:#0f172a;">${p.name}</strong>
                            <span class="src-applicant-grade-chip grade-${p.tech_grade}">${p.tech_grade}</span>
                          </div>
                          <span style="font-size:11.5px; color:#64748b; font-weight:500;">${p.employment_type} · ${p.job_title || '선임'}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="cmp-card-remove-btn"
                        onclick="removeProfileFromComparison('${p.id}')"
                        title="비교 목록에서 제외"
                        aria-label="제외"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="src-cmp-label">가용 상태</td>
                ${targets.map(p => {
                  const pillCls = p.availability_status === '즉시투입가능'
                    ? 'evaluated'
                    : p.availability_status === '투입중(철수예정)'
                      ? 'new'
                      : 'interview';
                  return `
                    <td>
                      <span class="src-applicant-stage-pill ${pillCls}">${p.availability_status || '즉시투입가능'}</span>
                    </td>
                  `;
                }).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">기술등급 · 경력</td>
                ${targets.map(p => `
                  <td>
                    <span class="src-applicant-grade-chip grade-${p.tech_grade}">${p.tech_grade} 기술자</span>
                    <strong style="margin-left:6px; color:#0f172a;">${p.experience_years || 0}년차</strong>
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">전문 도메인</td>
                ${targets.map(p => `<td style="font-weight:700; color:#0f172a;">${(p.domains || []).join(' · ') || '-'}</td>`).join('')}
              </tr>
              ${!hideSensitive ? `
                <tr>
                  <td class="src-cmp-label">기준 · 희망 단가</td>
                  ${targets.map(p => {
                    const rate = p.is_internal ? p.contract_rate : p.desired_rate;
                    return `<td><strong style="font-size:14px; color:#0f172a;">${rate ? `월 ${Number(rate).toLocaleString()}만원` : '협의'}</strong></td>`;
                  }).join('')}
                </tr>
              ` : ''}
              <tr>
                <td class="src-cmp-label">투입 가용일</td>
                ${targets.map(p => `
                  <td>
                    <strong style="color:#0f172a;">${p.available_date || p.availability_status || '즉시 가능'}</strong>
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">핵심 기술 스택</td>
                ${targets.map(p => `
                  <td>
                    <div style="display:flex; flex-wrap:wrap; gap:4px;">
                      ${(p.skills || []).map(sk => `<span class="src-hover-skill-tag hit">${sk}</span>`).join('')}
                    </div>
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">수행 · 검증 평점</td>
                ${targets.map(p => {
                  const hasScore = Number(p.rating || 0) > 0;
                  return hasScore
                    ? `<td><strong style="font-size:15px; color:#0f172a;"><span style="color:#f59e0b;">★</span> ${Number(p.rating).toFixed(1)}</strong> <span style="font-size:12px; color:#64748b;">/ 5.0</span></td>`
                    : `<td style="color:#94a3b8;">미평가</td>`;
                }).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">최근 수행 프로젝트</td>
                ${targets.map(p => {
                  const ch = (p.career_history && p.career_history[0]) || null;
                  return `<td style="font-size:12.5px; color:#334155; line-height:1.5;">${ch ? `<strong>${ch.project}</strong><br/><span style="color:#64748b;">${[ch.client, ch.period, ch.role].filter(Boolean).join(' · ')}</span>` : (p.review_summary || '-')}</td>`;
                }).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">빠른 액션</td>
                ${targets.map(p => `
                  <td>
                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                      <button type="button" class="btn btn-outline btn-sm" onclick="closeModal(); openProfileDetailModal('${p.id}')">상세 프로필</button>
                      <button type="button" class="btn btn-primary btn-sm" onclick="closeModal(); ${isInternalOrContractProfile(p) ? `openProfileProjectAssignmentModal('${p.id}')` : `openProfileTargetSourcingModal('${p.id}')`}">
                        ${isInternalOrContractProfile(p) ? '프로젝트 배정' : '타겟 소싱'}
                      </button>
                    </div>
                  </td>
                `).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      ` : `<div style="padding:24px; text-align:center; color:#64748b;">비교할 인재가 없습니다.</div>`}
    </div>
  `);
  document.getElementById('modalDialog')?.classList.add('wide-compare-modal-dialog');
}

function toggleProfileDetailFilterPopover(event) {
  if (event) event.stopPropagation();
  state.profileFilters.detailPopoverOpen = !state.profileFilters.detailPopoverOpen;
  renderProfilesTab();
}

function closeProfileDetailFilterPopover() {
  if (state.profileFilters.detailPopoverOpen) {
    state.profileFilters.detailPopoverOpen = false;
    renderProfilesTab();
  }
}

function renderChipSearchBox(inputId, value, placeholder, scopeKey) {
  const safeVal = String(value || '').replace(/"/g, '&quot;');
  const hasVal = safeVal.length > 0;
  return `
    <div class="zal-search-wrap">
      <input
        type="text"
        id="${inputId}"
        class="zal-chip-input"
        placeholder="${placeholder}"
        value="${safeVal}"
        oninput="handleChipSearchInput(this, '${scopeKey}')"
      />
      <button
        type="button"
        class="zal-search-clear-btn"
        style="display:${hasVal ? 'inline-flex' : 'none'};"
        onclick="clearChipSearchInput(this, '${inputId}', '${scopeKey}')"
        title="검색어 지우기"
      >&times;</button>
    </div>
  `;
}

function handleChipSearchInput(inputEl, scopeKey) {
  const val = inputEl.value;
  const clearBtn = inputEl.parentElement?.querySelector('.zal-search-clear-btn');
  if (clearBtn) {
    clearBtn.style.display = val.length > 0 ? 'inline-flex' : 'none';
  }
  if (scopeKey === 'projects') updateProjectKeyword(val);
  else if (scopeKey === 'profiles') updateProfileFilter('keyword', val);
  else if (scopeKey === 'sourcing') updateSourcingFilter('keyword', val);
  else if (scopeKey === 'interviews') updateInterviewFilter('keyword', val);
}

function clearChipSearchInput(btnEl, inputId, scopeKey) {
  const inputEl = document.getElementById(inputId);
  if (inputEl) {
    inputEl.value = '';
    inputEl.focus();
  }
  if (btnEl) {
    btnEl.style.display = 'none';
  }
  if (scopeKey === 'projects') updateProjectKeyword('');
  else if (scopeKey === 'profiles') updateProfileFilter('keyword', '');
  else if (scopeKey === 'sourcing') updateSourcingFilter('keyword', '');
  else if (scopeKey === 'interviews') updateInterviewFilter('keyword', '');
}

function renderProfileCardsHtml() {
  const { permissions, currentUser } = state.data;
  const filtered = getFilteredProfilesList();
  if (filtered.length === 0) {
    return `
      <div class="card" style="grid-column: 1 / -1; text-align:center; padding:40px;">
        조건에 부합하거나 열람 권한이 있는 인재 프로필이 없습니다.
      </div>
    `;
  }
  const cols = [[], [], []];
  filtered.forEach((p, idx) => {
    cols[idx % 3].push(renderProfileCard(p, permissions, currentUser));
  });
  return cols.map(colCards => `
    <div class="talent-masonry-col">
      ${colCards.join('')}
    </div>
  `).join('');
}

function renderProfilesTab() {
  const { profiles, permissions, currentUser } = state.data;
  const el = document.getElementById('tab-profiles');
  const f = state.profileFilters;

  const selectedProf = state.selectedProfileId
    ? profiles.find(p => p.id === state.selectedProfileId)
    : null;
  if (selectedProf) {
    renderProfileDetailPageView(el, selectedProf, permissions, currentUser);
    return;
  }

  const internalCount = profiles.filter(p => p.is_internal).length;
  const externalCount = profiles.filter(p => !p.is_internal).length;
  const filteredProfiles = getFilteredProfilesList();
  const canViewSensitive = Boolean(permissions?.can_view_sensitive_info);
  const isInternalRole = currentUser?.role_group === 'INTERNAL';
  const hideSensitive = isInternalRole || !canViewSensitive;

  const allSkillSet = new Set(['Java', 'Spring Batch', 'Spring Boot', 'Oracle', 'React', 'TypeScript', 'WebSquare', 'ProFrame', 'SQL튜닝', 'UI/UX', 'Figma']);
  profiles.forEach(p => (p.skills || []).forEach(s => allSkillSet.add(s)));
  const skillOptions = Array.from(allSkillSet);
  const activeFilterCount = getActiveProfileDetailFilterCount();

  const activeFilterChips = [];
  if (f.domain && f.domain !== 'ALL') activeFilterChips.push({ key: 'domain', val: 'ALL', label: `도메인: ${f.domain}` });
  if (f.skill && f.skill !== 'ALL') activeFilterChips.push({ key: 'skill', val: 'ALL', label: `기술: ${f.skill}` });
  if (f.minExp && f.minExp !== 'ALL') activeFilterChips.push({ key: 'minExp', val: 'ALL', label: `경력: ${f.minExp}년 이상` });
  if (f.minScore && f.minScore !== 'ALL') {
    activeFilterChips.push({ key: 'minScore', val: 'ALL', label: f.minScore === 'UNRATED' ? '평점: 미평가' : `평점: ★ ${f.minScore}점 이상` });
  }
  if (f.availability && f.availability !== 'ALL') activeFilterChips.push({ key: 'availability', val: 'ALL', label: `가용상태: ${f.availability}` });
  if (f.availBefore && f.availBefore !== 'ALL') activeFilterChips.push({ key: 'availBefore', val: 'ALL', label: `투입가능일: ~${f.availBefore}` });
  if (!hideSensitive && f.maxRate && f.maxRate !== 'ALL') activeFilterChips.push({ key: 'maxRate', val: 'ALL', label: `기준단가: 월 ${Number(f.maxRate).toLocaleString()}만원 이하` });
  if (f.verifiedType && f.verifiedType !== 'ALL') activeFilterChips.push({ key: 'verifiedType', val: 'ALL', label: f.verifiedType === 'VERIFIED' ? '기검증 우수인력만' : '신규인력만' });
  if (f.onlyFavorites) activeFilterChips.push({ key: 'onlyFavorites', val: false, label: '★ 즐겨찾기 인재' });
  const compareIds = f.compareIds || [];

  el.innerHTML = `
    <div class="filter-bar">
      <button type="button" class="zal-chip-btn ${f.empType === 'ALL' ? 'active' : ''}" onclick="updateProfileFilter('empType', 'ALL')">
        전체 (${profiles.length})
      </button>
      <button type="button" class="zal-chip-btn ${f.empType === 'INTERNAL' ? 'active' : ''}" onclick="updateProfileFilter('empType', 'INTERNAL')">
        사내 인력 (${internalCount})
      </button>
      <button type="button" class="zal-chip-btn ${f.empType === 'EXTERNAL' ? 'active' : ''}" onclick="updateProfileFilter('empType', 'EXTERNAL')">
        외주 인력 (${externalCount})
      </button>
      <select class="zal-chip-select ${(f.jobCategory || 'ALL') !== 'ALL' ? 'active' : ''}" onchange="updateProfileFilter('jobCategory', this.value)">
        <option value="ALL" ${(f.jobCategory || 'ALL') === 'ALL' ? 'selected' : ''}>전체 업무</option>
        <option value="개발" ${f.jobCategory === '개발' ? 'selected' : ''}>개발</option>
        <option value="컨설팅" ${f.jobCategory === '컨설팅' ? 'selected' : ''}>컨설팅</option>
        <option value="기획" ${f.jobCategory === '기획' ? 'selected' : ''}>기획</option>
        <option value="디자인" ${f.jobCategory === '디자인' ? 'selected' : ''}>디자인</option>
        <option value="퍼블리싱" ${f.jobCategory === '퍼블리싱' ? 'selected' : ''}>퍼블리싱</option>
      </select>
      <select class="zal-chip-select ${f.grade !== 'ALL' ? 'active' : ''}" onchange="updateProfileFilter('grade', this.value)">
        <option value="ALL" ${f.grade === 'ALL' ? 'selected' : ''}>전체 등급</option>
        <option value="특급" ${f.grade === '특급' ? 'selected' : ''}>특급</option>
        <option value="고급" ${f.grade === '고급' ? 'selected' : ''}>고급</option>
        <option value="중급" ${f.grade === '중급' ? 'selected' : ''}>중급</option>
      </select>
      ${renderChipSearchBox('profileSearchInput', f.keyword, '이름, 스킬(Java, ProFrame, React), 자격증 검색...', 'profiles')}

      <div class="inv-detail-filter-anchor">
        <button
          type="button"
          style="width:32px; height:32px; padding:0; display:inline-flex; align-items:center; justify-content:center; background:transparent; border:none; color:${f.detailPopoverOpen || activeFilterCount > 0 ? '#0f172a' : '#64748b'}; cursor:pointer;"
          onclick="toggleProfileDetailFilterPopover(event)"
          title="상세 필터${activeFilterCount > 0 ? ` (${activeFilterCount}개 적용중)` : ''}"
          aria-label="상세 필터"
        >
          ${svgIcon('settings', 17)}
        </button>

        ${f.detailPopoverOpen ? `
          <div class="inv-detail-filter-popover" onclick="event.stopPropagation();">
            <div class="inv-popover-header">
              <strong>인재 DB 상세 조건 필터</strong>
              <button type="button" class="inv-popover-reset-btn" onclick="resetProfileDetailFilters()">초기화</button>
            </div>
            <div class="inv-popover-grid">
              <div class="inv-popover-field">
                <label>전문 도메인</label>
                <select class="select" onchange="updateProfileFilter('domain', this.value)">
                  <option value="ALL" ${(f.domain || 'ALL') === 'ALL' ? 'selected' : ''}>전체 도메인</option>
                  <option value="퇴직연금" ${f.domain === '퇴직연금' ? 'selected' : ''}>퇴직연금</option>
                  <option value="펀드" ${f.domain === '펀드' ? 'selected' : ''}>펀드</option>
                  <option value="채권" ${f.domain === '채권' ? 'selected' : ''}>채권</option>
                  <option value="계정계 코어" ${f.domain === '계정계 코어' ? 'selected' : ''}>계정계 코어</option>
                  <option value="마이데이터" ${f.domain === '마이데이터' ? 'selected' : ''}>마이데이터</option>
                  <option value="채널계" ${f.domain === '채널계' ? 'selected' : ''}>채널계</option>
                  <option value="정보계/DW" ${f.domain === '정보계/DW' ? 'selected' : ''}>정보계/DW</option>
                </select>
              </div>
              <div class="inv-popover-field">
                <label>기술 스택</label>
                <select class="select" onchange="updateProfileFilter('skill', this.value)">
                  <option value="ALL" ${(f.skill || 'ALL') === 'ALL' ? 'selected' : ''}>전체 기술 스택</option>
                  ${skillOptions.map(sk => `<option value="${sk}" ${f.skill === sk ? 'selected' : ''}>${sk}</option>`).join('')}
                </select>
              </div>
              <div class="inv-popover-field">
                <label>가용 상태</label>
                <select class="select" onchange="updateProfileFilter('availability', this.value)">
                  <option value="ALL" ${(f.availability || 'ALL') === 'ALL' ? 'selected' : ''}>전체 가용 상태</option>
                  <option value="즉시투입가능" ${f.availability === '즉시투입가능' ? 'selected' : ''}>즉시투입가능</option>
                  <option value="투입중(철수예정)" ${f.availability === '투입중(철수예정)' ? 'selected' : ''}>투입중(철수예정)</option>
                  <option value="투입중" ${f.availability === '투입중' ? 'selected' : ''}>투입중</option>
                </select>
              </div>
              <div class="inv-popover-field">
                <label>경력 연수</label>
                <select class="select" onchange="updateProfileFilter('minExp', this.value)">
                  <option value="ALL" ${(f.minExp || 'ALL') === 'ALL' ? 'selected' : ''}>전체 경력</option>
                  <option value="5" ${f.minExp === '5' ? 'selected' : ''}>5년 이상</option>
                  <option value="7" ${f.minExp === '7' ? 'selected' : ''}>7년 이상</option>
                  <option value="9" ${f.minExp === '9' ? 'selected' : ''}>9년 이상</option>
                  <option value="10" ${f.minExp === '10' ? 'selected' : ''}>10년 이상</option>
                </select>
              </div>
              <div class="inv-popover-field">
                <label>수행·검증 평점</label>
                <select class="select" onchange="updateProfileFilter('minScore', this.value)">
                  <option value="ALL" ${(f.minScore || 'ALL') === 'ALL' ? 'selected' : ''}>전체 평점</option>
                  <option value="4.8" ${f.minScore === '4.8' ? 'selected' : ''}>★ 4.8점 이상 (최우수)</option>
                  <option value="4.5" ${f.minScore === '4.5' ? 'selected' : ''}>★ 4.5점 이상 (우수)</option>
                  <option value="4.0" ${f.minScore === '4.0' ? 'selected' : ''}>★ 4.0점 이상</option>
                  <option value="UNRATED" ${f.minScore === 'UNRATED' ? 'selected' : ''}>미평가 신규 인재</option>
                </select>
              </div>
              <div class="inv-popover-field">
                <label>투입 가능일</label>
                <select class="select" onchange="updateProfileFilter('availBefore', this.value)">
                  <option value="ALL" ${(f.availBefore || 'ALL') === 'ALL' ? 'selected' : ''}>전체 기간</option>
                  <option value="2026-11-22" ${f.availBefore === '2026-11-22' ? 'selected' : ''}>즉시 ~ 11/22 이내</option>
                  <option value="2026-11-30" ${f.availBefore === '2026-11-30' ? 'selected' : ''}>11월 말(11/30) 이내</option>
                  <option value="2026-12-15" ${f.availBefore === '2026-12-15' ? 'selected' : ''}>12월 중순(12/15) 이내</option>
                </select>
              </div>
              ${!hideSensitive ? `
                <div class="inv-popover-field">
                  <label>기준·희망 단가</label>
                  <select class="select" onchange="updateProfileFilter('maxRate', this.value)">
                    <option value="ALL" ${(f.maxRate || 'ALL') === 'ALL' ? 'selected' : ''}>전체 단가</option>
                    <option value="900" ${f.maxRate === '900' ? 'selected' : ''}>월 900만원 이하</option>
                    <option value="1000" ${f.maxRate === '1000' ? 'selected' : ''}>월 1,000만원 이하</option>
                    <option value="1050" ${f.maxRate === '1050' ? 'selected' : ''}>월 1,050만원 이하</option>
                    <option value="1100" ${f.maxRate === '1100' ? 'selected' : ''}>월 1,100만원 이하</option>
                  </select>
                </div>
              ` : ''}
              <div class="inv-popover-field">
                <label>검증 완료 여부</label>
                <select class="select" onchange="updateProfileFilter('verifiedType', this.value)">
                  <option value="ALL" ${(f.verifiedType || 'ALL') === 'ALL' ? 'selected' : ''}>전체</option>
                  <option value="VERIFIED" ${f.verifiedType === 'VERIFIED' ? 'selected' : ''}>기검증 우수인력만</option>
                  <option value="NEW" ${f.verifiedType === 'NEW' ? 'selected' : ''}>신규인력만</option>
                </select>
              </div>
              <div class="inv-popover-field" style="display:flex; align-items:flex-end;">
                <label class="switch-label" style="padding-bottom:8px; cursor:pointer;">
                  <input type="checkbox" ${f.onlyFavorites ? 'checked' : ''} onchange="updateProfileFilter('onlyFavorites', this.checked)" />
                  <span>★ 즐겨찾기 인재만 보기</span>
                </label>
              </div>
            </div>
            <div class="inv-popover-footer">
              <span style="font-size:12.5px; color:#64748b;">조건 일치 인재 <strong>${filteredProfiles.length}명</strong></span>
              <button type="button" class="btn btn-primary btn-sm" onclick="closeProfileDetailFilterPopover()">적용 완료</button>
            </div>
          </div>
        ` : ''}
      </div>

      ${compareIds.length > 0 ? `
        <button
          type="button"
          class="zal-chip-btn active"
          style="display:inline-flex; align-items:center; gap:5px;"
          onclick="openProfileComparisonModal()"
        >
          ${svgIcon('list', 13)}
          <span>인재 비교 (${compareIds.length})</span>
        </button>
      ` : ''}

      ${permissions.can_view_all_profiles ? `
        <button type="button" class="btn btn-primary" style="width:170px; height:42px; padding:0 14px; font-size:14.5px; font-weight:700; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px; margin-left:auto;" onclick="openNewTalentModal()">
          ${svgIcon('user', 15)} 인재 등록하기
        </button>
      ` : currentUser?.linked_profile_id ? `
        <button type="button" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px; margin-left:auto;" onclick="openEditProfileModal('${currentUser.linked_profile_id}')">
          ${svgIcon('edit', 13)} 내 프로필 · 가용일 수정
        </button>
      ` : ''}
    </div>

    ${activeFilterChips.length > 0 ? `
      <div class="inv-active-filters-bar" style="margin-bottom:14px;">
        <span class="inv-active-filters-label">적용된 상세 필터:</span>
        ${activeFilterChips.map(ch => `
          <span class="inv-active-filter-chip">
            <span>${ch.label}</span>
            <button type="button" onclick="updateProfileFilter('${ch.key}', '${ch.val}')">&times;</button>
          </span>
        `).join('')}
        <button type="button" class="inv-clear-all-filters-btn" onclick="resetProfileDetailFilters()">전체 해제</button>
      </div>
    ` : ''}

    <div id="profileCardsGrid" class="talent-dir-grid">
      ${renderProfileCardsHtml()}
    </div>
  `;
}

function toggleProfileCardMore(btnEl, profileId) {
  const moreBox = document.getElementById(`profileCardMore_${profileId}`);
  const skillsEl = document.getElementById(`profileCardSkills_${profileId}`);
  if (!moreBox) return;
  const isHidden = moreBox.style.display === 'none' || !moreBox.style.display;
  moreBox.style.display = isHidden ? 'flex' : 'none';
  if (skillsEl) {
    skillsEl.style.whiteSpace = isHidden ? 'normal' : 'nowrap';
    skillsEl.style.overflow = isHidden ? 'visible' : 'hidden';
    skillsEl.style.textOverflow = isHidden ? 'clip' : 'ellipsis';
  }
  if (btnEl) {
    btnEl.innerHTML = isHidden
      ? `접기 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`
      : `더보기 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
  }
}

function isInternalOrContractProfile(p) {
  if (!p) return false;
  if (p.is_internal) return true;
  const emp = String(p.employment_type || '').trim();
  return emp.includes('정규직') || emp.includes('사내') || emp.includes('전문계약직') || emp.includes('계약직');
}

function openProfileProjectAssignmentModal(profileId) {
  const { profiles = [], projects = [] } = state.data || {};
  const p = profiles.find(x => x.id === profileId);
  if (!p) return;

  const candidateProjects = [];
  projects.filter(prj => prj.project_group !== 'COMPLETED').forEach(prj => {
    (prj.to_slots || []).forEach(slot => {
      if (!slot.assigned_profile_id || slot.assigned_profile_id === p.id) {
        const { score, reasons } = computeMatchScore(p, slot, prj.start_date);
        candidateProjects.push({
          prj,
          slot,
          score,
          reasons,
          isAlreadyAssigned: slot.assigned_profile_id === p.id
        });
      }
    });
  });
  candidateProjects.sort((a, b) => (b.isAlreadyAssigned - a.isAlreadyAssigned) || (b.score - a.score));

  openModal(`사내 인력 프로젝트 TO 배정 — ${p.name} (${p.tech_grade} · ${p.employment_type})`, `
    <form onsubmit="submitProfileProjectAssignment(event, '${p.id}')">
      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px 16px; border-radius:12px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          <strong>배정 대상 인력:</strong> ${p.name} (${p.employment_type} · ${p.tech_grade} · ${p.experience_years}년차) ·
          <span style="color:#059669; font-weight:600;">가용일 ${p.available_date || p.availability_status}</span>
        </div>
        <div style="font-size:12.5px; color:#64748b;">
          ${p.email || '-'} | ${p.phone || '-'}
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <label style="font-size:12.5px; font-weight:700; color:#0f172a; display:block; margin-bottom:8px;">
          배정 가능한 프로젝트 및 TO 포지션 선택 (${candidateProjects.length}건)
        </label>
        <div style="display:flex; flex-direction:column; gap:8px; max-height:280px; overflow-y:auto; border:1px solid #e2e8f0; padding:12px; border-radius:12px;">
          ${candidateProjects.map((item, idx) => `
            <label style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:10px 12px; border:1px solid ${item.isAlreadyAssigned ? '#0f172a' : '#e2e8f0'}; border-radius:10px; cursor:pointer; background:#ffffff;">
              <div style="display:flex; align-items:flex-start; gap:9px;">
                <input type="radio" name="assign_slot" value="${item.prj.id}::${item.slot.slot_id}" ${idx === 0 ? 'checked' : ''} style="margin-top:3px;" />
                <div>
                  <div style="font-size:13.5px; font-weight:700; color:#0f172a;">
                    [${item.prj.client}] ${item.prj.name}
                    ${item.isAlreadyAssigned ? `<span class="zal-status-pill green" style="margin-left:6px; font-size:11px; padding:1px 7px;">현재 배정됨</span>` : ''}
                  </div>
                  <div style="font-size:12.5px; color:#334155; margin-top:2px;">
                    포지션: <strong>${item.slot.role_name}</strong> (${item.slot.required_grade} · ${item.slot.required_domain}) · 기간: ${item.prj.period_label || `${item.prj.start_date} ~ ${item.prj.end_date}`}
                  </div>
                  <div style="font-size:11.5px; color:#64748b; margin-top:2px;">
                    적합 사유: ${item.reasons.join(' · ') || '핵심 기술스택 및 도메인 부합'}
                  </div>
                </div>
              </div>
              <span class="zal-status-pill ${item.score >= 80 ? 'green' : 'blue'}" style="flex-shrink:0;">
                ${item.score}% 적합
              </span>
            </label>
          `).join('')}
        </div>
      </div>

      <div class="form-field" style="margin-bottom:16px;">
        <label>배정 메모 및 투입 안내</label>
        <textarea class="textarea" name="assign_note">[사내 프로젝트 배정 안내] ${p.name} (${p.employment_type}) 님을 해당 프로젝트 핵심 TO 포지션에 배정 확정합니다.</textarea>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:5px;">
          ${svgIcon('briefcase', 14)} 프로젝트 배정 확정
        </button>
      </div>
    </form>
  `);
}

async function submitProfileProjectAssignment(e, profileId) {
  e.preventDefault();
  const { profiles = [], projects = [] } = state.data || {};
  const p = profiles.find(x => x.id === profileId);
  const fd = new FormData(e.target);
  const selected = fd.get('assign_slot');
  if (!selected) {
    showToast('배정할 프로젝트 TO 포지션을 선택해주세요.');
    return;
  }
  const [projectId, slotId] = String(selected).split('::');
  const prj = projects.find(x => x.id === projectId);
  const slot = prj?.to_slots?.find(s => s.slot_id === slotId);

  await apiCall('/api/projects/assign-slot', 'POST', {
    project_id: projectId,
    slot_id: slotId,
    profile_id: profileId
  });
  closeModal();
  showToast(`✅ ${p ? p.name : '인력'}님을 [${prj ? prj.client : ''}] ${slot ? slot.role_name : '프로젝트'} 포지션에 배정 확정했습니다.`);
  await loadState();
}

function openProfileTargetSourcingModal(profileId) {
  const { profiles = [], projects = [], postings = [] } = state.data || {};
  const p = profiles.find(x => x.id === profileId);
  if (!p) return;

  const candidateProjects = [];
  projects.filter(prj => prj.project_group !== 'COMPLETED').forEach(prj => {
    (prj.to_slots || []).forEach(slot => {
      if (!slot.assigned_profile_id) {
        const { score, reasons } = computeMatchScore(p, slot, prj.start_date);
        const linkedPosting = postings.find(post => post.project_id === prj.id && post.role_name === slot.role_name)
          || postings.find(post => post.project_id === prj.id);
        candidateProjects.push({ prj, slot, score, reasons, linkedPosting });
      }
    });
  });
  candidateProjects.sort((a, b) => b.score - a.score);

  openModal(`인재 맞춤 타겟 소싱 발송 — ${p.name} (${p.tech_grade} · ${p.employment_type})`, `
    <form onsubmit="submitProfileTargetSourcing(event, '${p.id}')">
      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px 16px; border-radius:12px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          <strong>대상 인재:</strong> ${p.name} (${p.tech_grade} · ${p.experience_years}년차) ·
          <span style="color:#059669; font-weight:600;">가용일 ${p.available_date}</span>
        </div>
        <div style="font-size:12.5px; color:#64748b;">
          ${p.email || '-'} | ${p.phone || '-'}
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <label style="font-size:12.5px; font-weight:700; color:#0f172a; display:block; margin-bottom:8px;">
          ${p.name}님에게 적합한 추천 프로젝트 및 미충원 TO 선택 (${candidateProjects.length}건)
        </label>
        <div style="display:flex; flex-direction:column; gap:8px; max-height:260px; overflow-y:auto; border:1px solid #e2e8f0; padding:12px; border-radius:12px;">
          ${candidateProjects.map((item, idx) => `
            <label style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:10px 12px; border:1px solid #e2e8f0; border-radius:10px; cursor:pointer; background:#ffffff;">
              <div style="display:flex; align-items:flex-start; gap:9px;">
                <input type="checkbox" name="target_slot" value="${item.prj.id}::${item.slot.slot_id}::${item.linkedPosting?.id || ''}" ${idx === 0 ? 'checked' : ''} style="margin-top:3px;" />
                <div>
                  <div style="font-size:13.5px; font-weight:700; color:#0f172a;">
                    [${item.prj.client}] ${item.prj.name}
                  </div>
                  <div style="font-size:12.5px; color:#334155; margin-top:2px;">
                    포지션: <strong>${item.slot.role_name}</strong> (${item.slot.required_grade} · ${item.slot.required_domain}) · 기간: ${item.prj.period_label || `${item.prj.start_date} ~ ${item.prj.end_date}`}
                  </div>
                  <div style="font-size:11.5px; color:#64748b; margin-top:2px;">
                    매칭 사유: ${item.reasons.join(' · ') || '핵심 기술스택 부합'}
                  </div>
                </div>
              </div>
              <span class="zal-status-pill ${item.score >= 80 ? 'green' : 'blue'}" style="flex-shrink:0;">
                ${item.score}% 매칭
              </span>
            </label>
          `).join('')}
        </div>
      </div>

      <div class="form-field" style="margin-bottom:16px;">
        <label>타겟 소싱 초청 메시지</label>
        <textarea class="textarea" name="custom_message">[잘될 플랫폼 타겟 소싱 안내] ${p.name}님, 귀하의 ${(p.domains || [])[0] || '금융 IT'} 및 ${(p.skills || []).slice(0, 2).join(', ')} 전문 수행 경험이 당사 주요 프로젝트 핵심 포지션에 부합하여 우선 초청드립니다.</textarea>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:5px;">
          ${svgIcon('send', 14)} 타겟 소싱 발송
        </button>
      </div>
    </form>
  `);
}

async function submitProfileTargetSourcing(e, profileId) {
  e.preventDefault();
  const { profiles = [], postings = [] } = state.data || {};
  const p = profiles.find(x => x.id === profileId);
  const fd = new FormData(e.target);
  const selected = fd.getAll('target_slot');
  if (selected.length === 0) {
    showToast('타겟 소싱을 발송할 프로젝트를 1개 이상 선택해주세요.');
    return;
  }
  const firstPostId = selected.map(s => s.split('::')[2]).find(Boolean) || postings[0]?.id;
  if (firstPostId) {
    await apiCall('/api/postings/target-sourcing', 'POST', {
      posting_id: firstPostId,
      candidate_ids: [profileId],
      custom_message: fd.get('custom_message')
    });
  }
  closeModal();
  showToast(`✨ ${p ? p.name : '인재'}님에게 선택한 프로젝트(${selected.length}건) 타겟 소싱 알림을 발송했습니다!`);
  await loadState();
}

function renderProfileCard(p, permissions, currentUser) {
  const isOwn = currentUser && currentUser.linked_profile_id === p.id;
  const canEdit = permissions.can_view_all_profiles || isOwn;
  const hasRating = p.rating !== null && p.rating !== undefined && Number(p.rating) > 0;
  const rateValueText = p.is_internal
    ? (p.contract_rate ? `월 ${Number(p.contract_rate).toLocaleString()}만원` : '비공개')
    : (p.desired_rate ? `월 ${Number(p.desired_rate).toLocaleString()}만원 (희망)` : '비공개');

  const expYears = p.experience_years || 0;
  const jobTitle = p.job_title || (p.is_internal ? '부장' : '선임');
  const educationShort = [p.school_name, p.major, p.degree].filter(Boolean).join(' ')
    || (p.education || '컴퓨터공학 학사');
  const eduFormatted = educationShort.replace(/대학교/, '대').replace(/대학원/, '대학원');
  const careerSummaryLine = `경력 ${expYears}년 (${jobTitle}) · ${p.employment_type || '프리랜서'} · ${eduFormatted}`;
  const isVerified = Boolean(p.verified);
  const availBadgeCls = p.availability_status === '즉시투입가능'
    ? 'stage-final final-selected'
    : p.availability_status === '투입중(철수예정)'
      ? 'stage-eval-pending'
      : 'stage-doc';

  const isCompared = (state.profileFilters?.compareIds || []).includes(p.id);

  return `
    <article class="inv-vertical-card ${isCompared ? 'is-compared' : ''}" style="cursor:pointer;" onclick="openProfileDetailModal('${p.id}')" title="클릭하여 상세 프로필 및 프로젝트 수행 평가 열람">
      <!-- A. 상단 영역: 가용 상태 배지 | 최신화 일시 | 비교 + 즐겨찾기 (면접·검증 카드의 .inv-vcard-top과 100% 동일) -->
      <div class="inv-vcard-top">
        <div class="inv-vcard-top-left">
          <span class="inv-status-badge ${availBadgeCls}">${p.availability_status || '즉시투입가능'}</span>
          <span class="inv-date-chip neutral" style="border:none; padding:0 4px;" title="프로필 최신화 일자">
            ${svgIcon('clock', 12)}
            <span>최신화 ${p.updated_at}</span>
          </span>
        </div>
        <div class="inv-vcard-top-right" onclick="event.stopPropagation();">
          <button
            type="button"
            class="inv-compare-check-btn ${isCompared ? 'active' : ''}"
            onclick="toggleProfileCompareSelection('${p.id}', event)"
            title="인재 핵심 정보 비교에 추가"
          >
            ${isCompared ? '✓ 비교중' : '+ 비교'}
          </button>
          <button
            type="button"
            class="inv-fav-btn ${p.favorite ? 'active' : ''}"
            onclick="toggleProfileFavorite('${p.id}', event)"
            title="${p.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}"
            aria-label="즐겨찾기"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="${p.favorite ? '#0f172a' : 'none'}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- B. 인재 기본 정보 (면접·검증 카드와 동일 + 검증완료 우측에 재소싱 횟수 배지) -->
      <div class="inv-card-basic-info">
        <div class="inv-card-person-row">
          <img src="${getAvatarForId(p.id)}" alt="${p.name}" class="inv-card-avatar" />
          <div class="inv-card-person-main">
            <div class="inv-card-name-line">
              <strong class="inv-card-cand-name">${p.name}</strong>
              <span class="inv-grade-pill grade-${p.tech_grade}">${p.tech_grade}</span>
              ${isVerified
                ? `<span class="inv-verified-tag" title="통합 인재 DB 검증 완료 인력">검증완료</span>`
                : `<span class="inv-status-badge stage-eval-pending" style="height:22px; font-size:11.5px; padding:0 8px;">신규</span>`}
              ${p.resourced_count > 0 ? `<span class="inv-grade-pill" style="color:#475569; font-weight:600;">재소싱 ${p.resourced_count}회</span>` : ''}
            </div>
            <div class="inv-card-career-line">${careerSummaryLine}</div>
          </div>
        </div>
      </div>

      <div class="zal-meta-list">
        <div class="zal-meta-row">
          <span class="zal-meta-label">${svgIcon('calendar', 14)} 가용일</span>
          <span class="zal-meta-val" style="color:${p.availability_status === '즉시투입가능' ? '#059669' : '#d97706'};">
            ${p.availability_status === '투입중(철수예정)' ? `철수예정 · ${p.current_end_date || p.available_date}` : `투입가능 · ${p.available_date}`}
          </span>
        </div>
        <div class="zal-meta-row">
          <span class="zal-meta-label">${svgIcon('code', 14)} 스킬셋</span>
          <span id="profileCardSkills_${p.id}" class="zal-meta-val" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0;">${p.skills.join(', ')}</span>
        </div>

        <div id="profileCardMore_${p.id}" style="display:none; flex-direction:column; gap:8px;">
          <div class="zal-meta-row">
            <span class="zal-meta-label">${svgIcon('briefcase', 14)} 도메인</span>
            <span class="zal-meta-val">${(p.domains || []).join(' · ') || '-'}</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">${svgIcon('dollar', 14)} 기준단가</span>
            <span class="zal-meta-val">${rateValueText}</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">${svgIcon('user', 14)} 연락처</span>
            <span class="zal-meta-val">${p.phone || '-'}</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">${svgIcon('file', 14)} 이메일</span>
            <span class="zal-meta-val">${p.email || '-'}</span>
          </div>
        </div>

        <div style="display:flex; justify-content:center;" onclick="event.stopPropagation();">
          <button type="button" class="zal-card-more-btn" onclick="toggleProfileCardMore(this, '${p.id}')">
            더보기
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </div>

      <div class="zal-card-footer" style="margin-top:auto;">
        <div class="zal-reaction-group" style="width:100%; justify-content:space-between;">
          <div style="display:inline-flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span class="zal-reaction-pill">${svgIcon('folder', 13)} 수행이력 ${p.career_history.length}건</span>
            ${hasRating ? `
              <span class="zal-reaction-pill">
                <span style="color:#f59e0b; font-size:12px; line-height:1;">★</span> ${Number(p.rating).toFixed(1)}
              </span>
            ` : ''}
          </div>
          ${isInternalOrContractProfile(p) ? `
            <button type="button" class="zal-reaction-pill" onclick="event.stopPropagation(); openProfileProjectAssignmentModal('${p.id}')">
              ${svgIcon('briefcase', 13)} 프로젝트 배정
            </button>
          ` : `
            <button type="button" class="zal-reaction-pill" onclick="event.stopPropagation(); openProfileTargetSourcingModal('${p.id}')">
              ${svgIcon('target', 13)} 타겟 소싱 발송
            </button>
          `}
        </div>
      </div>
    </article>
  `;
}

function updateProfileFilter(key, val) {
  state.profileFilters[key] = val;
  if (key === 'keyword') {
    const grid = document.getElementById('profileCardsGrid');
    if (grid) {
      grid.innerHTML = renderProfileCardsHtml();
      return;
    }
  }
  renderProfilesTab();
}

function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const base64 = result.includes(',') ? result.split(',')[1] : '';
      resolve(base64);
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

async function extractClientSideDocumentText(file) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (ext === 'pdf' && window.pdfjsLib) {
    try {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({
        data: arrayBuffer,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      }).promise;
      const pageTexts = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const rawItems = [];
        for (const item of content.items) {
          const str = (item.str || '').trim();
          if (!str) continue;
          const x = item.transform ? Number(item.transform[4]) : 0;
          const y = item.transform ? Number(item.transform[5]) : 0;
          const w = Number(item.width || str.length * 6);
          rawItems.push({ str, x, y, w });
        }
        // Sort top-to-bottom (Y descending)
        rawItems.sort((a, b) => b.y - a.y);

        // Group items on the same horizontal visual line (within 6px Y tolerance)
        const rows = [];
        for (const it of rawItems) {
          const existingRow = rows.find(r => Math.abs(r.y - it.y) <= 6);
          if (existingRow) {
            existingRow.items.push(it);
          } else {
            rows.push({ y: it.y, items: [it] });
          }
        }
        rows.sort((a, b) => b.y - a.y);

        const lines = rows.map(row => {
          row.items.sort((a, b) => a.x - b.x);
          let lineStr = '';
          let prevEnd = null;
          for (const it of row.items) {
            if (prevEnd !== null) {
              const gap = it.x - prevEnd;
              lineStr += gap > 20 ? ' | ' : ' ';
            }
            lineStr += it.str;
            prevEnd = it.x + it.w;
          }
          return lineStr.trim();
        }).filter(Boolean);

        pageTexts.push(lines.join('\n'));
      }
      const fullText = pageTexts.join('\n\n').trim();
      if (fullText) return fullText;
    } catch (err) {
      console.warn('PDF client parse fallback:', err);
    }
  }
  if (ext === 'txt' || ext === 'csv' || ext === 'md') {
    try {
      return await file.text();
    } catch {
      return '';
    }
  }
  return '';
}

function escAttr(v) {
  return String(v || '').replace(/"/g, '&quot;');
}

function renderStdCompanyRow(item = {}) {
  return `
    <tr class="std-comp-row">
      <td><input class="std-cell-input center" name="comp_name" value="${escAttr(item.company)}" /></td>
      <td><input class="std-cell-input center" name="comp_period" value="${escAttr(item.period)}" /></td>
      <td><input class="std-cell-input center" name="comp_pos" value="${escAttr(item.position)}" /></td>
      <td><input class="std-cell-input center" name="comp_duty" value="${escAttr(item.duty)}" /></td>
      <td class="std-del-cell"><button type="button" class="std-row-del-btn" onclick="removeStdTableRow(this, 'stdCompanyHistoryBody')" title="행 삭제">&times;</button></td>
    </tr>
  `;
}

function renderStdCertRow(item = {}) {
  return `
    <tr class="std-cert-row">
      <td><input class="std-cell-input center" name="cert_name" value="${escAttr(item.name)}" /></td>
      <td><input class="std-cell-input center" name="cert_date" value="${escAttr(item.date)}" /></td>
      <td class="std-del-cell"><button type="button" class="std-row-del-btn" onclick="removeStdTableRow(this, 'stdCertHistoryBody')" title="행 삭제">&times;</button></td>
    </tr>
  `;
}

function renderTalentCareerRow(idx, item = {}) {
  return `
    <tr class="talent-career-row">
      <td><input class="std-cell-input center" name="career_project" value="${escAttr(item.project)}" /></td>
      <td><input class="std-cell-input center" name="career_period" value="${escAttr(item.period)}" /></td>
      <td><input class="std-cell-input center" name="career_role" value="${escAttr(item.role)}" /></td>
      <td><input class="std-cell-input center" name="career_client" value="${escAttr(item.client)}" /></td>
      <td class="std-del-cell"><button type="button" class="std-row-del-btn" onclick="removeStdTableRow(this, 'talentCareerRowsContainer')" title="행 삭제">&times;</button></td>
    </tr>
  `;
}

function addStdCompanyHistoryRow(item = {}) {
  const tbody = document.getElementById('stdCompanyHistoryBody');
  if (tbody) tbody.insertAdjacentHTML('beforeend', renderStdCompanyRow(item));
}

function addStdCertRow(item = {}) {
  const tbody = document.getElementById('stdCertHistoryBody');
  if (tbody) tbody.insertAdjacentHTML('beforeend', renderStdCertRow(item));
}

function addTalentCareerRow(item = {}) {
  const tbody = document.getElementById('talentCareerRowsContainer');
  if (tbody) tbody.insertAdjacentHTML('beforeend', renderTalentCareerRow(0, item));
}

function removeStdTableRow(btn, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const rows = tbody.querySelectorAll('tr');
  const tr = btn.closest('tr');
  if (rows.length <= 1) {
    if (tr) tr.querySelectorAll('input').forEach(inp => { inp.value = ''; });
    return;
  }
  tr?.remove();
}

function renderStandardProfileFormBody(p = {}) {
  const compList = Array.isArray(p.company_history) && p.company_history.length > 0
    ? p.company_history
    : [{}, {}, {}, {}];
  const certList = Array.isArray(p.cert_details) && p.cert_details.length > 0
    ? p.cert_details
    : (Array.isArray(p.certifications) && p.certifications.length > 0
      ? p.certifications.map(c => ({ name: c, date: '' }))
      : [{}, {}, {}, {}]);
  while (certList.length < Math.max(4, compList.length)) certList.push({});
  const careerList = Array.isArray(p.career_history) && p.career_history.length > 0
    ? p.career_history
    : [{}, {}, {}, {}, {}];

  return `
    <div class="std-profile-sheet">
      <!-- 1. 신상기록 -->
      <div class="std-section-block">
        <div class="std-section-head-row">
          <span class="std-section-title">1. 신상기록</span>
        </div>
        <div class="std-table-wrap">
          <table class="std-form-table std-personal-table">
            <colgroup>
              <col style="width:13%;" />
              <col style="width:20%;" />
              <col style="width:11%;" />
              <col style="width:16%;" />
              <col style="width:11%;" />
              <col style="width:13%;" />
              <col style="width:8%;" />
              <col style="width:8%;" />
            </colgroup>
            <tbody>
              <tr>
                <th>성명</th>
                <td><input class="std-cell-input center" name="name" value="${escAttr(p.name)}" required /></td>
                <th>주민번호</th>
                <td colspan="2"><input class="std-cell-input center" name="ssn_masked" value="${escAttr(p.ssn_masked)}" placeholder="" /></td>
                <th>성별</th>
                <td colspan="2"><input class="std-cell-input center" name="gender_age" value="${escAttr(p.gender_age)}" placeholder="" /></td>
              </tr>
              <tr>
                <th>소속회사</th>
                <td><input class="std-cell-input center" name="company_name" value="${escAttr(p.company_name)}" /></td>
                <th>직위</th>
                <td colspan="2"><input class="std-cell-input center" name="job_title" value="${escAttr(p.job_title)}" /></td>
                <th>투입일자</th>
                <td colspan="2"><input class="std-cell-input center" name="available_date" value="${escAttr(p.available_date)}" /></td>
              </tr>
              <tr>
                <th>최종학교</th>
                <td><input class="std-cell-input center" name="school_name" value="${escAttr(p.school_name || p.education)}" /></td>
                <th>졸업년월</th>
                <td><input class="std-cell-input center" name="grad_ym" value="${escAttr(p.grad_ym)}" /></td>
                <th>전공</th>
                <td><input class="std-cell-input center" name="major" value="${escAttr(p.major)}" /></td>
                <th>학위</th>
                <td><input class="std-cell-input center" name="degree" value="${escAttr(p.degree)}" /></td>
              </tr>
              <tr>
                <th>해당분야근무경력</th>
                <td><input class="std-cell-input center" name="career_ym_text" value="${escAttr(p.career_ym_text || (p.experience_years ? `${p.experience_years}년` : ''))}" /></td>
                <th>등급</th>
                <td><input class="std-cell-input center" name="tech_grade" value="${escAttr(p.tech_grade)}" /></td>
                <th>주전문기술</th>
                <td><input class="std-cell-input center" name="main_skill" value="${escAttr(p.main_skill || (Array.isArray(p.skills) ? p.skills.slice(0, 2).join(', ') : ''))}" /></td>
                <th>참여여부</th>
                <td><input class="std-cell-input center" name="participation_yn" value="${escAttr(p.participation_yn)}" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 2. 경력 & 3. 자격증 (2-Column Side-by-Side) -->
      <div class="std-two-col-row">
        <div class="std-section-block">
          <div class="std-section-head-row">
            <span class="std-section-title">2. 경력</span>
            <button type="button" class="std-mini-add-btn" onclick="addStdCompanyHistoryRow()">+ 행 추가</button>
          </div>
          <div class="std-table-wrap">
            <table class="std-form-table std-blue-head">
              <colgroup>
                <col style="width:28%;" />
                <col style="width:30%;" />
                <col style="width:16%;" />
                <col style="width:20%;" />
                <col style="width:6%;" />
              </colgroup>
              <thead>
                <tr>
                  <th>회사명</th>
                  <th>기간</th>
                  <th>직위</th>
                  <th>담당업무</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="stdCompanyHistoryBody">
                ${compList.map(item => renderStdCompanyRow(item)).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="std-section-block">
          <div class="std-section-head-row">
            <span class="std-section-title">3. 자격증</span>
            <button type="button" class="std-mini-add-btn" onclick="addStdCertRow()">+ 행 추가</button>
          </div>
          <div class="std-table-wrap">
            <table class="std-form-table std-blue-head">
              <colgroup>
                <col style="width:58%;" />
                <col style="width:34%;" />
                <col style="width:8%;" />
              </colgroup>
              <thead>
                <tr>
                  <th>자격증명</th>
                  <th>취득일</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="stdCertHistoryBody">
                ${certList.map(item => renderStdCertRow(item)).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 4. 개인이력 -->
      <div class="std-section-block">
        <div class="std-section-head-row">
          <span class="std-section-title">4. 개인이력</span>
          <button type="button" class="std-mini-add-btn" onclick="addTalentCareerRow()">+ 행 추가</button>
        </div>
        <div class="std-table-wrap">
          <table class="std-form-table std-blue-head">
            <colgroup>
              <col style="width:42%;" />
              <col style="width:16%;" />
              <col style="width:22%;" />
              <col style="width:16%;" />
              <col style="width:4%;" />
            </colgroup>
            <thead>
              <tr>
                <th>프로젝트명</th>
                <th>참여기간</th>
                <th>담당업무</th>
                <th>고객사</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="talentCareerRowsContainer">
              ${careerList.map((item, idx) => renderTalentCareerRow(idx, item)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function populateStandardProfileForm(form, p = {}) {
  if (!form) return;
  form.style.display = 'block';
  const setVal = (name, val) => {
    if (form.elements[name]) form.elements[name].value = val !== undefined && val !== null ? val : '';
  };
  setVal('name', p.name || '');
  setVal('ssn_masked', p.ssn_masked || '');
  setVal('gender_age', p.gender_age || '');
  setVal('company_name', p.company_name || '');
  setVal('job_title', p.job_title || '');
  setVal('available_date', p.available_date || '');
  setVal('school_name', p.school_name || p.education || '');
  setVal('grad_ym', p.grad_ym || '');
  setVal('major', p.major || '');
  setVal('degree', p.degree || '');
  setVal('career_ym_text', p.career_ym_text || (p.experience_years ? `${p.experience_years}년` : ''));
  setVal('tech_grade', p.tech_grade || '');
  setVal('main_skill', p.main_skill || (Array.isArray(p.skills) ? p.skills.slice(0, 2).join(', ') : ''));
  setVal('participation_yn', p.participation_yn || '');

  const compBody = document.getElementById('stdCompanyHistoryBody');
  if (compBody) {
    const compList = Array.isArray(p.company_history) && p.company_history.length > 0
      ? p.company_history
      : [{}, {}, {}, {}];
    compBody.innerHTML = compList.map(item => renderStdCompanyRow(item)).join('');
  }

  const certBody = document.getElementById('stdCertHistoryBody');
  if (certBody) {
    const certList = Array.isArray(p.cert_details) && p.cert_details.length > 0
      ? p.cert_details.slice()
      : (Array.isArray(p.certifications) && p.certifications.length > 0
        ? p.certifications.map(c => ({ name: c, date: '' }))
        : []);
    while (certList.length < Math.max(4, compList.length)) certList.push({});
    certBody.innerHTML = certList.map(item => renderStdCertRow(item)).join('');
  }

  const careerBody = document.getElementById('talentCareerRowsContainer');
  if (careerBody) {
    const careerList = Array.isArray(p.career_history) && p.career_history.length > 0
      ? p.career_history
      : [{}, {}, {}, {}, {}];
    careerBody.innerHTML = careerList.map((item, idx) => renderTalentCareerRow(idx, item)).join('');
  }
}

async function handleResumeFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const [rawText, fileBase64] = await Promise.all([
    extractClientSideDocumentText(file),
    fileToBase64(file)
  ]);
  const res = await apiCall('/api/ai/parse-resume', 'POST', {
    fileName: file.name,
    rawText,
    fileBase64
  });
  const p = res.parsed;

  const existingForm = document.getElementById('aiParsedProfileForm');
  if (existingForm) {
    populateStandardProfileForm(existingForm, p);
    const banner = document.getElementById('resumeAiParseStatusBanner');
    if (banner) {
      banner.style.display = 'flex';
      banner.innerHTML = `
        <span>✓ <strong>AI 이력서 자동 파싱 완료 (${file.name})</strong> — 표준 인력프로필 양식에 맞춰 자동 입력되었습니다.</span>
      `;
    }
    showToast(`✨ 이력서(${file.name}) 정보를 표준 인력프로필 양식에 반영했습니다!`);
  } else {
    openAiParseReviewModal(file.name, rawText, fileBase64);
  }
  event.target.value = '';
}

function triggerSampleParse(sampleKey) {
  const sample = SAMPLE_RESUMES[sampleKey];
  if (!sample) return;
  openAiParseReviewModal(sample.fileName, sample.rawText);
}

function showNewTalentManualForm() {
  const form = document.getElementById('aiParsedProfileForm');
  if (form) {
    form.style.display = 'block';
    form.querySelector('input[name="name"]')?.focus();
  }
}

function openNewTalentModal() {
  openModal('인재 등록', `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <span class="zal-status-pill green" style="margin-bottom:5px; display:inline-flex; align-items:center; gap:5px;">
            ${svgIcon('bolt', 13)} AI 무정차 이력서 파싱 엔진 (회사 표준 인력프로필 양식)
          </span>
          <div style="font-size:14px; font-weight:700; color:#0f172a;">
            파워포인트(.pptx) · 워드(.docx) · 엑셀(.xlsx) · PDF 이력서를 업로드하면 AI가 회사 표준 [I. 인력프로필] 양식을 자동 생성합니다.
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <input type="file" id="modalResumeFileInput" accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.hwp,.hwpx,.txt" style="display:none;" onchange="handleResumeFileUpload(event)" />
          <button type="button" class="btn btn-primary btn-sm" style="width:176px; height:36px; padding:0 12px; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="document.getElementById('modalResumeFileInput').click()">
            ${svgIcon('file', 14)} 내 PC 이력서 업로드
          </button>
          <button type="button" class="btn btn-outline btn-sm" style="width:176px; height:36px; padding:0 12px; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="showNewTalentManualForm()">
            ${svgIcon('edit', 14)} 직접 입력하기
          </button>
        </div>
      </div>
      <div id="resumeAiParseStatusBanner" class="zal-request-banner" style="display:none; background:#ecfdf5; border-color:#a7f3d0; color:#059669; margin-top:12px; margin-bottom:0;"></div>
    </div>

    <form id="aiParsedProfileForm" onsubmit="submitAiParsedProfile(event)" style="display:none; margin-top:16px;">
      ${renderStandardProfileFormBody({})}

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">등록하기</button>
      </div>
    </form>
  `);
}

async function openAiParseReviewModal(fileName, rawText, fileBase64 = '') {
  const res = await apiCall('/api/ai/parse-resume', 'POST', { fileName, rawText, fileBase64 });
  const p = res.parsed;

  openModal(`AI 잘될이 무정차 이력서 파싱 검수 (${fileName})`, `
    <div class="zal-request-banner" style="background:#ecfdf5; border-color:#a7f3d0; color:#059669; margin-bottom:16px;">
      <span>✓ AI 자동 파싱 완료 (${fileName}) — 표준 [I. 인력프로필] 양식으로 변환되었습니다.</span>
    </div>

    <form id="aiParsedProfileForm" onsubmit="submitAiParsedProfile(event)">
      ${renderStandardProfileFormBody(p)}

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">✓ 검수 완료 및 통합 DB 적재</button>
      </div>
    </form>
  `);
}

async function submitAiParsedProfile(e) {
  e.preventDefault();
  const form = e.target;
  const fd = new FormData(form);

  const compRows = Array.from(form.querySelectorAll('.std-comp-row'));
  const company_history = compRows.map(r => ({
    company: r.querySelector('[name="comp_name"]')?.value?.trim() || '',
    period: r.querySelector('[name="comp_period"]')?.value?.trim() || '',
    position: r.querySelector('[name="comp_pos"]')?.value?.trim() || '',
    duty: r.querySelector('[name="comp_duty"]')?.value?.trim() || ''
  })).filter(x => x.company || x.period);

  const certRows = Array.from(form.querySelectorAll('.std-cert-row'));
  const cert_details = certRows.map(r => ({
    name: r.querySelector('[name="cert_name"]')?.value?.trim() || '',
    date: r.querySelector('[name="cert_date"]')?.value?.trim() || ''
  })).filter(x => x.name);

  const careerRows = Array.from(form.querySelectorAll('.talent-career-row'));
  const mainSkillVal = (fd.get('main_skill') || '').trim();
  const career_history = careerRows.map(row => ({
    project: row.querySelector('[name="career_project"]')?.value?.trim() || '',
    period: row.querySelector('[name="career_period"]')?.value?.trim() || '',
    role: row.querySelector('[name="career_role"]')?.value?.trim() || '',
    client: row.querySelector('[name="career_client"]')?.value?.trim() || '',
    tech: row.querySelector('[name="career_role"]')?.value?.trim() || mainSkillVal
  })).filter(c => c.project || c.client);

  const schoolName = (fd.get('school_name') || '').trim();
  const major = (fd.get('major') || '').trim();
  const degree = (fd.get('degree') || '').trim();
  const education = [schoolName, major ? `${major}` : '', degree].filter(Boolean).join(' ').trim();

  const careerYmText = (fd.get('career_ym_text') || '').trim();
  const expYearMatch = careerYmText.match(/(\d{1,2})/);
  const experience_years = expYearMatch ? Number(expYearMatch[1]) : 0;

  const companyName = (fd.get('company_name') || '').trim();
  const employment_type = /프리랜서/.test(companyName) || !companyName ? '프리랜서' : '정규직';

  const skills = mainSkillVal
    ? mainSkillVal.split(/[,/]/).map(s => s.trim()).filter(Boolean)
    : [];

  await apiCall('/api/profiles', 'POST', {
    name: fd.get('name'),
    ssn_masked: fd.get('ssn_masked'),
    gender_age: fd.get('gender_age'),
    company_name: companyName,
    job_title: fd.get('job_title'),
    school_name: schoolName,
    grad_ym: fd.get('grad_ym'),
    major,
    degree,
    career_ym_text: careerYmText,
    main_skill: mainSkillVal,
    participation_yn: fd.get('participation_yn'),
    employment_type,
    tech_grade: fd.get('tech_grade') || '고급',
    experience_years,
    education,
    available_date: fd.get('available_date') || '',
    certifications: cert_details.map(c => c.name),
    cert_details,
    company_history,
    skills: skills.length ? skills : ['UI/UX'],
    domains: skills.length ? [skills[0]] : ['금융SI'],
    career_history,
    parse_seconds: 35
  });

  closeModal();
  showToast('✨ 표준 인력프로필이 사내외 통합 DB에 즉시 적재되었습니다!');
  await loadState();
}

function openEditProfileModal(profileId) {
  const { profiles, permissions, currentUser } = state.data;
  const p = profiles.find(x => x.id === profileId);
  if (!p) {
    showToast('수정할 프로필을 찾을 수 없습니다.');
    return;
  }
  const isOwn = currentUser && currentUser.linked_profile_id === p.id;

  openModal(`프로필 · 수행이력 및 가용 시기(철수/투입일) 현행화 — ${p.name}`, `
    <form onsubmit="submitEditProfile(event, '${p.id}')">
      <div class="form-grid">
        <div class="form-field">
          <label>성명</label>
          <input class="input" name="name" value="${p.name}" required />
        </div>
        <div class="form-field">
          <label>소속 구분</label>
          <select class="select" name="employment_type">
            ${['정규직', '전문계약직', '프리랜서', '반프리', '개인사업자', '협력사'].map(t =>
              `<option value="${t}" ${p.employment_type === t ? 'selected' : ''}>${t}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>SW 기술등급</label>
          <select class="select" name="tech_grade">
            ${['특급', '고급', '중급', '초급'].map(g =>
              `<option value="${g}" ${p.tech_grade === g ? 'selected' : ''}>${g}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>가용 상태</label>
          <select class="select" name="availability_status">
            ${['즉시투입가능', '투입중(철수예정)', '투입중'].map(st =>
              `<option value="${st}" ${p.availability_status === st ? 'selected' : ''}>${st}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>차기 투입 가능일</label>
          <input type="date" class="input" name="available_date" value="${p.available_date}" required />
        </div>
        <div class="form-field">
          <label>현 프로젝트 철수 예정일</label>
          <input type="date" class="input" name="current_end_date" value="${p.current_end_date || ''}" />
        </div>
        <div class="form-field">
          <label>보유 스킬셋 (쉼표 구분)</label>
          <input class="input" name="skills" value="${p.skills.join(', ')}" />
        </div>
        <div class="form-field">
          <label>금융/비금융 도메인 (쉼표 구분)</label>
          <input class="input" name="domains" value="${p.domains.join(', ')}" />
        </div>
        <div class="form-field">
          <label>보유 자격증 (쉼표 구분)</label>
          <input class="input" name="certifications" value="${p.certifications.join(', ')}" />
        </div>
        ${(permissions.can_view_sensitive_info || isOwn) ? `
          <div class="form-field">
            <label>희망 단가 (만원/월)</label>
            <input type="number" class="input" name="desired_rate" value="${p.desired_rate || 0}" />
          </div>
        ` : ''}
        ${permissions.can_view_sensitive_info ? `
          <div class="form-field">
            <label>계약/기준 단가 (만원/월, 민감정보)</label>
            <input type="number" class="input" name="contract_rate" value="${p.contract_rate || 0}" />
          </div>
          <div class="form-field">
            <label>내부 별점 평점 (0~5.0, 민감정보)</label>
            <input type="number" step="0.1" min="0" max="5" class="input" name="rating" value="${p.rating || 0}" />
          </div>
        ` : ''}
      </div>

      ${permissions.can_view_sensitive_info ? `
        <div class="form-field" style="margin-bottom:14px;">
          <label>내부 면접 총평 및 수행 평가 (민감정보)</label>
          <input class="input" name="review_summary" value="${p.review_summary || ''}" />
        </div>
      ` : ''}

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">저장하기</button>
      </div>
    </form>
  `);
}

async function submitEditProfile(e, id) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = {
    id,
    name: fd.get('name'),
    employment_type: fd.get('employment_type'),
    is_internal: /사내/.test(fd.get('employment_type')),
    tech_grade: fd.get('tech_grade'),
    availability_status: fd.get('availability_status'),
    available_date: fd.get('available_date'),
    current_end_date: fd.get('current_end_date'),
    skills: fd.get('skills').split(',').map(s => s.trim()).filter(Boolean),
    domains: fd.get('domains').split(',').map(s => s.trim()).filter(Boolean),
    certifications: fd.get('certifications').split(',').map(s => s.trim()).filter(Boolean)
  };
  if (fd.has('desired_rate')) payload.desired_rate = Number(fd.get('desired_rate'));
  if (fd.has('contract_rate')) payload.contract_rate = Number(fd.get('contract_rate'));
  if (fd.has('rating')) payload.rating = Number(fd.get('rating'));
  if (fd.has('review_summary')) payload.review_summary = fd.get('review_summary');

  await apiCall('/api/profiles', 'POST', payload);
  closeModal();
  showToast('프로필 및 가용 시기가 최신화되었습니다.');
  await loadState();
}

/* =========================================================================
   TAB 3: PROJECT & RFP PROPOSAL MANAGEMENT (List View -> Detail View)
   ========================================================================= */
function selectProjectDetail(projectId, options = {}) {
  state.selectedProjectId = projectId;
  if (state.activeTab !== 'projects') {
    state.activeTab = 'projects';
    applyTabDomState('projects');
  }
  if (!options.fromPopState) {
    pushNavigationState(Boolean(options.replaceHistory));
  }
  renderProjectsTab();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeProjectDetail(options = {}) {
  if (!options.fromPopState && window.history.state && window.history.state.projectId) {
    window.history.back();
    return;
  }
  state.selectedProjectId = null;
  if (!options.fromPopState) {
    pushNavigationState(Boolean(options.replaceHistory));
  }
  renderProjectsTab();
}

function setProjectGroupFilter(groupKey) {
  state.selectedProjectFilter = groupKey;
  renderProjectsTab();
}

function updateProjectKeyword(val) {
  state.projectKeyword = val;
  const container = document.getElementById('projectCardsContainer');
  if (container) {
    container.innerHTML = renderProjectCardsHtml();
    return;
  }
  renderProjectsTab();
}

function renderProjectCardsHtml() {
  const { projects } = state.data;
  const kw = String(state.projectKeyword || '').trim().toLowerCase();
  const matchPrj = (p) => {
    if (!kw) return true;
    const slotSkills = (p.to_slots || []).flatMap(s => [s.role_name || '', ...(s.required_skills || [])]).join(' ');
    const hay = `${p.name || ''} ${p.client || ''} ${p.domain || ''} ${p.category || ''} ${p.description || ''} ${slotSkills}`.toLowerCase();
    return hay.includes(kw);
  };

  const plannedProjects = projects.filter(p => (p.project_group || 'PLANNED') === 'PLANNED' && matchPrj(p));
  const ongoingProjects = projects.filter(p => p.project_group === 'ONGOING' && matchPrj(p));
  const completedProjects = projects.filter(p => p.project_group === 'COMPLETED' && matchPrj(p));

  const activeGroup = state.selectedProjectFilter || 'PLANNED';

  const sections = [
    { key: 'PLANNED', title: '예정(입찰) 프로젝트', badgeClass: 'purple', items: plannedProjects },
    { key: 'ONGOING', title: '진행중인 프로젝트', badgeClass: 'amber', items: ongoingProjects },
    { key: 'COMPLETED', title: '완료된 프로젝트', badgeClass: 'green', items: completedProjects }
  ].filter(sec => activeGroup === 'ALL' || activeGroup === sec.key);

  const totalMatched = sections.reduce((sum, sec) => sum + sec.items.length, 0);
  if (totalMatched === 0) {
    return `
      <div class="card" style="text-align:center; padding:40px;">
        조건에 부합하는 프로젝트가 없습니다.
      </div>
    `;
  }

  return sections.map((sec, secIdx) => `
    <section>
      ${secIdx > 0 ? `
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <h3 style="font-size:16.5px; font-weight:600; color:#0f172a; margin:0;">${sec.title}</h3>
          <span class="zal-status-pill ${sec.badgeClass}">${sec.items.length}건</span>
        </div>
      ` : ''}
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${sec.items.map(prj => renderProjectSummaryCard(prj)).join('')}
      </div>
    </section>
  `).join('');
}

function renderProjectsTab() {
  const { projects, postings, interviews, templates, permissions, currentUser } = state.data;
  const el = document.getElementById('tab-projects');
  const canManagePrj = permissions.can_manage_projects || permissions.can_extract_proposal;

  // If a project card is selected, render its Detail View
  const selectedPrj = state.selectedProjectId
    ? projects.find(p => p.id === state.selectedProjectId)
    : null;

  if (selectedPrj) {
    renderProjectDetailView(el, selectedPrj, postings, interviews, templates, permissions, currentUser, canManagePrj);
    return;
  }

  const plannedProjects = projects.filter(p => (p.project_group || 'PLANNED') === 'PLANNED');
  const ongoingProjects = projects.filter(p => p.project_group === 'ONGOING');
  const completedProjects = projects.filter(p => p.project_group === 'COMPLETED');

  const activeGroup = state.selectedProjectFilter || 'PLANNED';

  // Otherwise, render the Project List View with 3 grouped sections and basic info cards
  el.innerHTML = `
    <div class="filter-bar">
      <button type="button" class="zal-chip-btn ${activeGroup === 'ALL' ? 'active' : ''}" onclick="setProjectGroupFilter('ALL')">
        전체 (${projects.length})
      </button>
      <button type="button" class="zal-chip-btn ${activeGroup === 'PLANNED' ? 'active' : ''}" onclick="setProjectGroupFilter('PLANNED')">
        예정(입찰) 프로젝트 (${plannedProjects.length})
      </button>
      <button type="button" class="zal-chip-btn ${activeGroup === 'ONGOING' ? 'active' : ''}" onclick="setProjectGroupFilter('ONGOING')">
        진행중인 프로젝트 (${ongoingProjects.length})
      </button>
      <button type="button" class="zal-chip-btn ${activeGroup === 'COMPLETED' ? 'active' : ''}" onclick="setProjectGroupFilter('COMPLETED')">
        완료된 프로젝트 (${completedProjects.length})
      </button>
      ${renderChipSearchBox('projectSearchInput', state.projectKeyword || '', '프로젝트명, 고객사, 도메인, 스킬 검색...', 'projects')}
      ${['MASTER', 'MANAGER'].includes(currentUser?.role_group) ? `
        <button type="button" class="btn btn-primary" style="width:170px; height:42px; padding:0 14px; font-size:14.5px; font-weight:700; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px; margin-left:auto;" onclick="openNewProjectModal()">
          ${svgIcon('file', 15)} 프로젝트 등록하기
        </button>
      ` : ''}
    </div>

    <div id="projectCardsContainer" style="display:flex; flex-direction:column; gap:28px;">
      ${renderProjectCardsHtml()}
    </div>
  `;
}

function getDdayText(deadlineStr) {
  if (!deadlineStr) return 'D-14';
  const baseDate = new Date('2026-11-13T00:00:00');
  const targetDate = new Date(`${deadlineStr}T00:00:00`);
  if (Number.isNaN(targetDate.getTime())) return 'D-14';
  const diffDays = Math.ceil((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'D-Day';
  return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
}

function getProjectApplicantCount(prj) {
  const interviews = state.data?.interviews || [];
  const interviewCount = interviews.filter(i => i.project_id === prj.id).length;
  return Math.max(Number(prj.applicant_count || 0), interviewCount);
}

function renderProjectSummaryCard(prj) {
  const totalSlots = prj.to_slots.length;
  const filledSlots = prj.to_slots.filter(s => s.assigned_profile_id).length;
  const categoryLabel = prj.category || 'PENSION';
  const periodText = prj.period_label || `${prj.start_date} ~ ${prj.end_date}`;
  const isPlanned = (prj.project_group || 'PLANNED') === 'PLANNED';
  const deadline = prj.staffing_deadline || '2026-11-25';
  const dDayLabel = getDdayText(deadline);
  const applicantCount = getProjectApplicantCount(prj);

  const statusPill = prj.project_group === 'ONGOING'
    ? `<span class="zal-status-pill amber">ONGOING</span>`
    : prj.project_group === 'COMPLETED'
      ? `<span class="zal-status-pill green">COMPLETED</span>`
      : `<span class="zal-status-pill green">모집 중 · 입찰예정</span>`;

  const mainRole = prj.to_slots[0]?.role_name || '금융 IT 개발자';
  const extraRoleCount = Math.max(0, totalSlots - 1);
  const grades = Array.from(new Set(prj.to_slots.map(s => s.required_grade))).join(' · ') || '특급 · 고급';
  const allSkills = Array.from(new Set(prj.to_slots.flatMap(s => s.required_skills || []))).slice(0, 4);

  return `
    <article class="prj-split-card" onclick="selectProjectDetail('${prj.id}')">
      <!-- Left Column: Core Project Info -->
      <div class="prj-split-left">
        <div>
          <div class="prj-split-top-row">
            <div style="display:flex; align-items:center; gap:8px;">
              ${statusPill}
              <span class="zal-status-pill blue">${categoryLabel}</span>
            </div>
            <span style="color:#cbd5e1;">${svgIcon('heart', 17)}</span>
          </div>

          <h3 class="prj-split-title">${prj.name}</h3>

          <div class="prj-metrics-bar">
            <span class="metric-item">단가 가이드 <strong>${prj.budget_rate_info}</strong></span>
            <span class="prj-metrics-divider"></span>
            <span class="metric-item">수행 기간 <strong>${periodText}</strong></span>
            <span class="prj-metrics-divider"></span>
            <span class="metric-item">투입 시작일 <strong>${prj.start_date}</strong></span>
          </div>

          <div class="prj-role-summary-row">
            <span style="display:inline-flex; align-items:center; gap:5px;">${svgIcon('list', 14)} ${mainRole}${extraRoleCount > 0 ? ` 외 ${extraRoleCount}개 포지션` : ''}</span>
            <span style="display:inline-flex; align-items:center; gap:5px;">${svgIcon('briefcase', 14)} ${grades} 레벨</span>
          </div>
        </div>

        <div class="prj-bottom-row">
          <div class="prj-skill-pills">
            <span class="prj-gray-tag" style="display:inline-flex; align-items:center; gap:4px;">${svgIcon('clock', 13)} ${prj.contract_type || '일괄도급'}</span>
            ${allSkills.map(sk => `<span class="prj-gray-tag">${sk}</span>`).join('')}
          </div>
          <div class="prj-loc-date" style="display:inline-flex; align-items:center; gap:4px;">
            ${svgIcon('pin', 13)} ${prj.location} · 등록일자 ${(prj.created_at || '2026-11-10').replace(/-/g, '.')}.
          </div>
        </div>
      </div>

      <!-- Right Column: D-Day, Applicant Count, Staffing & Client Box -->
      <div class="prj-split-right">
        <div class="prj-right-meta-list">
          ${isPlanned ? `
            <div class="prj-right-meta-item">
              <span style="color:#64748b; display:inline-flex; align-items:center; gap:5px;">${svgIcon('clock', 14)} 충원완료일</span>
              <strong style="color:#dc2626;">${dDayLabel}</strong>
              <span style="font-size:12px; color:#94a3b8;">(${deadline.replace(/-/g, '.')})</span>
            </div>
            <div class="prj-right-meta-item">
              <span style="color:#64748b; display:inline-flex; align-items:center; gap:5px;">${svgIcon('user', 14)} 지원자</span>
              <strong style="color:#0f172a;">${applicantCount}명</strong>
            </div>
          ` : `
            <div class="prj-right-meta-item">
              <span style="color:#64748b; display:inline-flex; align-items:center; gap:5px;">${svgIcon('clock', 14)} 진행상태</span>
              <strong style="color:#0f172a;">${prj.project_group === 'ONGOING' ? '수행 진행중' : '수행 완료'}</strong>
            </div>
            <div class="prj-right-meta-item">
              <span style="color:#64748b; display:inline-flex; align-items:center; gap:5px;">${svgIcon('user', 14)} 참여인력</span>
              <strong style="color:#0f172a;">총 ${totalSlots}명 투입</strong>
            </div>
          `}
          <div style="display:flex; align-items:center; gap:12px; font-size:13px; color:#64748b; margin-top:2px;">
            <span style="display:inline-flex; align-items:center; gap:4px;">${svgIcon('eye', 14)} 충원 <strong>${filledSlots}/${totalSlots}명</strong></span>
            <span style="display:inline-flex; align-items:center; gap:4px;">${svgIcon('chat', 14)} TO ${totalSlots}</span>
          </div>
        </div>

        <div class="prj-client-box">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:24px; height:24px; border-radius:50%; background:#0f172a; color:#fff; font-size:11px; font-weight:600; display:inline-flex; align-items:center; justify-content:center;">
              ${prj.client.slice(0, 1)}
            </div>
            <strong style="font-size:14px; color:#0f172a;">${prj.client}</strong>
            <span style="font-size:11.5px; font-weight:600; color:#2563eb; background:#eff6ff; padding:2px 7px; border-radius:6px;">고객사</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px; font-size:12.5px; color:#475569; font-weight:500;">
            <span style="display:inline-flex; align-items:center; gap:4px;">${svgIcon('briefcase', 13)} ${prj.domain} 도메인</span>
            <span style="display:inline-flex; align-items:center; gap:4px;">${svgIcon('award', 13)} ${filledSlots === totalSlots ? '배정 완료' : `미충원 ${totalSlots - filledSlots}석`}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

function parsePostingRateRange(rateGuideStr = '') {
  const nums = String(rateGuideStr || '')
    .replace(/,/g, '')
    .match(/\d{3,4}/g);
  if (!nums || nums.length === 0) return { min: 950, max: 1100 };
  const parsed = nums.map(Number).filter(n => n >= 400 && n <= 2500);
  if (parsed.length === 0) return { min: 950, max: 1100 };
  return {
    min: Math.min(...parsed),
    max: Math.max(...parsed)
  };
}

function resolvePostingApplicants(post) {
  if (!post) return [];
  const defaultMap = {
    post_1: ['양동근', '김도현', '이준호', '장민호', '윤태영', '배성우', '서유진', '문정훈', '안소희', '고경표'],
    post_2: ['한지민', '박성진'],
    post_3: ['오세훈', '김도윤', '최민수'],
    post_4: ['배성우', '문정훈', '안소희']
  };
  const rawApplicants = Array.isArray(post.applicants) && post.applicants.length > 0
    ? post.applicants
    : (Array.isArray(post.applicants) && post.applicant_count === 0 ? [] : (defaultMap[post.id] || []));

  const { interviews = [], profiles = [], currentUser, permissions } = state.data || {};
  const isExternalGuest = currentUser?.role_group === 'EXTERNAL';
  const canViewSensitive = Boolean(permissions?.can_view_sensitive_info) && currentUser?.role_group !== 'INTERNAL';
  const budgetRange = parsePostingRateRange(post.rate_guide);
  const reqSkills = Array.isArray(post.required_skills) ? post.required_skills : ['Java', 'Oracle'];

  const gradeRank = { '특급': 3, '고급': 2, '중급': 1, '초급': 0 };
  const reqGradeRank = gradeRank[post.required_grade] ?? 2;

  return rawApplicants.map((name, idx) => {
    const rawName = String(name || '').trim().replace(/\*\*$/, '');
    const displayName = isExternalGuest ? `${rawName.charAt(0)}**` : rawName;
    const matchedInv = interviews.find(i => i.posting_id === post.id && i.candidate_name === rawName)
      || interviews.find(i => i.candidate_name === rawName);
    const prof = profiles.find(p => (matchedInv?.candidate_profile_id && p.id === matchedInv.candidate_profile_id) || p.name === rawName);
    const fb = (typeof APPLICANT_FALLBACK_MAP !== 'undefined' && APPLICANT_FALLBACK_MAP[rawName]) || {};

    const grade = matchedInv?.tech_grade || prof?.tech_grade || fb.tech_grade || post.required_grade || '고급';
    const expYears = matchedInv?.experience_years || prof?.experience_years || fb.experience_years || 9;
    const empType = (matchedInv?.candidate_type || prof?.employment_type || fb.candidate_type || '프리랜서').replace(/^외주\s*/, '');
    const availDate = matchedInv?.available_from || prof?.available_date || fb.available_from || '2026-11-25';
    const availShort = availDate.length >= 10 ? `${availDate.slice(5, 7)}/${availDate.slice(8, 10)}` : availDate;
    const desiredRate = Number(matchedInv?.desired_rate ?? prof?.desired_rate ?? fb.desired_rate ?? budgetRange.min);
    const skills = Array.isArray(matchedInv?.skills) && matchedInv.skills.length > 0
      ? matchedInv.skills
      : (Array.isArray(prof?.skills) && prof.skills.length > 0 ? prof.skills : (fb.skills || reqSkills));
    const domains = Array.isArray(matchedInv?.domains) && matchedInv.domains.length > 0
      ? matchedInv.domains
      : (Array.isArray(prof?.domains) && prof.domains.length > 0 ? prof.domains : (fb.domains || [post.required_domain]));

    const matchedSkills = reqSkills.filter(reqSk =>
      skills.some(candSk => candSk.toLowerCase().includes(reqSk.toLowerCase()) || reqSk.toLowerCase().includes(candSk.toLowerCase()))
    );
    const skillMatchRatio = reqSkills.length > 0 ? (matchedSkills.length / reqSkills.length) : 1;
    const domainMatched = domains.some(d => String(d).includes(post.required_domain) || String(post.required_domain).includes(d));
    const candGradeRank = gradeRank[grade] ?? 2;
    const gradeScore = candGradeRank >= reqGradeRank ? 15 : 8;
    const rateScore = desiredRate <= budgetRange.max ? 15 : Math.max(5, 15 - Math.round((desiredRate - budgetRange.max) / 15));
    const matchPct = Math.min(99, Math.max(76, Math.round(skillMatchRatio * 55 + (domainMatched ? 15 : 7) + gradeScore + rateScore)));

    const rateDiff = desiredRate - budgetRange.max;
    let rateFitLabel = '예산 부합';
    let rateFitTone = 'fit';
    if (desiredRate <= budgetRange.min) {
      rateFitLabel = `예산 절감 (-${budgetRange.min - desiredRate}만)`;
      rateFitTone = 'save';
    } else if (rateDiff > 0) {
      rateFitLabel = `협의 필요 (+${rateDiff}만)`;
      rateFitTone = 'over';
    }

    let pipeline = {
      code: 'NEW',
      label: '신규접수',
      subLabel: '서류 검토대기',
      dotCls: 'new',
      pillCls: 'new'
    };
    const totalScore = Number(matchedInv?.total_score || 0);
    if (matchedInv) {
      const stMeta = typeof getInterviewStageBadgeMeta === 'function' ? getInterviewStageBadgeMeta(matchedInv) : null;
      const st = stMeta?.stage || matchedInv.status || '';
      if (st === '최종 결과' || matchedInv.final_decision === 'SELECTED' || matchedInv.status === '최종 선정') {
        pipeline = {
          code: 'SELECTED',
          label: '투입확정',
          subLabel: totalScore > 0 ? `★ ${totalScore.toFixed(1)}` : '선정 완료',
          dotCls: 'selected',
          pillCls: 'selected'
        };
      } else if (st === '평가 완료' || totalScore > 0) {
        pipeline = {
          code: 'EVALUATED',
          label: `검증완료 ★${totalScore.toFixed(1)}`,
          subLabel: '면접 평가완료',
          dotCls: 'evaluated',
          pillCls: 'evaluated'
        };
      } else if (st === '인터뷰 예정' || matchedInv.interview_date) {
        pipeline = {
          code: 'INTERVIEW',
          label: '인터뷰예정',
          subLabel: matchedInv.interview_date ? matchedInv.interview_date.slice(5, 16) : '일정 조율중',
          dotCls: 'interview',
          pillCls: 'interview'
        };
      } else {
        pipeline = {
          code: 'REVIEW',
          label: '서류검토중',
          subLabel: '인터뷰 배정대기',
          dotCls: 'new',
          pillCls: 'new'
        };
      }
    }

    const sourceType = fb.recommender
      ? (fb.recommender.includes('타겟') ? '타겟소싱 응답' : '오픈구인 지원')
      : (idx === 0 ? '타겟소싱 응답' : '오픈구인 지원');
    const summaryText = matchedInv?.resume_summary || prof?.review_summary || fb.resume_summary || `${post.required_domain} 핵심 모듈 설계 및 개발 ${expYears}년차`;

    return {
      idx,
      rawName,
      displayName,
      avatarUrl: getAvatarForId(prof?.id || rawName),
      profileId: prof?.id || null,
      interviewId: matchedInv?.id || '',
      grade,
      expYears,
      empType,
      availDate,
      availShort,
      desiredRate,
      canViewSensitive,
      rateFitLabel,
      rateFitTone,
      skills,
      matchedSkills,
      reqSkills,
      domains,
      domainMatched,
      matchPct,
      pipeline,
      totalScore,
      sourceType,
      summaryText,
      interviewDate: matchedInv?.interview_date || '',
      interviewerName: matchedInv?.interviewer_name || ''
    };
  });
}

function getPostingEnrichedMeta(post) {
  const { projects = [], profiles = [] } = state.data || {};
  const prj = projects.find(p => p.id === post.project_id);

  // Extract bracket prefix e.g. "[미래에셋증권 퇴직연금 차세대] ..."
  const bracketMatch = String(post.title || '').match(/^\[([^\]]+)\]\s*(.*)$/);
  const bracketText = bracketMatch ? bracketMatch[1].trim() : '';
  let cleanTitle = bracketMatch ? bracketMatch[2].trim() : String(post.title || post.role_name || '').trim();
  // Remove redundant trailing grade in parentheses like "(특급/고급)" or "(고급)" since grade badge is shown clearly
  cleanTitle = cleanTitle.replace(/\s*\((특급|고급|중급|초급|특급\/고급|고급\/중급)\)\s*$/, '').trim();

  const clientName = prj?.client || (bracketText.split(/\s+/)[0] || '금융권 고객사');
  const projectLabel = prj?.name || bracketText || `${post.required_domain} 시스템 구축`;

  // Compute start month & D-Day from period (reference date: 2026-11-20)
  const todayMs = new Date('2026-11-20T00:00:00').getTime();
  const ymMatch = String(post.period || '').match(/(202\d)[.-](\d{2})/);
  const startYm = ymMatch ? `${ymMatch[1]}.${ymMatch[2]}` : '2026.12';
  let targetStartDateStr = prj?.start_date || `${startYm.replace('.', '-')}-01`;
  if (startYm === '2026.12' && (!prj?.start_date || prj.start_date < '2026-11-20')) {
    targetStartDateStr = '2026-12-01';
  }
  const startMs = new Date(`${targetStartDateStr}T00:00:00`).getTime();
  const dDay = Math.max(1, Math.round((startMs - todayMs) / (1000 * 60 * 60 * 24)));
  const isUrgent = post.status === 'OPEN' && dDay <= 15;

  // Elapsed days since posting registration
  const createdMs = new Date(`${post.created_at || '2026-11-10'}T00:00:00`).getTime();
  const elapsedDays = Math.max(0, Math.round((todayMs - createdMs) / (1000 * 60 * 60 * 24)));

  const applicants = resolvePostingApplicants(post);
  const sentCount = Number(post.sourcing_sent_count || 0);
  const openedCount = typeof post.opened_count === 'number'
    ? post.opened_count
    : (Math.max(sentCount, applicants.length) + (sentCount > 0 ? 2 : 0));
  const appliedCount = applicants.length;
  const interviewCount = applicants.filter(a => a.pipeline.code !== 'NEW' && a.pipeline.code !== 'REVIEW').length;
  const unreviewedCount = applicants.filter(a => a.pipeline.code === 'NEW' || a.pipeline.code === 'REVIEW').length;

  // Count matching external talent pool for Target Sourcing CTA
  const matchingPoolCount = profiles.filter(p =>
    !p.is_internal &&
    ((p.domains || []).includes(post.required_domain) ||
      (p.skills || []).some(sk => (post.required_skills || []).includes(sk)))
  ).length || profiles.filter(p => !p.is_internal).length;

  const budgetRange = parsePostingRateRange(post.rate_guide);

  return {
    prj,
    clientName,
    projectLabel,
    cleanTitle: cleanTitle || post.role_name,
    roleSubName: post.role_name && post.role_name !== cleanTitle ? post.role_name : '',
    startYm,
    dDay,
    dDayBadgeText: isUrgent ? `투입 D-${dDay} · ${startYm.slice(5)}월 긴급` : `${startYm.slice(5)}월 투입 (D-${dDay})`,
    isUrgent,
    elapsedDays,
    applicants,
    sentCount,
    openedCount,
    appliedCount,
    interviewCount,
    unreviewedCount,
    matchingPoolCount,
    budgetRange
  };
}

function togglePostingApplicantsExpand(postingId, event) {
  if (event) event.stopPropagation();
  if (!state.sourcingFilters.expandedApplicantPostings) {
    state.sourcingFilters.expandedApplicantPostings = [];
  }
  const arr = state.sourcingFilters.expandedApplicantPostings;
  const idx = arr.indexOf(postingId);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(postingId);
  renderActiveTab();
}

function switchPostingFunnelTab(postingId, tabKey, event) {
  if (event) event.stopPropagation();
  if (!state.sourcingFilters.funnelTabByPosting) {
    state.sourcingFilters.funnelTabByPosting = {};
  }
  const current = state.sourcingFilters.funnelTabByPosting[postingId] || null;
  state.sourcingFilters.funnelTabByPosting[postingId] = current === tabKey ? null : tabKey;
  renderActiveTab();
}

function buildPostingFunnelTabItems(post, meta, activeTab) {
  const { applicants, sentCount, openedCount } = meta;
  const sortedApps = [...applicants].sort((a, b) => b.matchPct - a.matchPct);
  const { profiles = [], permissions, currentUser } = state.data || {};
  const canViewSensitive = Boolean(permissions?.can_view_sensitive_info) && currentUser?.role_group !== 'INTERNAL';
  const isExternalGuest = currentUser?.role_group === 'EXTERNAL';
  const externalProfiles = profiles.filter(p => !p.is_internal);

  // Additional pool candidates who were invited or viewed the posting but haven't applied yet
  const extraPoolCandidates = [
    ...externalProfiles,
    { id: 'ext_s1', name: '강태호', tech_grade: post.required_grade || '고급', experience_years: 12, available_date: '2026-11-29', desired_rate: meta.budgetRange.min + 20, skills: post.required_skills || ['Java', 'Oracle'] },
    { id: 'ext_s2', name: '유하늘', tech_grade: '고급', experience_years: 10, available_date: '2026-12-03', desired_rate: meta.budgetRange.min, skills: post.required_skills || ['Java', 'Spring Boot'] },
    { id: 'ext_s3', name: '정현우', tech_grade: '특급', experience_years: 14, available_date: '2026-11-26', desired_rate: meta.budgetRange.max, skills: post.required_skills || ['Java', 'Oracle'] }
  ].filter(ep => !sortedApps.some(a => a.rawName === ep.name));

  const toExtraItem = (ep, i, stageLabel, stagePillCls, subNote, actionType) => {
    const rawName = ep.name;
    const displayName = isExternalGuest ? `${rawName.charAt(0)}**` : rawName;
    const availDate = ep.available_date || '2026-11-28';
    const availShort = availDate.length >= 10 ? `${availDate.slice(5, 7)}/${availDate.slice(8, 10)}` : availDate;
    const desiredRate = Number(ep.desired_rate || meta.budgetRange.min);
    return {
      isExtraPool: true,
      profileId: ep.id && String(ep.id).startsWith('p_') ? ep.id : null,
      rawName,
      displayName,
      avatarUrl: getAvatarForId(ep.id || rawName),
      grade: ep.tech_grade || post.required_grade || '고급',
      expYears: ep.experience_years || 10,
      availShort,
      desiredRate,
      canViewSensitive,
      rateFitLabel: desiredRate <= meta.budgetRange.max ? '예산 부합' : '협의 필요',
      rateFitTone: desiredRate <= meta.budgetRange.max ? 'fit' : 'over',
      matchedSkills: (ep.skills || post.required_skills || []).slice(0, 3),
      skills: ep.skills || post.required_skills || ['Java'],
      matchPct: Math.max(82, 94 - i * 3),
      pipeline: { code: actionType, label: stageLabel, pillCls: stagePillCls },
      subNote
    };
  };

  if (activeTab === 'INTERVIEW') {
    return sortedApps.filter(a => a.pipeline.code !== 'NEW' && a.pipeline.code !== 'REVIEW');
  }

  if (activeTab === 'SENT') {
    const items = [];
    // Include target-sourced applicants first
    const sourcedApps = sortedApps.filter(a => a.sourceType.includes('타겟')).slice(0, sentCount);
    sourcedApps.forEach(a => {
      items.push({
        ...a,
        customBadgeLabel: '참여신청 전환',
        customBadgeCls: 'evaluated',
        customSubNote: `타겟발송(${post.created_at}) → 참여신청 완료`
      });
    });
    // Fill remaining up to sentCount from extra pool or other applicants
    let poolIdx = 0;
    while (items.length < sentCount && poolIdx < extraPoolCandidates.length) {
      const ep = extraPoolCandidates[poolIdx++];
      items.push(toExtraItem(
        ep,
        poolIdx,
        poolIdx % 2 === 1 ? '열람·응답대기' : '초청발송 완료',
        poolIdx % 2 === 1 ? 'new' : 'interview',
        `발송 ${post.created_at} · 알림톡/이메일 초청`,
        'REMIND'
      ));
    }
    while (items.length < sentCount && items.length < sortedApps.length) {
      const fallbackApp = sortedApps.find(a => !items.some(it => it.rawName === a.rawName));
      if (!fallbackApp) break;
      items.push({
        ...fallbackApp,
        customBadgeLabel: '참여신청 전환',
        customBadgeCls: 'evaluated',
        customSubNote: `타겟발송(${post.created_at}) → 참여신청 완료`
      });
    }
    return items.slice(0, sentCount);
  }

  if (activeTab === 'OPENED') {
    const items = sortedApps.map(a => ({
      ...a,
      customBadgeLabel: '참여신청 완료',
      customBadgeCls: 'interview',
      customSubNote: `${a.sourceType} · 공고 열람 후 지원 완료`
    }));
    let poolIdx = 0;
    while (items.length < openedCount && poolIdx < extraPoolCandidates.length) {
      const ep = extraPoolCandidates[poolIdx++];
      items.push(toExtraItem(
        ep,
        poolIdx,
        '열람·관심등록',
        'new',
        '오픈 구인 링크 3회 열람 · 지원 검토중',
        'NUDGE'
      ));
    }
    return items.slice(0, openedCount);
  }

  // Default: 'APPLIED' (참여신청)
  return sortedApps;
}

function renderPostingApplicantBox(post, options = {}) {
  const meta = getPostingEnrichedMeta(post);
  const { applicants, sentCount, openedCount, appliedCount, interviewCount, unreviewedCount } = meta;
  const permissions = state.data?.permissions || {};
  const canRequest = Boolean(permissions.can_schedule_interviews || permissions.can_manage_postings);

  const tabMap = state.sourcingFilters?.funnelTabByPosting || {};
  const activeTab = tabMap[post.id] || null;

  const tabItems = activeTab ? buildPostingFunnelTabItems(post, meta, activeTab) : [];
  const expandedList = state.sourcingFilters?.expandedApplicantPostings || [];
  const isExpanded = Boolean(options.showAll || expandedList.includes(post.id));
  const maxVisible = 3;
  const visibleItems = isExpanded ? tabItems : tabItems.slice(0, maxVisible);
  const hiddenCount = Math.max(0, tabItems.length - visibleItems.length);

  return `
    <div class="src-applicant-pipeline-box" onclick="event.stopPropagation();">
      <!-- [4단 토글 버튼 바 (디폴트: 미선택, 클릭 시 토글/선택 해제)] -->
      <div class="src-funnel-seg-bar" role="group">
        <button
          type="button"
          class="src-funnel-seg-tab ${activeTab === 'SENT' ? 'active' : ''}"
          aria-pressed="${activeTab === 'SENT'}"
          onclick="switchPostingFunnelTab('${post.id}', 'SENT', event)"
        >
          <span>타겟발송</span>
          <strong>${sentCount}건</strong>
          <svg class="src-funnel-seg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <button
          type="button"
          class="src-funnel-seg-tab ${activeTab === 'OPENED' ? 'active' : ''}"
          aria-pressed="${activeTab === 'OPENED'}"
          onclick="switchPostingFunnelTab('${post.id}', 'OPENED', event)"
        >
          <span>열람·관심</span>
          <strong>${openedCount}명</strong>
          <svg class="src-funnel-seg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <button
          type="button"
          class="src-funnel-seg-tab ${activeTab === 'APPLIED' ? 'active' : ''}"
          aria-pressed="${activeTab === 'APPLIED'}"
          onclick="switchPostingFunnelTab('${post.id}', 'APPLIED', event)"
        >
          <span>참여신청</span>
          <strong class="is-highlight">${appliedCount}명</strong>
          <svg class="src-funnel-seg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <button
          type="button"
          class="src-funnel-seg-tab ${activeTab === 'INTERVIEW' ? 'active' : ''}"
          aria-pressed="${activeTab === 'INTERVIEW'}"
          onclick="switchPostingFunnelTab('${post.id}', 'INTERVIEW', event)"
        >
          <span>면접·검증</span>
          <strong>${interviewCount}명</strong>
          <svg class="src-funnel-seg-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </div>

      ${activeTab ? `
        <div class="src-applicant-box-header">
          <div class="src-applicant-header-left" style="font-size:12.5px; color:#475569; font-weight:500;">
            ${activeTab === 'APPLIED' ? `
              <span>총 <strong style="color:#0f172a;">${appliedCount}명</strong>${unreviewedCount > 0 ? `<span style="color:#cbd5e1; margin:0 7px;">|</span>미검토·신규 <strong style="color:#0f172a;">${unreviewedCount}</strong>` : ''}${interviewCount > 0 ? `<span style="color:#cbd5e1; margin:0 7px;">|</span>면접·검증 <strong style="color:#0f172a;">${interviewCount}</strong>` : ''}</span>
            ` : `
              <span>총 <strong style="color:#0f172a;">${tabItems.length}${activeTab === 'SENT' ? '건' : '명'}</strong></span>
            `}
          </div>
          <div class="src-applicant-header-actions">
            ${activeTab === 'APPLIED' && applicants.length >= 2 ? `
              <button type="button" class="src-mini-action-btn compare" onclick="event.stopPropagation(); openPostingApplicantsCompareModal('${post.id}', 'APPLIED')" title="참여신청 지원자 ${applicants.length}명 스펙·단가·매칭률 한눈에 비교">
                ${svgIcon('users', 12)} 후보 비교 (${applicants.length})
              </button>
            ` : activeTab === 'INTERVIEW' && interviewCount >= 2 ? `
              <button type="button" class="src-mini-action-btn compare" onclick="event.stopPropagation(); openPostingApplicantsCompareModal('${post.id}', 'INTERVIEW')" title="면접·검증 대상자 ${interviewCount}명 스펙·단가·매칭률 한눈에 비교">
                ${svgIcon('users', 12)} 후보 비교 (${interviewCount})
              </button>
            ` : ''}
          </div>
        </div>

        ${tabItems.length > 0 ? `
          <div class="src-applicant-list">
            ${visibleItems.map(app => {
              const stageLabel = app.customBadgeLabel || app.pipeline.label;
              const stagePillCls = app.customBadgeCls || app.pipeline.pillCls;
              const rowClickJs = app.isExtraPool
                ? (app.profileId ? `openProfileDetailModal('${app.profileId}')` : `openTargetSourcingModal('${post.id}')`)
                : `openApplicantDetailFromPosting('${post.id}', ${app.idx})`;

              return `
                <div class="src-applicant-row" onclick="event.stopPropagation(); ${rowClickJs}">
                  <div class="src-applicant-avatar-wrap">
                    <img src="${app.avatarUrl}" alt="${app.displayName}" class="src-applicant-avatar-img" />
                  </div>

                  <div class="src-applicant-main-info">
                    <div class="src-applicant-top-line">
                      <strong class="src-applicant-name">${app.displayName}</strong>
                      <span class="src-applicant-grade-chip grade-${app.grade}">${app.grade} · ${app.expYears}년</span>
                      <span class="src-applicant-match-chip ${app.matchPct >= 92 ? 'high' : 'mid'}">매칭 ${app.matchPct}%</span>
                      <span class="src-applicant-stage-pill ${stagePillCls}">${stageLabel}</span>
                    </div>
                    <div class="src-applicant-sub-line">
                      ${activeTab === 'INTERVIEW' && app.interviewDate ? `
                        <span>면접 <strong style="color:#1d4ed8;">${app.interviewDate}</strong></span>
                        <span class="src-dot-sep">·</span>
                        <span>면접관 <strong style="color:#0f172a;">${app.interviewerName || '배정완료'}</strong></span>
                      ` : app.customSubNote || app.subNote ? `
                        <span>${app.customSubNote || app.subNote}</span>
                        <span class="src-dot-sep">·</span>
                        <span>가용 <strong style="color:#0f172a;">${app.availShort}</strong></span>
                      ` : `
                        <span>가용 <strong style="color:#0f172a;">${app.availShort}</strong></span>
                        ${app.canViewSensitive ? `
                          <span class="src-dot-sep">·</span>
                          <span>희망 <strong style="color:#0f172a;">${app.desiredRate.toLocaleString()}만</strong> <em class="src-rate-fit-text ${app.rateFitTone}">(${app.rateFitLabel})</em></span>
                        ` : ''}
                        <span class="src-dot-sep">·</span>
                        <span class="src-skill-preview-inline">${app.matchedSkills.slice(0, 3).join(', ') || app.skills.slice(0, 2).join(', ')}</span>
                      `}
                    </div>
                  </div>

                  <div class="src-applicant-row-cta">
                    ${app.isExtraPool ? `
                      <button
                        type="button"
                        class="src-row-quick-btn outline"
                        onclick="event.stopPropagation(); showToast('📩 ${app.displayName} 후보자에게 ${activeTab === 'SENT' ? '타겟 소싱 리마인드' : '간편 지원 독려'} 알림을 발송했습니다.');"
                      >
                        ${activeTab === 'SENT' ? '재발송' : '지원 독려'}
                      </button>
                    ` : canRequest && (app.pipeline.code === 'NEW' || app.pipeline.code === 'REVIEW') ? `
                      <button
                        type="button"
                        class="src-row-quick-btn primary"
                        onclick="event.stopPropagation(); openSourcingInterviewRequestModal('${post.id}', '${app.rawName}', '${app.interviewId}')"
                        title="면접관 배정 및 인터뷰 일정 요청"
                      >
                        인터뷰 요청
                      </button>
                    ` : `
                      <button
                        type="button"
                        class="src-row-quick-btn outline"
                        onclick="event.stopPropagation(); openApplicantDetailFromPosting('${post.id}', ${app.idx})"
                        title="지원자 이력서 및 검증 상세 보기"
                      >
                        ${activeTab === 'INTERVIEW' ? '검증·프로필' : '프로필'}
                      </button>
                    `}
                  </div>
                </div>
              `;
            }).join('')}

            ${hiddenCount > 0 || (isExpanded && tabItems.length > maxVisible) ? `
              <button
                type="button"
                class="src-applicant-more-btn"
                onclick="togglePostingApplicantsExpand('${post.id}', event)"
              >
                ${isExpanded ? '목록 접기 ▲' : `+${hiddenCount}명 더보기 (총 ${tabItems.length}${activeTab === 'SENT' ? '건' : '명'}) ▼`}
              </button>
            ` : ''}
          </div>
        ` : `
          <div class="src-applicant-empty-row">
            <span>해당 단계의 후보자가 없습니다.</span>
          </div>
        `}
      ` : ''}
    </div>
  `;
}

const APPLICANT_FALLBACK_MAP = {
  '이준호': {
    candidate_type: '외주 프리랜서',
    tech_grade: '고급',
    experience_years: 9,
    education: '동국대학교 컴퓨터공학과 학사',
    certifications: ['정보처리기사', 'SQLD'],
    available_from: '2026-11-28',
    desired_rate: 960,
    recommender: '오픈 구인 직접 지원 (신규)',
    domains: ['퇴직연금', '수신/신탁'],
    skills: ['Java', 'Spring Boot', 'Spring Batch', 'Oracle'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: 'IBK기업은행 및 시중은행 퇴직연금 비대면 운용지시·정산 배치 개발 9년차 고급 개발자.',
    career_history: [
      { project: 'IBK기업은행 퇴직연금 비대면 운용지시 및 정산 개선', client: 'IBK기업은행', period: '2024.04 ~ 2026.09', role: '백엔드/배치 개발', tech: 'Java, Spring Batch, Oracle' }
    ]
  },
  '박성진': {
    candidate_type: '외주 프리랜서',
    tech_grade: '고급',
    experience_years: 11,
    education: '서강대학교 컴퓨터공학과 학사',
    certifications: ['정보처리기사', 'SQLP'],
    available_from: '2026-11-25',
    desired_rate: 980,
    recommender: '오픈 구인 직접 지원 (신규)',
    domains: ['퇴직연금', '채널계', '마이데이터'],
    skills: ['React', 'TypeScript', 'WebSquare', 'Spring Boot'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '메이저 증권사·빅테크 비대면 개인형IRP 가입/운용지시 채널 및 WebSquare5·React 하이브리드 UI 개발 11년차.',
    career_history: [
      { project: '한국투자증권 개인형IRP 비대면 채널 및 로보일임 화면 고도화', client: '한국투자증권', period: '2024.06 ~ 2026.10', role: '채널 프론트/백엔드 선임', tech: 'React, TypeScript, WebSquare, Spring Boot' }
    ]
  },
  '김도윤': {
    candidate_type: '외주 프리랜서',
    tech_grade: '고급',
    experience_years: 9,
    education: '중앙대학교 소프트웨어학부 학사',
    certifications: ['정보처리기사', 'SQLD'],
    available_from: '2026-12-10',
    desired_rate: 1000,
    recommender: '오픈 구인 직접 지원 (신규)',
    domains: ['채권', '펀드'],
    skills: ['Java', 'Spring Boot', 'Oracle', '펀드회계'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '외화채권 결제 및 펀드 기준가(NAV) 산출 원장/대외계 인터페이스 개발 9년차.',
    career_history: [
      { project: 'NH투자증권 글로벌 채권 및 외화펀드 결제 시스템 구축', client: 'NH투자증권', period: '2024.03 ~ 2026.09', role: '백엔드 개발', tech: 'Java, Spring Boot, Oracle' }
    ]
  },
  '최민수': {
    candidate_type: '외주 반프리',
    tech_grade: '고급',
    experience_years: 10,
    education: '서울시립대학교 컴퓨터과학부 학사',
    certifications: ['정보처리기사', '투자자산운용사'],
    available_from: '2026-12-15',
    desired_rate: 1020,
    recommender: '타겟소싱 지원 (신규)',
    domains: ['채권', '파생상품'],
    skills: ['Java', 'Spring Boot', 'Oracle', '채권평가'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '투자자산운용사 보유. 채권 시가평가 및 장외파생 상품 정산 엔진 개발 10년차.',
    career_history: [
      { project: '키움증권 채권 시가평가 및 장외파생 원장 고도화', client: '키움증권', period: '2024.05 ~ 2026.10', role: '응용개발', tech: 'Java, Spring Boot, Oracle' }
    ]
  },
  '장민호': {
    candidate_type: '외주 프리랜서',
    tech_grade: '특급',
    experience_years: 15,
    education: '한양대학교 컴퓨터공학과 학사',
    certifications: ['정보처리기사', 'SQLP', 'PMP'],
    available_from: '2026-11-24',
    desired_rate: 1140,
    recommender: '타겟소싱 지원 (신규)',
    domains: ['퇴직연금', '계정계 코어'],
    skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '메이저 증권사·은행 퇴직연금 수수료 일마감 정산 및 ProFrame 대용량 배치 아키텍트 15년차.',
    career_history: [
      { project: '삼성증권 퇴직연금 수수료 및 디폴트옵션 대용량 배치 고도화', client: '삼성증권', period: '2024.02 ~ 2026.10', role: '배치 아키텍트/선임', tech: 'Java, Spring Batch, Oracle, ProFrame' }
    ]
  },
  '윤태영': {
    candidate_type: '외주 프리랜서',
    tech_grade: '특급',
    experience_years: 13,
    education: '경희대학교 소프트웨어융합학과 학사',
    certifications: ['정보처리기사', 'SQLD'],
    available_from: '2026-11-26',
    desired_rate: 1120,
    recommender: '타겟소싱 지원 (신규)',
    domains: ['퇴직연금', '펀드'],
    skills: ['Java', 'Spring Batch', 'Oracle', 'SQL튜닝'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '퇴직연금 로보어드바이저 일임 리밸런싱 배치 및 Oracle 대용량 튜닝 13년차 특급 개발자.',
    career_history: [
      { project: '신한투자증권 연금 로보일임 및 상품결제 배치 구축', client: '신한투자증권', period: '2024.05 ~ 2026.10', role: '선임개발', tech: 'Java, Spring Batch, Oracle' }
    ]
  },
  '배성우': {
    candidate_type: '외주 반프리',
    tech_grade: '고급',
    experience_years: 11,
    education: '건국대학교 컴퓨터공학부 학사',
    certifications: ['정보처리기사', 'OCJP'],
    available_from: '2026-12-01',
    desired_rate: 1080,
    recommender: '오픈 구인 직접 지원 (신규)',
    domains: ['퇴직연금', '신탁/수탁'],
    skills: ['Java', 'Spring Batch', 'Oracle', 'ProFrame'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: 'ProFrame 및 Spring Batch 기반 퇴직연금 부담금·수수료 정산 원장 개발 11년차.',
    career_history: [
      { project: '우리은행 퇴직연금 원장 및 수수료 정산 시스템 개선', client: '우리은행', period: '2024.03 ~ 2026.09', role: '코어/배치 개발', tech: 'Java, ProFrame, Oracle' }
    ]
  },
  '서유진': {
    candidate_type: '외주 프리랜서',
    tech_grade: '특급',
    experience_years: 14,
    education: '숙명여자대학교 컴퓨터과학전공 학사',
    certifications: ['정보처리기사', 'SQLP'],
    available_from: '2026-11-25',
    desired_rate: 1150,
    recommender: '타겟소싱 지원 (신규)',
    domains: ['퇴직연금', '자산운용'],
    skills: ['Java', 'Spring Batch', 'Oracle', 'Spring Boot'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '증권사 IRP/DC 실적배당 상품 매수·매도 결제 및 수수료 정산 배치 14년차.',
    career_history: [
      { project: 'KB증권 퇴직연금 ETF/로보일임 비대면 정산 원장 구축', client: 'KB증권', period: '2024.01 ~ 2026.08', role: '배치 PL', tech: 'Java, Spring Batch, Oracle' }
    ]
  },
  '문정훈': {
    candidate_type: '외주 프리랜서',
    tech_grade: '고급',
    experience_years: 10,
    education: '인하대학교 컴퓨터공학과 학사',
    certifications: ['정보처리기사', 'SQLD'],
    available_from: '2026-12-02',
    desired_rate: 1050,
    recommender: '오픈 구인 직접 지원 (신규)',
    domains: ['퇴직연금'],
    skills: ['Java', 'Spring Batch', 'Oracle'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '퇴직연금 대외계 전문 연동 및 야간 일괄 정산 배치 개발 10년차 고급 기술자.',
    career_history: [
      { project: '하나증권 퇴직연금 대외결제 및 수수료 배치 개발', client: '하나증권', period: '2024.06 ~ 2026.10', role: '백엔드 개발', tech: 'Java, Spring Batch, Oracle' }
    ]
  },
  '안소희': {
    candidate_type: '협력사 소속',
    tech_grade: '고급',
    experience_years: 9,
    education: '홍익대학교 컴퓨터공학과 학사',
    certifications: ['정보처리기사'],
    available_from: '2026-11-27',
    desired_rate: 1030,
    recommender: '오픈 구인 직접 지원 (신규)',
    domains: ['퇴직연금', '채널계'],
    skills: ['Java', 'Spring Boot', 'Oracle'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '퇴직연금 가입자 수수료 계산 모듈 및 원장 API 개발 9년차.',
    career_history: [
      { project: 'NH농협은행 퇴직연금 수수료 산출 및 통계 배치 개발', client: 'NH농협은행', period: '2024.04 ~ 2026.09', role: '응용개발', tech: 'Java, Spring Boot, Oracle' }
    ]
  },
  '고경표': {
    candidate_type: '외주 프리랜서',
    tech_grade: '고급',
    experience_years: 8,
    education: '아주대학교 소프트웨어학과 학사',
    certifications: ['정보처리기사', 'SQLD'],
    available_from: '2026-12-05',
    desired_rate: 1200,
    recommender: '오픈 구인 직접 지원 (신규)',
    domains: ['펀드', '신탁/수탁'],
    skills: ['Java', 'Oracle', 'Spring Boot'],
    status: '참여신청 접수 (서류검토중)',
    resume_summary: '자산운용 및 수탁 결제 원장 배치 개발 8년차.',
    career_history: [
      { project: '신영증권 펀드/신탁 수탁결제 배치 고도화', client: '신영증권', period: '2024.07 ~ 2026.10', role: '백엔드 개발', tech: 'Java, Oracle' }
    ]
  }
};

const PROFILE_EVALUATIONS_MAP = {
  p_1: [
    {
      evaluatorType: '임원',
      evaluatorName: '조성현 상무',
      evaluatorOrg: '사내 금융IT사업본부 (총괄임원)',
      overallScore: 5.0,
      metrics: { expertise: 5.0, satisfaction: 5.0, communication: 5.0, schedule: 5.0, proactivity: 5.0 },
      projectTitle: '신한은행 퇴직연금 차세대 원장 및 정산 시스템 구축',
      contractTags: ['상주 수행', '연금정산 PL', '퇴직연금 코어'],
      contractAmount: '월 1,250만원 (사내기준)',
      durationDays: '270일',
      contractDate: '2024년 03월 04일',
      reviewDate: '2026.10.28.',
      comment: 'DB/DC/IRP 전 영역의 정산 아키텍처 리딩 역량이 독보적입니다. 제안 단계 기술 발표부터 본사업 오픈까지 본부 내 가장 신뢰하는 핵심 PL입니다.'
    },
    {
      evaluatorType: '팀원',
      evaluatorName: '윤서연 차장',
      evaluatorOrg: '사내 데이터아키텍처팀 (함께 수행한 DA)',
      overallScore: 4.9,
      metrics: { expertise: 5.0, satisfaction: 5.0, communication: 4.9, schedule: 4.8, proactivity: 5.0 },
      projectTitle: '신한은행 퇴직연금 차세대 원장 및 정산 시스템 구축',
      contractTags: ['상주 수행', '연금정산 PL', '동료 협업'],
      contractAmount: '월 1,250만원 (사내기준)',
      durationDays: '270일',
      contractDate: '2024년 03월 04일',
      reviewDate: '2026.10.22.',
      comment: '대용량 배치 튜닝 이슈가 발생했을 때 팀원들에게 책임을 전가하지 않고 직접 쿼리와 비즈니스 로직을 함께 분석해 해결해 주셔서 팀원들의 신뢰가 매우 높았습니다.'
    },
    {
      evaluatorType: '고객사',
      evaluatorName: 'nh****** (현업 차장)',
      evaluatorOrg: '농협정보통신',
      overallScore: 5.0,
      metrics: { expertise: 5.0, satisfaction: 5.0, communication: 5.0, schedule: 5.0, proactivity: 5.0 },
      projectTitle: '신한은행 퇴직연금 차세대 원장 및 정산 시스템 구축',
      contractTags: ['기간제(상주)', '개발·PL', '금융코어'],
      contractAmount: '112,500,000원',
      durationDays: '270일',
      contractDate: '2024년 03월 04일',
      reviewDate: '2026.10.30.',
      comment: '현업의 복잡한 연금 수수료·세무 요건을 정확히 이해하고 선제적으로 대안을 제시해 주셔서 차세대 오픈을 무결점으로 마칠 수 있었습니다.'
    }
  ],
  p_2: [
    {
      evaluatorType: 'PM',
      evaluatorName: '김지영 이사',
      evaluatorOrg: '사내 전략제안·소싱팀 (수행 PM)',
      overallScore: 4.9,
      metrics: { expertise: 5.0, satisfaction: 5.0, communication: 4.8, schedule: 5.0, proactivity: 4.8 },
      projectTitle: '삼성자산운용 글로벌 채권·펀드 수탁 결제 플랫폼 구축',
      contractTags: ['상주 수행', '백엔드 아키텍트(AA)', '채권·펀드 MSA'],
      contractAmount: '월 1,050만원 (사내기준)',
      durationDays: '240일',
      contractDate: '2024년 06월 10일',
      reviewDate: '2026.11.02.',
      comment: '글로벌 채권/외화펀드 실시간 결제 전문 연동 및 Kafka 기반 비동기 정합성 설계를 안정적으로 리딩했습니다. 일정 준수와 기술적 문제 해결력이 탁월합니다.'
    },
    {
      evaluatorType: '팀원',
      evaluatorName: '신은숙 부장',
      evaluatorOrg: '사내 코어뱅킹팀 (협업 동료)',
      overallScore: 4.8,
      metrics: { expertise: 5.0, satisfaction: 4.8, communication: 4.8, schedule: 4.8, proactivity: 4.7 },
      projectTitle: '삼성자산운용 글로벌 채권·펀드 수탁 결제 플랫폼 구축',
      contractTags: ['상주 수행', '아키텍처 리딩', '코드리뷰'],
      contractAmount: '월 1,050만원 (사내기준)',
      durationDays: '240일',
      contractDate: '2024년 06월 10일',
      reviewDate: '2026.10.29.',
      comment: '공통 프레임워크와 MSA 트랜잭션 가이드가 명확해서 개발팀원들이 비즈니스 로직에만 집중할 수 있었습니다.'
    }
  ],
  p_3: [
    {
      evaluatorType: 'PL',
      evaluatorName: '정윤희 부장',
      evaluatorOrg: '사내 연금신탁개발팀 (직속 PL)',
      overallScore: 4.7,
      metrics: { expertise: 4.6, satisfaction: 4.8, communication: 4.9, schedule: 4.8, proactivity: 4.6 },
      projectTitle: 'NH농협은행 퇴직연금 비대면 채널 및 스마트고지 고도화',
      contractTags: ['기간제(상주)', '응용개발', '웹·채널'],
      contractAmount: '68,000,000원',
      durationDays: '210일',
      contractDate: '2025년 01월 06일',
      reviewDate: '2026.10.30.',
      comment: '금융 표준 프레임워크 및 WebSquare 화면·API 개발 속도가 빠르며, 현업의 잦은 화면 변경 요청에도 밝은 태도로 끝까지 책임감 있게 대응했습니다.'
    },
    {
      evaluatorType: '팀원',
      evaluatorName: '윤서연 차장',
      evaluatorOrg: '사내 데이터아키텍처팀 (협업 동료)',
      overallScore: 4.8,
      metrics: { expertise: 4.6, satisfaction: 4.8, communication: 5.0, schedule: 4.8, proactivity: 4.8 },
      projectTitle: 'NH농협은행 퇴직연금 비대면 채널 및 스마트고지 고도화',
      contractTags: ['기간제(상주)', '응용개발', '팀워크'],
      contractAmount: '68,000,000원',
      durationDays: '210일',
      contractDate: '2025년 01월 06일',
      reviewDate: '2026.10.27.',
      comment: '백엔드 API 및 DB 인터페이스 협의 시 문서 정리가 깔끔하고 소통이 빨라 협업 만족도가 매우 높았습니다.'
    },
    {
      evaluatorType: '고객사',
      evaluatorName: 'nh****** (고객사 담당)',
      evaluatorOrg: '농협정보통신',
      overallScore: 4.9,
      metrics: { expertise: 4.8, satisfaction: 5.0, communication: 5.0, schedule: 4.9, proactivity: 4.9 },
      projectTitle: 'NH농협은행 퇴직연금 비대면 채널 및 스마트고지 고도화',
      contractTags: ['기간제(상주)', '응용개발', '웹·채널'],
      contractAmount: '68,000,000원',
      durationDays: '210일',
      contractDate: '2025년 01월 06일',
      reviewDate: '2026.10.31.',
      comment: '비대면 채널 및 스마트고지 화면 요건을 정확히 반영하고 일정 내 안정적으로 오픈을 지원해 주었습니다.'
    }
  ],
  p_4: [
    {
      evaluatorType: 'PL',
      evaluatorName: '정윤희 부장',
      evaluatorOrg: '사내 연금신탁개발팀 (프로젝트 PL)',
      overallScore: 5.0,
      metrics: { expertise: 5.0, satisfaction: 5.0, communication: 5.0, schedule: 5.0, proactivity: 5.0 },
      projectTitle: '미래에셋증권 퇴직연금 데이터마트 및 수익률 공시 시스템',
      contractTags: ['상주 수행', 'DA·데이터모델링', 'DW/DM'],
      contractAmount: '월 1,020만원 (사내기준)',
      durationDays: '240일',
      contractDate: '2024년 02월 15일',
      reviewDate: '2026.10.25.',
      comment: '퇴직연금 수익률 공시 및 대용량 배치 SQL 튜닝에서 압도적인 전문성을 보여주었습니다. 배치 수행 시간을 기존 대비 65% 단축하여 프로젝트 성공의 일등공신이었습니다.'
    },
    {
      evaluatorType: '임원',
      evaluatorName: '조성현 상무',
      evaluatorOrg: '사내 금융IT사업본부 (총괄임원)',
      overallScore: 4.9,
      metrics: { expertise: 5.0, satisfaction: 5.0, communication: 4.8, schedule: 5.0, proactivity: 4.9 },
      projectTitle: '미래에셋증권 퇴직연금 데이터마트 및 수익률 공시 시스템',
      contractTags: ['상주 수행', 'DA·SQL튜닝', '핵심인재'],
      contractAmount: '월 1,020만원 (사내기준)',
      durationDays: '240일',
      contractDate: '2024년 02월 15일',
      reviewDate: '2026.10.26.',
      comment: '금융권 데이터 아키텍처와 대용량 배치 튜닝을 모두 소화할 수 있는 핵심 DA 인력으로 차기 전략 입찰 프로젝트에도 최우선 배정 대상입니다.'
    }
  ],
  p_5: [
    {
      evaluatorType: 'PL',
      evaluatorName: '정윤희 부장',
      evaluatorOrg: '사내 연금신탁개발팀 (수행 PL)',
      overallScore: 5.0,
      metrics: { expertise: 5.0, satisfaction: 5.0, communication: 5.0, schedule: 5.0, proactivity: 5.0 },
      projectTitle: '교보생명 퇴직연금 수수료 정산 및 결산 배치 코어 고도화',
      contractTags: ['기간제(상주)', '배치·정산리드', '금융코어'],
      contractAmount: '100,800,000원',
      durationDays: '240일',
      contractDate: '2025년 02월 03일',
      reviewDate: '2026.11.05.',
      comment: '당사 핵심 프로젝트를 2회 연속 무결점으로 완수한 검증된 특급 프리랜서입니다. 복잡한 원리금·실적배당 결산 배치 로직을 오차 없이 구현하고 일정 준수율 100%를 달성했습니다.'
    },
    {
      evaluatorType: 'PM',
      evaluatorName: '김지영 이사',
      evaluatorOrg: '사내 전략제안·소싱팀 (소싱·계약 PM)',
      overallScore: 4.8,
      metrics: { expertise: 5.0, satisfaction: 4.9, communication: 4.7, schedule: 5.0, proactivity: 4.6 },
      projectTitle: '교보생명 퇴직연금 수수료 정산 및 결산 배치 코어 고도화',
      contractTags: ['기간제(상주)', '외주 과장급', '재소싱 1순위'],
      contractAmount: '100,800,000원',
      durationDays: '240일',
      contractDate: '2025년 02월 03일',
      reviewDate: '2026.11.06.',
      comment: '근태 및 보안 규정 준수가 철저하고 사내 정규직 팀원들과도 마찰 없이 융화되어 재계약·재소싱 최우선 인력입니다.'
    },
    {
      evaluatorType: '고객사',
      evaluatorName: 'nh****** (고객사 파트장)',
      evaluatorOrg: '농협정보통신',
      overallScore: 5.0,
      metrics: { expertise: 5.0, satisfaction: 5.0, communication: 5.0, schedule: 5.0, proactivity: 5.0 },
      projectTitle: '교보생명 퇴직연금 수수료 정산 및 결산 배치 코어 고도화',
      contractTags: ['기간제(상주)', '배치·정산리드', '고객사 호평'],
      contractAmount: '100,800,000원',
      durationDays: '240일',
      contractDate: '2025년 02월 03일',
      reviewDate: '2026.11.08.',
      comment: '결산 시즌 대용량 배치 장애 제로를 달성해 주셔서 현업 부서 만족도가 매우 높았습니다.'
    }
  ],
  p_6: [
    {
      evaluatorType: 'PM',
      evaluatorName: '김지영 이사',
      evaluatorOrg: '사내 전략제안·소싱팀 (수행 PM)',
      overallScore: 4.9,
      metrics: { expertise: 5.0, satisfaction: 4.9, communication: 5.0, schedule: 4.8, proactivity: 4.9 },
      projectTitle: '카카오뱅크 개인형IRP 및 마이데이터 자산관리 모바일 채널 개편',
      contractTags: ['기간제(상주)', '프론트엔드·UI', '모바일·웹'],
      contractAmount: '76,000,000원',
      durationDays: '180일',
      contractDate: '2025년 01월 13일',
      reviewDate: '2026.10.18.',
      comment: 'React/TypeScript 기반 비대면 연금 가입 퍼널 및 대시보드 UI 구현 완성도가 매우 높으며, 기획자·디자이너와의 협업 커뮤니케이션이 뛰어납니다.'
    },
    {
      evaluatorType: '팀원',
      evaluatorName: '신은숙 부장',
      evaluatorOrg: '사내 코어뱅킹팀 (백엔드 연동 동료)',
      overallScore: 4.7,
      metrics: { expertise: 4.8, satisfaction: 4.7, communication: 4.9, schedule: 4.6, proactivity: 4.7 },
      projectTitle: '카카오뱅크 개인형IRP 및 마이데이터 자산관리 모바일 채널 개편',
      contractTags: ['기간제(상주)', '프론트엔드 리드', '동료 평가'],
      contractAmount: '76,000,000원',
      durationDays: '180일',
      contractDate: '2025년 01월 13일',
      reviewDate: '2026.10.19.',
      comment: '비동기 API 연동 규격 협의가 빠르고 엣지 케이스 예외 처리를 꼼꼼히 챙겨주어 통합 테스트 기간을 크게 줄였습니다.'
    }
  ],
  p_7: [
    {
      evaluatorType: 'PL',
      evaluatorName: '강동원 차장',
      evaluatorOrg: '사내 자산운용개발팀 (채권·펀드 PL)',
      overallScore: 4.8,
      metrics: { expertise: 5.0, satisfaction: 4.8, communication: 4.7, schedule: 4.8, proactivity: 4.8 },
      projectTitle: '한국자산평가 채권 시가평가 및 장외파생 기준가 산출 엔진 고도화',
      contractTags: ['기간제(상주)', '응용·엔진개발', '채권·펀드'],
      contractAmount: '82,400,000원',
      durationDays: '210일',
      contractDate: '2024년 08월 12일',
      reviewDate: '2026.10.29.',
      comment: '투자자산운용사 자격 기반의 채권 시가평가·경과이자 산출 도메인 지식이 탁월하여 현업 요건을 빠르게 코드로 구현했습니다.'
    },
    {
      evaluatorType: '임원',
      evaluatorName: '조성현 상무',
      evaluatorOrg: '사내 금융IT사업본부 (면접·기술검증)',
      overallScore: 4.6,
      metrics: { expertise: 4.9, satisfaction: 4.6, communication: 4.5, schedule: 4.7, proactivity: 4.5 },
      projectTitle: '한국자산평가 채권 시가평가 및 장외파생 기준가 산출 엔진 고도화',
      contractTags: ['기간제(상주)', '채권평가 개발', '도메인 특화'],
      contractAmount: '82,400,000원',
      durationDays: '210일',
      contractDate: '2024년 08월 12일',
      reviewDate: '2026.10.31.',
      comment: '채권·펀드 수탁 및 기준가(NAV) 도메인 지식이 탄탄하여 증권사/운용사 프로젝트 투입 시 즉시 전력감이 되는 인재입니다.'
    }
  ]
};

function hasWorkedWithCompany(person) {
  if (!person) return false;
  if (person.is_internal) return true;
  if (Number(person.resourced_count || 0) > 0) return true;
  const matchedProfile = (state.data?.profiles || []).find(
    p => p.id === person.id || p.name === person.name
  );
  if (matchedProfile) {
    return Boolean(matchedProfile.is_internal) || Number(matchedProfile.resourced_count || 0) > 0;
  }
  return false;
}

function getProfileEvaluations(person) {
  if (!hasWorkedWithCompany(person)) {
    return [];
  }
  if (person.id && PROFILE_EVALUATIONS_MAP[person.id]) {
    return PROFILE_EVALUATIONS_MAP[person.id];
  }
  const byName = Object.values(state.data?.profiles || []).find(p => p.name === person.name);
  if (byName && PROFILE_EVALUATIONS_MAP[byName.id]) {
    return PROFILE_EVALUATIONS_MAP[byName.id];
  }
  const firstCareer = (person.career_history && person.career_history[0]) || {
    project: `${(person.domains && person.domains[0]) || '금융권'} 스마트 코어·채널 시스템 구축`,
    client: '메이저 금융사',
    role: '선임 개발/기획'
  };
  const baseScore = Number(person.rating || 4.8);
  return [
    {
      evaluatorType: 'PL',
      evaluatorName: '정윤희 부장',
      evaluatorOrg: '사내 연금신탁개발팀 (수행 PL)',
      overallScore: baseScore > 0 ? baseScore : 4.9,
      metrics: { expertise: 5.0, satisfaction: 4.9, communication: 4.8, schedule: 5.0, proactivity: 4.8 },
      projectTitle: firstCareer.project,
      contractTags: ['기간제(상주)', firstCareer.role || '개발·설계', (person.domains && person.domains[0]) || '금융SI'],
      contractAmount: `${((Number(person.contract_rate || person.desired_rate || 950) * 6) * 10000).toLocaleString()}원`,
      durationDays: '180일',
      contractDate: '2025년 03월 07일',
      reviewDate: '2026.10.21.',
      comment: person.review_summary || '프로젝트 수행 기간 동안 높은 기술 전문성과 책임감으로 핵심 과업을 완수하였으며 팀원들과의 호흡도 우수했습니다.'
    }
  ];
}

function renderSegmentedEvalBar(score = 5.0) {
  const filledSegments = Math.max(1, Math.min(5, Math.round(score)));
  const rects = [];
  for (let i = 1; i <= 5; i++) {
    const x = (i - 1) * 22;
    const fill = i <= filledSegments ? '#eab308' : '#e2e8f0';
    rects.push(`<rect x="${x}" y="0" width="20" height="6" rx="2" ry="2" fill="${fill}" />`);
  }
  return `<span class="eval-seg-bar"><svg width="108" height="6" viewBox="0 0 108 6" preserveAspectRatio="none" style="display:block; width:100%; height:6px;">${rects.join('')}</svg></span>`;
}

function renderStarIcons(score = 5.0) {
  const count = Math.max(1, Math.min(5, Math.round(score)));
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<svg width="16" height="16" viewBox="0 0 24 24" fill="${i <= count ? '#facc15' : '#e2e8f0'}" stroke="${i <= count ? '#eab308' : '#cbd5e1'}" stroke-width="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  return `<span style="display:inline-flex; align-items:center; gap:2px;">${html}</span>`;
}

function renderProfileIdentityHeader(person, interviewOverride = null) {
  const empCategory = person.employment_type || (person.is_internal ? '정규직' : '프리랜서');
  const emailText = person.email || 'unee@daum.net';
  const phoneText = person.phone || '010-8748-6503';
  const locationText = person.location || (person.is_internal ? '서울특별시 동작구' : '서울특별시 동작구 · 을지로');
  const workPref = person.work_preference || (person.is_internal ? '여의도 프로젝트 선호' : '외주, 기간제(상주) 선호');
  const careerCount = Array.isArray(person.career_history) ? person.career_history.length : 0;
  const hasRating = person.rating !== null && person.rating !== undefined && Number(person.rating) > 0;
  const workedBefore = hasWorkedWithCompany(person);
  const matchedInv = (interviewOverride && !String(interviewOverride.id || '').startsWith('synthetic_') ? interviewOverride : null) || (state.data?.interviews || []).find(
    i => (person.id && i.candidate_profile_id === person.id) || i.candidate_name === person.name
  );
  const badgeMeta = matchedInv ? getInterviewStageBadgeMeta(matchedInv) : null;

  return `
    <div class="profile-identity-header">
      <div class="profile-identity-avatar">
        <img src="${getAvatarForId(person.id || person.name)}" alt="${person.name}" />
      </div>
      <div class="profile-identity-body">
        <div class="profile-identity-top">
          <span class="profile-identity-name">${person.name}</span>
          <span class="profile-badge-emp">${empCategory}</span>
          <span class="profile-badge-emp">
            ${svgIcon('folder', 12)} 수행이력 ${careerCount}건
          </span>
          ${hasRating ? `
            <span class="profile-badge-emp">
              <span style="color:#f59e0b; font-size:12px; line-height:1;">★</span> ${Number(person.rating).toFixed(1)}
            </span>
          ` : ''}
          <span class="zal-status-pill ${workedBefore ? 'green' : 'gray'}" style="border-radius:999px; padding:3px 10px; font-size:12px;">
            ${workedBefore ? `당사 수행이력 보유 (재소싱 ${person.resourced_count || 1}회)` : '신규 지원 후보자'}
          </span>
          ${badgeMeta ? `<span class="inv-status-badge ${badgeMeta.cls}" style="border-radius:999px; padding:3px 10px; font-size:12px;">${badgeMeta.label}</span>` : ''}
        </div>
        <div class="profile-identity-meta">
          <span class="profile-meta-item">${svgIcon('mail', 13)} ${emailText}</span>
          <span class="profile-meta-sep">|</span>
          <span class="profile-meta-item">${svgIcon('phone', 13)} ${phoneText}</span>
          <span class="profile-meta-sep">|</span>
          <span class="profile-meta-item">${svgIcon('pin', 13)} ${locationText}</span>
          <span class="profile-meta-sep">|</span>
          <span class="profile-meta-item">${svgIcon('briefcase', 13)} ${workPref}</span>
        </div>
      </div>
    </div>
  `;
}

function getEvaluatorBadgeMeta(type) {
  const map = {
    '임원': { label: '임원 평가', bg: '#f1f5f9', color: '#0f172a', avatarBg: '#0f172a' },
    'PM': { label: 'PM 평가', bg: '#eff6ff', color: '#1d4ed8', avatarBg: '#1e3a8a' },
    'PL': { label: 'PL 평가', bg: '#ecfdf5', color: '#047857', avatarBg: '#065f46' },
    '팀원': { label: '팀원(동료) 평가', bg: '#f3e8ff', color: '#6d28d9', avatarBg: '#4c1d95' },
    '고객사': { label: '고객사 평가', bg: '#e0f2fe', color: '#0369a1', avatarBg: '#0369a1' }
  };
  return map[type] || map['PL'];
}

function renderInterviewEvaluationSection(person, interviewOverride = null) {
  const interviews = state.data?.interviews || [];
  const permissions = state.data?.permissions || {};
  const currentUser = state.data?.currentUser || null;
  const inv = interviewOverride || interviews.find(
    i => (person.id && i.candidate_profile_id === person.id) || i.candidate_name === person.name
  );
  if (!inv) return '';

  const hasResults = Array.isArray(inv.checklist_results) && inv.checklist_results.length > 0;
  const canEval = permissions.can_evaluate_interviews || (currentUser && inv.interviewer_user_id === currentUser.id);
  const scoreVal = Number(inv.total_score || 0);

  return `
    <div class="profile-eval-section">
      <div class="profile-eval-header">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <h4 class="profile-eval-title">인터뷰 평가 ${hasResults ? `(검증 ★ ${scoreVal.toFixed(1)}점)` : '(면접 예정)'}</h4>
          <span style="font-size:12px; color:#64748b;">직무역량 및 성향·태도 필수질문 체크리스트 검증 (수행 평가와 별도 관리)</span>
        </div>
        ${canEval ? `
          <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openEvaluateChecklistModal('${inv.id}')">
            ${svgIcon('check', 13)} ${hasResults ? '인터뷰 평가 수정' : '인터뷰 평가 입력'}
          </button>
        ` : ''}
      </div>

      <div class="profile-eval-card">
        <div class="eval-client-row">
          <div class="eval-client-logo" style="background-color:#334155;">면접</div>
          <div class="eval-client-info">
            <div class="eval-client-top">
              <span class="eval-client-tag" style="background-color:#f1f5f9; color:#334155;">인터뷰 면접관</span>
              <strong class="eval-client-code">${inv.interviewer_name || '조성현 상무'}</strong>
              <span class="eval-client-sep">|</span>
              <span class="eval-client-name">일시: ${inv.interview_date || '미지정'} (${inv.interview_method || '화상'}) · 상태: ${inv.status}</span>
            </div>
            ${hasResults ? `
              <div class="eval-client-rating">
                ${renderStarIcons(scoreVal)}
                <strong class="eval-score-num">${scoreVal.toFixed(2)}</strong>
              </div>
            ` : `
              <div style="font-size:13px; color:#d97706; font-weight:500; margin-top:2px;">
                아직 인터뷰 평가 입력 전입니다. 면접 진행 후 필수질문 체크리스트 평가를 등록하세요.
              </div>
            `}
          </div>
        </div>

        ${hasResults ? `
          <div class="eval-detail-box">
            <div style="padding:14px 18px; background:#ffffff; display:flex; flex-direction:column; gap:10px;">
              ${inv.checklist_results.map((item, idx) => `
                <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; font-size:13px; border-bottom:${idx < inv.checklist_results.length - 1 ? '1px solid #f1f5f9' : 'none'}; padding-bottom:${idx < inv.checklist_results.length - 1 ? '8px' : '0'};">
                  <div style="flex:1; min-width:220px; color:#1e293b; font-weight:500;">
                    <span style="color:#64748b; font-weight:600; margin-right:4px;">Q${idx + 1}.</span>${item.question}
                  </div>
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:12px; color:#64748b; background:#f8fafc; padding:2px 8px; border-radius:6px; border:1px solid #e2e8f0;">${item.note || '검증 완료'}</span>
                    ${renderSegmentedEvalBar(item.score)}
                    <strong class="eval-metric-val">${Number(item.score || 4.5).toFixed(1)}</strong>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="eval-comment-block">
            <div class="eval-comment-head">
              <strong>면접관 종합 평가 의견</strong>
              <span>${(inv.interview_date || '2026.11.13').slice(0, 10).replace(/-/g, '.')}.</span>
            </div>
            <div class="eval-comment-body">${inv.interviewer_opinion || '직무 역량 및 협업 태도 검증 완료.'}</div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderProfileEvaluationSection(person) {
  const canViewSensitive = Boolean(state.data?.permissions?.can_view_sensitive_info);
  const isInternalRole = state.data?.currentUser?.role_group === 'INTERNAL';
  if (isInternalRole && !canViewSensitive) {
    return '';
  }
  const evaluations = getProfileEvaluations(person);
  if (!evaluations || evaluations.length === 0) {
    return '';
  }
  const avgTotal = (evaluations.reduce((s, e) => s + Number(e.overallScore || 5), 0) / evaluations.length).toFixed(2);
  return `
    <div class="profile-eval-section">
      <div class="profile-eval-header">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <h4 class="profile-eval-title">프로젝트 수행 다면 평가 (${evaluations.length}건 · 평균 ★ ${avgTotal})</h4>
          <span style="font-size:12px; color:#64748b;">당사 프로젝트 수행 인력 대상 — 사내 임원 · PM · PL · 동료 팀원 및 고객사 평가</span>
        </div>
      </div>
      ${evaluations.map(ev => {
        const badgeMeta = getEvaluatorBadgeMeta(ev.evaluatorType);
        return `
          <div class="profile-eval-card">
            <div class="eval-client-row">
              <div class="eval-client-logo" style="background-color:${badgeMeta.avatarBg};">${ev.evaluatorType}</div>
              <div class="eval-client-info">
                <div class="eval-client-top">
                  <span class="eval-client-tag" style="background-color:${badgeMeta.bg}; color:${badgeMeta.color};">${badgeMeta.label}</span>
                  <strong class="eval-client-code">${ev.evaluatorName}</strong>
                  <span class="eval-client-sep">|</span>
                  <span class="eval-client-name">${ev.evaluatorOrg}</span>
                </div>
                <div class="eval-client-rating">
                  ${renderStarIcons(ev.overallScore)}
                  <strong class="eval-score-num">${Number(ev.overallScore).toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <div class="eval-detail-box">
              <div class="eval-metrics-grid">
                <div class="eval-metric-item">
                  <span class="eval-metric-label">전문성</span>
                  ${renderSegmentedEvalBar(ev.metrics.expertise)}
                  <strong class="eval-metric-val">${ev.metrics.expertise.toFixed(2)}</strong>
                </div>
                <div class="eval-metric-item">
                  <span class="eval-metric-label">만족도</span>
                  ${renderSegmentedEvalBar(ev.metrics.satisfaction)}
                  <strong class="eval-metric-val">${ev.metrics.satisfaction.toFixed(2)}</strong>
                </div>
                <div class="eval-metric-item">
                  <span class="eval-metric-label">의사소통</span>
                  ${renderSegmentedEvalBar(ev.metrics.communication)}
                  <strong class="eval-metric-val">${ev.metrics.communication.toFixed(2)}</strong>
                </div>
                <div class="eval-metric-item">
                  <span class="eval-metric-label">일정 준수</span>
                  ${renderSegmentedEvalBar(ev.metrics.schedule)}
                  <strong class="eval-metric-val">${ev.metrics.schedule.toFixed(2)}</strong>
                </div>
                <div class="eval-metric-item">
                  <span class="eval-metric-label">적극성</span>
                  ${renderSegmentedEvalBar(ev.metrics.proactivity)}
                  <strong class="eval-metric-val">${ev.metrics.proactivity.toFixed(2)}</strong>
                </div>
              </div>

              <div class="eval-project-box">
                <div class="eval-project-title">${ev.projectTitle} ›</div>
                <div class="eval-project-tags">
                  ${ev.contractTags.map(t => `<span>${t}</span>`).join('<span class="eval-tag-sep">|</span>')}
                </div>
                <div class="eval-project-meta">
                  <span>계약·기준금액 <strong>${ev.contractAmount}</strong></span>
                  <span class="eval-tag-sep">|</span>
                  <span>프로젝트 기간 <strong>${ev.durationDays}</strong></span>
                  <span class="eval-tag-sep">|</span>
                  <span>최초 투입·계약일 <strong>${ev.contractDate}</strong></span>
                </div>
              </div>
            </div>

            <div class="eval-comment-block">
              <div class="eval-comment-head">
                <strong>함께 일한 소감</strong>
                <span>${ev.reviewDate}</span>
              </div>
              <div class="eval-comment-body">${ev.comment}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function switchProfileDetailModalTab(tabKey, btnEl) {
  const container = btnEl?.closest('.profile-detail-tabs-root') || document.getElementById('tab-profiles') || document.getElementById('modalBody') || document;
  container.querySelectorAll('[data-pdetail-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-pdetail-tab') === tabKey);
  });
  container.querySelectorAll('[data-pdetail-panel]').forEach(panel => {
    panel.style.display = panel.getAttribute('data-pdetail-panel') === tabKey ? 'block' : 'none';
  });
  container.querySelectorAll('[data-pdetail-actions]').forEach(act => {
    act.style.display = act.getAttribute('data-pdetail-actions') === tabKey ? 'inline-flex' : 'none';
  });
}

function buildProfileTabExportHtml(p, tabKey, containerEl) {
  const panel = containerEl?.querySelector(`[data-pdetail-panel="${tabKey}"]`);
  const contentHtml = panel ? panel.innerHTML : '';
  const docTitle = tabKey === 'profile'
    ? `I. 인력프로필 — ${p.name} (${p.tech_grade || ''})`
    : `프로젝트 수행 다면평가 리포트 — ${p.name} (${p.tech_grade || ''})`;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>${docTitle}</title>
  <link rel="stylesheet" href="${window.location.origin}/styles.css" />
  <style>
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { font-family: 'Pretendard', 'Malgun Gothic', sans-serif; color: #0f172a; background: #ffffff; padding: 28px; margin: 0; }
    .export-doc-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 18px 0; padding-bottom: 10px; border-bottom: 2px solid #0f172a; }
    .eval-metrics-grid { grid-template-columns: repeat(3, 1fr) !important; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th, td { border: 1px solid #cbd5e1; padding: 7px 10px; font-size: 12.5px; }
    th { background: #f8fafc; font-weight: 700; text-align: center; }
    .no-print, button { display: none !important; }
  </style>
</head>
<body>
  <h2 class="export-doc-title">${docTitle}</h2>
  ${contentHtml}
</body>
</html>`;
}

function printProfileTabSection(profileId, tabKey, btnEl) {
  const { profiles = [] } = state.data || {};
  const p = profiles.find(x => x.id === profileId) || { id: profileId, name: '인재', tech_grade: '' };
  const container = btnEl?.closest('.profile-detail-tabs-root') || document.getElementById('tab-profiles') || document;
  const html = buildProfileTabExportHtml(p, tabKey, container);
  const win = window.open('', '_blank', 'width=960,height=800');
  if (!win) {
    window.print();
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
  setTimeout(() => {
    win.focus();
    win.print();
  }, 350);
}

async function downloadProfileTabFile(profileId, tabKey) {
  const { profiles = [], interviews = [] } = state.data || {};
  const p = profiles.find(x => x.id === profileId);
  if (!p) return;

  if (typeof window.PptxGenJS !== 'function') {
    showToast('PPT 생성 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    return;
  }

  const pptx = new window.PptxGenJS();
  pptx.defineLayout({ name: 'A4_PORTRAIT', width: 8.27, height: 11.69 });
  pptx.layout = 'A4_PORTRAIT';

  const borderOpt = { pt: 0.75, color: 'CBD5E1' };
  const headFill = { color: 'F1F5F9' };
  const baseFont = 'Malgun Gothic';

  if (tabKey === 'profile') {
    const eduTokens = String(p.education || '').trim().split(/\s+/).filter(Boolean);
    const schoolName = p.school_name || eduTokens[0] || '';
    const degree = p.degree || (eduTokens.find(t => /학사|석사|박사|전문학사/.test(t)) || '');
    const major = p.major || eduTokens.slice(1).filter(t => t !== degree && t !== '졸업').join(' ') || '';

    const slide1 = pptx.addSlide();
    slide1.addText('I. 인력프로필', { x: 0.45, y: 0.35, w: 7.37, h: 0.4, fontSize: 16, bold: true, color: '0F172A', fontFace: baseFont });

    // 1. 신상기록
    slide1.addText('1. 신상기록', { x: 0.45, y: 0.82, w: 7.37, h: 0.28, fontSize: 11, bold: true, color: '0F172A', fontFace: baseFont });
    const personalRows = [
      [
        { text: '성명', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.name || '', options: { align: 'center', bold: true } },
        { text: '주민번호', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.ssn_masked || '', options: { colspan: 2, align: 'center' } },
        { text: '성별', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.gender_age || '', options: { colspan: 2, align: 'center' } }
      ],
      [
        { text: '소속회사', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.company_name || p.employment_type || '', options: { align: 'center' } },
        { text: '직위', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.job_title || '', options: { colspan: 2, align: 'center' } },
        { text: '투입일자', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.available_date_display !== undefined ? p.available_date_display : (p.available_date || ''), options: { colspan: 2, align: 'center' } }
      ],
      [
        { text: '최종학교', options: { fill: headFill, bold: true, align: 'center' } },
        { text: schoolName, options: { align: 'center' } },
        { text: '졸업년월', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.grad_ym || '', options: { align: 'center' } },
        { text: '전공', options: { fill: headFill, bold: true, align: 'center' } },
        { text: major, options: { align: 'center' } },
        { text: '학위', options: { fill: headFill, bold: true, align: 'center' } },
        { text: degree, options: { align: 'center' } }
      ],
      [
        { text: '해당분야근무경력', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.career_ym_text || `${p.experience_years || 0}년`, options: { align: 'center' } },
        { text: '등급', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.tech_grade || '', options: { align: 'center', bold: true } },
        { text: '주전문기술', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.main_skill || (p.skills || [])[0] || '', options: { align: 'center' } },
        { text: '참여여부', options: { fill: headFill, bold: true, align: 'center' } },
        { text: p.participation_yn || '', options: { align: 'center' } }
      ]
    ];
    slide1.addTable(personalRows, {
      x: 0.45, y: 1.12, w: 7.37,
      colW: [1.05, 1.35, 0.85, 1.1, 0.85, 0.97, 0.6, 0.6],
      border: borderOpt, fontFace: baseFont, fontSize: 8.5, valign: 'middle', rowH: 0.28
    });

    // 2. 경력 & 3. 자격증
    const compList = (Array.isArray(p.company_history) && p.company_history.length > 0) ? p.company_history.slice() : [{}, {}, {}, {}];
    while (compList.length < 4) compList.push({});
    const certList = (Array.isArray(p.cert_details) && p.cert_details.length > 0)
      ? p.cert_details.slice()
      : (Array.isArray(p.certifications) ? p.certifications.map(c => ({ name: c, date: '' })) : []);
    while (certList.length < compList.length) certList.push({});

    slide1.addText('2. 경력', { x: 0.45, y: 2.38, w: 4.5, h: 0.26, fontSize: 11, bold: true, color: '0F172A', fontFace: baseFont });
    slide1.addText('3. 자격증', { x: 5.1, y: 2.38, w: 2.72, h: 0.26, fontSize: 11, bold: true, color: '0F172A', fontFace: baseFont });

    const compRows = [
      [
        { text: '회사명', options: { fill: headFill, bold: true, align: 'center' } },
        { text: '기간', options: { fill: headFill, bold: true, align: 'center' } },
        { text: '직위', options: { fill: headFill, bold: true, align: 'center' } },
        { text: '담당업무', options: { fill: headFill, bold: true, align: 'center' } }
      ],
      ...compList.map(c => [
        { text: c.company || '', options: { align: 'center' } },
        { text: c.period || '', options: { align: 'center' } },
        { text: c.position || '', options: { align: 'center' } },
        { text: c.duty || '', options: { align: 'center' } }
      ])
    ];
    slide1.addTable(compRows, {
      x: 0.45, y: 2.66, w: 4.5,
      colW: [1.35, 1.45, 0.8, 0.9],
      border: borderOpt, fontFace: baseFont, fontSize: 8.5, valign: 'middle', rowH: 0.25
    });

    const certRows = [
      [
        { text: '자격증명', options: { fill: headFill, bold: true, align: 'center' } },
        { text: '취득일', options: { fill: headFill, bold: true, align: 'center' } }
      ],
      ...certList.map(c => [
        { text: c.name || '', options: { align: 'center' } },
        { text: c.date || '', options: { align: 'center' } }
      ])
    ];
    slide1.addTable(certRows, {
      x: 5.1, y: 2.66, w: 2.72,
      colW: [1.72, 1.0],
      border: borderOpt, fontFace: baseFont, fontSize: 8.5, valign: 'middle', rowH: 0.25
    });

    // 4. 개인이력 (Slide 1 + Paginated Slides)
    const careerList = (Array.isArray(p.career_history) && p.career_history.length > 0) ? p.career_history.slice() : [{}, {}, {}, {}, {}];
    const compTableBottomY = 2.66 + (compRows.length * 0.26) + 0.18;
    slide1.addText('4. 개인이력', { x: 0.45, y: compTableBottomY, w: 7.37, h: 0.26, fontSize: 11, bold: true, color: '0F172A', fontFace: baseFont });

    const firstSlideCount = 15;
    const nextSlideCount = 30;
    const careerHeadRow = [
      { text: '프로젝트명', options: { fill: headFill, bold: true, align: 'center' } },
      { text: '참여기간', options: { fill: headFill, bold: true, align: 'center' } },
      { text: '담당업무', options: { fill: headFill, bold: true, align: 'center' } },
      { text: '고객사', options: { fill: headFill, bold: true, align: 'center' } }
    ];

    const slice1 = careerList.slice(0, firstSlideCount);
    slide1.addTable([
      careerHeadRow,
      ...slice1.map(item => [
        { text: item.project || '', options: { align: 'center' } },
        { text: item.period || '', options: { align: 'center' } },
        { text: item.role || '', options: { align: 'center' } },
        { text: item.client || '', options: { align: 'center' } }
      ])
    ], {
      x: 0.45, y: compTableBottomY + 0.28, w: 7.37,
      colW: [3.25, 1.32, 1.62, 1.18],
      border: borderOpt, fontFace: baseFont, fontSize: 8.5, valign: 'middle', rowH: 0.25
    });

    for (let idx = firstSlideCount; idx < careerList.length; idx += nextSlideCount) {
      const chunk = careerList.slice(idx, idx + nextSlideCount);
      const slideN = pptx.addSlide();
      slideN.addText('I. 인력프로필 (계속)', { x: 0.45, y: 0.35, w: 7.37, h: 0.35, fontSize: 14, bold: true, color: '0F172A', fontFace: baseFont });
      slideN.addTable([
        careerHeadRow,
        ...chunk.map(item => [
          { text: item.project || '', options: { align: 'center' } },
          { text: item.period || '', options: { align: 'center' } },
          { text: item.role || '', options: { align: 'center' } },
          { text: item.client || '', options: { align: 'center' } }
        ])
      ], {
        x: 0.45, y: 0.8, w: 7.37,
        colW: [3.25, 1.32, 1.62, 1.18],
        border: borderOpt, fontFace: baseFont, fontSize: 8.5, valign: 'middle', rowH: 0.25
      });
    }

    await pptx.writeFile({ fileName: `인력프로필_${p.name}_${p.tech_grade || '프로필'}.pptx` });
    showToast('프로필 PPT(.pptx) 파일이 다운로드되었습니다.');
  } else {
    const slide = pptx.addSlide();
    slide.addText(`프로젝트 수행 다면평가 리포트 — ${p.name} (${p.tech_grade || ''})`, {
      x: 0.45, y: 0.35, w: 7.37, h: 0.4, fontSize: 15, bold: true, color: '0F172A', fontFace: baseFont
    });

    const evaluations = getProfileEvaluations(p) || [];
    const inv = interviews.find(i => i.candidate_profile_id === p.id || i.candidate_name === p.name);
    let curY = 0.9;

    if (inv) {
      slide.addText(`인터뷰 검증 평가 (★ ${Number(inv.total_score || 0).toFixed(1)}점)`, {
        x: 0.45, y: curY, w: 7.37, h: 0.28, fontSize: 11, bold: true, color: '0F172A', fontFace: baseFont
      });
      slide.addTable([
        [
          { text: '면접관', options: { fill: headFill, bold: true, align: 'center' } },
          { text: inv.interviewer_name || '조성현 상무', options: { align: 'center' } },
          { text: '면접일시', options: { fill: headFill, bold: true, align: 'center' } },
          { text: `${inv.interview_date || '-'} (${inv.interview_method || '화상'})`, options: { align: 'center' } },
          { text: '검증점수', options: { fill: headFill, bold: true, align: 'center' } },
          { text: `${Number(inv.total_score || 0).toFixed(2)} / 5.00`, options: { align: 'center', bold: true } }
        ],
        [
          { text: '면접 총평', options: { fill: headFill, bold: true, align: 'center' } },
          { text: inv.interviewer_opinion || inv.resume_summary || '-', options: { colspan: 5, align: 'left' } }
        ]
      ], {
        x: 0.45, y: curY + 0.3, w: 7.37,
        colW: [1.0, 1.4, 1.0, 1.6, 1.0, 1.37],
        border: borderOpt, fontFace: baseFont, fontSize: 8.5, valign: 'middle', rowH: 0.32
      });
      curY += 1.25;
    }

    slide.addText(`프로젝트 수행 다면 평가 (${evaluations.length}건)`, {
      x: 0.45, y: curY, w: 7.37, h: 0.28, fontSize: 11, bold: true, color: '0F172A', fontFace: baseFont
    });

    const fmtBar = (val = 5) => {
      const filled = Math.max(1, Math.min(5, Math.round(val)));
      return '■'.repeat(filled) + '□'.repeat(5 - filled) + ` ${Number(val).toFixed(2)}`;
    };

    const evalRows = [
      [
        { text: '평가구분', options: { fill: headFill, bold: true, align: 'center' } },
        { text: '평가자 / 소속', options: { fill: headFill, bold: true, align: 'center' } },
        { text: '수행 프로젝트', options: { fill: headFill, bold: true, align: 'center' } },
        { text: '항목별 평가 그래프', options: { fill: headFill, bold: true, align: 'center' } },
        { text: '함께 일한 소감', options: { fill: headFill, bold: true, align: 'center' } }
      ],
      ...evaluations.map(ev => {
        const m = ev.metrics || { expertise: 5, satisfaction: 5, communication: 5, schedule: 5, proactivity: 5 };
        const metricsText = [
          `전문성 ${fmtBar(m.expertise)}`,
          `만족도 ${fmtBar(m.satisfaction)}`,
          `의사소통 ${fmtBar(m.communication)}`,
          `일정준수 ${fmtBar(m.schedule)}`,
          `적극성 ${fmtBar(m.proactivity)}`
        ].join('\n');
        return [
          { text: `${ev.evaluatorType} 평가\n(★ ${Number(ev.overallScore || 5).toFixed(2)})`, options: { align: 'center', bold: true } },
          { text: `${ev.evaluatorName}\n(${ev.evaluatorOrg})`, options: { align: 'center' } },
          { text: `${ev.projectTitle}\n(${ev.durationDays})`, options: { align: 'left' } },
          { text: metricsText, options: { align: 'left', color: 'B45309', fontSize: 7.8 } },
          { text: ev.comment || '', options: { align: 'left' } }
        ];
      })
    ];

    slide.addTable(evalRows, {
      x: 0.45, y: curY + 0.3, w: 7.37,
      colW: [0.85, 1.15, 1.55, 1.55, 2.27],
      border: borderOpt, fontFace: baseFont, fontSize: 8.2, valign: 'middle', rowH: 0.85
    });

    await pptx.writeFile({ fileName: `다면평가리포트_${p.name}_${p.tech_grade || '프로필'}.pptx` });
    showToast('다면평가 PPT(.pptx) 파일이 다운로드되었습니다.');
  }
}

function renderProfileDetailTabsSection(p, interviewOverride = null, isPageView = false) {
  const eduTokens = String(p.education || '').trim().split(/\s+/).filter(Boolean);
  const schoolName = p.school_name || eduTokens[0] || '';
  const degree = p.degree || (eduTokens.find(t => /학사|석사|박사|전문학사/.test(t)) || '');
  const major = p.major || eduTokens.slice(1).filter(t => t !== degree && t !== '졸업').join(' ') || '';

  const compList = Array.isArray(p.company_history) && p.company_history.length > 0
    ? p.company_history.slice()
    : [];
  while (compList.length < 4) compList.push({});

  const certList = Array.isArray(p.cert_details) && p.cert_details.length > 0
    ? p.cert_details.slice()
    : (Array.isArray(p.certifications) && p.certifications.length > 0
      ? p.certifications.map(c => ({ name: c, date: '' }))
      : []);
  while (certList.length < Math.max(4, compList.length)) certList.push({});

  const careerList = Array.isArray(p.career_history) && p.career_history.length > 0
    ? p.career_history.slice()
    : [];
  while (careerList.length < 5) careerList.push({});

  const interviewEvalHtml = renderInterviewEvaluationSection(p, interviewOverride);
  const multiEvalHtml = renderProfileEvaluationSection(p);
  const hasAnyEval = Boolean(interviewEvalHtml.trim() || multiEvalHtml.trim());

  const stickyTopStyle = isPageView
    ? 'position:sticky; top:55px; z-index:35; background:#ffffff; margin:-4px -22px 18px -22px; padding:20px 22px 0 22px;'
    : 'position:sticky; top:-22px; z-index:35; background:#ffffff; margin:-8px -24px 18px -24px; padding:20px 24px 0 24px;';

  return `
    <div class="profile-detail-tabs-root">
      <div class="profile-line-tabs-bar" style="${stickyTopStyle}">
        <button type="button" class="profile-line-tab-btn active" data-pdetail-tab="profile" onclick="switchProfileDetailModalTab('profile', this)">
          프로필
        </button>
        <button type="button" class="profile-line-tab-btn" data-pdetail-tab="evaluations" onclick="switchProfileDetailModalTab('evaluations', this)">
          다면평가
        </button>
        <div data-pdetail-actions="profile" style="margin-left:auto; padding-bottom:7px; display:inline-flex; align-items:center; gap:8px;">
          <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="printProfileTabSection('${p.id}', 'profile', this)">
            ${svgIcon('printer', 13)} 인쇄
          </button>
          <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="downloadProfileTabFile('${p.id}', 'profile', this)">
            ${svgIcon('download', 13)} 파일 다운로드
          </button>
        </div>
        <div data-pdetail-actions="evaluations" style="margin-left:auto; padding-bottom:7px; display:none; align-items:center; gap:8px;">
          <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="printProfileTabSection('${p.id}', 'evaluations', this)">
            ${svgIcon('printer', 13)} 인쇄
          </button>
          <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="downloadProfileTabFile('${p.id}', 'evaluations', this)">
            ${svgIcon('download', 13)} 파일 다운로드
          </button>
        </div>
      </div>

      <!-- TAB 1: 프로필 (1. 신상기록, 2. 경력, 3. 자격증, 4. 개인이력) -->
      <div data-pdetail-panel="profile" style="display:block;">
        <div class="std-profile-sheet">
          <!-- 1. 신상기록 -->
          <div class="std-section-block">
            <div class="std-section-head-row">
              <span class="std-section-title">1. 신상기록</span>
            </div>
            <div class="std-table-wrap">
              <table class="std-form-table std-personal-table">
                <colgroup>
                  <col style="width:13%;" />
                  <col style="width:20%;" />
                  <col style="width:11%;" />
                  <col style="width:16%;" />
                  <col style="width:11%;" />
                  <col style="width:13%;" />
                  <col style="width:8%;" />
                  <col style="width:8%;" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>성명</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; font-weight:600;">${p.name || ''}</td>
                    <th>주민번호</th>
                    <td colspan="2" style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.ssn_masked || ''}</td>
                    <th>성별</th>
                    <td colspan="2" style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.gender_age || ''}</td>
                  </tr>
                  <tr>
                    <th>소속회사</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.company_name || p.employment_type || ''}</td>
                    <th>직위</th>
                    <td colspan="2" style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.job_title || ''}</td>
                    <th>투입일자</th>
                    <td colspan="2" style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.available_date_display !== undefined ? p.available_date_display : (p.available_date || '')}</td>
                  </tr>
                  <tr>
                    <th>최종학교</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${schoolName}</td>
                    <th>졸업년월</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.grad_ym || ''}</td>
                    <th>전공</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${major}</td>
                    <th>학위</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${degree}</td>
                  </tr>
                  <tr>
                    <th>해당분야근무경력</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.career_ym_text || (p.experience_years ? `${p.experience_years}년` : '')}</td>
                    <th>등급</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; font-weight:600;">${p.tech_grade || ''}</td>
                    <th>주전문기술</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.main_skill || (Array.isArray(p.skills) ? p.skills.slice(0, 2).join(', ') : '')}</td>
                    <th>참여여부</th>
                    <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a;">${p.participation_yn || ''}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 2. 경력 & 3. 자격증 -->
          <div class="std-two-col-row">
            <div class="std-section-block">
              <div class="std-section-head-row">
                <span class="std-section-title">2. 경력</span>
              </div>
              <div class="std-table-wrap">
                <table class="std-form-table std-blue-head">
                  <colgroup>
                    <col style="width:30%;" />
                    <col style="width:32%;" />
                    <col style="width:18%;" />
                    <col style="width:20%;" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>회사명</th>
                      <th>기간</th>
                      <th>직위</th>
                      <th>담당업무</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${compList.map(item => `
                      <tr>
                        <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:35px;">${item.company || ''}</td>
                        <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:35px;">${item.period || ''}</td>
                        <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:35px;">${item.position || ''}</td>
                        <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:35px;">${item.duty || ''}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="std-section-block">
              <div class="std-section-head-row">
                <span class="std-section-title">3. 자격증</span>
              </div>
              <div class="std-table-wrap">
                <table class="std-form-table std-blue-head">
                  <colgroup>
                    <col style="width:62%;" />
                    <col style="width:38%;" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>자격증명</th>
                      <th>취득일</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${certList.map(item => `
                      <tr>
                        <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:35px;">${item.name || ''}</td>
                        <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:35px;">${item.date || ''}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 4. 개인이력 -->
          <div class="std-section-block">
            <div class="std-section-head-row">
              <span class="std-section-title">4. 개인이력</span>
            </div>
            <div class="std-table-wrap">
              <table class="std-form-table std-blue-head">
                <colgroup>
                  <col style="width:44%;" />
                  <col style="width:18%;" />
                  <col style="width:22%;" />
                  <col style="width:16%;" />
                </colgroup>
                <thead>
                  <tr>
                    <th>프로젝트명</th>
                    <th>참여기간</th>
                    <th>담당업무</th>
                    <th>고객사</th>
                  </tr>
                </thead>
                <tbody>
                  ${careerList.map(item => `
                    <tr>
                      <td style="text-align:center; padding:8px 12px; font-size:13px; color:#0f172a; font-weight:500; height:36px;">${item.project || ''}</td>
                      <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:36px;">${item.period || ''}</td>
                      <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:36px;">${item.role || ''}</td>
                      <td style="text-align:center; padding:8px 10px; font-size:13px; color:#0f172a; height:36px;">${item.client || ''}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: 다면평가 -->
      <div data-pdetail-panel="evaluations" style="display:none;">
        <div style="display:flex; flex-direction:column; gap:18px;">
          ${hasAnyEval ? `${interviewEvalHtml}${multiEvalHtml}` : `
            <div style="padding:36px 20px; text-align:center; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; font-size:13.5px;">
              등록된 인터뷰 평가 및 프로젝트 수행 다면 평가 내역이 없습니다.
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

function openProfileDetailModal(profileId, options = {}) {
  const { profiles } = state.data || {};
  const p = (profiles || []).find(x => x.id === profileId);
  if (!p) return;

  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop && !backdrop.classList.contains('hidden')) {
    closeModal();
  }

  state.selectedProfileId = profileId;
  if (state.activeTab !== 'profiles') {
    state.activeTab = 'profiles';
    applyTabDomState('profiles');
  }
  if (!options.fromPopState) {
    pushNavigationState(Boolean(options.replaceHistory));
  }
  renderProfilesTab();
  const scrollArea = document.getElementById('mainScrollArea');
  if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeProfileDetailPage(options = {}) {
  if (!options.fromPopState && window.history.state && window.history.state.profileId) {
    window.history.back();
    return;
  }
  state.selectedProfileId = null;
  if (!options.fromPopState) {
    pushNavigationState(Boolean(options.replaceHistory));
  }
  renderProfilesTab();
}

function resolveUnifiedProfileDetailData(profInput, invInput = null) {
  const { profiles = [], interviews = [], permissions, currentUser } = state.data || {};
  const canViewSensitive = Boolean(permissions?.can_view_sensitive_info);
  const isInternalRole = currentUser?.role_group === 'INTERNAL';
  const hideSensitive = isInternalRole || !canViewSensitive;

  const prof = profInput
    || (invInput ? profiles.find(p => (invInput.candidate_profile_id && p.id === invInput.candidate_profile_id) || p.name === invInput.candidate_name) : null);
  const inv = invInput
    || (prof ? interviews.find(i => i.candidate_profile_id === prof.id || i.candidate_name === prof.name) : null);

  const education = prof?.education || inv?.education || '컴퓨터공학 학사 졸업';
  const experienceYears = prof?.experience_years || inv?.experience_years || 10;
  const certifications = (prof?.certifications && prof.certifications.length > 0)
    ? prof.certifications.join(', ')
    : (Array.isArray(inv?.certifications) && inv.certifications.length > 0 ? inv.certifications.join(', ') : '정보처리기사, SQLD');
  const careerHistory = (prof?.career_history && prof.career_history.length > 0)
    ? prof.career_history
    : (Array.isArray(inv?.career_history) && inv.career_history.length > 0
      ? inv.career_history
      : [
          {
            project: inv?.career_highlight || `${(inv?.domains && inv.domains[0]) || '금융'} 차세대 코어/배치 시스템 구축`,
            client: '메이저 금융사',
            period: '2024.03 ~ 2026.10',
            role: inv?.position_name || '선임/리드 개발',
            tech: (inv?.skills || []).join(', ')
          }
        ]);

  const baseObj = prof || {
    id: inv?.candidate_profile_id,
    name: inv?.candidate_name,
    employment_type: inv?.candidate_type,
    tech_grade: inv?.tech_grade,
    experience_years: experienceYears,
    education,
    certifications: String(certifications || '').split(',').map(s => s.trim()).filter(Boolean),
    available_date: inv?.available_from,
    domains: inv?.domains || ['퇴직연금'],
    skills: inv?.skills || ['Java', 'Oracle'],
    availability_status: '즉시투입가능',
    desired_rate: hideSensitive ? null : inv?.desired_rate,
    rating: hideSensitive ? null : (inv?.total_score > 0 ? inv.total_score : 0),
    review_summary: hideSensitive ? inv?.resume_summary : (inv?.interviewer_opinion || inv?.resume_summary),
    career_history: careerHistory,
    is_internal: 0,
    resourced_count: 0
  };

  const personObj = hideSensitive
    ? { ...baseObj, rating: null, desired_rate: null, contract_rate: null }
    : baseObj;

  return { prof, inv, personObj, hideSensitive, education, experienceYears };
}

function renderUnifiedProfileDetailContentHtml(profInput, invInput = null, options = {}) {
  const { prof, inv, personObj, hideSensitive, education, experienceYears } = resolveUnifiedProfileDetailData(profInput, invInput);
  const isPageView = Boolean(options.isPageView);
  const hasInterviewRecord = Boolean(inv && inv.id && !String(inv.id).startsWith('synthetic_'));
  const isSyntheticApplicant = Boolean(inv && String(inv.id || '').startsWith('synthetic_'));
  const badgeMeta = inv ? getInterviewStageBadgeMeta(inv) : null;

  const eduTokens = String(personObj.education || education || '').trim().split(/\s+/).filter(Boolean);
  const degreeLabel = personObj.degree || eduTokens.find(t => /박사|석사|학사|전문학사/.test(t)) || '학사';
  const schoolAndMajor = (personObj.school_name || personObj.major)
    ? [personObj.school_name, personObj.major].filter(Boolean).join(' ')
    : eduTokens.filter(t => t !== degreeLabel && t !== '졸업').join(' ') || personObj.education || '-';
  const mainDomainSkill = personObj.main_skill || (personObj.domains && personObj.domains[0]) || (personObj.skills && personObj.skills[0]) || '퇴직연금';
  const certItems = (Array.isArray(personObj.certifications) && personObj.certifications.length > 0)
    ? personObj.certifications.filter(Boolean)
    : (Array.isArray(personObj.cert_details) ? personObj.cert_details.map(c => c.name).filter(Boolean) : []);
  const certCount = certItems.length;
  const hasLinkedDbProfile = Boolean(prof && prof.id);
  const rateNum = Number(personObj.is_internal ? (personObj.contract_rate || personObj.desired_rate || 0) : (personObj.desired_rate || personObj.contract_rate || inv?.desired_rate || 0));
  const summaryColCount = (certCount > 0 ? 1 : 0) + (!hideSensitive ? 1 : 0) + 3;

  const canScheduleOrManage = Boolean(state.data?.permissions?.can_schedule_interviews || state.data?.permissions?.can_manage_postings);
  const canEvaluate = Boolean(state.data?.permissions?.can_evaluate_interviews || (state.data?.currentUser && inv?.interviewer_user_id === state.data.currentUser.id));
  const stage = badgeMeta ? badgeMeta.stage : '';

  let topRightActionHtml = '';
  if (isSyntheticApplicant && canScheduleOrManage) {
    topRightActionHtml = `
      <button
        type="button"
        class="btn btn-primary"
        style="height:40px; padding:0 16px; font-size:14px; font-weight:700; border-radius:10px; display:inline-flex; align-items:center; gap:6px;"
        onclick="openSourcingInterviewRequestModal('${inv.posting_id || ''}', '${inv.candidate_name}', '')"
      >
        ${svgIcon('calendar', 15)} 인터뷰 요청
      </button>
    `;
  } else if (hasInterviewRecord) {
    if (stage === '인터뷰 예정' && canScheduleOrManage) {
      topRightActionHtml = `
        <button
          type="button"
          class="btn btn-primary"
          style="height:40px; padding:0 16px; font-size:14px; font-weight:700; border-radius:10px; display:inline-flex; align-items:center; gap:6px;"
          onclick="openScheduleInterviewModal('${inv.id}')"
        >
          ${svgIcon('calendar', 15)} 일정·면접관 관리
        </button>
      `;
    } else if (stage === '평가 대기' && canEvaluate) {
      topRightActionHtml = `
        <button
          type="button"
          class="btn btn-primary"
          style="height:40px; padding:0 16px; font-size:14px; font-weight:700; border-radius:10px; display:inline-flex; align-items:center; gap:6px;"
          onclick="openEvaluateChecklistModal('${inv.id}')"
        >
          ${svgIcon('check', 15)} 면접 평가 작성
        </button>
      `;
    } else if (stage === '평가 완료' || stage === '최종 결과') {
      topRightActionHtml = `
        <button
          type="button"
          class="btn btn-primary"
          style="height:40px; padding:0 16px; font-size:14px; font-weight:700; border-radius:10px; display:inline-flex; align-items:center; gap:6px;"
          onclick="openInterviewResultViewModal('${inv.id}')"
        >
          ${svgIcon('file', 15)} ${stage === '평가 완료' ? '인터뷰 결과 보기' : '결과 상세 보기'}
        </button>
      `;
    }
  }

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
      ${renderProfileIdentityHeader(personObj, inv)}
      ${topRightActionHtml}
    </div>

    <div style="display:grid; grid-template-columns:repeat(${summaryColCount}, minmax(0, 1fr)); gap:14px; margin-bottom:0;">
      <div style="position:relative; padding:16px 18px; border:1px solid #e2e8f0; border-radius:14px; background:#ffffff; display:flex; flex-direction:column; gap:4px;">
        ${hasLinkedDbProfile ? `<button type="button" class="profile-card-gear-btn" onclick="openEditProfileSummaryCardModal('${prof.id}', 'education')" title="최종 학력 변경">${svgIcon('settings', 15)}</button>` : ''}
        <div style="font-size:13px; font-weight:500; color:#64748b;">최종 학력</div>
        <div style="font-size:21px; font-weight:800; color:#0f172a; line-height:1.25;">${degreeLabel}</div>
        <div style="font-size:13px; color:#475569; margin-top:1px;">${schoolAndMajor}</div>
      </div>
      <div style="position:relative; padding:16px 18px; border:1px solid #e2e8f0; border-radius:14px; background:#ffffff; display:flex; flex-direction:column; gap:4px;">
        ${hasLinkedDbProfile ? `<button type="button" class="profile-card-gear-btn" onclick="openEditProfileSummaryCardModal('${prof.id}', 'grade')" title="기술등급 변경">${svgIcon('settings', 15)}</button>` : ''}
        <div style="font-size:13px; font-weight:500; color:#64748b;">기술등급</div>
        <div style="font-size:21px; font-weight:800; color:#0f172a; line-height:1.25;">${personObj.tech_grade || '고급'} (${personObj.experience_years || experienceYears || 0}년)</div>
      </div>
      ${certCount > 0 ? `
      <div style="position:relative; padding:16px 18px; border:1px solid #e2e8f0; border-radius:14px; background:#ffffff; display:flex; flex-direction:column; gap:4px;">
        ${hasLinkedDbProfile ? `<button type="button" class="profile-card-gear-btn" onclick="openEditProfileSummaryCardModal('${prof.id}', 'cert')" title="자격증 변경">${svgIcon('settings', 15)}</button>` : ''}
        <div style="font-size:13px; font-weight:500; color:#64748b;">자격증</div>
        <div style="font-size:21px; font-weight:800; color:#0f172a; line-height:1.25;">${certCount}</div>
        <div style="font-size:13px; color:#475569; margin-top:1px;">${certItems.join(' · ')}</div>
      </div>
      ` : ''}
      <div style="position:relative; padding:16px 18px; border:1px solid #e2e8f0; border-radius:14px; background:#ffffff; display:flex; flex-direction:column; gap:4px;">
        ${hasLinkedDbProfile ? `<button type="button" class="profile-card-gear-btn" onclick="openEditProfileSummaryCardModal('${prof.id}', 'availability')" title="투입 가용일 변경">${svgIcon('settings', 15)}</button>` : ''}
        <div style="font-size:13px; font-weight:500; color:#64748b;">투입 가용일</div>
        <div style="font-size:21px; font-weight:800; color:#0f172a; line-height:1.25;">${personObj.available_date || inv?.available_from || personObj.availability_status}</div>
        <div style="font-size:13px; color:#475569; margin-top:1px;">${personObj.availability_status || '즉시투입가능'}</div>
      </div>
      ${!hideSensitive ? `
      <div style="position:relative; padding:16px 18px; border:1px solid #e2e8f0; border-radius:14px; background:#ffffff; display:flex; flex-direction:column; gap:4px;">
        ${hasLinkedDbProfile ? `<button type="button" class="profile-card-gear-btn" onclick="openEditProfileSummaryCardModal('${prof.id}', 'rate')" title="기준 단가 변경">${svgIcon('settings', 15)}</button>` : ''}
        <div style="font-size:13px; font-weight:500; color:#64748b;">기준 단가</div>
        <div style="font-size:21px; font-weight:800; color:#0f172a; line-height:1.25;">월 ${rateNum.toLocaleString()}만원</div>
      </div>
      ` : ''}
    </div>

    <div style="position:relative; padding:14px 42px 14px 18px; border:1px solid #e2e8f0; border-radius:14px; background:#f8fafc; display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
      ${hasLinkedDbProfile ? `<button type="button" class="profile-card-gear-btn" style="top:50%; transform:translateY(-50%); right:12px;" onclick="openEditProfileSummaryCardModal('${prof.id}', 'domain_skills')" title="전문 도메인 및 핵심 기술 스택 변경">${svgIcon('settings', 15)}</button>` : ''}
      <div style="display:inline-flex; align-items:center; gap:10px; padding-right:16px; border-right:1px solid #cbd5e1; flex-shrink:0;">
        <span style="font-size:13px; font-weight:600; color:#475569;">전문 도메인 및 핵심 기술 스택</span>
        <span style="padding:4px 11px; border-radius:8px; background:#0f172a; color:#ffffff; font-size:13.5px; font-weight:700;">${mainDomainSkill}</span>
      </div>
      <div style="display:flex; align-items:center; gap:7px; flex-wrap:wrap;">
        ${(personObj.domains || []).map(d => `<span style="padding:4px 11px; border-radius:999px; background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; font-size:13px; font-weight:600;">${d}</span>`).join('')}
        ${(personObj.skills || []).map(s => `<span style="padding:4px 11px; border-radius:999px; background:#ffffff; color:#334155; border:1px solid #cbd5e1; font-size:13px; font-weight:600;">${s}</span>`).join('')}
      </div>
    </div>

    ${renderProfileDetailTabsSection(personObj, hasInterviewRecord ? inv : null, isPageView)}
  `;
}

function renderProfileDetailPageView(el, p) {
  const isInternalAssign = isInternalOrContractProfile(p);
  el.innerHTML = `
    <div class="zal-tab-top-bar">
      <button type="button" class="btn btn-outline" style="padding:8px 11px; border-radius:10px;" onclick="closeProfileDetailPage()" title="목록으로 돌아가기">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn btn-primary" style="width:170px; height:42px; padding:0 14px; font-size:14.5px; font-weight:700; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="${isInternalAssign ? `openProfileProjectAssignmentModal('${p.id}')` : `openProfileTargetSourcingModal('${p.id}')`}">
          ${isInternalAssign ? `${svgIcon('briefcase', 15)} 프로젝트 배정` : `${svgIcon('target', 15)} 타겟 소싱 발송`}
        </button>
      </div>
    </div>

    <div class="zal-feed-card" style="margin-bottom:28px; gap:20px;">
      ${renderUnifiedProfileDetailContentHtml(p, null, { isPageView: true })}
    </div>
  `;
}

function openEditProfileSummaryCardModal(profileId, cardType) {
  const { profiles = [] } = state.data || {};
  const p = profiles.find(x => x.id === profileId);
  if (!p) return;

  const eduTokens = String(p.education || '').trim().split(/\s+/).filter(Boolean);
  const degreeVal = p.degree || eduTokens.find(t => /박사|석사|학사|전문학사/.test(t)) || '학사';
  const schoolVal = p.school_name || eduTokens[0] || '';
  const majorVal = p.major || eduTokens.slice(1).filter(t => t !== degreeVal && t !== '졸업').join(' ') || '';

  let title = `프로필 항목 변경 — ${p.name}`;
  let fieldsHtml = '';

  if (cardType === 'education') {
    title = `최종 학력 변경 — ${p.name}`;
    fieldsHtml = `
      <div class="form-grid" style="margin-bottom:14px;">
        <div class="form-field">
          <label>학위</label>
          <select class="select" name="degree">
            ${['박사', '석사', '학사', '전문학사'].map(d => `<option value="${d}" ${degreeVal === d ? 'selected' : ''}>${d}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>학교명</label>
          <input class="input" name="school_name" value="${schoolVal}" required />
        </div>
        <div class="form-field">
          <label>전공</label>
          <input class="input" name="major" value="${majorVal}" required />
        </div>
      </div>
    `;
  } else if (cardType === 'grade') {
    title = `기술등급 변경 — ${p.name}`;
    fieldsHtml = `
      <div class="form-grid" style="margin-bottom:14px;">
        <div class="form-field">
          <label>SW 기술등급</label>
          <select class="select" name="tech_grade">
            ${['특급', '고급', '중급', '초급'].map(g => `<option value="${g}" ${p.tech_grade === g ? 'selected' : ''}>${g}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>경력 연차 (년)</label>
          <input type="number" class="input" name="experience_years" value="${p.experience_years || 0}" min="0" required />
        </div>
      </div>
    `;
  } else if (cardType === 'cert') {
    title = `보유 자격증 변경 — ${p.name}`;
    const certStr = (Array.isArray(p.certifications) && p.certifications.length > 0)
      ? p.certifications.join(', ')
      : (Array.isArray(p.cert_details) ? p.cert_details.map(c => c.name).filter(Boolean).join(', ') : '');
    fieldsHtml = `
      <div class="form-field" style="margin-bottom:14px;">
        <label>보유 자격증 (쉼표 구분, 비우면 숨김 처리)</label>
        <input class="input" name="certifications" value="${certStr}" placeholder="예: 정보처리기사, SQLD" />
      </div>
    `;
  } else if (cardType === 'availability') {
    title = `투입 가용일 변경 — ${p.name}`;
    fieldsHtml = `
      <div class="form-grid" style="margin-bottom:14px;">
        <div class="form-field">
          <label>차기 투입 가능일</label>
          <input type="date" class="input" name="available_date" value="${p.available_date || ''}" required />
        </div>
        <div class="form-field">
          <label>가용 상태</label>
          <select class="select" name="availability_status">
            ${['즉시투입가능', '투입중(철수예정)', '투입중'].map(st => `<option value="${st}" ${p.availability_status === st ? 'selected' : ''}>${st}</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  } else if (cardType === 'rate') {
    title = `기준 단가 변경 — ${p.name}`;
    const currentRate = Number(p.is_internal ? (p.contract_rate || p.desired_rate || 0) : (p.desired_rate || p.contract_rate || 0));
    fieldsHtml = `
      <div class="form-field" style="margin-bottom:14px;">
        <label>기준 단가 (만원/월)</label>
        <input type="number" class="input" name="rate_value" value="${currentRate}" min="0" required />
      </div>
    `;
  } else if (cardType === 'domain_skills') {
    title = `전문 도메인 및 핵심 기술 스택 변경 — ${p.name}`;
    const mainDomainSkill = p.main_skill || (p.domains && p.domains[0]) || (p.skills && p.skills[0]) || 'UI/UX';
    fieldsHtml = `
      <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:14px;">
        <div class="form-field">
          <label>대표 주특기 분야</label>
          <input class="input" name="main_skill" value="${mainDomainSkill}" required />
        </div>
        <div class="form-field">
          <label>전문 도메인 (쉼표 구분)</label>
          <input class="input" name="domains" value="${(p.domains || []).join(', ')}" placeholder="예: 퇴직연금, 마이데이터, 채널계" />
        </div>
        <div class="form-field">
          <label>핵심 기술 스택 (쉼표 구분)</label>
          <input class="input" name="skills" value="${(p.skills || []).join(', ')}" placeholder="예: UI/UX, UI/UX 기획 PL, UI/UX 디자인, 퍼블리싱" />
        </div>
      </div>
    `;
  }

  openModal(title, `
    <form onsubmit="submitEditProfileSummaryCard(event, '${p.id}', '${cardType}')">
      ${fieldsHtml}
      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">저장하기</button>
      </div>
    </form>
  `);
}

async function submitEditProfileSummaryCard(e, profileId, cardType) {
  e.preventDefault();
  const { profiles = [] } = state.data || {};
  const p = profiles.find(x => x.id === profileId);
  if (!p) return;

  const fd = new FormData(e.target);
  const payload = { id: profileId };

  if (cardType === 'education') {
    const degree = fd.get('degree') || '학사';
    const school_name = (fd.get('school_name') || '').trim();
    const major = (fd.get('major') || '').trim();
    payload.degree = degree;
    payload.school_name = school_name;
    payload.major = major;
    payload.education = [school_name, major, degree].filter(Boolean).join(' ');
  } else if (cardType === 'grade') {
    const years = Number(fd.get('experience_years') || 0);
    payload.tech_grade = fd.get('tech_grade') || '고급';
    payload.experience_years = years;
    payload.career_ym_text = `${years} 년 0 개월`;
  } else if (cardType === 'cert') {
    const certs = String(fd.get('certifications') || '').split(',').map(s => s.trim()).filter(Boolean);
    payload.certifications = certs;
    payload.cert_details = certs.map(c => ({ name: c, date: '' }));
  } else if (cardType === 'availability') {
    payload.available_date = fd.get('available_date') || '';
    payload.availability_status = fd.get('availability_status') || '즉시투입가능';
  } else if (cardType === 'rate') {
    const rateVal = Number(fd.get('rate_value') || 0);
    if (p.is_internal) {
      payload.contract_rate = rateVal;
    } else {
      payload.desired_rate = rateVal;
    }
  } else if (cardType === 'domain_skills') {
    payload.main_skill = (fd.get('main_skill') || '').trim();
    payload.domains = String(fd.get('domains') || '').split(',').map(s => s.trim()).filter(Boolean);
    payload.skills = String(fd.get('skills') || '').split(',').map(s => s.trim()).filter(Boolean);
  }

  await apiCall('/api/profiles', 'POST', payload);
  closeModal();
  showToast('프로필 정보가 변경되었습니다.');
  await loadState();
}

function normalizeInterviewStage(inv) {
  const st = String(inv?.status || '').trim();
  if (st === '인터뷰 예정' || st === '인터뷰통보완료' || st === '서류 검토' || st === '서류검토중' || st.includes('서류검토')) return '인터뷰 예정';
  if (st === '평가 대기' || st === '인터뷰 진행') return '평가 대기';
  if (st === '평가 완료' || st === '면접진행완료') return '평가 완료';
  if (st === '최종 결과' || st === '최종선정' || st === '선정' || st === '보류' || st === '불합격' || st === '탈락') return '최종 결과';
  return '인터뷰 예정';
}

function getInterviewFinalResultLabel(inv) {
  if (inv?.final_result) return inv.final_result;
  const st = String(inv?.status || '').trim();
  if (st === '최종선정' || st === '선정') return '선정';
  if (st === '보류') return '보류';
  if (st === '불합격' || st === '탈락') return '불합격';
  return '';
}

function getInterviewStageBadgeMeta(inv) {
  const stage = normalizeInterviewStage(inv);
  if (stage === '서류 검토') {
    return { stage, label: '서류 검토', cls: 'stage-doc' };
  }
  if (stage === '인터뷰 예정') {
    return { stage, label: '인터뷰 예정', cls: 'stage-scheduled' };
  }
  if (stage === '평가 대기') {
    return { stage, label: '평가 대기', cls: 'stage-eval-pending' };
  }
  if (stage === '평가 완료') {
    return { stage, label: '평가 완료', cls: 'stage-eval-done' };
  }
  const resLabel = getInterviewFinalResultLabel(inv) || '선정';
  const subCls = resLabel === '선정' ? 'final-selected' : resLabel === '보류' ? 'final-hold' : 'final-rejected';
  return { stage: '최종 결과', label: `최종 결과 · ${resLabel}`, cls: `stage-final ${subCls}`, finalResult: resLabel };
}

function getInterviewDateDisplayMeta(inv, stage) {
  const rawDate = String(inv?.interview_date || '').trim();
  const method = inv?.interview_method ? inv.interview_method.replace(/\(.*\)/, '') : '';
  if (!rawDate) {
    return {
      text: stage === '서류 검토' ? '일정 조율 전' : '일정 미정',
      cls: 'neutral',
      tooltip: '인터뷰 일정이 아직 확정되지 않았습니다.'
    };
  }
  const shortDate = rawDate.slice(5).replace('-', '.');
  const displayStr = method ? `${shortDate} · ${method}` : shortDate;
  if (stage === '평가 대기') {
    return {
      text: `${displayStr} (평가 필요)`,
      cls: 'delayed',
      tooltip: '면접 평가 작성이 필요한 후보자입니다.'
    };
  }
  if (stage === '인터뷰 예정' && (rawDate.startsWith('2026-11-16') || rawDate.startsWith('2026-11-17'))) {
    return {
      text: `${displayStr} (임박)`,
      cls: 'imminent',
      tooltip: '인터뷰 일정이 임박했습니다.'
    };
  }
  return {
    text: displayStr,
    cls: 'neutral',
    tooltip: `면접 일시: ${rawDate} (${inv?.interview_method || '화상'})`
  };
}

function openCandidateResumeModalWithData(inv, prof) {
  const { personObj } = resolveUnifiedProfileDetailData(prof, inv);
  const candName = personObj?.name || inv?.candidate_name || '후보자';
  const candGrade = personObj?.tech_grade || inv?.tech_grade || '고급';

  openModal(`후보자 상세 프로필 — ${candName} (${candGrade})`, `
    <div style="display:flex; flex-direction:column; gap:20px;">
      ${renderUnifiedProfileDetailContentHtml(prof, inv, { isPageView: false })}
    </div>
  `);
  document.getElementById('modalDialog')?.classList.add('wide-compare-modal-dialog');
}

function openCandidateResumeModal(interviewId) {
  const interviews = state.data?.interviews || [];
  const profiles = state.data?.profiles || [];
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const prof = profiles.find(p => p.id === inv.candidate_profile_id || p.name === inv.candidate_name);
  openCandidateResumeModalWithData(inv, prof);
}

function openApplicantDetailFromPosting(postingId, applicantIndex) {
  const postings = state.data?.postings || [];
  const interviews = state.data?.interviews || [];
  const profiles = state.data?.profiles || [];
  const post = postings.find(p => p.id === postingId);
  if (!post) return;

  const defaultMap = {
    post_1: ['양동근', '김도현', '이준호', '장민호', '윤태영', '배성우', '서유진', '문정훈', '안소희', '고경표'],
    post_2: ['한지민', '박성진'],
    post_3: ['오세훈', '김도윤', '최민수'],
    post_4: ['배성우', '문정훈', '안소희']
  };
  const rawApplicants = Array.isArray(post.applicants) ? post.applicants : (defaultMap[post.id] || []);
  const rawName = String(rawApplicants[applicantIndex] || '').trim().replace(/\*\*$/, '');
  if (!rawName) return;

  const matchedInv = interviews.find(i => i.posting_id === postingId && i.candidate_name === rawName)
    || interviews.find(i => i.candidate_name === rawName);
  if (matchedInv) {
    openCandidateResumeModal(matchedInv.id);
    return;
  }

  const prof = profiles.find(p => p.name === rawName);
  const fb = APPLICANT_FALLBACK_MAP[rawName] || {};
  const canViewSensitive = Boolean(state.data?.permissions?.can_view_sensitive_info);

  const syntheticInv = {
    id: `synthetic_${postingId}_${applicantIndex}`,
    posting_id: postingId,
    project_id: post.project_id,
    candidate_profile_id: prof?.id || null,
    candidate_name: rawName,
    candidate_type: prof?.employment_type || fb.candidate_type || '외주 프리랜서',
    tech_grade: prof?.tech_grade || fb.tech_grade || post.required_grade || '고급',
    experience_years: prof?.experience_years || fb.experience_years || 10,
    education: prof?.education || fb.education || '컴퓨터공학 학사 졸업',
    certifications: prof?.certifications || fb.certifications || ['정보처리기사', 'SQLD'],
    available_from: prof?.available_date || fb.available_from || '2026-11-28',
    desired_rate: canViewSensitive ? (prof?.desired_rate ?? fb.desired_rate ?? 980) : null,
    recommender: fb.recommender || '오픈 구인 직접 지원',
    domains: prof?.domains || fb.domains || [post.required_domain || '퇴직연금'],
    skills: prof?.skills || fb.skills || post.required_skills || ['Java', 'Oracle'],
    status: fb.status || '서류 검토',
    resume_summary: (prof && canViewSensitive && prof.review_summary) ? prof.review_summary : (fb.resume_summary || `${post.required_domain} 시스템 설계 및 개발 전문 인력.`),
    career_history: prof?.career_history || fb.career_history || []
  };

  openCandidateResumeModalWithData(syntheticInv, prof);
}

async function toggleInterviewFavorite(interviewId, event) {
  if (event) event.stopPropagation();
  const inv = (state.data?.interviews || []).find(i => i.id === interviewId);
  if (!inv) return;
  inv.favorite = !inv.favorite;
  renderActiveTab();
  try {
    await apiCall('/api/interviews/favorite', 'POST', {
      interview_id: interviewId,
      favorite: inv.favorite
    });
    showToast(inv.favorite ? `★ ${inv.candidate_name} 후보자를 관심 후보자로 등록했습니다.` : `${inv.candidate_name} 후보자의 관심 등록을 해제했습니다.`);
  } catch {}
}

function toggleInterviewCompareSelection(interviewId, event) {
  if (event) event.stopPropagation();
  if (!state.interviewFilters.compareIds) state.interviewFilters.compareIds = [];
  const list = state.interviewFilters.compareIds;
  const idx = list.indexOf(interviewId);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    if (list.length >= 4) {
      showToast('후보자 비교는 최대 4명까지 선택할 수 있습니다.');
      return;
    }
    list.push(interviewId);
  }
  renderActiveTab();
}

function toggleInterviewCardExpand(interviewId, event) {
  if (event) event.stopPropagation();
  if (!state.interviewFilters.expandedIds) state.interviewFilters.expandedIds = [];
  const list = state.interviewFilters.expandedIds;
  const idx = list.indexOf(interviewId);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(interviewId);
  }
  renderActiveTab();
}

function renderInterviewMasonryColumnsHtml(list, permissions, currentUser) {
  const cols = [[], [], []];
  list.forEach((inv, idx) => {
    cols[idx % 3].push(renderInterviewVerticalCard(inv, idx, permissions, currentUser));
  });
  return cols.map(colCards => `<div class="inv-masonry-col">${colCards.join('')}</div>`).join('');
}

function renderInterviewVerticalCard(inv, idx, permissions, currentUser) {
  const { projects = [], postings = [], profiles = [] } = state.data || {};
  const prj = projects.find(p => p.id === inv.project_id);
  const post = postings.find(p => p.id === inv.posting_id);
  const prof = profiles.find(p => (inv.candidate_profile_id && p.id === inv.candidate_profile_id) || p.name === inv.candidate_name);

  const stageMeta = getInterviewStageBadgeMeta(inv);
  const stage = stageMeta.stage;
  const dateMeta = getInterviewDateDisplayMeta(inv, stage);

  const canViewSensitive = Boolean(permissions?.can_view_sensitive_info);
  const isInternalRole = currentUser?.role_group === 'INTERNAL';
  const hideSensitive = isInternalRole || !canViewSensitive;
  const canConfirmFinal = currentUser?.role_group === 'MASTER' || currentUser?.role_group === 'MANAGER';

  const skills = Array.isArray(inv.skills) && inv.skills.length > 0 ? inv.skills : ['Java', 'Oracle'];
  const visibleSkills = skills.slice(0, 3);
  const extraSkills = skills.slice(3);
  const extraSkillCount = extraSkills.length;

  const expYears = inv.experience_years || prof?.experience_years || 9;
  const jobTitle = inv.job_title || prof?.job_title || '선임';
  const positionTitle = inv.position_name || post?.role_name || `${(inv.domains && inv.domains[0]) || '금융 IT'} 전문 개발자`;
  const projectTitle = inv.project_name || prj?.name || '미래에셋증권 퇴직연금 차세대';
  const educationShort = (prof?.education || '컴퓨터공학 학사').replace(/대학교/, '대').replace(/대학원/, '대학원');
  const careerSummaryLine = `경력 ${expYears}년 (${jobTitle}) · ${inv.candidate_type || '프리랜서'} · ${educationShort}`;

  const projectHighlight = inv.career_highlight
    ? `${inv.career_highlight} — ${inv.resume_summary || ''}`
    : (inv.resume_summary || '');

  const isEvalCompleted = (stage === '평가 완료' || stage === '최종 결과') && Number(inv.total_score || 0) > 0;
  const isVerified = Boolean(inv.verified || prof?.verified || (stage === '최종 결과' && stageMeta.finalResult === '선정'));
  const isCompared = (state.interviewFilters?.compareIds || []).includes(inv.id);
  const isExpanded = (state.interviewFilters?.expandedIds || []).includes(inv.id);

  const fb = APPLICANT_FALLBACK_MAP[inv.candidate_name] || {};
  const certList = (prof?.certifications && prof.certifications.length > 0)
    ? prof.certifications
    : (fb.certifications || ['정보처리기사', 'SQLD']);
  const careerItems = (prof?.career_history && prof.career_history.length > 0)
    ? prof.career_history
    : (fb.career_history && fb.career_history.length > 0
      ? fb.career_history
      : [
          {
            project: inv.career_highlight || `${(inv.domains && inv.domains[0]) || '금융'} 차세대 코어/배치 시스템 구축`,
            client: prj?.client || '주요 금융사',
            period: '2024.03 ~ 2026.10',
            role: positionTitle
          }
        ]);
  const compObj = inv.competency_scores || {
    technical: inv.total_score || 4.5,
    execution: inv.total_score || 4.5,
    communication: inv.total_score || 4.5
  };

  // E. 카드 하단 액션 (상태별 주요 액션 / 보조 액션 분기)
  let primaryActionHtml = '';
  let secondaryActionHtml = `
    <button type="button" class="btn btn-outline btn-sm inv-card-btn-sub" onclick="openCandidateResumeModal('${inv.id}')">
      후보자 상세
    </button>
  `;

  if (stage === '서류 검토') {
    primaryActionHtml = `
      <button type="button" class="btn btn-primary btn-sm inv-card-btn-main" onclick="openDocumentReviewModal('${inv.id}')">
        검토하기
      </button>
    `;
  } else if (stage === '인터뷰 예정') {
    primaryActionHtml = `
      <button type="button" class="btn btn-primary btn-sm inv-card-btn-main" onclick="openScheduleInterviewModal('${inv.id}')">
        일정·면접관 관리
      </button>
    `;
  } else if (stage === '인터뷰 진행') {
    primaryActionHtml = `
      <button type="button" class="btn btn-primary btn-sm inv-card-btn-main" onclick="openEvaluateChecklistModal('${inv.id}')">
        인터뷰 평가하기
      </button>
    `;
  } else if (stage === '평가 대기') {
    primaryActionHtml = `
      <button type="button" class="btn btn-primary btn-sm inv-card-btn-main" onclick="openEvaluateChecklistModal('${inv.id}')">
        면접 평가 작성
      </button>
    `;
  } else if (stage === '평가 완료') {
    primaryActionHtml = `
      <button type="button" class="btn btn-primary btn-sm inv-card-btn-main" onclick="openInterviewResultViewModal('${inv.id}')">
        인터뷰 결과 보기
      </button>
    `;
    if (canConfirmFinal) {
      secondaryActionHtml = `
        <button type="button" class="btn btn-outline btn-sm inv-card-btn-sub inv-card-btn-confirm" onclick="openFinalDecisionModal('${inv.id}')">
          최종 결과 확정
        </button>
      `;
    }
  } else {
    // 최종 결과
    primaryActionHtml = `
      <button type="button" class="btn btn-primary btn-sm inv-card-btn-main" onclick="openInterviewResultViewModal('${inv.id}')">
        결과 상세 보기
      </button>
    `;
  }

  return `
    <article class="inv-vertical-card ${isCompared ? 'is-compared' : ''}" style="cursor:pointer;" onclick="openCandidateResumeModal('${inv.id}')" title="클릭하여 후보자 상세 프로필 열람">
      <!-- A. 상단 영역: 인터뷰 진행 상태 배지 | 면접 일시 | 즐겨찾기 아이콘 -->
      <div class="inv-vcard-top">
        <div class="inv-vcard-top-left">
          <span class="inv-status-badge ${stageMeta.cls}">${stageMeta.label}</span>
          <span class="inv-date-chip ${dateMeta.cls}" title="${dateMeta.tooltip}">
            ${svgIcon('calendar', 12)}
            <span>${dateMeta.text}</span>
          </span>
        </div>
        <div class="inv-vcard-top-right" onclick="event.stopPropagation();">
          <button
            type="button"
            class="inv-compare-check-btn ${isCompared ? 'active' : ''}"
            onclick="toggleInterviewCompareSelection('${inv.id}', event)"
            title="후보자 핵심 정보 비교에 추가"
          >
            ${isCompared ? '✓ 비교중' : '+ 비교'}
          </button>
          <button
            type="button"
            class="inv-fav-btn ${inv.favorite ? 'active' : ''}"
            onclick="toggleInterviewFavorite('${inv.id}', event)"
            title="${inv.favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}"
            aria-label="즐겨찾기"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="${inv.favorite ? '#0f172a' : 'none'}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- B. 후보자 기본 정보: 후보자명, 기술등급, 지원 직무 또는 포지션, 경력 요약 -->
      <div class="inv-card-basic-info">
        <div class="inv-card-person-row">
          <img src="${getAvatarForId(inv.candidate_profile_id || inv.candidate_name)}" alt="${inv.candidate_name}" class="inv-card-avatar" />
          <div class="inv-card-person-main">
            <div class="inv-card-name-line">
              <strong class="inv-card-cand-name">${inv.candidate_name}</strong>
              <span class="inv-grade-pill grade-${inv.tech_grade}">${inv.tech_grade}</span>
              ${isVerified ? `<span class="inv-verified-tag" title="통합 인재 DB 검증 완료 인력">검증완료</span>` : ''}
            </div>
            <div class="inv-card-career-line">${careerSummaryLine}</div>
          </div>
        </div>
        <div class="inv-card-position-box">
          <div class="inv-card-position-role">${positionTitle}</div>
          <div class="inv-card-position-prj">${projectTitle}</div>
        </div>
      </div>

      ${isExpanded ? `
        <!-- C. 기술 및 수행 이력 (더보기 선택 시 확장 표시) -->
        <div class="inv-card-tech-career">
          <div class="inv-vcard-skills">
            ${visibleSkills.map(sk => `<span class="inv-skill-pill">${sk}</span>`).join('')}
            ${extraSkillCount > 0 ? `<span class="inv-skill-more" title="추가 보유 기술: ${extraSkills.join(', ')}">+${extraSkillCount}</span>` : ''}
          </div>
          <p class="inv-card-project-desc" title="${projectHighlight.replace(/"/g, '&quot;')}">
            ${projectHighlight}
          </p>
        </div>

        <!-- D. 주요 업무 정보: 면접관, 투입 가능일, 희망 단가(권한 시), 면접 평가 점수(종합 평가) -->
        <div class="inv-card-work-grid">
          <div class="inv-work-cell">
            <span class="inv-work-label">면접관</span>
            <strong class="inv-work-val">${inv.interviewer_name || '미배정'}</strong>
          </div>
          <div class="inv-work-cell">
            <span class="inv-work-label">투입 가능일</span>
            <strong class="inv-work-val">${inv.available_from || '즉시 가능'}</strong>
          </div>
          ${!hideSensitive ? `
            <div class="inv-work-cell">
              <span class="inv-work-label">희망 단가</span>
              <strong class="inv-work-val">
                ${inv.desired_rate !== null && inv.desired_rate !== undefined && Number(inv.desired_rate) > 0
                  ? `월 ${Number(inv.desired_rate).toLocaleString()}만원`
                  : '협의'}
              </strong>
            </div>
          ` : ''}
          <div class="inv-work-cell ${hideSensitive ? 'span-full' : ''}">
            <span class="inv-work-label">종합 평가</span>
            ${isEvalCompleted ? `
              <strong class="inv-work-val inv-score-highlight">
                <span class="inv-star-icon">★</span> ${Number(inv.total_score).toFixed(1)} <span class="inv-score-max">/ 5.0</span>
              </strong>
            ` : `
              <span class="inv-work-val inv-score-pending">평가 미완료</span>
            `}
          </div>
        </div>

        <!-- E. 카드 하단 액션 (더보기 선택 시 함께 노출 — 보조 액션 좌측, 프라이머리 CTA 우측 끝 정렬) -->
        <div class="inv-vcard-actions" onclick="event.stopPropagation();">
          ${secondaryActionHtml}
          ${primaryActionHtml}
        </div>
      ` : ''}

      <!-- 더보기 / 접기 토글 버튼 (항상 카드 최하단에 위치) -->
      <div style="display:flex; justify-content:center;" onclick="event.stopPropagation();">
        <button
          type="button"
          class="zal-card-more-btn"
          onclick="toggleInterviewCardExpand('${inv.id}', event)"
        >
          ${isExpanded ? '접기' : '더보기'}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="${isExpanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}"/></svg>
        </button>
      </div>
    </article>
  `;
}

function renderProjectDetailView(el, prj, postings, interviews, templates, permissions, currentUser, canManagePrj) {
  const totalSlots = prj.to_slots.length;
  const filledSlots = prj.to_slots.filter(s => s.assigned_profile_id).length;
  const projectPostings = postings.filter(p => p.project_id === prj.id);
  const projectInterviews = interviews.filter(i => i.project_id === prj.id);
  const isPlanned = (prj.project_group || 'PLANNED') === 'PLANNED';
  const deadline = prj.staffing_deadline || '2026-11-25';
  const dDayLabel = getDdayText(deadline);
  const applicantCount = getProjectApplicantCount(prj);
  const periodText = prj.period_label || `${prj.start_date} ~ ${prj.end_date}`;

  el.innerHTML = `
    <div class="zal-tab-top-bar">
      <button type="button" class="btn btn-outline" style="padding:8px 11px; border-radius:10px;" onclick="closeProjectDetail()" title="목록으로 돌아가기">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        ${canManagePrj ? `
          <button type="button" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;" onclick="openProposalSheetModal('${prj.id}')">
            ${svgIcon('file', 14)} 수행인력 총괄표 · 표준 프로필 장표 추출
          </button>
        ` : ''}
      </div>
    </div>

    <!-- 프로젝트 기본 정보, 우측 요약 및 상세 설명 카드 -->
    <div class="zal-feed-card" style="margin-bottom:28px;">
      <div class="prj-split-card" style="border:none; padding:0 0 18px 0; cursor:default; transform:none; box-shadow:none; border-bottom:1px solid #f1f5f9;">
        <div class="prj-split-left">
          <div>
            <div class="prj-split-top-row">
              <div style="display:flex; align-items:center; gap:8px;">
                ${prj.project_group === 'ONGOING'
                  ? `<span class="zal-status-pill amber">ONGOING</span>`
                  : prj.project_group === 'COMPLETED'
                    ? `<span class="zal-status-pill green">COMPLETED</span>`
                    : `<span class="zal-status-pill green">모집 중 · 입찰예정</span>`}
                <span class="zal-status-pill blue">${prj.category || 'PENSION'}</span>
              </div>
            </div>
            <h3 class="prj-split-title" style="font-size:20px;">${prj.name}</h3>
            <div class="prj-metrics-bar">
              <span class="metric-item">단가 가이드 <strong>${prj.budget_rate_info}</strong></span>
              <span class="prj-metrics-divider"></span>
              <span class="metric-item">수행 기간 <strong>${periodText}</strong></span>
              <span class="prj-metrics-divider"></span>
              <span class="metric-item">근무지 <strong>${prj.location}</strong></span>
            </div>
          </div>

          <div style="margin-top:10px; padding:14px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="font-size:13.5px; font-weight:600; color:#0f172a; margin-bottom:4px; display:inline-flex; align-items:center; gap:6px;">${svgIcon('file', 14)} 프로젝트 상세 설명 (과업 범위 및 수행 요건)</div>
            <p style="font-size:14px; color:#334155; line-height:1.65; margin:0;">
              ${prj.description || `${prj.client}의 ${prj.name} 사업으로, ${prj.domain} 도메인 전문 인력 중심의 설계·개발·이행을 수행합니다.`}
            </p>
          </div>
        </div>

        <div class="prj-split-right">
          <div class="prj-right-meta-list">
            ${isPlanned ? `
              <div class="prj-right-meta-item">
                <span style="color:#64748b; display:inline-flex; align-items:center; gap:5px;">${svgIcon('clock', 14)} 충원완료일</span>
                <strong style="color:#dc2626;">${dDayLabel}</strong>
                <span style="font-size:12px; color:#94a3b8;">(${deadline.replace(/-/g, '.')})</span>
              </div>
              <div class="prj-right-meta-item">
                <span style="color:#64748b; display:inline-flex; align-items:center; gap:5px;">${svgIcon('user', 14)} 지원자</span>
                <strong style="color:#0f172a;">${applicantCount}명</strong>
              </div>
            ` : `
              <div class="prj-right-meta-item">
                <span style="color:#64748b; display:inline-flex; align-items:center; gap:5px;">${svgIcon('clock', 14)} 진행상태</span>
                <strong style="color:#0f172a;">${prj.project_group === 'ONGOING' ? '수행 진행중' : '수행 완료'}</strong>
              </div>
            `}
            <div class="prj-right-meta-item">
              <span style="color:#64748b; display:inline-flex; align-items:center; gap:5px;">${svgIcon('users', 14)} TO 충원현황</span>
              <strong style="color:#2563eb;">${filledSlots} / ${totalSlots}명 배정</strong>
            </div>
          </div>

          <div class="prj-client-box">
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="width:22px; height:22px; border-radius:50%; background:#0f172a; color:#fff; font-size:10px; font-weight:600; display:inline-flex; align-items:center; justify-content:center;">
                ${prj.client.slice(0, 1)}
              </div>
              <strong style="font-size:13px; color:#0f172a;">${prj.client}</strong>
              <span style="font-size:11px; font-weight:700; color:#2563eb; background:#eff6ff; padding:2px 7px; border-radius:6px;">고객사</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px; font-size:11.5px; color:#475569; font-weight:600;">
              <span style="display:inline-flex; align-items:center; gap:4px;">${svgIcon('briefcase', 13)} ${prj.domain} 도메인</span>
              <span style="display:inline-flex; align-items:center; gap:4px;">${svgIcon('award', 13)} ${prj.contract_type || '일괄도급'}</span>
            </div>
          </div>
        </div>
      </div>

      ${canManagePrj ? `
        <table class="data-table wbs-slot-table">
          <thead>
            <tr>
              <th>역할 / 포지션명</th>
              <th>요구 등급</th>
              <th>도메인 · 핵심 스킬</th>
              <th>배정 인력</th>
              <th style="width:268px; text-align:center;">상태</th>
            </tr>
          </thead>
          <tbody>
            ${prj.to_slots.map(slot => `
              <tr>
                <td style="font-weight:600;">${slot.role_name}</td>
                <td><span class="badge badge-grade" style="min-width:48px; justify-content:center;">${slot.required_grade}</span></td>
                <td>
                  <span class="badge badge-domain">${slot.required_domain}</span>
                  ${(slot.required_skills || []).map(sk => `<span class="badge badge-skill">${sk}</span>`).join(' ')}
                </td>
                <td>
                  ${slot.assigned_profile_id
                    ? `<strong style="color:#2563eb; display:inline-flex; align-items:center; gap:4px; cursor:pointer;" onclick="openProfileDetailModal('${slot.assigned_profile_id}')" title="클릭하여 상세 프로필 및 평가 열람">${svgIcon('user', 14)} ${slot.assigned_name}</strong>`
                    : `<span style="color:#94a3b8;">미배정</span>`}
                </td>
                <td style="text-align:center;">
                  <div class="wbs-action-group">
                    ${prj.project_group === 'COMPLETED' ? (
                      slot.assigned_profile_id ? `
                        <button type="button" class="btn btn-outline btn-sm wbs-action-btn-sub" onclick="openProjectPerformanceEvalModal('${prj.id}', '${slot.slot_id}', '${slot.assigned_profile_id}')">
                          <span style="color:#f59e0b; font-size:12.5px; line-height:1;">★</span> 평가
                        </button>
                      ` : `<span style="color:#94a3b8; font-size:12.5px;">수행종료</span>`
                    ) : prj.project_group === 'ONGOING' ? (
                      slot.assigned_profile_id ? `
                        <button type="button" class="btn btn-outline btn-sm wbs-action-btn-sub" onclick="openProjectPerformanceEvalModal('${prj.id}', '${slot.slot_id}', '${slot.assigned_profile_id}')">
                          <span style="color:#f59e0b; font-size:12.5px; line-height:1;">★</span> 평가
                        </button>
                        <span class="zal-status-pill wbs-status-pill green">확정</span>
                        <button class="btn btn-outline btn-sm wbs-action-btn-sub" onclick="assignProfileToSlot('${prj.id}', '${slot.slot_id}', null)">
                          취소
                        </button>
                      ` : `
                        <span class="zal-status-pill wbs-status-pill amber">구인중</span>
                        <button class="btn btn-outline btn-sm wbs-action-btn-sub" onclick="openSlotToJobBoard('${prj.id}', '${slot.slot_id}')">
                          ${svgIcon('megaphone', 13)} 공고오픈
                        </button>
                        <button class="btn btn-primary btn-sm wbs-action-btn-main" onclick="openRfpMatchModal('${prj.id}', '${slot.slot_id}')">
                          ${svgIcon('search', 13)} 검색
                        </button>
                      `
                    ) : `
                      <span class="zal-status-pill wbs-status-pill ${slot.assigned_profile_id ? 'green' : 'amber'}">${slot.assigned_profile_id ? '확정' : '구인중'}</span>
                      ${!slot.assigned_profile_id ? `
                        <button class="btn btn-outline btn-sm wbs-action-btn-sub" onclick="openSlotToJobBoard('${prj.id}', '${slot.slot_id}')">
                          ${svgIcon('megaphone', 13)} 공고오픈
                        </button>
                      ` : `
                        <button class="btn btn-outline btn-sm wbs-action-btn-sub" onclick="assignProfileToSlot('${prj.id}', '${slot.slot_id}', null)">
                          취소
                        </button>
                      `}
                      <button class="btn btn-primary btn-sm wbs-action-btn-main" onclick="openRfpMatchModal('${prj.id}', '${slot.slot_id}')">
                        ${svgIcon('search', 13)} 검색
                      </button>
                    `}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}
    </div>

    <!-- 해당 프로젝트 오픈 구인 포지션 섹션 -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
      <h3 style="font-size:16.5px; font-weight:600; display:inline-flex; align-items:center; gap:7px;">오픈 구인 포지션 (${projectPostings.length}건)</h3>
    </div>

    <div class="dashboard-feed-masonry" style="margin-bottom:28px;">
      ${projectPostings.length > 0 ? renderSourcingMasonryColumnsHtml(projectPostings, permissions, currentUser) : `
        <div class="zal-feed-card" style="grid-column: 1 / -1; text-align:center; color:#64748b; padding:28px;">
          현재 이 프로젝트에 오픈된 외주 구인 공고가 없습니다.
        </div>
      `}
    </div>

    <!-- 해당 프로젝트 지원자 인터뷰 섹션 -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
      <h3 style="font-size:16.5px; font-weight:600; display:inline-flex; align-items:center; gap:7px;">지원자 인터뷰</h3>
      ${permissions.can_evaluate_interviews || permissions.can_schedule_interviews ? `
        <button class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openQuestionTemplatesModal()">${svgIcon('file', 14)} 직무별 필수 질문 리스트(${templates.length}종)</button>
      ` : ''}
    </div>

    <div class="inv-vertical-grid">
      ${projectInterviews.length > 0 ? renderInterviewMasonryColumnsHtml(projectInterviews, permissions, currentUser) : `
        <div class="zal-feed-card" style="grid-column: 1 / -1; text-align:center; color:#64748b; padding:28px;">
          현재 이 프로젝트에 등록된 지원자 인터뷰 내역이 없습니다.
        </div>
      `}
    </div>
  `;
}

function openProjectPerformanceEvalModal(projectId, slotId, profileId) {
  const { projects = [], profiles = [], currentUser } = state.data || {};
  const prj = projects.find(p => p.id === projectId);
  const slot = prj?.to_slots?.find(s => s.slot_id === slotId);
  const prof = profiles.find(p => p.id === profileId);
  if (!prj || !prof) return;

  const defaultEvalType = currentUser?.role_group === 'MASTER'
    ? '임원'
    : currentUser?.role_group === 'MANAGER'
      ? 'PM'
      : 'PL';
  const defaultEvalName = currentUser?.name || '조성현 상무';
  const defaultEvalOrg = currentUser ? `${currentUser.department || '금융IT사업본부'} (${currentUser.title || '평가자'})` : '사내 금융IT사업본부';

  const metricRows = [
    { key: 'expertise', label: '전문성', desc: '도메인 업무 지식 및 요구 기술스택 숙련도', def: '5.0' },
    { key: 'satisfaction', label: '만족도', desc: '산출물 품질 및 담당 모듈 과업 완성도', def: '5.0' },
    { key: 'communication', label: '의사소통', desc: '현업 고객사 및 동료 팀원과의 협업 소통', def: '4.8' },
    { key: 'schedule', label: '일정 준수', desc: 'WBS 마일스톤 및 오픈 납기 준수율', def: '5.0' },
    { key: 'proactivity', label: '적극성', desc: '이슈 선제 대응 및 문제 해결 주도성', def: '4.9' }
  ];

  openModal(`프로젝트 수행 다면 평가 등록 — ${prof.name} (${prof.tech_grade})`, `
    <form onsubmit="submitProjectPerformanceEval(event, '${prj.id}', '${slot?.slot_id || ''}', '${prof.id}')">
      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px 16px; border-radius:12px; margin-bottom:16px;">
        <div style="font-size:14px; font-weight:700; color:#0f172a; margin-bottom:4px;">
          [${prj.client}] ${prj.name}
        </div>
        <div style="font-size:12.5px; color:#475569;">
          수행 인력: <strong>${prof.name}</strong> (${prof.employment_type} · ${prof.tech_grade}) · 담당 역할: <strong>${slot?.role_name || '핵심 수행인력'}</strong>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label>평가자 구분</label>
          <select class="select" name="evaluatorType">
            ${['임원', 'PM', 'PL', '팀원', '고객사'].map(t => `<option value="${t}" ${t === defaultEvalType ? 'selected' : ''}>${t} 평가</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>평가자 성명</label>
          <input class="input" name="evaluatorName" value="${defaultEvalName}" required />
        </div>
        <div class="form-field" style="grid-column: 1 / -1;">
          <label>평가자 소속 · 역할</label>
          <input class="input" name="evaluatorOrg" value="${defaultEvalOrg}" required />
        </div>
      </div>

      <div style="border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px; margin-bottom:16px;">
        <div style="font-size:13px; font-weight:700; color:#0f172a; margin-bottom:10px;">항목별 수행 역량 평가 (5점 만점)</div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${metricRows.map(m => `
            <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; padding-bottom:8px; border-bottom:1px solid #f1f5f9;">
              <div>
                <strong style="font-size:13px; color:#0f172a;">${m.label}</strong>
                <span style="font-size:12px; color:#64748b; margin-left:6px;">${m.desc}</span>
              </div>
              <select class="select" name="metric_${m.key}" style="width:120px; font-weight:700;">
                ${['5.0', '4.8', '4.5', '4.0', '3.5', '3.0'].map(sc => `<option value="${sc}" ${sc === m.def ? 'selected' : ''}>★ ${sc}점</option>`).join('')}
              </select>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="form-field" style="margin-bottom:16px;">
        <label>함께 일한 소감 및 프로젝트 수행 총평</label>
        <textarea class="textarea" name="comment" required>${prj.name} 프로젝트에서 ${slot?.role_name || '핵심 모듈'} 과업을 높은 전문성과 책임감으로 완수하였으며, 현업 및 동료 팀원들과의 협업 만족도가 매우 우수합니다.</textarea>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">✓ 수행 평가 등록</button>
      </div>
    </form>
  `);
}

async function submitProjectPerformanceEval(e, projectId, slotId, profileId) {
  e.preventDefault();
  const { projects = [], profiles = [] } = state.data || {};
  const prj = projects.find(p => p.id === projectId);
  const slot = prj?.to_slots?.find(s => s.slot_id === slotId);
  const prof = profiles.find(p => p.id === profileId);
  if (!prj || !prof) return;

  const fd = new FormData(e.target);
  const metrics = {
    expertise: Number(fd.get('metric_expertise') || 5.0),
    satisfaction: Number(fd.get('metric_satisfaction') || 5.0),
    communication: Number(fd.get('metric_communication') || 4.8),
    schedule: Number(fd.get('metric_schedule') || 5.0),
    proactivity: Number(fd.get('metric_proactivity') || 4.9)
  };
  const overallScore = Number(((metrics.expertise + metrics.satisfaction + metrics.communication + metrics.schedule + metrics.proactivity) / 5).toFixed(2));
  const comment = String(fd.get('comment') || '').trim();

  const existingList = getProfileEvaluations(prof).slice();
  const newEvalItem = {
    evaluatorType: fd.get('evaluatorType') || 'PL',
    evaluatorName: fd.get('evaluatorName') || '조성현 상무',
    evaluatorOrg: fd.get('evaluatorOrg') || '사내 금융IT사업본부',
    overallScore,
    metrics,
    projectTitle: prj.name,
    contractTags: [prj.location || '상주 수행', slot?.role_name || '수행인력', prj.domain || '금융SI'],
    contractAmount: prof.is_internal ? `월 ${(prof.contract_rate || 1050).toLocaleString()}만원 (사내기준)` : `월 ${(prof.desired_rate || 980).toLocaleString()}만원`,
    durationDays: prj.period_label || `${prj.start_date} ~ ${prj.end_date}`,
    contractDate: (prj.start_date || '2026-08-01').replace(/-/g, '.'),
    reviewDate: '2026.11.17.',
    comment
  };
  PROFILE_EVALUATIONS_MAP[prof.id] = [newEvalItem, ...existingList];

  const allScores = PROFILE_EVALUATIONS_MAP[prof.id].map(ev => Number(ev.overallScore || 5));
  const avgRating = Number((allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1));

  await apiCall('/api/profiles', 'POST', {
    id: prof.id,
    rating: avgRating,
    verified: 1,
    review_summary: comment
  });

  closeModal();
  showToast(`✨ ${prof.name}님의 '${prj.name}' 수행 평가(★ ${overallScore.toFixed(1)})가 등록되었습니다!`);
  await loadState();
}

function computeMatchScore(profile, slot, projectStartDate) {
  let score = 50;
  const reasons = [];
  const reqDomain = String(slot.required_domain || '').trim();
  const reqSkills = slot.required_skills || [];
  const matchedSkills = reqSkills.filter(rs =>
    (profile.skills || []).some(ps =>
      ps.toLowerCase().includes(rs.toLowerCase()) || rs.toLowerCase().includes(ps.toLowerCase())
    )
  );

  if ((profile.domains || []).includes(reqDomain)) {
    score += 22;
    reasons.push(`${reqDomain} 도메인 일치`);
  } else {
    const careerHay = `${(profile.domains || []).join(' ')} ${(profile.skills || []).join(' ')} ${profile.review_summary || ''} ${(profile.career_history || []).map(c => `${c.project || ''} ${c.role || ''} ${c.tech || ''}`).join(' ')}`.toLowerCase();
    const domainKeywords = reqDomain.split(/[·/\s,()-]+/).filter(w => w.length >= 2);
    const hasRelatedExp = domainKeywords.some(k => careerHay.includes(k.toLowerCase()))
      || (/그룹웨어|전자결재|인사|휴가/.test(reqDomain) && /협업|포털|ehr|웹|모바일|권한|인사/.test(careerHay));
    if (hasRelatedExp || matchedSkills.length >= 2) {
      score += 18;
      reasons.push(`${reqDomain} 연관 수행역량 보유`);
    } else if (matchedSkills.length >= 1) {
      score += 12;
      reasons.push('유관 시스템 수행 경험');
    }
  }
  const gradeRank = { '특급': 4, '고급': 3, '중급': 2, '초급': 1 };
  if ((gradeRank[profile.tech_grade] || 2) >= (gradeRank[slot.required_grade] || 2)) {
    score += 12;
    reasons.push(`${profile.tech_grade} 기술등급 충족`);
  }
  if (matchedSkills.length > 0) {
    score += Math.min(14, matchedSkills.length * 5);
    reasons.push(`스킬 ${matchedSkills.length}개 일치`);
  }
  if (profile.is_internal) {
    score += 4;
    reasons.push('사내 우선배정');
  } else if (profile.verified) {
    score += 4;
    reasons.push('기검증 우수');
  }
  if (profile.available_date <= projectStartDate) {
    score += 2;
    reasons.push(`가용일(${profile.available_date}) 적기`);
  }
  return { score: Math.min(99, score), reasons };
}

function openRfpMatchModal(projectId, slotId) {
  const { projects, profiles } = state.data;
  const prj = projects.find(p => p.id === projectId);
  const slot = prj?.to_slots.find(s => s.slot_id === slotId);
  if (!prj || !slot) return;

  const scoredCandidates = profiles.map(p => {
    const { score, reasons } = computeMatchScore(p, slot, prj.start_date);
    return { profile: p, score, reasons };
  }).sort((a, b) => (b.score !== a.score ? b.score - a.score : (b.profile.is_internal ? 1 : 0) - (a.profile.is_internal ? 1 : 0)));

  openModal(`RFP 맞춤형 적임자 AI 매칭 — [${slot.role_name}]`, `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px 16px; border-radius:12px; margin-bottom:16px;">
      <strong>요구 조건:</strong> 등급 <span class="badge badge-grade">${slot.required_grade}</span> ·
      도메인 <span class="badge badge-domain">${slot.required_domain}</span> ·
      스킬 ${(slot.required_skills || []).map(s => `<span class="badge badge-skill">${s}</span>`).join(' ')}
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>RFP 매칭도</th>
          <th>성명 (소속/등급)</th>
          <th>도메인 · 보유 스킬</th>
          <th>가용 시기</th>
          <th style="text-align:right;">배정</th>
        </tr>
      </thead>
      <tbody>
        ${scoredCandidates.map(({ profile: p, score, reasons }) => `
          <tr>
            <td>
              <span class="zal-status-pill ${score >= 85 ? 'green' : 'blue'}">${score}% 매칭</span>
              <div style="font-size:11px; color:#64748b; margin-top:2px;">${reasons.join(' · ')}</div>
            </td>
            <td>
              <strong style="color:#2563eb; cursor:pointer;" onclick="openProfileDetailModal('${p.id}')" title="클릭하여 상세 프로필 및 평가 열람">${p.name}</strong><br/>
              <span style="font-size:11.5px; color:#64748b;">${p.employment_type} · ${p.tech_grade} (${p.experience_years}년)</span>
            </td>
            <td>
              <div class="tag-row">${p.domains.map(d => `<span class="badge badge-domain">${d}</span>`).join('')}</div>
            </td>
            <td style="font-size:12px;">${p.available_date}</td>
            <td style="text-align:right;">
              <button class="btn btn-primary btn-sm" onclick="assignProfileToSlot('${prj.id}', '${slot.slot_id}', '${p.id}')">배정</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `);
}

async function assignProfileToSlot(projectId, slotId, profileId) {
  await apiCall('/api/projects/assign-slot', 'POST', { project_id: projectId, slot_id: slotId, profile_id: profileId });
  closeModal();
  showToast(profileId ? '포지션에 적임자가 배정되었습니다!' : '배정이 해제되었습니다.');
  await loadState();
}

async function openSlotToJobBoard(projectId, slotId) {
  await apiCall('/api/postings/open-from-slot', 'POST', { project_id: projectId, slot_id: slotId });
  showToast('미충원 포지션이 해당 프로젝트의 오픈 구인 포지션에 등록되었습니다!');
  await loadState();
}

function openProposalSheetModal(projectId) {
  const { projects, profiles } = state.data;
  const prj = projects.find(p => p.id === projectId);
  if (!prj) return;

  const assignedRows = prj.to_slots.map((slot, idx) => {
    const prof = profiles.find(p => p.id === slot.assigned_profile_id);
    return { slot, prof, idx: idx + 1 };
  });

  openModal(`제안서 첨부용 수행인력 총괄표 및 표준 프로필 장표 — ${prj.name}`, `
    <div class="no-print" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px; background:#f8fafc; border:1px solid #e2e8f0; padding:12px 16px; border-radius:12px;">
      <div>
        <strong>원클릭 제안서 장표 자동 생성 완료 (소요 시간 3초 / 기존 수작업 2~3일 대체)</strong>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="downloadProposalCsv('${prj.id}')">${svgIcon('download', 14)} 엑셀(CSV) 다운로드</button>
        <button class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="window.print()">${svgIcon('printer', 14)} 인쇄 / PDF 저장</button>
      </div>
    </div>

    <div class="proposal-doc">
      <h2>[별첨 1] 수행인력 총괄표 (${prj.name})</h2>
      <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:8px;">
        <span><strong>발주기관:</strong> ${prj.client}</span>
        <span><strong>수행기간:</strong> ${prj.start_date} ~ ${prj.end_date} (${prj.location})</span>
        <span><strong>제안사:</strong> (주)잘될금융아이티</span>
      </div>

      <table class="proposal-table">
        <thead>
          <tr>
            <th>순번</th>
            <th>담당 부문 (역할)</th>
            <th>성명</th>
            <th>소속 구분</th>
            <th>SW기술등급</th>
            <th>해당분야 경력</th>
            <th>보유 자격증</th>
            <th>핵심 기술스택</th>
          </tr>
        </thead>
        <tbody>
          ${assignedRows.map(({ slot, prof, idx }) => `
            <tr>
              <td style="text-align:center;">${idx}</td>
              <td><strong>${slot.role_name}</strong></td>
              <td style="text-align:center; font-weight:700;">${prof ? prof.name : '충원중'}</td>
              <td style="text-align:center;">${prof ? prof.employment_type : '전문인력'}</td>
              <td style="text-align:center;">${prof ? prof.tech_grade : slot.required_grade}</td>
              <td style="text-align:center;">${prof ? `${prof.experience_years}년` : '-'}</td>
              <td>${prof ? prof.certifications.join(', ') : '정보처리기사'}</td>
              <td>${prof ? prof.skills.slice(0, 4).join(', ') : slot.required_skills.join(', ')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2 style="margin-top:24px;">[별첨 2] 투입인력 개인별 표준 프로필 장표</h2>
      <div style="display:flex; flex-direction:column; gap:16px; margin-top:12px;">
        ${assignedRows.filter(r => r.prof).map(({ slot, prof }) => `
          <div style="border:1.5px solid #0f172a; padding:14px; border-radius:8px;">
            <div style="font-weight:600; margin-bottom:8px;">
              ■ ${slot.role_name} — ${prof.name} (${prof.tech_grade} / 경력 ${prof.experience_years}년 / ${prof.employment_type})
            </div>
            <div style="font-size:12px; color:#334155;">
              • 학력: ${prof.education} | 자격증: ${prof.certifications.join(', ')} | 전문 도메인: ${prof.domains.join(', ')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `);
}

function downloadProposalCsv(projectId) {
  const { projects, profiles } = state.data;
  const prj = projects.find(p => p.id === projectId);
  if (!prj) return;
  const headers = ['순번', '담당역할', '성명', '소속구분', '기술등급', '경력연차', '보유자격증', '보유스킬', '투입기간'];
  const rows = prj.to_slots.map((slot, idx) => {
    const prof = profiles.find(p => p.id === slot.assigned_profile_id);
    return [
      idx + 1, slot.role_name, prof ? prof.name : '미배정', prof ? prof.employment_type : '-',
      prof ? prof.tech_grade : slot.required_grade, prof ? `${prof.experience_years}년` : '-',
      prof ? prof.certifications.join('/') : '-', prof ? prof.skills.join('/') : slot.required_skills.join('/'),
      `${prj.start_date}~${prj.end_date}`
    ].map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',');
  });
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `수행인력총괄표_${prj.name.slice(0, 15)}.csv`;
  link.click();
  showToast('수행인력 총괄표 CSV 파일이 다운로드되었습니다.');
}

const SAMPLE_RFP_DOCS = {
  rfp1: {
    fileName: 'RFP_한국투자증권_퇴직연금_디폴트옵션_차세대구축.pdf',
    project_group: 'PLANNED',
    category: 'PENSION',
    name: '한국투자증권 퇴직연금 디폴트옵션 및 로보일임 차세대 구축',
    client: '한국투자증권',
    domain: '퇴직연금',
    location: '서울 여의도 (상주)',
    start_date: '2026-12-15',
    end_date: '2027-10-31',
    staffing_deadline: '2026-11-28',
    budget_rate_info: '특급 1,200만 / 고급 1,020만 / 중급 860만',
    description: '[AI RFP 요약] 한국투자증권 퇴직연금(DB/DC/IRP) 디폴트옵션 자동 리밸런싱 엔진 구축, 일마감 수수료·수익률 대용량 배치(Spring Batch/Oracle) 튜닝 및 모바일 연금 자산관리 채널 고도화 사업입니다.',
    to_slots: [
      { role_name: '퇴직연금 정산/코어 아키텍트 (PL)', required_grade: '특급', required_skills: 'Java, Spring Batch, Oracle, ProFrame' },
      { role_name: '연금 수익률/배치 데이터 모델러 (DA)', required_grade: '고급', required_skills: 'Oracle, SQL튜닝, DW/DM' },
      { role_name: '모바일 IRP 비대면 채널 개발', required_grade: '고급', required_skills: 'React, TypeScript, Spring Boot' }
    ]
  },
  rfp2: {
    fileName: 'RFP_신한투자증권_글로벌채권_외화펀드_중개플랫폼.docx',
    project_group: 'PLANNED',
    category: 'INVESTMENT',
    name: '신한투자증권 글로벌 채권·외화펀드 실시간 중개 플랫폼 구축',
    client: '신한투자증권',
    domain: '채권',
    location: '서울 여의도 (상주)',
    start_date: '2027-01-04',
    end_date: '2027-09-30',
    staffing_deadline: '2026-12-05',
    budget_rate_info: '특급 1,220만 / 고급 1,050만 / 중급 880만',
    description: '[AI RFP 요약] 해외 채권 및 외화표시 펀드 실시간 매매·결제·환전 통합 MSA 플랫폼 구축 사업으로, 글로벌 예탁결제원 대외 전문 연동 및 채권 시가평가 엔진 고도화가 핵심 과업입니다.',
    to_slots: [
      { role_name: '글로벌 채권/외화펀드 수탁 AA', required_grade: '특급', required_skills: 'Java, Spring Cloud, Kafka, PostgreSQL' },
      { role_name: '채권 시가평가 및 외화결제 응용개발', required_grade: '고급', required_skills: 'Java, Spring Boot, Oracle, 펀드회계' }
    ]
  }
};

function renderNewProjectToSlotRow(idx, slot = {}) {
  const roleVal = slot.role_name || (idx === 0 ? '퇴직연금 코어 PL' : '연금 정산/배치 개발');
  const gradeVal = slot.required_grade || (idx === 0 ? '특급' : '고급');
  const rawSkills = Array.isArray(slot.required_skills)
    ? slot.required_skills.join(', ')
    : slot.required_skills;
  const skillsVal = rawSkills || (idx === 0 ? 'Java, Spring Boot, Oracle' : 'Java, Spring Batch, SQL튜닝');
  return `
    <div class="rfp-to-slot-row" style="display:grid; grid-template-columns: 1.4fr 110px 1.4fr auto; gap:8px; align-items:end; margin-bottom:8px;">
      <div class="form-field" style="margin:0;">
        <label style="font-size:11.5px;">TO #${idx + 1} 역할명</label>
        <input class="input" name="slot_role" value="${escAttr(roleVal)}" required />
      </div>
      <div class="form-field" style="margin:0;">
        <label style="font-size:11.5px;">요구 등급</label>
        <select class="select" name="slot_grade">
          ${['특급', '고급', '중급', '초급'].map(g => `<option value="${g}" ${gradeVal === g ? 'selected' : ''}>${g}</option>`).join('')}
        </select>
      </div>
      <div class="form-field" style="margin:0;">
        <label style="font-size:11.5px;">필수 기술스택 (쉼표 구분)</label>
        <input class="input" name="slot_skills" value="${escAttr(skillsVal)}" />
      </div>
      <button type="button" class="btn btn-outline btn-sm" style="height:38px; padding:0 10px; color:#dc2626;" onclick="removeNewProjectToSlotRow(this)" title="슬롯 삭제">삭제</button>
    </div>
  `;
}

function addNewProjectToSlotRow(slot = { role_name: '신규 모듈 선임개발', required_grade: '고급', required_skills: 'Java, Spring Boot, Oracle' }) {
  const container = document.getElementById('newPrjToSlotsContainer');
  if (!container) return;
  const idx = container.querySelectorAll('.rfp-to-slot-row').length;
  container.insertAdjacentHTML('beforeend', renderNewProjectToSlotRow(idx, slot));
}

function removeNewProjectToSlotRow(btn) {
  const container = document.getElementById('newPrjToSlotsContainer');
  if (!container) return;
  if (container.querySelectorAll('.rfp-to-slot-row').length <= 1) {
    showToast('최소 1개 이상의 TO 포지션이 필요합니다.');
    return;
  }
  btn.closest('.rfp-to-slot-row')?.remove();
}

function toggleProjectCustomInputMode(fieldType, isChecked, focusInput = true) {
  const isCategory = fieldType === 'category';
  const selectEl = document.getElementById(isCategory ? 'newPrjCategorySelect' : 'newPrjDomainSelect');
  const customInput = document.getElementById(isCategory ? 'newPrjCategoryCustom' : 'newPrjDomainCustom');
  const chkEl = document.getElementById(isCategory ? 'newPrjCategoryCustomChk' : 'newPrjDomainCustomChk');
  if (chkEl) {
    if (chkEl.checked !== Boolean(isChecked)) {
      chkEl.checked = Boolean(isChecked);
    }
    chkEl.closest('.zal-direct-check-label')?.classList.toggle('checked', Boolean(isChecked));
  }
  if (!selectEl || !customInput) return;

  if (isChecked) {
    selectEl.style.display = 'none';
    selectEl.disabled = true;
    customInput.style.display = 'block';
    customInput.disabled = false;
    customInput.required = true;
    if (focusInput) {
      customInput.focus();
    }
  } else {
    customInput.style.display = 'none';
    customInput.disabled = true;
    customInput.required = false;
    selectEl.style.display = 'block';
    selectEl.disabled = false;
  }
}

function setProjectSelectOrCustomValue(form, fieldType, value, fallbackValue) {
  const isCategory = fieldType === 'category';
  const selectEl = document.getElementById(isCategory ? 'newPrjCategorySelect' : 'newPrjDomainSelect');
  const customInput = document.getElementById(isCategory ? 'newPrjCategoryCustom' : 'newPrjDomainCustom');
  if (!selectEl) return;
  const targetVal = String(value || fallbackValue || '').trim();
  const hasOption = Array.from(selectEl.options).some(opt => opt.value === targetVal);

  if (!hasOption && targetVal) {
    const newOpt = document.createElement('option');
    newOpt.value = targetVal;
    newOpt.textContent = targetVal;
    selectEl.appendChild(newOpt);
  }
  selectEl.value = targetVal;
  if (customInput) {
    customInput.value = '';
  }
  toggleProjectCustomInputMode(fieldType, false, false);
}

function showNewProjectManualForm() {
  const form = document.getElementById('newProjectForm');
  if (form) {
    form.style.display = 'block';
    form.querySelector('input[name="name"]')?.focus();
  }
}

function applyParsedRfpToProjectForm(parsed) {
  const form = document.getElementById('newProjectForm');
  if (!form) return;
  form.style.display = 'block';
  form.elements['project_group'].value = parsed.project_group || 'PLANNED';
  setProjectSelectOrCustomValue(form, 'category', parsed.category, 'PENSION');
  form.elements['name'].value = parsed.name || '';
  form.elements['client'].value = parsed.client || '';
  setProjectSelectOrCustomValue(form, 'domain', parsed.domain, '퇴직연금');
  form.elements['location'].value = parsed.location || '서울 여의도 (상주)';
  form.elements['start_date'].value = parsed.start_date || '2026-12-15';
  form.elements['end_date'].value = parsed.end_date || '2027-10-31';
  form.elements['staffing_deadline'].value = parsed.staffing_deadline || '2026-11-30';
  form.elements['budget_rate_info'].value = parsed.budget_rate_info || '특급 1,180만 / 고급 1,000만 / 중급 850만';
  form.elements['description'].value = parsed.description || '';

  const slotsContainer = document.getElementById('newPrjToSlotsContainer');
  if (slotsContainer && Array.isArray(parsed.to_slots) && parsed.to_slots.length > 0) {
    slotsContainer.innerHTML = parsed.to_slots.map((s, idx) => renderNewProjectToSlotRow(idx, s)).join('');
  }

  const statusBanner = document.getElementById('rfpAiParseStatusBanner');
  if (statusBanner) {
    statusBanner.style.display = 'flex';
    statusBanner.innerHTML = `
      <span>✓ <strong>AI RFP 분석 완료 (${parsed.fileName})</strong> — 프로젝트 기본 정보 및 필수 TO ${parsed.to_slots?.length || 2}석이 자동 생성되었습니다.</span>
      <span style="font-weight:700;">정확도 98%</span>
    `;
  }
  showToast(`✨ RFP 문서(${parsed.fileName})에서 프로젝트 및 TO 정보를 자동 생성했습니다!`);
}

function triggerSampleRfpParse(rfpKey) {
  const sample = SAMPLE_RFP_DOCS[rfpKey];
  if (!sample) return;
  applyParsedRfpToProjectForm(sample);
}

function renderRfpUploadedFileChips() {
  const wrap = document.getElementById('rfpUploadedFilesList');
  if (!wrap) return;
  const list = state.rfpUploadedFiles || [];
  if (list.length === 0) {
    wrap.style.display = 'none';
    wrap.innerHTML = '';
    return;
  }
  wrap.style.display = 'flex';
  wrap.innerHTML = list.map((item, idx) => `
    <span class="rfp-file-chip">
      ${svgIcon('file', 13)}
      <span>${item.fileName}</span>
      <button type="button" class="rfp-file-chip-remove" onclick="removeUploadedRfpFile(${idx})" title="파일 제외">&times;</button>
    </span>
  `).join('');
}

async function removeUploadedRfpFile(idx) {
  if (!Array.isArray(state.rfpUploadedFiles)) return;
  state.rfpUploadedFiles.splice(idx, 1);
  renderRfpUploadedFileChips();
  if (state.rfpUploadedFiles.length === 0) {
    const statusBanner = document.getElementById('rfpAiParseStatusBanner');
    if (statusBanner) {
      statusBanner.style.display = 'none';
      statusBanner.innerHTML = '';
    }
    return;
  }
  await runAiRfpParseFromUploadedFiles();
}

async function runAiRfpParseFromUploadedFiles() {
  const list = state.rfpUploadedFiles || [];
  if (list.length === 0) return;
  const primary = list[0];
  const combinedRawText = list.map(f => f.rawText).filter(Boolean).join('\n\n');
  const res = await apiCall('/api/ai/parse-rfp', 'POST', {
    fileName: primary.fileName,
    rawText: combinedRawText,
    fileBase64: primary.fileBase64,
    files: list
  });
  if (res && res.parsed) {
    applyParsedRfpToProjectForm(res.parsed);
  }
}

async function processRfpFiles(fileList) {
  const files = Array.from(fileList || []).filter(Boolean);
  if (files.length === 0) return;
  if (!Array.isArray(state.rfpUploadedFiles)) {
    state.rfpUploadedFiles = [];
  }

  const parsedItems = await Promise.all(
    files.map(async file => {
      const [rawText, fileBase64] = await Promise.all([
        extractClientSideDocumentText(file),
        fileToBase64(file)
      ]);
      return {
        key: `${file.name}_${file.size}`,
        fileName: file.name,
        rawText,
        fileBase64
      };
    })
  );

  for (const item of parsedItems) {
    const existingIdx = state.rfpUploadedFiles.findIndex(f => f.key === item.key);
    if (existingIdx >= 0) {
      state.rfpUploadedFiles[existingIdx] = item;
    } else {
      state.rfpUploadedFiles.push(item);
    }
  }

  renderRfpUploadedFileChips();
  await runAiRfpParseFromUploadedFiles();
}

async function handleRfpFileUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;
  await processRfpFiles(files);
  event.target.value = '';
}

function handleRfpDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
  event.currentTarget.classList.add('drag-over');
}

function handleRfpDragLeave(event) {
  event.preventDefault();
  event.stopPropagation();
  if (!event.currentTarget.contains(event.relatedTarget)) {
    event.currentTarget.classList.remove('drag-over');
  }
}

async function handleRfpDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  event.currentTarget.classList.remove('drag-over');
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    await processRfpFiles(files);
  }
}

function openNewProjectModal() {
  state.rfpUploadedFiles = [];
  openModal('프로젝트 등록', `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <div>
          <span class="zal-status-pill green" style="margin-bottom:5px; display:inline-flex; align-items:center; gap:5px;">
            ${svgIcon('bolt', 13)} AI RFP(제안요청서) 자동 파싱 엔진
          </span>
          <div style="font-size:13.5px; font-weight:700; color:#0f172a;">
            RFP 문서를 업로드하면 AI가 과업 범위와 필요 인력(TO)을 자동 생성합니다.
          </div>
        </div>
        <button type="button" class="btn btn-outline btn-sm" style="height:34px; padding:0 12px; display:inline-flex; align-items:center; gap:6px; background:#fff;" onclick="showNewProjectManualForm()">
          ${svgIcon('edit', 14)} 직접 입력하기
        </button>
      </div>

      <input type="file" id="modalRfpFileInput" multiple accept=".pdf,.doc,.docx,.hwp,.hwpx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.md" style="display:none;" onchange="handleRfpFileUpload(event)" />

      <div id="rfpDropZone" class="rfp-drop-zone" onclick="document.getElementById('modalRfpFileInput').click()" ondragover="handleRfpDragOver(event)" ondragenter="handleRfpDragOver(event)" ondragleave="handleRfpDragLeave(event)" ondrop="handleRfpDrop(event)">
        <div class="rfp-drop-icon-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div class="rfp-drop-main-text">
          RFP 문서를 이곳에 드래그 앤 드롭하거나 <span class="rfp-drop-browse-link">파일 찾아보기</span>
        </div>
        <div class="rfp-drop-sub-text">
          PDF, DOCX, HWP, XLSX, TXT · 복수 파일 동시 업로드 가능
        </div>
      </div>

      <div id="rfpUploadedFilesList" class="rfp-uploaded-files-wrap" style="display:none;"></div>
      <div id="rfpAiParseStatusBanner" class="zal-request-banner" style="display:none; background:#ecfdf5; border-color:#a7f3d0; color:#059669; margin-top:12px; margin-bottom:0;"></div>
    </div>

    <form id="newProjectForm" onsubmit="submitNewProject(event)" style="display:none; margin-top:16px;">
      <div class="form-grid">
        <div class="form-field">
          <label>프로젝트 구분</label>
          <select class="select" name="project_group">
            <option value="PLANNED">예정(입찰) 프로젝트</option>
            <option value="ONGOING">진행중인 프로젝트</option>
            <option value="COMPLETED">완료된 프로젝트</option>
          </select>
        </div>
        <div class="form-field">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <label style="margin:0;">카테고리</label>
            <label class="zal-direct-check-label">
              <input type="checkbox" id="newPrjCategoryCustomChk" onchange="toggleProjectCustomInputMode('category', this.checked)" />
              <span>직접입력</span>
              <span class="zal-circle-check-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="8.5 12.2 11 14.7 15.8 9.5"/></svg>
              </span>
            </label>
          </div>
          <select class="select" name="category" id="newPrjCategorySelect">
            <option value="PENSION">PENSION</option>
            <option value="INVESTMENT">INVESTMENT</option>
            <option value="CONSULTING">CONSULTING</option>
            <option value="GROUPWARE">GROUPWARE</option>
          </select>
          <input class="input" name="category_custom" id="newPrjCategoryCustom" placeholder="카테고리 직접 입력 (예: GROUPWARE, ERP)" style="display:none;" disabled />
        </div>
        <div class="form-field">
          <label>프로젝트명</label>
          <input class="input" name="name" placeholder="예: 대신증권 연금 경쟁력 강화 차세대" required />
        </div>
        <div class="form-field">
          <label>고객사</label>
          <input class="input" name="client" placeholder="예: 대신증권" required />
        </div>
        <div class="form-field">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <label style="margin:0;">핵심 금융 도메인</label>
            <label class="zal-direct-check-label">
              <input type="checkbox" id="newPrjDomainCustomChk" onchange="toggleProjectCustomInputMode('domain', this.checked)" />
              <span>직접입력</span>
              <span class="zal-circle-check-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="8.5 12.2 11 14.7 15.8 9.5"/></svg>
              </span>
            </label>
          </div>
          <select class="select" name="domain" id="newPrjDomainSelect">
            <option value="퇴직연금">퇴직연금</option>
            <option value="채권">채권</option>
            <option value="펀드">펀드</option>
            <option value="계정계 코어">계정계 코어</option>
            <option value="마이데이터">마이데이터</option>
            <option value="그룹웨어·전자결재·인사(HR)">그룹웨어·전자결재·인사(HR)</option>
          </select>
          <input class="input" name="domain_custom" id="newPrjDomainCustom" placeholder="도메인 직접 입력 (예: 그룹웨어·전자결재·인사)" style="display:none;" disabled />
        </div>
        <div class="form-field">
          <label>근무지</label>
          <input class="input" name="location" value="서울 여의도 (상주)" />
        </div>
        <div class="form-field">
          <label>투입 시작일</label>
          <input type="date" class="input" name="start_date" value="2026-12-15" required />
        </div>
        <div class="form-field">
          <label>투입 종료일</label>
          <input type="date" class="input" name="end_date" value="2027-10-31" required />
        </div>
        <div class="form-field">
          <label>충원완료 목표일 (D-Day 기준)</label>
          <input type="date" class="input" name="staffing_deadline" value="2026-11-30" required />
        </div>
        <div class="form-field">
          <label>단가 가이드 (민감정보)</label>
          <input class="input" name="budget_rate_info" value="특급 1,180만 / 고급 1,000만 / 중급 850만" />
        </div>
        <div class="form-field" style="grid-column: span 2;">
          <label>프로젝트 상세 설명 (과업 범위 및 수행 요건)</label>
          <textarea class="textarea" name="description" placeholder="RFP 문서를 업로드하거나 프로젝트 추진 배경, 핵심 과업 범위 및 필요 기술 환경을 입력하세요.">대신증권 퇴직연금 및 개인형IRP 비대면 자산관리 경쟁력 강화를 위한 코어 정산·배치 및 모바일 채널 고도화 프로젝트입니다.</textarea>
        </div>
      </div>

      <div style="margin-top:6px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <label style="font-size:13px; font-weight:700; color:#0f172a;">필요 인력(TO) 포지션 구성</label>
          <button type="button" class="btn btn-outline btn-sm" onclick="addNewProjectToSlotRow()">+ TO 포지션 추가</button>
        </div>
        <div id="newPrjToSlotsContainer">
          ${renderNewProjectToSlotRow(0)}
          ${renderNewProjectToSlotRow(1)}
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">등록하기</button>
      </div>
    </form>
  `);
}

async function submitNewProject(e) {
  e.preventDefault();
  const form = e.target;
  const fd = new FormData(form);
  const isDomainCustom = Boolean(document.getElementById('newPrjDomainCustomChk')?.checked);
  const domain = isDomainCustom
    ? (String(fd.get('domain_custom') || '').trim() || '기타 도메인')
    : (fd.get('domain') || '퇴직연금');
  const project_group = fd.get('project_group') || 'PLANNED';
  const isCategoryCustom = Boolean(document.getElementById('newPrjCategoryCustomChk')?.checked);
  const category = isCategoryCustom
    ? (String(fd.get('category_custom') || '').trim() || 'GENERAL')
    : (fd.get('category') || 'PENSION');

  const slotRows = Array.from(form.querySelectorAll('.rfp-to-slot-row'));
  const to_slots = slotRows.map(row => {
    const role_name = row.querySelector('[name="slot_role"]')?.value || '핵심 모듈 개발';
    const required_grade = row.querySelector('[name="slot_grade"]')?.value || '고급';
    const rawSkills = row.querySelector('[name="slot_skills"]')?.value || 'Java, Spring Boot, Oracle';
    const required_skills = rawSkills.split(',').map(s => s.trim()).filter(Boolean);
    return {
      role_name,
      required_grade,
      required_domain: domain,
      required_skills: required_skills.length > 0 ? required_skills : ['Java', 'Spring Boot', 'Oracle']
    };
  });

  await apiCall('/api/projects', 'POST', {
    project_group,
    category,
    name: fd.get('name'),
    client: fd.get('client'),
    business_type: project_group === 'PLANNED' ? '금융 SI (입찰제안)' : project_group === 'ONGOING' ? '금융 SI (수행중)' : '금융 SI (완료)',
    domain,
    start_date: fd.get('start_date'),
    end_date: fd.get('end_date'),
    staffing_deadline: fd.get('staffing_deadline'),
    location: fd.get('location'),
    budget_rate_info: fd.get('budget_rate_info'),
    description: fd.get('description'),
    to_slots
  });
  closeModal();
  showToast('신규 프로젝트 및 TO가 등록되었습니다.');
  await loadState();
}

/* =========================================================================
   TAB 4: EXTERNAL JOB BOARD & TARGET SOURCING (UPGRADED WORKSPACE)
   ========================================================================= */
function updateSourcingFilter(key, val) {
  if (!state.sourcingFilters) {
    state.sourcingFilters = {
      status: 'ALL', grade: 'ALL', domain: 'ALL', keyword: '',
      sortBy: 'URGENT', viewMode: 'CARD', kpiFilter: 'ALL',
      skill: 'ALL', startMonth: 'ALL', location: 'ALL', maxRate: 'ALL',
      detailPopoverOpen: false, openMenuPostingId: null, expandedApplicantPostings: []
    };
  }
  state.sourcingFilters[key] = val;
  if (key === 'keyword') {
    const grid = document.getElementById('sourcingCardsGrid');
    if (grid) {
      grid.innerHTML = renderSourcingCardsHtml();
      return;
    }
  }
  renderSourcingTab();
}

function toggleSourcingKpiFilter(kpiKey) {
  const cur = state.sourcingFilters?.kpiFilter || 'ALL';
  state.sourcingFilters.kpiFilter = cur === kpiKey ? 'ALL' : kpiKey;
  if (state.sourcingFilters.kpiFilter === 'OPEN_ONLY') {
    state.sourcingFilters.status = 'OPEN';
  }
  renderSourcingTab();
}

function toggleSourcingDetailFilterPopover(event) {
  if (event) event.stopPropagation();
  state.sourcingFilters.detailPopoverOpen = !state.sourcingFilters.detailPopoverOpen;
  state.sourcingFilters.openMenuPostingId = null;
  renderSourcingTab();
}

function closeSourcingPopovers() {
  let changed = false;
  if (state.sourcingFilters?.detailPopoverOpen) {
    state.sourcingFilters.detailPopoverOpen = false;
    changed = true;
  }
  if (state.sourcingFilters?.openMenuPostingId) {
    state.sourcingFilters.openMenuPostingId = null;
    changed = true;
  }
  if (changed) renderSourcingTab();
}

function resetSourcingFilters() {
  state.sourcingFilters = {
    ...state.sourcingFilters,
    status: 'ALL',
    grade: 'ALL',
    domain: 'ALL',
    keyword: '',
    kpiFilter: 'ALL',
    skill: 'ALL',
    startMonth: 'ALL',
    location: 'ALL',
    maxRate: 'ALL',
    detailPopoverOpen: false
  };
  renderSourcingTab();
}

function togglePostingManageMenu(postingId, event) {
  if (event) event.stopPropagation();
  const cur = state.sourcingFilters?.openMenuPostingId;
  state.sourcingFilters.openMenuPostingId = cur === postingId ? null : postingId;
  state.sourcingFilters.detailPopoverOpen = false;
  renderActiveTab();
}

function getActiveSourcingDetailFilterCount() {
  const sf = state.sourcingFilters || {};
  let cnt = 0;
  if (sf.skill && sf.skill !== 'ALL') cnt++;
  if (sf.startMonth && sf.startMonth !== 'ALL') cnt++;
  if (sf.location && sf.location !== 'ALL') cnt++;
  if (sf.maxRate && sf.maxRate !== 'ALL') cnt++;
  return cnt;
}

function getFilteredAndSortedPostings() {
  const { postings = [] } = state.data || {};
  const sf = state.sourcingFilters || {};

  const filtered = postings.filter(post => {
    const meta = getPostingEnrichedMeta(post);
    if (sf.status && sf.status !== 'ALL' && post.status !== sf.status) return false;
    if (sf.grade && sf.grade !== 'ALL' && post.required_grade !== sf.grade) return false;
    if (sf.domain && sf.domain !== 'ALL' && post.required_domain !== sf.domain) return false;
    if (sf.skill && sf.skill !== 'ALL' && !(post.required_skills || []).includes(sf.skill)) return false;
    if (sf.startMonth && sf.startMonth !== 'ALL' && meta.startYm !== sf.startMonth) return false;
    if (sf.location && sf.location !== 'ALL' && !String(post.work_location || '').includes(sf.location)) return false;
    if (sf.maxRate && sf.maxRate !== 'ALL' && meta.budgetRange.max < Number(sf.maxRate)) return false;

    if (sf.kpiFilter === 'OPEN_ONLY' && post.status !== 'OPEN') return false;
    if (sf.kpiFilter === 'UNREVIEWED' && meta.unreviewedCount === 0) return false;
    if (sf.kpiFilter === 'URGENT' && !meta.isUrgent) return false;
    if (sf.kpiFilter === 'FUNNEL' && meta.sentCount === 0) return false;

    if (sf.keyword) {
      const kw = sf.keyword.toLowerCase();
      const appNames = meta.applicants.map(a => a.rawName).join(' ');
      const hay = `${post.title} ${post.role_name} ${meta.clientName} ${meta.projectLabel} ${post.required_domain} ${(post.required_skills || []).join(' ')} ${post.work_location || ''} ${appNames}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    return true;
  });

  const sortBy = sf.sortBy || 'URGENT';
  return [...filtered].sort((a, b) => {
    // Always keep OPEN postings above CLOSED unless filtered
    if (a.status !== b.status) return a.status === 'OPEN' ? -1 : 1;
    const ma = getPostingEnrichedMeta(a);
    const mb = getPostingEnrichedMeta(b);
    if (sortBy === 'URGENT') {
      if (ma.dDay !== mb.dDay) return ma.dDay - mb.dDay;
      return mb.unreviewedCount - ma.unreviewedCount;
    }
    if (sortBy === 'APPLICANTS') {
      if (mb.appliedCount !== ma.appliedCount) return mb.appliedCount - ma.appliedCount;
      return ma.dDay - mb.dDay;
    }
    if (sortBy === 'UNREVIEWED') {
      if (mb.unreviewedCount !== ma.unreviewedCount) return mb.unreviewedCount - ma.unreviewedCount;
      return mb.appliedCount - ma.appliedCount;
    }
    if (sortBy === 'RATE_HIGH') {
      return mb.budgetRange.max - ma.budgetRange.max;
    }
    // RECENT
    return String(b.created_at || '').localeCompare(String(a.created_at || ''));
  });
}

function openNewPostingModal() {
  const { projects = [] } = state.data || {};
  const plannedOrOngoing = projects.filter(p => p.project_group !== 'COMPLETED');
  const unfilledOptions = [];
  plannedOrOngoing.forEach(prj => {
    (prj.to_slots || []).forEach(slot => {
      if (!slot.assigned_profile_id) {
        unfilledOptions.push({ prj, slot });
      }
    });
  });

  openModal('오픈 구인 포지션 등록', `
    <form onsubmit="submitNewPostingFromModal(event)">
      <div class="form-field" style="margin-bottom:14px;">
        <label>대상 프로젝트 미충원 TO 포지션 선택</label>
        <select class="select" name="project_slot" required style="width:100%;">
          ${unfilledOptions.length > 0 ? unfilledOptions.map(({ prj, slot }) => `
            <option value="${prj.id}::${slot.slot_id}">[${prj.client}] ${prj.name} — ${slot.role_name} (${slot.required_grade} · ${slot.required_domain})</option>
          `).join('') : `
            <option value="${plannedOrOngoing[0]?.id || 'prj_1'}::${plannedOrOngoing[0]?.to_slots?.[0]?.slot_id || 's1'}">[${plannedOrOngoing[0]?.client || '미래에셋증권'}] ${plannedOrOngoing[0]?.name || '퇴직연금 차세대 구축'} — 신규 오픈 구인</option>
          `}
        </select>
      </div>
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px 14px; font-size:13px; color:#475569; margin-bottom:16px;">
        선택한 프로젝트의 미충원 TO 포지션이 외부 오픈 구인 보드에 즉시 게시되며, 웹 공유 링크 생성 및 타겟 소싱 발송이 활성화됩니다.
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">구인 공고 게시하기</button>
      </div>
    </form>
  `);
}

async function submitNewPostingFromModal(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const [project_id, slot_id] = String(fd.get('project_slot') || '').split('::');
  if (!project_id || !slot_id) return;
  await apiCall('/api/postings/open-from-slot', 'POST', { project_id, slot_id });
  closeModal();
  showToast('신규 오픈 구인 포지션이 등록되었습니다!');
  await loadState();
}

function renderSourcingPostingCard(post, permissions, currentUser) {
  const meta = getPostingEnrichedMeta(post);
  const isMenuOpen = state.sourcingFilters?.openMenuPostingId === post.id;
  const isClosed = post.status !== 'OPEN';
  const closedBadgeLabel = post.close_reason === 'STOPPED' ? '공고종료' : '충원완료';

  return `
    <article class="zal-feed-card src-posting-card ${meta.isUrgent ? 'is-urgent' : ''} ${isClosed ? 'is-closed' : ''}" onclick="openPostingDetailModal('${post.id}')">
      <!-- [1] 상단 컨텍스트 & 배지 바 (등급/도메인/긴급도 D-Day 컬러 배지화 + 우측 아이콘 액션) -->
      <div class="src-card-top-bar">
        <div class="src-card-badges-row">
          <span class="src-status-badge ${post.status === 'OPEN' ? 'open' : (post.close_reason === 'STOPPED' ? 'stopped' : 'filled')}">
            <span class="src-status-dot"></span>
            ${post.status === 'OPEN' ? '모집중' : closedBadgeLabel}
          </span>
          ${post.status === 'OPEN' ? `
            <span class="src-dday-badge ${meta.isUrgent ? 'urgent' : 'normal'}" title="투입 시작월(${meta.startYm}) 기준 남은 일수">
              ${meta.isUrgent ? '🔥 ' : ''}${meta.dDayBadgeText}
            </span>
          ` : ''}
          <span class="src-grade-badge grade-${post.required_grade}">${post.required_grade} 기술자</span>
          <span class="src-domain-badge">${post.required_domain}</span>
        </div>

        <div class="src-card-quick-tools" onclick="event.stopPropagation();">
          <button
            type="button"
            class="src-icon-tool-btn"
            onclick="copyPostingWebLink('${post.id}')"
            title="오픈 구인 웹 링크 복사하기"
            aria-label="오픈 구인 웹 링크 복사하기"
          >
            ${svgIcon('link', 14)}
          </button>
          ${permissions.can_manage_postings ? `
            <div class="src-manage-menu-wrap">
              <button
                type="button"
                class="src-icon-tool-btn ${isMenuOpen ? 'active' : ''}"
                onclick="togglePostingManageMenu('${post.id}', event)"
                title="공고 관리 메뉴 (수정 / 복제 / 마감)"
                aria-label="공고 관리 메뉴"
              >
                <span style="font-size:16px; font-weight:800; line-height:1; letter-spacing:1px;">⋯</span>
              </button>
              ${isMenuOpen ? `
                <div class="src-manage-dropdown" onclick="event.stopPropagation();">
                  <button type="button" class="src-dropdown-item" onclick="openPostingDetailModal('${post.id}')">
                    ${svgIcon('eye', 13)} 공고 상세 · 지원자 관리
                  </button>
                  <button type="button" class="src-dropdown-item" onclick="openEditPostingModal('${post.id}')">
                    ${svgIcon('edit', 13)} 공고 조건 수정
                  </button>
                  <button type="button" class="src-dropdown-item" onclick="duplicatePosting('${post.id}')">
                    ${svgIcon('file', 13)} 공고 복제 (추가 TO 모집)
                  </button>
                  <div class="src-dropdown-divider"></div>
                  ${post.status === 'OPEN' ? `
                    <button type="button" class="src-dropdown-item danger" onclick="openPostingCloseConfirmModal('${post.id}')">
                      ${svgIcon('lock', 13)} 충원완료 · 채용마감 처리
                    </button>
                  ` : `
                    <button type="button" class="src-dropdown-item" onclick="togglePostingStatus('${post.id}')">
                      ${svgIcon('bolt', 13)} 공고 재오픈 (모집 재개)
                    </button>
                  `}
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      </div>

      <!-- [2] 프로젝트 라벨 + 중복 제거된 단일 포지션 타이틀 -->
      <div class="src-card-title-block">
        <div class="src-client-project-label">
          <span class="src-project-name-text">${meta.projectLabel}</span>
        </div>
        <h3 class="src-position-main-title">${meta.cleanTitle}</h3>
        <div class="src-card-meta-subline">
          <span>${svgIcon('clock', 12)} 등록 ${post.created_at} <strong>(${meta.elapsedDays}일 경과)</strong></span>
          ${meta.roleSubName ? `<span>· 담당: <strong style="color:#334155;">${meta.roleSubName}</strong></span>` : ''}
          ${meta.unreviewedCount > 0 ? `<span class="src-attention-tag">● 신규 미검토 지원자 ${meta.unreviewedCount}명</span>` : ''}
        </div>
      </div>

      <!-- [3] 핵심 조건 3종 (기간·근무지 / 단가 가이드 / 필수 스킬 배지) -->
      <div class="src-spec-box">
        <div class="src-spec-row">
          <span class="src-spec-label">${svgIcon('calendar', 14)} 기간·근무</span>
          <span class="src-spec-val"><strong>${post.period}</strong> <span class="src-spec-sub">(${post.work_location})</span></span>
        </div>
        <div class="src-spec-row">
          <span class="src-spec-label">${svgIcon('dollar', 14)} 단가가이드</span>
          <span class="src-spec-val highlight-rate">${post.rate_guide}</span>
        </div>
        <div class="src-spec-row">
          <span class="src-spec-label">${svgIcon('code', 14)} 필수스킬</span>
          <div class="src-spec-skills-wrap">
            ${(post.required_skills || []).map(sk => `<span class="src-skill-chip">${sk}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- [4] 소싱 퍼널 세그먼트 탭 + 지원자 선별 파이프라인 -->
      ${renderPostingApplicantBox(post)}

      <!-- [6] 하단 액션 바 (보조·관리 액션 좌측 / 프라이머리 CTA 우측 끝 정렬) -->
      <div class="src-card-action-footer" onclick="event.stopPropagation();">
        <div class="src-footer-left-actions">
          ${post.status === 'OPEN' && permissions.can_manage_postings && currentUser?.role_group !== 'MASTER' ? `
            <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px; font-weight:600;" onclick="openEasyApplyModal('${post.id}')">
              ${svgIcon('edit', 13)} ${currentUser?.role_group === 'INTERNAL' ? '사내 지인 추천' : '간편 지원하기'}
            </button>
          ` : ''}
          ${permissions.can_manage_postings ? (post.status === 'OPEN' ? `
            <button
              type="button"
              class="src-safe-close-btn"
              onclick="openPostingCloseConfirmModal('${post.id}')"
              title="충원 완료 또는 공고 종료 처리 (확인 모달)"
            >
              마감·종료
            </button>
          ` : `
            <button
              type="button"
              class="btn btn-outline btn-sm"
              onclick="togglePostingStatus('${post.id}')"
            >
              재오픈
            </button>
          `) : ''}
        </div>

        <div class="src-footer-right-actions" style="margin-left:auto;">
          ${permissions.can_manage_postings && post.status === 'OPEN' ? `
            <button type="button" class="btn btn-primary btn-sm src-primary-cta-btn" onclick="openTargetSourcingModal('${post.id}')">
              ${svgIcon('target', 14)} 타겟 소싱 발송(${meta.matchingPoolCount})
            </button>
          ` : (!permissions.can_manage_postings && post.status === 'OPEN' && currentUser?.role_group !== 'MASTER') ? `
            <button type="button" class="btn btn-primary btn-sm src-primary-cta-btn" onclick="openEasyApplyModal('${post.id}')">
              ${svgIcon('edit', 13)} ${currentUser?.role_group === 'INTERNAL' ? '사내 지인 추천' : '간편 지원하기'}
            </button>
          ` : ''}
        </div>
      </div>
    </article>
  `;
}

function renderSourcingListTableHtml(filteredPostings, permissions, currentUser) {
  if (filteredPostings.length === 0) {
    return `
      <div class="card" style="text-align:center; padding:44px 20px; color:#475569;">
        조건에 부합하는 구인·소싱 포지션이 없습니다.
      </div>
    `;
  }

  return `
    <div class="src-list-table-wrap">
      <table class="src-list-table">
        <thead>
          <tr>
            <th style="width:130px;">상태 · 긴급도</th>
            <th>고객사 · 포지션명 (등급/도메인)</th>
            <th style="width:210px;">투입 기간 · 근무지 · 단가</th>
            <th style="width:175px;">소싱 퍼널 현황</th>
            <th style="width:250px;">지원자 파이프라인 (매칭률)</th>
            <th style="width:185px; text-align:right;">업무 처리 액션</th>
          </tr>
        </thead>
        <tbody>
          ${filteredPostings.map(post => {
            const meta = getPostingEnrichedMeta(post);
            const closedBadgeLabel = post.close_reason === 'STOPPED' ? '공고종료' : '충원완료';
            return `
              <tr onclick="openPostingDetailModal('${post.id}')" style="cursor:pointer;">
                <td>
                  <div style="display:flex; flex-direction:column; align-items:flex-start; gap:5px;">
                    <span class="src-status-badge ${post.status === 'OPEN' ? 'open' : 'filled'}">
                      <span class="src-status-dot"></span>
                      ${post.status === 'OPEN' ? '모집중' : closedBadgeLabel}
                    </span>
                    ${post.status === 'OPEN' ? `
                      <span class="src-dday-badge ${meta.isUrgent ? 'urgent' : 'normal'}">${meta.isUrgent ? '🔥 ' : ''}${meta.dDayBadgeText}</span>
                    ` : `<span style="font-size:11.5px; color:#64748b;">등록 ${post.created_at}</span>`}
                  </div>
                </td>
                <td>
                  <div style="display:flex; flex-direction:column; gap:4px;">
                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                      <span class="src-client-pill">${meta.clientName}</span>
                      <span class="src-grade-badge grade-${post.required_grade}">${post.required_grade}</span>
                      <span class="src-domain-badge">${post.required_domain}</span>
                    </div>
                    <strong style="font-size:14.5px; color:#0f172a;">${meta.cleanTitle}</strong>
                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:2px;">
                      ${(post.required_skills || []).map(sk => `<span class="src-skill-chip">${sk}</span>`).join('')}
                    </div>
                  </div>
                </td>
                <td>
                  <div style="font-size:13px; font-weight:700; color:#0f172a;">${post.period}</div>
                  <div style="font-size:12px; color:#475569; margin-top:2px;">근무지: ${post.work_location}</div>
                  <div style="font-size:12.5px; font-weight:700; color:#2563eb; margin-top:3px;">${post.rate_guide}</div>
                </td>
                <td onclick="event.stopPropagation(); openSourcingFunnelHistoryModal('${post.id}')">
                  <div class="src-table-funnel-box" title="클릭하여 소싱 발송·응답 상세 보기">
                    <div>타겟 발송: <strong>${meta.sentCount}건</strong></div>
                    <div>참여 신청: <strong style="color:#e11d48;">${meta.appliedCount}명</strong></div>
                    <div>면접·검증: <strong style="color:#2563eb;">${meta.interviewCount}명</strong></div>
                  </div>
                </td>
                <td onclick="event.stopPropagation();">
                  <div style="display:flex; flex-direction:column; gap:5px;">
                    ${meta.applicants.slice(0, 3).map(app => `
                      <div class="src-table-app-chip" onclick="openApplicantDetailFromPosting('${post.id}', ${app.idx})" title="${app.displayName} (${app.grade}·${app.expYears}년) 희망 ${app.desiredRate}만 / 가용 ${app.availShort}">
                        <img src="${app.avatarUrl}" alt="${app.displayName}" style="width:22px; height:22px; border-radius:50%; object-fit:cover;" />
                        <strong style="font-size:12.5px; color:#0f172a;">${app.displayName}</strong>
                        <span class="src-applicant-match-chip ${app.matchPct >= 92 ? 'high' : 'mid'}">${app.matchPct}%</span>
                        <span class="src-applicant-stage-pill ${app.pipeline.pillCls}">${app.pipeline.label}</span>
                      </div>
                    `).join('')}
                    ${meta.applicants.length > 3 ? `<span style="font-size:11.5px; color:#64748b;">외 +${meta.applicants.length - 3}명</span>` : ''}
                  </div>
                </td>
                <td onclick="event.stopPropagation();" style="text-align:right;">
                  <div style="display:inline-flex; flex-direction:column; align-items:flex-end; gap:6px;">
                    <div style="display:inline-flex; align-items:center; gap:5px;">
                      ${meta.applicants.length >= 2 ? `
                        <button type="button" class="btn btn-outline btn-sm" style="padding:0 9px; height:32px; font-size:12px;" onclick="openPostingApplicantsCompareModal('${post.id}')">
                          비교(${meta.applicants.length})
                        </button>
                      ` : ''}
                      ${permissions.can_manage_postings && post.status === 'OPEN' ? `
                        <button type="button" class="btn btn-primary btn-sm" style="padding:0 10px; height:32px; font-size:12px;" onclick="openTargetSourcingModal('${post.id}')">
                          타겟소싱
                        </button>
                      ` : ''}
                    </div>
                    <div style="display:inline-flex; align-items:center; gap:5px;">
                      <button type="button" class="src-icon-tool-btn" style="width:28px; height:28px;" onclick="copyPostingWebLink('${post.id}')" title="웹 링크 복사">
                        ${svgIcon('link', 13)}
                      </button>
                      ${permissions.can_manage_postings ? (post.status === 'OPEN' ? `
                        <button type="button" class="src-safe-close-btn" style="height:28px; padding:0 9px; font-size:11.5px;" onclick="openPostingCloseConfirmModal('${post.id}')">
                          마감·종료
                        </button>
                      ` : `
                        <button type="button" class="btn btn-outline btn-sm" style="height:28px; padding:0 9px; font-size:11.5px;" onclick="togglePostingStatus('${post.id}')">
                          재오픈
                        </button>
                      `) : ''}
                    </div>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderSourcingMasonryColumnsHtml(list, permissions, currentUser) {
  const cols = [[], []];
  list.forEach((post, idx) => {
    cols[idx % 2].push(renderSourcingPostingCard(post, permissions, currentUser));
  });
  return cols.map(colCards => `<div class="src-masonry-col">${colCards.join('')}</div>`).join('');
}

function renderSourcingCardsHtml() {
  const { permissions, currentUser } = state.data;
  const sf = state.sourcingFilters || {};
  const filteredPostings = getFilteredAndSortedPostings();

  if (sf.viewMode === 'LIST') {
    return renderSourcingListTableHtml(filteredPostings, permissions, currentUser);
  }

  if (filteredPostings.length === 0) {
    return `
      <div class="card" style="grid-column: 1 / -1; text-align:center; padding:44px 20px;">
        <div style="font-size:15px; font-weight:700; color:#0f172a; margin-bottom:6px;">조건에 부합하는 오픈 구인 포지션이 없습니다.</div>
        <div style="font-size:13px; color:#64748b; margin-bottom:14px;">필터 조건을 완화하거나 초기화하여 전체 포지션을 확인해 보세요.</div>
        <button type="button" class="btn btn-outline btn-sm" onclick="resetSourcingFilters()">필터 전체 초기화</button>
      </div>
    `;
  }

  return renderSourcingMasonryColumnsHtml(filteredPostings, permissions, currentUser);
}

function renderSourcingTab() {
  const { postings = [], permissions, currentUser } = state.data;
  const el = document.getElementById('tab-sourcing');

  if (state.selectedPostingId) {
    const selectedPosting = (postings || []).find(p => p.id === state.selectedPostingId);
    if (selectedPosting) {
      renderPostingDetailPageView(el, selectedPosting, permissions, currentUser);
      return;
    }
    state.selectedPostingId = null;
  }

  const sf = state.sourcingFilters || {};
  const openPostingsCount = postings.filter(p => p.status === 'OPEN').length;
  const closedPostingsCount = postings.filter(p => p.status !== 'OPEN').length;

  // Aggregate KPI metrics across all postings
  const allMetas = postings.map(p => getPostingEnrichedMeta(p));
  const totalApplicants = allMetas.reduce((acc, m) => acc + m.appliedCount, 0);
  const totalUnreviewed = allMetas.reduce((acc, m) => acc + m.unreviewedCount, 0);
  const totalInterviewed = allMetas.reduce((acc, m) => acc + m.interviewCount, 0);
  const totalSent = allMetas.reduce((acc, m) => acc + m.sentCount, 0);
  const urgentPostingsCount = allMetas.filter(m => m.isUrgent).length;

  // Dynamic skill options from postings
  const skillSet = new Set(['Java', 'Spring Batch', 'Spring Boot', 'Oracle', 'ProFrame', 'React', 'TypeScript', 'WebSquare', '펀드회계']);
  postings.forEach(p => (p.required_skills || []).forEach(s => skillSet.add(s)));
  const skillOptions = Array.from(skillSet);
  const activeDetailCount = getActiveSourcingDetailFilterCount();

  // Build active filter chips
  const activeChips = [];
  if (sf.kpiFilter && sf.kpiFilter !== 'ALL') {
    const kpiLabelMap = {
      OPEN_ONLY: '모집중 공고만',
      UNREVIEWED: '미검토 신규 지원자 보유',
      URGENT: '12월 투입 임박 (D-15 이내)',
      FUNNEL: '타겟 소싱 발송 공고'
    };
    activeChips.push({ key: 'kpiFilter', val: 'ALL', label: `KPI 필터: ${kpiLabelMap[sf.kpiFilter] || sf.kpiFilter}` });
  }
  if (sf.grade && sf.grade !== 'ALL') activeChips.push({ key: 'grade', val: 'ALL', label: `등급: ${sf.grade}` });
  if (sf.domain && sf.domain !== 'ALL') activeChips.push({ key: 'domain', val: 'ALL', label: `도메인: ${sf.domain}` });
  if (sf.skill && sf.skill !== 'ALL') activeChips.push({ key: 'skill', val: 'ALL', label: `필수스킬: ${sf.skill}` });
  if (sf.startMonth && sf.startMonth !== 'ALL') activeChips.push({ key: 'startMonth', val: 'ALL', label: `투입시작월: ${sf.startMonth}` });
  if (sf.location && sf.location !== 'ALL') activeChips.push({ key: 'location', val: 'ALL', label: `근무지: ${sf.location}` });
  if (sf.maxRate && sf.maxRate !== 'ALL') activeChips.push({ key: 'maxRate', val: 'ALL', label: `단가가이드: 월 ${Number(sf.maxRate).toLocaleString()}만 이상` });

  el.innerHTML = `
    <div onclick="closeSourcingPopovers()">
      <!-- [상단 필터·정렬·뷰 토글 바] -->
      <div class="filter-bar" style="position:relative;">
        <button type="button" class="zal-chip-btn ${sf.status === 'ALL' ? 'active' : ''}" onclick="updateSourcingFilter('status', 'ALL')">
          전체 (${postings.length})
        </button>
        <button type="button" class="zal-chip-btn ${sf.status === 'OPEN' ? 'active' : ''}" onclick="updateSourcingFilter('status', 'OPEN')">
          모집중 (${openPostingsCount})
        </button>
        <button
          type="button"
          class="zal-chip-btn ${sf.status === 'CLOSED' ? 'active' : ''} ${closedPostingsCount === 0 && sf.status !== 'CLOSED' ? 'is-empty-tab' : ''}"
          onclick="updateSourcingFilter('status', 'CLOSED')"
          title="${closedPostingsCount === 0 ? '현재 마감된 공고가 없습니다' : `마감된 공고 ${closedPostingsCount}건 보기`}"
        >
          마감됨 (${closedPostingsCount})
        </button>

        <select class="zal-chip-select ${sf.grade !== 'ALL' ? 'active' : ''}" onchange="updateSourcingFilter('grade', this.value)" title="요구 기술등급 필터">
          <option value="ALL" ${sf.grade === 'ALL' ? 'selected' : ''}>전체 등급</option>
          <option value="특급" ${sf.grade === '특급' ? 'selected' : ''}>특급</option>
          <option value="고급" ${sf.grade === '고급' ? 'selected' : ''}>고급</option>
          <option value="중급" ${sf.grade === '중급' ? 'selected' : ''}>중급</option>
        </select>

        <select class="zal-chip-select ${sf.domain !== 'ALL' ? 'active' : ''}" onchange="updateSourcingFilter('domain', this.value)" title="도메인 필터">
          <option value="ALL" ${sf.domain === 'ALL' ? 'selected' : ''}>전체 도메인</option>
          <option value="퇴직연금" ${sf.domain === '퇴직연금' ? 'selected' : ''}>퇴직연금</option>
          <option value="펀드" ${sf.domain === '펀드' ? 'selected' : ''}>펀드</option>
          <option value="채권" ${sf.domain === '채권' ? 'selected' : ''}>채권</option>
          <option value="계정계 코어" ${sf.domain === '계정계 코어' ? 'selected' : ''}>계정계 코어</option>
          <option value="마이데이터" ${sf.domain === '마이데이터' ? 'selected' : ''}>마이데이터</option>
          <option value="채널계" ${sf.domain === '채널계' ? 'selected' : ''}>채널계</option>
          <option value="정보계/DW" ${sf.domain === '정보계/DW' ? 'selected' : ''}>정보계/DW</option>
        </select>

        <select class="zal-chip-select ${(sf.sortBy || 'URGENT') !== 'URGENT' ? 'active' : ''}" onchange="updateSourcingFilter('sortBy', this.value)" title="공고 정렬 기준">
          <option value="URGENT" ${(sf.sortBy || 'URGENT') === 'URGENT' ? 'selected' : ''}>정렬: 투입 임박순 (D-Day)</option>
          <option value="UNREVIEWED" ${sf.sortBy === 'UNREVIEWED' ? 'selected' : ''}>정렬: 미검토 지원자순</option>
          <option value="APPLICANTS" ${sf.sortBy === 'APPLICANTS' ? 'selected' : ''}>정렬: 지원자 많은 순</option>
          <option value="RATE_HIGH" ${sf.sortBy === 'RATE_HIGH' ? 'selected' : ''}>정렬: 단가 높은 순</option>
          <option value="RECENT" ${sf.sortBy === 'RECENT' ? 'selected' : ''}>정렬: 최신 등록순</option>
        </select>

        <div class="src-search-box-wide">
          ${renderChipSearchBox('sourcingSearchInput', sf.keyword, '포지션, 고객사, 스킬(Java, React), 지원자명 검색...', 'sourcing')}
        </div>

        <!-- 상세 필터 팝오버 (투입 시작월 / 근무지 / 스킬 / 단가 범위) -->
        <div class="inv-detail-filter-anchor" onclick="event.stopPropagation();">
          <button
            type="button"
            style="width:32px; height:32px; padding:0; display:inline-flex; align-items:center; justify-content:center; background:transparent; border:none; color:${sf.detailPopoverOpen || activeDetailCount > 0 ? '#0f172a' : '#64748b'}; cursor:pointer;"
            onclick="toggleSourcingDetailFilterPopover(event)"
            title="상세 필터${activeDetailCount > 0 ? ` (${activeDetailCount}개 적용중)` : ''}"
            aria-label="상세 필터"
          >
            ${svgIcon('settings', 17)}
          </button>

          ${sf.detailPopoverOpen ? `
            <div class="inv-detail-filter-popover" onclick="event.stopPropagation();">
              <div class="inv-popover-header">
                <strong>구인·소싱 상세 조건 필터</strong>
                <button type="button" class="inv-popover-reset-btn" onclick="resetSourcingFilters()">전체 초기화</button>
              </div>
              <div class="inv-popover-grid">
                <div class="inv-popover-field">
                  <label>투입 시작월</label>
                  <select class="select" onchange="updateSourcingFilter('startMonth', this.value)">
                    <option value="ALL" ${(sf.startMonth || 'ALL') === 'ALL' ? 'selected' : ''}>전체 시작월</option>
                    <option value="2026.12" ${sf.startMonth === '2026.12' ? 'selected' : ''}>2026.12 (투입 임박 · D-11)</option>
                    <option value="2027.01" ${sf.startMonth === '2027.01' ? 'selected' : ''}>2027.01 (차기 투입 · D-42)</option>
                  </select>
                </div>
                <div class="inv-popover-field">
                  <label>근무지 권역</label>
                  <select class="select" onchange="updateSourcingFilter('location', this.value)">
                    <option value="ALL" ${(sf.location || 'ALL') === 'ALL' ? 'selected' : ''}>전체 근무지</option>
                    <option value="을지로" ${sf.location === '을지로' ? 'selected' : ''}>서울 을지로 (도심권)</option>
                    <option value="여의도" ${sf.location === '여의도' ? 'selected' : ''}>서울 여의도 (금융권)</option>
                  </select>
                </div>
                <div class="inv-popover-field">
                  <label>필수 기술 스택</label>
                  <select class="select" onchange="updateSourcingFilter('skill', this.value)">
                    <option value="ALL" ${(sf.skill || 'ALL') === 'ALL' ? 'selected' : ''}>전체 스킬</option>
                    ${skillOptions.map(sk => `<option value="${sk}" ${sf.skill === sk ? 'selected' : ''}>${sk}</option>`).join('')}
                  </select>
                </div>
                <div class="inv-popover-field">
                  <label>단가 가이드 상한</label>
                  <select class="select" onchange="updateSourcingFilter('maxRate', this.value)">
                    <option value="ALL" ${(sf.maxRate || 'ALL') === 'ALL' ? 'selected' : ''}>전체 단가 범위</option>
                    <option value="950" ${sf.maxRate === '950' ? 'selected' : ''}>월 950만원 이상 가능</option>
                    <option value="1050" ${sf.maxRate === '1050' ? 'selected' : ''}>월 1,050만원 이상 가능</option>
                    <option value="1150" ${sf.maxRate === '1150' ? 'selected' : ''}>월 1,150만원 이상 가능</option>
                  </select>
                </div>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="src-toolbar-right">
          <!-- 카드 / 리스트 뷰 토글 -->
          <div class="src-view-toggle-group" title="카드 뷰 / 테이블 리스트 뷰 전환">
            <button
              type="button"
              class="src-view-toggle-btn ${(sf.viewMode || 'CARD') === 'CARD' ? 'active' : ''}"
              onclick="updateSourcingFilter('viewMode', 'CARD')"
            >
              카드
            </button>
            <button
              type="button"
              class="src-view-toggle-btn ${sf.viewMode === 'LIST' ? 'active' : ''}"
              onclick="updateSourcingFilter('viewMode', 'LIST')"
            >
              리스트
            </button>
          </div>

          ${permissions.can_manage_postings ? `
            <button type="button" class="btn btn-primary" style="height:40px; padding:0 15px; font-size:14px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap;" onclick="openNewPostingModal()">
              ${svgIcon('briefcase', 15)} 구인 등록하기
            </button>
          ` : ''}
        </div>
      </div>

      <!-- [적용된 필터 칩 & 초기화 바] -->
      ${activeChips.length > 0 ? `
        <div class="src-active-chips-bar">
          <span class="src-active-chips-label">적용된 필터:</span>
          ${activeChips.map(c => `
            <button type="button" class="src-active-filter-chip" onclick="updateSourcingFilter('${c.key}', '${c.val}')">
              <span>${c.label}</span>
              <span class="src-chip-x">&times;</span>
            </button>
          `).join('')}
          <button type="button" class="src-active-reset-link" onclick="resetSourcingFilters()">필터 전체 초기화</button>
        </div>
      ` : ''}

      <!-- [공고 카드 그리드 or 테이블 리스트] -->
      <div id="sourcingCardsGrid" class="${sf.viewMode === 'LIST' ? 'src-list-container' : 'dashboard-feed-masonry'}">
        ${renderSourcingCardsHtml()}
      </div>
    </div>
  `;
}

function copyPostingWebLink(postingId) {
  const post = (state.data?.postings || []).find(p => p.id === postingId);
  const shareUrl = `${window.location.origin}/?posting=${encodeURIComponent(postingId)}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
  }
  showToast(`🔗 오픈 구인 웹 링크가 클립보드에 복사되었습니다! (${post ? post.role_name : postingId})`);
}

function openPostingDetailModal(postingId, options = {}) {
  const { postings } = state.data || {};
  const post = (postings || []).find(p => p.id === postingId);
  if (!post) return;

  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop && !backdrop.classList.contains('hidden')) {
    closeModal();
  }

  if (state.sourcingFilters) {
    state.sourcingFilters.openMenuPostingId = null;
  }
  state.selectedPostingId = postingId;
  if (state.activeTab !== 'sourcing') {
    state.activeTab = 'sourcing';
    applyTabDomState('sourcing');
  }
  if (!options.fromPopState) {
    pushNavigationState(Boolean(options.replaceHistory));
  }
  renderSourcingTab();
  const scrollArea = document.getElementById('mainScrollArea');
  if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePostingDetailPage(options = {}) {
  if (!options.fromPopState && window.history.state && window.history.state.postingId) {
    window.history.back();
    return;
  }
  state.selectedPostingId = null;
  if (!options.fromPopState) {
    pushNavigationState(Boolean(options.replaceHistory));
  }
  renderSourcingTab();
}

function renderPostingDetailPageView(el, post, permissions, currentUser) {
  const meta = getPostingEnrichedMeta(post);
  const { prj } = meta;
  const closedBadgeLabel = post.close_reason === 'STOPPED' ? '공고종료' : '충원완료';

  el.innerHTML = `
    <div class="zal-tab-top-bar">
      <button type="button" class="btn btn-outline" style="padding:8px 11px; border-radius:10px;" onclick="closePostingDetailPage()" title="목록으로 돌아가기">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn btn-outline" style="height:40px; padding:0 14px; font-size:13.5px; font-weight:600; display:inline-flex; align-items:center; gap:6px;" onclick="copyPostingWebLink('${post.id}')">
          ${svgIcon('link', 14)} 웹 링크 복사
        </button>
        ${meta.applicants.length >= 2 ? `
          <button type="button" class="btn btn-outline" style="height:40px; padding:0 14px; font-size:13.5px; font-weight:600; display:inline-flex; align-items:center; gap:6px;" onclick="openPostingApplicantsCompareModal('${post.id}')">
            ${svgIcon('users', 14)} 지원자 후보 비교 (${meta.applicants.length}명)
          </button>
        ` : ''}
        ${post.status === 'OPEN' && currentUser?.role_group !== 'MASTER' ? `
          <button type="button" class="btn btn-outline" style="height:40px; padding:0 15px; font-size:13.5px; font-weight:700; display:inline-flex; align-items:center; gap:6px;" onclick="openEasyApplyModal('${post.id}')">
            ${svgIcon('edit', 14)} ${currentUser?.role_group === 'INTERNAL' ? '사내 지인 추천' : '간편 지원하기'}
          </button>
        ` : ''}
        ${permissions.can_manage_postings ? `
          ${post.status === 'OPEN' ? `
            <button type="button" class="src-safe-close-btn" style="height:40px; padding:0 15px; font-size:13.5px;" onclick="openPostingCloseConfirmModal('${post.id}', true)">
              채용마감 · 종료
            </button>
          ` : `
            <button type="button" class="btn btn-outline" style="height:40px; padding:0 15px; font-size:13.5px; font-weight:700;" onclick="togglePostingStatus('${post.id}', false)">
              재오픈
            </button>
          `}
          <button type="button" class="btn btn-primary" style="height:40px; padding:0 16px; font-size:13.5px; font-weight:700; display:inline-flex; align-items:center; gap:6px;" onclick="openTargetSourcingModal('${post.id}')">
            ${svgIcon('target', 14)} 타겟 소싱 발송(${meta.matchingPoolCount})
          </button>
        ` : ''}
      </div>
    </div>

    <div class="zal-feed-card" style="margin-bottom:28px; gap:20px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap; padding:18px 20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px;">
        <div style="flex:1; min-width:260px;">
          <div style="display:flex; align-items:center; gap:7px; flex-wrap:wrap; margin-bottom:10px;">
            <span class="src-status-badge ${post.status === 'OPEN' ? 'open' : 'filled'}">
              <span class="src-status-dot"></span>
              ${post.status === 'OPEN' ? '모집중' : closedBadgeLabel}
            </span>
            ${post.status === 'OPEN' ? `
              <span class="src-dday-badge ${meta.isUrgent ? 'urgent' : 'normal'}">${meta.isUrgent ? '🔥 ' : ''}${meta.dDayBadgeText}</span>
            ` : ''}
            <span class="src-grade-badge grade-${post.required_grade}">${post.required_grade} 기술자</span>
            <span class="src-domain-badge">${post.required_domain}</span>
          </div>
          <div class="src-client-project-label" style="margin-bottom:4px;">
            <span class="src-project-name-text">${meta.projectLabel}</span>
          </div>
          <div style="font-size:20px; font-weight:800; color:#0f172a; line-height:1.35;">${meta.cleanTitle}</div>
          <div style="font-size:13px; color:#475569; margin-top:6px;">
            등록일: <strong>${post.created_at} (${meta.elapsedDays}일 경과)</strong> · 담당 역할: <strong>${post.role_name}</strong>
          </div>
        </div>

        <!-- 소싱 퍼널 요약 박스 -->
        <div class="src-funnel-strip" style="min-width:320px; margin:0;" onclick="openSourcingFunnelHistoryModal('${post.id}')">
          <div class="src-funnel-step clickable">
            <span class="src-funnel-icon">${svgIcon('target', 13)}</span>
            <span class="src-funnel-name">타겟발송</span>
            <strong class="src-funnel-num">${meta.sentCount}건</strong>
          </div>
          <span class="src-funnel-arrow">&rarr;</span>
          <div class="src-funnel-step">
            <span class="src-funnel-name">열람</span>
            <strong class="src-funnel-num">${meta.openedCount}명</strong>
          </div>
          <span class="src-funnel-arrow">&rarr;</span>
          <div class="src-funnel-step active">
            <span class="src-funnel-name">참여신청</span>
            <strong class="src-funnel-num highlight">${meta.appliedCount}명</strong>
          </div>
          <span class="src-funnel-arrow">&rarr;</span>
          <div class="src-funnel-step done">
            <span class="src-funnel-name">면접·검증</span>
            <strong class="src-funnel-num">${meta.interviewCount}명</strong>
          </div>
        </div>
      </div>

      <div class="form-grid" style="margin-bottom:0;">
        <div style="padding:16px 18px; border:1px solid #e2e8f0; border-radius:14px;">
          <div style="font-size:13px; color:#64748b; margin-bottom:6px;">수행 기간 · 근무지</div>
          <div style="font-size:16px; font-weight:700; color:#0f172a;">${post.period}</div>
          <div style="font-size:13.5px; color:#475569; margin-top:4px;">근무지: ${post.work_location}</div>
        </div>
        <div style="padding:16px 18px; border:1px solid #e2e8f0; border-radius:14px;">
          <div style="font-size:13px; color:#64748b; margin-bottom:6px;">단가 가이드 · 계약 형태</div>
          <div style="font-size:16px; font-weight:700; color:#2563eb;">${post.rate_guide}</div>
          <div style="font-size:13.5px; color:#475569; margin-top:4px;">발주 고객사: ${prj ? prj.client : meta.clientName} (${prj?.contract_type || '일괄도급'})</div>
        </div>
      </div>

      <div style="padding:18px 20px; border:1px solid #e2e8f0; border-radius:14px;">
        <div style="font-size:15px; font-weight:700; color:#0f172a; margin-bottom:10px;">요구 기술 스택 및 자격 요건</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px;">
          ${(post.required_skills || []).map(sk => `<span class="src-skill-chip" style="font-size:12.5px; padding:4px 10px;">${sk}</span>`).join('')}
        </div>
        <ul style="margin:0; padding-left:18px; font-size:14px; color:#334155; line-height:1.7;">
          <li><strong>담당 역할:</strong> ${post.role_name} (${post.required_grade} 기술자)</li>
          <li><strong>필수 도메인 경험:</strong> ${post.required_domain} 시스템 설계·개발 및 운영/고도화 실무 유경험자</li>
          <li><strong>핵심 수행 과업:</strong> ${prj?.description || `${post.required_domain} 핵심 코어 모듈 설계, 대용량 데이터 처리 및 대외 인터페이스 개발`}</li>
        </ul>
      </div>

      ${renderPostingApplicantsListSection(post, permissions, currentUser)}
    </div>
  `;
}

function renderPostingApplicantsListSection(post, permissions, currentUser) {
  const meta = getPostingEnrichedMeta(post);
  const sortedApplicants = [...meta.applicants].sort((a, b) => b.matchPct - a.matchPct);
  const canRequest = Boolean(permissions?.can_schedule_interviews || permissions?.can_manage_postings);

  return `
    <div style="padding:18px 20px; border:1px solid #e2e8f0; border-radius:14px; background:#ffffff;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <strong style="font-size:15.5px; font-weight:700; color:#0f172a;">지원자 선별 파이프라인 및 인터뷰 요청</strong>
          <span class="zal-status-pill blue">${sortedApplicants.length}명 참여신청</span>
          ${meta.unreviewedCount > 0 ? `<span class="src-applicant-stage-summary urgent">미검토·신규 ${meta.unreviewedCount}명</span>` : ''}
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          ${sortedApplicants.length >= 2 ? `
            <button type="button" class="btn btn-outline btn-sm" style="height:32px; padding:0 11px; font-size:12.5px; font-weight:700;" onclick="openPostingApplicantsCompareModal('${post.id}')">
              ${svgIcon('users', 13)} 후보자 ${sortedApplicants.length}명 한눈에 비교
            </button>
          ` : ''}
        </div>
      </div>

      ${sortedApplicants.length > 0 ? `
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${sortedApplicants.map(app => {
            const intDateText = app.interviewDate
              ? `인터뷰: ${app.interviewDate} · 면접관 ${app.interviewerName || '배정완료'}`
              : '인터뷰 일정 미지정 (서류 검토 단계)';

            return `
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; padding:14px 16px; border:1px solid #e2e8f0; border-radius:12px; background:#f8fafc;">
                <div style="display:flex; align-items:center; gap:12px; min-width:240px; flex:1;">
                  <div class="src-applicant-avatar-wrap">
                    <img src="${app.avatarUrl}" alt="${app.displayName}" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:1.5px solid #ffffff; box-shadow:0 1px 3px rgba(15,23,42,0.1);" />
                  </div>
                  <div style="display:flex; flex-direction:column; gap:4px;">
                    <div style="display:flex; align-items:center; gap:7px; flex-wrap:wrap;">
                      <strong style="font-size:15.5px; color:#0f172a;">${app.displayName}</strong>
                      <span class="src-applicant-grade-chip grade-${app.grade}">${app.grade} · 경력 ${app.expYears}년</span>
                      <span class="src-applicant-match-chip ${app.matchPct >= 92 ? 'high' : 'mid'}">요건 적합도 ${app.matchPct}%</span>
                      <span class="src-applicant-stage-pill ${app.pipeline.pillCls}">${app.pipeline.label}</span>
                      <span style="font-size:11.5px; color:#64748b;">(${app.sourceType})</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:12.5px; color:#475569;">
                      <span>투입 가능일: <strong style="color:#0f172a;">${app.availDate}</strong></span>
                      ${app.canViewSensitive ? `<span>· 희망 단가: <strong style="color:#0f172a;">월 ${app.desiredRate.toLocaleString()}만원</strong> <em class="src-rate-fit-text ${app.rateFitTone}">(${app.rateFitLabel})</em></span>` : ''}
                      <span>· ${intDateText}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap; margin-top:2px;">
                      ${app.reqSkills.map(reqSk => {
                        const hit = app.matchedSkills.includes(reqSk);
                        return `<span class="src-hover-skill-tag ${hit ? 'hit' : 'miss'}">${hit ? '✓ ' : ''}${reqSk}</span>`;
                      }).join('')}
                    </div>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:8px;">
                  <button
                    type="button"
                    class="btn btn-outline btn-sm"
                    style="height:36px; padding:0 13px; font-weight:600;"
                    onclick="openApplicantDetailFromPosting('${post.id}', ${app.idx})"
                  >
                    상세 프로필
                  </button>
                  ${canRequest ? `
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      style="height:36px; padding:0 14px; font-weight:600; display:inline-flex; align-items:center; gap:5px;"
                      onclick="openSourcingInterviewRequestModal('${post.id}', '${app.rawName}', '${app.interviewId}')"
                    >
                      ${svgIcon('calendar', 13)}
                      <span>${app.interviewDate ? '일정 변경·재요청' : '인터뷰 요청'}</span>
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div style="padding:24px; text-align:center; color:#64748b; font-size:13.5px;">
          현재 이 구인 공고에 접수된 지원자가 없습니다.
        </div>
      `}
    </div>
  `;
}

/* =========================================================================
   NEW SOURCING MODALS:
   1. 채용마감/충원완료 확인 모달 (P0 오클릭 방지 & 사유 분리)
   2. 지원자 후보 비교 모달 (B. 후보 선별 비교)
   3. 타겟 소싱 퍼널 발송·응답 내역 모달 (A & P1 퍼널 가시성)
   4. 공고 조건 수정 및 복제 (C. ⋯ 관리 메뉴)
   ========================================================================= */
function openPostingCloseConfirmModal(postingId, fromDetailPage = false) {
  const post = (state.data?.postings || []).find(p => p.id === postingId);
  if (!post) return;
  const meta = getPostingEnrichedMeta(post);

  openModal(`구인 공고 마감 확인 — ${meta.cleanTitle}`, `
    <form onsubmit="submitPostingCloseConfirm(event, '${post.id}', ${Boolean(fromDetailPage)})">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="padding:14px 16px; background:#fff7ed; border:1px solid #fed7aa; border-radius:12px; color:#9a3412; font-size:13px; line-height:1.55;">
          <strong>⚠️ 공고 마감 전 확인해 주세요</strong><br/>
          마감 처리 시 오픈 구인 웹 링크를 통한 신규 참여신청 접수가 중단됩니다. 현재 이 공고에는 <strong>참여신청 지원자 ${meta.appliedCount}명</strong>(미검토 ${meta.unreviewedCount}명 · 면접/검증 ${meta.interviewCount}명)이 있습니다.
        </div>

        <div class="form-field" style="margin-bottom:0;">
          <label style="font-weight:700; color:#0f172a; margin-bottom:8px; display:block;">마감 유형 선택 (충원 완료 vs 공고 종료 분리)</label>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <label class="src-close-reason-option">
              <input type="radio" name="close_reason" value="FILLED" checked />
              <div>
                <strong style="font-size:13.5px; color:#0f172a;">✅ 충원 완료 (적임자 선발 및 투입 확정)</strong>
                <div style="font-size:12px; color:#64748b;">프로젝트 TO 배정이 완료되어 구인을 정상 마감합니다.</div>
              </div>
            </label>
            <label class="src-close-reason-option">
              <input type="radio" name="close_reason" value="STOPPED" />
              <div>
                <strong style="font-size:13.5px; color:#0f172a;">⏸️ 공고 종료 (고객사 일정 변경 / 모집 보류)</strong>
                <div style="font-size:12px; color:#64748b;">충원 없이 공고 노출만 중단하며, 필요 시 언제든 재오픈할 수 있습니다.</div>
              </div>
            </label>
          </div>
        </div>

        <div class="form-field" style="margin-bottom:0;">
          <label>마감 비고 메모 (선택)</label>
          <input class="input" name="close_note" placeholder="예: 양동근 특급 개발자 최종 선정 완료에 따른 마감" />
        </div>

        <label style="display:flex; align-items:center; gap:8px; font-size:13px; color:#334155; cursor:pointer; padding:10px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
          <input type="checkbox" name="notify_applicants" checked />
          <span>현재 참여신청 지원자 <strong>${meta.appliedCount}명</strong>에게 모집 마감 안내 알림을 자동 발송합니다.</span>
        </label>

        <div style="display:flex; justify-content:flex-end; gap:10px; padding-top:4px;">
          <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
          <button type="submit" class="btn btn-primary" style="background:#0f172a;">마감 확정하기</button>
        </div>
      </div>
    </form>
  `);
}

async function submitPostingCloseConfirm(e, postingId) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const closeReason = fd.get('close_reason') || 'FILLED';
  const notify = fd.get('notify_applicants') === 'on';
  await apiCall('/api/postings/toggle', 'POST', {
    posting_id: postingId,
    target_status: 'CLOSED',
    close_reason: closeReason,
    close_note: fd.get('close_note') || '',
    notify_applicants: notify
  });
  closeModal();
  const label = closeReason === 'STOPPED' ? '공고 종료(모집 중단)' : '충원 완료';
  showToast(`✅ 구인 공고가 '${label}' 상태로 마감되었습니다.${notify ? ' (지원자 알림 발송 완료)' : ''}`);
  await loadState();
}

function getScopedApplicantsForCompare(meta, scope = 'APPLIED') {
  const base = scope === 'INTERVIEW'
    ? meta.applicants.filter(c => c.pipeline.code !== 'NEW' && c.pipeline.code !== 'REVIEW')
    : meta.applicants;
  return [...base].sort((a, b) => b.matchPct - a.matchPct);
}

function getPostingCompareSelectedNames(postingId, allSorted, scope = 'APPLIED') {
  if (!state.sourcingCompareMap) state.sourcingCompareMap = {};
  const mapKey = `${postingId}_${scope}`;
  const validNames = new Set(allSorted.map(c => c.rawName));
  let cur = state.sourcingCompareMap[mapKey];
  if (Array.isArray(cur)) {
    cur = cur.filter(n => validNames.has(n));
  }
  if (!Array.isArray(cur) || cur.length === 0) {
    cur = allSorted.slice(0, 4).map(c => c.rawName);
    state.sourcingCompareMap[mapKey] = cur;
  }
  return cur;
}

function togglePostingCompareCandidate(postingId, rawName) {
  const post = (state.data?.postings || []).find(p => p.id === postingId);
  if (!post) return;
  const scope = state.sourcingCompareScope || 'APPLIED';
  const mapKey = `${postingId}_${scope}`;
  const meta = getPostingEnrichedMeta(post);
  const allSorted = getScopedApplicantsForCompare(meta, scope);
  const cur = [...getPostingCompareSelectedNames(postingId, allSorted, scope)];
  const idx = cur.indexOf(rawName);
  if (idx >= 0) {
    if (cur.length <= 1) {
      showToast('최소 1명 이상의 비교 후보가 선택되어야 합니다.');
      return;
    }
    cur.splice(idx, 1);
  } else {
    if (cur.length >= 4) {
      showToast('한눈에 비교하기 위해 최대 4명까지 동시 선택할 수 있습니다. 기존 후보를 먼저 해제해 주세요.');
      return;
    }
    cur.push(rawName);
  }
  state.sourcingCompareMap[mapKey] = cur;
  openPostingApplicantsCompareModal(postingId, scope);
}

function applyPostingComparePreset(postingId, preset) {
  const post = (state.data?.postings || []).find(p => p.id === postingId);
  if (!post) return;
  const scope = state.sourcingCompareScope || 'APPLIED';
  const mapKey = `${postingId}_${scope}`;
  const meta = getPostingEnrichedMeta(post);
  const allSorted = getScopedApplicantsForCompare(meta, scope);
  if (!state.sourcingCompareMap) state.sourcingCompareMap = {};

  let picked = [];
  if (preset === 'NEW') {
    picked = allSorted.filter(c => c.pipeline.code === 'NEW' || c.pipeline.code === 'REVIEW').slice(0, 4);
  } else if (preset === 'INTERVIEW') {
    picked = allSorted.filter(c => c.pipeline.code !== 'NEW' && c.pipeline.code !== 'REVIEW').slice(0, 4);
  }
  if (picked.length === 0) {
    picked = allSorted.slice(0, 4);
  }
  state.sourcingCompareMap[mapKey] = picked.map(c => c.rawName);
  openPostingApplicantsCompareModal(postingId, scope);
}

function openPostingApplicantsCompareModal(postingId, scopeMode = null) {
  const post = (state.data?.postings || []).find(p => p.id === postingId);
  if (!post) return;
  if (scopeMode) {
    state.sourcingCompareScope = scopeMode;
  } else if (!state.sourcingCompareScope) {
    state.sourcingCompareScope = 'APPLIED';
  }
  const scope = state.sourcingCompareScope;
  const meta = getPostingEnrichedMeta(post);
  const allSorted = getScopedApplicantsForCompare(meta, scope);
  const selectedNames = getPostingCompareSelectedNames(postingId, allSorted, scope);
  const cands = allSorted.filter(c => selectedNames.includes(c.rawName));
  const topCandidateName = allSorted[0]?.rawName || '';
  const permissions = state.data?.permissions || {};
  const canRequest = Boolean(permissions.can_schedule_interviews || permissions.can_manage_postings);
  const modalTitlePrefix = scope === 'INTERVIEW' ? '면접·검증 대상자 후보 비교 분석' : '지원자 후보 비교 분석';

  openModal(`${modalTitlePrefix} — ${meta.cleanTitle} (${allSorted.length >= 4 ? `${cands.length} / 총 ${allSorted.length}명` : `${cands.length}명`})`, `
    <div style="display:flex; flex-direction:column; gap:14px;">
      <!-- 공고 요구 기준 배너 -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
        <div>
          <div style="font-size:12px; color:#64748b;">공고 요구 기준 (${meta.projectLabel})</div>
          <div style="font-size:13.5px; font-weight:700; color:#0f172a; margin-top:2px;">
            요구등급: <span style="color:#2563eb;">${post.required_grade}</span> · 예산단가: <span style="color:#2563eb;">${post.rate_guide}</span> · 투입시기: <span style="color:#2563eb;">${post.period}</span>
          </div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:4px;">
          ${(post.required_skills || []).map(sk => `<span class="src-skill-chip">${sk}</span>`).join('')}
        </div>
      </div>

      <!-- 전체 지원자 중 비교 대상 선택 바 (지원자가 4명 이상일 때만 표시, 최대 4명 동시 비교) -->
      ${allSorted.length >= 4 ? `
        <div class="src-cmp-selector-bar">
          <div class="src-cmp-selector-top">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <strong style="font-size:13px; color:#0f172a;">비교 대상 후보 선택 (${cands.length}/4명 선택됨 · 전체 ${allSorted.length}명)</strong>
              <span style="font-size:12px; color:#64748b;">지원자가 많을 때 최대 4명까지 골라 한 화면에서 비교할 수 있습니다.</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <button type="button" class="src-cmp-preset-btn" onclick="applyPostingComparePreset('${post.id}', 'TOP4')">AI 적합도 Top 4</button>
              ${meta.unreviewedCount > 0 ? `<button type="button" class="src-cmp-preset-btn" onclick="applyPostingComparePreset('${post.id}', 'NEW')">미검토 신규 (${meta.unreviewedCount})</button>` : ''}
              ${meta.interviewCount > 0 ? `<button type="button" class="src-cmp-preset-btn" onclick="applyPostingComparePreset('${post.id}', 'INTERVIEW')">면접·검증 (${meta.interviewCount})</button>` : ''}
            </div>
          </div>
          <div class="src-cmp-selector-chips">
            ${allSorted.map(c => {
              const isSelected = selectedNames.includes(c.rawName);
              return `
                <button
                  type="button"
                  class="src-cmp-cand-pill ${isSelected ? 'active' : ''}"
                  onclick="togglePostingCompareCandidate('${post.id}', '${c.rawName}')"
                  title="${isSelected ? '클릭하여 비교 테이블에서 제외' : '클릭하여 비교 테이블에 추가 (최대 4명)'}"
                >
                  <img src="${c.avatarUrl}" alt="${c.displayName}" style="width:20px; height:20px; border-radius:50%; object-fit:cover;" />
                  <span>${c.displayName}</span>
                  <span class="src-cmp-pill-pct">${c.matchPct}%</span>
                  <span style="font-size:11px; opacity:0.85;">${isSelected ? '✓' : '+'}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <div style="overflow-x:auto;">
        <table class="src-compare-table">
          <thead>
            <tr>
              <th style="width:140px;">비교 항목</th>
              ${cands.map(c => `
                <th>
                  <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                    <div style="display:flex; align-items:center; gap:9px;">
                      <img src="${c.avatarUrl}" alt="${c.displayName}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:1.5px solid #e2e8f0;" />
                      <div>
                        <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                          <strong style="font-size:14.5px; color:#0f172a;">${c.displayName}</strong>
                          ${c.rawName === topCandidateName ? `<span class="src-best-fit-tag">AI 1순위</span>` : ''}
                        </div>
                        <span style="font-size:11.5px; color:#64748b; font-weight:500;">${c.empType} · ${c.sourceType}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="cmp-card-remove-btn"
                      onclick="togglePostingCompareCandidate('${post.id}', '${c.rawName}')"
                      title="비교 목록에서 제외"
                      aria-label="제외"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="src-cmp-label">AI 요건 적합도</td>
              ${cands.map(c => `
                <td>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <strong style="font-size:16px; color:${c.matchPct >= 92 ? '#1d4ed8' : '#0f172a'};">${c.matchPct}%</strong>
                    <div style="flex:1; height:7px; background:#e2e8f0; border-radius:999px; overflow:hidden; max-width:90px;">
                      <div style="width:${c.matchPct}%; height:100%; background:${c.matchPct >= 92 ? '#2563eb' : '#64748b'};"></div>
                    </div>
                  </div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="src-cmp-label">현재 전형 상태</td>
              ${cands.map(c => `
                <td>
                  <span class="src-applicant-stage-pill ${c.pipeline.pillCls}">${c.pipeline.label}</span>
                  <div style="font-size:11.5px; color:#64748b; margin-top:3px;">${c.pipeline.subLabel}</div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="src-cmp-label">기술등급 · 경력</td>
              ${cands.map(c => `
                <td>
                  <span class="src-applicant-grade-chip grade-${c.grade}">${c.grade} 기술자</span>
                  <strong style="margin-left:6px; color:#0f172a;">${c.expYears}년차</strong>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="src-cmp-label">희망 단가 (예산 대비)</td>
              ${cands.map(c => `
                <td>
                  ${c.canViewSensitive ? `
                    <strong style="font-size:14px; color:#0f172a;">월 ${c.desiredRate.toLocaleString()}만원</strong>
                    <div class="src-rate-fit-text ${c.rateFitTone}" style="font-size:12px; margin-top:2px;">${c.rateFitLabel}</div>
                  ` : `<span style="color:#94a3b8;">열람 권한 필요</span>`}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="src-cmp-label">투입 가능일</td>
              ${cands.map(c => `
                <td>
                  <strong style="color:#0f172a;">${c.availDate}</strong>
                  <div style="font-size:11.5px; color:#16a34a; margin-top:2px;">✓ ${meta.startYm} 투입 일정 부합</div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="src-cmp-label">필수 스킬 매칭 (${(post.required_skills || []).length}종)</td>
              ${cands.map(c => `
                <td>
                  <div style="font-size:12px; font-weight:700; color:#0f172a; margin-bottom:5px;">
                    ${c.matchedSkills.length} / ${c.reqSkills.length}개 일치
                  </div>
                  <div style="display:flex; flex-wrap:wrap; gap:4px;">
                    ${c.reqSkills.map(reqSk => {
                      const hit = c.matchedSkills.includes(reqSk);
                      return `<span class="src-hover-skill-tag ${hit ? 'hit' : 'miss'}">${hit ? '✓ ' : '✕ '}${reqSk}</span>`;
                    }).join('')}
                  </div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="src-cmp-label">핵심 수행 요약</td>
              ${cands.map(c => `
                <td style="font-size:12.5px; color:#334155; line-height:1.5;">
                  ${c.summaryText}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td class="src-cmp-label">빠른 액션</td>
              ${cands.map(c => `
                <td>
                  <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <button type="button" class="btn btn-outline btn-sm" onclick="closeModal(); openApplicantDetailFromPosting('${post.id}', ${c.idx})">
                      상세 이력서
                    </button>
                    ${canRequest ? `
                      <button type="button" class="btn btn-primary btn-sm" onclick="closeModal(); openSourcingInterviewRequestModal('${post.id}', '${c.rawName}', '${c.interviewId}')">
                        ${c.interviewDate ? '일정 변경' : '인터뷰 요청'}
                      </button>
                    ` : ''}
                  </div>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `);
  const dialog = document.getElementById('modalDialog');
  if (dialog) dialog.classList.add('wide-compare-modal-dialog');
}

function openSourcingFunnelHistoryModal(postingId) {
  const post = (state.data?.postings || []).find(p => p.id === postingId);
  if (!post) return;
  const meta = getPostingEnrichedMeta(post);
  const { profiles = [] } = state.data || {};
  const externalProfiles = profiles.filter(p => !p.is_internal);

  // Build synthetic/realistic target sourcing recipient rows
  const recipientRows = meta.applicants.map((app, i) => ({
    name: app.displayName,
    avatarUrl: app.avatarUrl,
    grade: app.grade,
    domain: post.required_domain,
    sentAt: `${post.created_at} 10:${15 + i * 12}`,
    channel: i === 0 ? '타겟소싱 초청 (알림톡·메일)' : '오픈구인 웹 링크 유입',
    funnelStatus: app.pipeline.code === 'NEW' ? '참여신청 완료 (검토대기)' : `참여신청 → ${app.pipeline.label}`,
    statusTone: app.pipeline.code === 'NEW' ? 'amber' : 'blue'
  }));

  while (recipientRows.length < meta.sentCount && externalProfiles[recipientRows.length]) {
    const ep = externalProfiles[recipientRows.length];
    recipientRows.push({
      name: ep.name,
      avatarUrl: getAvatarForId(ep.id),
      grade: ep.tech_grade,
      domain: (ep.domains || [])[0] || post.required_domain,
      sentAt: `${post.created_at} 14:20`,
      channel: '타겟소싱 초청 (알림톡·메일)',
      funnelStatus: '공고 열람 완료 (응답 대기)',
      statusTone: 'gray'
    });
  }

  openModal(`타겟 소싱 퍼널 현황 — ${meta.cleanTitle}`, `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div class="src-modal-funnel-grid">
        <div class="src-modal-funnel-box">
          <span class="src-modal-funnel-label">1단계 · 타겟소싱 발송</span>
          <strong class="src-modal-funnel-val">${meta.sentCount}건</strong>
          <span class="src-modal-funnel-sub">인재 DB 매칭 후보 초청</span>
        </div>
        <div class="src-modal-funnel-box">
          <span class="src-modal-funnel-label">2단계 · 공고 열람</span>
          <strong class="src-modal-funnel-val">${meta.openedCount}명</strong>
          <span class="src-modal-funnel-sub">오픈 구인 링크 확인</span>
        </div>
        <div class="src-modal-funnel-box active">
          <span class="src-modal-funnel-label">3단계 · 참여신청 접수</span>
          <strong class="src-modal-funnel-val" style="color:#e11d48;">${meta.appliedCount}명</strong>
          <span class="src-modal-funnel-sub">미검토 신규 ${meta.unreviewedCount}명</span>
        </div>
        <div class="src-modal-funnel-box">
          <span class="src-modal-funnel-label">4단계 · 인터뷰·검증</span>
          <strong class="src-modal-funnel-val" style="color:#2563eb;">${meta.interviewCount}명</strong>
          <span class="src-modal-funnel-sub">면접관 배정 및 기술검증</span>
        </div>
      </div>

      <div>
        <div style="font-size:13.5px; font-weight:700; color:#0f172a; margin-bottom:8px;">소싱 발송 및 지원 유입 상세 내역</div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${recipientRows.map(r => `
            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:11px 14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
              <div style="display:flex; align-items:center; gap:10px;">
                <img src="${r.avatarUrl}" alt="${r.name}" style="width:32px; height:32px; border-radius:50%; object-fit:cover;" />
                <div>
                  <div style="font-size:13.5px; font-weight:700; color:#0f172a;">${r.name} <span style="font-size:12px; font-weight:500; color:#64748b;">(${r.grade} · ${r.domain})</span></div>
                  <div style="font-size:11.5px; color:#64748b;">${r.channel} · ${r.sentAt}</div>
                </div>
              </div>
              <span class="zal-status-pill ${r.statusTone === 'blue' ? 'blue' : r.statusTone === 'amber' ? 'green' : 'gray'}">${r.funnelStatus}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; padding-top:6px;">
        <button type="button" class="btn btn-outline btn-sm" onclick="copyPostingWebLink('${post.id}')">
          ${svgIcon('link', 13)} 오픈 구인 웹 링크 복사
        </button>
        <div style="display:flex; gap:8px;">
          <button type="button" class="btn btn-outline" onclick="closeModal()">닫기</button>
          <button type="button" class="btn btn-primary" onclick="closeModal(); openTargetSourcingModal('${post.id}')">
            ${svgIcon('target', 14)} 추가 타겟 소싱 발송
          </button>
        </div>
      </div>
    </div>
  `);
}

function openEditPostingModal(postingId) {
  const post = (state.data?.postings || []).find(p => p.id === postingId);
  if (!post) return;
  state.sourcingFilters.openMenuPostingId = null;

  openModal(`구인 공고 조건 수정 — ${post.role_name}`, `
    <form onsubmit="submitEditPostingModal(event, '${post.id}')">
      <div class="form-grid">
        <div class="form-field" style="grid-column: span 2;">
          <label>공고 타이틀</label>
          <input class="input" name="title" value="${post.title}" required />
        </div>
        <div class="form-field">
          <label>담당 포지션명</label>
          <input class="input" name="role_name" value="${post.role_name}" required />
        </div>
        <div class="form-field">
          <label>요구 기술등급</label>
          <select class="select" name="required_grade">
            ${['특급', '고급', '중급', '초급'].map(g => `<option value="${g}" ${post.required_grade === g ? 'selected' : ''}>${g}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>전문 도메인</label>
          <input class="input" name="required_domain" value="${post.required_domain}" required />
        </div>
        <div class="form-field">
          <label>근무지</label>
          <input class="input" name="work_location" value="${post.work_location}" required />
        </div>
        <div class="form-field">
          <label>투입 기간</label>
          <input class="input" name="period" value="${post.period}" required />
        </div>
        <div class="form-field">
          <label>단가 가이드</label>
          <input class="input" name="rate_guide" value="${post.rate_guide}" required />
        </div>
        <div class="form-field" style="grid-column: span 2;">
          <label>필수 기술 스택 (쉼표로 구분)</label>
          <input class="input" name="required_skills" value="${(post.required_skills || []).join(', ')}" required />
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">수정사항 저장</button>
      </div>
    </form>
  `);
}

async function submitEditPostingModal(e, postingId) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const skills = String(fd.get('required_skills') || '').split(',').map(s => s.trim()).filter(Boolean);
  await apiCall('/api/postings/update', 'POST', {
    posting_id: postingId,
    title: fd.get('title'),
    role_name: fd.get('role_name'),
    required_grade: fd.get('required_grade'),
    required_domain: fd.get('required_domain'),
    work_location: fd.get('work_location'),
    period: fd.get('period'),
    rate_guide: fd.get('rate_guide'),
    required_skills: skills
  });
  closeModal();
  showToast('✅ 구인 공고 조건이 수정되었습니다.');
  await loadState();
}

async function duplicatePosting(postingId) {
  state.sourcingFilters.openMenuPostingId = null;
  await apiCall('/api/postings/duplicate', 'POST', { posting_id: postingId });
  showToast('📋 구인 공고가 복제되어 추가 모집 공고로 등록되었습니다.');
  await loadState();
}

function openSourcingInterviewRequestModal(postingId, candidateName, interviewId = '') {
  const { postings = [], interviews = [], profiles = [], users = [], templates = [], projects = [] } = state.data || {};
  const post = postings.find(p => p.id === postingId);
  const rawName = String(candidateName || '').trim().replace(/\*\*$/, '');
  const inv = (interviewId && interviews.find(i => i.id === interviewId))
    || interviews.find(i => (postingId && i.posting_id === postingId && i.candidate_name === rawName) || i.candidate_name === rawName);
  const prof = profiles.find(p => (inv?.candidate_profile_id && p.id === inv.candidate_profile_id) || p.name === rawName);
  const fb = APPLICANT_FALLBACK_MAP[rawName] || {};
  const prj = projects.find(p => p.id === (post?.project_id || inv?.project_id));
  const internalInterviewers = users.filter(u => u.role_group !== 'EXTERNAL');

  const grade = inv?.tech_grade || prof?.tech_grade || fb.tech_grade || post?.required_grade || '고급';
  const expYears = inv?.experience_years || prof?.experience_years || fb.experience_years || 9;
  const empType = inv?.candidate_type || prof?.employment_type || fb.candidate_type || '프리랜서';
  const availDate = inv?.available_from || prof?.available_date || fb.available_from || '2026-11-25';
  const roleTitle = post?.role_name || inv?.position_name || '선임개발';
  const prjTitle = prj?.name || inv?.project_name || post?.title || '차세대 금융 SI 프로젝트';

  const defaultTemplateId = inv?.template_id
    || (post?.required_domain === '채권' ? 'tpl_bond_fund' : post?.required_domain === '채널계' ? 'tpl_channel_front' : 'tpl_pension_batch');

  openModal(`지원자 인터뷰 요청 및 면접관 배정 — ${rawName} (${grade})`, `
    <form onsubmit="submitSourcingInterviewRequest(event, '${post?.id || postingId || ''}', '${rawName}', '${inv?.id || ''}')">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="padding:14px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <strong style="font-size:16px; color:#0f172a;">${rawName}</strong>
              <span class="inv-grade-pill grade-${grade}">${grade}</span>
              <span style="font-size:13px; color:#475569;">경력 ${expYears}년 · ${empType} · 투입 가능일 ${availDate}</span>
            </div>
          </div>
          <div style="font-size:13px; color:#64748b;">
            지원 프로젝트: <strong style="color:#0f172a;">${prjTitle}</strong> · 포지션: <strong style="color:#0f172a;">${roleTitle}</strong>
          </div>
        </div>

        <div class="form-grid" style="margin-bottom:0;">
          <div class="form-field">
            <label>인터뷰 요청 일시</label>
            <input class="input" name="interview_date" value="${inv?.interview_date || '2026-11-21 14:00'}" required />
          </div>
          <div class="form-field">
            <label>인터뷰 진행 방식</label>
            <select class="select" name="interview_method">
              <option value="화상(Zoom/Teams)" ${inv?.interview_method === '화상(Zoom/Teams)' ? 'selected' : ''}>화상(Zoom/Teams)</option>
              <option value="대면(본사 회의실)" ${inv?.interview_method === '대면(본사 회의실)' ? 'selected' : ''}>대면(본사 회의실)</option>
              <option value="대면(여의도)" ${inv?.interview_method === '대면(여의도)' ? 'selected' : ''}>대면(여의도)</option>
            </select>
          </div>
          <div class="form-field">
            <label>사내 면접관 배정 (배정 시 지원자 열람·평가 권한 자동 부여)</label>
            <select class="select" name="interviewer_user_id">
              ${internalInterviewers.map(u => `<option value="${u.id}" ${inv?.interviewer_user_id === u.id ? 'selected' : ''}>${u.name} (${u.title})</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>직무별 필수 검증 질문 템플릿</label>
            <select class="select" name="template_id">
              ${templates.map(t => `<option value="${t.id}" ${defaultTemplateId === t.id ? 'selected' : ''}>[${t.domain_focus}] ${t.role_type}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-field" style="margin-bottom:0;">
          <label>인터뷰 요청 안내 메시지 (지원자 알림/메일 발송)</label>
          <textarea class="textarea" name="invite_message" rows="3" required>[잘될(ZAL) 인터뷰 요청 안내] 안녕하세요, ${rawName} 님. 지원하신 '${prjTitle} (${roleTitle})' 포지션의 기술·업무 인터뷰를 요청드립니다. 참석 가능 여부를 확인해 주세요.</textarea>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
          <button type="submit" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:6px;">
            ${svgIcon('send', 14)} 인터뷰 요청 발송
          </button>
        </div>
      </div>
    </form>
  `);
}

async function submitSourcingInterviewRequest(e, postingId, candidateName, interviewId = '') {
  e.preventDefault();
  const fd = new FormData(e.target);
  const fb = APPLICANT_FALLBACK_MAP[candidateName] || {};
  await apiCall('/api/interviews/request', 'POST', {
    interview_id: interviewId || undefined,
    posting_id: postingId || undefined,
    candidate_name: candidateName,
    candidate_type: fb.candidate_type || '프리랜서',
    tech_grade: fb.tech_grade || '고급',
    experience_years: fb.experience_years || 9,
    available_from: fb.available_from || '2026-11-25',
    desired_rate: fb.desired_rate || 980,
    resume_summary: fb.resume_summary || '',
    skills: fb.skills,
    domains: fb.domains,
    interview_date: fd.get('interview_date'),
    interview_method: fd.get('interview_method'),
    interviewer_user_id: fd.get('interviewer_user_id'),
    template_id: fd.get('template_id'),
    invite_message: fd.get('invite_message')
  });
  closeModal();
  showToast(`✅ ${candidateName} 지원자에게 인터뷰 요청을 발송하고 면접·검증(인터뷰 예정) 목록에 반영했습니다.`);
  await loadState();
}

async function togglePostingStatus(postingId, fromModal = false) {
  await apiCall('/api/postings/toggle', 'POST', { posting_id: postingId });
  if (fromModal) closeModal();
  showToast('구인 공고 상태가 변경되었습니다.');
  await loadState();
}

function openTargetSourcingModal(postingId) {
  const { postings, profiles } = state.data;
  const post = postings.find(p => p.id === postingId);
  if (!post) return;
  const meta = getPostingEnrichedMeta(post);
  const reqSkills = post.required_skills || [];
  const matchingPool = profiles
    .filter(p => !p.is_internal)
    .map(p => {
      const hitSkills = reqSkills.filter(sk => (p.skills || []).includes(sk));
      const domHit = (p.domains || []).includes(post.required_domain);
      const fitScore = Math.min(98, Math.max(74, Math.round((hitSkills.length / Math.max(1, reqSkills.length)) * 55 + (domHit ? 25 : 10) + 18)));
      return { ...p, hitSkills, domHit, fitScore };
    })
    .sort((a, b) => b.fitScore - a.fitScore);

  openModal(`AI 추천 인재 풀 타겟 소싱 발송 — ${meta.cleanTitle}`, `
    <form onsubmit="submitTargetSourcing(event, '${post.id}')">
      <div style="margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <label style="font-size:13px; font-weight:700; color:#0f172a;">AI 매칭 타겟 소싱 발송 대상 (${matchingPool.length}명)</label>
          <span style="font-size:12px; color:#64748b;">요구 도메인: <strong style="color:#2563eb;">${post.required_domain}</strong> · 등급: <strong style="color:#0f172a;">${post.required_grade}</strong></span>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px; max-height:240px; overflow-y:auto; border:1px solid #e2e8f0; padding:12px; border-radius:12px; background:#f8fafc;">
          ${matchingPool.map(p => `
            <label style="display:flex; align-items:center; justify-content:space-between; gap:10px; font-size:12.5px; cursor:pointer; padding:8px 10px; background:#ffffff; border:1px solid #e2e8f0; border-radius:10px;">
              <div style="display:flex; align-items:center; gap:9px;">
                <input type="checkbox" name="candidate_id" value="${p.id}" ${p.fitScore >= 82 ? 'checked' : ''} />
                <img src="${getAvatarForId(p.id)}" alt="${p.name}" style="width:30px; height:30px; border-radius:50%; object-fit:cover;" />
                <div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <strong style="font-size:13.5px; color:#0f172a;">${p.name}</strong>
                    <span class="src-applicant-grade-chip grade-${p.tech_grade}">${p.tech_grade}</span>
                    <span class="src-applicant-match-chip ${p.fitScore >= 90 ? 'high' : 'mid'}">매칭 ${p.fitScore}%</span>
                  </div>
                  <div style="font-size:11.5px; color:#64748b; margin-top:2px;">
                    가용일: <strong style="color:#0f172a;">${p.available_date}</strong> · 스킬: ${(p.skills || []).slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>
              <span style="font-size:11.5px; color:#64748b;">${p.email}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <div class="form-field" style="margin-bottom:14px;">
        <label>소싱 초청 안내 메시지 (오픈 구인 웹 지원 링크 자동 첨부)</label>
        <textarea class="textarea" name="custom_message" rows="3">[잘될(ZAL) 타겟 소싱 초청] 안녕하세요. '${meta.clientName} ${meta.cleanTitle}' 포지션(${post.period}, ${post.rate_guide})에 귀하의 ${post.required_domain} 수행 이력이 부합하여 우선 초청드립니다.</textarea>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:6px;">${svgIcon('send', 14)} 선택 후보자 일괄 발송</button>
      </div>
    </form>
  `);
}

async function submitTargetSourcing(e, postingId) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const candidateIds = fd.getAll('candidate_id');
  await apiCall('/api/postings/target-sourcing', 'POST', {
    posting_id: postingId,
    candidate_ids: candidateIds,
    custom_message: fd.get('custom_message')
  });
  closeModal();
  showToast(`후보자 ${candidateIds.length}명에게 타겟 소싱 알림을 발송했습니다!`);
  await loadState();
}

function openEasyApplyModal(postingId) {
  const { postings, currentUser } = state.data;
  const post = postings.find(p => p.id === postingId);
  if (!post) return;
  const isInternalReferral = currentUser?.role_group === 'INTERNAL';

  openModal(`${isInternalReferral ? '사내 지인 추천 접수' : '오픈 프로젝트 간편 지원'} — ${post.title}`, `
    <form onsubmit="submitEasyApply(event, '${post.id}')">
      <div class="form-grid">
        <div class="form-field">
          <label>지원자 성명</label>
          <input class="input" name="candidate_name" value="조민수" required />
        </div>
        <div class="form-field">
          <label>소속 유형</label>
          <select class="select" name="candidate_type">
            <option value="프리랜서">프리랜서</option>
            <option value="반프리">반프리</option>
            <option value="개인사업자">개인사업자</option>
            <option value="협력사">협력사</option>
          </select>
        </div>
        <div class="form-field">
          <label>SW 기술등급</label>
          <select class="select" name="tech_grade">
            ${['특급', '고급', '중급', '초급'].map(g => `<option value="${g}" ${post.required_grade === g ? 'selected' : ''}>${g}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>투입 가능 시기</label>
          <input type="date" class="input" name="available_from" value="2026-11-28" required />
        </div>
        <div class="form-field">
          <label>연락처</label>
          <input class="input" name="candidate_phone" value="010-9182-5541" required />
        </div>
        <div class="form-field">
          <label>이메일</label>
          <input class="input" name="candidate_email" value="ms.cho.dev@gmail.com" required />
        </div>
        <div class="form-field">
          <label>희망 단가 (만원/월)</label>
          <input type="number" class="input" name="desired_rate" value="1020" />
        </div>
        <div class="form-field">
          <label>추천인</label>
          <input class="input" name="recommender" value="${isInternalReferral ? `${currentUser.name} (사내추천)` : '오픈 구인 직접 지원'}" />
        </div>
      </div>

      <div class="form-field" style="margin-bottom:12px;">
        <label>보유 스킬 및 핵심 수행이력 요약</label>
        <textarea class="textarea" name="resume_summary">${post.required_domain} 차세대 원장/배치 개발 11년차. ${post.required_skills.join(', ')} 실무 다수 수행.</textarea>
      </div>

      <div style="margin-bottom:16px;">
        <label class="switch-label">
          <input type="checkbox" name="create_profile_in_db" checked />
          첨부 이력서를 AI로 자동 파싱하여 통합 인재 DB에 동시 적재
        </label>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">제출 완료</button>
      </div>
    </form>
  `);
}

async function submitEasyApply(e, postingId) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await apiCall('/api/postings/apply', 'POST', {
    posting_id: postingId,
    candidate_name: fd.get('candidate_name'),
    candidate_type: fd.get('candidate_type'),
    tech_grade: fd.get('tech_grade'),
    available_from: fd.get('available_from'),
    candidate_phone: fd.get('candidate_phone'),
    candidate_email: fd.get('candidate_email'),
    desired_rate: Number(fd.get('desired_rate')),
    recommender: fd.get('recommender'),
    resume_summary: fd.get('resume_summary'),
    create_profile_in_db: fd.get('create_profile_in_db') === 'on'
  });
  closeModal();
  showToast('지원이 접수되었습니다! 구인·소싱 지원자 목록에서 프로필 검토 후 인터뷰 요청을 발송할 수 있습니다.');
  await loadState();
}

/* =========================================================================
   TAB 5: STANDARD INTERVIEW & MANDATORY CHECKLIST VERIFICATION
   ========================================================================= */
function getRoleScopedInterviews() {
  const { interviews = [], currentUser } = state.data || {};
  if (!currentUser) return [];
  if (currentUser.role_group === 'MASTER' || currentUser.role_group === 'MANAGER') {
    return interviews;
  }
  if (currentUser.role_group === 'INTERNAL') {
    // 내부 면접관: 본인이 면접관으로 지정된 후보자만 기본 노출
    return interviews.filter(i => i.interviewer_user_id === currentUser.id);
  }
  // 외부 방문자/프리랜서: 본인 지원 내역만 노출
  return interviews.filter(i => i.candidate_profile_id === currentUser.linked_profile_id || i.candidate_name === currentUser.name.replace(/\s+.*$/, ''));
}

function getFilteredInterviews(baseList) {
  const { projects = [], postings = [], profiles = [] } = state.data || {};
  const ivf = state.interviewFilters || {};

  return baseList.filter(inv => {
    const stage = normalizeInterviewStage(inv);
    const prj = projects.find(p => p.id === inv.project_id);
    const post = postings.find(p => p.id === inv.posting_id);
    const prof = profiles.find(p => (inv.candidate_profile_id && p.id === inv.candidate_profile_id) || p.name === inv.candidate_name);

    // 1. 상태 필터
    if (ivf.status && ivf.status !== 'ALL') {
      if (stage !== ivf.status) return false;
    }

    // 2. 즐겨찾기 필터
    if (ivf.onlyFavorites && !inv.favorite) return false;

    // 3. 상세 필터 - 기술 스택
    if (ivf.skill && ivf.skill !== 'ALL') {
      const skillsLower = (inv.skills || []).map(s => String(s).toLowerCase());
      if (!skillsLower.includes(String(ivf.skill).toLowerCase())) return false;
    }

    // 4. 상세 필터 - 기술등급
    if (ivf.grade && ivf.grade !== 'ALL') {
      if (inv.tech_grade !== ivf.grade) return false;
    }

    // 5. 상세 필터 - 경력 연수
    if (ivf.minExp && ivf.minExp !== 'ALL') {
      const exp = Number(inv.experience_years || prof?.experience_years || 0);
      if (exp < Number(ivf.minExp)) return false;
    }

    // 6. 상세 필터 - 면접 평가 점수
    if (ivf.minScore && ivf.minScore !== 'ALL') {
      const isEvalDone = (stage === '평가 완료' || stage === '최종 결과') && Number(inv.total_score || 0) > 0;
      if (ivf.minScore === 'UNRATED') {
        if (isEvalDone) return false;
      } else {
        if (!isEvalDone || Number(inv.total_score || 0) < Number(ivf.minScore)) return false;
      }
    }

    // 7. 상세 필터 - 투입 가능일
    if (ivf.availBefore && ivf.availBefore !== 'ALL') {
      const avail = String(inv.available_from || '2026-11-20');
      if (avail > ivf.availBefore) return false;
    }

    // 8. 상세 필터 - 희망 단가
    if (ivf.maxRate && ivf.maxRate !== 'ALL') {
      if (inv.desired_rate !== null && inv.desired_rate !== undefined && Number(inv.desired_rate) > 0) {
        if (Number(inv.desired_rate) > Number(ivf.maxRate)) return false;
      }
    }

    // 9. 상세 필터 - 검증 완료 여부
    if (ivf.verified && ivf.verified !== 'ALL') {
      const isVer = Boolean(inv.verified || prof?.verified || (stage === '최종 결과' && getInterviewFinalResultLabel(inv) === '선정'));
      if (ivf.verified === 'VERIFIED' && !isVer) return false;
      if (ivf.verified === 'UNVERIFIED' && isVer) return false;
    }

    // 10. 통합 검색 (후보자명, 기술 스택, 직급 및 기술등급, 면접관, 프로젝트명)
    if (ivf.keyword && ivf.keyword.trim()) {
      const kw = ivf.keyword.trim().toLowerCase();
      const projectTitle = inv.project_name || prj?.name || '';
      const clientName = prj?.client || '';
      const positionTitle = inv.position_name || post?.role_name || '';
      const jobTitle = inv.job_title || prof?.job_title || '';
      const skillsText = (inv.skills || []).join(' ');
      const domainsText = (inv.domains || []).join(' ');
      const hay = [
        inv.candidate_name,
        inv.candidate_type,
        inv.tech_grade,
        jobTitle,
        skillsText,
        domainsText,
        inv.interviewer_name,
        projectTitle,
        clientName,
        positionTitle,
        stage
      ].filter(Boolean).join(' ').toLowerCase();
      if (!hay.includes(kw)) return false;
    }

    return true;
  }).sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
}

function compareFavoriteCandidates() {
  const scoped = getRoleScopedInterviews();
  const favIds = scoped.filter(i => i.favorite).map(i => i.id).slice(0, 4);
  if (favIds.length === 0) {
    showToast('★ 관심 후보자로 등록된 인원이 없습니다. 카드 우측 상단의 별 아이콘을 눌러 등록해 보세요.');
    return;
  }
  state.interviewFilters.compareIds = favIds;
  renderActiveTab();
  openInterviewComparisonModal();
}

function getActiveDetailFilterCount() {
  const ivf = state.interviewFilters || {};
  let cnt = 0;
  if (ivf.skill && ivf.skill !== 'ALL') cnt++;
  if (ivf.grade && ivf.grade !== 'ALL') cnt++;
  if (ivf.minExp && ivf.minExp !== 'ALL') cnt++;
  if (ivf.minScore && ivf.minScore !== 'ALL') cnt++;
  if (ivf.availBefore && ivf.availBefore !== 'ALL') cnt++;
  if (ivf.maxRate && ivf.maxRate !== 'ALL') cnt++;
  if (ivf.verified && ivf.verified !== 'ALL') cnt++;
  if (ivf.onlyFavorites) cnt++;
  return cnt;
}

function updateInterviewFilter(key, val) {
  state.interviewFilters[key] = val;
  if (key === 'keyword') {
    const grid = document.getElementById('interviewCardsGrid');
    const countLabel = document.getElementById('interviewResultCountLabel');
    if (grid) {
      grid.innerHTML = renderInterviewCardsHtml();
      if (countLabel) {
        const scoped = getRoleScopedInterviews();
        const filtered = getFilteredInterviews(scoped);
        countLabel.textContent = `조회 결과 ${filtered.length}명`;
      }
      return;
    }
  }
  renderInterviewsTab();
}

function resetInterviewDetailFilters() {
  state.interviewFilters.skill = 'ALL';
  state.interviewFilters.grade = 'ALL';
  state.interviewFilters.minExp = 'ALL';
  state.interviewFilters.minScore = 'ALL';
  state.interviewFilters.availBefore = 'ALL';
  state.interviewFilters.maxRate = 'ALL';
  state.interviewFilters.verified = 'ALL';
  state.interviewFilters.onlyFavorites = false;
  renderInterviewsTab();
}

function toggleInterviewDetailFilterPopover(event) {
  if (event) event.stopPropagation();
  state.interviewFilters.detailPopoverOpen = !state.interviewFilters.detailPopoverOpen;
  renderInterviewsTab();
}

function closeInterviewDetailFilterPopover() {
  if (state.interviewFilters.detailPopoverOpen) {
    state.interviewFilters.detailPopoverOpen = false;
    renderInterviewsTab();
  }
}

function renderInterviewCardsHtml() {
  const { permissions, currentUser } = state.data;
  const scoped = getRoleScopedInterviews();
  const filteredInterviews = getFilteredInterviews(scoped);

  if (filteredInterviews.length === 0) {
    return `
      <div class="inv-empty-state">
        <div class="inv-empty-icon">${svgIcon('search', 24)}</div>
        <div class="inv-empty-title">조건에 해당하는 인터뷰 후보자가 없습니다.</div>
        <div class="inv-empty-desc">상태 필터나 검색어, 상세 필터 조건을 변경해 보세요.</div>
        <button type="button" class="btn btn-outline btn-sm" style="margin-top:8px;" onclick="state.interviewFilters.status='ALL'; state.interviewFilters.keyword=''; resetInterviewDetailFilters();">
          전체 필터 초기화
        </button>
      </div>
    `;
  }

  return renderInterviewMasonryColumnsHtml(filteredInterviews, permissions, currentUser);
}

function renderInterviewsTab() {
  const { permissions, currentUser } = state.data;
  const el = document.getElementById('tab-interviews');
  if (!el) return;
  const ivf = state.interviewFilters || {};

  const scopedInterviews = getRoleScopedInterviews();
  const filteredInterviews = getFilteredInterviews(scopedInterviews);

  const canViewSensitive = Boolean(permissions?.can_view_sensitive_info);
  const isInternalRole = currentUser?.role_group === 'INTERNAL';
  const hideSensitive = isInternalRole || !canViewSensitive;
  const canConfirmFinal = currentUser?.role_group === 'MASTER' || currentUser?.role_group === 'MANAGER';

  const countStage = (targetStage) => scopedInterviews.filter(i => normalizeInterviewStage(i) === targetStage).length;

  const docReviewCount = countStage('서류 검토');
  const scheduledCount = countStage('인터뷰 예정');
  const inProgressCount = countStage('인터뷰 진행');
  const evalPendingCount = countStage('평가 대기');
  const evalDoneCount = countStage('평가 완료');
  const finalResultCount = countStage('최종 결과');
  const favCount = scopedInterviews.filter(i => i.favorite).length;

  // 4-2. 인터뷰 현황 요약 영역 4대 지표
  // 1) 인터뷰 예정: 일정이 확정되어 면접을 기다리는 인원 (인터뷰 예정 + 인터뷰 진행 포함 안내)
  const kpiScheduledTotal = scheduledCount + inProgressCount;
  // 2) 평가 작성 대기: 면접은 완료됐지만 평가가 미완료된 인원
  const kpiEvalPending = evalPendingCount;
  // 3) 최종 결정 대기: 평가가 완료됐지만 최종 결과가 확정되지 않은 인원
  const kpiDecisionPending = evalDoneCount;
  // 4) 검증 완료: 면접 평가 및 최종 결과 처리가 완료된 인원
  const kpiVerifiedDone = finalResultCount;

  // 모든 후보자 스킬 목록 추출
  const allSkillSet = new Set(['Java', 'Spring Batch', 'Spring Boot', 'Oracle', 'React', 'TypeScript', 'WebSquare', 'ProFrame', 'SQL튜닝', '채권평가', '펀드회계']);
  scopedInterviews.forEach(i => (i.skills || []).forEach(s => allSkillSet.add(s)));
  const skillOptions = Array.from(allSkillSet);

  const activeFilterCount = getActiveDetailFilterCount();
  const compareIds = ivf.compareIds || [];

  // 권한 안내 배지 텍스트
  const roleScopeBadge = currentUser?.role_group === 'MASTER'
    ? { label: '임원/부서장(Master) · 전체 열람 및 최종 선정 권한', cls: 'master' }
    : currentUser?.role_group === 'MANAGER'
      ? { label: '인력/제안 관리자 · 일정·면접관 및 평가 관리 권한', cls: 'manager' }
      : { label: `내부 면접관 (${currentUser?.name || ''}) · 본인 배정 후보자 전용 (민감정보 보호)`, cls: 'interviewer' };

  // 활성 상세 필터 칩 렌더링
  const activeFilterChips = [];
  if (ivf.skill && ivf.skill !== 'ALL') activeFilterChips.push({ key: 'skill', val: 'ALL', label: `기술: ${ivf.skill}` });
  if (ivf.grade && ivf.grade !== 'ALL') activeFilterChips.push({ key: 'grade', val: 'ALL', label: `등급: ${ivf.grade}` });
  if (ivf.minExp && ivf.minExp !== 'ALL') activeFilterChips.push({ key: 'minExp', val: 'ALL', label: `경력: ${ivf.minExp}년 이상` });
  if (ivf.minScore && ivf.minScore !== 'ALL') {
    activeFilterChips.push({ key: 'minScore', val: 'ALL', label: ivf.minScore === 'UNRATED' ? '평가: 미완료' : `종합평가: ${ivf.minScore}점 이상` });
  }
  if (ivf.availBefore && ivf.availBefore !== 'ALL') activeFilterChips.push({ key: 'availBefore', val: 'ALL', label: `투입가능일: ~${ivf.availBefore}` });
  if (!hideSensitive && ivf.maxRate && ivf.maxRate !== 'ALL') activeFilterChips.push({ key: 'maxRate', val: 'ALL', label: `희망단가: 월 ${Number(ivf.maxRate).toLocaleString()}만원 이하` });
  if (ivf.verified && ivf.verified !== 'ALL') activeFilterChips.push({ key: 'verified', val: 'ALL', label: ivf.verified === 'VERIFIED' ? 'DB 검증 완료' : '미검증 신규' });
  if (ivf.onlyFavorites) activeFilterChips.push({ key: 'onlyFavorites', val: false, label: '★ 즐겨찾기 후보자' });

  // 4-5. 후속 조치 필요 영역 노출 여부
  const showFollowupBanner = kpiEvalPending > 0 || (canConfirmFinal && kpiDecisionPending > 0);

  el.innerHTML = `
    <div class="filter-bar">
      ${[
        { key: 'ALL', label: '전체', count: scopedInterviews.length },
        { key: '인터뷰 예정', label: '인터뷰 예정', count: scheduledCount },
        { key: '평가 대기', label: '평가 대기', count: evalPendingCount },
        { key: '평가 완료', label: '평가 완료', count: evalDoneCount },
        { key: '최종 결과', label: '최종 결과', count: finalResultCount }
      ].map(tab => `
        <button
          type="button"
          class="zal-chip-btn ${(ivf.status || 'ALL') === tab.key ? 'active' : ''}"
          onclick="updateInterviewFilter('status', '${tab.key}')"
        >
          ${tab.label} (${tab.count})
        </button>
      `).join('')}

      ${renderChipSearchBox('interviewSearchInput', ivf.keyword || '', '후보자명, 기술 스택, 직급·등급, 면접관, 프로젝트명 검색...', 'interviews')}

      <div class="inv-detail-filter-anchor">
        <button
          type="button"
          style="width:32px; height:32px; padding:0; display:inline-flex; align-items:center; justify-content:center; background:transparent; border:none; color:${ivf.detailPopoverOpen || activeFilterCount > 0 ? '#0f172a' : '#64748b'}; cursor:pointer;"
          onclick="toggleInterviewDetailFilterPopover(event)"
          title="상세 필터${activeFilterCount > 0 ? ` (${activeFilterCount}개 적용중)` : ''}"
          aria-label="상세 필터"
        >
          ${svgIcon('settings', 17)}
        </button>

        ${ivf.detailPopoverOpen ? `
          <div class="inv-detail-filter-popover" onclick="event.stopPropagation();">
            <div class="inv-popover-header">
              <strong>후보자 상세 조건 필터</strong>
              <button type="button" class="inv-popover-reset-btn" onclick="resetInterviewDetailFilters()">초기화</button>
            </div>
            <div class="inv-popover-grid">
              <div class="inv-popover-field">
                <label>기술 스택</label>
                <select class="select" onchange="updateInterviewFilter('skill', this.value)">
                  <option value="ALL" ${(ivf.skill || 'ALL') === 'ALL' ? 'selected' : ''}>전체 기술 스택</option>
                  ${skillOptions.map(sk => `<option value="${sk}" ${ivf.skill === sk ? 'selected' : ''}>${sk}</option>`).join('')}
                </select>
              </div>
              <div class="inv-popover-field">
                <label>기술등급</label>
                <select class="select" onchange="updateInterviewFilter('grade', this.value)">
                  <option value="ALL" ${(ivf.grade || 'ALL') === 'ALL' ? 'selected' : ''}>전체 등급</option>
                  ${['특급', '고급', '중급', '초급'].map(g => `<option value="${g}" ${ivf.grade === g ? 'selected' : ''}>${g}</option>`).join('')}
                </select>
              </div>
              <div class="inv-popover-field">
                <label>경력 연수</label>
                <select class="select" onchange="updateInterviewFilter('minExp', this.value)">
                  <option value="ALL" ${(ivf.minExp || 'ALL') === 'ALL' ? 'selected' : ''}>전체 경력</option>
                  <option value="5" ${ivf.minExp === '5' ? 'selected' : ''}>5년 이상</option>
                  <option value="7" ${ivf.minExp === '7' ? 'selected' : ''}>7년 이상</option>
                  <option value="9" ${ivf.minExp === '9' ? 'selected' : ''}>9년 이상</option>
                  <option value="10" ${ivf.minExp === '10' ? 'selected' : ''}>10년 이상</option>
                </select>
              </div>
              <div class="inv-popover-field">
                <label>면접 평가 점수</label>
                <select class="select" onchange="updateInterviewFilter('minScore', this.value)">
                  <option value="ALL" ${(ivf.minScore || 'ALL') === 'ALL' ? 'selected' : ''}>전체 점수</option>
                  <option value="4.7" ${ivf.minScore === '4.7' ? 'selected' : ''}>★ 4.7점 이상 (최우수)</option>
                  <option value="4.5" ${ivf.minScore === '4.5' ? 'selected' : ''}>★ 4.5점 이상 (우수)</option>
                  <option value="4.0" ${ivf.minScore === '4.0' ? 'selected' : ''}>★ 4.0점 이상</option>
                  <option value="UNRATED" ${ivf.minScore === 'UNRATED' ? 'selected' : ''}>평가 미완료 후보자</option>
                </select>
              </div>
              <div class="inv-popover-field">
                <label>투입 가능일</label>
                <select class="select" onchange="updateInterviewFilter('availBefore', this.value)">
                  <option value="ALL" ${(ivf.availBefore || 'ALL') === 'ALL' ? 'selected' : ''}>전체 기간</option>
                  <option value="2026-11-22" ${ivf.availBefore === '2026-11-22' ? 'selected' : ''}>즉시 ~ 11/22 이내</option>
                  <option value="2026-11-30" ${ivf.availBefore === '2026-11-30' ? 'selected' : ''}>11월 말(11/30) 이내</option>
                  <option value="2026-12-15" ${ivf.availBefore === '2026-12-15' ? 'selected' : ''}>12월 중순(12/15) 이내</option>
                </select>
              </div>
              ${!hideSensitive ? `
                <div class="inv-popover-field">
                  <label>희망 단가</label>
                  <select class="select" onchange="updateInterviewFilter('maxRate', this.value)">
                    <option value="ALL" ${(ivf.maxRate || 'ALL') === 'ALL' ? 'selected' : ''}>전체 단가</option>
                    <option value="900" ${ivf.maxRate === '900' ? 'selected' : ''}>월 900만원 이하</option>
                    <option value="1000" ${ivf.maxRate === '1000' ? 'selected' : ''}>월 1,000만원 이하</option>
                    <option value="1050" ${ivf.maxRate === '1050' ? 'selected' : ''}>월 1,050만원 이하</option>
                    <option value="1100" ${ivf.maxRate === '1100' ? 'selected' : ''}>월 1,100만원 이하</option>
                  </select>
                </div>
              ` : ''}
              <div class="inv-popover-field">
                <label>검증 완료 여부</label>
                <select class="select" onchange="updateInterviewFilter('verified', this.value)">
                  <option value="ALL" ${(ivf.verified || 'ALL') === 'ALL' ? 'selected' : ''}>전체</option>
                  <option value="VERIFIED" ${ivf.verified === 'VERIFIED' ? 'selected' : ''}>검증 완료 (DB 자산화)</option>
                  <option value="UNVERIFIED" ${ivf.verified === 'UNVERIFIED' ? 'selected' : ''}>미검증 (신규)</option>
                </select>
              </div>
              <div class="inv-popover-field" style="display:flex; align-items:flex-end;">
                <label class="switch-label" style="padding-bottom:8px; cursor:pointer;">
                  <input type="checkbox" ${ivf.onlyFavorites ? 'checked' : ''} onchange="updateInterviewFilter('onlyFavorites', this.checked)" />
                  <span>★ 즐겨찾기 후보자만 보기</span>
                </label>
              </div>
            </div>
            <div class="inv-popover-footer">
              <span style="font-size:12.5px; color:#64748b;">조건 일치 후보자 <strong>${filteredInterviews.length}명</strong></span>
              <button type="button" class="btn btn-primary btn-sm" onclick="closeInterviewDetailFilterPopover()">적용 완료</button>
            </div>
          </div>
        ` : ''}
      </div>

      ${compareIds.length > 0 ? `
        <button
          type="button"
          class="zal-chip-btn active"
          style="display:inline-flex; align-items:center; gap:5px;"
          onclick="openInterviewComparisonModal()"
        >
          ${svgIcon('list', 13)}
          <span>후보자 비교 (${compareIds.length})</span>
        </button>
      ` : ''}

      ${permissions.can_evaluate_interviews || permissions.can_schedule_interviews ? `
        <button
          type="button"
          class="btn btn-primary"
          style="width:170px; height:42px; padding:0 14px; font-size:14.5px; font-weight:700; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px; margin-left:auto;"
          onclick="openQuestionTemplatesModal()"
        >
          ${svgIcon('file', 15)} 질문 리스트 관리
        </button>
      ` : ''}
    </div>

    ${activeFilterChips.length > 0 ? `
      <div class="inv-active-filters-bar" style="margin-bottom:14px;">
        <span class="inv-active-filters-label">적용된 상세 필터:</span>
        ${activeFilterChips.map(ch => `
          <span class="inv-active-filter-chip">
            <span>${ch.label}</span>
            <button type="button" onclick="updateInterviewFilter('${ch.key}', ${typeof ch.val === 'boolean' ? ch.val : `'${ch.val}'`})">&times;</button>
          </span>
        `).join('')}
        <button type="button" class="inv-clear-all-filters-btn" onclick="resetInterviewDetailFilters()">전체 해제</button>
      </div>
    ` : ''}

    <div id="interviewCardsGrid" class="inv-vertical-grid">
      ${renderInterviewCardsHtml()}
    </div>
  `;
}

/* 1) 서류 검토 모달 (검토하기 액션) */
function openDocumentReviewModal(interviewId) {
  const { interviews = [], users = [], templates = [], projects = [], postings = [], permissions, currentUser } = state.data || {};
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const prj = projects.find(p => p.id === inv.project_id);
  const post = postings.find(p => p.id === inv.posting_id);
  const internalInterviewers = users.filter(u => u.role_group !== 'EXTERNAL');
  const hideSensitive = currentUser?.role_group === 'INTERNAL' || !permissions?.can_view_sensitive_info;

  openModal(`지원자 서류 검토 및 인터뷰 대상 선정 — ${inv.candidate_name} (${inv.tech_grade})`, `
    <form onsubmit="submitDocumentReview(event, '${inv.id}')">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="padding:16px 18px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
            <div>
              <strong style="font-size:17px; color:#0f172a;">${inv.candidate_name}</strong>
              <span style="font-size:13.5px; color:#475569; margin-left:6px;">${inv.tech_grade} · 경력 ${inv.experience_years || 9}년 (${inv.job_title || '선임'}) · ${inv.candidate_type}</span>
            </div>
            <span class="inv-status-badge stage-doc">서류 검토</span>
          </div>
          <div style="font-size:13px; color:#475569; margin-bottom:8px;">
            지원 프로젝트: <strong style="color:#0f172a;">${inv.project_name || prj?.name || '-'}</strong> · 포지션: <strong style="color:#0f172a;">${inv.position_name || post?.role_name || '-'}</strong>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
            ${(inv.skills || []).map(sk => `<span class="inv-skill-pill">${sk}</span>`).join('')}
          </div>
          <div style="font-size:13.5px; color:#334155; line-height:1.5;">
            ${inv.career_highlight ? `<strong>[주요 수행 이력]</strong> ${inv.career_highlight}<br/>` : ''}
            ${inv.resume_summary || ''}
          </div>
          <div style="display:flex; gap:16px; flex-wrap:wrap; margin-top:10px; padding-top:10px; border-top:1px solid #e2e8f0; font-size:13px; color:#475569;">
            <span>투입 가능일: <strong style="color:#0f172a;">${inv.available_from || '즉시'}</strong></span>
            ${!hideSensitive && inv.desired_rate ? `<span>희망 단가: <strong style="color:#0f172a;">월 ${Number(inv.desired_rate).toLocaleString()}만원</strong></span>` : ''}
            <span>지원 경로: <strong style="color:#0f172a;">${inv.recommender || '직접 지원'}</strong></span>
          </div>
        </div>

        <div class="form-field">
          <label>서류 검토 결과 선택</label>
          <select class="select" name="decision" onchange="const box=document.getElementById('docReviewScheduleFields'); if(box) box.style.display = this.value === 'PASS' ? 'grid' : 'none';">
            <option value="PASS" selected>서류 합격 → 인터뷰 예정 단계로 전환 (면접 일정·면접관 배정)</option>
            <option value="HOLD">서류 보류 → 인재풀 예비 후보로 보류 처리</option>
            <option value="REJECT">서류 불합격 → 최종 불합격 처리</option>
          </select>
        </div>

        <div id="docReviewScheduleFields" class="form-grid" style="margin-bottom:0;">
          <div class="form-field">
            <label>면접 예정 일시</label>
            <input class="input" name="interview_date" value="${inv.interview_date || '2026-11-21 14:00'}" />
          </div>
          <div class="form-field">
            <label>면접 방식</label>
            <select class="select" name="interview_method">
              <option value="화상(Zoom/Teams)">화상(Zoom/Teams)</option>
              <option value="대면(본사 회의실)">대면(본사 회의실)</option>
              <option value="대면(여의도)">대면(여의도)</option>
            </select>
          </div>
          <div class="form-field">
            <label>담당 면접관 배정</label>
            <select class="select" name="interviewer_user_id">
              ${internalInterviewers.map(u => `<option value="${u.id}" ${inv.interviewer_user_id === u.id ? 'selected' : ''}>${u.name} (${u.title})</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>직무별 필수 질문 템플릿</label>
            <select class="select" name="template_id">
              ${templates.map(t => `<option value="${t.id}" ${inv.template_id === t.id ? 'selected' : ''}>[${t.domain_focus}] ${t.role_type}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-field" style="margin-bottom:4px;">
          <label>서류 검토 의견</label>
          <textarea class="textarea" name="doc_review_note" rows="2">${inv.doc_review_note || '요구 기술 스택 및 도메인 수행 경력이 부합하여 기술·성향 인터뷰 대상자로 선정함.'}</textarea>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <button type="button" class="btn btn-outline btn-sm" onclick="openCandidateResumeModal('${inv.id}')">후보자 상세 프로필 열람</button>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
            <button type="submit" class="btn btn-primary">서류 검토 확정</button>
          </div>
        </div>
      </div>
    </form>
  `);
}

async function submitDocumentReview(e, interviewId) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const decision = fd.get('decision');
  await apiCall('/api/interviews/review-doc', 'POST', {
    interview_id: interviewId,
    decision,
    next_status: '인터뷰 예정',
    interview_date: fd.get('interview_date'),
    interview_method: fd.get('interview_method'),
    interviewer_user_id: fd.get('interviewer_user_id'),
    template_id: fd.get('template_id'),
    doc_review_note: fd.get('doc_review_note')
  });
  closeModal();
  showToast(
    decision === 'PASS'
      ? '서류 검토 합격 처리 및 인터뷰 일정·면접관 배정이 완료되었습니다.'
      : `서류 검토 결과(${decision === 'HOLD' ? '보류' : '불합격'})가 반영되었습니다.`
  );
  await loadState();
}

/* 2) 일정·면접관 관리 모달 */
function openScheduleInterviewModal(interviewId) {
  const { interviews, users, templates } = state.data;
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const internalInterviewers = users.filter(u => u.role_group !== 'EXTERNAL');
  const curStage = normalizeInterviewStage(inv);

  openModal(`일정·면접관 관리 — ${inv.candidate_name} (${inv.tech_grade})`, `
    <form onsubmit="submitScheduleInterview(event, '${inv.id}')">
      <div class="form-grid">
        <div class="form-field">
          <label>면접 일시</label>
          <input class="input" name="interview_date" value="${inv.interview_date || '2026-11-20 14:00'}" required />
        </div>
        <div class="form-field">
          <label>면접 방식</label>
          <select class="select" name="interview_method">
            <option value="화상(Zoom/Teams)" ${inv.interview_method === '화상(Zoom/Teams)' ? 'selected' : ''}>화상(Zoom/Teams)</option>
            <option value="대면(본사 회의실)" ${inv.interview_method === '대면(본사 회의실)' ? 'selected' : ''}>대면(본사 회의실)</option>
            <option value="대면(여의도)" ${inv.interview_method === '대면(여의도)' ? 'selected' : ''}>대면(여의도)</option>
          </select>
        </div>
        <div class="form-field">
          <label>내부 면접관 지정 (지정 시 후보자 열람·평가 권한 자동 부여)</label>
          <select class="select" name="interviewer_user_id">
            ${internalInterviewers.map(u => `<option value="${u.id}" ${inv.interviewer_user_id === u.id ? 'selected' : ''}>${u.name} (${u.title})</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>직무별 필수 검증 질문 리스트</label>
          <select class="select" name="template_id">
            ${templates.map(t => `<option value="${t.id}" ${inv.template_id === t.id ? 'selected' : ''}>[${t.domain_focus}] ${t.role_type}</option>`).join('')}
          </select>
        </div>
        <div class="form-field" style="grid-column: 1 / -1;">
          <label>인터뷰 진행 상태</label>
          <select class="select" name="status">
            <option value="인터뷰 예정" ${curStage === '인터뷰 예정' ? 'selected' : ''}>인터뷰 예정 (일정 확정 및 면접 대기)</option>
            <option value="평가 대기" ${curStage === '평가 대기' ? 'selected' : ''}>평가 대기 (면접 진행 및 평가 작성 대기)</option>
          </select>
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:12px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">일정 및 면접관 저장</button>
      </div>
    </form>
  `);
}

async function submitScheduleInterview(e, interviewId) {
  e.preventDefault();
  const fd = new FormData(e.target);
  await apiCall('/api/interviews/schedule', 'POST', {
    interview_id: interviewId,
    interview_date: fd.get('interview_date'),
    interview_method: fd.get('interview_method'),
    interviewer_user_id: fd.get('interviewer_user_id'),
    template_id: fd.get('template_id'),
    status: fd.get('status') || '인터뷰 예정'
  });
  closeModal();
  showToast('인터뷰 일정 및 내부 면접관 배정이 저장되었습니다.');
  await loadState();
}

/* 3) 인터뷰 결과 보기 / 결과 상세 보기 모달 */
function openInterviewResultViewModal(interviewId) {
  const { interviews, templates, projects, postings, profiles, permissions, currentUser } = state.data;
  const inv = (interviews || []).find(i => i.id === interviewId);
  if (!inv) return;
  const tpl = (templates || []).find(t => t.id === inv.template_id) || templates?.[0];
  const prj = (projects || []).find(p => p.id === inv.project_id);
  const post = (postings || []).find(p => p.id === inv.posting_id);
  const prof = (profiles || []).find(p => (inv.candidate_profile_id && p.id === inv.candidate_profile_id) || p.name === inv.candidate_name);

  const stageMeta = getInterviewStageBadgeMeta(inv);
  const stage = stageMeta.stage;
  const results = Array.isArray(inv.checklist_results) ? inv.checklist_results : [];
  const scoreVal = Number(inv.total_score || 0);

  const canViewSensitive = Boolean(permissions?.can_view_sensitive_info);
  const isInternalRole = currentUser?.role_group === 'INTERNAL';
  const hideSensitive = isInternalRole || !canViewSensitive;
  const canEdit = Boolean(permissions?.can_evaluate_interviews || (currentUser && inv.interviewer_user_id === currentUser.id));
  const canConfirmFinal = currentUser?.role_group === 'MASTER' || currentUser?.role_group === 'MANAGER';

  const comp = inv.competency_scores || {
    technical: scoreVal > 0 ? scoreVal : 4.5,
    technical_note: '도메인 아키텍처 및 요구 기술 스택 실무 숙련도 검증',
    execution: scoreVal > 0 ? scoreVal : 4.5,
    execution_note: '프로젝트 과업 수행 역량 및 일정·품질 책임감 검증',
    communication: scoreVal > 0 ? scoreVal : 4.5,
    communication_note: '현업 및 개발팀 내 협업 커뮤니케이션 태도 검증'
  };

  const interviewerEvals = Array.isArray(inv.interviewer_evaluations) && inv.interviewer_evaluations.length > 0
    ? inv.interviewer_evaluations
    : [
        {
          interviewer_name: inv.interviewer_name || '조성현 상무',
          role: '담당 면접관',
          score: scoreVal > 0 ? scoreVal : 4.5,
          comment: inv.interviewer_opinion || '필수 질문 기반 기술 및 수행 역량 검증 완료.',
          date: inv.interview_date || '2026-11-13'
        }
      ];

  const isLinkedToDb = Boolean(prof || inv.candidate_profile_id);

  openModal(`${stage === '최종 결과' ? '결과 상세 보기' : '인터뷰 결과 보기'} — ${inv.candidate_name} (${inv.tech_grade})`, `
    <div style="display:flex; flex-direction:column; gap:18px;">
      <!-- 상단 후보자 & 종합 평가 점수 헤더 -->
      <div style="display:flex; justify-content:space-between; align-items:stretch; gap:16px; flex-wrap:wrap; padding:18px 20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px;">
        <div style="display:flex; flex-direction:column; gap:6px; flex:1; min-width:260px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span class="inv-status-badge ${stageMeta.cls}">${stageMeta.label}</span>
            <span class="zal-status-pill blue">${tpl ? tpl.category : '기술·성향 검증'}</span>
            <span class="inv-grade-pill grade-${inv.tech_grade}">${inv.tech_grade}</span>
            ${inv.verified || prof?.verified ? `<span class="inv-verified-tag">통합 인재 DB 검증완료</span>` : ''}
          </div>
          <div style="font-size:18px; font-weight:700; color:#0f172a; margin-top:2px;">
            ${inv.candidate_name}
            <span style="font-size:13.5px; font-weight:500; color:#475569;">
              (경력 ${inv.experience_years || 9}년 · ${inv.candidate_type} · 투입 가능일 ${inv.available_from || '즉시'}${!hideSensitive && inv.desired_rate ? ` · 희망단가 월 ${Number(inv.desired_rate).toLocaleString()}만원` : ''})
            </span>
          </div>
          <div style="font-size:13px; color:#64748b;">
            지원 프로젝트: <strong style="color:#334155;">${inv.project_name || prj?.name || '미래에셋증권 퇴직연금 차세대'}</strong>
            · 지원 포지션: <strong style="color:#334155;">${inv.position_name || post?.role_name || '선임개발'}</strong>
          </div>
          <div style="font-size:13px; color:#64748b;">
            면접 일시: <strong style="color:#334155;">${inv.interview_date || '2026-11-13'}</strong> (${inv.interview_method || '화상'}) · 담당 면접관: <strong style="color:#334155;">${inv.interviewer_name || '조성현 상무'}</strong>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; justify-content:center; align-items:flex-end; gap:6px; background:#ffffff; border:1px solid #e2e8f0; padding:14px 18px; border-radius:12px; min-width:175px;">
          <span style="font-size:12px; color:#64748b; font-weight:600;">종합 평가 점수</span>
          <div style="display:flex; align-items:center; gap:8px;">
            ${renderStarIcons(scoreVal)}
            <strong style="font-size:22px; font-weight:800; color:#0f172a;">${scoreVal > 0 ? scoreVal.toFixed(1) : '-'}</strong>
            <span style="font-size:13px; color:#94a3b8; font-weight:600;">/ 5.0</span>
          </div>
          <span style="font-size:11.5px; color:#475569;">필수 질문(60%) + 역량 평가(40%)</span>
        </div>
      </div>

      <!-- 3대 핵심 역량 평가 (기술 역량 / 업무 수행 역량 / 커뮤니케이션) -->
      <div>
        <div style="font-size:14px; font-weight:700; color:#0f172a; margin-bottom:10px;">
          영역별 핵심 역량 평가
        </div>
        <div class="inv-competency-cards-grid">
          <div class="inv-comp-card">
            <div class="inv-comp-card-top">
              <span class="inv-comp-title">기술 역량 평가</span>
              <strong class="inv-comp-score">★ ${Number(comp.technical || 4.5).toFixed(1)}</strong>
            </div>
            <div style="margin:6px 0;">${renderSegmentedEvalBar(comp.technical || 4.5)}</div>
            <p class="inv-comp-note">${comp.technical_note || '요구 기술 스택 및 도메인 설계 숙련도 검증'}</p>
          </div>
          <div class="inv-comp-card">
            <div class="inv-comp-card-top">
              <span class="inv-comp-title">업무 수행 역량 평가</span>
              <strong class="inv-comp-score">★ ${Number(comp.execution || 4.5).toFixed(1)}</strong>
            </div>
            <div style="margin:6px 0;">${renderSegmentedEvalBar(comp.execution || 4.5)}</div>
            <p class="inv-comp-note">${comp.execution_note || '실무 과업 해결력 및 일정·품질 완수 역량 검증'}</p>
          </div>
          <div class="inv-comp-card">
            <div class="inv-comp-card-top">
              <span class="inv-comp-title">커뮤니케이션 평가</span>
              <strong class="inv-comp-score">★ ${Number(comp.communication || 4.5).toFixed(1)}</strong>
            </div>
            <div style="margin:6px 0;">${renderSegmentedEvalBar(comp.communication || 4.5)}</div>
            <p class="inv-comp-note">${comp.communication_note || '현업 및 동료 팀원과의 소통·협업 태도 검증'}</p>
          </div>
        </div>
      </div>

      <!-- 직무별 필수 질문 리스트 & 질문별 평가 결과 -->
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:14px; font-weight:700; color:#0f172a;">
            직무별 필수 질문 리스트 및 질문별 평가 결과 (${tpl ? `[${tpl.domain_focus}] ${tpl.role_type}` : ''} — 총 ${results.length}문항)
          </span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:52%;">필수 검증 질문 항목</th>
              <th style="width:26%;">질문별 평가 의견 / 메모</th>
              <th style="width:22%;">질문별 평가 점수</th>
            </tr>
          </thead>
          <tbody>
            ${results.length > 0 ? results.map((item, idx) => {
              const tplQ = tpl?.questions?.[idx];
              const qType = tplQ?.type || (idx >= 2 ? '성향·소통' : '직무역량');
              const isPersonality = qType.startsWith('성향');
              const badgeStyle = isPersonality
                ? 'background:#f3e8ff; color:#7e22ce; border:1px solid #e9d5ff;'
                : 'background:#eff6ff; color:#2563eb; border:1px solid #dbeafe;';
              return `
                <tr>
                  <td>
                    <div style="display:flex; align-items:flex-start; gap:6px; font-weight:500; color:#0f172a; line-height:1.45;">
                      <span style="display:inline-block; font-size:11px; font-weight:600; padding:1px 7px; border-radius:6px; white-space:nowrap; margin-top:1px; ${badgeStyle}">${qType}</span>
                      <span>Q${idx + 1}. ${item.question}</span>
                    </div>
                  </td>
                  <td>
                    <span style="font-size:12.5px; color:#334155; background:#f8fafc; padding:4px 9px; border-radius:6px; border:1px solid #e2e8f0; display:inline-block;">
                      ${item.note || '검증 완료'}
                    </span>
                  </td>
                  <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                      ${renderSegmentedEvalBar(item.score)}
                      <strong style="font-size:13.5px; color:#0f172a; min-width:38px; text-align:right;">${Number(item.score || 4.5).toFixed(1)}점</strong>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') : `
              <tr>
                <td colspan="3" style="text-align:center; color:#64748b; padding:18px;">아직 등록된 질문별 평가 내역이 없습니다.</td>
              </tr>
            `}
          </tbody>
        </table>
      </div>

      <!-- 면접관별 평가 의견 -->
      <div>
        <div style="font-size:14px; font-weight:700; color:#0f172a; margin-bottom:8px;">면접관별 평가 의견</div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${interviewerEvals.map(ev => `
            <div style="padding:14px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <strong style="font-size:13.5px; color:#0f172a;">${ev.interviewer_name}</strong>
                  <span style="font-size:11.5px; font-weight:600; color:#475569; background:#ffffff; border:1px solid #cbd5e1; padding:1px 8px; border-radius:6px;">${ev.role || '면접관'}</span>
                  <span style="font-size:12.5px; font-weight:700; color:#0f172a;">★ ${Number(ev.score || scoreVal).toFixed(1)}</span>
                </div>
                <span style="font-size:12px; color:#94a3b8;">${ev.date || ''}</span>
              </div>
              <div style="font-size:13.5px; color:#334155; line-height:1.55;">${ev.comment || inv.interviewer_opinion}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 종합 검토 의견 및 최종 결과 / 통합 인재 프로필 DB 연동 상태 (내부 면접관에게는 비공개 종합 검토 의견 미노출) -->
      ${!hideSensitive ? `
        <div style="padding:16px 18px; background:#ffffff; border:1.5px solid ${stage === '최종 결과' ? '#0f172a' : '#cbd5e1'}; border-radius:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <strong style="font-size:14px; color:#0f172a;">종합 검토 의견 및 최종 결과</strong>
              <span class="inv-status-badge ${stageMeta.cls}">${stageMeta.label}</span>
            </div>
            <span style="font-size:12px; color:#059669; font-weight:600; display:inline-flex; align-items:center; gap:4px;">
              ${svgIcon('check', 13)} ${isLinkedToDb ? '통합 인재 프로필 DB 평가이력 연동됨' : '결과 확정 시 통합 인재 DB 자동 적재'}
            </span>
          </div>
          <div style="font-size:13.5px; color:#334155; line-height:1.55;">
            ${inv.final_decision_note || (stage === '최종 결과' ? `최종 결과(${stageMeta.finalResult}) 확정 및 인재 DB 평가 이력 반영 완료.` : '면접관 평가가 완료되었습니다. 최종 검토 의견을 입력하고 선정·보류·불합격 결과를 확정해 주세요.')}
          </div>
          ${inv.decided_by ? `
            <div style="font-size:12px; color:#64748b; margin-top:6px;">
              최종 확정자: <strong>${inv.decided_by}</strong> · 확정일: ${inv.decided_at || '2026-11-18'}
            </div>
          ` : ''}
        </div>
      ` : ''}

      <!-- 하단 액션 영역 -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding-top:8px; border-top:1px solid #f1f5f9;">
        <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openCandidateResumeModal('${inv.id}')">
          ${svgIcon('user', 13)} 후보자 상세 프로필
        </button>
        <div style="display:flex; align-items:center; gap:8px; margin-left:auto;">
          ${canEdit ? `
            <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openEvaluateChecklistModal('${inv.id}', true)">
              ${svgIcon('edit', 13)} 면접 평가 수정
            </button>
          ` : ''}
          ${canConfirmFinal ? `
            <button type="button" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openFinalDecisionModal('${inv.id}', true)">
              ${svgIcon('check', 13)} ${stage === '최종 결과' ? '최종 결과 변경' : '최종 결과 확정 (선정/보류/불합격)'}
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `);
}

/* 4) 면접 평가 작성 / 인터뷰 평가하기 모달 */
function recalcLiveInterviewEvalScore() {
  const form = document.getElementById('interviewEvalForm');
  if (!form) return;
  const count = Number(form.querySelector('[name="question_count"]')?.value || 0);
  let qSum = 0;
  for (let i = 0; i < count; i++) {
    qSum += Number(form.querySelector(`[name="q_score_${i}"]`)?.value || 4.5);
  }
  const qAvg = count > 0 ? qSum / count : 4.5;
  const tech = Number(form.querySelector('[name="comp_technical"]')?.value || 4.5);
  const exec = Number(form.querySelector('[name="comp_execution"]')?.value || 4.5);
  const comm = Number(form.querySelector('[name="comp_communication"]')?.value || 4.5);
  const compAvg = (tech + exec + comm) / 3;
  const total = ((qAvg * 0.6) + (compAvg * 0.4)).toFixed(1);
  const el = document.getElementById('liveEvalTotalScoreDisplay');
  if (el) el.textContent = `${total} / 5.0`;
}

function openEvaluateChecklistModal(interviewId, fromViewModal = false) {
  const { interviews, templates, projects, postings, currentUser } = state.data;
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const tpl = templates.find(t => t.id === inv.template_id) || templates[0];
  const prj = (projects || []).find(p => p.id === inv.project_id);
  const post = (postings || []).find(p => p.id === inv.posting_id);
  const existingResults = inv.checklist_results || [];
  const isEditingExisting = existingResults.length > 0;
  const comp = inv.competency_scores || {
    technical: 4.5,
    technical_note: `${tpl.domain_focus} 코어 설계 및 필수 기술 스택 실무 역량 검증 완료`,
    execution: 4.5,
    execution_note: '대용량 데이터/트랜잭션 처리 및 프로젝트 과업 완수 능력 우수',
    communication: 4.5,
    communication_note: '현업 및 동료 개발자와의 기술 소통이 명확하고 협업 태도가 원만함'
  };
  const canConfirmFinal = currentUser?.role_group === 'MASTER' || currentUser?.role_group === 'MANAGER';

  openModal(`${isEditingExisting ? '면접 평가 수정' : '면접 평가 작성'} — ${inv.candidate_name} (${inv.tech_grade})`, `
    <form id="interviewEvalForm" onsubmit="submitInterviewEvaluation(event, '${inv.id}', ${Boolean(fromViewModal)})">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; margin-bottom:14px;">
        <div>
          <div style="font-size:14px; font-weight:700; color:#0f172a;">
            ${inv.candidate_name} (${inv.tech_grade} · 경력 ${inv.experience_years || 9}년) — ${inv.position_name || post?.role_name || tpl.role_type}
          </div>
          <div style="font-size:12.5px; color:#64748b;">
            프로젝트: ${inv.project_name || prj?.name || '-'} · 검증 템플릿: [${tpl.domain_focus}] ${tpl.role_type}
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:8px; background:#ffffff; border:1px solid #cbd5e1; padding:8px 14px; border-radius:10px;">
          <span style="font-size:12px; font-weight:600; color:#475569;">예상 종합 평가</span>
          <span style="color:#f59e0b;">★</span>
          <strong id="liveEvalTotalScoreDisplay" style="font-size:16px; font-weight:800; color:#0f172a;">${Number(inv.total_score || 4.5).toFixed(1)} / 5.0</strong>
        </div>
      </div>

      <!-- 1. 직무별 필수 질문 리스트 & 질문별 평가 -->
      <div style="font-size:13.5px; font-weight:700; color:#0f172a; margin-bottom:8px;">
        1. 직무별 필수 질문 리스트 평가
      </div>
      <table class="data-table" style="margin-bottom:16px;">
        <thead>
          <tr>
            <th style="width:48%;">필수 검증 질문 항목</th>
            <th style="width:22%;">평가 기준</th>
            <th style="width:13%;">점수</th>
            <th style="width:17%;">질문별 평가 의견</th>
          </tr>
        </thead>
        <tbody>
          ${tpl.questions.map((q, idx) => {
            const prev = existingResults[idx] || {};
            const isPersonality = q.type && q.type.startsWith('성향');
            const badgeStyle = isPersonality
              ? 'background:#f3e8ff; color:#7e22ce; border:1px solid #e9d5ff;'
              : 'background:#eff6ff; color:#2563eb; border:1px solid #dbeafe;';
            return `
              <tr>
                <td>
                  <label style="display:flex; gap:7px; align-items:flex-start; font-weight:600; cursor:pointer;">
                    <input type="checkbox" name="q_checked_${idx}" checked style="margin-top:4px;" />
                    <span>
                      <span style="display:inline-block; font-size:11px; font-weight:600; padding:1px 7px; border-radius:6px; margin-right:5px; ${badgeStyle}">${q.type || '직무역량'}</span>
                      Q${idx + 1}. ${q.question}
                    </span>
                  </label>
                  <input type="hidden" name="q_text_${idx}" value="${prev.question || q.question}" />
                </td>
                <td style="font-size:12px; color:#64748b;">${q.criteria}</td>
                <td>
                  <select class="select" name="q_score_${idx}" style="width:100%;" onchange="recalcLiveInterviewEvalScore()">
                    ${[5, 4.5, 4, 3.5, 3, 2.5].map(sc => `<option value="${sc}" ${Number(prev.score || 4.5) === sc ? 'selected' : ''}>${sc.toFixed(1)}점</option>`).join('')}
                  </select>
                </td>
                <td>
                  <input class="input" name="q_note_${idx}" style="width:100%;" value="${prev.note || (isPersonality ? '협업·소통 태도 우수' : '실무 경험 검증 완료')}" />
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <input type="hidden" name="question_count" value="${tpl.questions.length}" />

      <!-- 2. 영역별 핵심 역량 평가 (기술 역량 / 업무 수행 역량 / 커뮤니케이션) -->
      <div style="font-size:13.5px; font-weight:700; color:#0f172a; margin-bottom:8px;">
        2. 영역별 역량 평가 (기술 역량 · 업무 수행 역량 · 커뮤니케이션)
      </div>
      <div class="inv-eval-comp-box" style="margin-bottom:16px;">
        <div class="inv-eval-comp-row">
          <div class="inv-eval-comp-label">
            <strong>기술 역량 평가</strong>
            <span>요구 기술 스택 숙련도 및 아키텍처 이해도</span>
          </div>
          <select class="select" name="comp_technical" style="width:115px;" onchange="recalcLiveInterviewEvalScore()">
            ${[5, 4.8, 4.5, 4.2, 4.0, 3.5, 3.0].map(sc => `<option value="${sc}" ${Number(comp.technical || 4.5) === sc ? 'selected' : ''}>★ ${sc.toFixed(1)}점</option>`).join('')}
          </select>
          <input class="input" name="comp_technical_note" style="flex:1; min-width:200px;" value="${comp.technical_note || ''}" placeholder="기술 역량 평가 코멘트" />
        </div>
        <div class="inv-eval-comp-row">
          <div class="inv-eval-comp-label">
            <strong>업무 수행 역량 평가</strong>
            <span>도메인 실무 해결력 및 일정·품질 책임감</span>
          </div>
          <select class="select" name="comp_execution" style="width:115px;" onchange="recalcLiveInterviewEvalScore()">
            ${[5, 4.8, 4.5, 4.2, 4.0, 3.5, 3.0].map(sc => `<option value="${sc}" ${Number(comp.execution || 4.5) === sc ? 'selected' : ''}>★ ${sc.toFixed(1)}점</option>`).join('')}
          </select>
          <input class="input" name="comp_execution_note" style="flex:1; min-width:200px;" value="${comp.execution_note || ''}" placeholder="업무 수행 역량 평가 코멘트" />
        </div>
        <div class="inv-eval-comp-row">
          <div class="inv-eval-comp-label">
            <strong>커뮤니케이션 평가</strong>
            <span>현업 고객사 및 팀원과의 소통·협업 태도</span>
          </div>
          <select class="select" name="comp_communication" style="width:115px;" onchange="recalcLiveInterviewEvalScore()">
            ${[5, 4.8, 4.5, 4.2, 4.0, 3.5, 3.0].map(sc => `<option value="${sc}" ${Number(comp.communication || 4.5) === sc ? 'selected' : ''}>★ ${sc.toFixed(1)}점</option>`).join('')}
          </select>
          <input class="input" name="comp_communication_note" style="flex:1; min-width:200px;" value="${comp.communication_note || ''}" placeholder="커뮤니케이션 평가 코멘트" />
        </div>
      </div>

      <!-- 3. 면접관 평가 의견 및 저장 상태 -->
      <div class="form-grid">
        <div class="form-field" style="grid-column: 1 / -1;">
          <label>면접관 종합 평가 의견 (통합 인재 프로필 DB 검증 이력과 연동됩니다)</label>
          <textarea class="textarea" name="interviewer_opinion" rows="2" required>${inv.interviewer_opinion || `${tpl.domain_focus} 도메인 핵심 설계 및 실무 수행 역량이 검증되었으며, 현업 및 개발팀과의 커뮤니케이션 태도가 우수하여 프로젝트 투입을 추천합니다.`}</textarea>
        </div>
        ${canConfirmFinal ? `
          <div class="form-field" style="grid-column: 1 / -1;">
            <label>평가 완료 후 진행 단계 처리</label>
            <select class="select" name="final_status">
              <option value="평가 완료" ${normalizeInterviewStage(inv) !== '최종 결과' ? 'selected' : ''}>평가 완료 상태로 저장 (최종 결정 대기)</option>
              <option value="선정" ${getInterviewFinalResultLabel(inv) === '선정' ? 'selected' : ''}>즉시 최종 결과 확정 — 선정 (인재 DB 자산화 + 프로젝트 TO 배정)</option>
              <option value="보류" ${getInterviewFinalResultLabel(inv) === '보류' ? 'selected' : ''}>즉시 최종 결과 확정 — 보류 (인재 DB 평가 이력 자산화)</option>
              <option value="불합격" ${getInterviewFinalResultLabel(inv) === '불합격' ? 'selected' : ''}>즉시 최종 결과 확정 — 불합격</option>
            </select>
          </div>
        ` : `
          <input type="hidden" name="final_status" value="평가 완료" />
        `}
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:8px;">
        <button type="button" class="btn btn-outline" onclick="${fromViewModal ? `openInterviewResultViewModal('${inv.id}')` : 'closeModal()'}">${fromViewModal ? '← 결과 보기로 돌아가기' : '취소'}</button>
        <button type="submit" class="btn btn-primary">${isEditingExisting ? '평가 수정 저장' : '면접 평가 완료 저장'}</button>
      </div>
    </form>
  `);
  setTimeout(recalcLiveInterviewEvalScore, 30);
}

async function submitInterviewEvaluation(e, interviewId, returnToViewModal = false) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const count = Number(fd.get('question_count') || 0);
  const checklist_results = [];
  for (let i = 0; i < count; i++) {
    checklist_results.push({
      question: fd.get(`q_text_${i}`),
      checked: fd.get(`q_checked_${i}`) === 'on',
      score: Number(fd.get(`q_score_${i}`)),
      note: fd.get(`q_note_${i}`)
    });
  }
  const competency_scores = {
    technical: Number(fd.get('comp_technical') || 4.5),
    technical_note: fd.get('comp_technical_note') || '',
    execution: Number(fd.get('comp_execution') || 4.5),
    execution_note: fd.get('comp_execution_note') || '',
    communication: Number(fd.get('comp_communication') || 4.5),
    communication_note: fd.get('comp_communication_note') || ''
  };
  const finalStatus = fd.get('final_status') || '평가 완료';
  const res = await apiCall('/api/interviews/evaluate', 'POST', {
    interview_id: interviewId,
    checklist_results,
    competency_scores,
    interviewer_opinion: fd.get('interviewer_opinion'),
    final_status: finalStatus
  });
  showToast(
    finalStatus === '선정'
      ? `최종 선정 확정! 종합 평가(★${res.avgScore}점)가 통합 인재 프로필 DB에 자산화되고 프로젝트 TO에 배정되었습니다.`
      : `면접 평가(종합 ★${res.avgScore}점)가 저장되었습니다.`
  );
  await loadState();
  if (returnToViewModal) {
    openInterviewResultViewModal(interviewId);
  } else {
    closeModal();
  }
}

/* 5) 최종 결과 확정 모달 (선정 / 보류 / 불합격) */
function openFinalDecisionModal(interviewId, fromViewModal = false) {
  const { interviews = [], projects = [], postings = [] } = state.data || {};
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const prj = projects.find(p => p.id === inv.project_id);
  const post = postings.find(p => p.id === inv.posting_id);
  const scoreVal = Number(inv.total_score || 4.6);
  const comp = inv.competency_scores || { technical: scoreVal, execution: scoreVal, communication: scoreVal };
  const currentFinal = getInterviewFinalResultLabel(inv) || '선정';

  openModal(`최종 결과 확정 — ${inv.candidate_name} (${inv.tech_grade})`, `
    <form onsubmit="submitFinalDecision(event, '${inv.id}', ${Boolean(fromViewModal)})">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- 후보자 및 면접 평가 요약 -->
        <div style="padding:16px 18px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
            <div>
              <strong style="font-size:17px; color:#0f172a;">${inv.candidate_name}</strong>
              <span style="font-size:13.5px; color:#475569; margin-left:6px;">${inv.tech_grade} · 경력 ${inv.experience_years || 9}년 · ${inv.candidate_type}</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px; background:#ffffff; border:1px solid #cbd5e1; padding:5px 12px; border-radius:8px;">
              <span style="font-size:12px; color:#64748b; font-weight:600;">종합 평가</span>
              <strong style="font-size:15px; color:#0f172a;"><span style="color:#f59e0b;">★</span> ${scoreVal.toFixed(1)} / 5.0</strong>
            </div>
          </div>
          <div style="font-size:13px; color:#475569; margin-bottom:8px;">
            지원 프로젝트: <strong style="color:#0f172a;">${inv.project_name || prj?.name || '-'}</strong> · 포지션: <strong style="color:#0f172a;">${inv.position_name || post?.role_name || '-'}</strong>
          </div>
          <div style="display:flex; gap:14px; flex-wrap:wrap; font-size:12.5px; color:#334155; padding:8px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; margin-bottom:8px;">
            <span>기술 역량: <strong>★ ${Number(comp.technical || scoreVal).toFixed(1)}</strong></span>
            <span style="color:#cbd5e1;">|</span>
            <span>업무 수행 역량: <strong>★ ${Number(comp.execution || scoreVal).toFixed(1)}</strong></span>
            <span style="color:#cbd5e1;">|</span>
            <span>커뮤니케이션: <strong>★ ${Number(comp.communication || scoreVal).toFixed(1)}</strong></span>
            <span style="color:#cbd5e1;">|</span>
            <span>담당 면접관: <strong>${inv.interviewer_name || '조성현 상무'}</strong></span>
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.5;">
            <strong>[면접관 평가 의견]</strong> ${inv.interviewer_opinion || '필수 질문 및 실무 역량 검증 완료.'}
          </div>
        </div>

        <!-- 최종 결과 3가지 구분: 선정 / 보류 / 불합격 -->
        <div>
          <label style="display:block; font-size:13.5px; font-weight:700; color:#0f172a; margin-bottom:8px;">최종 결과 선택</label>
          <div class="inv-decision-radio-grid">
            <label class="inv-decision-option selected-opt">
              <input type="radio" name="final_result" value="선정" ${currentFinal === '선정' ? 'checked' : ''} />
              <div class="inv-decision-box">
                <strong class="inv-decision-title">선정</strong>
                <span class="inv-decision-desc">최종 합격 확정 · 프로젝트 TO 배정 및 통합 인재 DB 검증 인력 자산화</span>
              </div>
            </label>
            <label class="inv-decision-option hold-opt">
              <input type="radio" name="final_result" value="보류" ${currentFinal === '보류' ? 'checked' : ''} />
              <div class="inv-decision-box">
                <strong class="inv-decision-title">보류</strong>
                <span class="inv-decision-desc">차순위 예비 후보 유지 · 면접 평가 결과를 통합 인재 DB에 축적하여 재소싱 활용</span>
              </div>
            </label>
            <label class="inv-decision-option reject-opt">
              <input type="radio" name="final_result" value="불합격" ${currentFinal === '불합격' ? 'checked' : ''} />
              <div class="inv-decision-box">
                <strong class="inv-decision-title">불합격</strong>
                <span class="inv-decision-desc">해당 포지션 미선발 확정 및 면접 진행 이력 기록</span>
              </div>
            </label>
          </div>
        </div>

        <!-- 종합 검토 의견 -->
        <div class="form-field" style="margin-bottom:0;">
          <label>종합 검토 의견 (최종 결정 사유 및 향후 활용 의견)</label>
          <textarea class="textarea" name="final_decision_note" rows="3" required>${inv.final_decision_note || `직무별 필수 질문 검증(종합 ★${scoreVal.toFixed(1)}점)과 기술·수행·커뮤니케이션 역량이 모두 우수하여 프로젝트 투입 적임자로 최종 확정함.`}</textarea>
        </div>

        <!-- 통합 인재 프로필 DB 연동 안내 -->
        <div style="padding:12px 14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; display:flex; flex-direction:column; gap:6px;">
          <label class="switch-label" style="font-size:13px; font-weight:600; color:#0f172a; cursor:pointer;">
            <input type="checkbox" name="sync_to_profile_db" checked />
            <span>면접 평가 결과 및 검증 이력을 통합 인재 프로필 DB에 자산화 연동 (향후 인력 검색·재소싱 활용)</span>
          </label>
          <label class="switch-label" style="font-size:13px; font-weight:500; color:#475569; cursor:pointer;">
            <input type="checkbox" name="assign_to_slot" checked />
            <span>'선정' 확정 시 지원 프로젝트 TO 슬롯에 즉시 확정 인력으로 자동 배정</span>
          </label>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button type="button" class="btn btn-outline" onclick="${fromViewModal ? `openInterviewResultViewModal('${inv.id}')` : 'closeModal()'}">${fromViewModal ? '← 결과 보기로 돌아가기' : '취소'}</button>
          <button type="submit" class="btn btn-primary">최종 결과 확정</button>
        </div>
      </div>
    </form>
  `);
}

async function submitFinalDecision(e, interviewId, returnToViewModal = false) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const finalResult = fd.get('final_result') || '선정';
  await apiCall('/api/interviews/final-decision', 'POST', {
    interview_id: interviewId,
    final_result: finalResult,
    final_decision_note: fd.get('final_decision_note'),
    sync_to_profile_db: fd.get('sync_to_profile_db') === 'on',
    assign_to_slot: fd.get('assign_to_slot') === 'on'
  });
  showToast(
    finalResult === '선정'
      ? '최종 [선정]이 확정되어 통합 인재 프로필 DB 자산화 및 프로젝트 슬롯 배정이 완료되었습니다.'
      : `최종 결과 [${finalResult}] 처리가 완료되어 통합 인재 프로필 DB에 평가 이력이 반영되었습니다.`
  );
  await loadState();
  if (returnToViewModal) {
    openInterviewResultViewModal(interviewId);
  } else {
    closeModal();
  }
}

/* 6) 후보자 핵심 정보 비교 모달 (Goal #4: 기술 역량, 경력, 투입 가능일, 희망 단가 등 비교) */
function removeCandidateFromComparison(interviewId) {
  if (!state.interviewFilters.compareIds) state.interviewFilters.compareIds = [];
  state.interviewFilters.compareIds = state.interviewFilters.compareIds.filter(id => id !== interviewId);
  renderActiveTab();
  openInterviewComparisonModal();
}

function openInterviewComparisonModal() {
  const { permissions, currentUser, profiles = [] } = state.data || {};
  const hideSensitive = currentUser?.role_group === 'INTERNAL' || !permissions?.can_view_sensitive_info;
  const scoped = getRoleScopedInterviews();
  const compareIds = state.interviewFilters?.compareIds || [];
  const targets = scoped.filter(i => compareIds.includes(i.id));

  const favIds = scoped.filter(i => i.favorite).map(i => i.id).slice(0, 4);

  openModal(`후보자 핵심 역량 및 조건 비교 분석 (${targets.length}명)`, `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
        <div>
          <div style="font-size:12px; color:#64748b;">면접·검증 후보자 비교 기준</div>
          <div style="font-size:13.5px; font-weight:700; color:#0f172a; margin-top:2px;">
            후보자별 기술 역량 · 경력 연수 · 투입 가능일${!hideSensitive ? ' · 희망 단가' : ''} · 면접 종합 평가 점수 비교
          </div>
        </div>
        ${favIds.length > 0 ? `
          <button type="button" class="btn btn-outline btn-sm" onclick="compareFavoriteCandidates()">
            ★ 관심 후보자 일괄 불러오기 (${favIds.length}명)
          </button>
        ` : ''}
      </div>

      ${targets.length > 0 ? `
        <div style="overflow-x:auto;">
          <table class="src-compare-table">
            <thead>
              <tr>
                <th style="width:140px;">비교 항목</th>
                ${targets.map(inv => {
                  const prof = profiles.find(p => p.id === inv.candidate_profile_id || p.name === inv.candidate_name);
                  const yrs = inv.experience_years || prof?.experience_years || 9;
                  return `
                    <th>
                      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                        <div style="display:flex; align-items:center; gap:9px;">
                          <img src="${getAvatarForId(inv.candidate_profile_id || inv.candidate_name)}" alt="${inv.candidate_name}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:1.5px solid #e2e8f0;" />
                          <div>
                            <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                              <strong style="font-size:14.5px; color:#0f172a;">${inv.candidate_name}</strong>
                              <span class="src-applicant-grade-chip grade-${inv.tech_grade}">${inv.tech_grade}</span>
                            </div>
                            <span style="font-size:11.5px; color:#64748b; font-weight:500;">${inv.candidate_type || '프리랜서'} · ${yrs}년차</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          class="cmp-card-remove-btn"
                          onclick="removeCandidateFromComparison('${inv.id}')"
                          title="비교 목록에서 제외"
                          aria-label="제외"
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    </th>
                  `;
                }).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="src-cmp-label">현재 전형 상태</td>
                ${targets.map(inv => {
                  const stageMeta = getInterviewStageBadgeMeta(inv);
                  return `
                    <td>
                      <span class="inv-status-badge ${stageMeta.cls}">${stageMeta.label}</span>
                    </td>
                  `;
                }).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">지원 포지션</td>
                ${targets.map(inv => `
                  <td>
                    <strong style="color:#0f172a;">${inv.position_name || '-'}</strong>
                    <div style="font-size:11.5px; color:#64748b; margin-top:2px;">${inv.project_name || ''}</div>
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">기술등급 · 경력</td>
                ${targets.map(inv => {
                  const prof = profiles.find(p => p.id === inv.candidate_profile_id || p.name === inv.candidate_name);
                  const yrs = inv.experience_years || prof?.experience_years || 9;
                  return `
                    <td>
                      <span class="src-applicant-grade-chip grade-${inv.tech_grade}">${inv.tech_grade} 기술자</span>
                      <strong style="margin-left:6px; color:#0f172a;">${yrs}년차</strong>
                    </td>
                  `;
                }).join('')}
              </tr>
              ${!hideSensitive ? `
                <tr>
                  <td class="src-cmp-label">희망 단가</td>
                  ${targets.map(inv => `<td><strong style="font-size:14px; color:#0f172a;">${inv.desired_rate ? `월 ${Number(inv.desired_rate).toLocaleString()}만원` : '협의'}</strong></td>`).join('')}
                </tr>
              ` : ''}
              <tr>
                <td class="src-cmp-label">투입 가능일</td>
                ${targets.map(inv => `<td><strong style="color:#0f172a;">${inv.available_from || '즉시 가능'}</strong></td>`).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">핵심 기술 스택</td>
                ${targets.map(inv => `
                  <td>
                    <div style="display:flex; flex-wrap:wrap; gap:4px;">
                      ${(inv.skills || []).map(sk => `<span class="src-hover-skill-tag hit">${sk}</span>`).join('')}
                    </div>
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">영역별 역량 평가</td>
                ${targets.map(inv => {
                  const stage = normalizeInterviewStage(inv);
                  const isEval = (stage === '평가 완료' || stage === '최종 결과') && Number(inv.total_score || 0) > 0;
                  const c = inv.competency_scores || { technical: inv.total_score, execution: inv.total_score, communication: inv.total_score };
                  if (!isEval) return `<td style="color:#94a3b8;">평가 미완료</td>`;
                  return `
                    <td style="font-size:12.5px; line-height:1.6;">
                      기술 역량: <strong>★ ${Number(c.technical || inv.total_score).toFixed(1)}</strong><br/>
                      업무 수행: <strong>★ ${Number(c.execution || inv.total_score).toFixed(1)}</strong><br/>
                      커뮤니케이션: <strong>★ ${Number(c.communication || inv.total_score).toFixed(1)}</strong>
                    </td>
                  `;
                }).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">종합 평가 점수</td>
                ${targets.map(inv => {
                  const stage = normalizeInterviewStage(inv);
                  const isEval = (stage === '평가 완료' || stage === '최종 결과') && Number(inv.total_score || 0) > 0;
                  return isEval
                    ? `<td><strong style="font-size:15px; color:#0f172a;"><span style="color:#f59e0b;">★</span> ${Number(inv.total_score).toFixed(1)}</strong> <span style="font-size:12px; color:#64748b;">/ 5.0</span></td>`
                    : `<td style="color:#94a3b8;">평가 미완료</td>`;
                }).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">주요 수행 요약</td>
                ${targets.map(inv => `<td style="font-size:12.5px; color:#334155; line-height:1.5;">${inv.career_highlight || inv.resume_summary || '-'}</td>`).join('')}
              </tr>
              <tr>
                <td class="src-cmp-label">빠른 액션</td>
                ${targets.map(inv => {
                  const stage = normalizeInterviewStage(inv);
                  const isEval = (stage === '평가 완료' || stage === '최종 결과') && Number(inv.total_score || 0) > 0;
                  return `
                    <td>
                      <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                        <button type="button" class="btn btn-outline btn-sm" onclick="closeModal(); openCandidateResumeModal('${inv.id}')">상세 이력서</button>
                        ${isEval
                          ? `<button type="button" class="btn btn-primary btn-sm" onclick="closeModal(); openInterviewResultViewModal('${inv.id}')">결과 보기</button>`
                          : `<button type="button" class="btn btn-primary btn-sm" onclick="closeModal(); openEvaluateChecklistModal('${inv.id}')">평가 작성</button>`}
                      </div>
                    </td>
                  `;
                }).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      ` : `<div style="padding:24px; text-align:center; color:#64748b;">비교할 후보자가 없습니다.</div>`}
    </div>
  `);
  document.getElementById('modalDialog')?.classList.add('wide-compare-modal-dialog');
}

/* 7) 질문 리스트 관리 모달 (기존 기능 유지 + 질문 템플릿 확인) */
function openQuestionTemplatesModal() {
  const { templates } = state.data;
  openModal('직무역량 및 성향·태도 표준 필수 질문 리스트 관리', `
    <div style="display:flex; flex-direction:column; gap:14px;">
      <div style="font-size:13px; color:#64748b;">
        직무 및 도메인별 기술 역량, 업무 수행 역량, 커뮤니케이션·성향 검증을 위한 표준 필수 질문 템플릿입니다.
      </div>
      ${templates.map(t => `
        <div style="border:1px solid #e2e8f0; border-radius:12px; padding:16px; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="font-weight:700; font-size:15px; color:#0f172a;">[${t.domain_focus}] ${t.role_type}</div>
            <span class="zal-status-pill blue">${t.category} (${t.questions.length}문항)</span>
          </div>
          <ol style="padding-left:18px; font-size:13.5px; color:#334155; display:flex; flex-direction:column; gap:7px; margin:0;">
            ${t.questions.map(q => {
              const isPersonality = q.type && q.type.startsWith('성향');
              const badgeStyle = isPersonality
                ? 'background:#f3e8ff; color:#7e22ce; border:1px solid #e9d5ff;'
                : 'background:#eff6ff; color:#2563eb; border:1px solid #dbeafe;';
              return `<li><span style="display:inline-block; font-size:11.5px; font-weight:600; padding:1px 7px; border-radius:6px; margin-right:6px; ${badgeStyle}">${q.type || '직무역량'}</span>${q.question} <span style="font-size:12px; color:#94a3b8;">(기준: ${q.criteria})</span></li>`;
            }).join('')}
          </ol>
        </div>
      `).join('')}
      <div style="display:flex; justify-content:flex-end; padding-top:4px;">
        <button type="button" class="btn btn-primary" onclick="closeModal()">확인</button>
      </div>
    </div>
  `);
}

/* =========================================================================
   TAB 6: PERMISSION SYSTEM & SELECTIVE PERMISSION MANAGEMENT
   ========================================================================= */
function renderPermissionsTab() {
  const { users, permissions } = state.data;
  const el = document.getElementById('tab-permissions');

  el.innerHTML = `
    <div class="grid-2">
      <div class="zal-feed-card">
        <div class="zal-card-header">
          <div>
            <div class="zal-card-title" style="display:inline-flex; align-items:center; gap:6px;">${svgIcon('settings', 16)} 하위 사용자별 세부 활동 권한 선별 부여 (ON / OFF)</div>
            <div style="font-size:12.5px; color:#64748b; margin-top:2px;">임원/부서장(Master)은 하위 실무자의 선별 권한을 실시간 제어합니다.</div>
          </div>
          <span class="zal-status-pill ${permissions.can_manage_permissions ? 'green' : 'amber'}">
            ${permissions.can_manage_permissions ? 'Master 제어 가능' : '열람 전용'}
          </span>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>사용자</th>
              <th>타인 프로필 열람</th>
              <th>프로젝트·제안(PM/PL)</th>
              <th>지정 면접관 평가</th>
              <th>민감 단가·평점</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => {
              const isMaster = u.role_group === 'MASTER';
              const isExternal = u.role_group === 'EXTERNAL';
              const disabled = !permissions.can_manage_permissions || isMaster || isExternal;
              return `
                <tr>
                  <td><strong>${u.name}</strong><br/><span style="font-size:11px; color:#64748b;">${u.title}</span></td>
                  <td>
                    ${isMaster || u.role_group === 'MANAGER' ? `<span class="perm-chip allowed">전체 허용</span>` : isExternal ? `<span class="perm-chip denied">불가</span>` :
                      `<label class="switch-label"><input type="checkbox" ${u.perm_all_profiles ? 'checked' : ''} ${disabled ? 'disabled' : ''} onchange="toggleUserPerm('${u.id}', 'perm_all_profiles', this.checked)" /> ${u.perm_all_profiles ? 'ON' : 'OFF'}</label>`}
                  </td>
                  <td>
                    ${isMaster || u.role_group === 'MANAGER' ? `<span class="perm-chip allowed">전체 허용</span>` : isExternal ? `<span class="perm-chip denied">불가</span>` :
                      `<label class="switch-label"><input type="checkbox" ${u.perm_pm_pl ? 'checked' : ''} ${disabled ? 'disabled' : ''} onchange="toggleUserPerm('${u.id}', 'perm_pm_pl', this.checked)" /> ${u.perm_pm_pl ? 'ON' : 'OFF'}</label>`}
                  </td>
                  <td>
                    ${isMaster || u.role_group === 'MANAGER' ? `<span class="perm-chip allowed">전체 허용</span>` : isExternal ? `<span class="perm-chip denied">불가</span>` :
                      `<label class="switch-label"><input type="checkbox" ${u.perm_interviewer ? 'checked' : ''} ${disabled ? 'disabled' : ''} onchange="toggleUserPerm('${u.id}', 'perm_interviewer', this.checked)" /> ${u.perm_interviewer ? 'ON' : 'OFF'}</label>`}
                  </td>
                  <td>
                    ${isMaster ? `<span class="perm-chip allowed">전체 허용</span>` : u.role_group === 'MANAGER' ?
                      `<label class="switch-label"><input type="checkbox" ${u.perm_sensitive_info ? 'checked' : ''} ${!permissions.can_manage_permissions ? 'disabled' : ''} onchange="toggleUserPerm('${u.id}', 'perm_sensitive_info', this.checked)" /> ${u.perm_sensitive_info ? 'ON' : 'OFF'}</label>` :
                      `<span class="perm-chip denied">불가</span>`}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="zal-feed-card">
        <div class="zal-card-title" style="display:inline-flex; align-items:center; gap:6px;">${svgIcon('file', 16)} PRD 3.2 주요 활동별 선별 권한 부여 기준표</div>
        <table class="data-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>주요 활동</th>
              <th>임원/부서장</th>
              <th>제안 관리자</th>
              <th>내부 구성원</th>
              <th>외주 인력</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>전체 프로필 열람·AI 등록</td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip selective">선별 부여</span></td><td><span class="perm-chip denied">불가</span></td></tr>
            <tr><td>본인 프로필·가용일 수정</td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip own-only">본인 한정</span></td><td><span class="perm-chip own-only">본인 한정</span></td></tr>
            <tr><td>프로젝트·TO·제안서 추출</td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip selective">선별(PM/PL)</span></td><td><span class="perm-chip denied">불가</span></td></tr>
            <tr><td>구인 공고·타겟 소싱 발송</td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip denied">불가</span></td><td><span class="perm-chip denied">불가</span></td></tr>
            <tr><td>필수질문 면접 평가 작성</td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip selective">선별(면접관)</span></td><td><span class="perm-chip denied">불가</span></td></tr>
            <tr><td>내부 별점·단가 민감정보</td><td><span class="perm-chip allowed">전체 허용</span></td><td><span class="perm-chip selective">선별 부여</span></td><td><span class="perm-chip denied">불가</span></td><td><span class="perm-chip denied">불가</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

async function toggleUserPerm(targetUserId, field, checked) {
  const targetUser = state.data.users.find(u => u.id === targetUserId);
  if (!targetUser) return;
  await apiCall('/api/users/permissions', 'POST', {
    target_user_id: targetUserId,
    perm_all_profiles: targetUser.perm_all_profiles,
    perm_pm_pl: targetUser.perm_pm_pl,
    perm_interviewer: targetUser.perm_interviewer,
    perm_sensitive_info: targetUser.perm_sensitive_info,
    [field]: checked
  });
  showToast(`${targetUser.name} 님의 선별 권한이 업데이트되었습니다.`);
  await loadState();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('userRoleSelect').addEventListener('change', e => {
    switchUserRole(e.target.value);
  });

  document.getElementById('openMyProfileBtn')?.addEventListener('click', () => {
    const cur = state.data?.currentUser;
    if (cur?.linked_profile_id) {
      openProfileDetailModal(cur.linked_profile_id);
    } else if (state.data?.profiles?.length) {
      openProfileDetailModal(state.data.profiles[0].id);
    }
  });

  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const backdrop = document.getElementById('modalBackdrop');
      if (backdrop && !backdrop.classList.contains('hidden')) {
        closeModal();
      }
    }
  });

  // Initialize browser History API state so Back button returns to previous view inside SPA
  const urlParams = new URLSearchParams(window.location.search);
  const initialProjectId = urlParams.get('project') || null;
  const initialProfileId = urlParams.get('profile') || null;
  const initialPostingId = urlParams.get('posting') || null;
  const initialTab = urlParams.get('tab') || (initialProjectId ? 'projects' : initialProfileId ? 'profiles' : initialPostingId ? 'sourcing' : 'dashboard');
  state.activeTab = initialTab;
  state.selectedProjectId = initialProjectId;
  state.selectedProfileId = initialProfileId;
  state.selectedPostingId = initialPostingId;
  applyTabDomState(state.activeTab);

  if (initialProjectId) {
    window.history.replaceState(
      { tab: 'projects', projectId: null, profileId: null, postingId: null },
      '',
      buildNavigationUrl('projects', null, null, null)
    );
    window.history.pushState(
      { tab: 'projects', projectId: initialProjectId, profileId: null, postingId: null },
      '',
      buildNavigationUrl('projects', initialProjectId, null, null)
    );
  } else if (initialProfileId) {
    window.history.replaceState(
      { tab: 'profiles', projectId: null, profileId: null, postingId: null },
      '',
      buildNavigationUrl('profiles', null, null, null)
    );
    window.history.pushState(
      { tab: 'profiles', projectId: null, profileId: initialProfileId, postingId: null },
      '',
      buildNavigationUrl('profiles', null, initialProfileId, null)
    );
  } else if (initialPostingId) {
    window.history.replaceState(
      { tab: 'sourcing', projectId: null, profileId: null, postingId: null },
      '',
      buildNavigationUrl('sourcing', null, null, null)
    );
    window.history.pushState(
      { tab: 'sourcing', projectId: null, profileId: null, postingId: initialPostingId },
      '',
      buildNavigationUrl('sourcing', null, null, initialPostingId)
    );
  } else {
    pushNavigationState(true);
  }

  window.addEventListener('popstate', e => {
    const backdrop = document.getElementById('modalBackdrop');
    if (backdrop && !backdrop.classList.contains('hidden')) {
      closeModal();
    }
    const histState = e.state;
    if (histState && histState.tab) {
      state.activeTab = histState.tab;
      state.selectedProjectId = histState.projectId || null;
      state.selectedProfileId = histState.profileId || null;
      state.selectedPostingId = histState.postingId || null;
    } else {
      const params = new URLSearchParams(window.location.search);
      const prjParam = params.get('project') || null;
      const profParam = params.get('profile') || null;
      const postParam = params.get('posting') || null;
      state.activeTab = params.get('tab') || (prjParam ? 'projects' : profParam ? 'profiles' : postParam ? 'sourcing' : 'dashboard');
      state.selectedProjectId = prjParam;
      state.selectedProfileId = profParam;
      state.selectedPostingId = postParam;
    }
    applyTabDomState(state.activeTab);
    renderActiveTab();
  });

  loadState();
  initCustomSelectDropdowns();
});

let activeCustomSelectEl = null;

function closeCustomSelectMenu() {
  const existing = document.getElementById('zalCustomSelectMenu');
  if (existing) existing.remove();
  activeCustomSelectEl = null;
}

function openCustomSelectMenu(selectEl) {
  if (activeCustomSelectEl === selectEl) {
    closeCustomSelectMenu();
    return;
  }
  closeCustomSelectMenu();
  activeCustomSelectEl = selectEl;

  const rect = selectEl.getBoundingClientRect();
  const menu = document.createElement('div');
  menu.id = 'zalCustomSelectMenu';
  menu.className = 'zal-custom-select-menu';
  menu.style.minWidth = `${Math.max(140, rect.width)}px`;

  Array.from(selectEl.options).forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isSelected = selectEl.value === opt.value;
    btn.className = `zal-custom-select-option${isSelected ? ' selected' : ''}`;
    btn.innerHTML = `
      <span>${opt.textContent}</span>
      ${isSelected ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
    `;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const prevVal = selectEl.value;
      selectEl.value = opt.value;
      closeCustomSelectMenu();
      if (prevVal !== opt.value) {
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    menu.appendChild(btn);
  });

  document.body.appendChild(menu);

  const menuRect = menu.getBoundingClientRect();
  let left = rect.left;
  if (left + menuRect.width > window.innerWidth - 12) {
    left = Math.max(12, window.innerWidth - menuRect.width - 12);
  }
  let top = rect.bottom + 6;
  if (top + menuRect.height > window.innerHeight - 12 && rect.top > menuRect.height + 12) {
    top = rect.top - menuRect.height - 6;
  }
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function initCustomSelectDropdowns() {
  document.addEventListener('mousedown', e => {
    const menu = document.getElementById('zalCustomSelectMenu');
    if (menu && menu.contains(e.target)) {
      return;
    }
    const selectEl = e.target.closest('select.zal-chip-select, select.zal-clean-select, select.select');
    if (selectEl) {
      e.preventDefault();
      openCustomSelectMenu(selectEl);
      return;
    }
    if (menu) {
      closeCustomSelectMenu();
    }
  }, true);

  window.addEventListener('scroll', closeCustomSelectMenu, true);
  window.addEventListener('resize', closeCustomSelectMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCustomSelectMenu();
  });
}
