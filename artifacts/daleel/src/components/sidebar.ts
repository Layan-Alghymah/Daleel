import { state, logout, hasPermission } from '../state';

export function renderSidebar(container: HTMLElement) {
  const hash = window.location.hash || '#dashboard';
  const role = state.user?.role || '';

  /* ── قائد ─────────────────────────────────────────── */
  const leaderMain  = [
    navItem('dashboard', 'لوحة القيادة',           iDashboard()),
    navItem('chat',      'المحادثة الذكية',          iMessage()),
  ];
  const leaderData  = [
    navItem('history',   'سجل جميع الاستعلامات',   iClock()),
    navItem('tables',    'الجداول',                  iTable()),
    navItem('charts',    'الرسوم البيانية',          iBarChart()),
    navItem('export',    'تصدير النتائج',            iDownload()),
  ];
  const leaderAdmin = [
    navItem('datasources', 'مصادر البيانات',        iDatabase()),
    navItem('permissions', 'إدارة الصلاحيات',       iShield()),
  ];

  /* ── مدير ─────────────────────────────────────────── */
  const managerMain  = [
    navItem('dashboard', 'لوحة العمليات',           iDashboard()),
    navItem('chat',      'المحادثة الذكية',          iMessage()),
  ];
  const managerData  = [
    navItem('history',   'سجل الاستعلامات',         iClock()),
    navItem('tables',    'الجداول',                  iTable()),
    navItem('charts',    'الرسوم البيانية',          iBarChart()),
    navItem('export',    'تصدير النتائج',            iDownload()),
  ];
  const managerAdmin = [
    navItem('datasources', 'مصادر البيانات',        iDatabase()),
  ];

  /* ── محلل بيانات ──────────────────────────────────── */
  const analystMain  = [
    navItem('dashboard', 'مساحتي',                  iDashboard()),
    navItem('chat',      'المحادثة الذكية',          iMessage()),
  ];
  const analystTools = [
    navItem('history',   'استعلاماتي',              iClock()),
    navItem('tables',    'الجداول',                  iTable()),
    navItem('charts',    'الرسوم البيانية',          iBarChart()),
    navItem('export',    'تصدير',                    iDownload()),
  ];

  let mainLinks:  ReturnType<typeof navItem>[] = [];
  let dataLinks:  ReturnType<typeof navItem>[] = [];
  let adminLinks: ReturnType<typeof navItem>[] = [];
  let mainGroupLabel  = 'الرئيسية';
  let dataGroupLabel  = 'البيانات والتقارير';
  let adminGroupLabel = 'الإدارة';

  if (role === 'قائد') {
    mainLinks = leaderMain; dataLinks = leaderData; adminLinks = leaderAdmin;
    adminGroupLabel = 'إدارة المنظومة';
  } else if (role === 'مدير') {
    mainLinks = managerMain; dataLinks = managerData; adminLinks = managerAdmin;
    adminGroupLabel = 'الإعدادات';
  } else {
    mainLinks = analystMain; dataLinks = analystTools; adminLinks = [];
    mainGroupLabel = 'القائمة'; dataGroupLabel = 'أدواتي';
  }

  const roleConfig: Record<string, { style: string; icon: string; label: string }> = {
    'قائد':        { style: 'background:var(--color-primary);color:white;',                                                  icon: '★', label: 'قائد — صلاحيات كاملة' },
    'مدير':        { style: 'background:var(--color-secondary);color:white;',                                               icon: '◆', label: 'مدير — صلاحيات تشغيلية' },
    'محلل بيانات': { style: 'background:rgba(245,158,11,0.15);color:var(--color-accent);border:1px solid rgba(245,158,11,0.3);', icon: '◈', label: 'محلل بيانات' },
  };
  const rc = roleConfig[role] || { style: 'background:#eee;color:#666;', icon: '○', label: role };

  const renderGroup = (label: string, links: ReturnType<typeof navItem>[]) => {
    if (!links.length) return '';
    return `<div class="nav-group-label">${label}</div>` +
      links.map(link => `<a href="${link.path}" class="nav-item ${hash === link.path ? 'active' : ''}"><span class="icon">${link.icon}</span>${link.label}</a>`).join('');
  };

  const accentColor = role === 'قائد' ? 'var(--color-primary)' : role === 'مدير' ? 'var(--color-secondary)' : 'var(--color-accent)';

  const asideHtml = `
    <aside class="sidebar">
      <div style="height:4px;background:${accentColor};width:100%;flex-shrink:0;"></div>
      <div class="sidebar-logo">
        <img src="/logo.png" alt="دليل" onerror="this.style.display='none'">
        <div>
          <h2>دليل</h2>
          <span style="font-size:10px;color:var(--color-muted);">مساعد الاستعلام الذكي</span>
        </div>
      </div>
      <nav class="sidebar-nav">${renderGroup(mainGroupLabel, mainLinks)}${renderGroup(dataGroupLabel, dataLinks)}${renderGroup(adminGroupLabel, adminLinks)}</nav>
      <div class="sidebar-footer">
        <div style="margin-bottom:12px;">
          <div style="font-weight:600;margin-bottom:6px;">${state.user?.name || 'مستخدم'}</div>
          <div style="font-size:11px;color:var(--color-muted);margin-bottom:8px;">${state.user?.email || ''}</div>
          <div style="font-size:11px;padding:5px 10px;border-radius:12px;font-weight:700;display:inline-flex;align-items:center;gap:5px;${rc.style}">
            <span>${rc.icon}</span> ${rc.label}
          </div>
        </div>
        <button id="logout-btn" class="btn btn-secondary" style="width:100%;">تسجيل الخروج</button>
      </div>
    </aside>`;

  const existing = container.querySelector('.sidebar');
  if (existing) {
    existing.outerHTML = asideHtml;
  } else {
    container.innerHTML += asideHtml;
  }

  document.getElementById('logout-btn')?.addEventListener('click', logout);
}

function navItem(id: string, label: string, icon: string) {
  return { id, path: `#${id}`, label, icon };
}

/* ── Lucide SVG icons ──────────────────────────────── */
function svg(path: string) {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

function iDashboard() {
  return svg('<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="15" rx="1"/>');
}
function iMessage() {
  return svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>');
}
function iClock() {
  return svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>');
}
function iTable() {
  return svg('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/>');
}
function iBarChart() {
  return svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>');
}
function iDownload() {
  return svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>');
}
function iDatabase() {
  return svg('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>');
}
function iShield() {
  return svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>');
}
