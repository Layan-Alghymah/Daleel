export function showModal(title: string, contentHtml: string, onConfirm?: () => void) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5); z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(2px);
  `;
  
  const modal = document.createElement('div');
  modal.className = 'card';
  modal.style.cssText = `
    width: 100%; max-width: 500px;
    background: var(--color-surface);
    position: relative;
    padding: 32px;
  `;
  
  modal.innerHTML = `
    <h2 style="margin-bottom: 24px; color: var(--color-primary);">${title}</h2>
    <div style="margin-bottom: 32px;">${contentHtml}</div>
    <div style="display: flex; justify-content: flex-end; gap: 16px;">
      <button class="btn btn-secondary" id="modal-cancel">إلغاء</button>
      ${onConfirm ? `<button class="btn btn-primary" id="modal-confirm">تأكيد</button>` : ''}
    </div>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  const close = () => overlay.remove();
  
  document.getElementById('modal-cancel')?.addEventListener('click', close);
  if (onConfirm) {
    document.getElementById('modal-confirm')?.addEventListener('click', () => {
      onConfirm();
      close();
    });
  }
}
