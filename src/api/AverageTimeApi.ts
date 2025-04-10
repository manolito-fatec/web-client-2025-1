import axios from 'axios';

//const BASE_URL_AVERAGE = 'http://localhost:8080/tasks';
const BASE_URL_PROD = 'http://191.232.189.186:8080/web-server/tasks';

export const fetchAverageTime = async (userId:number) => {
    try {
        const response = await axios.get(BASE_URL_PROD + '/average-time/' + userId);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
};