import { mockData } from '../data';
import { createBarChart, createDoughnutChart } from '../components/chart-utils';
import { showToast } from '../components/toast';
import { state } from '../state';

let chartQueries: any = null;
let chartSources: any = null;

export function renderDashboard(container: HTMLElement) {
  const role = state.user?.role || '';
  const name = state.user?.name || 'مستخدم';

  (window as any).showToast = showToast;

  if (role === 'قائد') {
    renderLeaderDashboard(container, name);
  } else if (role === 'مدير') {
    renderManagerDashboard(container, name);
  } else {
    renderAnalystDashboard(container, name);
  }
}

/* =====================================================
   قائد — Full organizational command center
   ===================================================== */
function renderLeaderDashboard(container: HTMLElement, name: string) {
  container.innerHTML = `
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 16px; padding: 20px 24px; background: var(--color-primary); border-radius: var(--radius); color: white; margin-bottom: 8px;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; flex-shrink: 0;">${name.charAt(0)}</div>
        <div>
          <div style="font-size: 18px; font-weight: 700;">مرحباً، ${name}</div>
          <div style="font-size: 13px; opacity: 0.8; margin-top: 2px;">لوحة قيادة المنظومة — صلاحيات كاملة</div>
        </div>
        <div style="margin-right: auto; background: rgba(255,255,255,0.15); padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;">قائد</div>
      </div>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 32px;">
      ${kpiCard('١٢,٤٣٦', 'إجمالي الاستعلامات', 'primary', iconChat(), '+٨٪ هذا الشهر', 'up')}
      ${kpiCard('٨٧', 'استعلامات اليوم', 'secondary', iconCalendar(), '+١٢٪ عن أمس', 'up')}
      ${kpiCard('٤٧', 'المستخدمين الفعليين', 'primary', iconUsers())}
      ${kpiCard('٤/٥', 'مصادر البيانات المتصلة', 'secondary', iconDB())}
      ${kpiCard('إدارة الترخيص', 'أكثر إدارة استخداماً', 'accent', iconBuilding(), '٣,٤٥٢ طلب شهرياً', 'neutral')}
      ${kpiCard('١.٢ ث', 'متوسط زمن الاستجابة', 'success', iconClock(), 'أفضل من المستهدف ٥ث', 'up')}
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
      <div class="card">
        <h3 style="margin-bottom: 16px; color: var(--color-primary);">مركز التنبيهات</h3>
        ${alertItem('danger', 'نظام الشكاوى لم يتحدث منذ يومين', 'تحتاج مراجعة', "showToast('جاري التحقق من حالة نظام الشكاوى...', 'error')")}
        ${alertItem('warning', 'ارتفاع في الاستخدام بنسبة ٣٢٪ هذا الأسبوع', 'مراقبة', "showToast('تفاصيل: +٣٢٪ في الاستعلامات مقارنة بالأسبوع الماضي', 'info')")}
        ${alertItem('danger', 'فشل ٣ استعلامات خلال الساعة الماضية', 'فشل', "showToast('سبب الفشل: انتهاء مهلة الاتصال بنظام الرخص', 'error')")}
        ${alertItem('success', 'تم تسجيل دخول ٥ مستخدمين جدد اليوم', 'نشاط', "showToast('مستخدمون جدد: أحمد، سارة، خالد، نورة، فهد', 'success')")}
      </div>

      <div class="card">
        <h3 style="margin-bottom: 16px; color: var(--color-primary);">إجراءات سريعة</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${quickAction(iconUserPlus(), 'إضافة مستخدم', "#permissions")}
          ${quickAction(iconShield(), 'تعديل الصلاحيات', "#permissions")}
          ${quickAction(iconDB(), 'إضافة مصدر بيانات', "#datasources")}
          ${quickAction(iconClock(), 'مراجعة سجل النشاط', "#history")}
          ${quickAction(iconDownload(), 'إنشاء تقرير', "#export")}
          ${quickAction(iconChart(), 'تحليل الأداء', "#charts")}
        </div>
      </div>
    </div>

    ${chartsSection()}

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3>آخر الاستعلامات — جميع المستخدمين</h3>
        <a href="#history" style="color: var(--color-secondary); font-size: 13px; text-decoration: none;">عرض الكل</a>
      </div>
      <div class="table-container">
        <table>
          <thead><tr><th>الوقت</th><th>المستخدم</th><th>الدور</th><th>السؤال</th><th>الحالة</th></tr></thead>
          <tbody>
            <tr class="clickable" onclick="window.location.hash='#history'"><td style="color:var(--color-muted)">١٠:٤٥ ص</td><td>أحمد محمد</td><td><span class="badge" style="background:#DBEAFE;color:#1E40AF">مدير</span></td><td>كم عدد المعاملات المكتملة هذا الشهر؟</td><td><span class="badge badge-green">ناجح</span></td></tr>
            <tr class="clickable" onclick="window.location.hash='#history'"><td style="color:var(--color-muted)">٠٩:٣٠ ص</td><td>سارة خالد</td><td><span class="badge" style="background:#FEF3C7;color:#92400E">محلل</span></td><td>ما أكثر الإدارات استقبالاً للطلبات؟</td><td><span class="badge badge-green">ناجح</span></td></tr>
            <tr class="clickable" onclick="window.location.hash='#history'"><td style="color:var(--color-muted)">٠٨:١٥ ص</td><td>فهد عبدالله</td><td><span class="badge" style="background:#FEF3C7;color:#92400E">محلل</span></td><td>كم عدد الرخص الصادرة؟</td><td><span class="badge" style="background:#FECACA;color:#991B1B">فشل</span></td></tr>
            <tr class="clickable" onclick="window.location.hash='#history'"><td style="color:var(--color-muted)">أمس</td><td>نورة سعد</td><td><span class="badge" style="background:#FEF3C7;color:#92400E">محلل</span></td><td>ما نسبة إنجاز الطلبات؟</td><td><span class="badge badge-green">ناجح</span></td></tr>
            <tr class="clickable" onclick="window.location.hash='#history'"><td style="color:var(--color-muted)">أمس</td><td>أحمد محمد</td><td><span class="badge" style="background:#DBEAFE;color:#1E40AF">مدير</span></td><td>متوسط زمن الإنجاز</td><td><span class="badge badge-green">ناجح</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  setTimeout(() => initChartFilter(), 100);
}

/* =====================================================
   مدير — Operational manager view
   ===================================================== */
function renderManagerDashboard(container: HTMLElement, name: string) {
  container.innerHTML = `
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 16px; padding: 20px 24px; background: var(--color-secondary); border-radius: var(--radius); color: white; margin-bottom: 8px;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; flex-shrink: 0;">${name.charAt(0)}</div>
        <div>
          <div style="font-size: 18px; font-weight: 700;">مرحباً، ${name}</div>
          <div style="font-size: 13px; opacity: 0.8; margin-top: 2px;">لوحة العمليات — بيانات قسمك</div>
        </div>
        <div style="margin-right: auto; background: rgba(255,255,255,0.15); padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;">مدير</div>
      </div>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 32px;">
      ${kpiCard('٢٣٤', 'استعلاماتي هذا الشهر', 'secondary', iconChat(), '+٥٪ عن الشهر الماضي', 'up')}
      ${kpiCard('١٨', 'استعلاماتي اليوم', 'primary', iconCalendar())}
      ${kpiCard('١,٢٣٤', 'المعاملات النشطة في قسمي', 'accent', iconBuilding(), '٣٤٪ بانتظار الموافقة', 'neutral')}
      ${kpiCard('٤/٥', 'مصادر البيانات المتاحة', 'secondary', iconDB())}
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
      <div class="card">
        <h3 style="margin-bottom: 16px; color: var(--color-secondary);">تنبيهات العمليات</h3>
        ${alertItem('warning', 'نظام الشكاوى يحتاج مراجعة بيانات', 'مراقبة', "showToast('يُنصح بمراجعة بيانات نظام الشكاوى مع مسؤول النظام', 'info')")}
        ${alertItem('danger', 'فشل ٣ استعلامات في آخر ساعة', 'فشل', "showToast('تواصل مع مدير النظام لمراجعة سجل الأخطاء', 'error')")}
        ${alertItem('info', 'تحديث مصادر البيانات مجدول غداً', 'جدولة', "showToast('الصيانة المجدولة: ٢ صباحاً – ٤ صباحاً', 'info')")}
      </div>

      <div class="card">
        <h3 style="margin-bottom: 16px; color: var(--color-secondary);">إجراءات سريعة</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${quickAction(iconDB(), 'إدارة مصادر البيانات', "#datasources")}
          ${quickAction(iconClock(), 'سجل الاستعلامات', "#history")}
          ${quickAction(iconDownload(), 'تصدير تقرير', "#export")}
          ${quickAction(iconChart(), 'الرسوم البيانية', "#charts")}
        </div>
        <div style="margin-top: 16px; padding: 12px; background: #EFF6FF; border-radius: var(--radius); border: 1px solid #BFDBFE;">
          <div style="font-size: 12px; color: var(--color-secondary); font-weight: 600; margin-bottom: 4px;">ملاحظة</div>
          <div style="font-size: 12px; color: var(--color-muted);">إدارة الصلاحيات وإضافة المستخدمين متاحة للقائد فقط</div>
        </div>
      </div>
    </div>

    ${chartsSection()}

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3>آخر استعلاماتي</h3>
        <a href="#history" style="color: var(--color-secondary); font-size: 13px; text-decoration: none;">عرض الكل</a>
      </div>
      <div class="table-container">
        <table>
          <thead><tr><th>الوقت</th><th>السؤال</th><th>المصدر</th><th>الوقت</th><th>الحالة</th></tr></thead>
          <tbody>
            <tr class="clickable" onclick="window.location.hash='#history'"><td style="color:var(--color-muted)">١٠:٤٥ ص</td><td>كم عدد المعاملات المكتملة هذا الشهر؟</td><td><span class="badge badge-blue">نظام المعاملات</span></td><td>١.١ ث</td><td><span class="badge badge-green">ناجح</span></td></tr>
            <tr class="clickable" onclick="window.location.hash='#history'"><td style="color:var(--color-muted)">٠٩:٣٠ ص</td><td>ما أكثر الإدارات استقبالاً للطلبات؟</td><td><span class="badge badge-blue">نظام الخدمات</span></td><td>١.٣ ث</td><td><span class="badge badge-green">ناجح</span></td></tr>
            <tr class="clickable" onclick="window.location.hash='#history'"><td style="color:var(--color-muted)">أمس</td><td>متوسط زمن الإنجاز</td><td><span class="badge badge-blue">نظام المعاملات</span></td><td>٠.٩ ث</td><td><span class="badge badge-green">ناجح</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  setTimeout(() => initChartFilter(), 100);
}

/* =====================================================
   محلل بيانات — Personal analyst workspace
   ===================================================== */
function renderAnalystDashboard(container: HTMLElement, name: string) {
  container.innerHTML = `
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 16px; padding: 20px 24px; background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius); margin-bottom: 8px;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(245,158,11,0.15); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; flex-shrink: 0; color: var(--color-accent);">${name.charAt(0)}</div>
        <div>
          <div style="font-size: 18px; font-weight: 700; color: var(--color-text);">مرحباً، ${name}</div>
          <div style="font-size: 13px; color: var(--color-muted); margin-top: 2px;">مساحة عملك الشخصية — محلل بيانات</div>
        </div>
        <div style="margin-right: auto; background: rgba(245,158,11,0.15); color: var(--color-accent); padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;">محلل بيانات</div>
      </div>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(2, 1fr); margin-bottom: 32px;">
      ${kpiCard('٢٣', 'استعلاماتي اليوم', 'accent', iconChat())}
      ${kpiCard('١٨٦', 'إجمالي استعلاماتي', 'secondary', iconCalendar(), '+٤٪ عن الشهر الماضي', 'up')}
    </div>

    <div style="margin-bottom: 32px;">
      <h3 style="margin-bottom: 16px; color: var(--color-primary);">ابدأ استعلامك</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <a href="#chat" style="text-decoration: none;">
          <div class="card" style="text-align: center; padding: 32px 16px; cursor: pointer; transition: all 0.15s; border: 2px solid transparent;" onmouseover="this.style.borderColor='var(--color-accent)'" onmouseout="this.style.borderColor='transparent'">
            <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(245,158,11,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--color-accent);">${iconChat(28)}</div>
            <div style="font-weight: 700; color: var(--color-text); margin-bottom: 6px;">المحادثة الذكية</div>
            <div style="font-size: 12px; color: var(--color-muted);">اسأل أي سؤال بالعربية وادرك الإجابة فوراً</div>
          </div>
        </a>
        <a href="#history" style="text-decoration: none;">
          <div class="card" style="text-align: center; padding: 32px 16px; cursor: pointer; transition: all 0.15s; border: 2px solid transparent;" onmouseover="this.style.borderColor='var(--color-secondary)'" onmouseout="this.style.borderColor='transparent'">
            <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(37,99,235,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--color-secondary);">${iconClock(28)}</div>
            <div style="font-weight: 700; color: var(--color-text); margin-bottom: 6px;">سجل استعلاماتي</div>
            <div style="font-size: 12px; color: var(--color-muted);">راجع استعلاماتك السابقة ونتائجها</div>
          </div>
        </a>
        <a href="#tables" style="text-decoration: none;">
          <div class="card" style="text-align: center; padding: 32px 16px; cursor: pointer; transition: all 0.15s; border: 2px solid transparent;" onmouseover="this.style.borderColor='var(--color-primary)'" onmouseout="this.style.borderColor='transparent'">
            <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(30,58,138,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--color-primary);">${iconTable(28)}</div>
            <div style="font-weight: 700; color: var(--color-text); margin-bottom: 6px;">تصفح الجداول</div>
            <div style="font-size: 12px; color: var(--color-muted);">عرض وفرز وتصدير بيانات المنظومة</div>
          </div>
        </a>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
      <div class="card">
        <h3 style="margin-bottom: 16px;">اقتراحات أسئلة اليوم</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${['كم عدد المعاملات المكتملة هذا الشهر؟', 'ما أكثر الإدارات نشاطاً؟', 'ما متوسط زمن الإنجاز؟', 'كم عدد الرخص الصادرة؟'].map(q => `
            <button class="btn btn-secondary" style="text-align: right; justify-content: flex-start; width: 100%; padding: 10px 14px; font-size: 13px;" onclick="window.location.hash='#chat'; setTimeout(()=>{ const inp = document.getElementById('chat-input'); if(inp){ inp.value='${q}'; inp.dispatchEvent(new Event('input')); }}, 300)">
              <span style="color: var(--color-accent); margin-left: 8px;">◈</span> ${q}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3>آخر استعلاماتي</h3>
          <a href="#history" style="color: var(--color-secondary); font-size: 13px; text-decoration: none;">عرض الكل</a>
        </div>
        <div class="table-container">
          <table>
            <thead><tr><th>السؤال</th><th>الحالة</th><th>الوقت</th></tr></thead>
            <tbody>
              <tr class="clickable" onclick="window.location.hash='#history'"><td>كم عدد المعاملات المكتملة؟</td><td><span class="badge badge-green">ناجح</span></td><td style="color:var(--color-muted)">١.١ ث</td></tr>
              <tr class="clickable" onclick="window.location.hash='#history'"><td>ما أكثر الإدارات نشاطاً؟</td><td><span class="badge badge-green">ناجح</span></td><td style="color:var(--color-muted)">٠.٩ ث</td></tr>
              <tr class="clickable" onclick="window.location.hash='#history'"><td>كم عدد الرخص الصادرة؟</td><td><span class="badge badge-green">ناجح</span></td><td style="color:var(--color-muted)">١.٣ ث</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div style="padding: 16px 20px; background: #F0FDF4; border: 1px solid #A7F3D0; border-radius: var(--radius); display: flex; align-items: center; gap: 12px;">
      <div style="color: var(--color-success);">${iconShield(20)}</div>
      <div style="font-size: 13px; color: #065F46;">
        <span style="font-weight: 600;">صلاحياتك الحالية: </span>
        تنفيذ الاستعلامات — مراجعة النتائج — تصدير البيانات — سجل الاستعلامات الشخصي
      </div>
    </div>
  `;
}

/* =====================================================
   Shared: Charts section with period filter
   ===================================================== */
function chartsSection() {
  return `
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;" class="dashboard-charts">
      <div class="card" style="display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3>عدد الاستعلامات اليومية</h3>
          <div class="btn-group chart-filter">
            <button class="btn active" data-period="7">٧ أيام</button>
            <button class="btn" data-period="30">٣٠ يوم</button>
            <button class="btn" data-period="90">٩٠ يوم</button>
          </div>
        </div>
        <div style="flex: 1; min-height: 260px; position: relative;">
          <canvas id="dash-chart-queries"></canvas>
        </div>
      </div>
      <div class="card" style="display: flex; flex-direction: column;">
        <h3 style="margin-bottom: 16px;">توزيع مصادر البيانات</h3>
        <div style="flex: 1; min-height: 260px; position: relative;">
          <canvas id="dash-chart-sources"></canvas>
        </div>
      </div>
    </div>
  `;
}

function initChartFilter() {
  renderCharts('7');
  document.querySelectorAll('.chart-filter .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.chart-filter .btn').forEach(b => b.classList.remove('active'));
      const target = e.target as HTMLElement;
      target.classList.add('active');
      renderCharts(target.getAttribute('data-period') || '7');
      showToast('تم تحديث البيانات', 'success');
    });
  });
}

function renderCharts(period: string) {
  if (chartQueries) { chartQueries.destroy(); chartQueries = null; }
  if (chartSources) { chartSources.destroy(); chartSources = null; }
  const qCtx = document.getElementById('dash-chart-queries') as HTMLCanvasElement;
  const sCtx = document.getElementById('dash-chart-sources') as HTMLCanvasElement;
  if (!qCtx || !sCtx) return;
  let labels: string[], data: number[];
  if (period === '7') {
    labels = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    data = [120, 190, 300, 250, 200, 90, 150];
  } else if (period === '30') {
    labels = Array.from({length: 30}, (_, i) => 'يوم ' + (i + 1));
    data = Array.from({length: 30}, () => Math.floor(Math.random() * 400 + 100));
  } else {
    labels = Array.from({length: 12}, (_, i) => 'أسبوع ' + (i + 1));
    data = Array.from({length: 12}, () => Math.floor(Math.random() * 1000 + 500));
  }
  chartQueries = createBarChart(qCtx, labels, data, 'الاستعلامات');
  chartSources = createDoughnutChart(sCtx, ['المعاملات','الموارد البشرية','الرخص','الخدمات'], [45,25,20,10], '');
}

/* =====================================================
   Helper: KPI card
   ===================================================== */
function kpiCard(value: string, label: string, color: string, icon: string, trend?: string, trendDir?: string) {
  const colorMap: Record<string, string> = {
    primary: 'rgba(30,58,138,0.1)', secondary: 'rgba(37,99,235,0.1)',
    accent: 'rgba(245,158,11,0.1)', success: 'rgba(16,185,129,0.1)'
  };
  const textMap: Record<string, string> = {
    primary: 'var(--color-primary)', secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)', success: 'var(--color-success)'
  };
  const trendHtml = trend ? `<div class="kpi-trend ${trendDir === 'up' ? 'up' : trendDir === 'down' ? 'down' : ''}" style="margin-top:6px">${trend}</div>` : '';
  return `
    <div class="card kpi-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div class="kpi-value" style="color:${textMap[color] || 'var(--color-primary)'};">${value}</div>
          <div class="kpi-label">${label}</div>
          ${trendHtml}
        </div>
        <div class="kpi-icon" style="background:${colorMap[color]};color:${textMap[color]};">${icon}</div>
      </div>
    </div>`;
}

/* =====================================================
   Helper: Alert item
   ===================================================== */
function alertItem(type: string, text: string, badge: string, onclick: string) {
  const dotColors: Record<string, string> = {
    danger: 'var(--color-danger)', warning: 'var(--color-accent)',
    info: 'var(--color-secondary)', success: 'var(--color-success)'
  };
  const badgeStyles: Record<string, string> = {
    danger: 'background:#FECACA;color:#991B1B',
    warning: 'background:#FDE68A;color:#92400E',
    info: 'background:#DBEAFE;color:#1E40AF',
    success: 'background:#A7F3D0;color:#065F46'
  };
  return `
    <div class="alert-item ${type}" onclick="${onclick}" style="cursor:pointer;">
      <div class="alert-dot" style="background:${dotColors[type]||'#ccc'};"></div>
      <div style="flex:1;">
        <div style="font-weight:600;margin-bottom:4px;font-size:13px;">${text}</div>
        <span class="badge" style="${badgeStyles[type]||''};font-size:10px;">${badge}</span>
      </div>
    </div>`;
}

/* =====================================================
   Helper: Quick action button
   ===================================================== */
function quickAction(icon: string, label: string, href: string) {
  return `
    <button class="quick-action-btn" onclick="window.location.hash='${href}'">
      <div class="quick-action-icon">${icon}</div>
      <span style="font-size:12px;">${label}</span>
    </button>`;
}

/* =====================================================
   SVG Icons
   ===================================================== */
function svgIcon(path: string, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}
function iconChat(s=20) { return svgIcon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>', s); }
function iconCalendar(s=20) { return svgIcon('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>', s); }
function iconUsers(s=20) { return svgIcon('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', s); }
function iconDB(s=20) { return svgIcon('<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>', s); }
function iconBuilding(s=20) { return svgIcon('<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path>', s); }
function iconClock(s=20) { return svgIcon('<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>', s); }
function iconShield(s=20) { return svgIcon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>', s); }
function iconUserPlus(s=20) { return svgIcon('<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>', s); }
function iconDownload(s=20) { return svgIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>', s); }
function iconChart(s=20) { return svgIcon('<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>', s); }
function iconTable(s=20) { return svgIcon('<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>', s); }
