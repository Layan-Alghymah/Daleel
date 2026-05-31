import Chart from 'chart.js/auto';

export function createBarChart(ctx: HTMLCanvasElement, labels: string[], data: number[], label: string) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: '#1E3A8A',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { family: 'IBM Plex Sans Arabic' } } }
      },
      scales: {
        x: { ticks: { font: { family: 'IBM Plex Sans Arabic' } } },
        y: { ticks: { font: { family: 'IBM Plex Sans Arabic' } } }
      }
    }
  });
}

export function createDoughnutChart(ctx: HTMLCanvasElement, labels: string[], data: number[], title: string) {
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { font: { family: 'IBM Plex Sans Arabic' } } },
        title: { display: true, text: title, font: { family: 'IBM Plex Sans Arabic', size: 16 } }
      }
    }
  });
}
