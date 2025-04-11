<script setup lang="ts">
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();

const goDash = () => {
  router.push('/dashboard');
};
const goProfile = () => {
  router.push('/profile');
};
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../assets/icons/Manolito.png" alt="ManolitoLogo"/>
      <span class="text">Youtan Dash</span>
    </div>
    <div class="sidebar-button-grid" >
      <Button icon="pi pi-objects-column" label="Dashboard" @click="goDash" variant="text" class="sidebar-routers"></Button>
      <Button icon="pi pi-user" label="Profile"  @click="goProfile" severity="contrast" variant="text" class="sidebar-routers"></Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: fixed;
  background-color: #01081F;
  width: 300px;
  height: 100vh;
  overflow: hidden;
  left: 0;

  .sidebar-routers {
    width: 100%;
    display: flex;

    ::v-deep(.p-button-label) {
    color: #FFFFFF !important;
    }
    ::v-deep(.p-button-icon) {
    color: #FFFFFF !important;
    }
  }


  .text {
    color: #fff;
    font-size: 1.6rem;
    font-weight: 700;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 4rem;
    }
  }

  .sidebar-button-grid {
    display: grid;
    position: relative;
    gap: 0.2rem;

    .sidebar-routers {
      width: 16rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0.5rem 1rem;
      font-size: 1.5rem;
      gap: 0.5rem;

      &:hover {
        background-color: #010e38;
        color: #FFFFFF;
      }
    }
  }

  // Modo retrato (portrait)
  @media only screen and (orientation: portrait) and (max-width: 768px) {
    bottom: 0;

    .logo {
      display: none;
    }

    .sidebar-button-grid {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      .sidebar-routers {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        gap: 0.3rem;

        .p-button-label, .p-button-icon {
          display: block;
        }

        .p-button-icon {
          margin: 0;
        }

        .p-button-icon, .p-button-label {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        & > .p-button-icon, & > .p-button-label {
          flex-direction: column;
        }

        & {
          flex-direction: column;
          gap: 0.2rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}

</style>
