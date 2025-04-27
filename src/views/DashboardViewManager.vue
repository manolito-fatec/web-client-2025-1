<script setup lang="ts">
import KpiCard from '../components/KpiCard.vue';
import TotalCardsByOperator from '../components/TotalCardsByOperator.vue';
import TagsByCardChart from '../components/TagsByCardChart.vue';
import IssueChart from '../components/IssueChart.vue';
import StatusCard from '../components/StatusCard.vue';
import CardsByPeriod from '../components/CardsByPeriod.vue';
import {fetchAverageTime} from "../api/AverageTimeApi.ts";
import {onMounted, type Ref, ref} from "vue";
import {getSessionItem} from "@/api/session/SessionManagement.ts";
import {fetchReworkCardsTotal} from "@/api/ReworkCardApi.ts";

const averageCardData: Ref<number> = ref(0);
const reworkCardsKpi: Ref<number> = ref(0);

onMounted(() => {
  fetchAverageTime(parseInt(getSessionItem("userId"),10)).then((averageTime) => {
    averageCardData.value = averageTime !== undefined ? averageTime : 0;
  })
  fetchReworkCardsTotal(1).then((reworkCards) => {
    reworkCardsKpi.value = reworkCards !== undefined ? reworkCards : 0;
  })
})
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
        <TotalCardsByOperator />
        <KpiCard title="Total cards assigned to me" value="0" />
        <KpiCard title="Average completion time of finished cards" :value=averageCardData />
        <KpiCard title="Rework cards" :value="reworkCardsKpi" />
      </section>

      <section class="charts-grid-bottom">
        <StatusCard />
        <CardsByPeriod />
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