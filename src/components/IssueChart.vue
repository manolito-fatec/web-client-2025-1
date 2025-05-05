<script setup lang="ts">
import {ref, watch, onMounted, computed} from 'vue';
import Chart from 'primevue/chart';
import ChartSelectlist from './ChartSelectlist.vue';
import { fetchReworkCards } from '@/api/ReworkCardApi.ts';
import { PriorityEnum } from '../enums/PriorityEnum'
import { SeverityEnum } from '@/enums/SeverityEnum';

/**
 * The chart data reactive reference containing:
 * - labels: Array of issue types displayed on the x-axis
 * - datasets: Configuration for the chart including colors and initial zero values
 */
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

/**
 * Chart configuration options including:
 * - Responsive settings
 * - Scale configurations for both axes
 * - Legend visibility
 * - Bar appearance settings
 */
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

/**
 * Available projects with their IDs and names
 */
const projects = [
  { id: 1637322, name: 'Manolito' },
  { id: 1657675, name: 'Fatec' }
];

/**
 * Currently selected project ID (reactive)
 */
const selectedProject = ref<number>(projects[0].id);

/**
 * Available severity options derived from SeverityEnum
 */
const severityOptions = ref<string[]>(Object.values(SeverityEnum).filter(value => typeof value === 'string') as string[]);

/**
 * Currently selected severity level (reactive)
 */
const selectedSeverity = ref<string>(severityOptions.value[0]);

/**
 * Available priority options derived from PriorityEnum
 */
const priorityOptions = ref<string[]>(Object.values(PriorityEnum).filter(value => typeof value === 'string') as string[]);

/**
 * Currently selected priority level (reactive)
 */
const selectedPriority = ref<string>(priorityOptions.value[0]);

/**
 * Fetches issue data from API and updates the chart
 * @async
 * @function fetchDataAndUpdateChart
 * @throws {Error} When API request fails
 * @returns {Promise<void>}
 */
const fetchDataAndUpdateChart = async () => {
  try {
    const issuesData = await fetchReworkCards(
        selectedProject.value,
        selectedSeverity.value,
        selectedPriority.value
    );

    const issueTypes = ['Bug', 'Enhancement', 'Question'];
    const counts = { Bug: 0, Enhancement: 0, Question: 0 };

    for (const issue of issuesData) {
      if (issueTypes.includes(issue.type)) {
        counts[issue.type as keyof typeof counts] = issue.count;
      }
    }

    chartData.value = {
      labels: issueTypes,
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: [
            counts.Bug,
            counts.Enhancement,
            counts.Question
          ]
        }
      ]
    };

    const maxValue = Math.max(counts.Bug, counts.Enhancement, counts.Question);
    chartOptions.value.scales.y.max = maxValue > 0 ? maxValue + (5 - (maxValue % 5)) : 5;

  } catch (error) {
    console.error('Error fetching data:', error);
    chartData.value.datasets[0].data = [0, 0, 0];
  }
};

/**
 * Computed property for project name binding with the select list
 * @type {ComputedRef<string>}
 */
const selectedProjectName = computed({
  get: () => projects.find(p => p.id === selectedProject.value)?.name || '',
  set: (newName: string) => {
    const project = projects.find(p => p.name === newName);
    if (project) {
      selectedProject.value = project.id;
    }
  }
});

// Fetch initial data when component mounts
onMounted(fetchDataAndUpdateChart);

// Watch for changes in filters and update chart
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
/**
 * Card container styling
 */
.chart-card {
  background-color: #01081F;
  padding: 20px;
  border-radius: 8px;
  color: #3D7EFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/**
 * Title styling
 */
.chart-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
}

/**
 * Container for filter select lists
 */
.selects-container {
  display: flex;
  gap: 10%;
  margin-bottom: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

/**
 * Individual select list wrapper
 */
.select-wrapper {
  position: relative;
  min-width: 150px;
  margin-bottom: 10px;
}

/**
 * Select list styling
 */
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