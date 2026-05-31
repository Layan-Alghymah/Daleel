import Chart from 'chart.js/auto';

export function renderChat(container: HTMLElement) {
  container.innerHTML = `
    <div class="chat-container" style="position: relative; height: calc(100vh - 100px);">
      <div class="chat-messages" id="chat-messages" style="padding-bottom: 100px;">
        <div class="card" style="margin: 0 auto; max-width: 700px; width: 100%; text-align: center; border: none; box-shadow: none; background: transparent;" id="chat-suggestions">
          <img src="/logo.png" alt="دليل" style="width: 80px; margin-bottom: 24px;" onerror="this.style.display='none'">
          <h2 style="margin-bottom: 8px; font-size: 24px; color: var(--color-primary);">مرحباً، كيف يمكنني مساعدتك؟</h2>
          <p style="margin-bottom: 32px; color: var(--color-muted); font-size: 16px;">اسأل عن أي بيانات في المنظومة الحكومية وسأوفر لك التحليل الفوري</p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; text-align: right;">
            <div class="card suggestion-card" style="cursor: pointer; transition: all 0.2s;">
              <div style="color: var(--color-primary); margin-bottom: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
              <div style="font-weight: 500;">كم عدد المعاملات المكتملة هذا الشهر؟</div>
            </div>
            <div class="card suggestion-card" style="cursor: pointer; transition: all 0.2s;">
              <div style="color: var(--color-secondary); margin-bottom: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>
              <div style="font-weight: 500;">ما أكثر الإدارات استقبالاً للطلبات؟</div>
            </div>
            <div class="card suggestion-card" style="cursor: pointer; transition: all 0.2s;">
              <div style="color: var(--color-success); margin-bottom: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>
              <div style="font-weight: 500;">كم عدد الرخص الصادرة؟</div>
            </div>
            <div class="card suggestion-card" style="cursor: pointer; transition: all 0.2s;">
              <div style="color: var(--color-accent); margin-bottom: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
              <div style="font-weight: 500;">ما نسبة إنجاز الطلبات؟</div>
            </div>
            <div class="card suggestion-card" style="cursor: pointer; transition: all 0.2s;">
              <div style="color: var(--color-primary); margin-bottom: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
              <div style="font-weight: 500;">ما متوسط زمن الإنجاز؟</div>
            </div>
            <div class="card suggestion-card" style="cursor: pointer; transition: all 0.2s;">
              <div style="color: var(--color-danger); margin-bottom: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
              <div style="font-weight: 500;">ما أكثر الشكاوى تكراراً؟</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input-area" style="position: absolute; bottom: 0; left: 0; right: 0; background: var(--color-surface); z-index: 10;">
        <input type="text" id="chat-input" class="input" placeholder="اسأل دليل عن بيانات المؤسسة..." style="flex: 1; padding: 16px; font-size: 15px;">
        <button id="chat-send" class="btn btn-primary" style="padding: 0 24px;">إرسال</button>
      </div>
    </div>
  `;

  // Add hover effect via JS since it's inline HTML
  document.querySelectorAll('.suggestion-card').forEach(card => {
    (card as HTMLElement).onmouseover = () => card.classList.add('shadow-md', 'border-primary');
    (card as HTMLElement).onmouseout = () => card.classList.remove('shadow-md', 'border-primary');
  });

  const messagesContainer = document.getElementById('chat-messages')!;
  const input = document.getElementById('chat-input') as HTMLInputElement;
  const sendBtn = document.getElementById('chat-send')!;
  const suggestions = document.getElementById('chat-suggestions')!;

  const getMockResponse = (q: string) => {
    if (q.includes('معاملات') || q.includes('مكتمل')) {
      return {
        summary: "بلغ عدد المعاملات المكتملة هذا الشهر ١٢,٤٥٦ معاملة، بزيادة قدرها ٨٪ عن الشهر الماضي.",
        th1: "الإدارة", th2: "المعاملات",
        data: [['إدارة الترخيص', 4321], ['الموارد البشرية', 2134], ['الشؤون المالية', 1876], ['تقنية المعلومات', 1452], ['العلاقات العامة', 987]],
        source: "نظام المعاملات"
      };
    }
    if (q.includes('إدارة') || q.includes('طلبات')) {
      return {
        summary: "إدارة الترخيص هي الأكثر استقبالاً للطلبات بمعدل ٣,٤٥٢ طلب شهرياً.",
        th1: "الإدارة", th2: "الطلبات",
        data: [['إدارة الترخيص', 3452], ['الخدمات الإلكترونية', 2123], ['الموارد البشرية', 1432]],
        source: "نظام الخدمات الإلكترونية"
      };
    }
    if (q.includes('رخص') || q.includes('رخصة')) {
      return {
        summary: "صدر هذا الشهر ٨٧٣ رخصة، منها ٥٤٢ رخصة تجارية و٣٣١ رخصة صناعية.",
        th1: "النوع", th2: "العدد",
        data: [['تجارية', 542], ['صناعية', 331], ['مؤقتة', 118], ['أخرى', 45]],
        source: "نظام الرخص"
      };
    }
    if (q.includes('إنجاز') || q.includes('نسبة')) {
      return {
        summary: "نسبة إنجاز الطلبات خلال الشهر الحالي ٧٨٪، مع تحسن ملحوظ مقارنة بالشهر الماضي (٧٢٪).",
        th1: "الحالة", th2: "النسبة",
        data: [['مكتملة', 78], ['قيد المعالجة', 15], ['مرفوضة', 7]],
        source: "نظام المعاملات"
      };
    }
    if (q.includes('زمن') || q.includes('متوسط')) {
      return {
        summary: "متوسط زمن إنجاز المعاملة ٣.٢ أيام، وهو أفضل من المستهدف البالغ ٥ أيام.",
        th1: "الإدارة", th2: "الأيام",
        data: [['إدارة الترخيص', 4.1], ['الموارد البشرية', 2.3], ['الشؤون المالية', 3.8]],
        source: "نظام المعاملات"
      };
    }
    if (q.includes('شكاوى')) {
      return {
        summary: "أكثر الشكاوى تكراراً هي التأخر في معالجة الطلبات (٣٤٪) والأخطاء الإدارية (٢٢٪).",
        th1: "النوع", th2: "النسبة",
        data: [['تأخر معالجة', 34], ['أخطاء إدارية', 22], ['نقص توثيق', 19], ['أخرى', 25]],
        source: "نظام الشكاوى"
      };
    }
    return {
      summary: "تم تحليل بياناتك وفق أحدث المعلومات المتوفرة في المنظومة الحكومية.",
      th1: "العنصر", th2: "القيمة",
      data: [['عنصر ١', 123], ['عنصر ٢', 456]],
      source: "نظام المعاملات"
    };
  };

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;

    if (suggestions) suggestions.style.display = 'none';

    messagesContainer.innerHTML += `<div class="bubble bubble-user">${text}</div>`;
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const loadingId = 'loading-' + Date.now();
    messagesContainer.innerHTML += `<div id="${loadingId}" class="bubble bubble-ai" style="padding: 0;">
      <div class="ai-loading"><span></span><span></span><span></span></div>
    </div>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      document.getElementById(loadingId)?.remove();
      
      const res = getMockResponse(text);
      const chartId = 'chart-' + Date.now();
      
      const responseHtml = `
        <div class="card bubble-ai" style="max-width: 100%; width: 100%; box-shadow: var(--shadow-sm);">
          <p style="margin-bottom: 16px; color: var(--color-text); font-size: 16px; line-height: 1.8;">
            ${res.summary}
          </p>
          
          <div style="display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
            <span class="badge" style="background: #D1FAE5; color: #065F46;">مستوى الثقة: ٩٢٪</span>
            <span class="badge" style="background: #FEF3C7; color: #92400E;">وقت التنفيذ: ١.٢ ثانية</span>
            <span class="badge" style="background: #DBEAFE; color: #1E40AF;">المصدر: ${res.source}</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 24px;">
            <div class="table-container" style="border: 1px solid var(--color-border); border-radius: var(--radius);">
              <table>
                <thead><tr><th>${res.th1}</th><th>${res.th2}</th></tr></thead>
                <tbody>
                  ${res.data.map(r => `<tr><td>${r[0]}</td><td style="font-weight: bold;">${r[1]}</td></tr>`).join('')}
                </tbody>
              </table>
            </div>
            <div style="border: 1px solid var(--color-border); border-radius: var(--radius); padding: 16px;">
              <canvas id="${chartId}" style="height: 200px; width: 100%;"></canvas>
            </div>
          </div>
          
          <button class="btn btn-secondary" onclick="window.location.hash='#history'" style="width: 100%; display: flex; justify-content: center;">
            عرض التفاصيل الكاملة
          </button>
        </div>
      `;
      
      messagesContainer.innerHTML += responseHtml;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      setTimeout(() => {
        const ctx = document.getElementById(chartId) as HTMLCanvasElement;
        if (ctx) {
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: res.data.map(d => String(d[0])),
              datasets: [{
                label: res.th2,
                data: res.data.map(d => Number(d[1])),
                backgroundColor: '#1E3A8A',
                borderRadius: 4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { ticks: { font: { family: 'IBM Plex Sans Arabic' } } },
                y: { ticks: { font: { family: 'IBM Plex Sans Arabic' } } }
              }
            }
          });
        }
      }, 100);

    }, 1500);
  };

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  document.querySelectorAll('.suggestion-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const text = (card as HTMLElement).querySelector('div:nth-child(2)')?.textContent;
      if (text) {
        input.value = text;
        handleSend();
      }
    });
  });
}