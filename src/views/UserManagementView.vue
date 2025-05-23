<script setup lang="ts">
import {onMounted, ref} from "vue";
import UserManagementTable from "@/components/UserManagementTable.vue";
import {rolesFix} from "@/conversors/RolesConverter.ts";
import {fetchPaginatedUsers} from "@/api/GetUsersApi.ts";
import type {UserPag} from "@/types/PagUser.ts";
import NewUserForm from "@/components/NewUserForm.vue";
import UserEditForm from "@/components/UserEditForm.vue";

const users = ref<UserPag[]>([]);
const isEditting = ref<boolean>(false);
const edittedData = ref<UserPag>();
const deletedData = ref<number>();

const handleUserEdited = (editUser: UserPag) => {
  toggleEditting();
  edittedData.value = editUser;
};

const handleUserDeleted = (userId: number) => {
  deletedData.value = userId;
};

const toggleEditting = () => {
  isEditting.value = true;
  if (edittedData.value) {
    isEditting.value = false;
    edittedData.value = undefined;
    deletedData.value = undefined;
  }
}

onMounted(() => {
  fetchPaginatedUsers().then(usersApi => {
    users.value = rolesFix(usersApi);
  })

})
</script>

<template>
  <div class="user-management-scroll-container">
    <NewUserForm v-if="!isEditting"/>
    <UserEditForm v-if="isEditting" @edited="toggleEditting"/>
    <UserManagementTable
        :users="users"
        @user-edited="handleUserEdited"
        @user-deleted="handleUserDeleted"
    />
  </div>
</template>

<style scoped>
.user-management-scroll-container {
  height: 100%;
  overflow-y: auto;
}

h1 {
  margin-bottom: 2.5rem;
  text-align: center;
  font-size: 2.25rem;
  color: #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }
}
</style>