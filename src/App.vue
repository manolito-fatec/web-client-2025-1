<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '../src/components/SideBar.vue'
import { ref, onBeforeMount, watch } from "vue";
import { useRouter } from 'vue-router'
import { fetchUserProfile } from "@/api/ProfileApi.ts";
import { setSessionItem } from "@/api/session/SessionManagement.ts";

const router = useRouter()
const showSidebar = ref(false)

const checkRoute = () => {
  showSidebar.value = !['/', '/login'].includes(router.currentRoute.value.path)
}


watch(() => router.currentRoute.value.path, checkRoute)

onBeforeMount(() => {
  checkRoute()
  fetchUserProfile(1).then((responseUsr) => {
    setSessionItem("userId", responseUsr.id.toString())
    console.log(sessionStorage.getItem("userId"))
  })
})
</script>

<template>
  <div class="app">
    <Sidebar v-if="showSidebar" class="sidebar"/>
    <main :class="{ 'with-sidebar': showSidebar }">
      <RouterView/>
    </main>
  </div>
</template>

<style lang="scss" scoped>
:root {
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

  main {
    flex: 1 1 0;
    padding: 2rem;
    width: 100%;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &.with-sidebar {
      margin-left: 300px;
    }
  }

  @media only screen and (max-width: 768px) {
    main {
      padding: 1rem;

      &.with-sidebar {
        margin-left: 0;
        padding-bottom: 80px;
      }
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