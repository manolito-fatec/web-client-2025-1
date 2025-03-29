<script lang="ts" setup>
import { fetchAverageTime } from '../api/AverageTimeApi';
import { ref, type Ref } from 'vue';
import { onMounted } from 'vue';

const userIdRef:Ref<number> = ref<number>(0); 

const props = defineProps<{
    userIdProp: number
}>();

const averageTimeDay:Ref<number> = ref<number>(0);

onMounted(() => {
    userIdRef.value = props.userIdProp;
    try {
        fetchAverageTime(userIdRef.value).then((response) => {
            averageTimeDay.value = response;
        });
    } catch (error) {
        console.error('Error fetching average time:', error);
    }
});

</script>

<template>
    <div class="average-time-card">
        <h3>Average Completion Time of Finished Cards</h3>
        <div>
            <p>{{ averageTimeDay }}</p>
        </div>
        <h2>Cards/Week</h2>
    </div>
</template>

<style lang="scss" scoped>
.average-time-card {
    background-color: #01081F;
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    color: white;
    width: 280px;
    height: 120px;
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
