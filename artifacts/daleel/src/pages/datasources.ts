import { showToast } from '../components/toast';
import { showModal } from '../components/modal';

const sources = [
  { name:'نظام المعاملات', type:'API REST', records:'٤٥,٢٣١', lastUpdate:'منذ ٥ دقائق', status:'متصل', health: 98 },
  { name:'نظام الموارد البشرية', type:'قاعدة بيانات', records:'١,٢٤٧', lastUpdate:'منذ ١٠ دقائق', status:'متصل', health: 95 },
  { name:'نظام الخدمات الإلكترونية', type:'API REST', records:'٨٩,٤٣٢', lastUpdate:'منذ ٣٠ دقيقة', status:'متصل', health: 91 },
  { name:'نظام الرخص', type:'قاعدة بيانات', records:'١٢,٦٧٨', lastUpdate:'منذ ساعة', status:'تحت الصيانة', health: 45 },
  { name:'نظام الشكاوى', type:'ملف CSV', records:'٣,٤٥٦', lastUpdate:'منذ يومين', status:'غير متصل', health: 0 },
];

export function renderDataSources(container: HTMLElement) {
  let viewMode: 'cards' | 'table' = 'cards';

  function render() {
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <h1>إدارة مصادر البيانات</h1>
        <div style="display: flex; gap: 16px; align-items: center;">
          <div class="view-toggle">
            <button class="${viewMode === 'cards' ? 'active' : ''}" id="btn-view-cards">بطاقات</button>
            <button class="${viewMode === 'table' ? 'active' : ''}" id="btn-view-table">جدول</button>
          </div>
          <button class="btn btn-primary" id="btn-add-source">إضافة مصدر جديد</button>
        </div>
      </div>
      
      <div id="sources-content">
        ${viewMode === 'cards' ? renderCards() : renderTable()}
      </div>
    `;

    document.getElementById('btn-view-cards')?.addEventListener('click', () => { viewMode = 'cards'; render(); });
    document.getElementById('btn-view-table')?.addEventListener('click', () => { viewMode = 'table'; render(); });

    document.getElementById('btn-add-source')?.addEventListener('click', () => {
      showModal(
        'إضافة مصدر بيانات جديد',
        `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 8px;">اسم المصدر</label>
              <input type="text" id="new-source-name" class="input" placeholder="مثال: نظام الأرشيف">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px;">نوع الربط</label>
              <select id="new-source-type" class="input">
                <option>API REST</option>
                <option>قاعدة بيانات (Database)</option>
                <option>ملف (CSV/Excel)</option>
              </select>
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px;">رابط الـ API / سلسلة الاتصال</label>
              <input type="text" id="new-source-conn" class="input" placeholder="https://api.example.gov.sa/v1/..." style="direction: ltr;">
            </div>
            <button class="btn btn-secondary" id="btn-test-conn" style="width: 100%;">اختبار الاتصال</button>
          </div>
        `,
        () => {
          const name = (document.getElementById('new-source-name') as HTMLInputElement)?.value?.trim();
          const type = (document.getElementById('new-source-type') as HTMLSelectElement)?.value;
          if (!name) { showToast('يرجى إدخال اسم المصدر', 'error'); return; }
          sources.unshift({
            name,
            type,
            records: '—',
            lastUpdate: 'لم يتم المزامنة بعد',
            status: 'غير متصل',
            health: 0,
          });
          showToast('تمت إضافة المصدر بنجاح', 'success');
          render();
        }
      );

      document.getElementById('btn-test-conn')?.addEventListener('click', (e) => {
        const btn = e.target as HTMLButtonElement;
        btn.textContent = 'جاري الاختبار...';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'الاتصال ناجح ✔';
          btn.style.background = '#D1FAE5';
          btn.style.color = '#065F46';
          showToast('تم الاتصال بنجاح', 'success');
        }, 1500);
      });
    });

    document.querySelectorAll('.sync-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const b = e.target as HTMLButtonElement;
        const originalText = b.textContent;
        b.textContent = 'جاري المزامنة...';
        b.disabled = true;
        showToast('تم بدء مزامنة البيانات...', 'info');
        setTimeout(() => {
          b.textContent = originalText;
          b.disabled = false;
          showToast('اكتملت المزامنة بنجاح!', 'success');
        }, 2000);
      });
    });

    document.querySelectorAll('.details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt((e.target as HTMLElement).getAttribute('data-idx') || '0');
        const s = sources[idx];
        showModal('تفاصيل الاتصال', `
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <p><strong>المصدر:</strong> ${s.name}</p>
            <p><strong>النوع:</strong> ${s.type}</p>
            <p><strong>السجلات:</strong> ${s.records}</p>
            <p><strong>الحالة:</strong> ${s.status}</p>
            <p><strong>الصحة:</strong> ${s.health}٪</p>
          </div>
        `);
      });
    });
  }

  function renderCards() {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
        ${sources.map((source, i) => {
          const isConnected = source.status === 'متصل';
          const isMaintenance = source.status === 'تحت الصيانة';
          const badgeClass = isConnected ? 'badge-green' : isMaintenance ? 'badge-orange' : 'badge-danger';
          const fillClass = isConnected ? '' : isMaintenance ? 'warning' : 'danger';
          
          return `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                <div>
                  <h3 style="font-size: 18px; color: var(--color-primary);">${source.name}</h3>
                  <div style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">${source.type}</div>
                </div>
                <span class="badge ${badgeClass}" style="${!isConnected && !isMaintenance ? 'background: #FECACA; color: #991B1B;' : ''}">● ${source.status}</span>
              </div>
              
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--color-muted); margin-bottom: 4px;">
                  <span>صحة الاتصال</span>
                  <span>${source.health}٪</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill ${fillClass}" style="width: ${source.health}%;"></div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--color-border); padding-bottom: 8px;">
                  <span style="color: var(--color-muted);">عدد السجلات:</span>
                  <span style="font-weight: 600;">${source.records}</span>
                </div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--color-border); padding-bottom: 8px;">
                  <span style="color: var(--color-muted);">آخر تحديث:</span>
                  <span style="font-weight: 500; color: var(--color-text);">${source.lastUpdate}</span>
                </div>
              </div>
              
              <div style="display: flex; gap: 12px;">
                <button class="btn btn-secondary sync-btn" style="flex: 1;">مزامنة</button>
                <button class="btn btn-secondary details-btn" data-idx="${i}" style="padding: 8px 16px;">التفاصيل</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderTable() {
    return `
      <div class="card table-container">
        <table>
          <thead>
            <tr>
              <th>اسم المصدر</th>
              <th>نوع الاتصال</th>
              <th>عدد السجلات</th>
              <th>آخر تحديث</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            ${sources.map((s, i) => {
              const isConnected = s.status === 'متصل';
              const isMaintenance = s.status === 'تحت الصيانة';
              const badgeClass = isConnected ? 'badge-green' : isMaintenance ? 'badge-orange' : 'badge-danger';
              return `
                <tr>
                  <td style="font-weight: 600; color: var(--color-primary);">${s.name}</td>
                  <td>${s.type}</td>
                  <td>${s.records}</td>
                  <td style="color: var(--color-muted);">${s.lastUpdate}</td>
                  <td><span class="badge ${badgeClass}" style="${!isConnected && !isMaintenance ? 'background: #FECACA; color: #991B1B;' : ''}">● ${s.status}</span></td>
                  <td>
                    <div style="display: flex; gap: 8px;">
                      <button class="btn btn-secondary sync-btn" style="padding: 4px 12px; font-size: 12px;">مزامنة</button>
                      <button class="btn btn-secondary details-btn" data-idx="${i}" style="padding: 4px 12px; font-size: 12px;">التفاصيل</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  render();
}