<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SideBar.vue'
</script>

<template>
  <div class="app">
    <Sidebar class="sidebar"/>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style lang="scss" scoped>
:root{
  --color-primary: #01081F;
  --color-secondary: #0C1635;
  --color-contrast: #fff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  background: none;
  outline: none;
}

.app {
  display: flex;
  background-color: #0C1635;
  height: 100vh;

  @media only screen and (orientation: portrait) and (max-width: 768px) {
    .sidebar {
      width: 100vw;
      height: 60px;
      bottom: 0;
      left: 0;
      flex-direction: row;
    }
  }

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 768px) {
      padding: 6rem;
    }
  }
}
</style>
