<script setup lang="ts">
import { ref } from 'vue';

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
  { project: 'Xbox', manager: 'Leonardo', operators: 11 },
  { project: 'ManoLito', manager: 'Otávio', operators: 7 },
  { project: 'APIS', manager: 'Gabriel', operators: 10 },
  { project: 'YoutanDash', manager: 'André', operators: 43 },
  { project: 'Fatec', manager: 'Paulo', operators: 13 },
  { project: 'Test', manager: 'Cauê', operators: 54 }
]);
</script>

<template>
  <div class="table-container">
    <table class="project-table">
      <thead>
        <tr class="header-row">
          <th class="table-header">
            Project <span class="sort-indicator">▾</span>
          </th>
          <th class="table-header">
            Manager <span class="sort-indicator">▾</span>
          </th>
          <th class="table-header">
            Number of operators <span class="sort-indicator">▾</span>
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
}

.header-row {
  border-bottom: 1px solid #1a2035;
}

.table-header {
  padding: 1.5rem 1rem;
  text-align: left;
  font-weight: 500;
  font-size: 0.9em;
}

.sort-indicator {
  margin-left: 0.25rem;
  display: inline-block;
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
</style>