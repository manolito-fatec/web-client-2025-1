<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import SideBarLogo from './SideBarLogo.vue'

const router = useRouter()

const goRoute = () => {
  router.push('/')
}
</script>

<template>
  <nav class="sidebar">
    <SideBarLogo class="sidebarLogo"/>
    <Button label="Home" severity="secondary" raised @click="goRoute"></Button>
  </nav>
</template>

<style lang="css">
.sidebarLogo{
  width: 4vw;
  height: 8vh; /* Always the double of the width */
}
/* Barra lateral */
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
