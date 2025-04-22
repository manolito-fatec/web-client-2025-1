<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Chart from 'primevue/chart';
import { Chart as ChartJS } from 'chart.js';
import ChartSelectlist from './ChartSelectlist.vue';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { fetchTagsbyCard } from '@/api/TagsByCardApi';

ChartJS.register(DataLabelsPlugin);



const chartData = ref({
  labels: ['back-end', 'front-end', 'dev-ops', 'UX'],
  datasets: [
    {
      label: 'Tags',
      backgroundColor: '#36A2EB',
      borderColor: '#36A2EB',
      data: [5, 3, 3, 6],
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
      },
      grid: {
        display: false,
      },
      max: 7,
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
    datalabels: {
      color: '#e0e0e0',
      anchor: 'end',
      align: 'top',
      formatter: (value: number) => value.toString(),
    }
  },
});

const projects = [
  { name: 'Manolito', id: 1637322 },
  { name: 'Fatec', id: 1657675 }
];

//Mocked data for selectlist
const projectsOptions = projects.map((project) => project.name);
const selectedOption= ref<string>(projectsOptions[0]);

const selectedProjectId = computed(() => {
  const project = projects.find(p => p.name === selectedOption.value);
  return project ? project.id : null;
});

onMounted(() => {
    if (selectedProjectId.value) {
    fetchTagsbyCard(1, selectedProjectId.value);
  }
});

</script>

<template>
  <div class="chart-card">
    <h3>Tags by cards</h3>
    <div class="selects-container">
      <ChartSelectlist :options="projectsOptions" :model-value="selectedOption"></ChartSelectlist>
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
  background-color: #0C1635;
  box-shadow: 0 0 0 2px rgba(61, 126, 255, 0.3);
}
</style>