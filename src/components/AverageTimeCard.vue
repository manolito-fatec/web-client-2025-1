<script lang="ts" setup>

import { fetchAverageTimeManager } from '@/api/AverageTimeApi';
import { ref, type Ref } from 'vue';
import { onMounted } from 'vue';
import { errorMessages } from 'vue/compiler-sfc';

const userIdRef:Ref<number> = ref<number>(0); 

const props = defineProps<{
    userIdProp: number
}>();

const averageTimeDay:Ref<String> = ref<String>("");

onMounted(() => {
    userIdRef.value = props.userIdProp;
    try {
        fetchAverageTimeManager(userIdRef.value).then((response:Number) => {
            averageTimeDay.value = String(response);
    });
    } catch (error) {
        console.error('Error fetching average time:', error);
        averageTimeDay.value = String(error);
    }
});

</script>

<template>
    <div class="average-time-card">
        <h1>Average Completion Time of Cards</h1>
        <div>
            <p>{{ averageTimeDay }}</p>
            <h2>Cards/Week</h2>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.average-time-card {
    background-color: #01081F;
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    color: white;
    width: 100%;
    height: 80%;

h1 {
    margin-top: 0%;
    margin-bottom: 0%;
    font-size: 50%;
    font-weight: bolder;
    color: #3D7EFF;
  }

  font-size: 2.5rem;
  color: #fff;

h2 {
    font-size: 50%;
    font-weight: normal;
    color: #FFFFFF;
    margin: 0px;
    text-align: center;
}
h3 {
    font-size: 100%;
    font-weight: normal;
    color: #3D7EFF;
    margin: 2px;
    margin-top: -6px;
    text-align: center;
}
p {
    font-size: 1.5rem;
    margin: 0px;
    color: #FFFFFF;
}

    @media (max-width: 1366px) and (orientation: landscape) {
        height: 100%;
        h1 {
            margin-top: 0%;
            margin-bottom: 0%;
            font-size: 50%;
            font-weight: bolder;
            color: #3D7EFF;
        }

        font-size: 1.5rem;
        color: #fff;

        h2 {
            font-size: 50%;
            font-weight: normal;
            color: #FFFFFF;
            margin: 0px;
            text-align: center;
        }
        h3 {
            font-size: 100%;
            font-weight: normal;
            color: #3D7EFF;
            margin: 2px;
            margin-top: -6px;
            text-align: center;
        }
        p {
            font-size: 1.5rem;
            margin: 0px;
            color: #FFFFFF;
        }
    }
    @media only screen and (orientation: portrait) and (max-width: 768px) {
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
    text-align: start;
    height: 5rem;
    border-radius: 8px;

    h1 {
      font-size: 0.9rem;
      margin-left: 10px;
    }

    h3 {
    font-size: 0.9rem;
    font-weight: bold;
    color: #3D7EFF;
    margin-top: 0px;
    text-align: start;
    margin-left: 10px;
    
    }

    p {
        font-size: 0.9rem;
        margin-left: 20px;
        color: #FFFFFF;
        padding-top: 0.2rem;
    }

    h2 {
        font-size: 0.9rem;
        font-weight: normal;
        margin-top: 10px;
        margin-left: -350px;;
        margin-bottom: 0px;

        color: #FFFFFF;
    }
        span {
        font-size: 1rem;
        margin-left: 20px;
        }
    }
}



</style>
