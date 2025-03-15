<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AvaregeTimeCard from '@/components/AverageTimeCard.vue';
import axios from 'axios';

const averageTime = ref(0);

// const fetchAverageTime = async () => {
//     try {
//         const response = await axios.get('/api/average-time'); // alterar URL
//         averageTime.value = response.data.averageTimeDay; // Ajustar de acordo com a resposta da API
//     } catch (error) {
//         console.error("Erro ao buscar a média", error);
//     }
// };

// onMounted(fetchAverageTime);

</script>

<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <div class="cards-container">
            <AvaregeTimeCard :valor="averageTime" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dashboard {
    background-color: var(--color-secondary);
    color: white;
    text-align: center;
    padding: 20px;
}

.cards-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;
}
</style>