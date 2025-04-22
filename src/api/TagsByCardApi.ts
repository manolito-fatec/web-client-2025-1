import axios from 'axios';
import { configHeader } from './AxiosConfig';

const BASE_URL_STATUS = 'http://localhost:8080/status';


export const fetchTagsbyCard = async (userId: number, projectOriginalId: number) => {
    try{
        const response = await axios.get(BASE_URL_STATUS + '/' + userId + '/' + projectOriginalId, configHeader.value);
        return response.data;
    }  catch (error){
        throw error
    };
};
