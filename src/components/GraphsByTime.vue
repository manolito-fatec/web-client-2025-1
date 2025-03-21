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
  labels: [''],
  datasets: [
    {
      label: 'Created', 
      data: [150],
      backgroundColor: '#FF8181', 
    },
    {
      label: 'Done', 
      data: [200],
      backgroundColor: '#61E1A1', 
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
  barPercentage: 0.5, // ✅ Funciona para barras horizontais
  indexAxis: 'y',
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x:{
      grid:{
        color: '#FFF',
      }
    }
  }
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
    chartData.value.datasets[0].data = [
      Math.floor(Math.random() * 200),
      Math.floor(Math.random() * 200),
    ];
  }
});
</script>

<template>
  <div class="chart-wrapper">
    <h2 class="chart-title">Cards created and completed by period</h2>
    <div class="chart-inputs">
      <div class="input-group">
        <p>Start date</p>
        <input type="date" v-model="startDate" />
      </div>
      <div class="input-group">
        <p>End date</p>
        <input type="date" v-model="endDate" />
      </div>
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
  background: #01081F;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  overflow-x: visible;
  max-width: 30rem;
  margin: 0 auto;

  p {
    color: #FFF;
    }

  .chart-title {
    color: #3D7EFF;
    margin: 0;
    font-size: 1rem;
  }

  .chart-inputs {
    display: flex;
    gap: 2rem; 
    background: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    backdrop-filter: blur(3px);
  
    .input-group {
      display: flex;
      flex-direction: column;  // 🔥 Coloca o <p> acima do <input>
      align-items: center;
      gap: 0.25rem;
    }
  
    input[type='date'] {
      padding: 0.25rem 0.5rem;
      font-size: 0.6rem;
      border-radius: 8px;
      color: #FFF;
      background-color: #5E6A81;
      min-width: 100px; // Deixa o input mais legível
      text-align: center;
    }
  }

  .chart {
    width: 100%;
    height: 100%;
  }
  

  @media only screen and (orientation: portrait) and (max-width: 768px) {
    height: 15rem;
    gap: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    height: auto;
    
  
    .chart {
      display: flex;
      justify-content: center; 
      align-items: center;
      height: 8rem;
      width: 100%;
    }
  
    .p-chart.chart {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .p-chart.chart {
      align-content: center;
    }
    .chart-inputs {
      padding: 0px;;

      input[type='date'] {
        padding: 2px;
      }
    }
    
  }
}
</style>
