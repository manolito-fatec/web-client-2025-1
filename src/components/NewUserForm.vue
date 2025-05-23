<script setup lang="ts">
import { ref, watch } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Password from "primevue/password";
import MultiSelect from "primevue/multiselect"
import { fetchProjectsByTollId} from "@/api/GetProjectsApi.ts";
import type {ProjectDto} from "@/types/ProjectTable.ts";
import type {SignupRequestDto} from "@/types/SignupRequestDto.ts";
import {signupUser} from "@/api/UserSignup.ts";

/**
 * New user being registered
 * @type {import("vue").Ref<Omit<UserPag, "userId"|"createdAt">>}
 */
const newUser = ref<Omit<SignupRequestDto, "userId" | "createdAt">>({
  username: "",
  email: "",
  password: "",
  roles: ['Admin'],
  toolUserId: '',
  toolId: 0,
});

/**
 * Username validation error message
 * @type {import("vue").Ref<string|null>}
 */
const userNameError = ref<string | null>(null);

/**
 * Email validation error message
 * @type {import("vue").Ref<string|null>}
 */
const emailError = ref<string | null>(null);

/**
 * Available roles for user selection
 * @type {Array<{label: string, value: string}>}
 */
const roles = ref([
  { label: "Admin", value: ["ROLE_ADMIN"] },
  { label: "Operator", value: ["ROLE_OPERATOR"] },
  { label: "Manager", value: ["ROLE_MANAGER"] },
]);

/**
 * Available ETL tools for selection
 * @type {Array<{label: string, value: string}>}
 */
const tools = ref([
  { label: "Taiga", value: "1" },
  { label: "Trello", value: "2" },
  { label: "Jira", value: "3" },
]);

const projectsById = ref<ProjectDto[]>([])

/**
 * Validates the email field
 * @function
 * @returns {boolean} True if validation passes
 * @description Checks for empty value, length > 255 chars, and valid email format
 */
const validateEmail = () => {
  const value = newUser.value.email;

  if (!value) {
    emailError.value = 'Email is required';
    return false;
  }

  if (value.length > 255) {
    emailError.value = 'Email must be less than 255 characters';
    return false;
  }

  const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!pattern.test(value)) {
    emailError.value = 'Please enter a valid email address';
    return false;
  }

  emailError.value = null;
  return true;
};

/**
 * Validates the username field
 * @function
 * @returns {boolean} True if validation passes
 * @description Checks for empty value, length > 255 chars, and allowed characters
 */
const validateUserName = () => {
  const value = newUser.value.username;

  if (!value) {
    userNameError.value = 'Username is required';
    return false;
  }

  if (value.length > 255) {
    userNameError.value = 'Username must be less than 255 characters';
    return false;
  }

  const pattern = /^[a-zA-Z0-9_]+$/;
  if (!pattern.test(value)) {
    userNameError.value = 'Only letters, numbers and underscores allowed';
    return false;
  }

  userNameError.value = null;
  return true;
};

/**
 * Handles form submission.
 * @function
 * @description Validates all fields and emits submit event if valid
 */
const handleSubmit = () => {
  const isUserNameValid = validateUserName();
  const isEmailValid = validateEmail();
  if (!isUserNameValid || !isEmailValid) {
    return;
  }
  try{
    signupUser(newUser.value);
  } catch (e) {
    throw e;
  }
  clearForm();
};

/**
 * Resets the registration form
 * @function
 */
const clearForm = () => {
  newUser.value = {
    username: "",
    email: "",
    password: "",
    roles: ['Admin'],
    toolUserId: '',
    toolId: 0,
  };
};

const fetchProjects = async () => {
  await fetchProjectsByTollId((<number>(<unknown>newUser.value.toolId!))).then(projectsData => {
    projectsById.value = projectsData;
  })
}

watch([newUser.value.toolId], fetchProjects);

defineExpose({
  userNameError,
  emailError,
  validateEmail,
  validateUserName,
  clearForm,
  newUser
})
</script>

<template>
  <div class="form-section">
    <form @submit.prevent="handleSubmit">
      <h2 class="section-title">Personal Information</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="username">Username</label>
          <InputText
              id="username"
              v-model="newUser.username"
              placeholder="Enter username"
              @input="validateUserName"
              :class="{ 'p-invalid': userNameError }"
              required
          />
          <small v-if="userNameError" class="p-error">{{ userNameError }}</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Password
              id="password"
              v-model="newUser.password"
              :feedback="false"
              placeholder="Enter password"
              required
              toggleMask
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <InputText
              id="email"
              v-model="newUser.email"
              type="email"
              placeholder="Enter email"
              @input="validateEmail"
              :class="{ 'p-invalid': emailError }"
              required
          />
          <small v-if="emailError" class="p-error">{{ emailError }}</small>
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <Dropdown
              id="role"
              v-model="newUser.roles"
              :options="roles"
              optionLabel="label"
              optionValue="value"
              placeholder="Select a role"
              required
              class="w-full"
          />
        </div>
      </div>

      <h2 class="section-title etl-title">ETL Tools</h2>
      <div class="form-grid">
        <div class="form-group full-width-field">
          <label for="tools">Tools</label>
          <Dropdown
              id="tools"
              v-model="newUser.toolId"
              :options="tools"
              optionLabel="label"
              optionValue="value"
              placeholder="Select a tool"
              required
              class="w-full"
          />
        </div>

        <div class="form-group">
          <label for="projectTool">Project - Tool</label>
          <MultiSelect
              id="projectTool"
              v-model="newUser"
              :options="projectsById"
              placeholder="Enter project tool"
          />
        </div>
        <div class="form-group">
          <label for="idTool">User Project - Tool</label>
          <Dropdown
              id="idTool"
              v-model="newUser.toolUserId"
              placeholder="Enter user project tool ID"
          />
        </div>
      </div>
      <div class="button-group full-width">
        <Button
            id="cleanAll"
            label="Clean up"
            severity="secondary"
            @click="clearForm"
            type="button"
        />
        <Button label="Register" type="submit" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-section {
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2.5rem;
}

.section-title {
  margin-bottom: 1.5rem;
  color: #cbd5e0;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 500;
  padding-bottom: 0.5rem;
}

.etl-title {
  margin-top: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}

.form-group.full-width-field {
  grid-column: span 2;
}

label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 500;
  color: #a0aec0;
  font-size: 0.875rem;
}

:deep(.p-password .p-inputtext),
:deep(.p-dropdown) {
  background-color: #ffffff;
  border: 1px solid #4a5568;
  color: #1a202c;
  border-radius: 6px;
  width: 100%;
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
  font-size: 0.95rem;
}

.custom-focus:focus {
  border-color: #3d7eff !important;
}

:deep(.p-inputtext:enabled:focus) {
  border-color: #3d7eff !important;
  box-shadow: 0 0 0 2px rgba(61, 126, 255, 0.3) !important;
}
:deep(.p-dropdown:not(.p-disabled):hover) {
  border-color: #3d7eff;
}

:deep(.p-inputtext:enabled:focus),
:deep(.p-password .p-inputtext:enabled:focus),
:deep(.p-dropdown:not(.p-disabled).p-focus) {
  border-color: #3d7eff;
  box-shadow: 0 0 0 2px rgba(61, 126, 255, 0.3);
}

:deep(.p-dropdown .p-dropdown-label) {
  color: #1a202c;
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
  font-size: 0.95rem;
}

:deep(.p-dropdown-panel) {
  background-color: #0b1a3d;
  border: 1px solid #2d3748;
}

:deep(.p-dropdown-item) {
  color: #e2e8f0;
  padding: 0.75rem 1rem;
}

:deep(.p-dropdown-item:hover) {
  background-color: #1e293b;
}

:deep(.p-dropdown-item.p-highlight) {
  background-color: #3d7eff;
  color: #ffffff;
}
:deep(.p-inputtext:disabled) {
  background-color: #fff;
  color: #000;
}

:deep(.p-password) {
  width: 100%;
}

:deep(.p-password-panel) {
  background-color: #0b1a3d;
  color: #e2e8f0;
  border: 1px solid #2d3748;
}

:deep(.p-password-meter-label) {
  background-color: #3d7eff !important;
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

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
  grid-column: span 2;
}

:deep(.p-button) {
  padding: 0.75rem 1.75rem;
  font-weight: 500;
  border-radius: 6px;
  font-size: 0.95rem;
}

:deep(.p-button.p-button-secondary) {
  background-color: #4a5568;
  color: #e2e8f0;
  border: 1px solid #4a5568;
}

:deep(.p-button.p-button-secondary:hover) {
  background-color: #2d3748;
  border-color: #2d3748;
}

:deep(.p-button[type="submit"]) {
  background-color: #3d7eff;
  color: #ffffff;
  border: 1px solid #3d7eff;
}

:deep(.p-button[type="submit"]:hover) {
  background-color: #2563eb;
  border-color: #2563eb;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width-field {
    grid-column: span 1;
  }

  .button-group {
    justify-content: center;
  }

  .section-title {
    font-size: 1.25rem;
  }
}
</style>