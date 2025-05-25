<script setup lang="ts">
import KpiCard from '../components/KpiCard.vue';
import TotalCardsByOperator from '../components/TotalCardsByOperator.vue';
import TagsByCardChart from '../components/TagsByCardChart.vue';
import IssueChart from '../components/IssueChart.vue';
import StatusCard from '../components/StatusCard.vue';
import CardsByPeriod from '../components/CardsByPeriod.vue';
import {fetchAverageTimeOperator} from "../api/AverageTimeApi.ts";
import {onMounted, type Ref, ref} from "vue";
import {getSessionItem} from "@/api/session/SessionManagement.ts";
import {  getExportManager } from '@/api/ExportCsvApi.ts';
import type { ProjectDetails, ProjectUser } from '@/types/ProjectUser.ts';
import { fetchProjectUser } from '@/api/ProjectUserApi.ts';
import { fetchTotalOfCards } from '@/api/TotalOfCardsApi.ts';
import ReworkCard from '@/components/ReworkCard.vue';

const averageCardData: Ref<number> = ref(0);
const listOfProjectToFilter : Ref<Array<ProjectDetails>> = ref([])
const listOfOperator: Ref<Array<ProjectUser>> = ref([])
const managerCards: Ref<number> = ref(0);

/**
 * Downloads the manager dashboard data as a CSV file.
 *
 * Calls the getExportManager API, creates a CSV blob,
 * and triggers the download of "ManagerDash.csv".
 */
  const getExportFile = async () => {
  const response = await getExportManager();
  const blob = new Blob([response.data], { type: 'text/csv' });
  const objUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', objUrl);
  link.setAttribute('download', "ManagerDash.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); 
}

onMounted(async () => {
  const userId = Number(getSessionItem("userId"));
  fetchAverageTimeOperator(parseInt(getSessionItem("userId")!,10)).then((averageTime) => {
    averageCardData.value = averageTime !== undefined ? averageTime : 0;
  })
  fetchTotalOfCards(userId).then((cards) => {
    managerCards.value = !!cards ? cards : 0;
  })


  const listOfProject = await fetchProjectUser(userId);

  listOfOperator.value = listOfProject

  const projectsValue: ProjectDetails[] = listOfProject.map((project: ProjectUser) => ({
    projectId: project.projectId,
    projectName: project.projectName,
  }));

  const listWithoutDuplicates= Array.from(
  new Map(projectsValue.map(item => [JSON.stringify(item), item])).values()
  );

  listOfProjectToFilter.value = listWithoutDuplicates;

})
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

      <section class="kpi-grid">
        <TotalCardsByOperator v-if="listOfOperator.length" :value="listOfOperator"/>
        <KpiCard title="Total cards assigned to me" :value="managerCards" />
        <KpiCard title="Average completion time of finished cards" :value=averageCardData />
        <ReworkCard title="Rework cards" v-if="listOfProjectToFilter.length" :value="listOfProjectToFilter" />
      </section>

      <section class="charts-grid-bottom" v-if="listOfProjectToFilter.length">
        <StatusCard  :value="listOfProjectToFilter"/>
        <CardsByPeriod :value="listOfProjectToFilter" />
        <IssueChart :value="listOfProjectToFilter"/>
        <TagsByCardChart :value="listOfProjectToFilter"/>
      </section>
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
}

.charts-grid-bottom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
  }

  .main-content {
    padding: 20px;
  }
}

.title {
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
  h1 {
    margin: 0%;
    margin-bottom: 0.3rem;
    color: #FFFFFF;
    font-size: 2rem;
  }
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
</style>