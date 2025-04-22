<script setup lang="ts">
import { ref } from 'vue';
import Chart from 'primevue/chart';

// Mock Data
const chartData = ref({
    labels: ['Period'],
    datasets: [
        {
            label: 'Created',
            backgroundColor: '#4BC0C0',
            borderColor: '#4BC0C0',
            data: [18],
        },
        {
            label: 'Done',
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            data: [11],
        },
    ],
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
        x: {
            ticks: {
                color: '#e0e0e0',
                stepSize: 5,
            },
            grid: {
                color: '#3a3a5e',
            },
            max: 20,
        },
        y: {
            ticks: {
                color: '#e0e0e0',
            },
            grid: {
                color: '#3a3a5e',
            },
        },
    },
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#FFFFFF',
                usePointStyle: true,
            },
        },
        datalabels: {
            anchor: 'end', 
            align: 'start',
            color: '#fff',
            font: {
                weight: 'bold',
            },
            formatter: (value: number) => value.toString(),
            offset: -20,
        },
    },
});

const startDate = ref('');
const endDate = ref('');

</script>

<template>
    <div class="chart-card">
        <h3>Cards created and completed by period</h3>
        <div class="filters">
            <div class="filter">
                <label for="start-date">Start:</label>
                <input id="start-date" type="date" v-model="startDate" :max="endDate || null" />
            </div>

            <div class="filter">
                <label for="end-date">End:</label>
                <input id="end-date" type="date" v-model="endDate" :min="startDate || null" />
            </div>
        </div>
        <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>
.chart-card {
    background-color: #01081F;
    padding: 20px;
    border-radius: 8px;
    color: #3D7EFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.chart-card h3 {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
}

.filters {
    display: flex;
    justify-content: space-around;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.filter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;
    font-size: 0.9em;
}

input[type="date"] {
    background-color: #0A1237;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
}
</style>