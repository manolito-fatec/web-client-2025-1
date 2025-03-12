<script setup lang="ts">
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();

const goDash = () => {
  router.push('/dashboard');
};
const goHome = () => {
  router.push('/home');
};
</script>

<template>
  <aside>
    <div class="logo">
      <img src="../assets/icons/Manolito.png" alt="ManolitoLogo"/>
      <span class="text">Youtan Dash</span>
    </div>
    <div class="sidebar-button-grid">
      <Button icon="pi pi-objects-column" label="Dashboard" @click="goDash" severity="contrast" variant="text" class="sidebar-routers"></Button>
      <Button icon="pi pi-home" label="Home" @click="goHome" severity="contrast" variant="text" class="sidebar-routers"></Button>
      <Button icon="pi pi-user" label="Profile"  @click="goHome" severity="contrast" variant="text" class="sidebar-routers"></Button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #01081F;
  width: 300px;
  height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;
  bottom: 0;

  .text {
    color: #fff;
    font-size: 1.6rem;
    font-weight: 700;
  }
  .logo{
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
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: 0.5rem 1rem;
        font-size: 1.5rem;
      
        &:hover {
          background-color: #010e38;
          color: #FFFFFF;
        }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}

.sidebarLogo {
  display: block;
  width: 4vw;
  height: 8vh; 
}

.sidebar {
  width: 300px;
  background-color: #01081f;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}





</style>
