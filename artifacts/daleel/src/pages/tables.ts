import { mockData } from '../data';

export function renderTables(container: HTMLElement) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h1>الجداول والبيانات التفصيلية</h1>
      <div style="display: flex; gap: 16px;">
        <input type="text" id="table-search" class="input" placeholder="بحث في المعاملات..." style="width: 300px;">
        <button class="btn btn-secondary">تصدير 📥</button>
      </div>
    </div>

    <div class="card table-container">
      <table id="data-table">
        <thead>
          <tr>
            <th style="cursor: pointer;">رقم المعاملة ↕</th>
            <th style="cursor: pointer;">الإدارة ↕</th>
            <th style="cursor: pointer;">الحالة ↕</th>
            <th style="cursor: pointer;">التاريخ ↕</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody id="table-body">
          <!-- Populated by JS -->
        </tbody>
      </table>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border);">
        <span style="color: var(--color-muted);" id="table-info">عرض ١ إلى ١٠ من ٥٠</span>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary" id="btn-prev">السابق</button>
          <button class="btn btn-secondary" id="btn-next">التالي</button>
        </div>
      </div>
    </div>
  `;

  let currentPage = 1;
  const itemsPerPage = 10;
  let currentData = [...mockData.transactions];

  const renderRows = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = currentData.slice(start, end);
    
    const tbody = document.getElementById('table-body')!;
    tbody.innerHTML = pageData.map(row => {
      let badgeClass = 'badge-blue';
      if (row.status === 'مكتمل') badgeClass = 'badge-green';
      if (row.status === 'مرفوض') badgeClass = 'badge-orange'; // Should be danger but using orange for now
      
      return `
        <tr>
          <td style="font-weight: 500;">${row.id}</td>
          <td>${row.department}</td>
          <td><span class="badge ${badgeClass}">${row.status}</span></td>
          <td>${row.date}</td>
          <td><button class="btn btn-secondary" style="padding: 4px 8px; font-size: 12px;">عرض</button></td>
        </tr>
      `;
    }).join('');

    const info = document.getElementById('table-info')!;
    info.innerText = `عرض ${start + 1} إلى ${Math.min(end, currentData.length)} من ${currentData.length}`;
  };

  renderRows();

  document.getElementById('table-search')?.addEventListener('input', (e) => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    currentData = mockData.transactions.filter(t => 
      t.id.toLowerCase().includes(term) || 
      t.department.toLowerCase().includes(term) ||
      t.status.toLowerCase().includes(term)
    );
    currentPage = 1;
    renderRows();
  });

  document.getElementById('btn-prev')?.addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; renderRows(); }
  });

  document.getElementById('btn-next')?.addEventListener('click', () => {
    if (currentPage * itemsPerPage < currentData.length) { currentPage++; renderRows(); }
  });
}
