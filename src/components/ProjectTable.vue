<script setup lang="ts">
import type { ProjectAdminTable } from '@/types/ProjectUser';
import { ref, onMounted } from 'vue';

const props = defineProps<{
  value: ProjectAdminTable[]
}>();

type Column = 'project' | 'manager' | 'operators';

const tableData = ref<ProjectAdminTable[]>([]);

onMounted(() => {
    tableData.value = props.value
});

const sortColumn = ref<Column | null>(null);

const sortDirection = ref<'asc' | 'desc'>('asc');

function sortBy(column: Column) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }

  tableData.value.sort((a:any, b:any) => {
    const valA = a[column];
    const valB = b[column];

    if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
}
</script>

<template>
  <div class="table-container">
    <table class="project-table">
      <thead>
        <tr class="header-row">
          <th class="table-header" @click="sortBy('project')">
            Project
            <span class="sort-indicator" :class="{ active: sortColumn === 'project' }">
              {{ sortColumn === 'project' ? (sortDirection === 'asc' ? '▲' : '▼') : '▲' }}
            </span>
          </th>
          <th class="table-header" @click="sortBy('manager')">
            Manager
            <span class="sort-indicator" :class="{ active: sortColumn === 'manager' }">
              {{ sortColumn === 'manager' ? (sortDirection === 'asc' ? '▲' : '▼') : '▲' }}
            </span>
          </th>
          <th class="table-header" @click="sortBy('operators')">
            Number of operators
            <span class="sort-indicator" :class="{ active: sortColumn === 'operators' }">
              {{ sortColumn === 'operators' ? (sortDirection === 'asc' ? '▲' : '▼') : '▲' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index" :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
          <td class="table-cell">{{ row.project }}</td>
          <td class="table-cell">{{ row.manager }}</td>
          <td class="table-cell">{{ row.quantityOfOperators}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  background-color: #01081F;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.project-table {
  width: 100%;
  color: white;
  border: collapse;
}

.header-row {
  border-bottom: 1px solid #1a2035;
}

.table-header {
  padding: 1.5rem 1rem;
  text-align: left;
  font-weight: 500;
  font-size: 0.9em;
  cursor: pointer;
  user-select: none;
}

.sort-indicator {
  margin-left: 0.5rem;
  font-size: 0.8em;
}

.row-even {
  background-color: #151C32;
}

.row-odd {
  background-color: #01081F;
}

.table-cell {
  padding: 1.27rem 1rem;
  font-size: 0.9em;
}

.sort-indicator {
  margin-left: 0.5rem;
  font-size: 0.8em;
  opacity: 0.4;
  transition: opacity 0.2s;
}

.sort-indicator.active {
  opacity: 1;
}
</style>