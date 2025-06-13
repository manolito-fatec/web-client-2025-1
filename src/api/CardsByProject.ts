import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_TASKS = 'http://localhost:3439/tasks';

export const fetchCardsByProject = async () => {
    try{
        const response = await api.get(BASE_URL_TASKS + '/group-by-projects');
        return response.data;
    }  catch (error){
        throw error
    };
};
