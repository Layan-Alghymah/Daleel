import { createBarChart, createDoughnutChart } from '../components/chart-utils';
import Chart from 'chart.js/auto';

export function renderCharts(container: HTMLElement) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h1>الرسوم البيانية</h1>
      <div style="display: flex; gap: 8px; background: var(--color-surface); padding: 4px; border-radius: var(--radius); border: 1px solid var(--color-border);">
        <button class="btn btn-primary" style="padding: 4px 16px;">أسبوع</button>
        <button class="btn btn-secondary" style="padding: 4px 16px; border: none;">شهر</button>
        <button class="btn btn-secondary" style="padding: 4px 16px; border: none;">سنة</button>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
      <div class="card">
        <h3>توزيع الطلبات حسب الإدارة</h3>
        <div style="height: 300px; margin-top: 16px;">
          <canvas id="chart-depts"></canvas>
        </div>
      </div>
      <div class="card">
        <h3>حالة المعاملات</h3>
        <div style="height: 300px; margin-top: 16px;">
          <canvas id="chart-status"></canvas>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>نمو المعاملات المنجزة</h3>
      <div style="height: 350px; margin-top: 16px;">
        <canvas id="chart-trend"></canvas>
      </div>
    </div>
  `;

  setTimeout(() => {
    const deptsCtx = document.getElementById('chart-depts') as HTMLCanvasElement;
    if (deptsCtx) {
      createBarChart(deptsCtx, ['الترخيص', 'الموارد', 'المالية', 'التقنية', 'العلاقات'], [450, 300, 200, 150, 100], 'عدد الطلبات');
    }

    const statusCtx = document.getElementById('chart-status') as HTMLCanvasElement;
    if (statusCtx) {
      createDoughnutChart(statusCtx, ['مكتمل', 'قيد المعالجة', 'مرفوض'], [60, 30, 10], '');
    }

    const trendCtx = document.getElementById('chart-trend') as HTMLCanvasElement;
    if (trendCtx) {
      new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
          datasets: [{
            label: 'المعاملات المنجزة',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { font: { family: 'IBM Plex Sans Arabic' } } } },
          scales: {
            x: { ticks: { font: { family: 'IBM Plex Sans Arabic' } } },
            y: { ticks: { font: { family: 'IBM Plex Sans Arabic' } } }
          }
        }
      });
    }
  }, 100);
}
