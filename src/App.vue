<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SideBar.vue'
</script>

<template>
  <div class="sidebar">
    <Sidebar />
  </div>
  <div class="content">
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

.content {
  margin-left: 5rem; 
  padding: 1rem;
  flex: 1; 
  box-sizing: border-box;
  overflow: auto;
}

header {
  text-align: left;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
