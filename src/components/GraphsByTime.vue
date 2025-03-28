<script setup lang="ts">
import { computed, onMounted, ref , watch, type Ref } from 'vue';
import { fetchGraphsByTime } from '@/api/GraphsByTimeApi';
import Chart from 'primevue/chart';
import type { chartDataObj } from '@/types/ChartObjT';

const userId:Ref<number> = ref<number>(1);
const startDate = ref();
const endDate = ref();

const apiBody  =computed(() => 
  ({
  userIdRef: userId.value, 
  startDate: startDate.value,
  endDate: endDate.value
  })
);

const chartDataObjValue: Ref<chartDataObj> = ref<chartDataObj>({
  created: 0,
  done: 0,
});

const props = defineProps<{
  userIdProp:number;
}>();

function getChartDataFromApi() {
  fetchGraphsByTime(apiBody.value).then((data) => {
    chartDataObjValue.value.done = data[0].completedTaskCount;
    chartDataObjValue.value.created = data[0].completedTaskCount;
  });
}

onMounted(() => {
  userId.value = props.userIdProp;
});

/**
 * Mocked data and color configuration for chart.
 * @param backgroundColor - Sets the color of the bars.
 */
 const chartData = computed(() => ({
  labels: [''],
  datasets: [
    {
      label: 'Created', 
      data: [chartDataObjValue.value.created], 
      backgroundColor: '#FF8181',
    },
    {
      label: 'Done', 
      data: [chartDataObjValue.value.done],
      backgroundColor: '#61E1A1',
    },
  ],
}));



/**
 * Chart configuration params.
 * @property {boolean} responsive - Boolean value to toggle responsiveness.
 * @property {string} indexAxis - Sets the orientation of the bars based on the X or Y dimensions.
 * @property {object} plugins - Sets additional spans/components on the chart.
 */
const chartOptions = ref({
  responsive: true,
  barPercentage: 0.5,
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


watch([startDate, endDate], () => {
  if (startDate.value && endDate.value) {
    getChartDataFromApi();
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
