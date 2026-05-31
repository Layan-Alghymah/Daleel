export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 24px;
    background: var(--color-surface);
    color: var(--color-text);
    padding: 16px 24px;
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    border-right: 4px solid ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-danger)' : 'var(--color-primary)'};
    z-index: 9999;
    animation: slideIn 0.3s ease forwards;
  `;
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add animations to global css dynamically if missing
const style = document.createElement('style');
style.innerHTML = `
  @keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-100%); opacity: 0; } }
`;
document.head.appendChild(style);
