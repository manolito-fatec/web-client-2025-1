<script setup lang="ts">
import { ref } from 'vue';
import SystemLogsTable from '../components/SystemLogsTable.vue';

const logs = ref<[]>([]);

</script>

<template>
  <div class="system-logs-container">
    <h1>System Log</h1>
    <SystemLogsTable :logs="logs" />
  </div>
</template>

<style scoped>
.system-logs-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;
}
</style>