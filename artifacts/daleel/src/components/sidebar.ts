import { state, logout, hasPermission } from '../state';

export function renderSidebar(container: HTMLElement) {
  const hash = window.location.hash || '#dashboard';
  
  const links = [
    { id: 'dashboard', path: '#dashboard', label: 'لوحة التحكم', icon: '⊞' },
    { id: 'chat', path: '#chat', label: 'المحادثة الذكية', icon: '💬' },
    { id: 'suggestions', path: '#suggestions', label: 'اقتراحات الأسئلة', icon: '💡' },
    { id: 'history', path: '#history', label: 'سجل الاستعلامات', icon: '⏳' },
    { id: 'tables', path: '#tables', label: 'الجداول', icon: '📋' },
    { id: 'charts', path: '#charts', label: 'الرسوم البيانية', icon: '📊' },
    { id: 'export', path: '#export', label: 'تصدير النتائج', icon: '📥' },
  ];

  if (hasPermission('مدير')) {
    links.push({ id: 'datasources', path: '#datasources', label: 'مصادر البيانات', icon: '🗄️' });
  }
  if (hasPermission('قائد')) {
    links.push({ id: 'permissions', path: '#permissions', label: 'إدارة الصلاحيات', icon: '🔐' });
  }

  container.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <img src="/logo.png" alt="دليل" onerror="this.style.display='none'">
        <div>
          <h2>دليل</h2>
          <span style="font-size: 10px; color: var(--color-muted);">مساعد الاستعلام الذكي</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${links.map(link => `
          <a href="${link.path}" class="nav-item ${hash === link.path ? 'active' : ''}">
            <span class="icon">${link.icon}</span>
            ${link.label}
          </a>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div style="margin-bottom: 12px;">
          <div style="font-weight: 600;">${state.user?.name || 'مستخدم'}</div>
          <div style="font-size: 12px; color: var(--color-muted);">${state.user?.role || ''}</div>
        </div>
        <button id="logout-btn" class="btn btn-secondary" style="width: 100%;">تسجيل الخروج</button>
      </div>
    </aside>
  `;

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout();
  });
}
