<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { fetchAuditLogs } from '../api/AuditLogs';

interface AuditLogDto {
  user: string;
  action: string;
  timestamp: string;
}

const logs = ref<AuditLogDto[]>([]);

onMounted(async () => {
  try {
    const resultado = await fetchAuditLogs();

    logs.value = resultado.content.map((log: any) => ({
      user: log.userId,
      action: `${log.requestMethod} ${log.requestUri}`,
      timestamp: log.timestamp
    }));
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
  }
});
</script>

<template>
  <div class="audit-logs-container" style="overflow-x: auto;">
    <DataTable 
      :value="logs" 
      :paginator="true" 
      :rows="10" 
      scrollable 
      scrollHeight="550px" 
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      currentPageReportTemplate="Mostrando de {first} até {last} de {totalRecords} registros" 
      responsiveLayout="scroll"
      style="min-width: 700px;"
    >
      <Column field="user" header="Usuário" :style="{ width: '150px' }" :sortable="true"/>
      <Column 
        field="action" 
        header="Ação"
        :bodyStyle="{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }"
        :style="{ width: '300px' }" 
        :sortable="true"
      />
      <Column field="timestamp" header="Data/Hora" :style="{ width: '200px' }" :sortable="true"/>
    </DataTable>
  </div>
</template>



<style scoped>
.system-logs-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
  min-height: 0;
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
  height: 70vh;
  display: flex;
  flex-direction: column;
}

:deep(.p-datatable) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.p-datatable .p-datatable-wrapper) {
  flex: 1;
  overflow: auto;
}

:deep(.p-datatable .p-datatable-thead) {
  position: sticky;
  top: 0;
  z-index: 1;
}

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
  background: #151C32;
  color: #fff;
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background: #01081F;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: rgba(74, 85, 104, 0.5) !important;
}

:deep(.p-paginator) {
  background: #01081F;
  border: none;
  color: #fff !important;
  margin-top: auto;
  padding-top: 1rem;
}

:deep(.p-paginator *),
:deep(.p-paginator .p-paginator-pages .p-paginator-page),
:deep(.p-paginator .p-paginator-current),
:deep(.p-dropdown-label) {
  color: #fff !important;
  background-color: #01081F !important;
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