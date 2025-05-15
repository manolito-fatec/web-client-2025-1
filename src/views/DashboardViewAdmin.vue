<script setup lang="ts">
import KpiCard from '../components/KpiCard.vue';
import TotalCardsOfProject from '../components/TotalCardsByProject.vue';
</script>

<template>
  <div class="dashboard-layout">
    <SidebarNav />
    <main class="main-content">
      <div class="title">
        <h1>Projects Dashboard</h1>
      </div>
      <DashboardHeader title="Projects Dashboard" />

      <section class="kpi-grid">
        <TotalCardsOfProject />
        <KpiCard title="Total projects" value="0" />
      </section>

      <section class="charts-grid-bottom">

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

  h1 {
    margin: 0%;
    margin-bottom: 0.3rem;
    color: #FFFFFF;
    font-size: 2rem;
  }
}
</style>