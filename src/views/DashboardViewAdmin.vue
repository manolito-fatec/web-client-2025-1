<script setup lang="ts">
import KpiCard from '../components/KpiCard.vue';
import TotalCardsOfProject from '../components/TotalCardsByProject.vue';
import CardsByPeriod from '../components/CardsByPeriod.vue';
import IssueChart from '../components/IssueChart.vue';
import { getExportAdmin } from '@/api/ExportCsvApi';

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
        <KpiCard title="Total projects" value="0" />
      </section>

      <section class="charts-grid-bottom">
        <CardsByPeriod />
        <IssueChart />
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