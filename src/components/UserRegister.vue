<script lang="ts">
import { ref, reactive, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, helpers, email } from '@vuelidate/validators';

export default {
  name: 'RegisterUser',
  components: {
    InputText,
    Dropdown,
    Button,
  },
  setup() {
    const formData = reactive({
      fullname: '',
      username: '',
      password: '',
      email: '',
      role: null,
      tools: null,
      projectTool: null,
      userProjectTool: '',
    });

    const roles = ref([
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ]);

    const etlTools = ref([
      { label: 'Tool A', value: 'toolA' },
      { label: 'Tool B', value: 'toolB' },
    ]);

    const projectTools = ref([
      { label: 'Project X - Tool A', value: 'projectXToolA' },
      { label: 'Project Y - Tool B', value: 'projectYToolB' },
    ]);


    const rules = computed(() => {
      const noSpecialCharsOrNumbers = helpers.regex(/^[A-Za-z\s]*$/);
      const basicEmailFormat = helpers.regex(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/);

      return {
        fullname: {
          maxLength: maxLength(255),
          noSpecialCharsOrNumbers: helpers.withMessage(
              'Cannot contain special characters (@#$%&()-!?+:;) or numbers.',
              noSpecialCharsOrNumbers
          ),
        },
        username: {
          required: helpers.withMessage('Username is required.', required),
          maxLength: maxLength(60),
        },
        email: {
          required: helpers.withMessage('Email is required.', required),
          maxLength: maxLength(100),
          email: helpers.withMessage('Invalid email format.', email),
          basicEmailFormat: helpers.withMessage('Invalid email format (e.g., user@domain.com).', basicEmailFormat)
        },
      };
    });

    const validations = useVuelidate(rules, formData);

    const clearForm = () => {
      formData.fullname = '';
      formData.username = '';
      formData.password = '';
      formData.email = '';
      formData.role = null;
      formData.tools = null;
      formData.projectTool = null;
      formData.userProjectTool = '';
      validations.value.$reset();
    };

    const registerUser = async () => {
      const isFormValid = await validations.value.$validate();

      if (!isFormValid) {
        console.log('Form is invalid', validations.value.$errors);
        return;
      }

      console.log('Form submitted:', formData);
    };

    return {
      formData,
      roles,
      etlTools,
      projectTools,
      validations,
      clearForm,
      registerUser,
    };
  },
};
</script>

<template>
  <div class="register-user-container">
    <h2>Register new user</h2>

    <div class="p-fluid p-formgrid grid">
      <div class="field col-12">
        <h4>Personal Information</h4>
      </div>

      <div class="field col-12 md:col-6">
        <label for="fullname">Full name</label>
        <InputText
            id="fullname"
            type="text"
            v-model="formData.fullname"
            :class="{ 'p-invalid': validations.fullname.$error }"
            aria-describedby="fullname-help"
            maxlength="255"
        />
        <small id="fullname-help" class="p-error" v-if="validations.fullname.$error">
          {{ validations.fullname.$errors[0].$message }}
        </small>
      </div>

      <div class="field col-12 md:col-6">
        <label for="password">Password</label>
        <InputText id="password" type="password" v-model="formData.password" />
      </div>

      <div class="field col-12 md:col-6">
        <label for="username">Username</label>
        <InputText
            id="username"
            type="text"
            v-model="formData.username"
            :class="{ 'p-invalid': validations.username.$error }"
            aria-describedby="username-help"
            maxlength="60"
        />
        <small id="username-help" class="p-error" v-if="validations.username.$error">
          {{ validations.username.$errors[0].$message }}
        </small>
      </div>

      <div class="field col-12 md:col-6">
        <label for="role">Role</label>
        <Dropdown id="role" v-model="formData.role" :options="roles" placeholder="Select a Role" />
      </div>

      <div class="field col-12 md:col-6">
        <label for="email">Email</label>
        <InputText
            id="email"
            type="email"
            v-model="formData.email"
            :class="{ 'p-invalid': validations.email.$error }"
            aria-describedby="email-help"
            maxlength="100"
        />
        <small id="email-help" class="p-error" v-if="validations.email.$error">
          {{ validations.email.$errors[0].$message }}
        </small>
      </div>

      <div class="field col-12">
        <h4>ETL Tools</h4>
      </div>

      <div class="field col-12 md:col-6">
        <label for="tools">Tools</label>
        <Dropdown id="tools" v-model="formData.tools" :options="etlTools" placeholder="Select Tool" />
      </div>

      <div class="field col-12 md:col-6">
        <label for="project-tool">Project - Tool</label>
        <Dropdown id="project-tool" v-model="formData.projectTool" :options="projectTools" placeholder="Select Project - Tool" />
      </div>

      <div class="field col-12 md:col-6">
        <label for="user-project-tool">User Project - Tool</label>
        <InputText id="user-project-tool" type="text" v-model="formData.userProjectTool" />
      </div>

    </div>

    <div class="p-button-group form-buttons">
      <Button label="Clean up" icon="pi pi-times" class="p-button-secondary" @click="clearForm" />
      <Button label="Register" icon="pi pi-check" @click="registerUser" />
    </div>
  </div>
</template>

<style scoped>
.register-user-container {
  padding: 20px;
}

.form-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.p-formgrid.grid .field {
  margin-bottom: 1rem;
}

.p-error {
  font-size: 0.875em;
  color: var(--red-600);
}
</style>