<script setup lang="ts">
const props = defineProps<{
  title: string;
  value?: number | string;
  unit?: string;
}>();
</script>

<template>
  <div class="kpi-card">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div v-if="unit" class="unit">{{ unit }}</div>
  </div>
</template>

<style scoped>
.kpi-card {
  background-color: #01081F;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1em;
  color: #3D7EFF;
  margin-bottom: 10px;
  font-weight: bold;
}

.value {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
}

.unit {
  font-size: 0.8em;
  color: #ffffff;
}
</style>