<script setup lang="ts">
import {onMounted, ref} from "vue";
import UserManagementTable from "@/components/UserManagementTable.vue";
import {rolesFix} from "@/conversors/RolesConverter.ts";
import {fetchPaginatedUsers} from "@/api/GetUsersApi.ts";
import type {UserPag} from "@/types/PagUser.ts";
import NewUserForm from "@/components/NewUserForm.vue";
import UserEditForm from "@/components/UserEditForm.vue";
import {removeUserApi} from "@/api/RemoveUserApi.ts";

const users = ref<UserPag[]>([]);
const isEditting = ref<boolean>(false);
const edittedData = ref<UserPag>();

const handleUserEdited = async (editUser: UserPag) => {
  edittedData.value = editUser;
  toggleEditting();
  await refreshUsers();
};

const handleUserDeleted = async (userId: number) => {
  removeUserApi(userId).then(() => {
    users.value = users.value.filter(user => user.userId !== userId);
  });
  await refreshUsers();
};

const toggleEditting = () => {
  if (isEditting.value === true) {
    isEditting.value = false;
    edittedData.value = undefined;
    refreshUsers();
    return
  }
  isEditting.value = true;
}

const refreshUsers = async () => {
  const usersApi = await fetchPaginatedUsers();
  users.value = rolesFix(usersApi);
};

onMounted(() => {
  refreshUsers();
})

defineExpose({
  refreshUsers,
  toggleEditting,
  handleUserEdited,
  handleUserDeleted,
  isEditting,
  edittedData,
  users
})
</script>

<template>
  <div class="user-management-scroll-container">
    <NewUserForm v-if="!isEditting" @user-created="refreshUsers"/>
    <UserEditForm v-if="isEditting" :editted-data="edittedData!"  @eddited="toggleEditting"/>
    <UserManagementTable
        :users="users"
        @user-edited="handleUserEdited"
        @user-deleted="handleUserDeleted"
    />
  </div>
</template>

<style scoped>
.user-management-scroll-container {
  transition: all 0.3s ease;
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