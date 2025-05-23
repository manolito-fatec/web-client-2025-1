import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_AVERAGE = 'http://localhost:8080/tasks';

/**
 * Gets the average time an operator takes to finish cards.
 *
 * @param userId - The ID of the operator.
 * @returns The average time data or undefined if there is an error.
 */
export const fetchAverageTimeOperator = async (userId:number) => {
    try {
        const response = await api.get(BASE_URL_AVERAGE + '/average-time/' + userId);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
};

/**
 * Fetches the average time to complete cards for a given project.
 *
 * @param projectId - The ID of the project.
 * @returns The average time data or undefined if an error occurs.
 */
export const fetchAverageTimeManager = async (projectId:number) => {
    try {
        const response = await api.get(BASE_URL_AVERAGE + '/average-time-by-project/' + projectId);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
};