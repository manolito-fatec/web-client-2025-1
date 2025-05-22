<script setup lang="ts">
import { ref } from 'vue';

/**
 * Defines the valid columns that can be used for sorting.
 */
type Column = 'project' | 'manager' | 'operators';

const tableData = ref([
  { project: 'ManoLito', manager: 'Otávio', operators: 7 },
  { project: 'APIS', manager: 'Gabriel', operators: 10 },
  { project: 'YoutanDash', manager: 'André', operators: 43 },
  { project: 'Fatec', manager: 'Paulo', operators: 13 },
  { project: 'Test', manager: 'Cauê', operators: 54 },
  { project: '5Semestre', manager: 'Beatriz', operators: 24 },
  { project: 'Facebook', manager: 'Kleber', operators: 69 },
  { project: 'Youtube', manager: 'Juan', operators: 30 },
  { project: 'Twitter', manager: 'Matheus', operators: 34 },
  { project: 'Xbox', manager: 'Leonardo', operators: 11 }
]);

/**
 * Reactive reference for the currently selected column to sort by.
 */
const sortColumn = ref<Column | null>(null);

/**
 * Reactive reference for the sorting direction.
 */
const sortDirection = ref<'asc' | 'desc'>('asc');

/**
* Sorts the project table data based on the selected column.
*
* Toggles the sort direction (ascending or descending) if the same column is clicked again.
* Updates reactive references by column, `sortColumn`, and by direction, `sortDirection`.
*
* @param {Column} column - The column by which the table will be sorted ('project', 'manager', or 'operators').
 */
function sortBy(column: Column) {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }

  tableData.value.sort((a, b) => {
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
          <td class="table-cell">{{ row.operators }}</td>
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