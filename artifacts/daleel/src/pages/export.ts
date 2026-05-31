import { showToast } from '../components/toast';

export function renderExport(container: HTMLElement) {
  container.innerHTML = `
    <h1>تصدير النتائج</h1>
    <p style="margin-bottom: 32px;">قم بتصدير البيانات والتقارير بالصيغة المناسبة لاحتياجاتك.</p>
    
    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
      <div class="card" style="height: fit-content;">
        <h3 style="margin-bottom: 24px;">خيارات التصدير</h3>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">نوع التقرير</label>
          <select class="input">
            <option>ملخص الاستعلامات</option>
            <option>سجل المعاملات التفصيلي</option>
            <option>تقرير أداء الإدارات</option>
            <option>إحصائيات مصادر البيانات</option>
          </select>
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">الفترة الزمنية</label>
          <select class="input">
            <option>آخر ٧ أيام</option>
            <option>الشهر الحالي</option>
            <option>الربع الحالي</option>
            <option>السنة الحالية</option>
            <option>تخصيص...</option>
          </select>
        </div>
        
        <div style="margin-bottom: 32px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">الصيغة</label>
          <div style="display: flex; gap: 16px;">
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="radio" name="format" value="pdf" checked> PDF
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="radio" name="format" value="excel"> Excel
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="radio" name="format" value="csv"> CSV
            </label>
          </div>
        </div>
        
        <button id="btn-export" class="btn btn-primary" style="width: 100%;">تصدير التقرير 📥</button>
      </div>
      
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3>معاينة التقرير</h3>
          <span class="badge badge-blue">ملخص الاستعلامات</span>
        </div>
        
        <div style="background: var(--color-background); padding: 24px; border-radius: var(--radius); border: 1px solid var(--color-border); height: 400px; overflow-y: auto;">
          <h2 style="text-align: center; margin-bottom: 24px; color: var(--color-primary);">تقرير ملخص الاستعلامات</h2>
          <p style="text-align: center; color: var(--color-muted); margin-bottom: 32px;">الفترة: آخر ٧ أيام</p>
          
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--color-muted);">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <p style="font-weight:600;color:var(--color-text);">لا توجد بيانات للمعاينة</p>
            <p style="font-size:13px;">اختر نوع التقرير والفترة ثم اضغط تصدير</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-export')?.addEventListener('click', () => {
    showToast('جاري تحضير الملف للتصدير...', 'info');
    setTimeout(() => {
      showToast('تم تصدير التقرير بنجاح!', 'success');
    }, 2000);
  });
}
