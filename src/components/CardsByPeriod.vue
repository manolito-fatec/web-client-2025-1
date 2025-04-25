<script setup lang="ts">
import { type Ref, ref, watch} from 'vue';
import Chart from 'primevue/chart';
import { fetchCardsByPeriod } from "@/api/CardsByPeriodAPI.ts";

/**
 * Reactive chart data configuration.
 * @property {string[]} labels - Labels for the chart axes.
 * @property {Array<{label: string, backgroundColor: string, borderColor: string, data: number[]}>} datasets -
 *        Chart datasets configuration including visual styling and data points.
 */
const chartData = ref({
  labels: ['Period'],
  datasets: [
    {
      label: 'Created',
      backgroundColor: '#4BC0C0',
      borderColor: '#4BC0C0',
      data: [0],
    },
    {
      label: 'Done',
      backgroundColor: '#FF6384',
      borderColor: '#FF6384',
      data: [0],
    },
  ],
});

/**
 * Reactive chart options configuration.
 * @property {boolean} responsive - Enables responsive chart behavior.
 * @property {boolean} maintainAspectRatio - Disables fixed aspect ratio.
 * @property {string} indexAxis - Sets the chart orientation (y-axis for horizontal bars).
 * @property {object} scales - Axis configuration including ticks and grid styling.
 * @property {object} plugins - Chart plugins configuration (legend, datalabels).
 */
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  scales: {
    x: {
      ticks: {
        color: '#e0e0e0',
        stepSize: 5,
      },
      grid: {
        color: '#3a3a5e',
      },
      max: 20,
    },
    y: {
      ticks: {
        color: '#e0e0e0',
      },
      grid: {
        color: '#3a3a5e',
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#FFFFFF',
        usePointStyle: true,
      },
    },
    datalabels: {
      anchor: 'end',
      align: 'start',
      color: '#fff',
      font: {
        weight: 'bold',
      },
      formatter: (value: number) => value.toString(),
      offset: -20,
    },
  },
});

/**
 * Reactive reference for the start date filter.
 */
const startDate = ref<string>('') as Ref<string>

/**
 * Reactive reference for the end date filter.
 */
const endDate = ref<string>('') as Ref<string>

/**
 * Reactive loading state indicator.
 */
const isLoading = ref(false) as Ref<boolean>

/**
 * Fetches and updates chart data based on selected date range.
 * @async
 * @throws {Error} Logs errors to console if API request fails.
 */

// Use o tipo nas suas refs

async function updateChartData() {
  if (!startDate.value || !endDate.value) return;

  try {
    isLoading.value = true;
    const response = await fetchCardsByPeriod(1637322, startDate.value, endDate.value);

    chartData.value = {
      labels: ['Period'],
      datasets: [
        {
          label: 'Created',
          backgroundColor: '#4BC0C0',
          borderColor: '#4BC0C0',
          data: [response.createdTaskCount || 0]
        },
        {
          label: 'Done',
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          data: [response.completedTaskCount || 0],
        },
      ],
    };

    const maxValue = Math.max(response.createdTaskCount || 0, response.completedTaskCount || 0);
    chartOptions.value.scales.x.max = Math.ceil(maxValue / 5) * 5 + 5;

  } catch (error) {
    console.error('Error fetching chart data:', error);
  } finally {
    isLoading.value = false;
  }
}

/**
 * Watches for changes in date range and triggers chart updates.
 */
watch([startDate, endDate], () => {
  updateChartData();
});


defineExpose({
  startDate,
  endDate,
  isLoading,
  chartData,
  chartOptions,
  updateChartData
})
</script>

<template>
  <div class="chart-card">
    <h3>Cards created and completed by period</h3>
    <div class="filters">
      <div class="filter">
        <label for="start-date">Start:</label>
        <input id="start-date" type="date" v-model="startDate" :max="endDate || undefined" />
      </div>

      <div class="filter">
        <label for="end-date">End:</label>
        <input id="end-date" type="date" v-model="endDate" :min="startDate || undefined" />
      </div>
    </div>

    <div v-if="isLoading" class="loading-indicator">
      Loading data...
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

.filters {
  display: flex;
  justify-content: space-around;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  font-size: 0.9em;
}

input[type="date"] {
  background-color: #0A1237;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.loading-indicator {
  color: #fff;
  text-align: center;
  padding: 10px;
}
</style>