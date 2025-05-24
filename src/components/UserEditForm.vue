<script setup lang="ts">

import {type Ref, ref} from "vue";
import type {UserPag} from "@/types/PagUser.ts";
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import {editUserApi} from "@/api/EditUserApi.ts";

const props = defineProps<{
  edittedData: UserPag
}>();


const edittingUser = ref<UserPag>({
  userId: props.edittedData.userId,
  userName: props.edittedData.userName,
  userEmail: props.edittedData.userEmail,
  userPassword: props.edittedData.userPassword,
  userRole: props.edittedData.userRole,
  toolName: props.edittedData.toolName,
});

/**
 * Stores the sucess message for edit. Will only have a value when the editApi returns success.
 * @type {ref<string | null>}
 */
const successMessage = ref<string | null>(null);
/**
 * Available roles for user selection
 * @type {Array<{label: string, value: string}>}
 */
const roles = ref([
  { label: "ADMIN", value: "ROLE_ADMIN" },
  { label: "OPERATOR", value: "ROLE_OPERATOR" },
  { label: "MANAGER", value: "ROLE_MANAGER" },
]);

/**
 * List of registered users
 * @type {import("vue").Ref<UserPag[]>}
 */
const users:Ref<UserPag[]> = ref<UserPag[]>([]);

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
 * Validates the email field
 * @function
 * @returns {boolean} True if validation passes
 * @description Checks for empty value, length > 255 chars, and valid email format
 */
const validateEmail = () => {
  const value = edittingUser.value.userEmail;

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
  const value = edittingUser.value.userName;

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
 * @method exitEditMode
 * @description Exits edit mode and resets form
 */
const exitEditMode = () => {
  emit('eddited');
  clearForm();
};

const emit = defineEmits<{
  (e: 'eddited'): void
}>();


/**
 * Handles form submission. If @isEditing is true, the user will be updated and not created
 * Internally, the function creates a copy object from the edit form loaded one and sends it to @rolesReturn method and
 * for the @pagToUserConverter method, and finally to the endpoint call.
 * @function
 * @description Validates all fields and registers new or edited user if valid
 */
const handleSubmit = async () => {
  const isUserNameValid = validateUserName();
  const isEmailValid = validateEmail();
  if (!isUserNameValid || !isEmailValid) {
    return;
  }

  try {
    const userData = {
      id: edittingUser.value.userId!,
      username: edittingUser.value.userName,
      email: edittingUser.value.userEmail,
      password: edittingUser.value.userPassword || undefined,
      roles: [edittingUser.value.userRole]
    };

     await editUserApi(userData);

    successMessage.value = 'User updated successfully!';
    setTimeout(() => {
      exitEditMode();
    }, 2000);

  } catch (error) {
    console.error('Error updating user:', error);
    successMessage.value = 'Error updating user!';
  }
};

/**
 * Resets the registration form
 * @function
 */
const clearForm = () => {
  edittingUser.value = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userRole: "ROLE_OPERATOR",
    toolName: "Taiga",
  };
};

defineExpose({
  userNameError,
  emailError,
  validateEmail,
  validateUserName,
  handleSubmit,
  users,
  edittingUser
})
</script>

<template>
  <div>
    <div class="user-management-container">
      <h1>Edit User</h1>
      <div class="form-section">
        <form @submit.prevent="handleSubmit">
          <h2 class="section-title">Personal Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="username">Username</label>
              <InputText
                  id="username"
                  v-model="edittingUser.userName"
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
                  v-model="edittingUser.userPassword"
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
                  v-model="edittingUser.userEmail"
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
                  v-model="edittingUser.userRole"
                  :options="roles"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select a role"
                  required
                  class="w-full"
              />
            </div>
          </div>

          <div class="button-group full-width">
            <small v-if="successMessage" class="p-success">{{ successMessage }}</small>
            <Button
                id="cleanAll"
                label="Cancel"
                severity="secondary"
                @click="exitEditMode"
                type="button"
            />
            <Button :label="'Update'" type="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

.user-management-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #fff;
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

.p-success {
  color: #4ade80;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: block;
  text-align: center;
  grid-column: span 2;
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

  h1 {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.25rem;
  }
}
</style>