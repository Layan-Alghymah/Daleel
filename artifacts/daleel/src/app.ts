import { initAuth, state, hasPermission } from './state';
import { handleRoute, registerRoute } from './router';
import { showToast } from './components/toast';

import { renderLanding } from './pages/landing';
import { renderLogin } from './pages/login';
import { renderDashboard } from './pages/dashboard';
import { renderChat } from './pages/chat';
import { renderSuggestions } from './pages/suggestions';
import { renderHistory } from './pages/history';
import { renderTables } from './pages/tables';
import { renderCharts } from './pages/charts';
import { renderExport } from './pages/export';
import { renderDataSources } from './pages/datasources';
import { renderPermissions } from './pages/permissions';
import { renderResults } from './pages/results';
import { renderSidebar } from './components/sidebar';

export function initApp() {
  initAuth();

  // Public routes (no auth required)
  registerRoute('#', () => {
    const root = document.getElementById('root');
    if (!root) return;
    if (state.user) { window.location.hash = '#dashboard'; return; }
    renderLanding(root);
  });

  registerRoute('#login', () => {
    const root = document.getElementById('root');
    if (!root) return;
    renderLogin(root);
  });

  registerRoute('#dashboard', withLayout(renderDashboard));
  registerRoute('#chat', withLayout(renderChat));
  registerRoute('#suggestions', withLayout(renderSuggestions));
  registerRoute('#history', withLayout(renderHistory));
  registerRoute('#tables', withLayout(renderTables));
  registerRoute('#charts', withLayout(renderCharts));
  registerRoute('#export', withLayout(renderExport));
  registerRoute('#results', withLayout(renderResults));

  // مدير and above only
  registerRoute('#datasources', withLayout((container) => {
    if (!hasPermission('مدير')) {
      renderAccessDenied(container, 'مصادر البيانات', 'مدير');
      return;
    }
    renderDataSources(container);
  }));

  // قائد only
  registerRoute('#permissions', withLayout((container) => {
    if (!hasPermission('قائد')) {
      renderAccessDenied(container, 'إدارة الصلاحيات', 'قائد');
      return;
    }
    renderPermissions(container);
  }));

  const hash = window.location.hash;
  const publicRoutes = ['', '#', '#login'];
  if (!state.user && !publicRoutes.includes(hash)) {
    window.location.hash = '#login';
  } else {
    handleRoute();
  }
}

function renderAccessDenied(container: HTMLElement, pageName: string, requiredRole: string) {
  showToast('ليس لديك صلاحية للوصول إلى هذه الصفحة', 'error');
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; gap: 16px;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: #FEF2F2; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
      <h2 style="color: var(--color-danger); font-size: 22px;">وصول مرفوض</h2>
      <p style="color: var(--color-muted); max-width: 400px; line-height: 1.8;">
        صفحة <strong>${pageName}</strong> متاحة لدور <strong>${requiredRole}</strong> فقط.
        <br>دورك الحالي: <strong>${state.user?.role || 'غير محدد'}</strong>
      </p>
      <div style="display: flex; gap: 12px; margin-top: 8px;">
        <button class="btn btn-primary" onclick="window.location.hash='#dashboard'">العودة للوحة التحكم</button>
        <button class="btn btn-secondary" onclick="window.location.hash='#chat'">المحادثة الذكية</button>
      </div>
    </div>
  `;
}

function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  hamburger?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('visible');
  });
  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
  });
}

function withLayout(renderContent: (container: HTMLElement) => void) {
  return () => {
    if (!state.user) {
      window.location.hash = '#login';
      return;
    }

    const root = document.getElementById('root');
    if (!root) return;

    root.innerHTML = `
      <div class="app-layout">
        <div id="sidebar-container">
          <div class="hamburger">
            <span></span><span></span><span></span>
          </div>
          <div class="sidebar-overlay"></div>
        </div>
        <main id="main-content"></main>
      </div>
    `;

    renderSidebar(document.getElementById('sidebar-container')!);
    renderContent(document.getElementById('main-content')!);
    setupMobileMenu();
  };
}
