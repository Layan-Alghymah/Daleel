import { login } from '../state';

export function renderLogin(container: HTMLElement) {
  renderLoginView(container);
}

/* ══ Login view ══════════════════════════════════════════ */
function renderLoginView(container: HTMLElement) {
  container.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--color-background);width:100%;">
      <div class="card" style="width:100%;max-width:400px;text-align:center;">
        <div style="text-align:right;margin-bottom:8px;">
          <a href="#" style="display:inline-flex;align-items:center;gap:6px;color:var(--color-muted);text-decoration:none;font-size:13px;transition:color 0.15s;"
             onmouseover="this.style.color='var(--color-primary)'" onmouseout="this.style.color='var(--color-muted)'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            رجوع للرئيسية
          </a>
        </div>

        <img src="/logo.png" alt="دليل" style="width:80px;margin-bottom:16px;" onerror="this.style.display='none'">
        <h1 style="margin-bottom:8px;">دليل</h1>
        <p style="margin-bottom:32px;">مساعد الاستعلام الذكي للبيانات المؤسسية</p>

        <form id="login-form" style="text-align:right;">
          <div style="margin-bottom:16px;">
            <label style="display:block;margin-bottom:8px;font-weight:500;">البريد الإلكتروني</label>
            <input type="email" id="email" class="input" placeholder="admin@gov.sa" required>
          </div>
          <div style="margin-bottom:24px;">
            <label style="display:block;margin-bottom:8px;font-weight:500;">كلمة المرور</label>
            <input type="password" id="password" class="input" placeholder="••••••" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;margin-bottom:16px;">تسجيل الدخول</button>
          <div style="text-align:center;">
            <button type="button" id="forgot-btn" style="background:none;border:none;color:var(--color-secondary);font-size:14px;cursor:pointer;font-family:inherit;padding:0;">نسيت كلمة المرور؟</button>
          </div>
        </form>

        <hr style="border:0;border-top:1px solid var(--color-border);margin:24px 0;">
        <p style="font-size:12px;margin-bottom:12px;">حسابات تجريبية:</p>
        <div style="display:flex;gap:8px;justify-content:center;">
          <button id="btn-admin"    class="btn btn-secondary" style="font-size:12px;padding:4px 8px;">دخول كقائد</button>
          <button id="btn-manager"  class="btn btn-secondary" style="font-size:12px;padding:4px 8px;">دخول كمدير</button>
          <button id="btn-analyst"  class="btn btn-secondary" style="font-size:12px;padding:4px 8px;">دخول كمحلل</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    login({ name: 'الإدارة العليا', email: 'admin@gov.sa', role: 'قائد' });
  });
  document.getElementById('btn-admin')?.addEventListener('click',   () => login({ name: 'مسؤول النظام', email: 'admin@gov.sa',   role: 'قائد' }));
  document.getElementById('btn-manager')?.addEventListener('click', () => login({ name: 'أحمد محمد',    email: 'manager@gov.sa', role: 'مدير' }));
  document.getElementById('btn-analyst')?.addEventListener('click', () => login({ name: 'سارة خالد',    email: 'analyst@gov.sa', role: 'محلل بيانات' }));
  document.getElementById('forgot-btn')?.addEventListener('click',  () => renderForgotView(container));
}

/* ══ Forgot password view ════════════════════════════════ */
function renderForgotView(container: HTMLElement) {
  container.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--color-background);width:100%;">
      <div class="card" style="width:100%;max-width:400px;text-align:center;">
        <div style="text-align:right;margin-bottom:20px;">
          <button id="back-to-login" style="display:inline-flex;align-items:center;gap:6px;background:none;border:none;color:var(--color-muted);font-size:13px;cursor:pointer;font-family:inherit;padding:0;transition:color 0.15s;"
                  onmouseover="this.style.color='var(--color-primary)'" onmouseout="this.style.color='var(--color-muted)'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            رجوع لتسجيل الدخول
          </button>
        </div>

        <div style="width:56px;height:56px;border-radius:50%;background:#EFF6FF;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        <h2 style="margin-bottom:8px;font-size:20px;">إعادة تعيين كلمة المرور</h2>
        <p style="margin-bottom:28px;color:var(--color-muted);font-size:14px;line-height:1.7;">
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
        </p>

        <form id="forgot-form" style="text-align:right;">
          <div style="margin-bottom:24px;">
            <label style="display:block;margin-bottom:8px;font-weight:500;">البريد الإلكتروني</label>
            <input type="email" id="forgot-email" class="input" placeholder="admin@gov.sa" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;">إرسال رابط الاستعادة</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('back-to-login')?.addEventListener('click', () => renderLoginView(container));
  document.getElementById('forgot-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('forgot-email') as HTMLInputElement)?.value || '';
    renderForgotSuccessView(container, email);
  });
}

/* ══ Forgot password success view ════════════════════════ */
function renderForgotSuccessView(container: HTMLElement, email: string) {
  container.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--color-background);width:100%;">
      <div class="card" style="width:100%;max-width:400px;text-align:center;">

        <div style="width:72px;height:72px;border-radius:50%;background:#F0FDF4;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h2 style="margin-bottom:12px;font-size:20px;color:var(--color-text);">تم الإرسال بنجاح</h2>
        <p style="color:var(--color-muted);font-size:14px;line-height:1.8;margin-bottom:8px;">
          تم إرسال رابط إعادة تعيين كلمة المرور إلى
        </p>
        <p style="font-weight:700;color:var(--color-primary);font-size:15px;margin-bottom:28px;direction:ltr;">${email}</p>

        <div style="padding:16px;background:#F0FDF4;border-radius:var(--radius);border:1px solid #A7F3D0;margin-bottom:28px;text-align:right;">
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
            <p style="font-size:13px;color:#065F46;margin:0;line-height:1.7;">
              إذا لم يصلك البريد خلال دقيقتين، تحقق من مجلد الـ Spam أو أعد المحاولة.
            </p>
          </div>
        </div>

        <button id="back-login-final" class="btn btn-primary" style="width:100%;margin-bottom:12px;">العودة لتسجيل الدخول</button>
        <button id="resend-btn" class="btn btn-secondary" style="width:100%;">إعادة الإرسال</button>
      </div>
    </div>
  `;

  document.getElementById('back-login-final')?.addEventListener('click', () => renderLoginView(container));
  document.getElementById('resend-btn')?.addEventListener('click',       () => renderForgotView(container));
}
