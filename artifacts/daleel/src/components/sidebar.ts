import { state, logout, hasPermission } from '../state';

export function renderSidebar(container: HTMLElement) {
  const hash = window.location.hash || '#dashboard';
  
  const mainLinks = [
    { id: 'dashboard', path: '#dashboard', label: 'لوحة التحكم', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>' },
    { id: 'chat', path: '#chat', label: 'المحادثة الذكية', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' },
    { id: 'suggestions', path: '#suggestions', label: 'اقتراحات الأسئلة', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>' },
  ];

  const dataLinks = [
    { id: 'history', path: '#history', label: 'سجل الاستعلامات', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' },
    { id: 'tables', path: '#tables', label: 'الجداول', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>' },
    { id: 'charts', path: '#charts', label: 'الرسوم البيانية', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>' },
    { id: 'export', path: '#export', label: 'تصدير النتائج', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>' },
  ];

  const adminLinks = [];
  if (hasPermission('مدير')) {
    adminLinks.push({ id: 'datasources', path: '#datasources', label: 'مصادر البيانات', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>' });
  }
  if (hasPermission('قائد')) {
    adminLinks.push({ id: 'permissions', path: '#permissions', label: 'إدارة الصلاحيات', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>' });
  }

  const renderGroup = (label: string, links: any[]) => {
    if (links.length === 0) return '';
    return `
      <div style="padding: 16px 24px 8px; font-size: 11px; font-weight: 700; color: var(--color-muted); text-transform: uppercase;">
        ${label}
      </div>
      ${links.map(link => `
        <a href="${link.path}" class="nav-item ${hash === link.path ? 'active' : ''}">
          <span class="icon" style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px;">${link.icon}</span>
          ${link.label}
        </a>
      `).join('')}
    `;
  };

  const roleColors: Record<string, string> = {
    'قائد': 'background: rgba(30, 58, 138, 0.1); color: var(--color-primary);',
    'مدير': 'background: rgba(37, 99, 235, 0.1); color: var(--color-secondary);',
    'محلل بيانات': 'background: rgba(245, 158, 11, 0.1); color: var(--color-warning);'
  };

  const userRole = state.user?.role || '';
  const roleStyle = roleColors[userRole] || 'background: #eee; color: #666;';

  const asideHtml = `
    <aside class="sidebar">
      <div style="height: 4px; background: var(--color-accent); width: 100%;"></div>
      <div class="sidebar-logo">
        <img src="/logo.png" alt="دليل" onerror="this.style.display='none'">
        <div>
          <h2>دليل</h2>
          <span style="font-size: 10px; color: var(--color-muted);">مساعد الاستعلام الذكي</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${renderGroup('الرئيسية', mainLinks)}
        ${renderGroup('البيانات', dataLinks)}
        ${renderGroup('الإدارة', adminLinks)}
      </nav>
      <div class="sidebar-footer">
        <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
          <div style="font-weight: 600;">${state.user?.name || 'مستخدم'}</div>
          <div style="font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: 600; ${roleStyle}">${userRole}</div>
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