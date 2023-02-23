const colors = [
  '#36b9cc',
  '#1cc88a',
  '#6f42c1',
  '#e74a3b',
  '#fd7e14',
  '#f6c23e',
  '#84cc16',
  '#22c55e',
  '#2563eb',
  '#f43f5e',
  '#8b5cf6',
  '#ea580c',
  '#facc15',
];

// Populate Data for ChartJS
function populateData(param, type) {
  let labels = [];
  let totals = [];
  let bgColor = [];
  let labelName = '';
  switch (type) {
    // type genre = label & total
    case 'genre':
      param.forEach((item) => labels.push(item.label));
      param.forEach((item) => totals.push(item.total));
      bgColor = colors.slice(0, 13);
      labelName = 'Total Artist';
      break;
    // type song = label & total
    case 'song':
      param.forEach((item) => labels.push(item.label));
      param.forEach((item) => totals.push(item.total));
      bgColor = colors.slice(1, 13);
      labelName = 'Total Song';
      break;
    // type album = label & total
    case 'album':
      param.forEach((item) => labels.push(item.label));
      param.forEach((item) => totals.push(item.total));
      bgColor = colors.slice(2, 13);
      labelName = 'Total Album';
      break;
    default:
      param.forEach((item) => labels.push(item.label));
      param.forEach((item) => totals.push(item.total));
      bgColor = colors.slice(2, 13);
      labelName = 'Total';
      break;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: labelName,
        data: totals,
        backgroundColor: bgColor,
        categoryPercentage: 0.8,
        barPercentage: 0.8,
      },
    ],
  };
  return data;
}

const options = {
  plugins: {
    legend: {
      labels: {
        font: {},
        color: '#888',
      },
    },
  },
};

const optionsBarChart = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#888',
      },
      grid: {
        color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
      },
    },
    y: {
      ticks: {
        color: '#888',
        stepSize: 1,
      },
      grid: {
        color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
      },
    },
  },
};

const optionsHorizontalBarChart = {
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: '#888',
        stepSize: 1,
      },
      grid: {
        color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
      },
    },
    y: {
      ticks: {
        color: '#888',
        autoSkip: windowWidth > 500 ? false : true,
        // autoSkip: false,
        font: {
          size: 11,
        },
      },
      grid: {
        color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
      },
    },
  },
};

export { colors, populateData, options, optionsBarChart, optionsHorizontalBarChart };
