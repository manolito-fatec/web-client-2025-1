import {api} from './AxiosConfig';
import type {cardsByPeriodResponse} from "@/types/CardsByPeriodResponse.ts";

const BASE_URL_TASKS = '/tasks/get-project-count-between';


export const fetchCardsByPeriod = async (projectOriginalId: number, startDate :string, endDate:string): Promise<cardsByPeriodResponse> => {
    try{
        const response = await api.get(BASE_URL_TASKS + '/' + projectOriginalId + '/' + startDate + '/' + endDate);
        return response.data;
    }  catch (error){
        throw error
    }
};
