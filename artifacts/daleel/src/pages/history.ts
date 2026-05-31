import { showModal } from '../components/modal';

const questions = [
  'كم عدد المعاملات المكتملة هذا الشهر؟',
  'ما أكثر الإدارات استقبالاً للطلبات؟',
  'كم عدد الرخص الصادرة؟',
  'ما نسبة إنجاز الطلبات؟',
  'متوسط زمن الإنجاز'
];
const users = ['أحمد محمد', 'سارة خالد', 'فهد عبدالله', 'نورة سعد', 'الإدارة العليا'];
const sources = ['نظام المعاملات', 'نظام الموارد البشرية', 'نظام الرخص'];

const allHistory = Array.from({ length: 30 }).map((_, i) => ({
  id: 1000 + i,
  question: questions[i % questions.length],
  user: users[i % users.length],
  date: '٢٠٢٦/٠٥/' + String((i % 28) + 1).padStart(2, '0'),
  source: sources[i % sources.length],
  execTime: (Math.random() * 2 + 0.4).toFixed(1) + ' ث',
  status: i % 7 === 0 ? 'فشل' : 'ناجح',
  confidence: Math.floor(Math.random() * 15 + 85) + '٪'
}));

let currentPage = 1;
const pageSize = 10;
let searchTerm = '';
let dateFilter = 'all';
let sortCol = 'id';
let sortDir: 'asc' | 'desc' = 'desc';

export function renderHistory(container: HTMLElement) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <h1>سجل الاستعلامات</h1>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <input type="text" id="hist-search" class="input" placeholder="بحث في السجل..." style="width: 300px;">
        <select id="hist-date-filter" class="input" style="width: 150px;">
          <option value="all">الكل</option>
          <option value="today">اليوم</option>
          <option value="week">هذا الأسبوع</option>
          <option value="month">هذا الشهر</option>
        </select>
      </div>
    </div>

    <div class="card table-container">
      <table>
        <thead>
          <tr>
            <th class="sortable" data-col="id" style="cursor: pointer;">رقم <span>▼</span></th>
            <th class="sortable" data-col="question" style="cursor: pointer;">السؤال <span></span></th>
            <th class="sortable" data-col="user" style="cursor: pointer;">المستخدم <span></span></th>
            <th class="sortable" data-col="date" style="cursor: pointer;">التاريخ <span></span></th>
            <th>الحالة</th>
            <th>المصدر</th>
            <th>وقت التنفيذ</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody id="hist-tbody">
        </tbody>
      </table>
      
      <div id="hist-pagination" style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border);">
      </div>
    </div>
  `;

  const tbody = document.getElementById('hist-tbody')!;
  const pagination = document.getElementById('hist-pagination')!;
  const searchInput = document.getElementById('hist-search') as HTMLInputElement;
  const dateSelect = document.getElementById('hist-date-filter') as HTMLSelectElement;

  function getFilteredSorted() {
    let filtered = [...allHistory];
    
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(h => 
        h.question.toLowerCase().includes(lower) || 
        h.user.toLowerCase().includes(lower)
      );
    }

    if (dateFilter === 'today') {
      filtered = filtered.slice(0, 3);
    } else if (dateFilter === 'week') {
      filtered = filtered.slice(0, 10);
    }

    filtered.sort((a: any, b: any) => {
      let valA = a[sortCol];
      let valB = b[sortCol];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  function renderTable() {
    const data = getFilteredSorted();
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
    
    const start = (currentPage - 1) * pageSize;
    const paginated = data.slice(start, start + pageSize);

    tbody.innerHTML = paginated.length ? paginated.map(item => `
      <tr class="clickable hist-row" data-id="${item.id}">
        <td style="color: var(--color-muted);">#${item.id}</td>
        <td style="font-weight: 500;">${item.question}</td>
        <td>${item.user}</td>
        <td>${item.date}</td>
        <td>
          <span class="badge ${item.status === 'ناجح' ? 'badge-green' : 'badge-danger'}" style="${item.status === 'فشل' ? 'background: #FECACA; color: #991B1B;' : ''}">
            ${item.status}
          </span>
        </td>
        <td><span class="badge badge-blue">${item.source}</span></td>
        <td style="color: var(--color-muted);">${item.execTime}</td>
        <td><button class="btn btn-secondary btn-details" data-id="${item.id}" style="padding: 4px 8px; font-size: 12px;">التفاصيل</button></td>
      </tr>
    `).join('') : `<tr><td colspan="8"><div class="empty-state">لا توجد نتائج مطابقة للبحث</div></td></tr>`;

    // Update headers
    document.querySelectorAll('.sortable').forEach(th => {
      const col = th.getAttribute('data-col');
      const span = th.querySelector('span')!;
      if (col === sortCol) {
        span.textContent = sortDir === 'asc' ? '▲' : '▼';
      } else {
        span.textContent = '';
      }
    });

    // Pagination
    const end = Math.min(start + pageSize, total);
    pagination.innerHTML = total > 0 ? `
      <span style="color: var(--color-muted);">عرض ${start + 1} إلى ${end} من ${total}</span>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-secondary page-prev" ${currentPage === 1 ? 'disabled' : ''}>السابق</button>
        <button class="btn btn-primary">${currentPage}</button>
        <button class="btn btn-secondary page-next" ${currentPage === totalPages ? 'disabled' : ''}>التالي</button>
      </div>
    ` : '<span></span>';

    attachRowListeners();
  }

  function attachRowListeners() {
    document.querySelectorAll('.hist-row, .btn-details').forEach(el => {
      el.addEventListener('click', (e) => {
        // Prevent double trigger if clicking button
        if (el.classList.contains('hist-row') && (e.target as HTMLElement).tagName === 'BUTTON') return;
        
        const id = parseInt(el.getAttribute('data-id') || '0');
        const item = allHistory.find(h => h.id === id);
        if (item) {
          showModal(
            'تفاصيل الاستعلام',
            `
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="background: var(--color-background); padding: 16px; border-radius: var(--radius);">
                  <div style="color: var(--color-muted); font-size: 12px; margin-bottom: 4px;">السؤال الكامل</div>
                  <div style="font-size: 16px; font-weight: 600; color: var(--color-primary);">${item.question}</div>
                </div>
                
                <div style="background: var(--color-background); padding: 16px; border-radius: var(--radius);">
                  <div style="color: var(--color-muted); font-size: 12px; margin-bottom: 4px;">الإجابة الملخصة</div>
                  <div style="font-size: 14px;">تم العثور على النتائج المطابقة في قواعد البيانات وعرضها بنجاح مع مستوى دقة مرتفع. الإجراءات المتبعة توافقت مع السياسات.</div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div style="border: 1px solid var(--color-border); padding: 12px; border-radius: var(--radius);">
                    <div style="color: var(--color-muted); font-size: 12px;">المستخدم</div>
                    <div style="font-weight: 600;">${item.user}</div>
                  </div>
                  <div style="border: 1px solid var(--color-border); padding: 12px; border-radius: var(--radius);">
                    <div style="color: var(--color-muted); font-size: 12px;">التاريخ</div>
                    <div style="font-weight: 600;">${item.date}</div>
                  </div>
                  <div style="border: 1px solid var(--color-border); padding: 12px; border-radius: var(--radius);">
                    <div style="color: var(--color-muted); font-size: 12px;">مستوى الثقة</div>
                    <div style="font-weight: 600; color: var(--color-success);">${item.confidence}</div>
                  </div>
                  <div style="border: 1px solid var(--color-border); padding: 12px; border-radius: var(--radius);">
                    <div style="color: var(--color-muted); font-size: 12px;">وقت التنفيذ</div>
                    <div style="font-weight: 600;">${item.execTime}</div>
                  </div>
                  <div style="border: 1px solid var(--color-border); padding: 12px; border-radius: var(--radius); grid-column: span 2;">
                    <div style="color: var(--color-muted); font-size: 12px;">المصدر</div>
                    <div style="font-weight: 600;">${item.source}</div>
                  </div>
                </div>
              </div>
            `
          );
        }
      });
    });

    const prevBtn = pagination.querySelector('.page-prev');
    const nextBtn = pagination.querySelector('.page-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { currentPage--; renderTable(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { currentPage++; renderTable(); });
  }

  searchInput.addEventListener('input', (e) => {
    searchTerm = (e.target as HTMLInputElement).value;
    currentPage = 1;
    renderTable();
  });

  dateSelect.addEventListener('change', (e) => {
    dateFilter = (e.target as HTMLSelectElement).value;
    currentPage = 1;
    renderTable();
  });

  document.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.getAttribute('data-col') || 'id';
      if (sortCol === col) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        sortCol = col;
        sortDir = 'asc';
      }
      renderTable();
    });
  });

  renderTable();
}