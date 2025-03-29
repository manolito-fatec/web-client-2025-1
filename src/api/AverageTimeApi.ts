import axios from 'axios';

const BASE_URL_AVERAGE = 'http://localhost:8080/average-time';

export const fetchAverageTime = async (userId:number) => {
    try {
        const response = await axios.get(BASE_URL_AVERAGE + '/get-average/' + userId);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
};