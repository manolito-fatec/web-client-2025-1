<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Password from "primevue/password";
import UserManagementTable from "@/components/UserManagementTable.vue";
import {Roles} from "@/enums/Roles.ts";
import {Tools} from "@/enums/Tools.ts";
import type {User} from "@/types/User.ts";
import {fetchAllUsers} from "@/api/GetUsersApi.ts";

/**
 * Represents a user in the system
 * @interface
 * @property {number} id - Unique user identifier
 * @property {string} fullname - User's full name
 * @property {string} username - Login username
 * @property {"ADMIN"|"OPERATOR"|"MANAGER"|string} role - User role/privilege level
 * @property {string} tool - Associated ETL tool
 * @property {string} idTool - User ID in the ETL tool
 * @property {string} projectTool - Associated project in ETL tool
 * @property {string} created - Creation date (DD/MM/YYYY format)
 * @property {string} [password] - User password (optional)
 * @property {string} [email] - User email (optional)
 */

/**
 * Available roles for user selection
 * @type {Array<{label: string, value: string}>}
 */
const roles = ref([
  { label: "Admin", value: "ADMIN" },
  { label: "Operator", value: "OPERATOR" },
  { label: "Manager", value: "MANAGER" },
]);

/**
 * Available ETL tools for selection
 * @type {Array<{label: string, value: string}>}
 */
const tools = ref([
  { label: "Taiga", value: "Taiga" },
  { label: "Trello", value: "Trello" },
  { label: "Jira", value: "Jira" },
]);

/**
 * List of registered users
 * @type {import("vue").Ref<User[]>}
 */
//TODO GET ALL USERS LIST/ARRAY
const users:Ref<User[]> = ref<User[]>([]);

/**
 * New user being registered
 * @type {import("vue").Ref<Omit<User, "id"|"created">>}
 */
const newUser = ref<Omit<User, "id" | "created">>({
  fullname: "",
  username: "",
  role: Roles.ADMIN,
  tool: Tools.TAIGA,
  idTool: "",
  projectTool: "",
  password: "",
  email: "",
});

/**
 * Full name validation error message
 * @type {import("vue").Ref<string|null>}
 */
const fullNameError = ref<string | null>(null);

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
 * Validates the full name field
 * @function
 * @returns {boolean} True if validation passes
 * @description Checks for empty value, length > 255 chars, and special characters
 */
const validateFullName = () => {
  const value = newUser.value.fullname;

  if (!value) {
    fullNameError.value = 'Full name is required';
    return false;
  }

  if (value.length > 255) {
    fullNameError.value = 'Full name must be less than 255 characters';
    return false;
  }

  const pattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  if (!pattern.test(value)) {
    fullNameError.value = 'Cannot contain special characters';
    return false;
  }

  fullNameError.value = null;
  return true;
};

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
 * Handles form submission
 * @function
 * @description Validates all fields and registers new user if valid
 */
const handleSubmit = () => {
  const isFullNameValid = validateFullName();
  const isUserNameValid = validateUserName();
  const isEmailValid = validateEmail();
  if (!isFullNameValid || !isUserNameValid || !isEmailValid) {
    return;
  }
  const userToSubmit: User = {
    id:
        users.value.length > 0
            ? Math.max(...users.value.map((u) => u.id!)) + 1
            : 1!,
    fullname: newUser.value.fullname,
    username: newUser.value.username,
    email: newUser.value.email,
    password: newUser.value.password,
    role: newUser.value.role,
    tool: newUser.value.tool,
    idTool: newUser.value.idTool,
    projectTool: newUser.value.projectTool,
    createdAt: new Date().toLocaleDateString("pt-BR"),
  };
  users.value.push(userToSubmit);
  console.log("Registered user:", userToSubmit);
  clearForm();
};

/**
 * Resets the registration form
 * @function
 */
const clearForm = () => {
  newUser.value = {
    fullname: "",
    username: "",
    roles: ['Admin'],
    tool: Tools.TAIGA,
    idTool: "",
    projectTool: "",
    password: "",
    email: "",
  };
};

const rolesFix = (userList: User[]) => {
  const userListFixed:Ref<User[]> = ref<User[]>([]);
  for (const user of userList) {
    for (let i = 0; i < user.roles.length; i++) {
      switch (user.roles[i]) {
        case 'ROLE_ADMIN':
          user.roles[i] = 'Admin';
          break;
        case 'ROLE_OPERATOR':
          user.roles[i] = 'Operator';
          break;
        case 'ROLE_MANAGER':
          user.roles[i] = 'Manager';
          break;
      }
      if (typeof user.roles !== "string") {
        user.tableRoles = user.roles.join(", ")
      }
      userListFixed.value.push(user);
    }
  }

  return userListFixed.value;
}

onMounted(() => {
  fetchAllUsers().then(usersApi => {
    users.value = rolesFix(usersApi);
  })
})

defineExpose({
  fullNameError,
  userNameError,
  emailError,
  validateEmail,
  validateUserName,
  validateFullName,
  handleSubmit,
  users,
  newUser
})
</script>

<template>
  <div class="user-management-scroll-container">
    <div class="user-management-container">
      <h1>Register new user</h1>

      <div class="form-section">
        <form @submit.prevent="handleSubmit">
          <h2 class="section-title">Personal Information</h2>
          <div class="form-grid">
            <div class="form-group full-width-field">
              <label for="fullName">Full name</label>
              <InputText
                  id="fullName"
                  v-model="newUser.fullname"
                  placeholder="Enter full name"
                  @input="validateFullName"
                  :class="{ 'p-invalid': fullNameError }"
                  required
              />
              <small v-if="fullNameError" class="p-error">{{ fullNameError }}</small>
            </div>

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
                  v-model="newUser.role"
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
                  v-model="newUser.tool"
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
              <InputText
                  id="projectTool"
                  v-model="newUser.projectTool"
                  placeholder="Enter project tool"
              />
            </div>
            <div class="form-group">
              <label for="idTool">User Project - Tool</label>
              <InputText
                  id="idTool"
                  v-model="newUser.idTool"
                  placeholder="Enter user project tool ID"
              />
            </div>
          </div>

          <div class="button-group full-width">
            <Button
                id = "cleanAll"
                label="Clean up"
                severity="secondary"
                @click="clearForm"
                type="button"
            />
            <Button label="Register" type="submit" />
          </div>
        </form>
      </div>

      <UserManagementTable
          :users="users"
      />
    </div>
  </div>
</template>

<style scoped>
.user-management-scroll-container {
  height: 100%;
  overflow-y: auto;
}

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

  h1 {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.25rem;
  }
}
</style>