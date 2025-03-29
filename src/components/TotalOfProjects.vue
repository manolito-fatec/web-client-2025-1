<script lang="ts" setup>
import { fetchTotalOfProjects } from '@/api/TotalOfProjects';
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
  title: string 
  userIdProp: number;
}>();

onMounted(() => {
  titleRef.value = props.title;
  try {
    fetchTotalOfProjects(props.userIdProp).then((total) => {
      totalRef.value = total !== undefined ? total : 1;
    });
  } catch (error) {
    console.error("Error fetching total projects:", error);
    totalRef.value = 1; 
  }
});

</script>

<template>
  <div class="total-of-projects">
    <h1>{{ titleRef }}</h1>
    <span>{{ totalRef }}</span>
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
    height: 5rem;
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