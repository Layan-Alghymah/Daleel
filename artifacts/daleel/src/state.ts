export const state = {
  user: null as { name: string; email: string; role: string } | null,
};

export function login(user: { name: string; email: string; role: string }) {
  state.user = user;
  localStorage.setItem('daleel_user', JSON.stringify(user));
  window.location.hash = '#dashboard';
}

export function logout() {
  state.user = null;
  localStorage.removeItem('daleel_user');
  window.location.hash = '#';
}

export function initAuth() {
  const saved = localStorage.getItem('daleel_user');
  if (saved) {
    try {
      state.user = JSON.parse(saved);
    } catch (e) {
      state.user = null;
    }
  }
}

export function hasPermission(requiredRole?: string) {
  if (!state.user) return false;
  if (!requiredRole) return true;
  if (state.user.role === 'قائد') return true;
  if (state.user.role === 'مدير' && requiredRole !== 'قائد') return true;
  if (state.user.role === 'محلل بيانات' && requiredRole === 'محلل بيانات') return true;
  return false;
}
