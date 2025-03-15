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
    background-color: #01081F;
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    color: white;
    width: 280px;
    height: 120px;
    font-weight: normal;
    font-family: inter;
}

h3 {
    font-size: 15px;
    font-weight: normal;
    color: #3D7EFF;
    margin: 2px;
    margin-top: -6px;
    text-align: center;
}

p {
    font-size: 40px;
    margin: 0px;
    color: #FFFFFF;
}

h2 {
    font-size: 15px;
    font-weight: normal;
    margin-top: 0%;
    color: #FFFFFF;
}
</style>
