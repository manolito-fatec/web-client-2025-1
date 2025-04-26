<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Chart from 'primevue/chart';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const palette = ['#70728f', '#e47c40', '#e4ce3d', '#94c440', '#56a1e1'];

const categorias = ['New', 'In Progress', 'Ready for Test', 'Closed', 'Needs Info'];

// Mock data for projects
const projetos = ref([
  { id: 1, nome: 'Projeto A', dados: [55, 25, 20, 0, 0] },
  { id: 2, nome: 'Projeto B', dados: [30, 40, 20, 10, 0] },
  { id: 3, nome: 'Projeto C', dados: [0, 15, 60, 25, 0] },
]);

const projetoSelecionado = ref<number | null>(1);

const chartData = ref({
  labels: categorias,
  datasets: [
    {
      data: projetos.value[0].dados,
      backgroundColor: categorias.map((_, i) => palette[i % palette.length]),
      hoverBackgroundColor: categorias.map((_, i) => palette[i % palette.length]),
      borderColor: categorias.map((_, i) => palette[i % palette.length]),
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
      formatter: (value: number) => value === 0 ? '' : `${value}%`,
    },
  },
});

watch(projetoSelecionado, (idSelecionado) => {
  const projeto = projetos.value.find(p => p.id === idSelecionado);
  if (projeto) {
    chartData.value.datasets[0].data = projeto.dados;
  }
});
</script>

<template>
  <div class="chart-card">
    <h3>Status por Projeto</h3>

    <select v-model="projetoSelecionado">
      <option disabled value="">Selecione um projeto</option>
      <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
        {{ projeto.nome }}
      </option>
    </select>

    <div class="chart-wrapper">
      <Chart type="pie" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.chart-card {
  background-color: #01081F;
  padding: 3%;
  border-radius: 8px;
  color: #3D7EFF;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-card h3 {
  margin-top: 0;
  text-align: center;
}

select {
  background-color: #0A1237;
  color: white;
  font-size: 0.9rem;
  padding: 0.3rem;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
  width: 80%;
  text-align: center;
}

.chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>