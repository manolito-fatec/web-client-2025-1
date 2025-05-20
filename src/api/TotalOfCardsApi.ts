import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_TASKS = 'http://web0:8080/tasks';

export const fetchTotalOfCards = async (userId:number) => {
    try{
        const response = await api.get(BASE_URL_TASKS + '/get-count/' + userId);
        return response.data;
    }  catch (error){
        throw error
    };
};
