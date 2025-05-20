import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_AVERAGE = 'http://web0:8080/tasks';

export const fetchAverageTime = async (userId:number) => {
    try {
        const response = await api.get(BASE_URL_AVERAGE + '/average-time/' + userId);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
};