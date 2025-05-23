<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { SystemLog } from '../api';

const logs = ref<SystemLog[]>([
  { user: 'Otávio', action: 'GET- DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST- EXPORT CSV', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET - DATA PROFILE', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-REGISTER NEW USER', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'LOGOUT', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-LOGIN', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-ETL', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET- DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST- EXPORT CSV', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET - DATA PROFILE', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-REGISTER NEW USER', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'LOGOUT', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-LOGIN', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-ETL', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET- DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST- EXPORT CSV', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET - DATA PROFILE', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-REGISTER NEW USER', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'LOGOUT', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-LOGIN', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-ETL', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET- DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST- EXPORT CSV', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET - DATA PROFILE', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-REGISTER NEW USER', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'LOGOUT', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-LOGIN', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-ETL', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET- DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST- EXPORT CSV', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET - DATA PROFILE', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-REGISTER NEW USER', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'LOGOUT', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-LOGIN', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-ETL', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET- DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST- EXPORT CSV', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET - DATA PROFILE', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-REGISTER NEW USER', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'LOGOUT', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-LOGIN', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-ETL', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET- DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST- EXPORT CSV', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET - DATA PROFILE', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-REGISTER NEW USER', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'LOGOUT', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-LOGIN', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'POST-ETL', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'GET-DW DATA', timestamp: '24/04/2025' },
  { user: 'Otávio', action: 'LOGOUT', timestamp: '24/04/2025' }
]);

</script>

<template>
  <div class="system-logs-container">
    <div class="table-container">
      <DataTable
        :value="logs"
        :paginator="true"
        :rows="10"
        scrollable
        scrollHeight="flex"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5,10,20,50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        responsiveLayout="scroll"
      >
        <Column field="user" header="User"></Column>
        <Column field="action" header="Action"></Column>
        <Column field="timestamp" header="Timestamp"></Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.system-logs-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  color: #fff;
}

h1 {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.table-container {
  background: #01081F;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  height: 70vh; /* Fixed container height */
  display: flex;
  flex-direction: column;
}

/* Table scroll container */
:deep(.p-datatable) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.p-datatable .p-datatable-wrapper) {
  flex: 1;
  overflow: auto;
}

/* Table header fixed */
:deep(.p-datatable .p-datatable-thead) {
  position: sticky;
  top: 0;
  z-index: 1;
}

/* Remove all cell borders */
:deep(.p-datatable .p-datatable-thead > tr > th),
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border: none !important;
}

:deep(.p-datatable) {
  color: #fff;
  background: transparent;
}

:deep(.p-datatable .p-datatable-header) {
  background: transparent;
  border: none;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: #01081F;
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  background: transparent;
  color: #fff;
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background: #151C32;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: rgba(74, 85, 104, 0.5) !important;
}

/* Paginator styling - all text white */
:deep(.p-paginator) {
  background: transparent;
  border: none;
  color: #fff !important;
  margin-top: auto; /* Push paginator to bottom */
  padding-top: 1rem;
}

:deep(.p-paginator *),
:deep(.p-paginator .p-paginator-pages .p-paginator-page),
:deep(.p-paginator .p-paginator-current),
:deep(.p-dropdown-label) {
  color: #fff !important;
  background-color: #01081F !important;
  border-color: transparent;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: #4fd1c5;
  color: #01081F !important;
}

:deep(.p-paginator .p-paginator-element:enabled:hover) {
  background: rgba(79, 209, 197, 0.2);
  color: #fff !important;
}

:deep(.p-dropdown) {
  background: #151C32;
  border: 1px solid #2d3748;
}

:deep(.p-dropdown-panel) {
  background: #151C32;
  border: 1px solid #2d3748;
}

:deep(.p-dropdown-item) {
  color: #fff;
}

:deep(.p-dropdown-item:hover) {
  background: rgba(74, 85, 104, 0.5);
}

/* Scrollbar styling */
:deep(.p-datatable-wrapper::-webkit-scrollbar) {
  width: 8px;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-track) {
  background: #1a1a2e;
  border-radius: 4px;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-thumb) {
  background: #4fd1c5;
  border-radius: 4px;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-thumb:hover) {
  background: #38b2ac;
}
</style>