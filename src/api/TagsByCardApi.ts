import axios from 'axios';
import { configHeader } from './AxiosConfig';

const BASE_URL_STATUS = 'http://localhost:8080/tasks/get-by-tag';

/**
 * Fetches tags associated with a project by its project original ID.
 * @property {number} projectOriginalId - The original ID of the project to fetch tags for.
 * @returns {Promise<any>} A promise that resolves with the response data containing the tags.
 * @throws {Error} If the request fails, the error is logged and re-thrown.
 */
export const fetchTagsbyCard = async (projectOriginalId: number) => {
    try{
        const response = await axios.get(BASE_URL_STATUS + '/' + projectOriginalId, configHeader.value);
        return response.data;
    }  catch (error){
        console.log('Erro ao realizar a requisição: ' + error);
        throw error
    }
};
