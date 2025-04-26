<script setup lang="ts">
import { onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';
import { fetchUserProfile } from "@/api/ProfileApi.ts";

/**
 * User Profile component displaying user information
 *
 * @component
 * @example <UserProfile :userId="123" />
 *
 * @todo Implement prop handling for userId instead of hardcoding.Needs login screen.
 * @vue-reactive user - Reactive user profile object
 */
interface UserProfile {
  username: string;
  email: string;
  role: string;
}

/**
 * Reactive reference holding the user profile data
 * @type {import('vue').Ref<UserProfile>}
 */
const user = ref<UserProfile>({
  username: 'youtan_user',
  email: 'user@youtandash.com',
  role: 'Administrator',
});

/**
 * Fetches and updates user profile data when component is mounted
 * @async
 * @function onMounted
 * @throws {Error} When API request fails
 *
 * @example
 * Fetches profile for user ID 1 (currently hardcoded)
 */
onMounted(() => {
  /**
   * Fetch user profile and update reactive state
   * @param {number} userId - Currently hardcoded to 1
   */
  fetchUserProfile(1).then((res) => {
    console.log(res);
    user.value.username = res.username;
    user.value.email = res.email;
    user.value.role = res.roles[0]; // Take first role from array
  });
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