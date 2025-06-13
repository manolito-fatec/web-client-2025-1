import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_TASKS = 'http://localhost:3439/projects';

export const fetchTotalOfProjectsAdmin = async () => {
    try{
        const response = await api.get(BASE_URL_TASKS + '/get-count');
        return response.data;
    }  catch (error){
        throw error
    };
};
