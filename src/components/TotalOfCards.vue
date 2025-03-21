<script setup lang="ts">
/**
 * Props for the TotalOfCards component.
 * @property {string} title - The title to be displayed.
 * @property {number} total - The total number to be displayed.
 * @author Cauê Vieira
 */
const props = defineProps<{
  title: string;
  total: number;
}>();
</script>

<template>
  <div class="total-of-cards">
    <h1>{{ props.title }}</h1>
    <span>{{ props.total }}</span>
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