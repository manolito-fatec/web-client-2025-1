<script setup lang="ts">
import UserProfile from '@/components/UserProfile.vue';



</script>

<template>
    <div class="profile">
        <h1>Profile</h1>
    </div>
    <section class="charts-grid-bottom">
        <UserProfile />
    </section>
</template>

<style lang="scss" scoped>
.profile {
    color: #FFFFFF;
    margin-left: 2rem;
}
</style>