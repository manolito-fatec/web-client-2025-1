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
                @input="validateUserName"
                :class="{ 'p-invalid': userNameError || loginError }"
                required
            />
            <small v-if="userNameError" class="p-error">{{ userNameError }}</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                @input="validatePassword"
                :class="{ 'p-invalid': passwordError || loginError }"
                required
            />
            <small v-if="passwordError" class="p-error">{{ passwordError }}</small>
            <small v-if="loginError" class="p-error">{{ loginError }}</small>
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

/**
 * The username input value
 * @type {import('vue').Ref<string>}
 */
const username = ref<string>('');

/**
 * The password input value
 * @type {import('vue').Ref<string>}
 */
const password = ref<string>('');

/**
 * Error message for username validation
 * @type {import('vue').Ref<string|null>}
 */
const userNameError = ref<string | null>(null);

/**
 * Error message for password validation
 * @type {import('vue').Ref<string|null>}
 */
const passwordError = ref<string | null>(null);

/**
 * General login error message
 * @type {import('vue').Ref<string|null>}
 */
const loginError = ref<string | null>(null);

/**
 * Validates the username input
 * @function
 * @returns {boolean} True if validation passes, false otherwise
 * @description Checks if username length exceeds 255 characters
 */
const validateUserName = (): boolean => {
  const userName = username.value;

  if (userName.length > 255) {
    userNameError.value = 'Username must be less than 255 characters';
    return false;
  }

  userNameError.value = null;
  return true;
}

/**
 * Validates the password input
 * @function
 * @returns {boolean} True if validation passes, false otherwise
 * @description Checks if password is not empty
 */
const validatePassword = (): boolean => {
  const pass = password.value;

  if (!pass) {
    passwordError.value = 'Password is required';
    return false;
  }

  passwordError.value = null;
  return true;
}

/**
 * Handles the login authentication process
 * @async
 * @function
 * @returns {Promise<void>}
 * @description Validates inputs, attempts login, and handles errors
 * @throws {Error} When authentication fails
 */
const auth = async (): Promise<void> => {
  loginError.value = null;

  const isUserNameValid = validateUserName();
  const isPasswordValid = validatePassword();

  if (!isUserNameValid || !isPasswordValid) {
    return;
  }

  try {
    const success = await useAuthStore().loginAndStore(username.value, password.value);

    if (success && sessionStorage.getItem('token')) {
      router.push('/dashboard');
    } else {
      loginError.value = 'Invalid username or password';
    }
  } catch (error) {
    loginError.value = 'Login failed. Please try again.';
    console.error('Login error:', error);
  }
}

defineExpose({
  auth,
  userNameError,
  passwordError,
  loginError,
  username,
  password
})
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
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
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: white;
  text-align: left;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
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

.p-error {
  color: #f87171;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.p-invalid {
  border-color: #f87171 !important;
}

.p-invalid:focus {
  box-shadow: 0 0 0 2px rgba(248, 113, 113, 0.3) !important;
}

@media only screen and (max-width: 768px) {
  .logo-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    h1 {
      font-size: 3rem;
    }
  }
}
</style>