// ZAL : 잘될 (ZAL-WILL) — ZAL Universe Look & Feel Frontend
const state = {
  userId: 'u_master',
  activeTab: 'projects',
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

  // Render Subtle Permission Summary Pills on Sticky Tab Bar
  const strip = document.getElementById('permissionStrip');
  const p = permissions;
  const chip = (label, statusType, statusText) =>
    `<span class="perm-chip ${statusType}">${label}: ${statusText}</span>`;

  strip.innerHTML = `
    ${chip('전체프로필', p.can_view_all_profiles ? (p.role_group === 'INTERNAL' ? 'selective' : 'allowed') : 'denied', p.can_view_all_profiles ? 'ON' : '본인한정')}
    ${chip('제안·장표', p.can_extract_proposal ? (p.role_group === 'INTERNAL' ? 'selective' : 'allowed') : 'denied', p.can_extract_proposal ? 'ON' : '불가')}
    ${chip('면접평가', p.can_evaluate_interviews ? (p.role_group === 'INTERNAL' ? 'selective' : 'allowed') : 'denied', p.can_evaluate_interviews ? 'ON' : '불가')}
    ${chip('단가·평점', p.can_view_sensitive_info ? 'allowed' : 'denied', p.can_view_sensitive_info ? '열람허용' : '🔒비공개')}
  `;
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

function switchTab(tabName) {
  if (tabName === 'projects') {
    state.selectedProjectId = null;
  }
  state.activeTab = tabName;
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.rail-btn[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
  });
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
   TAB 1: DASHBOARD (2-Column Feed Masonry + Right Timeline Sidebar like 잘됨)
   ========================================================================= */
function renderDashboardTab() {
  const { kpis, projects, interviews, postings, profiles } = state.data;
  const el = document.getElementById('tab-dashboard');

  const filteredProjects = state.selectedProjectFilter === 'ALL'
    ? projects
    : projects.filter(p => p.id === state.selectedProjectFilter);

  // Build Feed Cards in the exact visual style of 잘됨
  const feedCardsHtml = [];

  // 1. Project RFP & TO Cards
  filteredProjects.forEach(prj => {
    const totalSlots = prj.to_slots.length;
    const filledSlots = prj.to_slots.filter(s => s.assigned_profile_id).length;
    const unfilledCount = totalSlots - filledSlots;

    feedCardsHtml.push(`
      <article class="zal-feed-card">
        <div class="zal-card-header">
          <div class="zal-author-box">
            <div class="zal-avatar-circle">
              <img src="/pic1_thumb.png" alt="PM" />
            </div>
            <div>
              <div>
                <span class="zal-author-name">김지영</span>
                <span class="zal-author-role">제안PM · ${prj.domain}</span>
              </div>
              <div class="zal-card-time">
                <span>🕒 ${prj.created_at}</span>
                <span>|</span>
                <span>충원 ${filledSlots}/${totalSlots}명 ↗</span>
              </div>
            </div>
          </div>
          <span class="zal-status-pill blue">💼 ${prj.status}</span>
        </div>

        <div class="zal-card-title">📋 ${prj.name}</div>

        <div class="zal-meta-list">
          <div class="zal-meta-row">
            <span class="zal-meta-label">🏢 발주처</span>
            <span class="zal-meta-val">${prj.client} (${prj.location})</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">📅 기간</span>
            <span class="zal-meta-val">${prj.start_date} ~ ${prj.end_date}</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">👥 배정현황</span>
            <span class="zal-meta-val">${prj.to_slots.map(s => s.assigned_name ? s.assigned_name.split(' ')[0] : '미충원').join(', ')}</span>
          </div>
        </div>

        ${unfilledCount > 0 ? `
          <div class="zal-request-banner">
            <span>⏳ 미충원 TO ${unfilledCount}건 (사내외 적임자 매칭 및 구인 진행중)</span>
            <button type="button" class="btn btn-sm btn-outline" style="border-color:#fca5a5; color:#dc2626;" onclick="selectProjectDetail('${prj.id}')">적임자 매칭</button>
          </div>
        ` : ''}

        <div class="zal-card-footer">
          <div class="zal-reaction-group">
            <button type="button" class="zal-reaction-pill" onclick="openProposalSheetModal('${prj.id}')">📑 장표추출</button>
            <button type="button" class="zal-reaction-pill" onclick="selectProjectDetail('${prj.id}')">🔍 TO관리 (${totalSlots})</button>
            <button type="button" class="zal-reaction-pill" onclick="showToast('🔗 프로젝트 공유 링크가 복사되었습니다!')">🔗 공유</button>
          </div>
          <span style="font-size:12px; color:#94a3b8; font-weight:600;">댓글 ${totalSlots}</span>
        </div>
      </article>
    `);
  });

  // 2. Interview & Checklist Verification Feed Cards
  interviews.forEach(inv => {
    const isCompleted = inv.status === '면접진행완료' || inv.status === '최종선정';
    feedCardsHtml.push(`
      <article class="zal-feed-card">
        <div class="zal-card-header">
          <div class="zal-author-box">
            <div class="zal-avatar-circle">
              <img src="/pic2_thumb.png" alt="면접관" />
            </div>
            <div>
              <div>
                <span class="zal-author-name">${inv.interviewer_name || '정윤희 부장'}</span>
                <span class="zal-author-role">기술면접관</span>
              </div>
              <div class="zal-card-time">
                <span>🕒 ${inv.created_at}</span>
                <span>|</span>
                <span>${inv.candidate_type} ↗</span>
              </div>
            </div>
          </div>
          <span class="zal-status-pill ${isCompleted ? 'green' : 'amber'}">
            ${isCompleted ? '✅ 검증완료' : '🤝 면접예정'}
          </span>
        </div>

        <div class="zal-card-title">🎤 [${inv.domains.join('/')}] ${inv.candidate_name} (${inv.tech_grade}) 기술검증 인터뷰</div>

        <div class="zal-meta-list">
          <div class="zal-meta-row">
            <span class="zal-meta-label">👤 지원자</span>
            <span class="zal-meta-val">${inv.candidate_name} (${inv.tech_grade} · 가용일 ${inv.available_from})</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">📅 면접일시</span>
            <span class="zal-meta-val">${inv.interview_date || '일정 조율중'} (${inv.interview_method || '화상'})</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">🛠️ 핵심스킬</span>
            <span class="zal-meta-val">${inv.skills.join(', ')}</span>
          </div>
        </div>

        ${inv.status === '면접진행완료' ? `
          <div class="zal-request-banner">
            <span>⏳ 필수질문 평점 ${inv.total_score}점 완료 (임원/PM 최종선발 확정 대기)</span>
            <button type="button" class="btn btn-sm btn-outline" style="border-color:#fca5a5; color:#dc2626;" onclick="openEvaluateChecklistModal('${inv.id}')">최종확정</button>
          </div>
        ` : inv.status === '인터뷰통보완료' ? `
          <div class="zal-request-banner">
            <span>⏳ 필수 질문 리스트 기반 기술 면접 대기중</span>
            <button type="button" class="btn btn-sm btn-outline" onclick="openEvaluateChecklistModal('${inv.id}')">면접평가 입력</button>
          </div>
        ` : ''}

        <div class="zal-card-footer">
          <div class="zal-reaction-group">
            <button type="button" class="zal-reaction-pill" onclick="openEvaluateChecklistModal('${inv.id}')">👍 평가점수 ${inv.total_score || '-'}</button>
            <button type="button" class="zal-reaction-pill" onclick="openScheduleInterviewModal('${inv.id}')">🗓️ 일정조율</button>
          </div>
          <span style="font-size:12px; color:#94a3b8; font-weight:600;">필수질문 체크리스트</span>
        </div>
      </article>
    `);
  });

  // 3. Featured Verified Talent & Open Sourcing Feed Cards
  postings.slice(0, 2).forEach(post => {
    feedCardsHtml.push(`
      <article class="zal-feed-card">
        <div class="zal-card-header">
          <div class="zal-author-box">
            <div class="zal-avatar-circle">
              <img src="/pic1_thumb.png" alt="소싱" />
            </div>
            <div>
              <div>
                <span class="zal-author-name">소싱관리팀</span>
                <span class="zal-author-role">외주 구인·타겟소싱</span>
              </div>
              <div class="zal-card-time">
                <span>🕒 ${post.created_at}</span>
                <span>|</span>
                <span>타겟알림 ${post.sourcing_sent_count}건 ↗</span>
              </div>
            </div>
          </div>
          <span class="zal-status-pill ${post.status === 'OPEN' ? 'purple' : 'gray'}">
            ${post.status === 'OPEN' ? '📢 구인오픈' : '마감됨'}
          </span>
        </div>

        <div class="zal-card-title">${post.title}</div>

        <div class="zal-meta-list">
          <div class="zal-meta-row">
            <span class="zal-meta-label">👤 요구등급</span>
            <span class="zal-meta-val">${post.required_grade} (${post.required_domain} 도메인)</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">📅 수행기간</span>
            <span class="zal-meta-val">${post.period} (${post.work_location})</span>
          </div>
          <div class="zal-meta-row">
            <span class="zal-meta-label">💰 단가가이드</span>
            <span class="zal-meta-val">${post.rate_guide}</span>
          </div>
        </div>

        <div class="zal-card-footer">
          <div class="zal-reaction-group">
            <button type="button" class="zal-reaction-pill" onclick="openEasyApplyModal('${post.id}')">✍️ 간편지원·추천</button>
            <button type="button" class="zal-reaction-pill" onclick="openTargetSourcingModal('${post.id}')">🎯 타겟소싱 (${post.sourcing_sent_count})</button>
          </div>
          <span style="font-size:12px; color:#94a3b8; font-weight:600;">통합 DB 연동</span>
        </div>
      </article>
    `);
  });

  el.innerHTML = `
    <div class="dashboard-layout-container">
      <!-- LEFT: 2-Column Masonry Cards -->
      <section class="dashboard-feed-masonry">
        ${feedCardsHtml.join('')}
      </section>

      <!-- RIGHT: Timeline & KPI Sidebar (Exact visual match to 잘됨 타임라인) -->
      <aside class="zal-timeline-sidebar">
        <div class="zal-timeline-header">
          <span class="zal-timeline-title">타임라인 · 핵심지표</span>
          <button type="button" class="zal-timeline-link" onclick="switchTab('profiles')">총 ${profiles.length}명 인재 DB 등록됨 ›</button>
        </div>

        <!-- Mini 2x2 KPI Summary inside Right Sidebar -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          <div style="padding:10px 12px; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="font-size:11px; color:#64748b; font-weight:600;">사내 기술인력 DB화</div>
            <div style="font-size:18px; font-weight:600; color:#0f172a;">${kpis.internal_db_rate}% <span style="font-size:11px; color:#059669;">달성</span></div>
          </div>
          <div style="padding:10px 12px; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="font-size:11px; color:#64748b; font-weight:600;">AI 파싱·검수 시간</div>
            <div style="font-size:18px; font-weight:600; color:#0f172a;">${kpis.avg_parse_seconds}초 <span style="font-size:11px; color:#2563eb;">&lt;2분</span></div>
          </div>
          <div style="padding:10px 12px; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="font-size:11px; color:#64748b; font-weight:600;">제안서 장표 추출</div>
            <div style="font-size:18px; font-weight:600; color:#0f172a;">${kpis.proposal_extract_minutes}분 <span style="font-size:11px; color:#6366f1;">원클릭</span></div>
          </div>
          <div style="padding:10px 12px; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="font-size:11px; color:#64748b; font-weight:600;">기검증 재소싱률</div>
            <div style="font-size:18px; font-weight:600; color:#0f172a;">${kpis.resourcing_rate}% <span style="font-size:11px; color:#d97706;">우수풀</span></div>
          </div>
        </div>

        <!-- Schedule & Pipeline Grid (Identical to 잘됨 타임라인 table) -->
        <table class="zal-timeline-grid">
          <thead>
            <tr>
              <th style="width:44px; color:#94a3b8; font-weight:600;">시간</th>
              <th>
                <div style="display:flex; flex-direction:column; align-items:center; gap:3px;">
                  <img src="/pic1_thumb.png" style="width:28px; height:28px; border-radius:50%; border:1px solid #e2e8f0;" />
                  <span style="font-size:11.5px; font-weight:600; color:#0f172a;">김지영 <span style="font-weight:500; color:#64748b;">이사</span></span>
                </div>
              </th>
              <th>
                <div style="display:flex; flex-direction:column; align-items:center; gap:3px;">
                  <img src="/pic2_thumb.png" style="width:28px; height:28px; border-radius:50%; border:1px solid #e2e8f0;" />
                  <span style="font-size:11.5px; font-weight:600; color:#0f172a;">정윤희 <span style="font-weight:500; color:#64748b;">부장</span></span>
                </div>
              </th>
              <th>
                <div style="display:flex; flex-direction:column; align-items:center; gap:3px;">
                  <img src="/pic1_thumb.png" style="width:28px; height:28px; border-radius:50%; border:1px solid #e2e8f0;" />
                  <span style="font-size:11.5px; font-weight:600; color:#0f172a;">신은숙 <span style="font-weight:500; color:#64748b;">외주</span></span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="color:#64748b; font-weight:600;">09:00</td>
              <td>
                <div class="zal-timeline-event" onclick="triggerSampleParse('sample1')" style="cursor:pointer;">
                  AI 이력서 파싱<br/><span style="font-weight:500; opacity:0.85;">09:00~10:00</span>
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td style="color:#64748b; font-weight:600;">10:00</td>
              <td></td>
              <td>
                <div class="zal-timeline-event green" onclick="switchTab('interviews')" style="cursor:pointer;">
                  한지민 기술면접<br/><span style="font-weight:500; opacity:0.85;">10:00~11:00</span>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td style="color:#64748b; font-weight:600;">12:00</td>
              <td>
                <div class="zal-timeline-event purple">
                  점심시간<br/><span style="font-weight:500; opacity:0.85;">12:00~13:00</span>
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td style="color:#64748b; font-weight:600;">14:00</td>
              <td>
                <div class="zal-timeline-event purple" onclick="openProposalSheetModal('prj_1')" style="cursor:pointer;">
                  제안서 장표추출<br/><span style="font-weight:500; opacity:0.85;">14:00~15:00</span>
                </div>
              </td>
              <td>
                <div class="zal-timeline-event purple" onclick="switchTab('interviews')" style="cursor:pointer;">
                  신은숙 화상면접<br/><span style="font-weight:500; opacity:0.85;">14:00~15:00</span>
                </div>
              </td>
              <td>
                <div class="zal-timeline-event purple" onclick="switchTab('interviews')" style="cursor:pointer;">
                  신은숙 화상면접<br/><span style="font-weight:500; opacity:0.85;">14:00~15:00</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="color:#64748b; font-weight:600;">16:00</td>
              <td>
                <div class="zal-timeline-event" onclick="switchTab('sourcing')" style="cursor:pointer;">
                  외주 타겟소싱<br/><span style="font-weight:500; opacity:0.85;">16:00~17:00</span>
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </aside>
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
            <span class="zal-status-pill green" style="margin-bottom:6px;">⚡ AI 무정차 이력서 파싱 엔진 (1건당 검수·등록 2분 이내)</span>
            <h3 style="font-size:16px; font-weight:600; color:#0f172a;">워드(.docx) · 엑셀(.xlsx) · PDF 이력서 업로드 시 표준 DB 자동 적재</h3>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <label class="btn btn-primary" style="cursor:pointer;">
              📄 내 PC 이력서 업로드
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
        <span>🔒 현재 역할(${currentUser ? currentUser.title : '외부 방문자'})은 본인 프로필 또는 면접관으로 지정된 지원자 이력만 열람 가능합니다.</span>
        ${currentUser?.linked_profile_id ? `<button class="btn btn-primary btn-sm" onclick="openEditProfileModal('${currentUser.linked_profile_id}')">✏️ 내 프로필 · 가용일 수정</button>` : ''}
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
    <article class="zal-feed-card">
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
              <span>🕒 최신화 ${p.updated_at}</span>
              <span>|</span>
              <span>${p.education}</span>
            </div>
          </div>
        </div>
        <span class="zal-status-pill ${p.verified ? 'green' : 'amber'}">
          ${p.verified ? `🏅 기검증 ${p.resourced_count > 0 ? `(재소싱 ${p.resourced_count})` : ''}` : '신규파싱'}
        </span>
      </div>

      <div class="zal-meta-list">
        <div class="zal-meta-row">
          <span class="zal-meta-label">🏦 도메인</span>
          <span class="zal-meta-val">${p.domains.join(' · ')}</span>
        </div>
        <div class="zal-meta-row">
          <span class="zal-meta-label">📅 가용일</span>
          <span class="zal-meta-val" style="color:${p.availability_status === '즉시투입가능' ? '#059669' : '#d97706'};">
            ${p.availability_status} (투입가능: ${p.available_date})
          </span>
        </div>
        <div class="zal-meta-row">
          <span class="zal-meta-label">🛠️ 스킬셋</span>
          <span class="zal-meta-val">${p.skills.join(', ')}</span>
        </div>
        <div class="zal-meta-row">
          <span class="zal-meta-label">📜 자격증</span>
          <span class="zal-meta-val">${p.certifications.join(', ')}</span>
        </div>
      </div>

      ${p.rating !== null ? `
        <div class="zal-request-banner" style="background:#f8fafc; border-color:#e2e8f0; color:#0f172a;">
          <div>
            <div>⭐ 내부 평점 <strong>${p.rating > 0 ? `${p.rating} / 5.0` : '평가전'}</strong> · 💰 ${p.is_internal ? `기준단가 ${p.contract_rate}만` : `희망 ${p.desired_rate || '-'}만`}</div>
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
          <span class="zal-reaction-pill">📂 수행이력 ${p.career_history.length}건</span>
          ${canEdit ? `<button type="button" class="zal-reaction-pill" onclick="openEditProfileModal('${p.id}')">✏️ 프로필·가용일 수정</button>` : ''}
        </div>
        <span style="font-size:11.5px; color:#94a3b8; font-weight:600;">AI 파싱 ${p.parse_seconds}초</span>
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

  openModal(`🤖 AI 잘될이 무정차 이력서 파싱 검수 (${fileName})`, `
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

  openModal(`✏️ 프로필 · 수행이력 및 가용 시기(철수/투입일) 현행화 — ${p.name}`, `
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
function selectProjectDetail(projectId) {
  if (state.activeTab !== 'projects') {
    switchTab('projects');
  }
  state.selectedProjectId = projectId;
  renderProjectsTab();
}

function closeProjectDetail() {
  state.selectedProjectId = null;
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
            <span style="color:#cbd5e1; font-size:18px;">♡</span>
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
            <span>☰ ${mainRole}${extraRoleCount > 0 ? ` 외 ${extraRoleCount}개 포지션` : ''}</span>
            <span>🧰 ${grades} 레벨</span>
          </div>
        </div>

        <div class="prj-bottom-row">
          <div class="prj-skill-pills">
            <span class="prj-gray-tag">🕒 ${prj.contract_type || '일괄도급'}</span>
            ${allSkills.map(sk => `<span class="prj-gray-tag">${sk}</span>`).join('')}
          </div>
          <div class="prj-loc-date">
            📍 ${prj.location} · 등록일자 ${(prj.created_at || '2026-11-10').replace(/-/g, '.')}.
          </div>
        </div>
      </div>

      <!-- Right Column: D-Day, Applicant Count, Staffing & Client Box -->
      <div class="prj-split-right">
        <div class="prj-right-meta-list">
          ${isPlanned ? `
            <div class="prj-right-meta-item">
              <span style="color:#64748b;">🕒 충원완료일</span>
              <strong style="color:#dc2626;">${dDayLabel}</strong>
              <span style="font-size:12px; color:#94a3b8;">(${deadline.replace(/-/g, '.')})</span>
            </div>
            <div class="prj-right-meta-item">
              <span style="color:#64748b;">👤 지원자</span>
              <strong style="color:#0f172a;">${applicantCount}명</strong>
            </div>
          ` : `
            <div class="prj-right-meta-item">
              <span style="color:#64748b;">🕒 진행상태</span>
              <strong style="color:#0f172a;">${prj.project_group === 'ONGOING' ? '수행 진행중' : '수행 완료'}</strong>
            </div>
            <div class="prj-right-meta-item">
              <span style="color:#64748b;">👤 참여인력</span>
              <strong style="color:#0f172a;">총 ${totalSlots}명 투입</strong>
            </div>
          `}
          <div style="display:flex; align-items:center; gap:12px; font-size:13px; color:#64748b; margin-top:2px;">
            <span>👁️ 충원 <strong>${filledSlots}/${totalSlots}명</strong></span>
            <span>💬 TO ${totalSlots}</span>
            <span style="margin-left:auto; color:#2563eb; font-weight:600;">상세보기 ›</span>
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
            <span>💙 ${prj.domain} 도메인</span>
            <span>🏅 ${filledSlots === totalSlots ? '배정 완료' : `미충원 ${totalSlots - filledSlots}석`}</span>
          </div>
        </div>
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
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
      <button type="button" class="btn btn-outline btn-sm" onclick="closeProjectDetail()">
        ← 프로젝트 목록으로 돌아가기
      </button>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        ${canManagePrj ? `
          <button type="button" class="btn btn-primary btn-sm" onclick="openProposalSheetModal('${prj.id}')">
            📑 수행인력 총괄표 · 표준 프로필 장표 추출
          </button>
        ` : ''}
        <button type="button" class="btn btn-outline btn-sm" onclick="copyExternalShareLink()">
          🔗 비회원 오픈 구인 웹 링크 모드
        </button>
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
            <div style="font-size:13.5px; font-weight:600; color:#0f172a; margin-bottom:4px;">📌 프로젝트 상세 설명 (과업 범위 및 수행 요건)</div>
            <p style="font-size:14px; color:#334155; line-height:1.65; margin:0;">
              ${prj.description || `${prj.client}의 ${prj.name} 사업으로, ${prj.domain} 도메인 전문 인력 중심의 설계·개발·이행을 수행합니다.`}
            </p>
          </div>
        </div>

        <div class="prj-split-right">
          <div class="prj-right-meta-list">
            ${isPlanned ? `
              <div class="prj-right-meta-item">
                <span style="color:#64748b;">🕒 충원완료일</span>
                <strong style="color:#dc2626;">${dDayLabel}</strong>
                <span style="font-size:12px; color:#94a3b8;">(${deadline.replace(/-/g, '.')})</span>
              </div>
              <div class="prj-right-meta-item">
                <span style="color:#64748b;">👤 지원자</span>
                <strong style="color:#0f172a;">${applicantCount}명</strong>
              </div>
            ` : `
              <div class="prj-right-meta-item">
                <span style="color:#64748b;">🕒 진행상태</span>
                <strong style="color:#0f172a;">${prj.project_group === 'ONGOING' ? '수행 진행중' : '수행 완료'}</strong>
              </div>
            `}
            <div class="prj-right-meta-item">
              <span style="color:#64748b;">👥 TO 충원현황</span>
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
              <span>💙 ${prj.domain} 도메인</span>
              <span>🏅 ${prj.contract_type || '일괄도급'}</span>
            </div>
          </div>
        </div>
      </div>

      ${canManagePrj ? `
        <table class="data-table">
          <thead>
            <tr>
              <th>역할 / 포지션명</th>
              <th>요구 등급</th>
              <th>도메인 · 핵심 스킬</th>
              <th>배정 인력</th>
              <th>상태</th>
              <th style="text-align:right;">액션 (RFP 매칭 / 외주 구인)</th>
            </tr>
          </thead>
          <tbody>
            ${prj.to_slots.map(slot => `
              <tr>
                <td style="font-weight:600;">${slot.role_name}</td>
                <td><span class="badge badge-grade">${slot.required_grade}</span></td>
                <td>
                  <span class="badge badge-domain">${slot.required_domain}</span>
                  ${(slot.required_skills || []).map(sk => `<span class="badge badge-skill">${sk}</span>`).join(' ')}
                </td>
                <td>
                  ${slot.assigned_profile_id
                    ? `<strong style="color:#2563eb;">👤 ${slot.assigned_name}</strong>`
                    : `<span style="color:#94a3b8;">미배정</span>`}
                </td>
                <td>
                  <span class="zal-status-pill ${slot.assigned_profile_id ? 'green' : 'amber'}">${slot.status}</span>
                </td>
                <td style="text-align:right;">
                  <div style="display:inline-flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;">
                    <button class="btn btn-primary btn-sm" onclick="openRfpMatchModal('${prj.id}', '${slot.slot_id}')">
                      🔍 적임자 탐색·배정
                    </button>
                    ${!slot.assigned_profile_id ? `
                      <button class="btn btn-outline btn-sm" onclick="openSlotToJobBoard('${prj.id}', '${slot.slot_id}')">
                        📢 구인공고 오픈
                      </button>
                    ` : `
                      <button class="btn btn-outline btn-sm" onclick="assignProfileToSlot('${prj.id}', '${slot.slot_id}', null)">
                        해제
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

    <!-- 해당 프로젝트 오픈 구인 포지션 & 타겟 소싱 섹션 -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
      <h3 style="font-size:16.5px; font-weight:600;">📢 오픈 구인 포지션 & 인재 풀 타겟 소싱 (${projectPostings.length}건)</h3>
    </div>

    <div class="dashboard-feed-masonry" style="margin-bottom:28px;">
      ${projectPostings.length > 0 ? projectPostings.map(post => `
        <article class="zal-feed-card">
          <div class="zal-card-header">
            <div class="zal-author-box">
              <div class="zal-avatar-circle"><img src="/pic1_thumb.png" alt="구인" /></div>
              <div>
                <span class="zal-author-name">${post.role_name}</span>
                <span class="zal-author-role">${post.required_grade} · ${post.required_domain}</span>
                <div class="zal-card-time">🕒 등록 ${post.created_at} | 타겟소싱 ${post.sourcing_sent_count}건</div>
              </div>
            </div>
            <span class="zal-status-pill ${post.status === 'OPEN' ? 'green' : 'gray'}">${post.status === 'OPEN' ? '🟢 모집중' : '마감됨'}</span>
          </div>

          <div class="zal-card-title">${post.title}</div>

          <div class="zal-meta-list">
            <div class="zal-meta-row"><span class="zal-meta-label">📅 기간</span><span class="zal-meta-val">${post.period} (${post.work_location})</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">💰 단가</span><span class="zal-meta-val">${post.rate_guide}</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">🛠️ 스킬</span><span class="zal-meta-val">${post.required_skills.join(', ')}</span></div>
          </div>

          <div class="zal-card-footer">
            <div class="zal-reaction-group">
              ${post.status === 'OPEN' ? `
                <button class="btn btn-primary btn-sm" onclick="openEasyApplyModal('${post.id}')">
                  ✍️ ${currentUser?.role_group === 'INTERNAL' ? '사내 지인 추천' : '간편 지원하기'}
                </button>
              ` : ''}
              ${permissions.can_manage_postings ? `
                <button class="btn btn-outline btn-sm" onclick="openTargetSourcingModal('${post.id}')">🎯 타겟 소싱 발송</button>
                <button class="btn btn-outline btn-sm" onclick="togglePostingStatus('${post.id}')">${post.status === 'OPEN' ? '마감' : '재오픈'}</button>
              ` : ''}
            </div>
          </div>
        </article>
      `).join('') : `
        <div class="zal-feed-card" style="grid-column: 1 / -1; text-align:center; color:#64748b; padding:28px;">
          현재 이 프로젝트에 오픈된 외주 구인 공고가 없습니다.
        </div>
      `}
    </div>

    <!-- 해당 프로젝트 지원자 인터뷰(면접) & 필수질문 검증 섹션 -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
      <h3 style="font-size:16.5px; font-weight:600;">🎤 지원자 인터뷰(면접) 및 직무별 필수질문 검증 (${projectInterviews.length}건)</h3>
      ${permissions.can_evaluate_interviews || permissions.can_schedule_interviews ? `
        <button class="btn btn-outline btn-sm" onclick="openQuestionTemplatesModal()">📋 직무별 필수 질문 리스트(${templates.length}종)</button>
      ` : ''}
    </div>

    <div class="dashboard-feed-masonry">
      ${projectInterviews.length > 0 ? projectInterviews.map(inv => `
        <article class="zal-feed-card">
          <div class="zal-card-header">
            <div class="zal-author-box">
              <div class="zal-avatar-circle"><img src="/pic2_thumb.png" alt="${inv.candidate_name}" /></div>
              <div>
                <span class="zal-author-name">${inv.candidate_name}</span>
                <span class="zal-author-role">${inv.tech_grade} · ${inv.candidate_type}</span>
                <div class="zal-card-time">🕒 경로: ${inv.recommender || '직접지원'}</div>
              </div>
            </div>
            <span class="zal-status-pill ${inv.status === '최종선정' || inv.status === '면접진행완료' ? 'green' : 'amber'}">${inv.status}</span>
          </div>

          <div class="zal-card-title">${inv.resume_summary}</div>

          <div class="zal-meta-list">
            <div class="zal-meta-row"><span class="zal-meta-label">📅 가용일</span><span class="zal-meta-val">${inv.available_from} (${inv.desired_rate !== null ? `희망 월 ${inv.desired_rate}만` : '🔒 단가비공개'})</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">🗓️ 면접일정</span><span class="zal-meta-val">${inv.interview_date || '일정 미지정'} ${inv.interview_method ? `(${inv.interview_method})` : ''}</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">👨‍💼 면접관</span><span class="zal-meta-val">${inv.interviewer_name || '미배정'}</span></div>
          </div>

          ${inv.total_score > 0 ? `
            <div class="zal-request-banner" style="background:#ecfdf5; border-color:#a7f3d0; color:#059669;">
              <span>⭐ 필수질문 체크리스트 평균 ${inv.total_score} / 5.0점 — "${inv.interviewer_opinion}"</span>
            </div>
          ` : ''}

          <div class="zal-card-footer">
            <div class="zal-reaction-group">
              ${permissions.can_schedule_interviews ? `
                <button class="btn btn-outline btn-sm" onclick="openScheduleInterviewModal('${inv.id}')">🗓️ 일정지정 · 면접관 배정</button>
              ` : ''}
              ${(permissions.can_evaluate_interviews || (currentUser && inv.interviewer_user_id === currentUser.id)) ? `
                <button class="btn btn-primary btn-sm" onclick="openEvaluateChecklistModal('${inv.id}')">✅ 필수질문 평가 · 최종선발</button>
              ` : ''}
            </div>
          </div>
        </article>
      `).join('') : `
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

  openModal(`🎯 RFP 맞춤형 적임자 AI 매칭 — [${slot.role_name}]`, `
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
              <strong>${p.name}</strong><br/>
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

  openModal(`📑 제안서 첨부용 수행인력 총괄표 및 표준 프로필 장표 — ${prj.name}`, `
    <div class="no-print" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px; background:#f8fafc; border:1px solid #e2e8f0; padding:12px 16px; border-radius:12px;">
      <div>
        <strong>⚡ 원클릭 제안서 장표 자동 생성 완료 (소요 시간 3초 / 기존 수작업 2~3일 대체)</strong>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline btn-sm" onclick="downloadProposalCsv('${prj.id}')">📥 엑셀(CSV) 다운로드</button>
        <button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ 인쇄 / PDF 저장</button>
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
  openModal('➕ 신규 입찰/수행 프로젝트 및 필요 인력(TO) 등록', `
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
      <h3 style="font-size:17px; font-weight:600;">오픈 구인 프로젝트 보드 & 기검증 인재 풀 타겟 소싱</h3>
      <button class="btn btn-outline btn-sm" onclick="copyExternalShareLink()">🔗 비회원 오픈 구인 웹 링크 모드 전환</button>
    </div>

    <div class="dashboard-feed-masonry">
      ${postings.map(post => `
        <article class="zal-feed-card">
          <div class="zal-card-header">
            <div class="zal-author-box">
              <div class="zal-avatar-circle"><img src="/pic1_thumb.png" alt="구인" /></div>
              <div>
                <span class="zal-author-name">${post.role_name}</span>
                <span class="zal-author-role">${post.required_grade} · ${post.required_domain}</span>
                <div class="zal-card-time">🕒 등록 ${post.created_at} | 타겟소싱 ${post.sourcing_sent_count}건</div>
              </div>
            </div>
            <span class="zal-status-pill ${post.status === 'OPEN' ? 'green' : 'gray'}">${post.status === 'OPEN' ? '🟢 모집중' : '마감됨'}</span>
          </div>

          <div class="zal-card-title">${post.title}</div>

          <div class="zal-meta-list">
            <div class="zal-meta-row"><span class="zal-meta-label">📅 기간</span><span class="zal-meta-val">${post.period} (${post.work_location})</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">💰 단가</span><span class="zal-meta-val">${post.rate_guide}</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">🛠️ 스킬</span><span class="zal-meta-val">${post.required_skills.join(', ')}</span></div>
          </div>

          <div class="zal-card-footer">
            <div class="zal-reaction-group">
              ${post.status === 'OPEN' ? `
                <button class="btn btn-primary btn-sm" onclick="openEasyApplyModal('${post.id}')">
                  ✍️ ${currentUser?.role_group === 'INTERNAL' ? '사내 지인 추천' : '간편 지원하기'}
                </button>
              ` : ''}
              ${permissions.can_manage_postings ? `
                <button class="btn btn-outline btn-sm" onclick="openTargetSourcingModal('${post.id}')">🎯 타겟 소싱 발송</button>
                <button class="btn btn-outline btn-sm" onclick="togglePostingStatus('${post.id}')">${post.status === 'OPEN' ? '마감' : '재오픈'}</button>
              ` : ''}
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function copyExternalShareLink() {
  state.userId = 'guest_external';
  loadState();
  showToast('비회원 오픈 구인 웹 링크 모드로 전환되었습니다!');
}

async function togglePostingStatus(postingId) {
  await apiCall('/api/postings/toggle', 'POST', { posting_id: postingId });
  showToast('구인 공고 상태가 변경되었습니다.');
  await loadState();
}

function openTargetSourcingModal(postingId) {
  const { postings, profiles } = state.data;
  const post = postings.find(p => p.id === postingId);
  if (!post) return;
  const matchingPool = profiles.filter(p => !p.is_internal);

  openModal(`🎯 인재 풀 타겟 소싱 메일·알림 발송 — ${post.role_name}`, `
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
        <button type="submit" class="btn btn-primary">📨 일괄 발송</button>
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

  openModal(`✍️ ${isInternalReferral ? '사내 지인 추천 접수' : '오픈 프로젝트 간편 지원'} — ${post.title}`, `
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
      <h3 style="font-size:17px; font-weight:600;">표준 인터뷰(면접) 일정 조율 · 내부 면접관 배정 · 직무별 필수질문 검증</h3>
      ${permissions.can_evaluate_interviews || permissions.can_schedule_interviews ? `
        <button class="btn btn-outline btn-sm" onclick="openQuestionTemplatesModal()">📋 직무별 필수 질문 리스트(${templates.length}종) 관리</button>
      ` : ''}
    </div>

    <div class="dashboard-feed-masonry">
      ${interviews.map(inv => `
        <article class="zal-feed-card">
          <div class="zal-card-header">
            <div class="zal-author-box">
              <div class="zal-avatar-circle"><img src="/pic2_thumb.png" alt="${inv.candidate_name}" /></div>
              <div>
                <span class="zal-author-name">${inv.candidate_name}</span>
                <span class="zal-author-role">${inv.tech_grade} · ${inv.candidate_type}</span>
                <div class="zal-card-time">🕒 추천/경로: ${inv.recommender || '직접지원'}</div>
              </div>
            </div>
            <span class="zal-status-pill ${inv.status === '최종선정' || inv.status === '면접진행완료' ? 'green' : 'amber'}">${inv.status}</span>
          </div>

          <div class="zal-card-title">${inv.resume_summary}</div>

          <div class="zal-meta-list">
            <div class="zal-meta-row"><span class="zal-meta-label">📅 가용일</span><span class="zal-meta-val">${inv.available_from} (${inv.desired_rate !== null ? `희망 월 ${inv.desired_rate}만` : '🔒 단가비공개'})</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">🗓️ 면접일정</span><span class="zal-meta-val">${inv.interview_date || '일정 미지정'} ${inv.interview_method ? `(${inv.interview_method})` : ''}</span></div>
            <div class="zal-meta-row"><span class="zal-meta-label">👨‍💼 면접관</span><span class="zal-meta-val">${inv.interviewer_name || '미배정'}</span></div>
          </div>

          ${inv.total_score > 0 ? `
            <div class="zal-request-banner" style="background:#ecfdf5; border-color:#a7f3d0; color:#059669;">
              <span>⭐ 필수질문 체크리스트 평균 ${inv.total_score} / 5.0점 — "${inv.interviewer_opinion}"</span>
            </div>
          ` : ''}

          <div class="zal-card-footer">
            <div class="zal-reaction-group">
              ${permissions.can_schedule_interviews ? `
                <button class="btn btn-outline btn-sm" onclick="openScheduleInterviewModal('${inv.id}')">🗓️ 일정지정 · 면접관 배정</button>
              ` : ''}
              ${(permissions.can_evaluate_interviews || (currentUser && inv.interviewer_user_id === currentUser.id)) ? `
                <button class="btn btn-primary btn-sm" onclick="openEvaluateChecklistModal('${inv.id}')">✅ 필수질문 평가 · 최종선발</button>
              ` : ''}
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function openScheduleInterviewModal(interviewId) {
  const { interviews, users, templates } = state.data;
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const internalInterviewers = users.filter(u => u.role_group !== 'EXTERNAL');

  openModal(`🗓️ 면접 일정 통보 및 사내 면접관 배정 — ${inv.candidate_name}`, `
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

function openEvaluateChecklistModal(interviewId) {
  const { interviews, templates } = state.data;
  const inv = interviews.find(i => i.id === interviewId);
  if (!inv) return;
  const tpl = templates.find(t => t.id === inv.template_id) || templates[0];
  const existingResults = inv.checklist_results || [];

  openModal(`✅ 직무별 필수 질문 체크리스트 평가 및 최종 선발 — ${inv.candidate_name}`, `
    <form onsubmit="submitInterviewEvaluation(event, '${inv.id}')">
      <table class="data-table" style="margin-bottom:16px;">
        <thead>
          <tr>
            <th style="width:48%;">필수 검증 질문 (체크리스트)</th>
            <th style="width:22%;">기준</th>
            <th style="width:14%;">점수</th>
            <th style="width:16%;">확인 메모</th>
          </tr>
        </thead>
        <tbody>
          ${tpl.questions.map((q, idx) => {
            const prev = existingResults[idx] || {};
            return `
              <tr>
                <td>
                  <label style="display:flex; gap:6px; align-items:flex-start; font-weight:700; cursor:pointer;">
                    <input type="checkbox" name="q_checked_${idx}" checked style="margin-top:3px;" />
                    <span>Q${idx + 1}. ${q.question}</span>
                  </label>
                  <input type="hidden" name="q_text_${idx}" value="${q.question}" />
                </td>
                <td style="font-size:11.5px; color:#64748b;">${q.criteria}</td>
                <td>
                  <select class="select" name="q_score_${idx}" style="width:100%;">
                    ${[5, 4.5, 4, 3.5, 3].map(sc => `<option value="${sc}" ${(prev.score || 4.5) === sc ? 'selected' : ''}>${sc}점</option>`).join('')}
                  </select>
                </td>
                <td>
                  <input class="input" name="q_note_${idx}" style="width:100%;" value="${prev.note || '검증 완료'}" />
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
            <option value="최종선정" ${inv.status === '최종선정' ? 'selected' : ''}>🏆 최종선정 (DB 평점 연동 + 프로젝트 TO 자동배정)</option>
            <option value="면접진행완료" ${inv.status === '면접진행완료' ? 'selected' : ''}>📝 면접진행완료 (임원 승인 대기)</option>
            <option value="보류" ${inv.status === '보류' ? 'selected' : ''}>⏸️ 보류</option>
            <option value="탈락" ${inv.status === '탈락' ? 'selected' : ''}>❌ 탈락</option>
          </select>
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">평가 저장 및 DB 자동 연동</button>
      </div>
    </form>
  `);
}

async function submitInterviewEvaluation(e, interviewId) {
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
  closeModal();
  showToast(
    finalStatus === '최종선정'
      ? `🎉 최종선정 완료! 인력 DB 평점(${res.avgScore}점) 반영 및 프로젝트 TO 자동 배정이 완료되었습니다.`
      : `면접 평가(${res.avgScore}점)가 인력 DB에 연동되었습니다.`
  );
  await loadState();
}

function openQuestionTemplatesModal() {
  const { templates } = state.data;
  openModal('📋 직무·금융도메인별 표준 필수 질문 리스트 관리', `
    <div style="display:flex; flex-direction:column; gap:12px;">
      ${templates.map(t => `
        <div style="border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
          <div style="font-weight:600; margin-bottom:6px;">[${t.domain_focus}] ${t.role_type}</div>
          <ol style="padding-left:18px; font-size:12.5px; color:#475569;">
            ${t.questions.map(q => `<li>${q.question}</li>`).join('')}
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
            <div class="zal-card-title">⚙️ 하위 사용자별 세부 활동 권한 선별 부여 (ON / OFF)</div>
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
        <div class="zal-card-title">📐 PRD 3.2 주요 활동별 선별 권한 부여 기준표</div>
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

  document.getElementById('openMyProfileBtn').addEventListener('click', () => {
    const cur = state.data?.currentUser;
    if (cur?.linked_profile_id) {
      openEditProfileModal(cur.linked_profile_id);
    } else if (state.data?.profiles?.length) {
      openEditProfileModal(state.data.profiles[0].id);
    }
  });

  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });

  loadState();
});
