<script setup lang="ts">
import KpiCard from '@/components/KpiCard.vue';

</script>

<template>
  <div class="dashboard">
    <h1>Projects Dashboard</h1>
  </div>
  <div class="dashboard-layout">
    <SidebarNav />
    <main class="main-content">
      <DashboardHeader title="Projects Dashboard" />

      <section class="kpi-grid">
        <KpiCard title="Total cards assigned to me" value="0" />
        <KpiCard title="Average completion time of finished cards" value="0" />
        <KpiCard title="Rework cards" value="0" />
      </section>

    </main>
  </div>
</template>

<style scoped>
.dashboard {
  margin: 0%;
  color: #fff;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px 40px;
  overflow-y: auto;
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
</style>