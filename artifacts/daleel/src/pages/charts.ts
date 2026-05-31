import { createBarChart, createDoughnutChart } from '../components/chart-utils';
import Chart from 'chart.js/auto';
import { showToast } from '../components/toast';

let chartDepts: Chart | null = null;
let chartStatus: Chart | null = null;  
let chartTrend: Chart | null = null;

const periodData = {
  week: {
    depts: { labels: ['الترخيص','الموارد','المالية','التقنية','العلاقات'], data: [450,300,200,150,100] },
    status: { labels: ['مكتمل','قيد المعالجة','مرفوض'], data: [60,30,10] },
    trend: { labels: ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'], data: [65,59,80,81,56,55,40] }
  },
  month: {
    depts: { labels: ['الترخيص','الموارد','المالية','التقنية','العلاقات'], data: [1820,1230,890,620,410] },
    status: { labels: ['مكتمل','قيد المعالجة','مرفوض'], data: [65,25,10] },
    trend: { labels: ['الأسبوع ١','الأسبوع ٢','الأسبوع ٣','الأسبوع ٤'], data: [280,340,290,380] }
  },
  quarter: {
    depts: { labels: ['الترخيص','الموارد','المالية','التقنية','العلاقات'], data: [5200,3600,2700,1900,1200] },
    status: { labels: ['مكتمل','قيد المعالجة','مرفوض'], data: [68,22,10] },
    trend: { labels: ['شهر ١','شهر ٢','شهر ٣'], data: [3200,4100,3700] }
  }
};

export function renderCharts(container: HTMLElement) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <h1>الرسوم البيانية</h1>
      <div class="btn-group charts-period-filter">
        <button class="btn active" data-period="week">٧ أيام</button>
        <button class="btn" data-period="month">٣٠ يوم</button>
        <button class="btn" data-period="quarter">٩٠ يوم</button>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-bottom: 24px;">
      <div class="card">
        <h3>توزيع الطلبات حسب الإدارة</h3>
        <div style="height: 300px; margin-top: 16px; position: relative;">
          <canvas id="page-chart-depts"></canvas>
        </div>
      </div>
      <div class="card">
        <h3>حالة المعاملات</h3>
        <div style="height: 300px; margin-top: 16px; position: relative;">
          <canvas id="page-chart-status"></canvas>
        </div>
      </div>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3>نمو المعاملات المنجزة</h3>
        <div class="btn-group trend-type-toggle">
          <button class="btn active" data-type="line">خطي</button>
          <button class="btn" data-type="bar">أعمدة</button>
        </div>
      </div>
      <div style="height: 350px; margin-top: 16px; position: relative;">
        <canvas id="page-chart-trend"></canvas>
      </div>
    </div>
  `;

  let currentPeriod: 'week' | 'month' | 'quarter' = 'week';
  let currentTrendType: 'line' | 'bar' = 'line';

  function initCharts() {
    const deptsCtx = document.getElementById('page-chart-depts') as HTMLCanvasElement;
    const statusCtx = document.getElementById('page-chart-status') as HTMLCanvasElement;
    const trendCtx = document.getElementById('page-chart-trend') as HTMLCanvasElement;

    if (!deptsCtx || !statusCtx || !trendCtx) return;

    chartDepts = createBarChart(deptsCtx, periodData.week.depts.labels, periodData.week.depts.data, 'عدد الطلبات');
    chartStatus = createDoughnutChart(statusCtx, periodData.week.status.labels, periodData.week.status.data, '');
    
    chartTrend = new Chart(trendCtx, {
      type: currentTrendType,
      data: {
        labels: periodData.week.trend.labels,
        datasets: [{
          label: 'المعاملات المنجزة',
          data: periodData.week.trend.data,
          fill: true,
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          borderRadius: currentTrendType === 'bar' ? 4 : 0
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

  function updateCharts(period: 'week' | 'month' | 'quarter') {
    currentPeriod = period;
    const data = periodData[period];
    
    if (chartDepts) {
      chartDepts.data.labels = data.depts.labels;
      chartDepts.data.datasets[0].data = data.depts.data;
      chartDepts.update();
    }
    
    if (chartStatus) {
      chartStatus.data.labels = data.status.labels;
      chartStatus.data.datasets[0].data = data.status.data;
      chartStatus.update();
    }
    
    if (chartTrend) {
      chartTrend.data.labels = data.trend.labels;
      chartTrend.data.datasets[0].data = data.trend.data;
      chartTrend.update();
    }

    const labelsMap: Record<string, string> = { week: '٧ أيام', month: '٣٠ يوم', quarter: '٩٠ يوم' };
    showToast(`تم تحديث البيانات لـ ${labelsMap[period]}`, 'success');
  }

  function updateTrendType(type: 'line' | 'bar') {
    currentTrendType = type;
    if (chartTrend) {
      chartTrend.destroy();
      const trendCtx = document.getElementById('page-chart-trend') as HTMLCanvasElement;
      chartTrend = new Chart(trendCtx, {
        type: currentTrendType,
        data: {
          labels: periodData[currentPeriod].trend.labels,
          datasets: [{
            label: 'المعاملات المنجزة',
            data: periodData[currentPeriod].trend.data,
            fill: true,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            borderRadius: currentTrendType === 'bar' ? 4 : 0
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
  }

  setTimeout(() => {
    initCharts();

    document.querySelectorAll('.charts-period-filter .btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.charts-period-filter .btn').forEach(b => b.classList.remove('active'));
        const target = e.target as HTMLElement;
        target.classList.add('active');
        const period = target.getAttribute('data-period') as 'week' | 'month' | 'quarter';
        updateCharts(period);
      });
    });

    document.querySelectorAll('.trend-type-toggle .btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.trend-type-toggle .btn').forEach(b => b.classList.remove('active'));
        const target = e.target as HTMLElement;
        target.classList.add('active');
        const type = target.getAttribute('data-type') as 'line' | 'bar';
        updateTrendType(type);
      });
    });
  }, 100);
}