<script setup lang="ts">
import {ref, watch, onMounted, computed, type Ref} from 'vue';
import Chart from 'primevue/chart';
import ChartSelectlist from './ChartSelectlist.vue';
import { PriorityEnum } from '../enums/PriorityEnum'
import { SeverityEnum } from '@/enums/SeverityEnum';
import type { ProjectDetails } from '@/types/ProjectUser';
import {fetchIssuesDetailed} from "@/api/IssueChartApi.ts";
import MultiSelect from 'primevue/multiselect';
import type {MultiOptions} from "@/types/MultiSelect.ts";


const props = defineProps<{
  value: ProjectDetails[]
}>()

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
const projects: Ref<Array<ProjectDetails>> = ref([])

 const projectsOptions: Ref<Array<string>> = ref([]) 

/**
 * Currently selected project ID (reactive)
 */
const selectedProject: Ref<number> = ref(0);

/**
 * Available severity options derived from SeverityEnum
 */
const severityOptions = ref<MultiOptions[]>();

/**
 * Currently selected severity level (reactive)
 */
const selectedSeverity = ref<MultiOptions[]>(severityOptions.value!);

/**
 * Available priority options derived from PriorityEnum
 */
const priorityOptions = ref<MultiOptions[]>();

/**
 * Currently selected priority level (reactive)
 */
const selectedPriority = ref<MultiOptions[]>(priorityOptions.value!);

/**
 * Fetches issue data from API and updates the chart
 * @async
 * @function fetchDataAndUpdateChart
 * @throws {Error} When API request fails
 * @returns {Promise<void>}
 */
const fetchDataAndUpdateChart = async () => {
  try {
    const issuesData = await fetchIssuesDetailed(
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
  get: () => projects.value.find(p => Number(p.projectId) === selectedProject.value)?.projectName || '',
  set: (newName: string) => {
    const project = projects.value.find(p => p.projectName === newName);
    if (project) {
      selectedProject.value = Number(project.projectId);
    }
  }
});

onMounted(() => {
  const listOfProject = props.value

  severityOptions.value = Object.values(SeverityEnum).map(severity => ({
    label : severity.toString(),
    value : severity.toString()
  }));

  priorityOptions.value = Object.values(PriorityEnum).map(priority => ({
    label : priority.toString(),
    value : priority.toString()
  }));

  projects.value = listOfProject;
  selectedProject.value = Number(projects.value[0]?.projectId)
  projectsOptions.value = listOfProject.map((e)=> e.projectName)
});

watch([selectedProject, selectedSeverity, selectedPriority], fetchDataAndUpdateChart);
</script>

<template>
  <div class="chart-card">
    <h3>Issue by Project</h3>
    <div class="selects-container">
      <div class="select-wrapper">
        <ChartSelectlist
            :options="projectsOptions"
            v-model="selectedProjectName"
            label="Project"
        />
      </div>

      <div class="select-wrapper">
        <MultiSelect
            :options="severityOptions"
            option-label="label"
            option-value="value"
            v-model="selectedSeverity"
            label="Severity"
            filter
            :pt="{
              root: { class: 'multiselect-root' },
              trigger: { class: 'multiselect-trigger' },
              panel: { class: 'multiselect-panel' },
              header: { class: 'multiselect-header' },
              item: { class: 'multiselect-item' },
              token: { class: 'multiselect-token' },
              tokenLabel: { class: 'multiselect-token-label' }
            }"
        />
      </div>

      <div class="select-wrapper">
        <MultiSelect
            :options="priorityOptions"
            v-model="selectedPriority"
            label="Priority"
            option-label="label"
            option-value="value"
            filter
            :pt="{
              root: { class: 'multiselect-root' },
              trigger: { class: 'multiselect-trigger' },
              panel: { class: 'multiselect-panel' },
              header: { class: 'multiselect-header' },
              item: { class: 'multiselect-item' },
              token: { class: 'multiselect-token' },
              tokenLabel: { class: 'multiselect-token-label' }
            }"
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
  display: flex;
  flex-direction: column;

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

:deep(.multiselect-root) {
  background-color: #0C1635 !important;
  border-color: #0C1635 !important;
  color: #e0e0e0 !important;
  border-radius: 4px !important;
}
/* Estilo para o texto dentro dos chips (itens selecionados) */
:deep(.p-multiselect-token-label) {
  color: white !important; /* Texto branco */
}

:deep(.p-multiselect-label) {
  color: #e0e0e0 !important;
  padding: 0.5rem !important;
}

:deep(.multiselect.dropdown.color) {
  color: #000642 !important;
}

:deep(.p-multiselect-item:hover) {
  color: white !important;
}

:deep(.p-multiselect-label.p-placeholder) {
  color: #6c757d !important;
}

:deep(.p-multiselect-token) {
  background-color: #3D7EFF !important;
  color: white !important; /* Texto branco */
  margin: 0.1rem !important;
}

:deep(.p-multiselect-token-icon) {
  color: white !important;
}
:deep(.multiselect-trigger) {
  background-color: #0C1635 !important;
  color: #e0e0e0 !important;
  padding: 8px 40px !important;
}

:deep(.multiselect-panel) {
  background-color: #0C1635 !important;
  border-color: #0C1635 !important;
  color: #022a6a !important;
}

:deep(.multiselect-header) {
  background-color: #0C1635 !important;
  border-color: #0C1635 !important;
}

:deep(.multiselect-item) {
  color: #3D7EFF !important;
}

:deep(.multiselect-item:hover) {
  background-color: #3D7EFF !important;
}

:deep(.multiselect-token) {
  background-color: #3D7EFF !important;
  color: #e0e0e0 !important;
}

:deep(.multiselect-token-label) {
  color: #e0e0e0 !important;
}

:deep(.multiselect-root:hover),
:deep(.multiselect-root:focus) {
  border-color: #3D7EFF !important;
}

:deep(.multiselect-trigger .p-multiselect-trigger-icon) {
  color: #e0e0e0 !important;
}
</style>