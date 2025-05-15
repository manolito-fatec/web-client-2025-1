<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import type {User} from "@/types/User.ts";

defineProps<{
  users: User[];
}>();

const emit = defineEmits<{
  (e: 'user-deleted', userId: number): void
  (e: 'user-edited', user: User): void
}>();

const editUser = (user: User) => {
  emit('user-edited', user);
}

const deleteUser = (userId: number) => {
  emit('user-deleted', userId);
};
</script>

<template>
  <div class="table-container">
    <DataTable
        :value="users"
        :paginator="true"
        :rows="10"
        scrollable
        scrollHeight="flex"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        responsiveLayout="scroll"
    >
      <Column field="id" header="ID"></Column>
      <Column field="username" header="Username" :sortable="true"></Column>
      <Column field="tool" header="Tool" :sortable="true"></Column>
      <Column field="idTool" header="ID Tool"></Column>
      <Column field="projectTool" header="Project Tool"></Column>
      <Column field="tableRoles" header="Role" :sortable="true"></Column>
      <Column field="created" header="Created" :sortable="true"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <Button
              icon="pi pi-pencil"
              severity="info"
              text
              @click="editUser(slotProps.data)"
          />
          <Button
              icon="pi pi-trash"
              severity="danger"
              text
              @click="deleteUser(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.table-container {
  background: #01081f;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

:deep(.p-datatable) {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #cbd5e0;
  background: transparent;
}

:deep(.p-datatable .p-datatable-wrapper) {
  flex: 1;
  overflow: auto;
  border-radius: 8px;
}

:deep(.p-datatable .p-datatable-thead) {
  position: sticky;
  top: 0;
  z-index: 1;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: #01081f;
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
  padding: 1rem 1.25rem;
  border: none;
  text-align: left;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 1rem 1.25rem;
  border: none;
  border-bottom: 1px solid #1e293b;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  background: transparent;
  color: #cbd5e0;
}

:deep(.p-datatable .p-datatable-tbody > tr:last-child > td) {
  border-bottom: none;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: #1e293b !important;
}

:deep(.p-paginator) {
  background: transparent;
  border: none;
  color: #cbd5e0 !important;
  margin-top: auto;
  padding-top: 1rem;
}

:deep(.p-paginator .p-paginator-element),
:deep(.p-paginator .p-paginator-pages .p-paginator-page),
:deep(.p-paginator .p-paginator-current),
:deep(.p-dropdown .p-dropdown-label) {
  color: #cbd5e0 !important;
  background-color: transparent !important;
  border-color: transparent;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: #3d7eff !important;
  color: #ffffff !important;
  border-radius: 4px;
}

:deep(.p-paginator .p-paginator-element:enabled:hover) {
  background: #2d3748 !important;
  color: #ffffff !important;
  border-radius: 4px;
}

:deep(.p-paginator .p-dropdown .p-dropdown-label) {
  color: #cbd5e0 !important;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar) {
  width: 10px;
  height: 10px;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-track) {
  background: #01081f;
  border-radius: 5px;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-thumb) {
  background: #3d7eff;
  border-radius: 5px;
}

:deep(.p-datatable-wrapper::-webkit-scrollbar-thumb:hover) {
  background: #2563eb;
}

@media (max-width: 768px) {
  .table-container {
    padding: 1rem;
  }
}
</style>