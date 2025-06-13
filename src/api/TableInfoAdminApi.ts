import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_STATUS = 'http://localhost:3439/admin/dash/table';

export const  fetchProjectTable = async () => {
    try{
        const response = await api.get(BASE_URL_STATUS);
        return response.data;
    }  catch (error){
        throw error
    };
};
