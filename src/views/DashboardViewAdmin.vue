<script setup lang="ts">
import KpiCard from '../components/KpiCard.vue';
import TotalCardsOfProject from '../components/TotalCardsByProject.vue';
import CardsByPeriod from '../components/CardsByPeriod.vue';
import IssueChart from '../components/IssueChart.vue';
import { getExportAdmin } from '../api/ExportCsvApi';
import { fetchTotalOfProjectsAdmin } from '../api/TotalOfProjectsAdmin';
import ProjectTable from '../components/ProjectTable.vue';

import { ref, onMounted } from 'vue';

const isLoading = ref<boolean>(true);
const totalProjects = ref<number>(0);

/**
 * Downloads the admin data as a CSV file.
 *
 * Calls the getExportAdmin API and triggers the download of "AdminDash.csv".
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
onMounted(async () => {
  try {
    const response = await fetchTotalOfProjectsAdmin();
    console.log('Resposta da API:', response);

    if (typeof response === 'number' && response >= 0) {
      totalProjects.value = response;
    } else {
      totalProjects.value = 0;
    }
  } catch (error) {
    console.error("Erro ao buscar total de projetos:", error);
    totalProjects.value = 0;
  } finally {
    isLoading.value = false;
  }
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

      <section class="kpi-grid">
        <TotalCardsOfProject />
        <KpiCard title="Total projects" :value="totalProjects.toString()" />
      </section>

      <section class="bottom-layout">
        <div class="left">
          <CardsByPeriod />
          <IssueChart />
        </div>

        <div class="right">
          <div class="tabela-scroll">
            <ProjectTable />
          </div>
        </div>

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

.bottom-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
  align-items: flex-start;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.tabela-scroll {
  max-height: 40rem;
  overflow-y: auto;
  border-radius: 8px;
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

  .bottom-layout {
    grid-template-columns: 1fr;
  }
}

.title {
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
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
</style>
