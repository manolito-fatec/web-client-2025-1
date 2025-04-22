<script setup lang="ts">
import KpiCard from '@/components/KpiCard.vue';
import TotalCardsByOperator from '@/components/TotalCardsByOperator.vue';
import TagsByCardChart from '@/components/TagsByCardChart.vue';
import IssueChart from '@/components/IssueChart.vue';
import StatusCard from '@/components/StatusCard.vue';

</script>

<template>
  <div class="dashboard-layout">
    <SidebarNav />
    <main class="main-content">
      <DashboardHeader title="Projects Dashboard" />

      <section class="kpi-grid">
        <TotalCardsByOperator />
        <KpiCard title="Total cards assigned to me" value="0" />
        <KpiCard title="Average completion time of finished cards" value="0" />
        <KpiCard title="Rework cards" value="0" />
      </section>

      <section class="charts-grid-bottom">
        <StatusCard />
        <IssueChart />
        <TagsByCardChart />
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
</style>