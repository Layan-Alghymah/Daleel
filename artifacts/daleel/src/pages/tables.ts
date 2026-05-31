export function renderTables(container: HTMLElement) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h1>الجداول والبيانات التفصيلية</h1>
      <div style="display: flex; gap: 16px;">
        <input type="text" id="table-search" class="input" placeholder="بحث في المعاملات..." style="width: 300px;" disabled>
        <button class="btn btn-secondary" disabled>تصدير</button>
      </div>
    </div>

    <div class="card table-container">
      <table id="data-table">
        <thead>
          <tr>
            <th>رقم المعاملة</th>
            <th>الإدارة</th>
            <th>الحالة</th>
            <th>التاريخ</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody id="table-body">
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border);">
        <span style="color: var(--color-muted);" id="table-info"></span>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary" id="btn-prev" disabled>السابق</button>
          <button class="btn btn-secondary" id="btn-next" disabled>التالي</button>
        </div>
      </div>
    </div>
  `;

  const tbody = document.getElementById('table-body')!;
  tbody.innerHTML = `
    <tr>
      <td colspan="5">
        <div class="empty-state" style="padding: 48px 0;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px;">
            <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/>
          </svg>
          <p style="font-weight:600;margin-bottom:6px;">لا توجد بيانات</p>
          <p style="font-size:13px;color:var(--color-muted);">ستظهر البيانات هنا بعد ربط المصادر من API</p>
        </div>
      </td>
    </tr>
  `;
}
