import { state, logout, hasPermission } from '../state';

export function renderSidebar(container: HTMLElement) {
  const hash = window.location.hash || '#dashboard';
  const role = state.user?.role || '';

  /* ── قائد: full command nav ─────────────────────────── */
  const leaderMain = [
    navItem('dashboard', 'لوحة القيادة', iconGrid()),
    navItem('chat', 'المحادثة الذكية', iconChat()),
    navItem('suggestions', 'اقتراحات الأسئلة', iconBulb()),
  ];
  const leaderData = [
    navItem('history', 'سجل جميع الاستعلامات', iconClock()),
    navItem('tables', 'الجداول', iconTable()),
    navItem('charts', 'الرسوم البيانية', iconChart()),
    navItem('export', 'تصدير النتائج', iconDownload()),
  ];
  const leaderAdmin = [
    navItem('datasources', 'مصادر البيانات', iconDB()),
    navItem('permissions', 'إدارة الصلاحيات', iconShield()),
  ];

  /* ── مدير: operational nav ──────────────────────────── */
  const managerMain = [
    navItem('dashboard', 'لوحة العمليات', iconGrid()),
    navItem('chat', 'المحادثة الذكية', iconChat()),
    navItem('suggestions', 'اقتراحات الأسئلة', iconBulb()),
  ];
  const managerData = [
    navItem('history', 'سجل الاستعلامات', iconClock()),
    navItem('tables', 'الجداول', iconTable()),
    navItem('charts', 'الرسوم البيانية', iconChart()),
    navItem('export', 'تصدير النتائج', iconDownload()),
  ];
  const managerAdmin = [
    navItem('datasources', 'مصادر البيانات', iconDB()),
  ];

  /* ── محلل بيانات: personal analyst nav ─────────────── */
  const analystMain = [
    navItem('dashboard', 'مساحتي', iconGrid()),
    navItem('chat', 'المحادثة الذكية', iconChat()),
    navItem('suggestions', 'اقتراحات أسئلة', iconBulb()),
  ];
  const analystTools = [
    navItem('history', 'استعلاماتي', iconClock()),
    navItem('tables', 'الجداول', iconTable()),
    navItem('charts', 'الرسوم البيانية', iconChart()),
    navItem('export', 'تصدير', iconDownload()),
  ];

  let mainLinks: { id: string; path: string; label: string; icon: string }[] = [];
  let dataLinks: { id: string; path: string; label: string; icon: string }[] = [];
  let adminLinks: { id: string; path: string; label: string; icon: string }[] = [];
  let dataGroupLabel = 'البيانات';
  let adminGroupLabel = 'الإدارة';
  let mainGroupLabel = 'الرئيسية';

  if (role === 'قائد') {
    mainLinks = leaderMain;
    dataLinks = leaderData;
    adminLinks = leaderAdmin;
    dataGroupLabel = 'البيانات والتقارير';
    adminGroupLabel = 'إدارة المنظومة';
  } else if (role === 'مدير') {
    mainLinks = managerMain;
    dataLinks = managerData;
    adminLinks = managerAdmin;
    dataGroupLabel = 'البيانات والتقارير';
    adminGroupLabel = 'الإعدادات';
  } else {
    mainLinks = analystMain;
    dataLinks = analystTools;
    adminLinks = [];
    dataGroupLabel = 'أدواتي';
    mainGroupLabel = 'القائمة';
  }

  const roleConfig: Record<string, { style: string; icon: string; label: string }> = {
    'قائد': {
      style: 'background: var(--color-primary); color: white;',
      icon: '★',
      label: 'قائد — صلاحيات كاملة'
    },
    'مدير': {
      style: 'background: var(--color-secondary); color: white;',
      icon: '◆',
      label: 'مدير — صلاحيات تشغيلية'
    },
    'محلل بيانات': {
      style: 'background: rgba(245,158,11,0.15); color: var(--color-accent); border: 1px solid rgba(245,158,11,0.3);',
      icon: '◈',
      label: 'محلل بيانات'
    }
  };

  const rc = roleConfig[role] || { style: 'background:#eee;color:#666;', icon: '○', label: role };

  const renderGroup = (label: string, links: typeof mainLinks) => {
    if (links.length === 0) return '';
    return `
      <div class="nav-group-label">${label}</div>
      ${links.map(link => `
        <a href="${link.path}" class="nav-item ${hash === link.path ? 'active' : ''}">
          <span class="icon">${link.icon}</span>
          ${link.label}
        </a>
      `).join('')}
    `;
  };

  const asideHtml = `
    <aside class="sidebar">
      <div style="height: 4px; background: ${role === 'قائد' ? 'var(--color-primary)' : role === 'مدير' ? 'var(--color-secondary)' : 'var(--color-accent)'}; width: 100%;"></div>
      <div class="sidebar-logo">
        <img src="/logo.png" alt="دليل" onerror="this.style.display='none'">
        <div>
          <h2>دليل</h2>
          <span style="font-size: 10px; color: var(--color-muted);">مساعد الاستعلام الذكي</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${renderGroup(mainGroupLabel, mainLinks)}
        ${renderGroup(dataGroupLabel, dataLinks)}
        ${renderGroup(adminGroupLabel, adminLinks)}
      </nav>
      <div class="sidebar-footer">
        <div style="margin-bottom: 12px;">
          <div style="font-weight: 600; margin-bottom: 6px;">${state.user?.name || 'مستخدم'}</div>
          <div style="font-size: 11px; color: var(--color-muted); margin-bottom: 8px;">${state.user?.email || ''}</div>
          <div style="font-size: 11px; padding: 5px 10px; border-radius: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; ${rc.style}">
            <span>${rc.icon}</span> ${rc.label}
          </div>
        </div>
        <button id="logout-btn" class="btn btn-secondary" style="width: 100%;">تسجيل الخروج</button>
      </div>
    </aside>
  `;

  const existingSidebar = container.querySelector('.sidebar');
  if (existingSidebar) {
    existingSidebar.outerHTML = asideHtml;
  } else {
    container.innerHTML += asideHtml;
  }

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout();
  });
}

function navItem(id: string, label: string, icon: string) {
  return { id, path: `#${id}`, label, icon };
}

/* ── SVG Icons ──────────────────────────────────────── */
function svg(path: string) {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}
function iconGrid()     { return svg('<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>'); }
function iconChat()     { return svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>'); }
function iconBulb()     { return svg('<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>'); }
function iconClock()    { return svg('<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>'); }
function iconTable()    { return svg('<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>'); }
function iconChart()    { return svg('<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>'); }
function iconDownload() { return svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>'); }
function iconDB()       { return svg('<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>'); }
function iconShield()   { return svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>'); }
