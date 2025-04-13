<script setup lang="ts">
import { ref } from 'vue';
import Chart from 'primevue/chart';
import ChartSelectlist from './ChartSelectlist.vue';
import { PriorityEnum } from '../enums/PriorityEnum';

const chartData = ref({
  labels: ['Bug', 'Enhancement', 'Question'],
  datasets: [
    {
      label: 'Issues', 
      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
      borderColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
      //Mocked data, todo: replace with real data from API when André makes the endpoint
      data: [8, 13, 5], 
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        color: '#e0e0e0',
        stepSize: 5,
      },
      grid: {
        color: '#3a3a5e',
      },
      max: 15, 
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
  },
  datasets: {
    bar: {
      barPercentage: 0.5, 
      categoryPercentage: 0.8, 
    }
  }
});

// Mocked left selectlist
const timePeriods = ['Manolito', 'Fatec'] as const
const selectedPeriod = ref<typeof timePeriods[number]>('Manolito')

//Mocked right selectlist
const numberOptions = PriorityEnum as const
const selectedNumber = ref<typeof numberOptions[number]>('ALL')

</script>

<template>
  <div class="chart-card">
    <h3>Issue by Project</h3>
    <div class="selects-container">
        <div class="select-wrapper">
            <ChartSelectlist
              :options="timePeriods"
              v-model="selectedPeriod"/>
        </div>
        
        <div class="select-wrapper">
          <ChartSelectlist
            :options="numberOptions"
            v-model="selectedNumber"/>
        </div>
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
    margin-bottom: 15px;
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
    box-shadow: 0 0 0 2px rgba(61, 126, 255, 0.3);
  }

</style>