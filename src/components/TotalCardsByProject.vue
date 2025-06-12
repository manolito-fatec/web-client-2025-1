<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { ProjectTaskCount } from '@/types/ProjectUser'

const props = defineProps<{
  value: ProjectTaskCount[]
}>()

const projects: Ref<ProjectTaskCount[]> = ref([])
const selectProject = ref<string | null>(null)
const totalRef: Ref<number> = ref(0)


const totalLoad = (projectId: string) => {
  try {
    const projectWithValue = projects.value.find(p => p.projectId === projectId)
    totalRef.value = projectWithValue ? projectWithValue.count : 0
  } catch (error) {
    console.error("Error fetching total number of cards:", error)
    totalRef.value = 0
  }
}

watch(selectProject, (newId) => {
  if (newId !== null) {
    totalLoad(newId)
  }
});

onMounted(()=>{
  const valueCount = props.value
  projects.value = valueCount
    if (valueCount.length > 0) {
      selectProject.value = valueCount[0]?.projectId
    }
})
</script>

<template>
  <div class="total-card project">
    <div class="title">Total cards by Project</div>

    <select v-model="selectProject">
      <option disabled value="">Select a project</option>
      <option 
        v-for="project in projects" 
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
.total-card.project {
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