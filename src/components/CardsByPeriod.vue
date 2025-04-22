  <script setup lang="ts">
import { ref } from 'vue';
import Chart from 'primevue/chart';

// Mock Data
const chartData = ref({
  labels: ['Period'],
  datasets: [
    {
      label: 'Created',
      backgroundColor: '#4BC0C0',
      borderColor: '#4BC0C0',
      data: [18],
    },
    {
      label: 'Done',
      backgroundColor: '#FF6384',
      borderColor: '#FF6384',
      data: [11],
    },
  ],
});

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
        color: '#e0e0e0',
        usePointStyle: true,
      },
    },
  },
});
</script>

<template>
  <div class="chart-card">
    <h3>Cards created and completed by period</h3>
    <div class="period">
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
  margin-bottom: 5px;
  /* Less space */
  text-align: center;
}

.period {
  display: flex;
  justify-content: space-around;
  font-size: 0.8em;
  color: #FFFFFF;
  margin-bottom: 15px;
}
</style>