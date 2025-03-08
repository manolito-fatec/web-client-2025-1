<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="sidebar">
    <Sidebar />
  </div>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
/* Layout principal */
.layout {
  display: flex;
  height: 100vh;
}


.button {
  border: 1rem;
  border-color: rgb(206, 134, 0);
}

/* Conteúdo principal */
.content {
  margin-left: 5rem; /* Adjust margin-left to match the sidebar width */
  padding: 1rem;
  flex: 1; /* Allow the content to grow and fill the remaining space */
  box-sizing: border-box; /* Include padding in the element's total width and height */
  overflow: auto; /* Add overflow to handle content overflow */
}

header {
  text-align: left;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
