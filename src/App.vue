<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SideBar.vue'
</script>

<template>
  <div class="app">
    <Sidebar/>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style lang="scss" scoped>
:root{
  --color-primary: #01081F;
  --color-secondary: #010e38;
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
  height: 100vh;
  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 768px) {
      padding: 6rem;
    }
  }
}
</style>
