<script setup lang="ts">
import TotalOfCards from '@/components/TotalOfCards.vue'
import GraphsByTime from '@/components/GraphsByTime.vue';

</script>

<template>
    <div class="dashboard">
        <h1>Projects Dashboard</h1>
    </div>
    <div class="comp-grid">
        <TotalOfCards title="Total of Cards" :total="0"/>
        <TotalOfCards title="Total of Cards" :total="1"/>
        <TotalOfCards title="Total of Cards" :total="2"/>
        <TotalOfCards title="Total of Cards" :total="3"/>
        <TotalOfCards title="Total of Cards" :total="4"/>
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
  gap: 10%;
  padding: 1rem;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 1286px) {
    grid-template-columns: repeat(2, 1fr);

  }
  @media (max-width: 1000px) {
    column-gap: 10px;
  }
  @media only screen and (orientation: portrait) and (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 20px;
    padding: 0.5rem;
  
  }

  @media (max-height: 860px) {
    gap: 8px;
  }
}
</style>