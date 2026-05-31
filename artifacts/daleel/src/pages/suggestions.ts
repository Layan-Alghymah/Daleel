export function renderSuggestions(container: HTMLElement) {
  container.innerHTML = `
    <h1>اقتراحات الأسئلة</h1>
    <p style="margin-bottom: 32px;">يمكنك البدء بطرح أحد الأسئلة الشائعة التالية على المساعد الذكي.</p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
      ${[
        { text: 'كم عدد الطلبات هذا الشهر؟', category: 'الطلبات' },
        { text: 'ما أكثر الإدارات نشاطاً؟', category: 'الإدارات' },
        { text: 'ما متوسط زمن الإنجاز؟', category: 'الأداء' },
        { text: 'كم عدد المعاملات المكتملة؟', category: 'المعاملات' },
        { text: 'ما أكثر الخدمات استخداماً؟', category: 'الخدمات' },
        { text: 'كم عدد الموظفين الفعليين؟', category: 'الموارد البشرية' },
        { text: 'ما نسبة إنجاز الطلبات؟', category: 'الأداء' },
        { text: 'ما أكثر الشكاوى تكراراً؟', category: 'الشكاوى' },
      ].map(q => `
        <div class="card" style="cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--color-primary)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='var(--color-border)'; this.style.transform='translateY(0)';">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
            <span class="badge badge-blue">${q.category}</span>
            <span style="color: var(--color-muted);">💡</span>
          </div>
          <h3 style="margin-bottom: 8px;">${q.text}</h3>
          <a href="#chat" class="btn btn-secondary" style="width: 100%; margin-top: 16px;" onclick="sessionStorage.setItem('daleel_initial_query', '${q.text}')">طرح السؤال</a>
        </div>
      `).join('')}
    </div>
  `;
}
