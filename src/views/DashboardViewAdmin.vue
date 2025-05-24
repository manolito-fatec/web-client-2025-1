<script setup lang="ts">
import KpiCard from '../components/KpiCard.vue';
import TotalCardsOfProject from '../components/TotalCardsByProject.vue';
import CardsByPeriod from '../components/CardsByPeriod.vue';
import IssueChart from '../components/IssueChart.vue';
import ProjectTable from '../components/ProjectTable.vue';
import { getExportAdmin } from '@/api/ExportCsvApi';
import { fetchTotalOfProjectsAdmin } from '@/api/TotalOfProjectsAdmin';
import { ref, onMounted, type Ref } from 'vue';
import type { ProjectTaskCount, ProjectUser } from '@/types/ProjectUser';
import { getSessionItem } from '@/api/session/SessionManagement';
import { fetchCardsByProject } from '@/api/CardsByProject';

const totalProjects = ref<number>(0);
const listOfProjectToFilter : Ref<Array<ProjectTaskCount>> = ref([])
const listOfProjectAndCount : Ref<Array<ProjectTaskCount>> = ref([])

/**
 * Downloads the admin data as a CSV file.
 */
const getExportFile = async () => {
  const response = await getExportAdmin();
  const blob = new Blob([response.data], { type: 'text/csv' });
  const objUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', objUrl);
  link.setAttribute('download', "AdminDash.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Fetch total projects count when component mounts
onMounted(() => {
  fetchTotalOfProjectsAdmin().then((totalOfProjects)=>{
      totalProjects.value = totalOfProjects
  });

  fetchCardsByProject().then((allProjects)=>{
    const projectsValue: ProjectTaskCount[] = allProjects.map((project: ProjectTaskCount) => ({
      projectId: project.projectId,
      projectName: project.projectName,
    }));
    listOfProjectAndCount.value = allProjects;
    const listWithoutDuplicates= Array.from(
    new Map(projectsValue.map(item => [JSON.stringify(item), item])).values()
    );
    listOfProjectToFilter.value = listWithoutDuplicates;
  })
});
</script>

<template>
  <div class="dashboard-layout">
    <SidebarNav />
    <main class="main-content">
      <div class="title">
        <h1>Projects Dashboard</h1>
        <button class="export-btn" @click="getExportFile">Export CSV</button>
      </div>
      <DashboardHeader title="Projects Dashboard" />

      <div class="two-column-grid">
        <div class="column" >
          <TotalCardsOfProject v-if="listOfProjectAndCount.length" :value="listOfProjectAndCount" />
          <IssueChart v-if="listOfProjectToFilter.length" :value="listOfProjectToFilter"/>
          <CardsByPeriod v-if="listOfProjectToFilter.length"  :value="listOfProjectToFilter"/>
        </div>
        
        <div class="column">
          <KpiCard class="kpi-card" title="Total projects":value="totalProjects"/>
          <ProjectTable class="project-table" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px 40px;
  overflow-y: auto;
  height: 100vh;
}

.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-table {
  height: 628px;
  overflow-y: auto;
}

.title {
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 8px;
}

.title h1 {
  margin: 0;
  margin-bottom: 0.3rem;
  color: #FFFFFF;
  font-size: 2rem;
}

.export-btn {
  background-color: #61E1A1;
  color: #000;
  font-weight: 500;
  font-family: sans-serif;
  padding: 12px 32px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.export-btn:hover {
  background-color: #4bc889;
}

/* Responsive design */
@media (max-width: 1024px) {
  .two-column-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .main-content {
    padding: 20px;
  }
}
</style>