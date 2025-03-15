<script setup lang="ts">
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
  border-radius: 10px;
  flex-direction: column;
  width: 11rem;
  height: 6rem;
  display: flex;
  align-items: center;

  h1 {
    font-size: 1rem;
    color: #3D7EFF;
  
  }
  font-size: 2rem;
    color: #fff;


}

</style>