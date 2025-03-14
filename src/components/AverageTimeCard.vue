<script>
import axios from 'axios';

export default {
    data() {
        return {
            avaregeTimeDay: 0,
        };
    },

    mounted() {
        this.fetchAverageTime();
    },

    // methods: {
    //     async fetchAverageTime() {
    //         try {
    //             const response = await axios.get('/api/average-time'); // alterar URL
    //             this.avaregeTimeDay = response.data.averageTimeDay; // Ajustar de acordo com a resposta da API
    //         } catch (error) {
    //             console.error("Erro ao buscar dados", error);
    //         }
    //     }
    // },
}
</script>

<template>
    <div class="avarege-time-card">
        <h3>Average Completion Time of Finished Cards</h3>
        <div>
            <p>{{ avaregeTimeDay }}</p>
        </div>
        <h2>Cards/Week</h2>
    </div>
</template>

<style lang="scss" scoped>
.avarege-time-card {
    background-color: #0a0f2b;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    color: white;
    width: 250px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

h3 {
    font-size: 0.9rem;
    color: #4a90e2;
    margin-bottom: 5px;
}

p {
    font-size: 2rem;
    font-weight: bold;
}

h2 {
    font-size: 0.9rem;
    color: gray;
}
</style>
