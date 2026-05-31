export function renderResults(container: HTMLElement) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;gap:16px;">
      <div style="width:72px;height:72px;border-radius:50%;background:#F1F5F9;display:flex;align-items:center;justify-content:center;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </div>
      <h2 style="font-size:18px;color:var(--color-text);">لا توجد نتائج للعرض</h2>
      <p style="color:var(--color-muted);font-size:14px;max-width:360px;line-height:1.8;">
        ستظهر تفاصيل الاستعلام هنا بعد ربط النظام بمصادر البيانات الحقيقية
      </p>
      <button class="btn btn-primary" onclick="window.location.hash='#chat'">ابدأ محادثة جديدة</button>
    </div>
  `;
}
