<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SideBar.vue'
</script>

<template>
  <div>
    <Sidebar/>
  </div>
  <div class="router-view">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
:root{
  --color-primary: #ff8c00;
  --color-secondary: #01081f;
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
  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 768px) {
      padding: 6rem;
    }
  }
}
</style>
