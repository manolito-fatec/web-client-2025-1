<script setup lang="ts">
import type {ProjectDetails} from '@/types/ProjectUser';
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { fetchReworkCardsTotal } from '@/api/ReworkCardApi';

const props = defineProps<{
  value: ProjectDetails[];
}>();


/**
 * Reactive reference for the selected operator ID.
 * @type {number | null}
 */
const selectProject = ref<number | null>(null);

/**
 * Reactive reference for the total count of cards.
 * @type {Ref<number>}
 */
const totalRef: Ref<number> = ref(0);

/**
 * Reactive reference for the total count of cards.
 * @type {Ref<number>}
 */
const projectList: Ref<Array<ProjectDetails>> = ref([]);

/**
 * Fetches the total number of cards assigned to a specific operator.
 * @param {number} userId - The ID of the selected operator.
 * @throws {Error} If the API request fails, the total will be set to 0.
 */
const loadTotal = async (userId: number) => {
  try {
    const total = await fetchReworkCardsTotal(userId);
    totalRef.value = total !== undefined ? total : 0;
  } catch (error) {
    console.error("Erro ao buscar total de cartões:", error);
    totalRef.value = 0;
  }
};

/**
 * Watches for changes in the selected operator and triggers the total cards fetch.
 */
watch(selectProject, (novoId) => {
  if (novoId !== null) {
    loadTotal(novoId);
  }
});


onMounted(()=> {
  projectList.value = props.value
})

</script>

<template>
  <div class="total-card operador">
    <div class="title">Reworks cards</div>
    <select v-model="selectProject">
      <option disabled value="">Select a project</option>
      <option 
        v-for="project in projectList" 
        :key="project.projectId" 
        :value="project.projectId"
      >
        {{ project.projectName }}
      </option>
    </select>
    <div class="value">{{ totalRef }}</div>
  </div>
</template>

<style scoped>
.total-card.operador {
  background-color: #01081F;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1em;
  color: #3D7EFF;
  margin-bottom: 10px;
  font-weight: bold;
}

select {
  background-color: #0A1237;
  color: white;
  font-size: 0.9rem;
  padding: 0.02rem;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  width: 80%;
  text-align: center;
}

.value {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff;
  margin-top: 5px;
}
</style>
