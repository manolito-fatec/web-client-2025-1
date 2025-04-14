import axios from 'axios';

const BASE_URL_AVERAGE = 'http://localhost:8080/web-server/tasks';
//const BASE_URL_AVERAGE_LOCAL = 'http://localhost:8080/tasks';

export const fetchAverageTime = async (userId:number) => {
    try {
        const response = await axios.get(BASE_URL_AVERAGE + '/average-time/' + userId);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
};