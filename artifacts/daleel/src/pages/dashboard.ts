import { mockData } from '../data';
import { createBarChart, createDoughnutChart } from '../components/chart-utils';

export function renderDashboard(container: HTMLElement) {
  container.innerHTML = `
    <h1>لوحة التحكم</h1>
    
    <div class="kpi-grid">
      <div class="card kpi-card">
        <h3>عدد الاستعلامات</h3>
        <div class="value">${mockData.kpis.queries}</div>
      </div>
      <div class="card kpi-card">
        <h3>عدد المستخدمين</h3>
        <div class="value">${mockData.kpis.users}</div>
      </div>
      <div class="card kpi-card">
        <h3>مصادر البيانات</h3>
        <div class="value">${mockData.kpis.sources}</div>
      </div>
      <div class="card kpi-card">
        <h3>أكثر سؤال استخداماً</h3>
        <div class="value" style="font-size: 18px; line-height: 1.4; margin-top: 12px;">${mockData.kpis.topQuestion}</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;">
      <div class="card">
        <h3>عدد الاستعلامات اليومية</h3>
        <div style="height: 300px; margin-top: 16px;">
          <canvas id="chart-queries"></canvas>
        </div>
      </div>
      <div class="card">
        <h3>أكثر مصادر البيانات استخداماً</h3>
        <div style="height: 300px; margin-top: 16px;">
          <canvas id="chart-sources"></canvas>
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
              <tr>
                <td>${q.time}</td>
                <td>${q.user}</td>
                <td>${q.question}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  setTimeout(() => {
    const queriesCtx = document.getElementById('chart-queries') as HTMLCanvasElement;
    if (queriesCtx) {
      createBarChart(queriesCtx, ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'], [120, 190, 300, 250, 200, 90, 150], 'الاستعلامات');
    }

    const sourcesCtx = document.getElementById('chart-sources') as HTMLCanvasElement;
    if (sourcesCtx) {
      createDoughnutChart(sourcesCtx, ['المعاملات', 'الموارد البشرية', 'الرخص', 'الخدمات'], [45, 25, 20, 10], '');
    }
  }, 100);
}
