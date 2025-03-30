import type { fetchGraphsBody } from '@/types/GraphsBodyT';
import axios from 'axios';

const BASE_URL_STATUS = 'http://localhost:8080/tasks/get-count-between';

export const fetchGraphsByTime = async (paramsJson: fetchGraphsBody) => {
    try{
        const response = await axios.get(BASE_URL_STATUS + '/' +  paramsJson.userIdRef + '/' + paramsJson.startDate + '/' + paramsJson.endDate);
        return response.data;
    }  catch (error){
        throw error
    };
};
