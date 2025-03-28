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
<<<<<<< HEAD
import { ref, watch, onMounted } from 'vue';
=======
import { computed, onMounted, ref, type Ref } from 'vue';
>>>>>>> bae8bff (♻️ (Refactor)Refactor the component structure for responsiveness)
import axios from 'axios';
import Chart from 'primevue/chart';

/**
 * Tipo para os dados retornados pela API
 */
export type TaskByStatusGraphObj = {
  statusName: string;
  count: number;
};

/**
 * ID do operador para filtragem
 */
<<<<<<< HEAD
const operatorId = ref<number>(1);
/**
 * Tipo de projeto selecionado
 * @type {'KANBAN' | 'SCRUM'}
 * @default 'KANBAN'
 */
const typeProject = ref<'KANBAN' | 'SCRUM'>('KANBAN');
=======
const operatorId: Ref<number> = ref<number>(2);
>>>>>>> bae8bff (♻️ (Refactor)Refactor the component structure for responsiveness)

/**
 * Dados do gráfico
 */
<<<<<<< HEAD
const chartData = ref<{
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string[] }[];
}>({
  labels: ['New', 'Ready', 'In Progress', 'Ready for Test', 'Done', 'Archived'],
  datasets: [
    {
      label: 'Cards',
      data: [10, 20, 30, 40, 50, 60],
      backgroundColor: ['#FF8181', '#FFB681', '#61E1A1', '#61A1E1', '#A181FF', '#8181FF'],
    },
  ],
=======
const chartDataObjValue: Ref<TaskByStatusGraphObj[]> = ref([]);

/**
 * Função para buscar os dados da API
 */
function getChartDataFromApi() {
  axios
    .get(`http://localhost:8080/status/${operatorId.value}/1637322`)
    .then((response) => {
      chartDataObjValue.value = response.data; // Atualiza os dados com o array retornado pela API
    })
    .catch((error) => {
      console.error('Erro ao buscar dados da API:', {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      });
    });
}

/**
 * Computed para os dados do gráfico
 */
const chartData = computed(() => {
  const labels = chartDataObjValue.value.map((item) => item.statusName); // Extrai os nomes dos status
  const data = chartDataObjValue.value.map((item) => item.count); // Extrai os valores de contagem

  return {
    labels,
    datasets: [
      {
        label: 'Cards',
        data,
        backgroundColor: ['#FF8181', '#61E1A1', '#61A1E1', '#A181FF', '#FFB681'], // Cores para as colunas
        borderColor: '#FFFFFF', // Cor da borda das barras
        borderWidth: 2, // Largura da borda
      },
    ],
  };
>>>>>>> bae8bff (♻️ (Refactor)Refactor the component structure for responsiveness)
});

/**
 * Configurações do gráfico
 */
const chartOptions = ref({
  responsive: true,
  barPercentage: 0.5,
  indexAxis: 'x',
  plugins: {
    legend: {
      display: false, // Remove a legenda inferior
    },
  },
  scales: {
<<<<<<< HEAD
    x: {
      grid: { color: '#FFF' },
      ticks: { color: '#FFF' }
    },
    y: {
      grid: { color: '#FFF' },
      ticks: { color: '#FFF' }
=======
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
>>>>>>> bae8bff (♻️ (Refactor)Refactor the component structure for responsiveness)
    },
  },
});

/**
 * Busca os dados ao montar o componente
 */
<<<<<<< HEAD
const fetchData = async () => {
  try {
    // Dados mockados para teste
    const mockData = typeProject.value === 'KANBAN'
      ? { 
          quantityStatusNew: 10,
          quantityStatusReady: 30,
          quantityStatusInProgress: 50,
          quantityStatusReadyForTest: 20,
          quantityStatusDone: 50,
          quantityStatusArchived: 40,
        }
      : { 
          quantityStatusNew: 5,
          quantityStatusInProgress: 3,
          quantityStatusReadyForTest: 2,
          quantityStatusClosed: 1,
          quantityStatusNeedsInfo: 4,
        };

    // Atualiza chartData com os dados mockados
    if (typeProject.value === 'KANBAN') {
      chartData.value = {
        labels: ['New', 'Ready', 'In Progress', 'Ready for Test', 'Done', 'Archived'],
        datasets: [
          {
            label: 'Cards',
            data: [
              mockData.quantityStatusNew,
              mockData.quantityStatusReady ?? 0,
              mockData.quantityStatusInProgress,
              mockData.quantityStatusReadyForTest,
              mockData.quantityStatusDone ?? 0,
              mockData.quantityStatusArchived ?? 0,
            ],
            backgroundColor: ['#FF8181', '#FFB681', '#61E1A1', '#61A1E1', '#A181FF', '#8181FF'],
          },
        ],
      };
    } else if (typeProject.value === 'SCRUM') {
      chartData.value = {
        labels: ['New', 'In Progress', 'Ready for Test', 'Closed', 'Needs Info'],
        datasets: [
          {
            label: 'Cards',
            data: [
              mockData.quantityStatusNew,
              mockData.quantityStatusInProgress,
              mockData.quantityStatusReadyForTest,
              mockData.quantityStatusClosed ?? 0,
              mockData.quantityStatusNeedsInfo ?? 0,
            ],
            backgroundColor: ['#FF8181', '#61E1A1', '#61A1E1', '#A181FF', '#FFB681'],
          },
        ],
      };
    }

    console.log('Dados mockados aplicados:', chartData.value); // Para depuração

    // Requisição à API (comentada para testes)
    /*
    const response = await axios.get('/api/cards/status', {
      params: {
        operatorId: operatorId.value,
        typeProject: typeProject.value,
      },
    });

    const data = response.data;

    if (typeProject.value === 'KANBAN') {
      chartData.value = {
        labels: ['New', 'Ready', 'In Progress', 'Ready for Test', 'Done', 'Archived'],
        datasets: [
          {
            label: 'Cards',
            data: [
              data.quantityStatusNew,
              data.quantityStatusReady,
              data.quantityStatusInProgress,
              data.quantityStatusReadyForTest,
              data.quantityStatusDone,
              data.quantityStatusArchived,
            ],
            backgroundColor: ['#FF8181', '#FFB681', '#61E1A1', '#61A1E1', '#A181FF', '#8181FF'],
          },
        ],
      };
    } else if (typeProject.value === 'SCRUM') {
      chartData.value = {
        labels: ['New', 'In Progress', 'Ready for Test', 'Closed', 'Needs Info'],
        datasets: [
          {
            label: 'Cards',
            data: [
              data.quantityStatusNew,
              data.quantityStatusInProgress,
              data.quantityStatusReadyForTest,
              data.quantityStatusClosed,
              data.quantityStatusNeedsInfo,
            ],
            backgroundColor: ['#FF8181', '#61E1A1', '#61A1E1', '#A181FF', '#FFB681'],
          },
        ],
      };
    }
    */
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

watch([startDate, endDate, typeProject], fetchData);
onMounted(fetchData);
=======
onMounted(() => {
  getChartDataFromApi();
});
>>>>>>> bae8bff (♻️ (Refactor)Refactor the component structure for responsiveness)
</script>

<template>
  <div class="chart-wrapper">
<<<<<<< HEAD
    <h2 class="chart-title"> Quantity of Cards per Status</h2>
    <div class="chart-inputs">
      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />
      <select v-model="typeProject">
        <option value="KANBAN">Kanban</option>
        <option value="SCRUM">Scrum</option>
      </select>
    </div>
=======
    <h2 class="chart-title">Cards by Status</h2>
>>>>>>> bae8bff (♻️ (Refactor)Refactor the component structure for responsiveness)
    <Chart type="bar" :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
/* Estilos mantidos sem alterações */
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
<<<<<<< HEAD
  max-width: 100%;
  height: auto;
  overflow-x: hidden;
=======
  height: 100%;
  overflow-x: visible;
  max-width: 30rem;
>>>>>>> bae8bff (♻️ (Refactor)Refactor the component structure for responsiveness)
  margin: 0 auto;

  p {
    color: #FFF;
  }

  .chart-title {
    color: #3D7EFF;
    margin: 0;
<<<<<<< HEAD
    font-size: 1rem;
    text-align: center; /* Centraliza o título */
  }

  .chart-inputs {
    display: flex;
    flex-wrap: wrap; /* Permite que os inputs fiquem em várias linhas em telas menores */
    gap: 1rem; /* Espaçamento entre os inputs */
    justify-content: center; /* Centraliza os inputs horizontalmente */
    padding: 0.5rem 1rem;
    border-radius: 4px;
    backdrop-filter: blur(3px);

    input[type='date'],
    select {
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
      border-radius: 8px;
      color: #FFF;
      background-color: #5E6A81;
      min-width: 120px; /* Define uma largura mínima para os inputs */
    }
=======
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
>>>>>>> bae8bff (♻️ (Refactor)Refactor the component structure for responsiveness)
  }

  .chart {
    width: 100%;
    height: 100%;
    padding: 1rem;
    border: 2px solid #3D7EFF; /* Borda ao redor do gráfico */
    border-radius: 15px; /* Bordas arredondadas */
    background: rgba(255, 255, 255, 0.05); /* Fundo levemente transparente */
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
  }

  @media only screen and (orientation: portrait) and (max-width: 768px) {
    height: auto;

    .chart {
      height: 12rem;
    }

    .chart-inputs {
      padding: 0;
      gap: 0.5rem;

      input[type='date'],
      select {
        padding: 0.2rem;
        font-size: 0.7rem;
        min-width: 100px; /* Ajusta a largura mínima em telas menores */
      }
    }
  }
}
</style>