import { initAuth, state } from './state';
import { handleRoute, registerRoute } from './router';

// Import pages
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

export function initApp() {
  initAuth();

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
  registerRoute('#datasources', withLayout(renderDataSources));
  registerRoute('#permissions', withLayout(renderPermissions));
  registerRoute('#results', withLayout(renderResults));

  // Default redirect if logged out
  if (!state.user && window.location.hash !== '#login') {
    window.location.hash = '#login';
  } else {
    handleRoute();
  }
}

import { renderSidebar } from './components/sidebar';

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
