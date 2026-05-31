import { mockData } from '../data';

export function renderHistory(container: HTMLElement) {
  const history = Array.from({ length: 30 }).map((_, i) => ({
    id: 1000 + i,
    question: [
      'كم عدد المعاملات المكتملة هذا الشهر؟',
      'ما أكثر الإدارات استقبالاً للطلبات؟',
      'كم عدد الرخص الصادرة؟',
      'ما نسبة إنجاز الطلبات؟',
      'متوسط زمن الإنجاز'
    ][i % 5],
    user: ['أحمد محمد', 'سارة خالد', 'فهد عبدالله', 'نورة سعد', 'الإدارة العليا'][i % 5],
    date: `٢٠٢٣/١٠/${(i % 30) + 1}`,
    source: ['نظام المعاملات', 'نظام الموارد البشرية', 'نظام الرخص'][i % 3],
    time: (Math.random() * 2 + 0.5).toFixed(1) + ' ثانية'
  }));

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h1>سجل الاستعلامات</h1>
      <div style="display: flex; gap: 16px;">
        <input type="text" class="input" placeholder="بحث في السجل..." style="width: 300px;">
        <select class="input" style="width: 150px;">
          <option>اليوم</option>
          <option>هذا الأسبوع</option>
          <option>هذا الشهر</option>
          <option>الكل</option>
        </select>
      </div>
    </div>

    <div class="card table-container">
      <table>
        <thead>
          <tr>
            <th>رقم</th>
            <th>السؤال</th>
            <th>المستخدم</th>
            <th>التاريخ</th>
            <th>المصدر</th>
            <th>وقت التنفيذ</th>
          </tr>
        </thead>
        <tbody>
          ${history.map(item => `
            <tr>
              <td style="color: var(--color-muted);">#${item.id}</td>
              <td style="font-weight: 500;">${item.question}</td>
              <td>${item.user}</td>
              <td>${item.date}</td>
              <td><span class="badge badge-blue">${item.source}</span></td>
              <td style="color: var(--color-muted);">${item.time}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border);">
        <span style="color: var(--color-muted);">عرض ١ إلى ١٠ من ٣٠</span>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary">السابق</button>
          <button class="btn btn-primary">١</button>
          <button class="btn btn-secondary">٢</button>
          <button class="btn btn-secondary">٣</button>
          <button class="btn btn-secondary">التالي</button>
        </div>
      </div>
    </div>
  `;
}
