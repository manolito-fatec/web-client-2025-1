<script setup lang="ts">
import { ref } from 'vue';
import Chart from 'primevue/chart';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const palette = ['#FC8F54', '#A79277', '#61E1A1', '#8E1616', '#98D8EF'];

const categorias = ['New', 'In Progress', 'Ready for Test', 'Closed', 'Needs Info'];

const valores = [55, 25, 20, 0, 0]; 

const backgroundColor = categorias.map((_, i) => palette[i % palette.length]);
const hoverBackgroundColor = backgroundColor.map(cor => cor);

const chartData = ref({
  labels: categorias,
  datasets: [
    {
      data: valores,
      backgroundColor,
      hoverBackgroundColor,
      borderColor: backgroundColor,
      borderWidth: 1,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left',
      labels: {
        color: '#FFFFFF',
        usePointStyle: true,
      },
    },
    datalabels: {
      color: '#000000',
      font: {
        size: 14,
      },
      formatter: (value: number) => `${value}%`,
    },
  },
});
</script>

<template>
  <div class="chart-card">
    <h3>Status Cards</h3>
    <Chart type="pie" :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-card {
  background-color: #01081F;
  padding: 20px;
  border-radius: 8px;
  color: #3D7EFF;
  display:grid
}

.chart-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
}

</style>
