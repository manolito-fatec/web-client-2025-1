<script setup lang="ts">
import {ref, watch, onMounted, computed} from 'vue';
import Chart from 'primevue/chart';
import ChartSelectlist from './ChartSelectlist.vue';
import { fetchReworkCards } from '@/api/ReworkCardApi.ts';
import { PriorityEnum } from '../enums/PriorityEnum'
import { SeverityEnum } from '@/enums/SeverityEnum';

const chartData = ref({
  labels: ['Bug', 'Enhancement', 'Question'],
  datasets: [
    {
      label: 'Issues',
      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
      borderColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
      data: [0, 0, 0],
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


const projects = [
  { id: 1, name: 'Manolito' },
  { id: 2, name: 'Fatec' }
];
const selectedProject = ref<number>(projects[0].id);

const severityOptions = ref<string[]>(Object.values(SeverityEnum).filter(value => typeof value === 'string') as string[]);
const selectedSeverity = ref<string>(severityOptions.value[0]);

const priorityOptions = ref<string[]>(Object.values(PriorityEnum).filter(value => typeof value === 'string') as string[]);
const selectedPriority = ref<string>(priorityOptions.value[0]);

const fetchDataAndUpdateChart = async () => {
  try {
    const issuesData = await fetchReworkCards(
        selectedProject.value,
        selectedSeverity.value,
        selectedPriority.value
    );

    chartData.value = {
      labels: ['Bug', 'Enhancement', 'Question'],
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: [
            issuesData.Bug || 0,
            issuesData.Enhancement || 0,
            issuesData.Question || 0
          ]
        }
      ]
    };

    const maxValue = Math.max(
        issuesData.Bug || 0,
        issuesData.Enhancement || 0,
        issuesData.Question || 0
    );

    chartOptions.value.scales.y.max = maxValue + (5 - (maxValue % 5));

  } catch (error) {
    console.error('Error fetching data:', error);
    chartData.value.datasets[0].data = [0, 0, 0];
  }
};

const selectedProjectName = computed({
  get: () => projects.find(p => p.id === selectedProject.value)?.name || '',
  set: (newName: string) => {
    const project = projects.find(p => p.name === newName);
    if (project) {
      selectedProject.value = project.id;
    }
  }
});

onMounted(fetchDataAndUpdateChart);

watch([selectedProject, selectedSeverity, selectedPriority], fetchDataAndUpdateChart);
</script>

<template>
  <div class="chart-card">
    <h3>Issue by Project</h3>
    <div class="selects-container">
      <div class="select-wrapper">
        <ChartSelectlist
            :options="projects.map(p => p.name)"
            v-model="selectedProjectName"
            label="Project"
        />
      </div>

      <div class="select-wrapper">
        <ChartSelectlist
            :options="severityOptions"
            v-model="selectedSeverity"
            label="Severity"
        />
      </div>

      <div class="select-wrapper">
        <ChartSelectlist
            :options="priorityOptions"
            v-model="selectedPriority"
            label="Priority"
        />
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
  gap: 10%;
  margin-bottom: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.select-wrapper {
  position: relative;
  min-width: 150px;
  margin-bottom: 10px;
}

.chart-select {
  background-color: #0C1635;
  border-color: #0C1635;
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