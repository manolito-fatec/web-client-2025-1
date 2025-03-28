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
import { ref, onMounted } from 'vue';
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
 * Dados do gráfico
 * @type {Object}
 * @property {string[]} labels - Rótulos das categorias
 * @property {Array<Object>} datasets - Conjuntos de dados
 */
const chartData = ref<{
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string[] }[];
}>({
  labels: ['New', 'In Progress', 'Ready for Test', 'Closed', 'Needs Info'],
  datasets: [
    {
      label: 'Cards',
      data: [], // Inicialmente vazio, será preenchido pela API
      backgroundColor: ['#FF8181', '#61E1A1', '#61A1E1', '#A181FF', '#FFB681'],
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
      grid: { display: false }, // Remove as linhas de grade no eixo X
      ticks: { color: '#FFF' },
    },
    y: {
      grid: { display: false }, // Remove as linhas de grade no eixo Y
      ticks: { color: '#FFF' },
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
    console.log('Iniciando requisição para o backend...');

    // Chamada ao endpoint do backend
    const response = await axios.get('http://localhost:8080/status/3/1637322', {
      params: {
        operatorId: operatorId.value,
        startDate: startDate.value,
        endDate: endDate.value,
      },
    });

    const data = response.data;

    // Atualiza chartData com os dados retornados pela API
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

    console.log('Dados da API aplicados:', chartData.value);
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
};

onMounted(fetchData);
</script>

<template>
  <div class="chart-wrapper">
    <h2 class="chart-title"> Quantity of Cards per Status</h2>
    <div class="chart-inputs">
      <div class="input-group">
        <label for="start-date">Start Date</label>
        <input id="start-date" type="date" v-model="startDate" />
      </div>
      <div class="input-group">
        <label for="end-date">End Date</label>
        <input id="end-date" type="date" v-model="endDate" />
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

    .input-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;

      label {
        font-size: 0.9rem;
        color: #FFF;
      }

      input[type='date'] {
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
        border-radius: 8px;
        color: #FFF;
        background-color: #5E6A81;
        min-width: 120px;
      }
    }
  }

  .chart {
    width: 100%;
    height: auto;
  }
}
</style>