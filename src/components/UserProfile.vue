<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';

// Mock data for user profile
const user = ref({
  username: 'youtan_user',
  email: 'user@youtandash.com',
  role: 'Administrator',
});

</script>

<template>
  <div class="profile-screen">
    <div class="profile-header">
      <div class="profile-icon">
        <i class="pi pi-user" style="font-size: 9em; color: #FFFFFF;"></i>
      </div>
      <h2>User Profile</h2>
    </div>

    <div class="profile-details">
      <div class="p-field">
        <label for="username">Username</label>
        <InputText id="username" type="text" v-model="user.username" disabled/>
      </div>
      <div class="p-field">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="user.email" disabled/>
      </div>
      <div class="p-field">
        <label for="role">Role</label>
        <InputText id="role" type="text" v-model="user.role" disabled/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-screen {
  padding: 40px;
  max-width: 600px;
  margin: 100px auto;
  border-radius: 8px;
  color: #e0e0e0;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.profile-icon {
  margin-bottom: 15px;
}

.profile-header h2 {
  margin: 0;
  font-size: 1.8em;
  color: #ffffff;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.p-field {
  display: flex;
  flex-direction: column;
}

.p-field label {
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1.1em;
  color: #3D7EFF;
}

:deep(.p-inputtext:disabled) {
  background-color: #fff;
  color: #000;
}

.profile-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>