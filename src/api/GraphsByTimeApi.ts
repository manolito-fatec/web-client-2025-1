import type { fetchGraphsBody } from '@/types/GraphsBodyT';
import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_STATUS = '/tasks/get-count-between';

export const fetchGraphsByTime = async (paramsJson: fetchGraphsBody) => {
    try{
        const response = await api.get(BASE_URL_STATUS + '/' +  paramsJson.userIdRef + '/' + paramsJson.startDate + '/' + paramsJson.endDate);
        return response.data;
    }  catch (error){
        throw error
    };
};
