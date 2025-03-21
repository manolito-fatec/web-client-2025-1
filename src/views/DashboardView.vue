<script setup lang="ts">
import GraphsByTime from '@/components/GraphsByTime.vue';
import GraphQuantityForStatus from '@/components/GraphQuantityForStatus.vue';
import TotalOfCards from '@/components/TotalOfCards.vue';

</script>

<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
    </div>
    <div class="comp-grid">
        <TotalOfCards title="Total of Cards" :total="0"/>
        <TotalOfCards title="Total of Cards" :total="1"/>
        <TotalOfCards title="Total of Cards" :total="2"/>
        <TotalOfCards title="Total of Cards" :total="3"/>
        <GraphsByTime></GraphsByTime>
        <GraphQuantityForStatus></GraphQuantityForStatus>
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
  grid-template-columns: repeat(3, 1fr); /* Define 3 colunas */
  grid-template-rows: repeat(2, 1fr); /* Define 2 linhas */
  gap: 1rem; /* Espaçamento entre os itens */
  width: 100%;
  height: 80vh; /* Faz o grid ocupar a altura total da tela */
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Ajusta para 1 coluna em telas menores */
  }
}

.comp-grid > * {
  margin: 0 auto; /* Centraliza os gráficos individualmente */
}
</style>