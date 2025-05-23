<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue';
import Chart from 'primevue/chart';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { fetchStatusCard } from '../api/StatusCardApi';
import type { ProjectDetails} from '@/types/ProjectUser';

const props = defineProps<{
  value: ProjectDetails[];
}>();

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const palette = ['#70728f', '#e47c40', '#e4ce3d', '#94c440', '#56a1e1'];
const defaultCategories = ['New', 'In Progress', 'Ready for Test', 'Closed', 'Needs Info'];

const projects : Ref<Array<ProjectDetails>> = ref([]);

const selectedProject = ref<number | null>(1);

const chartData = ref({
  labels: defaultCategories,
  datasets: [
    {
      data: [0, 0, 0, 0, 0],
      backgroundColor: defaultCategories.map((_, i) => palette[i % palette.length]),
      hoverBackgroundColor: defaultCategories.map((_, i) => palette[i % palette.length]),
      borderColor: defaultCategories.map((_, i) => palette[i % palette.length]),
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
      formatter: (value: number, context: any) => {
        const dataset = context.chart.data.datasets[0];
        const total = dataset.data.reduce((sum: number, val: number) => sum + val, 0);
        if (total === 0 || value === 0) return '';
        const percentage = (value / total) * 100;
        if (percentage === 0) return '';
        return `${percentage.toFixed(2)}%`;
    },
  },
},
});

/**
 * Updates the chart data based on selected project
 * @param {number} projectId - ID of the selected project
 * @returns {Promise<void>}
 */
const updateChart = async (projectId: number) => {
  try {
    const apiData = await fetchStatusCard(projectId);

    // Check if apiData is empty or invalid, if so, set chart data to 0
    if (!apiData || apiData.length === 0) {
      chartData.value.datasets[0].data = [0, 0, 0, 0, 0];
    } else {
      const convertedData = defaultCategories.map(category => {
        const status = apiData.find((item: { statusName: string }) =>
          item.statusName.toLowerCase().trim() === category.toLowerCase().trim()
        );
        return status ? status.count : 0;
      });

      chartData.value.datasets[0].data = convertedData;
    }
  } catch (error) {
    console.error('Error updating chart:', error);
    // In case of error, set chart data to zero
    chartData.value.datasets[0].data = [0, 0, 0, 0, 0];
  }
};

watch(selectedProject, (selectedId) => {
  if (selectedId) {
    updateChart(selectedId);
  }
});

onMounted(() => {
  projects.value = props.value;
  if (selectedProject.value) {
    updateChart(selectedProject.value);
  }
});
</script>

<template>
  <div class="chart-card">
    <h3>Status by Project</h3>

    <select v-model="selectedProject">
      <option disabled value="">Select a project</option>
      <option v-for="project in projects" :key="project.projectId" :value="project.projectId">
        {{ project.projectName }}
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
