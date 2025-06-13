import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_TASKS = 'http://localhost:3439/logs';

export const fetchAuditLogs = async () => {
    try{
        const response = await api.get(BASE_URL_TASKS);
        return response.data;
    }  catch (error){
        throw error
    };
};
