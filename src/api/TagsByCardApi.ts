import axios from 'axios';
import { configHeader } from './AxiosConfig';

const BASE_URL_STATUS = 'http://localhost:8080/tasks/get-by-tag';


export const fetchTagsbyCard = async (projectOriginalId: number) => {
    try{
        const response = await axios.get(BASE_URL_STATUS + '/' + projectOriginalId, configHeader.value);
        return response.data;
    }  catch (error){
        throw error
    };
};
