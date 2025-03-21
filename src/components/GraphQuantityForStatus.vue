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
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'primevue/chart';

/**
 * Data inicial do filtro no formato YYYY-MM-DD
 * @type {string}
 */
const startDate = ref<string>('');

/**
 * Data final do filtro no formato YYYY-MM-DD
 * @type {string}
 */
const endDate = ref<string>('');

/**
 * ID do operador para filtragem
 * @type {number}
 * @default 1
 */
const operatorId = ref<number>(1);
/**
 * Tipo de projeto selecionado
 * @type {'KANBAN' | 'SCRUM'}
 * @default 'KANBAN'
 */
const typeProject = ref<'KANBAN' | 'SCRUM'>('KANBAN');

/**
 * Dados do gráfico
 * @type {Object}
 * @property {string[]} labels - Rótulos das categorias
 * @property {Array<Object>} datasets - Conjuntos de dados
 */
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
});

/**
 * Opções de configuração do gráfico
 * @type {Object}
 */
const chartOptions = ref({
  responsive: true,
  barThickness: 30,
  indexAxis: 'x',
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: {
      grid: { color: '#FFF' },
      ticks: { color: '#FFF' }
    },
    y: {
      grid: { color: '#FFF' },
      ticks: { color: '#FFF' }
    },
  },
});

/**
 * Busca dados da API e atualiza o gráfico
 * @async
 * @function fetchData
 * @throws {Error} Erro na requisição à API
 */
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
</script>

<template>
  <div class="chart-wrapper">
    <h2 class="chart-title"> Quantity of Cards per Status</h2>
    <div class="chart-inputs">
      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />
      <select v-model="typeProject">
        <option value="KANBAN">Kanban</option>
        <option value="SCRUM">Scrum</option>
      </select>
    </div>
    <Chart type="bar" :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<style lang="scss" scoped>
/* Estilos mantidos sem alterações */
.chart-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza os elementos horizontalmente */
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: #01081F;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  height: auto;
  overflow-x: hidden;
  margin: 0 auto;

  .chart-title {
    color: #3D7EFF;
    margin: 0;
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
  }

  .chart {
    width: 100%;
    height: auto;
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