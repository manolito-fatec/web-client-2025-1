<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <div class="cards-container">
            <AvaregeTimeCard :valor="averageTime" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AvaregeTimeCard from '@/components/AverageTimeCard.vue';

const averageTime = ref(0);
</script>

<style lang="scss" scoped>
.dashboard {
    background-color: var(--color-secondary);
    color: white;
    text-align: center;
    padding: 20px;
}

/* Estilo para desktop */
.cards-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;
}

@media (max-width: 768px) {
    .dashboard {
        padding: 0px;
    }

    .cards-container {
        flex-direction: column;
        align-items: center;
        gap: 10px; 
        width: 100%;
    }

    .cards-container > * {
        width: 90%;
        max-width: 400px;
    }
}
</style>
