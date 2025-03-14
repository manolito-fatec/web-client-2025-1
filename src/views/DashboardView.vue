<script setup lang="ts">
import TotalOfCards from '@/components/TotalOfCards.vue'

</script>

<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
    </div>
    <TotalOfCards />
</template>

<style lang="scss" scoped>
.dashboard{
    background-color: var(--color-secondary);
    h1{
        color: #fff;
    }
}
</style>