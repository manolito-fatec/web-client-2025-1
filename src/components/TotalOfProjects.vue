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
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;

  h1 {
    font-size: 50%;
    margin-top: 3%;
    margin-bottom: 0%;
    color: #3D7EFF;
  }

  font-size: 2.5rem;
  color: #fff;

  @media (max-width: 1366px) and (orientation: landscape) {
        height: 100%;
        h1 {
            margin-top: 0%;
            margin-bottom: 0%;
            font-size: 100%;
            font-weight: bolder;
            color: #3D7EFF;
        }

        font-size: 1.3rem;
        color: #fff;


        span {
            font-size: 2.5rem;
            margin: 0px;
            color: #FFFFFF;
        }
    }
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