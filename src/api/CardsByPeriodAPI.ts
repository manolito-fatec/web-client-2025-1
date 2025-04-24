import axios from 'axios';
import { configHeader } from './AxiosConfig';

const BASE_URL_TASKS = 'http://localhost:8080/tasks/get-project-count-between';


export const fetchCardsByPeriod = async (projectOriginalId: number, startDate :string, endDate:string) => {
    try{
        const response = await axios.get(BASE_URL_TASKS + '/' + projectOriginalId + '/' + startDate + '/' + endDate, configHeader.value);
        return response.data;
    }  catch (error){
        throw error
    }
};
