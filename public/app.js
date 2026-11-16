// ZAL : 잘될 (ZAL-WILL) — ZAL Universe Look & Feel Frontend
const state = {
  userId: 'u_master',
  activeTab: 'dashboard',
  selectedProjectId: null,
  selectedProjectFilter: 'PLANNED',
  data: null,
  profileFilters: {
    empType: 'ALL',
    grade: 'ALL',
    domain: 'ALL',
    availability: 'ALL',
    verifiedOnly: false,
    keyword: ''
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

function getAvatarForId(str = '') {
  const sum = Array.from(String(str)).reduce((a, c) => a + c.charCodeAt(0), 0);
  return sum % 2 === 0 ? '/pic1_thumb.png' : '/pic2_thumb.png';
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
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
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
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = htmlContent;
  document.getElementById('modalBackdrop').classList.remove('hidden');
}

function closeModal() {
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

function buildNavigationUrl(tabName, projectId) {
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
  const qs = params.toString();
  return `${window.location.pathname}${qs ? `?${qs}` : ''}`;
}

function pushNavigationState(replace = false) {
  const navState = {
    tab: state.activeTab,
    projectId: state.selectedProjectId || null
  };
  const nextUrl = buildNavigationUrl(navState.tab, navState.projectId);
  const curState = window.history.state;
  if (
    !replace &&
    curState &&
    curState.tab === navState.tab &&
    (curState.projectId || null) === navState.projectId
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
    case 'permissions': renderPermissionsTab(); break;
  }
}

/* =========================================================================
   TAB 1: EXECUTIVE (MASTER) 1-PAGE GOLDEN RATIO DASHBOARD
   ========================================================================= */
function filterProfilesFromDashboard(empType = 'ALL', grade = 'ALL', domain = 'ALL') {
  state.profileFilters.empType = empType;
  state.profileFilters.grade = grade;
  state.profileFilters.domain = domain;
  state.profileFilters.availability = 'ALL';
  state.profileFilters.verifiedOnly = false;
  state.profileFilters.keyword = '';
  switchTab('profiles');
}

function jumpToPlannedProjectsFromDashboard(groupKey = 'PLANNED') {
  state.selectedProjectFilter = groupKey;
  state.selectedProjectId = null;
  switchTab('projects');
}

async function quickConfirmCandidateSelection(interviewId) {
  const inv = (state.data?.interviews || []).find(i => i.id === interviewId);
  if (!inv) return;
  await apiCall('/api/interviews/evaluate', 'POST', {
    interview_id: inv.id,
    checklist_results: inv.checklist_results || [],
    interviewer_opinion: inv.interviewer_opinion || '임원 최종 컨펌을 통해 선발 확정함.',
    final_status: '최종선정'
  });
  showToast(`✅ ${inv.candidate_name} (${inv.tech_grade}) 후보자 최종 선발이 승인되어 프로젝트 슬롯에 자동 배정되었습니다.`);
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
    const order = { '면접진행완료': 1, '인터뷰통보완료': 2, '서류검토중': 3, '최종선정': 4 };
    return (order[a.status] || 9) - (order[b.status] || 9);
  });
  const pendingApprovalCount = interviews.filter(i => i.status === '면접진행완료').length;
  const scheduledInterviewCount = interviews.filter(i => i.status === '인터뷰통보완료').length;

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
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));

  const totalRiskWatchCount = urgentUnfilledItems.length + starExternalTalents.length;

  el.innerHTML = `
    <div class="exec-dashboard-wrap">
      <!-- TOP 4 KPI CARDS -->
      <section class="exec-kpi-grid">
        <!-- KPI 1: 수행 프로젝트 -->
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

        <!-- KPI 2: 입찰 예정 -->
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

        <!-- KPI 3: 내부 가동률 -->
        <article class="exec-kpi-card" onclick="filterProfilesFromDashboard('INTERNAL', 'ALL', 'ALL')">
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

        <!-- KPI 4: 외주 투입 -->
        <article class="exec-kpi-card" onclick="filterProfilesFromDashboard('EXTERNAL', 'ALL', 'ALL')">
          <div class="exec-kpi-top">
            <span class="exec-kpi-label">외주 투입</span>
            <span class="exec-kpi-icon">${svgIcon('award', 26)}</span>
          </div>
          <div class="exec-kpi-value-row">
            <div class="exec-kpi-main-val">${deployedExternalCount}<span class="exec-kpi-unit">명</span></div>
          </div>
          <div class="exec-kpi-foot">
            <span>수행중 ${deployedExternalCount}명 (만료임박 2명, 차기 확정 1명)</span>
          </div>
        </article>
      </section>

      <!-- 2x2 MAIN GOLDEN RATIO GRID -->
      <div class="exec-quad-grid">
        <!-- MIDDLE LEFT: 일자/주차별 철수 예정 타임라인 -->
        <section class="exec-widget-card">
          <div class="exec-widget-header">
            <div>
              <div class="exec-widget-title-row">
                <h3 class="exec-widget-title">${svgIcon('calendar', 16)} 일자/주차별 철수 예정 타임라인</h3>
                <span class="zal-status-pill ${unassignedRollOffCount > 0 ? 'red' : 'green'}">
                  차기 미배정 경고 ${unassignedRollOffCount}명
                </span>
              </div>
              <p class="exec-widget-question">"다음 달에 누가 빠지고, 놀게 될 인력은 누구인가?"</p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="switchTab('profiles')">전체 가용일 관리 ›</button>
          </div>

          <div class="exec-rolloff-list">
            ${rollOffCandidates.map(p => {
              const nextPrj = nextAssignmentMap[p.id];
              const curOngoing = currentOngoingMap[p.id];
              const lastCareer = (p.career_history && p.career_history[0]) ? p.career_history[0].project : '현 프로젝트 수행';
              const currentPrjLabel = curOngoing ? `${curOngoing.client} (${curOngoing.projectName.slice(0, 14)})` : lastCareer.slice(0, 20);
              const weekLabel = getWeekBucketLabel(p.current_end_date || p.available_date);

              return `
                <div class="exec-rolloff-item ${!nextPrj ? 'unassigned-warn' : ''}" onclick="openProfileDetailModal('${p.id}')">
                  <div class="exec-rolloff-date-col">
                    <span class="exec-week-tag">${weekLabel}</span>
                    <div class="exec-end-date">종료 ${(p.current_end_date || '-').slice(5).replace('-', '.')} <span style="color:#059669; font-weight:600;">(가용 ${(p.available_date || '-').slice(5).replace('-', '.')})</span></div>
                  </div>

                  <div class="exec-rolloff-person-col">
                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                      <strong class="exec-person-name">${p.name}</strong>
                      <span class="exec-emp-badge ${p.is_internal ? 'internal' : 'external'}">${p.is_internal ? '내부' : '외주'} · ${p.employment_type.replace('사내 ', '').replace('외주 ', '')}</span>
                      <span class="exec-grade-tag">${p.tech_grade}</span>
                    </div>
                    <div class="exec-rolloff-sub">
                      현 수행: ${currentPrjLabel} · 주력: ${(p.domains || []).slice(0, 2).join('/')}
                    </div>
                  </div>

                  <div class="exec-rolloff-action-col" onclick="event.stopPropagation();">
                    ${nextPrj ? `
                      <span class="exec-assigned-pill" onclick="selectProjectDetail('${nextPrj.projectId}')" title="${nextPrj.projectName} (${nextPrj.roleName})">
                        ${svgIcon('check', 12)} 차기확정: ${nextPrj.client}
                      </span>
                    ` : `
                      <div style="display:flex; align-items:center; gap:6px;">
                        <span class="exec-unassigned-alert">미배정 ${p.is_internal ? '(유휴위험)' : '(이탈위험)'}</span>
                        <button type="button" class="btn btn-primary btn-sm" style="padding:4px 9px; font-size:11.5px;" onclick="openQuickAssignForProfile('${p.id}')">
                          즉시배정
                        </button>
                      </div>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- MIDDLE RIGHT: 도메인 × 기술등급 가용 인력 미니 히트맵 & 입찰 프로젝트 매칭 현황 -->
        <section class="exec-widget-card">
          <div class="exec-widget-header">
            <div>
              <div class="exec-widget-title-row">
                <h3 class="exec-widget-title">${svgIcon('target', 16)} 도메인 × 기술등급 가용 인력 히트맵 & 입찰 매칭</h3>
                <span class="zal-status-pill blue">입찰 ${plannedProjects.length}건 검증</span>
              </div>
              <p class="exec-widget-question">"이번 신규 입찰 건, 우리 내부/검증 인력으로 칠 수 있나?"</p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="jumpToPlannedProjectsFromDashboard('PLANNED')">입찰 편성표 ›</button>
          </div>

          <!-- Part A: Mini Heatmap Table -->
          <div class="exec-heatmap-box">
            <table class="exec-heatmap-table">
              <thead>
                <tr>
                  <th style="text-align:left;">핵심 금융 도메인</th>
                  <th>특급</th>
                  <th>고급</th>
                  <th>중급</th>
                  <th>내부/검증 풀</th>
                </tr>
              </thead>
              <tbody>
                ${heatmapRows.map(row => {
                  const rowProfiles = allProfiles.filter(p => (p.domains || []).some(d => row.matchDomains.includes(d)));
                  const rowInternal = rowProfiles.filter(p => p.is_internal).length;
                  const rowVerifiedExt = rowProfiles.filter(p => !p.is_internal && p.verified).length;

                  const gradeCells = grades.map(g => {
                    const cellProfiles = rowProfiles.filter(p => p.tech_grade === g);
                    const cnt = cellProfiles.length;
                    const intCnt = cellProfiles.filter(p => p.is_internal).length;
                    const heatClass = cnt === 0 ? 'heat-0' : cnt === 1 ? 'heat-1' : cnt === 2 ? 'heat-2' : 'heat-3';
                    return `
                      <td>
                        <button type="button" class="exec-heat-cell ${heatClass}" onclick="filterProfilesFromDashboard('ALL', '${g}', '${row.filterDomain}')" title="${row.label} ${g}: ${cellProfiles.map(x => x.name).join(', ') || '없음'}">
                          <strong>${cnt}명</strong>
                          <span>${cnt > 0 ? `(내부${intCnt}·외주${cnt - intCnt})` : '충원필요'}</span>
                        </button>
                      </td>
                    `;
                  }).join('');

                  return `
                    <tr>
                      <td style="font-weight:600; color:#0f172a; font-size:13px;">${row.label}</td>
                      ${gradeCells}
                      <td style="text-align:center; font-size:12px; color:#334155; font-weight:600;">
                        총 ${rowProfiles.length}명 <span style="color:#64748b; font-weight:500;">(내부${rowInternal}/검증${rowVerifiedExt})</span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Part B: Planned Bid Projects Staffing Readiness -->
          <div class="exec-bid-match-list">
            <div class="exec-sub-section-label">신규 입찰 프로젝트 인력 편성 및 매칭 현황</div>
            ${plannedProjects.map(prj => {
              const total = prj.to_slots.length;
              const filled = prj.to_slots.filter(s => s.assigned_profile_id).length;
              const rate = total ? Math.round((filled / total) * 100) : 100;
              const firstOpenSlot = prj.to_slots.find(s => !s.assigned_profile_id);
              const openRoles = prj.to_slots.filter(s => !s.assigned_profile_id).map(s => `${s.role_name.slice(0, 12)}(${s.required_grade})`).join(', ');

              return `
                <div class="exec-bid-row" onclick="selectProjectDetail('${prj.id}')">
                  <div class="exec-bid-info">
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                      <span class="badge badge-domain">${prj.domain}</span>
                      <strong class="exec-bid-name">${prj.name}</strong>
                    </div>
                    <div class="exec-bid-meta">
                      <span>확정 <strong>${filled}/${total}석 (${rate}%)</strong></span>
                      <span>·</span>
                      <span style="color:${openRoles ? '#dc2626' : '#059669'}; font-weight:500;">
                        ${openRoles ? `미충원: ${openRoles}` : '전 포지션 편성 완료'}
                      </span>
                    </div>
                  </div>
                  <div class="exec-bid-actions" onclick="event.stopPropagation();">
                    <div class="exec-mini-bar"><div class="exec-mini-bar-fill" style="width:${rate}%;"></div></div>
                    ${firstOpenSlot ? `
                      <button type="button" class="btn btn-primary btn-sm" style="padding:4px 9px; font-size:11.5px;" onclick="openRfpMatchModal('${prj.id}', '${firstOpenSlot.slot_id}')">
                        적임자 매칭
                      </button>
                    ` : ''}
                    <button type="button" class="btn btn-outline btn-sm" style="padding:4px 9px; font-size:11.5px;" onclick="openProposalSheetModal('${prj.id}')">
                      장표추출
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- BOTTOM LEFT: 핵심 인터뷰 브리핑 & 채용 최종 승인 대기함 -->
        <section class="exec-widget-card">
          <div class="exec-widget-header">
            <div>
              <div class="exec-widget-title-row">
                <h3 class="exec-widget-title">${svgIcon('check', 16)} 핵심 인터뷰 브리핑 & 채용 최종 승인 대기함</h3>
                <span class="zal-status-pill ${pendingApprovalCount > 0 ? 'amber' : 'green'}">
                  최종컨펌 대기 ${pendingApprovalCount}건 · 예정 ${scheduledInterviewCount}건
                </span>
              </div>
              <p class="exec-widget-question">"검증 끝난 후보자 중 내가 최종 컨펌할 사람은 누구인가?"</p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="switchTab('interviews')">면접·검증 전체 ›</button>
          </div>

          <div class="exec-interview-list">
            ${sortedInterviews.map(inv => {
              const targetPrj = projects.find(p => p.id === inv.project_id);
              const isReadyToApprove = inv.status === '면접진행완료';
              const isApproved = inv.status === '최종선정';
              const rateText = canViewSensitive && inv.desired_rate
                ? `희망 월 ${Number(inv.desired_rate).toLocaleString()}만`
                : '단가 비공개';

              return `
                <div class="exec-interview-item ${isReadyToApprove ? 'ready-approve' : ''}" onclick="openCandidateResumeModal('${inv.id}')">
                  <div class="exec-int-main">
                    <div style="display:flex; align-items:center; gap:7px; flex-wrap:wrap;">
                      <span class="zal-status-pill ${isApproved ? 'green' : isReadyToApprove ? 'blue' : 'amber'}" style="padding:2px 8px; font-size:11.5px;">
                        ${isApproved ? '선발확정' : isReadyToApprove ? '승인대기 (검증완료)' : inv.status}
                      </span>
                      <strong style="font-size:14.5px; color:#0f172a;">${inv.candidate_name}</strong>
                      <span style="font-size:12.5px; color:#475569; font-weight:500;">${inv.candidate_type} · ${inv.tech_grade}</span>
                      <span class="exec-rate-pill">${rateText}</span>
                    </div>

                    <div class="exec-int-target">
                      타겟 사업: <strong>${targetPrj ? targetPrj.client : '미래에셋증권'}</strong> (${(inv.domains || []).join('/')} · 가용일 ${inv.available_from})
                    </div>

                    <div class="exec-int-eval-summary">
                      ${inv.total_score > 0 ? `
                        <span class="exec-score-badge">★ ${Number(inv.total_score).toFixed(1)} / 5.0</span>
                        <span style="color:#334155;">"${inv.interviewer_opinion || '필수질문 기술·성향 검증 완료'}" <span style="color:#94a3b8;">— ${inv.interviewer_name}</span></span>
                      ` : `
                        <span style="color:#d97706; font-weight:500;">면접 일시: ${inv.interview_date || '일정 조율중'} (${inv.interview_method || '화상'}) · 면접관: ${inv.interviewer_name || '조성현 상무'}</span>
                      `}
                    </div>
                  </div>

                  <div class="exec-int-actions" onclick="event.stopPropagation();">
                    ${isReadyToApprove ? `
                      <button type="button" class="btn btn-outline btn-sm" style="padding:5px 9px; font-size:11.5px;" onclick="openInterviewResultViewModal('${inv.id}')">
                        결과브리핑
                      </button>
                      <button type="button" class="btn btn-primary btn-sm" style="padding:5px 10px; font-size:11.5px; background:#059669; border-color:#059669;" onclick="quickConfirmCandidateSelection('${inv.id}')">
                        최종 선발 컨펌
                      </button>
                    ` : isApproved ? `
                      <button type="button" class="btn btn-outline btn-sm" style="padding:5px 9px; font-size:11.5px;" onclick="openInterviewResultViewModal('${inv.id}')">
                        평가결과 보기
                      </button>
                    ` : `
                      <button type="button" class="btn btn-outline btn-sm" style="padding:5px 9px; font-size:11.5px;" onclick="openEvaluateChecklistModal('${inv.id}')">
                        면접평가 입력
                      </button>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- BOTTOM RIGHT: 리스크 워치 (착수 임박 미충원 경고 · ★4.5 이상 우수 외주 타사업 종료 알림) -->
        <section class="exec-widget-card">
          <div class="exec-widget-header">
            <div>
              <div class="exec-widget-title-row">
                <h3 class="exec-widget-title">${svgIcon('bolt', 16)} 리스크 워치 (착수 임박 미충원 · 우수 외주 선점)</h3>
                <span class="zal-status-pill red">즉시 지시·선점 ${totalRiskWatchCount}건</span>
              </div>
              <p class="exec-widget-question">"오늘 당장 지시하거나 선점해야 할 급한 불은 무엇인가?"</p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="switchTab('sourcing')">타겟소싱 관제 ›</button>
          </div>

          <div class="exec-risk-container">
            <!-- Risk Part 1: Urgent Unfilled TOs -->
            <div class="exec-sub-section-label" style="color:#dc2626;">🚨 착수/편성 마감 임박 미충원 TO 경고</div>
            <div class="exec-risk-group">
              ${urgentUnfilledItems.length > 0 ? urgentUnfilledItems.map(item => {
                const firstSlot = item.openSlots[0];
                return `
                  <div class="exec-risk-item danger" onclick="selectProjectDetail('${item.prj.id}')">
                    <div class="exec-risk-left">
                      <div style="display:flex; align-items:center; gap:7px; flex-wrap:wrap;">
                        <span class="exec-dday-badge">D-${item.diffDays} (${item.deadline.slice(5).replace('-', '/')} 마감)</span>
                        <strong style="font-size:13.5px; color:#0f172a;">${item.prj.client} — 미충원 ${item.openSlots.length}석</strong>
                      </div>
                      <div style="font-size:12px; color:#475569; margin-top:3px;">
                        긴급 포지션: ${item.openSlots.map(s => `${s.role_name}(${s.required_grade})`).join(', ')}
                      </div>
                    </div>
                    <div class="exec-risk-actions" onclick="event.stopPropagation();">
                      <button type="button" class="btn btn-primary btn-sm" style="padding:4px 9px; font-size:11.5px; background:#dc2626; border-color:#dc2626;" onclick="openRfpMatchModal('${item.prj.id}', '${firstSlot.slot_id}')">
                        즉시 매칭지시
                      </button>
                    </div>
                  </div>
                `;
              }).join('') : `
                <div style="padding:12px; font-size:13px; color:#059669; background:#ecfdf5; border-radius:10px;">
                  모든 입찰 예정 프로젝트의 핵심 TO 편성이 완료되었습니다.
                </div>
              `}
            </div>

            <!-- Risk Part 2: ★4.5+ Verified External Talents Ending Other Projects Soon -->
            <div class="exec-sub-section-label" style="color:#b45309; margin-top:6px;">⭐ ★4.5 이상 기검증 우수 외주 타사업 종료 알림 (선점 대상)</div>
            <div class="exec-risk-group">
              ${starExternalTalents.map(p => {
                const lastPrj = (p.career_history && p.career_history[0]) ? p.career_history[0].project : '금융권 코어 프로젝트';
                const rateLabel = canViewSensitive && p.desired_rate ? `희망 ${p.desired_rate}만` : '기검증 우수';
                return `
                  <div class="exec-risk-item Opportunity" onclick="openProfileDetailModal('${p.id}')">
                    <div class="exec-risk-left">
                      <div style="display:flex; align-items:center; gap:7px; flex-wrap:wrap;">
                        <span class="exec-star-pill">★ ${Number(p.rating || 4.8).toFixed(1)} (재소싱 ${p.resourced_count}회)</span>
                        <strong style="font-size:13.5px; color:#0f172a;">${p.name}</strong>
                        <span style="font-size:12px; color:#475569;">${p.employment_type} · ${p.tech_grade} (${rateLabel})</span>
                      </div>
                      <div style="font-size:12px; color:#475569; margin-top:3px;">
                        타사업 종료: <strong style="color:#d97706;">${p.current_end_date}</strong> (투입가능: <strong style="color:#059669;">${p.available_date}</strong>) · ${lastPrj.slice(0, 22)}
                      </div>
                    </div>
                    <div class="exec-risk-actions" onclick="event.stopPropagation();">
                      <button type="button" class="btn btn-outline btn-sm" style="padding:4px 9px; font-size:11.5px; border-color:#f59e0b; color:#b45309;" onclick="openQuickAssignForProfile('${p.id}')">
                        선점 배정
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

/* =========================================================================
   TAB 2: INTEGRATED TALENT DB & AI NON-STOP RESUME PARSING
   ========================================================================= */
function renderProfilesTab() {
  const { profiles, permissions, currentUser } = state.data;
  const el = document.getElementById('tab-profiles');
  const f = state.profileFilters;

  const filtered = profiles.filter(p => {
    if (f.empType === 'INTERNAL' && !p.is_internal) return false;
    if (f.empType === 'EXTERNAL' && p.is_internal) return false;
    if (f.grade !== 'ALL' && p.tech_grade !== f.grade) return false;
    if (f.domain !== 'ALL' && !p.domains.includes(f.domain)) return false;
    if (f.availability !== 'ALL' && p.availability_status !== f.availability) return false;
    if (f.verifiedOnly && !p.verified) return false;
    if (f.keyword) {
      const kw = f.keyword.toLowerCase();
      const hay = `${p.name} ${p.employment_type} ${p.skills.join(' ')} ${p.domains.join(' ')} ${p.certifications.join(' ')}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    return true;
  });

  el.innerHTML = `
    ${permissions.can_view_all_profiles ? `
      <div class="ai-parse-banner">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
          <div>
            <span class="zal-status-pill green" style="margin-bottom:6px; display:inline-flex; align-items:center; gap:5px;">${svgIcon('bolt', 13)} AI 무정차 이력서 파싱 엔진 (1건당 검수·등록 2분 이내)</span>
            <h3 style="font-size:16px; font-weight:600; color:#0f172a;">워드(.docx) · 엑셀(.xlsx) · PDF 이력서 업로드 시 표준 DB 자동 적재</h3>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <label class="btn btn-primary" style="cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
              ${svgIcon('file', 14)} 내 PC 이력서 업로드
              <input type="file" id="resumeFileInput" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" style="display:none;" onchange="handleResumeFileUpload(event)" />
            </label>
            <button class="btn btn-outline" onclick="triggerSampleParse('sample1')">샘플1: 퇴직연금 특급</button>
            <button class="btn btn-outline" onclick="triggerSampleParse('sample2')">샘플2: 채권·펀드 고급</button>
            <button class="btn btn-outline" onclick="triggerSampleParse('sample3')">샘플3: 마이데이터 정규직</button>
          </div>
        </div>
      </div>
    ` : `
      <div class="zal-request-banner" style="margin-bottom:18px;">
        <span style="display:inline-flex; align-items:center; gap:5px;">${svgIcon('lock', 14)} 현재 역할(${currentUser ? currentUser.title : '외부 방문자'})은 본인 프로필 또는 면접관으로 지정된 지원자 이력만 열람 가능합니다.</span>
        ${currentUser?.linked_profile_id ? `<button class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openEditProfileModal('${currentUser.linked_profile_id}')">${svgIcon('edit', 13)} 내 프로필 · 가용일 수정</button>` : ''}
      </div>
    `}

    <div class="filter-bar">
      <div class="filter-group">
        <label>소속</label>
        <select class="select" onchange="updateProfileFilter('empType', this.value)">
          <option value="ALL" ${f.empType === 'ALL' ? 'selected' : ''}>사내외 전체 (${profiles.length}명)</option>
          <option value="INTERNAL" ${f.empType === 'INTERNAL' ? 'selected' : ''}>사내 직원</option>
          <option value="EXTERNAL" ${f.empType === 'EXTERNAL' ? 'selected' : ''}>외주 인력</option>
        </select>
      </div>
      <div class="filter-group">
        <label>등급</label>
        <select class="select" onchange="updateProfileFilter('grade', this.value)">
          <option value="ALL" ${f.grade === 'ALL' ? 'selected' : ''}>전체 등급</option>
          <option value="특급" ${f.grade === '특급' ? 'selected' : ''}>특급</option>
          <option value="고급" ${f.grade === '고급' ? 'selected' : ''}>고급</option>
          <option value="중급" ${f.grade === '중급' ? 'selected' : ''}>중급</option>
        </select>
      </div>
      <div class="filter-group">
        <label>도메인</label>
        <select class="select" onchange="updateProfileFilter('domain', this.value)">
          <option value="ALL" ${f.domain === 'ALL' ? 'selected' : ''}>전체 도메인</option>
          <option value="퇴직연금" ${f.domain === '퇴직연금' ? 'selected' : ''}>퇴직연금</option>
          <option value="펀드" ${f.domain === '펀드' ? 'selected' : ''}>펀드</option>
          <option value="채권" ${f.domain === '채권' ? 'selected' : ''}>채권</option>
          <option value="계정계 코어" ${f.domain === '계정계 코어' ? 'selected' : ''}>계정계 코어</option>
          <option value="마이데이터" ${f.domain === '마이데이터' ? 'selected' : ''}>마이데이터</option>
          <option value="채널계" ${f.domain === '채널계' ? 'selected' : ''}>채널계</option>
          <option value="정보계/DW" ${f.domain === '정보계/DW' ? 'selected' : ''}>정보계/DW</option>
        </select>
      </div>
      <label class="switch-label">
        <input type="checkbox" ${f.verifiedOnly ? 'checked' : ''} onchange="updateProfileFilter('verifiedOnly', this.checked)" />
        기검증 우수인력만
      </label>
      <input
        type="text"
        class="input"
        style="flex:1; min-width:180px;"
        placeholder="이름, 스킬(Java, ProFrame, React), 자격증 검색..."
        value="${f.keyword}"
        oninput="updateProfileFilter('keyword', this.value)"
      />
    </div>

    <div class="dashboard-feed-masonry">
      ${filtered.map(p => renderProfileCard(p, permissions, currentUser)).join('') || `
        <div class="card" style="grid-column: 1 / -1; text-align:center; padding:40px;">
          조건에 부합하거나 열람 권한이 있는 인재 프로필이 없습니다.
        </div>
      `}
    </div>
  `;
}

function renderProfileCard(p, permissions, currentUser) {
  const isOwn = currentUser && currentUser.linked_profile_id === p.id;
  const canEdit = permissions.can_view_all_profiles || isOwn;

  return `
    <article class="zal-feed-card" style="cursor:pointer;" onclick="openProfileDetailModal('${p.id}')" title="클릭하여 상세 프로필 및 프로젝트 수행 평가 열람">
      <div class="zal-card-header">
        <div class="zal-author-box">
          <div class="zal-avatar-circle">
            <img src="${getAvatarForId(p.id)}" alt="${p.name}" />
          </div>
          <div>
            <div>
              <span class="zal-author-name">${p.name}</span>
              <span class="zal-author-role">${p.employment_type} · ${p.tech_grade} (${p.experience_years}년)</span>
            </div>
            <div class="zal-card-time">
              <span>${svgIcon('clock', 12)} 최신화 ${p.updated_at}</span>
              <span>|</span>
              <span>${p.education}</span>
            </div>
          </div>
        </div>
        <span class="zal-status-pill ${p.verified ? 'green' : 'amber'}">
          ${p.verified ? `${svgIcon('award', 13)} 기검증 ${p.resourced_count > 0 ? `(재소싱 ${p.resourced_count})` : ''}` : '신규파싱'}
        </span>
      </div>

      <div class="zal-meta-list">
        <div class="zal-meta-row">
          <span class="zal-meta-label">${svgIcon('briefcase', 14)} 도메인</span>
          <span class="zal-meta-val">${p.domains.join(' · ')}</span>
        </div>
        <div class="zal-meta-row">
          <span class="zal-meta-label">${svgIcon('calendar', 14)} 가용일</span>
          <span class="zal-meta-val" style="color:${p.availability_status === '즉시투입가능' ? '#059669' : '#d97706'};">
            ${p.availability_status} (투입가능: ${p.available_date})
          </span>
        </div>
        <div class="zal-meta-row">
          <span class="zal-meta-label">${svgIcon('code', 14)} 스킬셋</span>
          <span class="zal-meta-val">${p.skills.join(', ')}</span>
        </div>
        <div class="zal-meta-row">
          <span class="zal-meta-label">${svgIcon('file', 14)} 자격증</span>
          <span class="zal-meta-val">${p.certifications.join(', ')}</span>
        </div>
      </div>

      ${p.rating !== null ? `
        <div class="zal-request-banner" style="background:#f8fafc; border-color:#e2e8f0; color:#0f172a;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px;">${svgIcon('star', 14)} 내부 평점 <strong>${p.rating > 0 ? `${p.rating} / 5.0` : '평가전'}</strong> · ${svgIcon('dollar', 14)} ${p.is_internal ? `기준단가 ${p.contract_rate}만` : `희망 ${p.desired_rate || '-'}만`}</div>
            <div style="font-size:11.5px; color:#64748b; font-weight:500; margin-top:2px;">${p.review_summary || '-'}</div>
          </div>
        </div>
      ` : `
        <div class="zal-request-banner locked">
          <span>${p.review_summary}</span>
        </div>
      `}

      <div class="zal-card-footer">
        <div class="zal-reaction-group">
          <span class="zal-reaction-pill">${svgIcon('folder', 13)} 수행이력 ${p.career_history.length}건</span>
          ${canEdit ? `<button type="button" class="zal-reaction-pill" onclick="event.stopPropagation(); openEditProfileModal('${p.id}')">${svgIcon('edit', 13)} 프로필·가용일 수정</button>` : ''}
        </div>
        <span style="font-size:11.5px; color:#94a3b8; font-weight:600;">상세·평가 보기 ›</span>
      </div>
    </article>
  `;
}

function updateProfileFilter(key, val) {
  state.profileFilters[key] = val;
  renderProfilesTab();
}

async function handleResumeFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  let text = '';
  try { text = await file.text(); } catch { text = ''; }
  if (!/[가-힣]{2,}/.test(text)) {
    text = `성명: 박성진\n소속구분: 외주 프리랜서 (고급 기술자 / 11년차)\n연락처: 010-6412-8901 | 이메일: sj.park@fin-dev.kr\n최종학력: 서강대학교 컴퓨터공학과 학사\n보유자격증: 정보처리기사, SQLP\n보유스킬: Java, Spring Boot, Spring Batch, Oracle, ProFrame, WebSquare\n금융도메인: 퇴직연금, 계정계 코어, 펀드\n투입가능일: 2026-11-25\n희망단가: 1050만원\n주요수행이력:\n- 업로드 파일(${file.name}) 기반 퇴직연금 및 코어뱅킹 차세대 구축 프로젝트 수행`;
  }
  openAiParseReviewModal(file.name, text);
  event.target.value = '';
}

function triggerSampleParse(sampleKey) {
  const sample = SAMPLE_RESUMES[sampleKey];
  if (!sample) return;
  openAiParseReviewModal(sample.fileName, sample.rawText);
}

async function openAiParseReviewModal(fileName, rawText) {
  const res = await apiCall('/api/ai/parse-resume', 'POST', { fileName, rawText });
  const p = res.parsed;

  openModal(`AI 잘될이 무정차 이력서 파싱 검수 (${fileName})`, `
    <div class="zal-request-banner" style="background:#ecfdf5; border-color:#a7f3d0; color:#059669; margin-bottom:16px;">
      <span>✓ AI 자동 파싱 완료 (정확도 ${p.ai_confidence}% · 검수 목표 2분 이내)</span>
      <span>예상 검수 시간: ${p.estimated_parse_seconds}초</span>
    </div>

    <form id="aiParsedProfileForm" onsubmit="submitAiParsedProfile(event)">
      <div class="form-grid">
        <div class="form-field">
          <label>성명</label>
          <input class="input" name="name" value="${p.name}" required />
        </div>
        <div class="form-field">
          <label>소속 구분</label>
          <select class="select" name="employment_type">
            ${['사내 정규직', '사내 전문계약직', '외주 프리랜서', '외주 반프리', '외주 개인사업자'].map(t =>
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
          <label>경력 연차 (년)</label>
          <input type="number" class="input" name="experience_years" value="${p.experience_years}" required />
        </div>
        <div class="form-field">
          <label>연락처</label>
          <input class="input" name="phone" value="${p.phone}" />
        </div>
        <div class="form-field">
          <label>이메일</label>
          <input class="input" name="email" value="${p.email}" />
        </div>
        <div class="form-field">
          <label>최종 학력</label>
          <input class="input" name="education" value="${p.education}" />
        </div>
        <div class="form-field">
          <label>차기 투입 가능일</label>
          <input type="date" class="input" name="available_date" value="${p.available_date}" />
        </div>
        <div class="form-field">
          <label>희망/기준 단가 (만원/월)</label>
          <input type="number" class="input" name="desired_rate" value="${p.desired_rate}" />
        </div>
        <div class="form-field">
          <label>보유 자격증 (쉼표 구분)</label>
          <input class="input" name="certifications" value="${p.certifications.join(', ')}" />
        </div>
        <div class="form-field">
          <label>핵심 스킬셋 (쉼표 구분)</label>
          <input class="input" name="skills" value="${p.skills.join(', ')}" />
        </div>
        <div class="form-field">
          <label>금융/비금융 도메인 (쉼표 구분)</label>
          <input class="input" name="domains" value="${p.domains.join(', ')}" />
        </div>
      </div>

      <div class="form-field" style="margin-bottom:14px;">
        <label>AI 추출 주요 수행이력 (표준 규격 JSON)</label>
        <textarea class="textarea" name="career_history_json" style="font-family:monospace; font-size:12px;">${JSON.stringify(p.career_history, null, 2)}</textarea>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">✓ 검수 완료 및 통합 DB 적재</button>
      </div>
    </form>
  `);
}

async function submitAiParsedProfile(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  let career_history = [];
  try { career_history = JSON.parse(fd.get('career_history_json')); } catch { career_history = []; }

  await apiCall('/api/profiles', 'POST', {
    name: fd.get('name'),
    employment_type: fd.get('employment_type'),
    tech_grade: fd.get('tech_grade'),
    experience_years: Number(fd.get('experience_years')),
    phone: fd.get('phone'),
    email: fd.get('email'),
    education: fd.get('education'),
    available_date: fd.get('available_date'),
    desired_rate: Number(fd.get('desired_rate')),
    certifications: fd.get('certifications').split(',').map(s => s.trim()).filter(Boolean),
    skills: fd.get('skills').split(',').map(s => s.trim()).filter(Boolean),
    domains: fd.get('domains').split(',').map(s => s.trim()).filter(Boolean),
    career_history,
    parse_seconds: 52
  });

  closeModal();
  showToast('✨ AI 파싱 프로필이 사내외 통합 DB에 즉시 적재되었습니다!');
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
            ${['사내 정규직', '사내 전문계약직', '외주 프리랜서', '외주 반프리', '외주 개인사업자'].map(t =>
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

  const sections = [
    { key: 'PLANNED', title: '예정(입찰) 프로젝트', badgeClass: 'purple', items: plannedProjects },
    { key: 'ONGOING', title: '진행중인 프로젝트', badgeClass: 'amber', items: ongoingProjects },
    { key: 'COMPLETED', title: '완료된 프로젝트', badgeClass: 'green', items: completedProjects }
  ].filter(sec => activeGroup === 'ALL' || activeGroup === sec.key);

  // Otherwise, render the Project List View with 3 grouped sections and basic info cards
  el.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
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
      </div>
      ${canManagePrj ? `
        <button class="btn btn-primary btn-sm" onclick="openNewProjectModal()">+ 신규 프로젝트 및 TO 등록</button>
      ` : ''}
    </div>

    <div style="display:flex; flex-direction:column; gap:28px;">
      ${sections.map(sec => `
        <section>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
            <h3 style="font-size:16.5px; font-weight:600; color:#0f172a; margin:0;">${sec.title}</h3>
            <span class="zal-status-pill ${sec.badgeClass}">${sec.items.length}건</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${sec.items.map(prj => renderProjectSummaryCard(prj)).join('')}
          </div>
        </section>
      `).join('')}
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

function renderPostingApplicantBox(post) {
  const defaultMap = {
    post_1: ['양동근', '김도현', '이준호'],
    post_2: ['한지민', '박성진'],
    post_3: ['오세훈', '김도윤', '최민수']
  };
  const rawApplicants = Array.isArray(post.applicants)
    ? post.applicants
    : (defaultMap[post.id] || []);
  const isMaster = state.data?.currentUser?.role_group === 'MASTER';
  const displayApplicants = rawApplicants.map(name => {
    const clean = String(name || '').trim();
    if (isMaster) return clean.replace(/\*\*$/, '');
    if (clean.endsWith('**')) return clean;
    return `${clean.charAt(0)}**`;
  });
  const count = typeof post.applicant_count === 'number' ? post.applicant_count : displayApplicants.length;
  return `
    <div class="posting-applicant-box">
      <div class="posting-applicant-title">
        프로젝트 참여신청 <span class="posting-applicant-count">${count}명</span>
      </div>
      <div class="posting-applicant-avatars">
        ${displayApplicants.length > 0 ? displayApplicants.map((label, idx) => `
          <span class="posting-applicant-circle color-${idx % 4}" onclick="event.stopPropagation(); openApplicantDetailFromPosting('${post.id}', ${idx})" title="${label} 상세 프로필 보기">${label}</span>
        `).join('') : `<span style="font-size:12.5px; color:#94a3b8;">신청 대기중</span>`}
      </div>
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
  const segs = [];
  for (let i = 1; i <= 5; i++) {
    segs.push(`<span class="eval-bar-seg ${i <= filledSegments ? 'filled' : ''}"></span>`);
  }
  return `<span class="eval-seg-bar">${segs.join('')}</span>`;
}

function renderStarIcons(score = 5.0) {
  const count = Math.max(1, Math.min(5, Math.round(score)));
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<svg width="16" height="16" viewBox="0 0 24 24" fill="${i <= count ? '#facc15' : '#e2e8f0'}" stroke="${i <= count ? '#eab308' : '#cbd5e1'}" stroke-width="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  return `<span style="display:inline-flex; align-items:center; gap:2px;">${html}</span>`;
}

function renderProfileIdentityHeader(person) {
  const primaryRole = (person.domains && person.domains[0]) ? `${person.domains[0]} · ${person.tech_grade}` : (person.tech_grade || '전문가');
  const empCategory = person.employment_type || (person.is_internal ? '사내 정규직' : '외주 프리랜서(개인)');
  const locationText = person.is_internal ? '서울특별시 영등포구(여의도)' : '서울특별시 동작구 · 을지로';
  const workPref = person.is_internal ? '본사·상주 프로젝트 선호' : '외주, 기간제(상주) 선호';
  const isAvailable = (person.availability_status || '즉시투입가능').includes('가능');

  return `
    <div class="profile-identity-header">
      <div class="profile-identity-avatar">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
        </svg>
      </div>
      <div class="profile-identity-body">
        <div class="profile-identity-top">
          <span class="profile-identity-name">${person.name}</span>
          <span class="profile-badge-verified">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            신원 인증
          </span>
          <span class="profile-badge-active">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="16 9 10.5 14.5 8 12"/></svg>
            ${isAvailable ? '활동 가능' : (person.availability_status || '활동 가능')}
          </span>
        </div>
        <div class="profile-identity-meta">
          <span class="profile-meta-item">${svgIcon('file', 13)} ${primaryRole}</span>
          <span class="profile-meta-sep">|</span>
          <span class="profile-meta-item">${svgIcon('user', 13)} ${empCategory}</span>
          <span class="profile-meta-sep">|</span>
          <span class="profile-meta-item">${svgIcon('pin', 13)} ${locationText}</span>
          <span class="profile-meta-sep">|</span>
          <span class="profile-meta-item">${workPref}</span>
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
        <span class="profile-eval-more">${evaluations.length}개 모두 보기 ›</span>
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

function openProfileDetailModal(profileId) {
  const { profiles, permissions, currentUser } = state.data || {};
  const p = (profiles || []).find(x => x.id === profileId);
  if (!p) return;
  const isOwn = currentUser && currentUser.linked_profile_id === p.id;
  const canEdit = permissions?.can_view_all_profiles || isOwn;
  const careerHistory = p.career_history || [];
  const workedBefore = hasWorkedWithCompany(p);

  openModal(`인재 상세 프로필 — ${p.name} (${p.tech_grade})`, `
    <div style="display:flex; flex-direction:column; gap:18px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        ${renderProfileIdentityHeader(p)}
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="zal-status-pill ${workedBefore ? 'green' : 'gray'}">
            ${workedBefore ? (p.is_internal ? '사내 재직 인력' : `당사 수행이력 보유 (재소싱 ${p.resourced_count}회)`) : '당사 프로젝트 수행이력 없음'}
          </span>
          ${canEdit ? `
            <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openEditProfileModal('${p.id}')">
              ${svgIcon('edit', 13)} 프로필·가용일 수정
            </button>
          ` : ''}
        </div>
      </div>

      <div class="form-grid" style="margin-bottom:0;">
        <div style="padding:12px 14px; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="font-size:12px; color:#64748b; margin-bottom:4px;">최종 학력 · 보유 자격증 (${p.experience_years}년차)</div>
          <div style="font-size:14px; font-weight:600; color:#0f172a;">${p.education}</div>
          <div style="font-size:12.5px; color:#475569; margin-top:2px;">자격증: ${(p.certifications || []).join(', ') || '-'}</div>
        </div>
        <div style="padding:12px 14px; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="font-size:12px; color:#64748b; margin-bottom:4px;">투입 가용일 · 기준/희망 단가</div>
          <div style="font-size:14px; font-weight:600; color:#059669;">${p.availability_status} (가용일: ${p.available_date})</div>
          <div style="font-size:12.5px; color:#0f172a; margin-top:2px;">
            ${p.is_internal ? `기준 단가: 월 ${(p.contract_rate || 0).toLocaleString()}만원` : `희망 단가: 월 ${(p.desired_rate || 0).toLocaleString()}만원`} · 연락처: ${p.phone || '-'}
          </div>
        </div>
      </div>

      <div style="padding:14px 16px; border:1px solid #e2e8f0; border-radius:12px;">
        <div style="font-size:13px; font-weight:600; color:#0f172a; margin-bottom:6px;">전문 도메인 및 핵심 기술 스택</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
          ${(p.domains || []).map(d => `<span class="badge badge-domain">${d}</span>`).join('')}
          ${(p.skills || []).map(s => `<span class="badge badge-skill">${s}</span>`).join('')}
        </div>
        <div style="font-size:13.5px; color:#334155; line-height:1.55;">
          ${p.review_summary || '-'}
        </div>
      </div>

      <div>
        <div style="font-size:13.5px; font-weight:600; color:#0f172a; margin-bottom:8px;">주요 프로젝트 수행 이력 (${careerHistory.length}건)</div>
        <table class="data-table">
          <thead>
            <tr>
              <th>프로젝트명</th>
              <th>고객사</th>
              <th>수행기간</th>
              <th>담당역할</th>
              <th>적용기술</th>
            </tr>
          </thead>
          <tbody>
            ${careerHistory.map(ch => `
              <tr>
                <td style="font-weight:600;">${ch.project}</td>
                <td>${ch.client}</td>
                <td>${ch.period}</td>
                <td>${ch.role}</td>
                <td>${ch.tech}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      ${renderInterviewEvaluationSection(p)}
      ${renderProfileEvaluationSection(p)}
    </div>
  `);
}

function openCandidateResumeModalWithData(inv, prof) {
  const education = prof?.education || inv.education || '컴퓨터공학 학사 졸업';
  const experienceYears = prof?.experience_years || inv.experience_years || 11;
  const certifications = (prof?.certifications && prof.certifications.length > 0)
    ? prof.certifications.join(', ')
    : (Array.isArray(inv.certifications) && inv.certifications.length > 0 ? inv.certifications.join(', ') : '정보처리기사, SQLD');
  const careerHistory = (prof?.career_history && prof.career_history.length > 0)
    ? prof.career_history
    : (Array.isArray(inv.career_history) && inv.career_history.length > 0
      ? inv.career_history
      : [
          { project: `${(inv.domains && inv.domains[0]) || '금융'} 차세대 코어/배치 시스템 구축`, client: '메이저 금융사', period: '2024.03 ~ 2026.10', role: '선임/리드 개발', tech: (inv.skills || []).join(', ') }
        ]);

  const personObj = prof || {
    id: inv.candidate_profile_id,
    name: inv.candidate_name,
    employment_type: inv.candidate_type,
    tech_grade: inv.tech_grade,
    domains: inv.domains || ['퇴직연금'],
    skills: inv.skills || ['Java', 'Oracle'],
    availability_status: '즉시투입가능',
    desired_rate: inv.desired_rate,
    rating: inv.total_score > 0 ? inv.total_score : 0,
    review_summary: inv.interviewer_opinion || inv.resume_summary,
    career_history: careerHistory,
    is_internal: 0,
    resourced_count: 0
  };
  const workedBefore = hasWorkedWithCompany(personObj);
  const hasInterviewRecord = Boolean(inv.id && !String(inv.id).startsWith('synthetic_'));

  openModal(`지원자 상세 프로필 — ${inv.candidate_name} (${inv.tech_grade})`, `
    <div style="display:flex; flex-direction:column; gap:18px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        ${renderProfileIdentityHeader(personObj)}
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="zal-status-pill ${workedBefore ? 'green' : 'gray'}">
            ${workedBefore ? `당사 수행이력 보유 (재소싱 ${personObj.resourced_count || 1}회)` : '신규 지원 (당사 수행이력 없음)'}
          </span>
          <span class="zal-status-pill ${inv.status === '면접진행완료' || inv.status === '최종선정' ? 'green' : 'amber'}">${inv.status}</span>
        </div>
      </div>

      <div class="form-grid" style="margin-bottom:0;">
        <div style="padding:12px 14px; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="font-size:12px; color:#64748b; margin-bottom:4px;">최종 학력 · 보유 자격증 (${experienceYears}년차)</div>
          <div style="font-size:14px; font-weight:600; color:#0f172a;">${education}</div>
          <div style="font-size:12.5px; color:#475569; margin-top:2px;">자격증: ${certifications}</div>
        </div>
        <div style="padding:12px 14px; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="font-size:12px; color:#64748b; margin-bottom:4px;">투입 가용일 · 희망 단가</div>
          <div style="font-size:14px; font-weight:600; color:#059669;">가용일: ${inv.available_from}</div>
          <div style="font-size:12.5px; color:#0f172a; margin-top:2px;">
            희망 단가: ${inv.desired_rate !== null && inv.desired_rate !== undefined ? `월 ${Number(inv.desired_rate).toLocaleString()}만원` : '단가 비공개'} · 경로: ${inv.recommender || '직접지원'}
          </div>
        </div>
      </div>

      <div style="padding:14px 16px; border:1px solid #e2e8f0; border-radius:12px;">
        <div style="font-size:13px; font-weight:600; color:#0f172a; margin-bottom:6px;">전문 도메인 및 핵심 기술 스택</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
          ${(inv.domains || []).map(d => `<span class="badge badge-domain">${d}</span>`).join('')}
          ${(inv.skills || []).map(s => `<span class="badge badge-skill">${s}</span>`).join('')}
        </div>
        <div style="font-size:13.5px; color:#334155; line-height:1.55;">
          ${inv.resume_summary}
        </div>
      </div>

      <div>
        <div style="font-size:13.5px; font-weight:600; color:#0f172a; margin-bottom:8px;">주요 프로젝트 수행 이력 (${careerHistory.length}건)</div>
        <table class="data-table">
          <thead>
            <tr>
              <th>프로젝트명</th>
              <th>고객사</th>
              <th>수행기간</th>
              <th>담당역할</th>
              <th>적용기술</th>
            </tr>
          </thead>
          <tbody>
            ${careerHistory.map(ch => `
              <tr>
                <td style="font-weight:600;">${ch.project}</td>
                <td>${ch.client}</td>
                <td>${ch.period}</td>
                <td>${ch.role}</td>
                <td>${ch.tech}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      ${hasInterviewRecord ? renderInterviewEvaluationSection(personObj, inv) : renderInterviewEvaluationSection(personObj)}
      ${renderProfileEvaluationSection(personObj)}
    </div>
  `);
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
    post_1: ['양동근', '김도현', '이준호'],
    post_2: ['한지민', '박성진'],
    post_3: ['오세훈', '김도윤', '최민수']
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
    status: fb.status || '참여신청 접수 (서류검토중)',
    resume_summary: (prof && canViewSensitive && prof.review_summary) ? prof.review_summary : (fb.resume_summary || `${post.required_domain} 시스템 설계 및 개발 전문 인력.`),
    career_history: prof?.career_history || fb.career_history || []
  };

  openCandidateResumeModalWithData(syntheticInv, prof);
}

function renderInterviewVerticalCard(inv, idx, permissions, currentUser) {
  const skills = Array.isArray(inv.skills) ? inv.skills : ['Java', 'Oracle'];
  const visibleSkills = skills.slice(0, 2);
  const extraSkillCount = Math.max(0, skills.length - 2);
  const isDone = inv.status === '면접진행완료' || inv.status === '최종선정';
  const dateBadgeText = inv.interview_date
    ? `면접 ${inv.interview_date.slice(5)}`
    : '일정조율중';
  const primarySkill = skills[0] || 'Java';
  const primaryDomain = (inv.domains && inv.domains[0]) || '금융SI';

  return `
    <article class="inv-vertical-card">
      <div class="inv-vcard-top">
        <div class="inv-vcard-badges">
          <span class="inv-vbadge-gray">${inv.status}</span>
          <span class="${isDone ? 'inv-vbadge-green' : 'inv-vbadge-red'}">${isDone && inv.total_score > 0 ? `검증 ${inv.total_score}점` : dateBadgeText}</span>
        </div>
        <span class="inv-vcard-heart">${svgIcon('heart', 17)}</span>
      </div>

      <div class="inv-vcard-banner" onclick="openCandidateResumeModal('${inv.id}')" title="클릭하여 지원자 상세 이력서 열람">
        <div class="inv-banner-mark">
          ${svgIcon('user', 17)}
          <span>${inv.candidate_name}</span>
          <span style="font-size:13.5px; font-weight:500; color:#475569;">(${inv.tech_grade})</span>
        </div>
        <div class="inv-banner-sub" style="display:inline-flex; align-items:center; gap:5px;">${svgIcon('calendar', 13)} ${inv.interview_date || '일정 미지정'} · ${inv.interview_method || '화상'}</div>
        <div class="inv-banner-sub">면접관: ${inv.interviewer_name || '조성현 상무'}</div>
      </div>

      <div class="inv-vcard-title">
        [${inv.tech_grade} 개발자/${primarySkill}/${primaryDomain}/${inv.candidate_type}] ${inv.resume_summary}
      </div>

      <div class="inv-vcard-skills">
        ${visibleSkills.map(sk => `<span class="inv-skill-pill">${sk}</span>`).join('')}
        ${extraSkillCount > 0 ? `<span class="inv-skill-more">외 +${extraSkillCount}개</span>` : ''}
      </div>

      <div class="inv-vcard-meta">
        <div class="inv-vcard-meta-row">
          <span>${inv.tech_grade}</span>
          <span style="color:#cbd5e1;">/</span>
          <span style="display:inline-flex; align-items:center; gap:4px;">${svgIcon('pin', 13)} 가용일 ${inv.available_from}</span>
        </div>
        <div class="inv-vcard-meta-row">
          <span style="color:#64748b;">희망 단가</span>
          <strong style="color:#0f172a; font-weight:600;">
            ${inv.desired_rate !== null ? `월 ${Number(inv.desired_rate).toLocaleString()}만원` : `${svgIcon('lock', 13)} 단가비공개`}
          </strong>
        </div>
      </div>

      ${(permissions.can_schedule_interviews || permissions.can_evaluate_interviews || (currentUser && inv.interviewer_user_id === currentUser.id)) ? `
        <div class="inv-vcard-actions">
          ${permissions.can_schedule_interviews ? `
            <button class="btn btn-outline btn-sm" style="flex:1; display:inline-flex; align-items:center; justify-content:center; gap:5px;" onclick="openScheduleInterviewModal('${inv.id}')">${svgIcon('calendar', 14)} 일정·면접관</button>
          ` : ''}
          ${(permissions.can_evaluate_interviews || (currentUser && inv.interviewer_user_id === currentUser.id)) ? (
            isDone ? `
              <button class="btn btn-primary btn-sm" style="flex:1; display:inline-flex; align-items:center; justify-content:center; gap:5px;" onclick="openInterviewResultViewModal('${inv.id}')">${svgIcon('file', 14)} 인터뷰 결과 보기</button>
            ` : `
              <button class="btn btn-primary btn-sm" style="flex:1; display:inline-flex; align-items:center; justify-content:center; gap:5px;" onclick="openEvaluateChecklistModal('${inv.id}')">${svgIcon('check', 14)} 필수질문·평가</button>
            `
          ) : ''}
        </div>
      ` : ''}
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
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
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
              <th style="width:264px; text-align:center;">상태</th>
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
      ${projectPostings.length > 0 ? projectPostings.map(post => `
        <article class="zal-feed-card" style="cursor:pointer;" onclick="openPostingDetailModal('${post.id}')">
          <div class="zal-card-header">
            <div class="zal-author-box">
              <div>
                <span class="zal-author-name">${post.role_name}</span>
                <span class="zal-author-role">${post.required_grade} · ${post.required_domain}</span>
                <div class="zal-card-time">${svgIcon('clock', 12)} 등록 ${post.created_at} | 타겟소싱 ${post.sourcing_sent_count}건</div>
              </div>
            </div>
            <span class="zal-status-pill ${post.status === 'OPEN' ? 'green' : 'gray'}">${post.status === 'OPEN' ? '모집중' : '마감됨'}</span>
          </div>

          <div class="zal-card-title">${post.title}</div>

          <div class="zal-meta-list">
            <div class="zal-meta-row"><span class="zal-meta-label">${svgIcon('calendar', 14)} 기간</span><span class="zal-meta-val">${post.period} (${post.work_location})</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">${svgIcon('dollar', 14)} 단가</span><span class="zal-meta-val">${post.rate_guide}</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">${svgIcon('code', 14)} 스킬</span><span class="zal-meta-val">${post.required_skills.join(', ')}</span></div>
          </div>

          <div class="zal-card-footer">
            <div class="zal-reaction-group" style="flex-wrap:wrap;">
              <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="event.stopPropagation(); copyPostingWebLink('${post.id}')">
                ${svgIcon('link', 13)} 오픈 구인 웹 링크 복사하기
              </button>
              ${post.status === 'OPEN' && currentUser?.role_group !== 'MASTER' ? `
                <button type="button" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="event.stopPropagation(); openEasyApplyModal('${post.id}')">
                  ${svgIcon('edit', 13)} ${currentUser?.role_group === 'INTERNAL' ? '사내 지인 추천' : '간편 지원하기'}
                </button>
              ` : ''}
              ${permissions.can_manage_postings ? `
                <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="event.stopPropagation(); openTargetSourcingModal('${post.id}')">${svgIcon('target', 13)} 타겟 소싱 발송</button>
              ` : ''}
            </div>
          </div>

          <div class="posting-bottom-row">
            ${renderPostingApplicantBox(post)}
            ${permissions.can_manage_postings ? `
              <button type="button" class="btn btn-primary btn-sm" style="margin-left:auto; align-self:flex-end;" onclick="event.stopPropagation(); togglePostingStatus('${post.id}')">${post.status === 'OPEN' ? '채용마감' : '재오픈'}</button>
            ` : ''}
          </div>
        </article>
      `).join('') : `
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
      ${projectInterviews.length > 0 ? projectInterviews.map((inv, idx) => renderInterviewVerticalCard(inv, idx, permissions, currentUser)).join('') : `
        <div class="zal-feed-card" style="grid-column: 1 / -1; text-align:center; color:#64748b; padding:28px;">
          현재 이 프로젝트에 등록된 지원자 인터뷰 내역이 없습니다.
        </div>
      `}
    </div>
  `;
}

function computeMatchScore(profile, slot, projectStartDate) {
  let score = 50;
  const reasons = [];
  if (profile.domains.includes(slot.required_domain)) {
    score += 22;
    reasons.push(`${slot.required_domain} 도메인 일치`);
  }
  const gradeRank = { '특급': 4, '고급': 3, '중급': 2, '초급': 1 };
  if ((gradeRank[profile.tech_grade] || 2) >= (gradeRank[slot.required_grade] || 2)) {
    score += 12;
    reasons.push(`${profile.tech_grade} 기술등급 충족`);
  }
  const reqSkills = slot.required_skills || [];
  const matchedSkills = reqSkills.filter(rs =>
    profile.skills.some(ps => ps.toLowerCase().includes(rs.toLowerCase()))
  );
  if (matchedSkills.length > 0) {
    score += Math.min(10, matchedSkills.length * 4);
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

function openNewProjectModal() {
  openModal('신규 입찰/수행 프로젝트 및 필요 인력(TO) 등록', `
    <form onsubmit="submitNewProject(event)">
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
          <label>카테고리</label>
          <select class="select" name="category">
            <option value="PENSION">PENSION</option>
            <option value="INVESTMENT">INVESTMENT</option>
            <option value="CONSULTING">CONSULTING</option>
          </select>
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
          <label>핵심 금융 도메인</label>
          <select class="select" name="domain">
            <option value="퇴직연금">퇴직연금</option>
            <option value="채권">채권</option>
            <option value="펀드">펀드</option>
            <option value="계정계 코어">계정계 코어</option>
            <option value="마이데이터">마이데이터</option>
          </select>
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
          <textarea class="textarea" name="description" placeholder="프로젝트 추진 배경, 핵심 과업 범위 및 필요 기술 환경을 입력하세요.">대신증권 퇴직연금 및 개인형IRP 비대면 자산관리 경쟁력 강화를 위한 코어 정산·배치 및 모바일 채널 고도화 프로젝트입니다.</textarea>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label>초기 TO #1 역할명</label>
          <input class="input" name="slot1_role" value="퇴직연금 코어 PL" required />
        </div>
        <div class="form-field">
          <label>TO #1 등급</label>
          <select class="select" name="slot1_grade"><option value="특급">특급</option><option value="고급">고급</option></select>
        </div>
        <div class="form-field">
          <label>초기 TO #2 역할명</label>
          <input class="input" name="slot2_role" value="연금 정산/배치 개발" required />
        </div>
        <div class="form-field">
          <label>TO #2 등급</label>
          <select class="select" name="slot2_grade"><option value="고급">고급</option><option value="중급">중급</option></select>
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
  const fd = new FormData(e.target);
  const domain = fd.get('domain');
  const project_group = fd.get('project_group') || 'PLANNED';
  const category = fd.get('category') || 'PENSION';
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
    to_slots: [
      { role_name: fd.get('slot1_role'), required_grade: fd.get('slot1_grade'), required_domain: domain, required_skills: ['Java', 'Spring Boot', 'Oracle'] },
      { role_name: fd.get('slot2_role'), required_grade: fd.get('slot2_grade'), required_domain: domain, required_skills: ['Java', 'Spring Batch', 'SQL튜닝'] }
    ]
  });
  closeModal();
  showToast('신규 프로젝트 및 TO가 등록되었습니다.');
  await loadState();
}

/* =========================================================================
   TAB 4: EXTERNAL JOB BOARD & TARGET SOURCING
   ========================================================================= */
function renderSourcingTab() {
  const { postings, permissions, currentUser } = state.data;
  const el = document.getElementById('tab-sourcing');

  el.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
      <h3 style="font-size:17px; font-weight:600; display:inline-flex; align-items:center; gap:7px;">오픈 구인 포지션 (${postings.length}건)</h3>
    </div>

    <div class="dashboard-feed-masonry">
      ${postings.map(post => `
        <article class="zal-feed-card" style="cursor:pointer;" onclick="openPostingDetailModal('${post.id}')">
          <div class="zal-card-header">
            <div class="zal-author-box">
              <div>
                <span class="zal-author-name">${post.role_name}</span>
                <span class="zal-author-role">${post.required_grade} · ${post.required_domain}</span>
                <div class="zal-card-time">${svgIcon('clock', 12)} 등록 ${post.created_at} | 타겟소싱 ${post.sourcing_sent_count}건</div>
              </div>
            </div>
            <span class="zal-status-pill ${post.status === 'OPEN' ? 'green' : 'gray'}">${post.status === 'OPEN' ? '모집중' : '마감됨'}</span>
          </div>

          <div class="zal-card-title">${post.title}</div>

          <div class="zal-meta-list">
            <div class="zal-meta-row"><span class="zal-meta-label">${svgIcon('calendar', 14)} 기간</span><span class="zal-meta-val">${post.period} (${post.work_location})</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">${svgIcon('dollar', 14)} 단가</span><span class="zal-meta-val">${post.rate_guide}</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">${svgIcon('code', 14)} 스킬</span><span class="zal-meta-val">${post.required_skills.join(', ')}</span></div>
          </div>

          <div class="zal-card-footer">
            <div class="zal-reaction-group" style="flex-wrap:wrap;">
              <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="event.stopPropagation(); copyPostingWebLink('${post.id}')">
                ${svgIcon('link', 13)} 오픈 구인 웹 링크 복사하기
              </button>
              ${post.status === 'OPEN' && currentUser?.role_group !== 'MASTER' ? `
                <button type="button" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="event.stopPropagation(); openEasyApplyModal('${post.id}')">
                  ${svgIcon('edit', 13)} ${currentUser?.role_group === 'INTERNAL' ? '사내 지인 추천' : '간편 지원하기'}
                </button>
              ` : ''}
              ${permissions.can_manage_postings ? `
                <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="event.stopPropagation(); openTargetSourcingModal('${post.id}')">${svgIcon('target', 13)} 타겟 소싱 발송</button>
              ` : ''}
            </div>
          </div>

          <div class="posting-bottom-row">
            ${renderPostingApplicantBox(post)}
            ${permissions.can_manage_postings ? `
              <button type="button" class="btn btn-primary btn-sm" style="margin-left:auto; align-self:flex-end;" onclick="event.stopPropagation(); togglePostingStatus('${post.id}')">${post.status === 'OPEN' ? '채용마감' : '재오픈'}</button>
            ` : ''}
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function copyPostingWebLink(postingId) {
  const post = (state.data?.postings || []).find(p => p.id === postingId);
  const shareUrl = `${window.location.origin}/?posting=${encodeURIComponent(postingId)}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
  }
  showToast(`오픈 구인 웹 링크가 클립보드에 복사되었습니다! (${post ? post.role_name : postingId})`);
}

function openPostingDetailModal(postingId) {
  const { postings, projects, permissions, currentUser } = state.data;
  const post = (postings || []).find(p => p.id === postingId);
  if (!post) return;
  const prj = (projects || []).find(p => p.id === post.project_id);

  openModal(`오픈 구인 포지션 상세 공고 — ${post.role_name}`, `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:14px; flex-wrap:wrap; padding:16px 18px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px;">
        <div style="flex:1; min-width:240px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <span class="zal-status-pill ${post.status === 'OPEN' ? 'green' : 'gray'}">${post.status === 'OPEN' ? '모집중' : '마감됨'}</span>
            <span class="zal-status-pill blue">${post.required_domain}</span>
            <span class="badge badge-grade">${post.required_grade}</span>
          </div>
          <div style="font-size:18px; font-weight:600; color:#0f172a; line-height:1.4;">${post.title}</div>
          <div style="font-size:13px; color:#64748b; margin-top:6px;">
            등록일: ${post.created_at} · 타겟 소싱 발송: ${post.sourcing_sent_count}건
          </div>
        </div>
        ${renderPostingApplicantBox(post)}
      </div>

      <div class="form-grid" style="margin-bottom:0;">
        <div style="padding:12px 14px; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="font-size:12px; color:#64748b; margin-bottom:4px;">수행 기간 · 근무지</div>
          <div style="font-size:14px; font-weight:600; color:#0f172a;">${post.period}</div>
          <div style="font-size:13px; color:#475569; margin-top:2px;">근무지: ${post.work_location}</div>
        </div>
        <div style="padding:12px 14px; border:1px solid #e2e8f0; border-radius:12px;">
          <div style="font-size:12px; color:#64748b; margin-bottom:4px;">단가 가이드 · 계약 형태</div>
          <div style="font-size:14px; font-weight:600; color:#2563eb;">${post.rate_guide}</div>
          <div style="font-size:13px; color:#475569; margin-top:2px;">발주 고객사: ${prj ? prj.client : '금융권 고객사'} (${prj?.contract_type || '일괄도급'})</div>
        </div>
      </div>

      <div style="padding:14px 16px; border:1px solid #e2e8f0; border-radius:12px;">
        <div style="font-size:13.5px; font-weight:600; color:#0f172a; margin-bottom:8px;">요구 기술 스택 및 자격 요건</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
          ${(post.required_skills || []).map(sk => `<span class="badge badge-skill">${sk}</span>`).join('')}
        </div>
        <ul style="margin:0; padding-left:18px; font-size:13.5px; color:#334155; line-height:1.65;">
          <li><strong>담당 역할:</strong> ${post.role_name} (${post.required_grade} 기술자)</li>
          <li><strong>필수 도메인 경험:</strong> ${post.required_domain} 시스템 설계·개발 및 운영/고도화 실무 유경험자</li>
          <li><strong>핵심 수행 과업:</strong> ${prj?.description || `${post.required_domain} 핵심 코어 모듈 설계, 대용량 데이터 처리 및 대외 인터페이스 개발`}</li>
        </ul>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding-top:8px; border-top:1px solid #f1f5f9;">
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="copyPostingWebLink('${post.id}')">
            ${svgIcon('link', 13)} 오픈 구인 웹 링크 복사하기
          </button>
          ${post.status === 'OPEN' && currentUser?.role_group !== 'MASTER' ? `
            <button type="button" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openEasyApplyModal('${post.id}')">
              ${svgIcon('edit', 13)} ${currentUser?.role_group === 'INTERNAL' ? '사내 지인 추천' : '간편 지원하기'}
            </button>
          ` : ''}
          ${permissions.can_manage_postings ? `
            <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openTargetSourcingModal('${post.id}')">
              ${svgIcon('target', 13)} 타겟 소싱 발송
            </button>
          ` : ''}
        </div>
        ${permissions.can_manage_postings ? `
          <button type="button" class="btn btn-primary btn-sm" style="margin-left:auto;" onclick="togglePostingStatus('${post.id}', true)">
            ${post.status === 'OPEN' ? '채용마감' : '재오픈'}
          </button>
        ` : ''}
      </div>
    </div>
  `);
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
  const matchingPool = profiles.filter(p => !p.is_internal);

  openModal(`인재 풀 타겟 소싱 메일·알림 발송 — ${post.role_name}`, `
    <form onsubmit="submitTargetSourcing(event, '${post.id}')">
      <div style="margin-bottom:14px;">
        <label style="font-size:12px; font-weight:700; display:block; margin-bottom:6px;">타겟 소싱 발송 대상 선택 (${matchingPool.length}명)</label>
        <div style="display:flex; flex-direction:column; gap:8px; max-height:200px; overflow-y:auto; border:1px solid #e2e8f0; padding:12px; border-radius:12px;">
          ${matchingPool.map(p => `
            <label style="display:flex; align-items:center; justify-content:space-between; font-size:12.5px; cursor:pointer;">
              <span>
                <input type="checkbox" name="candidate_id" value="${p.id}" checked />
                <strong>${p.name}</strong> (${p.tech_grade} · 가용일 ${p.available_date})
              </span>
              <span style="color:#64748b;">${p.email}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <div class="form-field" style="margin-bottom:14px;">
        <label>소싱 초청 안내 메시지</label>
        <textarea class="textarea" name="custom_message">[잘될 플랫폼 소싱 안내] '${post.title}' 포지션에 귀하의 ${post.required_domain} 수행 경험이 부합하여 우선 초청드립니다.</textarea>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:5px;">${svgIcon('send', 14)} 일괄 발송</button>
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
            <option value="외주 프리랜서">외주 프리랜서</option>
            <option value="외주 반프리">외주 반프리</option>
            <option value="외주 개인사업자">외주 개인사업자</option>
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
  showToast('지원이 접수되었습니다! 프로젝트 인터뷰 목록에 즉시 반영되었습니다.');
  await loadState();
}

/* =========================================================================
   TAB 5: STANDARD INTERVIEW & MANDATORY CHECKLIST VERIFICATION
   ========================================================================= */
function renderInterviewsTab() {
  const { interviews, templates, permissions, currentUser } = state.data;
  const el = document.getElementById('tab-interviews');

  el.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
      <h3 style="font-size:17px; font-weight:600; display:inline-flex; align-items:center; gap:7px;">지원자 인터뷰</h3>
      ${permissions.can_evaluate_interviews || permissions.can_schedule_interviews ? `
        <button class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openQuestionTemplatesModal()">${svgIcon('file', 14)} 직무별 필수 질문 리스트(${templates.length}종) 관리</button>
      ` : ''}
    </div>

    <div class="inv-vertical-grid">
      ${interviews.map((inv, idx) => renderInterviewVerticalCard(inv, idx, permissions, currentUser)).join('')}
    </div>
  `;
}

function openScheduleInterviewModal(interviewId) {
  const { interviews, users, templates } = state.data;
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const internalInterviewers = users.filter(u => u.role_group !== 'EXTERNAL');

  openModal(`면접 일정 통보 및 사내 면접관 배정 — ${inv.candidate_name}`, `
    <form onsubmit="submitScheduleInterview(event, '${inv.id}')">
      <div class="form-grid">
        <div class="form-field">
          <label>면접 일시</label>
          <input class="input" name="interview_date" value="${inv.interview_date || '2026-11-19 15:00'}" required />
        </div>
        <div class="form-field">
          <label>면접 방식</label>
          <select class="select" name="interview_method">
            <option value="화상(Zoom/Teams)">화상(Zoom/Teams)</option>
            <option value="대면(본사 회의실)">대면(본사 회의실)</option>
          </select>
        </div>
        <div class="form-field">
          <label>내부 면접관 지정 (지정 시 지원자 열람·평가 권한 자동 ON)</label>
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
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">일정 통보 및 면접관 배정</button>
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
    template_id: fd.get('template_id')
  });
  closeModal();
  showToast('면접 일정 통보 및 내부 면접관 권한 자동 부여가 완료되었습니다.');
  await loadState();
}

function openInterviewResultViewModal(interviewId) {
  const { interviews, templates, projects, postings, permissions, currentUser } = state.data;
  const inv = (interviews || []).find(i => i.id === interviewId);
  if (!inv) return;
  const tpl = (templates || []).find(t => t.id === inv.template_id) || templates?.[0];
  const prj = (projects || []).find(p => p.id === inv.project_id);
  const post = (postings || []).find(p => p.id === inv.posting_id);
  const results = Array.isArray(inv.checklist_results) ? inv.checklist_results : [];
  const scoreVal = Number(inv.total_score || 0);
  const canEdit = Boolean(permissions?.can_evaluate_interviews || (currentUser && inv.interviewer_user_id === currentUser.id));

  openModal(`인터뷰 결과 보기 — ${inv.candidate_name} (${inv.tech_grade})`, `
    <div style="display:flex; flex-direction:column; gap:18px;">
      <!-- 상단 인터뷰 요약 헤더 -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:14px; flex-wrap:wrap; padding:18px 20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px;">
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span class="zal-status-pill green">${inv.status}</span>
            <span class="zal-status-pill blue">${tpl ? tpl.category : '기술·성향 검증'}</span>
            <span class="badge badge-grade">${inv.tech_grade}</span>
          </div>
          <div style="font-size:18px; font-weight:700; color:#0f172a; margin-top:2px;">
            ${inv.candidate_name} <span style="font-size:14px; font-weight:500; color:#475569;">(${inv.candidate_type} · 가용일 ${inv.available_from})</span>
          </div>
          <div style="font-size:13px; color:#64748b;">
            지원 프로젝트: <strong style="color:#334155;">${prj ? prj.name : '미래에셋증권 퇴직연금 차세대'}</strong>
            ${post ? ` · 포지션: <strong style="color:#334155;">${post.role_name}</strong>` : ''}
          </div>
          <div style="font-size:13px; color:#64748b;">
            면접 일시: <strong style="color:#334155;">${inv.interview_date || '2026-11-13'}</strong> (${inv.interview_method || '화상'}) · 담당 면접관: <strong style="color:#334155;">${inv.interviewer_name || '조성현 상무'}</strong>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px; background:#ffffff; border:1px solid #e2e8f0; padding:12px 16px; border-radius:12px; min-width:160px;">
          <span style="font-size:12px; color:#64748b; font-weight:600;">종합 검증 점수</span>
          <div style="display:flex; align-items:center; gap:8px;">
            ${renderStarIcons(scoreVal)}
            <strong style="font-size:20px; font-weight:700; color:#0f172a;">${scoreVal.toFixed(2)}</strong>
            <span style="font-size:12.5px; color:#94a3b8;">/ 5.0</span>
          </div>
        </div>
      </div>

      <!-- 필수 검증 질문별 평가 결과 내역 -->
      <div>
        <div style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:8px;">
          필수 질문별 검증 내역 (직무역량 & 성향·태도 — 총 ${results.length}문항)
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:54%;">검증 질문 항목</th>
              <th style="width:24%;">면접관 확인 메모</th>
              <th style="width:22%;">평가 점수</th>
            </tr>
          </thead>
          <tbody>
            ${results.map((item, idx) => {
              const tplQ = tpl?.questions?.[idx];
              const qType = tplQ?.type || (idx >= 2 ? '성향·태도' : '직무역량');
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
                      <strong style="font-size:13.5px; color:#0f172a; min-width:36px; text-align:right;">${Number(item.score || 4.5).toFixed(1)}점</strong>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- 면접관 종합 평가 의견 -->
      <div style="padding:16px 18px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong style="font-size:13.5px; color:#0f172a;">면접관 종합 평가 의견</strong>
          <span style="font-size:12px; color:#94a3b8;">작성자: ${inv.interviewer_name || '조성현 상무'}</span>
        </div>
        <div style="font-size:14px; color:#334155; line-height:1.6;">
          ${inv.interviewer_opinion || '직무 역량 및 협업 태도 검증 완료.'}
        </div>
      </div>

      <!-- 하단 액션 영역: 상세 프로필 보기 & 수정하기 -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding-top:8px; border-top:1px solid #f1f5f9;">
        <button type="button" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openCandidateResumeModal('${inv.id}')">
          ${svgIcon('user', 13)} 지원자 상세 프로필 보기
        </button>
        ${canEdit ? `
          <button type="button" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px; margin-left:auto;" onclick="openEvaluateChecklistModal('${inv.id}', true)">
            ${svgIcon('edit', 13)} 인터뷰 결과 수정하기
          </button>
        ` : ''}
      </div>
    </div>
  `);
}

function openEvaluateChecklistModal(interviewId, fromViewModal = false) {
  const { interviews, templates } = state.data;
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const tpl = templates.find(t => t.id === inv.template_id) || templates[0];
  const existingResults = inv.checklist_results || [];
  const isEditingExisting = existingResults.length > 0;

  openModal(`${isEditingExisting ? '인터뷰 결과 수정' : '필수 질문 체크리스트 평가'} (직무역량 · 성향/협업) — ${inv.candidate_name}`, `
    <form onsubmit="submitInterviewEvaluation(event, '${inv.id}', ${Boolean(fromViewModal)})">
      <table class="data-table" style="margin-bottom:16px;">
        <thead>
          <tr>
            <th style="width:50%;">필수 검증 질문 (직무역량 & 성향·태도)</th>
            <th style="width:22%;">평가 기준</th>
            <th style="width:13%;">점수</th>
            <th style="width:15%;">확인 메모</th>
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
                      <span style="display:inline-block; font-size:11.5px; font-weight:600; padding:1px 7px; border-radius:6px; margin-right:5px; ${badgeStyle}">${q.type || '직무역량'}</span>
                      Q${idx + 1}. ${q.question}
                    </span>
                  </label>
                  <input type="hidden" name="q_text_${idx}" value="${prev.question || q.question}" />
                </td>
                <td style="font-size:12.5px; color:#64748b;">${q.criteria}</td>
                <td>
                  <select class="select" name="q_score_${idx}" style="width:100%;">
                    ${[5, 4.5, 4, 3.5, 3].map(sc => `<option value="${sc}" ${(prev.score || 4.5) === sc ? 'selected' : ''}>${sc}점</option>`).join('')}
                  </select>
                </td>
                <td>
                  <input class="input" name="q_note_${idx}" style="width:100%;" value="${prev.note || (isPersonality ? '협업·태도 우수' : '검증 완료')}" />
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <input type="hidden" name="question_count" value="${tpl.questions.length}" />

      <div class="form-grid">
        <div class="form-field" style="grid-column: span 2;">
          <label>면접관 종합 평가 의견 (인력 DB 평점·총평과 자동 연동)</label>
          <textarea class="textarea" name="interviewer_opinion" required>${inv.interviewer_opinion || `${tpl.domain_focus} 도메인 핵심 설계 및 대용량 처리 실무 검증 완료. 즉시 투입 적임자로 추천함.`}</textarea>
        </div>
        <div class="form-field">
          <label>최종 선발 확정 (최종선정 시 프로젝트 TO 자동배정)</label>
          <select class="select" name="final_status">
            <option value="최종선정" ${inv.status === '최종선정' ? 'selected' : ''}>최종선정 (DB 평점 연동 + 프로젝트 TO 자동배정)</option>
            <option value="면접진행완료" ${inv.status === '면접진행완료' ? 'selected' : ''}>면접진행완료 (임원 승인 대기)</option>
            <option value="보류" ${inv.status === '보류' ? 'selected' : ''}>보류</option>
            <option value="탈락" ${inv.status === '탈락' ? 'selected' : ''}>탈락</option>
          </select>
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="${fromViewModal ? `openInterviewResultViewModal('${inv.id}')` : 'closeModal()'}">${fromViewModal ? '← 결과 보기로 돌아가기' : '취소'}</button>
        <button type="submit" class="btn btn-primary">${isEditingExisting ? '수정 내용 저장' : '평가 저장 및 DB 자동 연동'}</button>
      </div>
    </form>
  `);
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
  const finalStatus = fd.get('final_status');
  const res = await apiCall('/api/interviews/evaluate', 'POST', {
    interview_id: interviewId,
    checklist_results,
    interviewer_opinion: fd.get('interviewer_opinion'),
    final_status: finalStatus
  });
  showToast(
    finalStatus === '최종선정'
      ? `🎉 최종선정 완료! 인력 DB 평점(${res.avgScore}점) 반영 및 프로젝트 TO 자동 배정이 완료되었습니다.`
      : `면접 평가(${res.avgScore}점)가 저장 및 인력 DB에 연동되었습니다.`
  );
  await loadState();
  if (returnToViewModal) {
    openInterviewResultViewModal(interviewId);
  } else {
    closeModal();
  }
}

function openQuestionTemplatesModal() {
  const { templates } = state.data;
  openModal('직무역량 및 성향·태도 표준 필수 질문 리스트 관리', `
    <div style="display:flex; flex-direction:column; gap:12px;">
      ${templates.map(t => `
        <div style="border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
          <div style="font-weight:600; margin-bottom:8px;">[${t.domain_focus}] ${t.role_type}</div>
          <ol style="padding-left:18px; font-size:13.5px; color:#334155; display:flex; flex-direction:column; gap:6px; margin:0;">
            ${t.questions.map(q => {
              const isPersonality = q.type && q.type.startsWith('성향');
              const badgeStyle = isPersonality
                ? 'background:#f3e8ff; color:#7e22ce; border:1px solid #e9d5ff;'
                : 'background:#eff6ff; color:#2563eb; border:1px solid #dbeafe;';
              return `<li><span style="display:inline-block; font-size:11.5px; font-weight:600; padding:1px 7px; border-radius:6px; margin-right:5px; ${badgeStyle}">${q.type || '직무역량'}</span>${q.question} <span style="font-size:12px; color:#94a3b8;">(${q.criteria})</span></li>`;
            }).join('')}
          </ol>
        </div>
      `).join('')}
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

  // Initialize browser History API state so Back button returns to previous view inside SPA
  const urlParams = new URLSearchParams(window.location.search);
  const initialProjectId = urlParams.get('project') || null;
  const initialTab = urlParams.get('tab') || (initialProjectId ? 'projects' : 'dashboard');
  state.activeTab = initialTab;
  state.selectedProjectId = initialProjectId;
  applyTabDomState(state.activeTab);

  if (initialProjectId) {
    // Ensure a base list entry exists below the detail entry even on direct reload
    window.history.replaceState(
      { tab: 'projects', projectId: null },
      '',
      buildNavigationUrl('projects', null)
    );
    window.history.pushState(
      { tab: 'projects', projectId: initialProjectId },
      '',
      buildNavigationUrl('projects', initialProjectId)
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
    } else {
      const params = new URLSearchParams(window.location.search);
      const prjParam = params.get('project') || null;
      state.activeTab = params.get('tab') || (prjParam ? 'projects' : 'dashboard');
      state.selectedProjectId = prjParam;
    }
    applyTabDomState(state.activeTab);
    renderActiveTab();
  });

  loadState();
});
