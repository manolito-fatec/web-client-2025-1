import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_STATUS = 'http://web0:8080/status';

export const fetchStatusCard = async (projectOriginalId: number) => {
    try{
        const response = await api.get(BASE_URL_STATUS + '/' + projectOriginalId);
        return response.data;
    }  catch (error){
        throw error
    };
};
