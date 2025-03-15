<script setup lang="ts">
import TotalOfCards from '@/components/TotalOfCards.vue'
import GraphsByTime from '@/components/GraphsByTime.vue';

</script>

<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
    </div>
    <div class="comp-grid">
        <TotalOfCards title="Total de Cards" :total="0"/>
        <TotalOfCards title="Total de Cards" :total="0"/>
        <TotalOfCards title="Total de Cards" :total="0"/>
        <TotalOfCards title="Total de Cards" :total="0"/>
        <TotalOfCards title="Total de Cards" :total="0"/>
        <GraphsByTime></GraphsByTime>
    </div>
</template>

<style lang="scss" scoped>
.dashboard{
    background-color: var(--color-secondary);
    h1{
        color: #fff;
    }
}
.comp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 8rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; 
  }
}
</style>