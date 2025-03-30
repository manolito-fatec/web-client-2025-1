<script setup lang="ts">
import TotalOfCards from '@/components/TotalOfCards.vue'
import GraphsByTime from '@/components/GraphsByTime.vue';
import TotalOfProjects from '@/components/TotalOfProjects.vue';
import AverageTimeCard from '@/components/AverageTimeCard.vue';
import GraphQuantityForStatus from '@/components/GraphQuantityForStatus.vue';
import { ref, type Ref } from 'vue';

const currentUserId: Ref<number> = ref<number>(1);
const averageTime = ref(0);

</script>

<template>
  <div class="dashboard">
    <h1>Projects Dashboard</h1>
  </div>
  <div class="top-grid">
    <TotalOfCards title="Total of Cards" :userIdProp="currentUserId" />
    <AverageTimeCard :userIdProp="currentUserId" :averageTime="averageTime" />
    <TotalOfProjects title="Total of Projects" :userIdProp="currentUserId"/>
  </div>
  
  <div class="bottom-grid">
    <GraphQuantityForStatus :userIdProp="currentUserId"/>
    <GraphsByTime :userIdProp="currentUserId"/>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  background-color: var(--color-secondary);

  h1 {
    margin: 0%;
    color: #fff;
  }
}

.top-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5%;
  height: 20%;
  padding: 1rem;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 2fr 1fr; /* 4 ocupa 66%, 5 ocupa 33% */
  gap: 2%;
  margin-top: 5%;
  height: 60%;
  padding: 0 1rem 1rem 1rem;
}

/* Responsividade Unificada */
@media (max-width: 1286px) {
  .top-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .bottom-grid {
    grid-template-columns: 1fr; /* Empilha verticalmente */
  }
}

@media only screen and (orientation: portrait) and (max-width: 720px) {
  h1 {
    display: none;
  }

  .top-grid {
    grid-template-columns: 1fr;
    gap: 5px;
    width: 100%;
    height: 17rem;
    padding: 0%;
  }
  
  .bottom-grid {
    grid-template-columns: 1fr;
    padding: 0%;
    gap: 5px;
    height: 30rem;
  }
}
</style>
