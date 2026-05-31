export const routes: Record<string, () => void> = {};

export function registerRoute(path: string, renderFn: () => void) {
  routes[path] = renderFn;
}

export function handleRoute() {
  const hash = window.location.hash || '#dashboard';
  const renderFn = routes[hash];
  
  const root = document.getElementById('root');
  if (!root) return;

  if (renderFn) {
    renderFn();
  } else {
    root.innerHTML = `<div class="error-page"><h1>الصفحة غير موجودة</h1></div>`;
  }
}

export function navigateTo(hash: string) {
  window.location.hash = hash;
}

window.addEventListener('hashchange', handleRoute);
