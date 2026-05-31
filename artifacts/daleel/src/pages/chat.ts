import { mockData } from '../data';
import { createBarChart } from '../components/chart-utils';

export function renderChat(container: HTMLElement) {
  container.innerHTML = `
    <div class="chat-container">
      <div class="chat-messages" id="chat-messages">
        <!-- Suggestions shown initially -->
        <div class="card" style="margin: 0 auto; max-width: 600px; width: 100%; text-align: center;" id="chat-suggestions">
          <img src="/logo.png" alt="دليل" style="width: 64px; margin-bottom: 16px;" onerror="this.style.display='none'">
          <h2 style="margin-bottom: 24px;">كيف يمكنني مساعدتك اليوم؟</h2>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <button class="btn btn-secondary suggestion-btn">كم عدد المعاملات المكتملة هذا الشهر؟</button>
            <button class="btn btn-secondary suggestion-btn">ما أكثر الإدارات استقبالاً للطلبات؟</button>
            <button class="btn btn-secondary suggestion-btn">كم عدد الرخص الصادرة؟</button>
          </div>
        </div>
      </div>
      
      <div class="chat-input-area">
        <input type="text" id="chat-input" class="input" placeholder="اسأل دليل عن بيانات المؤسسة..." style="flex: 1;">
        <button id="chat-send" class="btn btn-primary">إرسال</button>
      </div>
    </div>
  `;

  const messagesContainer = document.getElementById('chat-messages')!;
  const input = document.getElementById('chat-input') as HTMLInputElement;
  const sendBtn = document.getElementById('chat-send')!;
  const suggestions = document.getElementById('chat-suggestions')!;

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;

    if (suggestions) suggestions.style.display = 'none';

    // Add user message
    messagesContainer.innerHTML += `<div class="bubble bubble-user">${text}</div>`;
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Add loading
    const loadingId = 'loading-' + Date.now();
    messagesContainer.innerHTML += `<div id="${loadingId}" class="bubble bubble-ai" style="color: var(--color-muted);">جاري تحليل البيانات...</div>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      document.getElementById(loadingId)?.remove();
      
      const chartId = 'chart-' + Date.now();
      const responseHtml = `
        <div class="bubble bubble-ai" style="max-width: 90%;">
          <p style="margin-bottom: 16px; color: var(--color-text); font-size: 16px;">
            بناءً على طلبك، إليك إحصائيات حول "${text}". تم تحليل البيانات من المصادر المعتمدة وتلخيصها أدناه.
          </p>
          
          <div style="display: flex; gap: 8px; margin-bottom: 24px;">
            <span class="badge badge-green">مستوى الثقة: ٩٢٪</span>
            <span class="badge badge-blue">المصدر: نظام المعاملات</span>
            <span class="badge badge-orange">وقت التنفيذ: ١.٢ ثانية</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div class="card" style="padding: 16px;">
              <canvas id="${chartId}" style="height: 200px; width: 100%;"></canvas>
            </div>
            <div class="table-container card" style="padding: 16px;">
              <table style="font-size: 12px;">
                <thead><tr><th>الإدارة</th><th>العدد</th></tr></thead>
                <tbody>
                  <tr><td>إدارة الترخيص</td><td>٣,٤٥٢</td></tr>
                  <tr><td>الموارد البشرية</td><td>١,٢٣٠</td></tr>
                  <tr><td>الشؤون المالية</td><td>٨٩٠</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
      
      messagesContainer.innerHTML += responseHtml;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      setTimeout(() => {
        const ctx = document.getElementById(chartId) as HTMLCanvasElement;
        if (ctx) {
          createBarChart(ctx, ['إدارة الترخيص', 'الموارد البشرية', 'الشؤون المالية'], [3452, 1230, 890], 'الإحصائيات');
        }
      }, 100);

    }, 1500);
  };

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      input.value = (e.target as HTMLElement).innerText;
      handleSend();
    });
  });
}
