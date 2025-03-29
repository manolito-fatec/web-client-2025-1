<script lang="ts" setup>
import { fetchTotalOfProjects } from '../api/TotalOfProjects';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';

/**
 * Props for the TotalOfProjects component.
 * @property {string} title - The title to be displayed.
 * @property {number} total - The total number to be displayed.
 */

const titleRef: Ref<string> = ref<string>('');
const totalRef: Ref<number> = ref<number>(0);

const props = defineProps<{
  title: 'Total Projects'
}>();

</script>

<template>
  <div class="total-of-projects">
    <h1>{{ props.title }}</h1>
    <span>{{ total }}</span>
  </div>
</template>

<style lang="scss" scoped>
.total-of-projects {
  background-color: #01081F;
  border-radius: 25px;
  flex-direction: column;
  width: 20rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.5rem;
    color: #3D7EFF;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 3rem;
    color: #fff;
  }

  .error-message {
    color: #ff6b6b;
    font-size: 1rem;
  }

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

    span,
    .error-message {
      font-size: 1rem;
      margin-left: 20px;
    }
  }
}
</style>