<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-title-container">
        <img src="../assets/icons/Manolito.png" alt="ManolitoLogo" class="sidebarLogo"/>
        <h1>YOUTAN DASH</h1>
      </div>
      <div class="form-container">
        <form @submit.prevent="">
          <div class="form-group">
            <label for="username">Username</label>
            <input
                id="username"
                v-model="username"
                type="text"
                required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                required
            />
          </div>
          <button type="submit" @click="auth">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useAuthStore} from "@/api/session/stores/auth.ts";
import router from "@/router";

const username = ref<string>('');
const password = ref<string>('');


const auth = () => {
  useAuthStore().loginAndStore(username.value, password.value).then(() => {
    if (sessionStorage.getItem('token')) {
      router.push('/dashboard');
    }
  });
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #0C1635;
}

.login-card {
  background-color: #0C1635;
  width: 900px;
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.logo-title-container h1 {
  font-size: 5rem;
  margin: 0;
  color: white;
}

.sidebarLogo {
  width: 150px;
  height: auto;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 1rem;
  width: 100%;
  text-align: left; /* Alinha o label e input à esquerda */
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: white;
  text-align: left; /* Garante que o texto fique alinhado à esquerda */
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box; /* Garante que padding não afete a largura total */
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3D7EFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #45a049;
}
</style>