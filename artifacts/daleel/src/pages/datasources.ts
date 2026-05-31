import { mockData } from '../data';
import { showToast } from '../components/toast';
import { showModal } from '../components/modal';

export function renderDataSources(container: HTMLElement) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h1>إدارة مصادر البيانات</h1>
      <button class="btn btn-primary" id="btn-add-source">إضافة مصدر جديد ➕</button>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
      ${mockData.sources.map(source => {
        const isConnected = source.status === 'متصل';
        const badgeClass = isConnected ? 'badge-green' : 'badge-orange';
        
        return `
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
              <h3 style="font-size: 18px; color: var(--color-primary);">${source.name}</h3>
              <span class="badge ${badgeClass}">● ${source.status}</span>
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
              <button class="btn btn-secondary sync-btn" style="flex: 1;">مزامنة الآن 🔄</button>
              <button class="btn btn-secondary" style="color: var(--color-danger); padding: 8px;">تعطيل</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  document.getElementById('btn-add-source')?.addEventListener('click', () => {
    showModal(
      'إضافة مصدر بيانات جديد',
      `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 8px;">اسم المصدر</label>
            <input type="text" class="input" placeholder="مثال: نظام الأرشيف">
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px;">نوع الربط</label>
            <select class="input">
              <option>API</option>
              <option>قاعدة بيانات (Database)</option>
              <option>ملف (CSV/Excel)</option>
            </select>
          </div>
        </div>
      `,
      () => {
        showToast('تمت إضافة المصدر بنجاح', 'success');
      }
    );
  });

  document.querySelectorAll('.sync-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('تم بدء مزامنة البيانات...', 'info');
      setTimeout(() => {
        showToast('اكتملت المزامنة بنجاح!', 'success');
      }, 2000);
    });
  });
}
