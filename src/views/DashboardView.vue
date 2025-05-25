<script setup lang="ts">
import KpiCard from '../components/KpiCard.vue';
import StatusCard from '../components/StatusCard.vue';
import CardsByPeriod from '../components/CardsByPeriod.vue';
import { onMounted, ref, type Ref } from 'vue';
import { fetchAverageTimeOperator } from '@/api/AverageTimeApi';
import { getSessionItem } from '@/api/session/SessionManagement';
import { fetchTotalOfProjects } from '@/api/TotalOfProjects';
import { fetchTotalOfCards } from '@/api/TotalCardsOperatorApi';
import { fetchProjectUser } from '@/api/ProjectUserApi';
import type { ProjectDetails, ProjectUser } from '@/types/ProjectUser';

const totalOfProject: Ref<number> = ref(0);
const totalOfCards: Ref<number> = ref(0);
const averageTime: Ref<number> = ref(0);
const listOfProjectToFilter : Ref<ProjectDetails[]> = ref([])


onMounted(async () => {

  const userId = Number(getSessionItem("userId"));

  const listOfProject = await fetchProjectUser(userId);

  const projectsValue: ProjectDetails[] = listOfProject.map((project: ProjectUser) => ({
    projectId: project.projectId,
    projectName: project.projectName,
  }));

  const listWithoutDuplicates= Array.from(
  new Map(projectsValue.map(item => [JSON.stringify(item), item])).values()
  );

  listOfProjectToFilter.value = listWithoutDuplicates;

  fetchAverageTimeOperator(userId).then((value)=>{
    averageTime.value = !!value ? value : 0;
  });

  fetchTotalOfProjects(userId).then((value) =>{
    totalOfProject.value = !!value ? value : 0;
  });

  fetchTotalOfCards(userId).then((value)=>{
    totalOfCards.value = !!value ? value : 0;
  })

})

</script>

<template>
  <div class="dashboard-layout">
    <SidebarNav/>
    <main class="main-content">
      <div class="title">
        <h1>Projects Dashboard</h1>
      </div>
      <DashboardHeader title="Projects Dashboard" />

      <section class="kpi-grid">
        <KpiCard title="Total of cards" :value="totalOfCards" />
        <KpiCard title="Average completion time of finished cards" :value="averageTime" />
        <KpiCard title="Total Projects" :value="totalOfProject" />
      </section>

      <section class="charts-grid-bottom" v-if="listOfProjectToFilter.length">
        <StatusCard :value="listOfProjectToFilter"/>
        <CardsByPeriod :value="listOfProjectToFilter" />
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
