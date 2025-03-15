<script setup lang="ts">
import { ref, watch } from 'vue';
import Chart from 'primevue/chart';

const startDate = ref<string>('');
const endDate = ref<string>('');

/**
 * Mocked data and color configuration for chart.
 * @param backgroundColor - Sets the color of the bars.
 */
const chartData = ref({
  labels: ['Created', 'Done'],
  datasets: [
    {
      label: 'Cards',
      data: [150, 200], // Mock inicial
      backgroundColor: ['#42A5F5', '#66BB6A'],
    },
  ],
});

/**
 * Chart configuration params.
 * @property {boolean} responsive - Boolean value to toggle responsiveness.
 * @property {string} indexAxis - Sets the orientation of the bars based on the X or Y dimensions.
 * @property {object} plugins - Sets additional spans/components on the chart.
 */
const chartOptions = ref({
  responsive: true,
  indexAxis: 'y',
  plugins: {
    legend: {
      position: 'top',
    },
  },
});

/**
 * Mocked watch function to set the value of the chart based on the period.
 * @param {string} startDate - Value from date input.
 * @param {string} endDate - Value from date input.
 * @returns {void} - Updates the chart dataset based on random mocked data.
 */
watch([startDate, endDate], ([newStart, newEnd]) => {
  console.log('Datas selecionadas:', newStart, newEnd);
  if (newStart && newEnd) {
    // Simulando atualização dos dados com números aleatórios
    chartData.value.datasets[0].data = [
      Math.floor(Math.random() * 200), // Created
      Math.floor(Math.random() * 200), // Done
    ];
  }
});
</script>

<template>
  <div class="chart-wrapper">
    <h2 class="chart-title">Cards created and completed by period</h2>
    <div class="chart-inputs">
      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />
    </div>
    <Chart type="bar" :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  position: relative;
  display: flex;
  flex-direction: column; 
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;

  .chart-title {
    color: #3D7EFF;
    margin: 0;
    font-size: 1rem;
  }

  .chart-inputs {
    display: flex;
    gap: 5rem;
    background: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    backdrop-filter: blur(3px);

    input[type='date'] {
      padding: 0.25rem 0.5rem;
      font-size: 0.6rem;
      min-width: 60px;
    }
  }

  .chart {
    width: 100%;
    height: 20rem;
  }
}
</style>
