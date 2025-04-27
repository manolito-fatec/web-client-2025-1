<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Chart from 'primevue/chart';
import { Chart as ChartJS } from 'chart.js';
import ChartSelectlist from './ChartSelectlist.vue';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { fetchTagsbyCard } from '@/api/TagsByCardApi';

/**
 * Registers the DataLabels plugin for ChartJS.
 */
ChartJS.register(DataLabelsPlugin);

/**
 * Reactive reference for the chart data.
 * @property {string[]} labels - Array of tag names to display on the chart.
 * @property {Array<{ label: string, backgroundColor: string, borderColor: string, data: number[] }>} datasets - Configuration for the chart dataset.
 */
const chartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Tags',
      backgroundColor: '#36A2EB',
      borderColor: '#36A2EB',
      data: [] as number[],
    },
  ],
});

/**
 * Reactive reference for the chart options.
 * @property {boolean} responsive - Enables chart responsiveness.
 * @property {boolean} maintainAspectRatio - Prevents the chart from maintaining aspect ratio.
 * @property {object} scales - Configuration for X and Y axes.
 * @property {object} plugins - Configuration for chart plugins (legend, datalabels).
 */
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#e0e0e0',
      },
      grid: {
        display: false,
      },
    },
    x: {
      ticks: {
        color: '#e0e0e0',
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: '#e0e0e0',
      anchor: 'end',
      align: 'top',
      formatter: (value: number) => value.toString(),
    }
  },
});

/**
 * List of available projects.
 * @property {string} name - The display name of the project.
 * @property {number} id - The unique ID of the project.
 */
const projects = [
  { name: 'Manolito', id: 1637322 },
  { name: 'Fatec', id: 1657675 }
];

/**
 * Mapped project names for the dropdown options.
 */
const projectsOptions = projects.map((project) => project.name);

/**
 * Reactive reference for the currently selected project.
 */
const selectedOption = ref<string>(projectsOptions[0]);

/**
 * Computed property to get the selected project's ID.
 * @returns {number | null} The ID of the selected project, or null if not found.
 */
const selectedProjectId = computed(() => {
  const project = projects.find(p => p.name === selectedOption.value);
  return project ? project.id : null;
});

/**
 * Updates the chart data based on the selected project.
 * @param {number} projectId - The ID of the project to fetch tags for.
 * @throws {Error} If the API request fails, logs the error and resets the chart data.
 */
async function updateChartData(projectId: number) {
  try {
    const response = await fetchTagsbyCard(projectId);

    const tags = response.map((item: { tagName: string }) => item.tagName);
    const counts = response.map((item: { count: number }) => item.count);

    chartData.value = {
      labels: tags,
      datasets: [{
        ...chartData.value.datasets[0],
        data: counts
      }]
    };
    Math.max(...counts, 0);
    chartOptions.value = {
      ...chartOptions.value,
      scales: {
        ...chartOptions.value.scales,
        y: {
          ...chartOptions.value.scales?.y,
        }
      }
    };
  } catch (error) {
    console.error('Error fetching tags by card:', error);
    chartData.value = {
      labels: [],
      datasets: [{
        ...chartData.value.datasets[0],
        data: []
      }]
    };
  }
}

/**
 * Watches for changes in the selected project and updates the chart accordingly.
 */
watch(selectedOption, (newValue) => {
  const project = projects.find(p => p.name === newValue);
  if (project) {
    updateChartData(project.id);
  }
});

/**
 * Fetches initial chart data when the component is mounted. Only fetches when the jwt token is present.
 */
onMounted(() => {
  if (selectedProjectId.value && sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== undefined) {
    updateChartData(selectedProjectId.value);
  }
});
</script>

<template>
  <div class="chart-card">
    <h3>Tags by cards</h3>
    <div class="selects-container">
      <ChartSelectlist
          :options="projectsOptions"
          v-model="selectedOption"
      ></ChartSelectlist>
    </div>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-card {
  background-color: #01081F;
  padding: 20px;
  border-radius: 8px;
  color: #3D7EFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
}

.selects-container {
  display: flex;
  gap: 20%;
  justify-content: center;
}

.select-wrapper {
  position: relative;
}

.chart-select {
  background-color: #0C1635;
  border-color: #0C1635 ;
  color: #e0e0e0;
  padding: 8px 40px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chart-select:hover {
  border-color: #3D7EFF;
}

.chart-select:focus {
  outline: none;
  background-color: #0C1635;
  box-shadow: 0 0 0 2px rgba(61, 126, 255, 0.3);
}
</style>