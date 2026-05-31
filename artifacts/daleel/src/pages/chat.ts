import Chart from 'chart.js/auto';

const SUGGESTIONS = [
  { text: 'كم عدد المعاملات المكتملة هذا الشهر؟', color: 'var(--color-primary)',   icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>' },
  { text: 'ما أكثر الإدارات استقبالاً للطلبات؟',    color: 'var(--color-secondary)', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>' },
  { text: 'كم عدد الرخص الصادرة؟',                  color: 'var(--color-success)',   icon: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>' },
  { text: 'ما نسبة إنجاز الطلبات؟',                 color: 'var(--color-accent)',    icon: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' },
  { text: 'ما متوسط زمن الإنجاز؟',                  color: 'var(--color-primary)',   icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>' },
  { text: 'ما أكثر الشكاوى تكراراً؟',               color: 'var(--color-danger)',    icon: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>' },
];

const svgIcon = (path: string, color: string) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

// Global registry so onclick handlers can reach chart data without JSON-in-attribute
type ChartEntry = { labels: string[]; values: number[]; label: string; instance?: Chart };
const registry: Record<string, ChartEntry> = {};
(window as any).__daleelCharts = registry;

(window as any).__daleelToChart = (id: string) => {
  const entry = registry[id];
  if (!entry) return;
  const textEl   = document.getElementById('text-' + id);
  const chartEl  = document.getElementById('cw-' + id);
  const btnChart = document.getElementById('btn-chart-' + id);
  const btnText  = document.getElementById('btn-text-' + id);
  if (textEl)   textEl.style.display   = 'none';
  if (chartEl)  chartEl.style.display  = 'block';
  if (btnChart) btnChart.style.display = 'none';
  if (btnText)  btnText.style.display  = 'inline-flex';
  if (!entry.instance) {
    const canvas = document.getElementById('canvas-' + id) as HTMLCanvasElement | null;
    if (canvas) {
      entry.instance = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: entry.labels,
          datasets: [{ label: entry.label, data: entry.values, backgroundColor: '#1E3A8A', borderRadius: 4 }]
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
  }
};

(window as any).__daleelToText = (id: string) => {
  const textEl   = document.getElementById('text-' + id);
  const chartEl  = document.getElementById('cw-' + id);
  const btnChart = document.getElementById('btn-chart-' + id);
  const btnText  = document.getElementById('btn-text-' + id);
  if (textEl)   textEl.style.display   = 'block';
  if (chartEl)  chartEl.style.display  = 'none';
  if (btnChart) btnChart.style.display = 'inline-flex';
  if (btnText)  btnText.style.display  = 'none';
};

export function renderChat(container: HTMLElement) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;height:calc(100vh - 80px);">

      <!-- Scrollable messages -->
      <div id="chat-messages" style="flex:1;overflow-y:auto;padding:0 4px 16px;">

        <!-- Welcome screen -->
        <div id="chat-welcome" style="display:flex;align-items:center;justify-content:center;min-height:100%;padding:16px 0;">
          <div style="max-width:680px;width:100%;text-align:center;">
            <img src="/logo.png" alt="دليل" style="width:72px;margin-bottom:20px;" onerror="this.style.display='none'">
            <h2 style="margin-bottom:8px;font-size:22px;color:var(--color-primary);">مرحباً، كيف يمكنني مساعدتك؟</h2>
            <p style="margin-bottom:28px;color:var(--color-muted);font-size:15px;">اسأل عن أي بيانات في المنظومة الحكومية وسأوفر لك التحليل الفوري</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;text-align:right;">
              ${SUGGESTIONS.map(s => `
                <div class="card suggestion-card" data-q="${s.text}" style="cursor:pointer;transition:all 0.18s;padding:16px;">
                  <div style="margin-bottom:8px;">${svgIcon(s.icon, s.color)}</div>
                  <div style="font-weight:500;font-size:14px;">${s.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>

      <!-- Always-visible bottom -->
      <div style="border-top:1px solid var(--color-border);background:var(--color-surface);padding:14px 0 8px;">

        <!-- Input row -->
        <div class="chat-input-area" style="position:static;margin-bottom:10px;">
          <input type="text" id="chat-input" class="input" placeholder="اسأل دليل عن بيانات المؤسسة..." style="flex:1;padding:14px 16px;font-size:15px;">
          <button id="chat-send" class="btn btn-primary" style="padding:0 22px;flex-shrink:0;">إرسال</button>
        </div>

        <!-- Chips: hidden until first message -->
        <div id="suggestion-chips" style="display:none;gap:8px;flex-wrap:wrap;padding:0 2px;">
          ${SUGGESTIONS.map(s => `
            <button class="chip-btn" data-q="${s.text}" style="
              display:inline-flex;align-items:center;gap:6px;
              padding:6px 12px;border-radius:20px;border:1px solid var(--color-border);
              background:var(--color-surface);color:var(--color-text);
              font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:all 0.15s;
            " onmouseover="this.style.background='#EFF6FF';this.style.borderColor='var(--color-secondary)'"
               onmouseout="this.style.background='var(--color-surface)';this.style.borderColor='var(--color-border)'">
              ${svgIcon(s.icon, s.color)}
              ${s.text}
            </button>
          `).join('')}
        </div>

      </div>
    </div>
  `;

  const messagesEl = document.getElementById('chat-messages')!;
  const welcomeEl  = document.getElementById('chat-welcome')!;
  const chipsEl    = document.getElementById('suggestion-chips')!;
  const input      = document.getElementById('chat-input') as HTMLInputElement;
  const sendBtn    = document.getElementById('chat-send')!;
  let chatStarted  = false;

  /* ── Mock responses ─────────────────────────────────── */
  const getMockResponse = (q: string) => {
    if (q.includes('معاملات') || q.includes('مكتمل'))
      return { summary: 'بلغ عدد المعاملات المكتملة هذا الشهر ١٢,٤٥٦ معاملة، بزيادة قدرها ٨٪ عن الشهر الماضي.', colLabel: 'المعاملات', labels: ['إدارة الترخيص','الموارد البشرية','الشؤون المالية','تقنية المعلومات','العلاقات العامة'], values: [4321,2134,1876,1452,987], source: 'نظام المعاملات', hasData: true };
    if (q.includes('إدارة') || q.includes('طلبات'))
      return { summary: 'إدارة الترخيص هي الأكثر استقبالاً للطلبات بمعدل ٣,٤٥٢ طلب شهرياً.', colLabel: 'الطلبات', labels: ['إدارة الترخيص','الخدمات الإلكترونية','الموارد البشرية'], values: [3452,2123,1432], source: 'نظام الخدمات', hasData: true };
    if (q.includes('رخص') || q.includes('رخصة'))
      return { summary: 'صدر هذا الشهر ٨٧٣ رخصة، منها ٥٤٢ رخصة تجارية و٣٣١ رخصة صناعية.', colLabel: 'العدد', labels: ['تجارية','صناعية','مؤقتة','أخرى'], values: [542,331,118,45], source: 'نظام الرخص', hasData: true };
    if (q.includes('إنجاز') || q.includes('نسبة'))
      return { summary: 'نسبة إنجاز الطلبات خلال الشهر الحالي ٧٨٪، مع تحسن ملحوظ مقارنة بالشهر الماضي (٧٢٪).', colLabel: 'النسبة', labels: ['مكتملة','قيد المعالجة','مرفوضة'], values: [78,15,7], source: 'نظام المعاملات', hasData: true };
    if (q.includes('زمن') || q.includes('متوسط'))
      return { summary: 'متوسط زمن إنجاز المعاملة ٣.٢ أيام، وهو أفضل من المستهدف البالغ ٥ أيام.', colLabel: 'الأيام', labels: ['إدارة الترخيص','الموارد البشرية','الشؤون المالية'], values: [4.1,2.3,3.8], source: 'نظام المعاملات', hasData: true };
    if (q.includes('شكاوى'))
      return { summary: 'أكثر الشكاوى تكراراً هي التأخر في معالجة الطلبات (٣٤٪) والأخطاء الإدارية (٢٢٪).', colLabel: 'النسبة', labels: ['تأخر معالجة','أخطاء إدارية','نقص توثيق','أخرى'], values: [34,22,19,25], source: 'نظام الشكاوى', hasData: true };
    return { summary: 'تم تحليل بياناتك وفق أحدث المعلومات المتوفرة في المنظومة الحكومية.', colLabel: '', labels: [], values: [], source: 'نظام المعاملات', hasData: false };
  };

  /* ── Send handler ───────────────────────────────────── */
  const handleSend = (questionOverride?: string) => {
    const text = (questionOverride ?? input.value).trim();
    if (!text) return;

    if (!chatStarted) {
      welcomeEl.style.display = 'none';
      chipsEl.style.display   = 'flex';
      chatStarted = true;
    }

    const userBubble = document.createElement('div');
    userBubble.className = 'bubble bubble-user';
    userBubble.textContent = text;
    messagesEl.appendChild(userBubble);
    input.value = '';
    messagesEl.scrollTop = messagesEl.scrollHeight;

    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'bubble bubble-ai';
    loadingBubble.style.padding = '0';
    loadingBubble.innerHTML = `<div class="ai-loading"><span></span><span></span><span></span></div>`;
    messagesEl.appendChild(loadingBubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    setTimeout(() => {
      loadingBubble.remove();

      const res = getMockResponse(text);
      const id  = 'r' + Date.now();

      // Register chart data — no JSON in HTML attributes
      if (res.hasData) {
        registry[id] = { labels: res.labels, values: res.values, label: res.colLabel };
      }

      const toggleHtml = res.hasData ? `
        <div style="display:flex;gap:8px;align-items:center;margin-top:10px;">
          <button id="btn-chart-${id}" onclick="__daleelToChart('${id}')" style="
            display:inline-flex;align-items:center;gap:6px;padding:6px 14px;
            border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);
            font-family:inherit;font-size:13px;cursor:pointer;color:var(--color-secondary);
          " onmouseover="this.style.background='#EFF6FF'" onmouseout="this.style.background='var(--color-surface)'">
            📊 تحويل لرسم
          </button>
          <button id="btn-text-${id}" onclick="__daleelToText('${id}')" style="
            display:none;align-items:center;gap:6px;padding:6px 14px;
            border-radius:8px;border:1px solid var(--color-border);background:var(--color-surface);
            font-family:inherit;font-size:13px;cursor:pointer;color:var(--color-muted);
          " onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='var(--color-surface)'">
            📝 عرض كنص
          </button>
        </div>
      ` : '';

      const responseBubble = document.createElement('div');
      responseBubble.className = 'card bubble-ai';
      responseBubble.style.cssText = 'max-width:100%;width:100%;box-shadow:var(--shadow-sm);';
      responseBubble.innerHTML = `
        <div id="text-${id}">
          <p style="margin-bottom:14px;color:var(--color-text);font-size:15px;line-height:1.9;">${res.summary}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <span class="badge" style="background:#D1FAE5;color:#065F46;">مستوى الثقة: ٩٢٪</span>
            <span class="badge" style="background:#FEF3C7;color:#92400E;">وقت التنفيذ: ١.٢ ثانية</span>
            <span class="badge" style="background:#DBEAFE;color:#1E40AF;">المصدر: ${res.source}</span>
          </div>
        </div>
        <div id="cw-${id}" style="display:none;">
          <div style="position:relative;height:220px;margin-bottom:8px;">
            <canvas id="canvas-${id}"></canvas>
          </div>
        </div>
        ${toggleHtml}
      `;

      messagesEl.appendChild(responseBubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 1400);
  };

  /* ── Event listeners ─────────────────────────────────── */
  sendBtn.addEventListener('click', () => handleSend());
  input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

  document.querySelectorAll('.suggestion-card[data-q]').forEach(card => {
    card.addEventListener('click', () => {
      const q = (card as HTMLElement).dataset.q || '';
      if (q) handleSend(q);
    });
  });

  document.querySelectorAll('.chip-btn[data-q]').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = (btn as HTMLElement).dataset.q || '';
      if (q) handleSend(q);
    });
  });
}
