export function renderResults(container: HTMLElement) {
  container.innerHTML = `
    <h1>نتائج البحث التفصيلية</h1>
    <p style="margin-bottom: 32px;">تفاصيل الاستعلام الأخير</p>
    
    <div class="card" style="margin-bottom: 24px;">
      <h3 style="margin-bottom: 16px; color: var(--color-primary);">السؤال المطروح:</h3>
      <p style="font-size: 18px; font-weight: 500;">كم عدد المعاملات المكتملة هذا الشهر؟</p>
    </div>
    
    <div class="card" style="margin-bottom: 24px; background: var(--color-background); border: none;">
      <h3 style="margin-bottom: 16px; color: var(--color-primary);">الإجابة:</h3>
      <p style="font-size: 16px; line-height: 1.8;">
        بناءً على البيانات المستخرجة من نظام المعاملات، يبلغ عدد المعاملات المكتملة هذا الشهر ١٢,٤٥٦ معاملة. 
        تمثل هذه المعاملات زيادة بنسبة ٥٪ مقارنة بالشهر الماضي. معظم هذه المعاملات تركزت في إدارة الترخيص تليها الموارد البشرية.
      </p>
    </div>
    
    <div style="display: flex; gap: 16px; margin-bottom: 24px;">
      <div class="card" style="flex: 1;">
        <span style="color: var(--color-muted); display: block; margin-bottom: 4px;">المصدر</span>
        <span style="font-weight: 600;">نظام المعاملات</span>
      </div>
      <div class="card" style="flex: 1;">
        <span style="color: var(--color-muted); display: block; margin-bottom: 4px;">مستوى الثقة</span>
        <span style="font-weight: 600; color: var(--color-success);">٩٢٪</span>
      </div>
      <div class="card" style="flex: 1;">
        <span style="color: var(--color-muted); display: block; margin-bottom: 4px;">وقت التنفيذ</span>
        <span style="font-weight: 600;">١.٢ ثانية</span>
      </div>
    </div>
    
    <button class="btn btn-primary" onclick="window.history.back()">العودة</button>
  `;
}
