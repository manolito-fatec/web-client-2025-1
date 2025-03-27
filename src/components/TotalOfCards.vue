<script setup lang="ts">
import { fetchTotalOfCards } from '@/api/TotalOfCardsApi';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';

/**
 * Props for the TotalOfCards component.
 * @property {string} title - The title to be displayed.
 * @property {number} total - The total number to be displayed.
 * @author Cauê Vieira
 */
const titleRef: Ref<string> = ref<string>('');
const totalRef: Ref<number> = ref<number>(0);

const props = defineProps<{
  title: string;
}>();

onMounted(() => {
  titleRef.value = props.title;
  try {
    fetchTotalOfCards(1).then((total) => {
      totalRef.value = total !== undefined ? total : 1;
    });
  } catch (error) {
    console.error("Erro ao buscar total de cartões:", error);
    totalRef.value = 1; 
  }
});
</script>

<template>
  <div class="total-of-cards">
    <h1>{{ titleRef }}</h1>
    <span>{{ totalRef }}</span>
  </div>
</template>

<style lang="scss" scoped>
.total-of-cards {
  background-color: #01081F;
  border-radius: 25px;
  flex-direction: column;
  width: 20rem;
  height: 10rem;
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    color: #3D7EFF;
  }

  font-size: 3rem;
  color: #fff;

  @media only screen and (orientation: portrait) and (max-width: 768px) {
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
    height: 4rem;
    align-items: start;
    
    border-radius: 8px;
    h1 {
      font-size: 0.9rem;
      margin-left: 10px;
    }
    span {
      font-size: 1rem;
      margin-left: 20px;
    }
  }
}
</style>