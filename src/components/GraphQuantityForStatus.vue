/**
 * Componente para exibição de gráfico de quantidade de cards por status
 * @component
 * @description Exibe um gráfico de barras interativo com filtros de data e tipo de projeto
 * 
 * @example
 * <StatusCardChart />
 * 
 * @props
 * @param {number} [operatorId=1] - ID do operador para filtragem
 * 
 * @emits
 * @emit data-updated - Disparado quando os dados do gráfico são atualizados
 * 
 * @dependencies
 * @requires axios - Biblioteca para requisições HTTP
 * @requires primevue/chart - Componente de gráfico do PrimeVue
 */
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import Chart from 'primevue/chart';
import { fetchTaskStatus } from '@/api/GraphQtdByStatusApi';

const operatorIdRef:Ref<number> = ref<number>(1);
const projectOriginalIdRef:Ref<number> = ref<number>(1637322);

const props = defineProps({
  operatorId: {
    type: Number,
    default: 1,
  },
  projectOriginalId: {
    type: Number,
    default: 1637322,
  },
});




/**
 * Computed para os dados do gráfico
 */
const chartData = ref<{
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string[] }[];
}>({
  labels: ['Closed', 'In Progress','New', 'Ready for Test',  'Needs Info'],
  datasets: [
    {
      label: 'Cards',
      data: [],
      backgroundColor: ['#A181FF', '#61E1A1', '#FF8181',  '#61A1E1',  '#FFB681'],
    },
  ],
});

/**
 * Configurações do gráfico
 */
const chartOptions = ref({
  responsive: true,
  onresize: (chart: { resize: () => void }) => {
    chart.resize();
  },
  barPercentage: 0.5,
  indexAxis: 'x',
  plugins: {
    legend: {
      display: false, 
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value: unknown) {
          // Mostra apenas números inteiros
          if (Number.isInteger(value)) {
            return value;
          }
          return ''; // Não exibe nada para números decimais
        },
        color: '#FFF', // Cor dos números no eixo
      },
      grid: {
        display: false, // Remove as linhas horizontais do fundo
      },
    },
    x: {
      ticks: {
        color: '#FFF', // Cor dos rótulos no eixo
      },
      grid: {
        display: false, // Remove as linhas verticais do fundo
      },
    },
  },
});

/**
 * Busca dados da API e atualiza o gráfico
 * @async
 * @function fetchData
 * @throws {Error} Erro na requisição à API
 */


const chartLabels = ['In Progress', 'New', 'Ready for Test', 'Closed', 'Needs Info'];
// Processamento dos dados conforme a nova estrutura
const statusData:Ref<statusDataObj> = ref<statusDataObj>({
  statusName: 'In Progress',
  count: 0,
});

type statusDataObj = {
  statusName: string;
  count: number;
}


chartData.value = {
  labels: ['In Progress','New', 'Ready for Test', 'Closed', 'Needs Info'],
  datasets: [
    {
      label: 'Cards',
      data: [
        statusData.value.count,
      ],
      backgroundColor: ['#61E1A1', '#FF8181', '#61A1E1', '#A181FF', '#FFB681'],
    },
  ],
};

onMounted(() => {
  operatorIdRef.value = props.operatorId;
  fetchTaskStatus(operatorIdRef.value, projectOriginalIdRef.value).then((apiData) => {
    const statusCounts = chartLabels.map(label => {
      const normalizedLabel = label.toLowerCase().trim();
      const matchingStatus = apiData.find((item: { statusName: string; }) => 
        item.statusName.toLowerCase().trim() === normalizedLabel
      );
      return matchingStatus ? matchingStatus.count : 0;
    });

    // Update chart data
    chartData.value = {
      labels: chartLabels,
      datasets: [{
        label: 'Cards',
        data: statusCounts,
        backgroundColor: ['#61E1A1', '#FF8181', '#61A1E1', '#A181FF', '#FFB681']
      }]
    };
  });
});
</script>

<template>
  <div class="chart-wrapper">
    <h2 class="chart-title"> Quantity of Cards per Status</h2>
    <Chart type="bar" :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  position: relative;
  display: flex;
  flex-direction: column; 
  align-items: center;
  gap: 1%;
  padding: 1rem;
  background: #01081F;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  overflow:hidden;
  margin: 0 auto;

  p {
    color: #FFF;
    }

  .chart-title {
    color: #3D7EFF;
    margin: 0;
    font-size: 1rem;
  }


  .chart {
    width: 100%;
    height: 90%;
  }
  

  @media only screen and (orientation: portrait) and (max-width: 720px) {
    height: 20%;
    width: 100%;
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
      height: 100%;
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
    
  }
}
</style>