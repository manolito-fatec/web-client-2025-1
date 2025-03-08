<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const goRoute = () => {
  router.push('/')
}
</script>

<template>
  <nav class="sidebar">
    <Button label="Home" severity="secondary" raised @click="goRoute"></Button>
  </nav>
</template>
