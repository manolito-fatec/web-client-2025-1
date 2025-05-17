<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Password from "primevue/password";
import UserManagementTable from "@/components/UserManagementTable.vue";
import {Tools} from "@/enums/Tools.ts";
import type {User} from "@/types/User.ts";
import {fetchPaginatedUsers} from "@/api/GetUsersApi.ts";
import {editUserApi} from "@/api/EditUserApi.ts";
import {removeUserApi} from "@/api/RemoveUserApi.ts";
import type {UserPag} from "@/types/PagUser.ts";

/**
 * Represents the editing state of the form
 * @type {ref<boolean>}
 */
const isEditing = ref(false);
/**
 * Stores the current userId for edit methods. Will be null when edit is @isEditing is false
 * @type {ref<number | null>>}
 */
const currentUserId = ref<number | null>(null);
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
 * @type {import("vue").Ref<UserPag[]>}
 */
//TODO GET ALL USERS LIST/ARRAY
const users:Ref<UserPag[]> = ref<UserPag[]>([]);

/**
 * New user being registered
 * @type {import("vue").Ref<Omit<UserPag, "userId"|"createdAt">>}
 */
const newUser = ref<Omit<UserPag, "userId" | "createdAt">>({
  userName: "",
  userRole: 'Admin',
  toolName: Tools.TAIGA,
  userEmail: "",
  toolId: '1',
  projectName: "",
  userPassword: "",
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
 * Validates the email field
 * @function
 * @returns {boolean} True if validation passes
 * @description Checks for empty value, length > 255 chars, and valid email format
 */
const validateEmail = () => {
  const value = newUser.value.userEmail;

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
  const value = newUser.value.userName;

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
* @method enterEditMode
* @description Enters edit mode for a specific user
* @param {UserPag} user - The user to edit
*/
const enterEditMode = (user: UserPag) => {
  isEditing.value = true;
  currentUserId.value = user.userId!;
  newUser.value = {
    userName: user.userName,
    userEmail: user.userEmail || '',
    userPassword: user.userPassword || '',
    userRole: user.userRole,
    toolName: user.toolName,
    toolId: user.toolId,
    projectName: user.projectName,
  };
};

/**
 * @method exitEditMode
 * @description Exits edit mode and resets form
 */
const exitEditMode = () => {
  isEditing.value = false;
  currentUserId.value = null;
  clearForm();
};

/**
 * Convert UserPag object to User
 * @method
 * @param userPag
 */
const pagToUserConverter = (userPag : UserPag): {
  id: number;
  username: string;
  roles: string[];
  tool: string;
  idTool: string;
  password: string;
  email: string
} => {
  return {
    id: userPag.userId!,
    username: userPag.userName,
    roles : [userPag.userRole],
    tool: userPag.toolName,
    idTool: userPag.toolId,
    password: userPag.userPassword,
    email: userPag.userEmail
  }
}

/**
 * Convert User object to UserPag
 * @method
 * @param user
 */
const userToPagConverter = (user: User): {
  userId: number;
  userName: string;
  userRole: string;
  userEmail: string;
  userPassword: string;
  toolName: string;
  toolId: string;
  projectName: string;
  createdAt: string;
} => {
  return {
    userId: user.id!,
    userName: user.username,
    userRole: user.roles[0],
    userEmail: user.email,
    userPassword: user.password!,
    toolName: user.tool!,
    toolId: user.idTool!,
    projectName: user.projectTool!,
    createdAt: user.createdAt!
  };
}


/**
 * Handles form submission. If @isEditing is true, the user will be updated and not created
 * Internally, the function creates a copy object from the edit form loaded one and sends it to @rolesReturn method and
 * for the @pagToUserConverter method, and finally to the endpoint call.
 * @function
 * @description Validates all fields and registers new or edited user if valid
 */
const handleSubmit = () => {
  const isUserNameValid = validateUserName();
  const isEmailValid = validateEmail();
  if (!isUserNameValid || !isEmailValid) {
    return;
  }

  if (isEditing.value && currentUserId.value) {
    const userToUpdate: UserPag = {
      userId: currentUserId.value,
      userName: newUser.value.userName,
      userEmail: newUser.value.userEmail,
      userPassword: newUser.value.userPassword,
      userRole: newUser.value.userRole,
      toolName: newUser.value.toolName,
      toolId: newUser.value.toolId,
      projectName: newUser.value.projectName,
      createdAt: users.value.find(u => u.userId === currentUserId.value)?.createdAt || new Date().toLocaleDateString("pt-BR"),
    };
    const userRolesFixed: UserPag = rolesReturn(userToUpdate);
    userRolesFixed.createdAt = '';
    editUserApi(pagToUserConverter(userRolesFixed)).then(responseUser => {
      responseUser.tool = userRolesFixed.toolName;
      const index = users.value.findIndex(u => u.userId === currentUserId.value);
      if (index !== -1) {
        users.value[index] = rolesFix([userToPagConverter(responseUser)])[0];
      }
      successMessage.value = 'User updated successfully!';
      setTimeout(() => {
        successMessage.value = null;
        exitEditMode();
      }, 3000);
    });
  } else {
    const userToSubmit: User = pagToUserConverter(newUser.value);
    console.log("Registered user:", userToSubmit);
    clearForm();
  }
};

/**
 * Resets the registration form
 * @function
 */
const clearForm = () => {
  newUser.value = {
    userName: "",
    userRole: 'Admin',
    toolName: 'Taiga',
    toolId: '1',
    projectName: "",
    userPassword: "",
    userEmail: "",
  };
  exitEditMode();
};

/**
 * Converts the enum roles from the back-end to prettier ones
 * @param userList
 */
const rolesFix = (userList: UserPag[]) => {
  const userListFixed: Ref<UserPag[]> = ref<UserPag[]>([]);
  for (const user of userList) {
    const userCopy = { ...user };
    let role = userCopy.userRole;
    switch (role) {
      case 'ROLE_ADMIN':
        role = 'Admin';
        break;
      case 'ROLE_OPERATOR':
        role = 'Operator';
        break;
      case 'ROLE_MANAGER':
        role = 'Manager';
        break;
    }
    userCopy.userRole = role;
    userListFixed.value.push(userCopy);
  }

  return userListFixed.value;
}

/**
 * Converts the prettier values to the back-end to enum required strings
 * @param userReturn
 */
const rolesReturn = (userReturn: UserPag) => {
  const userFixed: Ref<UserPag> = ref<UserPag>(userReturn);
  let role = userReturn.userRole;
  switch (role) {
    case "ADMIN":
      role = 'ROLE_ADMIN';
      break;
    case "OPERATOR":
      role = 'ROLE_OPERATOR';
      break;
    case "MANAGER":
      role = 'ROLE_MANAGER';
      break;
  }
  userFixed.value.userRole = role;

  return userFixed.value;
}

/**
 * Handler for the user-edit emit event
 * @param user
 */
const handleUserEdited = (user: UserPag) => {
  enterEditMode(user);
};

/**
 * Handler for the user-removed emit event
 * @param userId
 */
const handleUserDeleted = (userId: number) => {
  removeUserApi(userId).then(() => {
        users.value = users.value.filter(user => user.userId !== userId);
  });
};

onMounted(() => {
  fetchPaginatedUsers().then(usersApi => {
    users.value = rolesFix(usersApi);
  })
})

defineExpose({
  userNameError,
  emailError,
  validateEmail,
  validateUserName,
  handleSubmit,
  users,
  newUser
})
</script>

<template>
  <div class="user-management-scroll-container">
    <div class="user-management-container">
      <h1>{{ isEditing ? 'Edit User' : 'Register new user' }}</h1>

      <div class="form-section">
        <form @submit.prevent="handleSubmit">
          <h2 class="section-title">Personal Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="username">Username</label>
              <InputText
                  id="username"
                  v-model="newUser.userName"
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
                  v-model="newUser.userPassword"
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
                  v-model="newUser.userEmail"
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
                  v-model="newUser.userRole"
                  :options="roles"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select a role"
                  required
                  class="w-full"
              />
            </div>
          </div>

          <h2 class="section-title etl-title" v-if="!isEditing">ETL Tools</h2>
          <div class="form-grid" v-if="!isEditing">
            <div class="form-group full-width-field">
              <label for="tools">Tools</label>
              <Dropdown
                  id="tools"
                  v-model="newUser.toolName"
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
                  v-model="newUser.toolName"
                  placeholder="Enter project tool"
              />
            </div>
            <div class="form-group">
              <label for="idTool">User Project - Tool</label>
              <InputText
                  id="idTool"
                  v-model="newUser.toolId"
                  placeholder="Enter user project tool ID"
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
                v-if="isEditing"
            />
            <Button
                id="cleanAll"
                label="Clean up"
                severity="secondary"
                @click="clearForm"
                type="button"
                v-else
            />
            <Button :label="isEditing ? 'Update' : 'Register'" type="submit" />
          </div>
        </form>
      </div>

      <UserManagementTable
          :users="users"
          @user-deleted="handleUserDeleted"
          @user-edited="handleUserEdited"
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