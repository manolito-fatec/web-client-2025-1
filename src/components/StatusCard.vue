<script setup lang="ts">
import { ref } from 'vue';
import Chart from 'primevue/chart';

// Mock Data based
const chartData = ref( {
  labels: ['New', 'In Progress', 'Ready for Test'],
  datasets: [
    {
      data: [55, 25, 20],
      backgroundColor: ['#FF6388', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF1C4C', '#1586D2', '#FFBA12'],
      borderColor: ['#FF6388', '#36A2EB', '#FFCE56'],
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
}

.chart-card h3 {
margin-top: 0;
margin-bottom: 15px;
text-align: center;
}
</style>