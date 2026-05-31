import { mockData } from '../data';
import { createBarChart, createDoughnutChart } from '../components/chart-utils';
import { showToast } from '../components/toast';

let chartQueries: any = null;
let chartSources: any = null;

export function renderDashboard(container: HTMLElement) {
  container.innerHTML = `
    <h1 style="margin-bottom: 32px;">لوحة التحكم</h1>
    
    <div class="kpi-grid">
      <div class="card kpi-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="kpi-value">١٢,٤٣</div>
            <div class="kpi-label">إجمالي الاستعلامات</div>
          </div>
          <div class="kpi-icon" style="background: rgba(30,58,138,0.1); color: var(--color-primary);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
        </div>
      </div>
      <div class="card kpi-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="kpi-value">٨٧</div>
            <div class="kpi-label">استعلامات اليوم</div>
            <div class="kpi-trend up">+١٢٪ عن أمس</div>
          </div>
          <div class="kpi-icon" style="background: rgba(37,99,235,0.1); color: var(--color-secondary);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
        </div>
      </div>
      <div class="card kpi-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="kpi-value">٤٧</div>
            <div class="kpi-label">المستخدمين الفعليين</div>
          </div>
          <div class="kpi-icon" style="background: rgba(30,58,138,0.1); color: var(--color-primary);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
        </div>
      </div>
      <div class="card kpi-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="kpi-value">٤/٥</div>
            <div class="kpi-label">مصادر البيانات المتصلة</div>
          </div>
          <div class="kpi-icon" style="background: rgba(37,99,235,0.1); color: var(--color-secondary);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
          </div>
        </div>
      </div>
      <div class="card kpi-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="kpi-value" style="font-size: 20px; margin-top: 10px; color: var(--color-accent);">إدارة الترخيص</div>
            <div class="kpi-label">أكثر إدارة استخداماً</div>
          </div>
          <div class="kpi-icon" style="background: rgba(245,158,11,0.1); color: var(--color-accent);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
          </div>
        </div>
      </div>
      <div class="card kpi-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="kpi-value" style="color: var(--color-success);">١.٢ ثانية</div>
            <div class="kpi-label">متوسط زمن الاستجابة</div>
            <div class="kpi-trend up" style="display: flex; align-items: center; gap: 4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg> تحسن ملحوظ
            </div>
          </div>
          <div class="kpi-icon" style="background: rgba(16,185,129,0.1); color: var(--color-success);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 32px;">
      <div class="card">
        <h3 style="margin-bottom: 16px;">مركز التنبيهات</h3>
        <div class="alert-item danger" onclick="showToast('جاري التحقق من حالة نظام الشكاوى...', 'error')">
          <div class="alert-dot" style="background: var(--color-danger);"></div>
          <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 4px;">نظام الشكاوى لم يتحدث منذ يومين</div>
            <span class="badge" style="background: #FECACA; color: #991B1B; font-size: 10px;">تحتاج مراجعة</span>
          </div>
        </div>
        <div class="alert-item warning" onclick="showToast('تفاصيل الاستخدام: +٣٢٪ في الاستعلامات', 'info')">
          <div class="alert-dot" style="background: var(--color-accent);"></div>
          <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 4px;">ارتفاع في الاستخدام بنسبة ٣٢٪ هذا الأسبوع</div>
            <span class="badge" style="background: #FDE68A; color: #92400E; font-size: 10px;">مراقبة</span>
          </div>
        </div>
        <div class="alert-item danger" onclick="showToast('تم تسجيل ٣ استعلامات فاشلة. السبب: انتهاء المهلة.', 'error')">
          <div class="alert-dot" style="background: var(--color-danger);"></div>
          <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 4px;">فشل ٣ استعلامات خلال الساعة الماضية</div>
            <span class="badge" style="background: #FECACA; color: #991B1B; font-size: 10px;">فشل</span>
          </div>
        </div>
        <div class="alert-item success" onclick="showToast('المستخدمون الجدد: ...', 'success')">
          <div class="alert-dot" style="background: var(--color-success);"></div>
          <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 4px;">تم تسجيل دخول ٥ مستخدمين جدد اليوم</div>
            <span class="badge" style="background: #A7F3D0; color: #065F46; font-size: 10px;">نشاط</span>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 style="margin-bottom: 16px;">إجراءات سريعة</h3>
        <div class="quick-actions">
          <button class="quick-action-btn" onclick="window.location.hash='#permissions'">
            <div class="quick-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg></div>
            إضافة مستخدم
          </button>
          <button class="quick-action-btn" onclick="window.location.hash='#permissions'">
            <div class="quick-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
            تعديل الصلاحيات
          </button>
          <button class="quick-action-btn" onclick="window.location.hash='#datasources'">
            <div class="quick-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg></div>
            إضافة مصدر
          </button>
          <button class="quick-action-btn" onclick="window.location.hash='#history'">
            <div class="quick-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
            سجل النشاط
          </button>
          <button class="quick-action-btn" onclick="window.location.hash='#export'">
            <div class="quick-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></div>
            إنشاء تقرير
          </button>
        </div>
      </div>
    </div>

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
        <div style="flex: 1; min-height: 300px; position: relative;">
          <canvas id="dash-chart-queries"></canvas>
        </div>
      </div>
      <div class="card" style="display: flex; flex-direction: column;">
        <h3 style="margin-bottom: 16px;">أكثر مصادر البيانات استخداماً</h3>
        <div style="flex: 1; min-height: 300px; position: relative;">
          <canvas id="dash-chart-sources"></canvas>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 style="margin-bottom: 16px;">آخر الاستعلامات</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>الوقت</th>
              <th>المستخدم</th>
              <th>السؤال</th>
            </tr>
          </thead>
          <tbody>
            ${mockData.recentQueries.map(q => `
              <tr class="clickable" onclick="window.location.hash='#history'">
                <td style="color: var(--color-muted);">${q.time}</td>
                <td style="font-weight: 500;">${q.user}</td>
                <td>${q.question}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach functions for inline event handlers since we are using innerHTML
  (window as any).showToast = showToast;

  setTimeout(() => {
    renderCharts('7');
    
    document.querySelectorAll('.chart-filter .btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.chart-filter .btn').forEach(b => b.classList.remove('active'));
        const target = e.target as HTMLElement;
        target.classList.add('active');
        const period = target.getAttribute('data-period') || '7';
        renderCharts(period);
        showToast('تم تحديث البيانات', 'success');
      });
    });
  }, 100);

  function renderCharts(period: string) {
    if (chartQueries) chartQueries.destroy();
    if (chartSources) chartSources.destroy();

    const qCtx = document.getElementById('dash-chart-queries') as HTMLCanvasElement;
    const sCtx = document.getElementById('dash-chart-sources') as HTMLCanvasElement;

    if (!qCtx || !sCtx) return;

    let labels: string[] = [];
    let data: number[] = [];

    if (period === '7') {
      labels = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      data = [120, 190, 300, 250, 200, 90, 150];
    } else if (period === '30') {
      labels = Array.from({length: 30}, (_, i) => 'يوم ' + (i + 1));
      data = Array.from({length: 30}, () => Math.floor(Math.random() * 400 + 100));
    } else {
      labels = Array.from({length: 12}, (_, i) => 'أسبوع ' + (i + 1));
      data = Array.from({length: 12}, () => Math.floor(Math.random() * 1000 + 500));
    }

    chartQueries = createBarChart(qCtx, labels, data, 'الاستعلامات');
    chartSources = createDoughnutChart(sCtx, ['المعاملات', 'الموارد البشرية', 'الرخص', 'الخدمات'], [45, 25, 20, 10], '');
  }
}