<script setup lang="ts">

</script>

<template>
  <div class="dashboard">
    <h1>Projects Dashboard</h1>
  </div>
  <div class="dashboard-layout">
    <SidebarNav />
    <main class="main-content">
      <DashboardHeader title="Projects Dashboard" />

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
  background-color: var(--color-secondary);
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px 40px;
  overflow-y: auto;
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