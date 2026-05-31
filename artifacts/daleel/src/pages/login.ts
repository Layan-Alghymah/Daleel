import { login } from '../state';

export function renderLogin(container: HTMLElement) {
  container.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--color-background); width: 100%;">
      <div class="card" style="width: 100%; max-width: 400px; text-align: center;">
        <div style="text-align: right; margin-bottom: 8px;">
          <a href="#" style="display: inline-flex; align-items: center; gap: 6px; color: var(--color-muted); text-decoration: none; font-size: 13px; transition: color 0.15s;"
             onmouseover="this.style.color='var(--color-primary)'" onmouseout="this.style.color='var(--color-muted)'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            رجوع للرئيسية
          </a>
        </div>
        <img src="/logo.png" alt="دليل" style="width: 80px; margin-bottom: 16px;" onerror="this.style.display='none'">
        <h1 style="margin-bottom: 8px;">دليل</h1>
        <p style="margin-bottom: 32px;">مساعد الاستعلام الذكي للبيانات المؤسسية</p>
        
        <form id="login-form" style="text-align: right;">
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">البريد الإلكتروني</label>
            <input type="email" id="email" class="input" placeholder="admin@gov.sa" required>
          </div>
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">كلمة المرور</label>
            <input type="password" id="password" class="input" placeholder="••••••" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 16px;">تسجيل الدخول</button>
          <div style="text-align: center;">
            <a href="#" style="color: var(--color-secondary); text-decoration: none; font-size: 14px;">نسيت كلمة المرور؟</a>
          </div>
        </form>

        <hr style="border: 0; border-top: 1px solid var(--color-border); margin: 24px 0;">
        
        <p style="font-size: 12px; margin-bottom: 12px;">حسابات تجريبية:</p>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button id="btn-admin" class="btn btn-secondary" style="font-size: 12px; padding: 4px 8px;">دخول كقائد</button>
          <button id="btn-manager" class="btn btn-secondary" style="font-size: 12px; padding: 4px 8px;">دخول كمدير</button>
          <button id="btn-analyst" class="btn btn-secondary" style="font-size: 12px; padding: 4px 8px;">دخول كمحلل</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    login({ name: 'الإدارة العليا', email: 'admin@gov.sa', role: 'قائد' });
  });

  document.getElementById('btn-admin')?.addEventListener('click', () => {
    login({ name: 'مسؤول النظام', email: 'admin@gov.sa', role: 'قائد' });
  });
  
  document.getElementById('btn-manager')?.addEventListener('click', () => {
    login({ name: 'أحمد محمد', email: 'manager@gov.sa', role: 'مدير' });
  });

  document.getElementById('btn-analyst')?.addEventListener('click', () => {
    login({ name: 'سارة خالد', email: 'analyst@gov.sa', role: 'محلل بيانات' });
  });
}
