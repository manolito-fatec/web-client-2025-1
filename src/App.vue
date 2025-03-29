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
  .chart-wrapper, .comp-grid, main {
  transition: all 0.3s ease-in-out;
}
  display: flex;
  background-color: #0C1635;
  height: 100vh;

  main {
    flex: 1 1 0;
    padding: 2rem;
  }
  @media only screen and (min-width: 768px) {
    main {
      margin-left: 300px;
    }
    
  }

  

  @media only screen and (orientation: landscape) and (min-width: 768px) {
    main {
    flex: 1 1 0;
    padding: 2rem;
    margin-left: 300px;

    @media (max-width: 768px) {
      padding: 6rem;
      min-height: 100vh;
    }
  }
  }

  @media only screen and (orientation: portrait) and (max-width: 768px) {
    main {
      min-height: calc(100vh - 60px);
      height: 100%;
      width: 100vw;
      padding-top: 10px;
      padding-left: 8px;
      margin-left: none;
      overflow: scroll;
    }
    
    .sidebar {
      width: 100vw;
      height: 60px;
      bottom: 0;
      left: 0;
      flex-direction: row;
    }
  }
}
</style>
