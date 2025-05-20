import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_EXPORT = 'http://web0:8080/export';

export const getExportAdmin = async () => {
    try{
        const response = await api.get(BASE_URL_EXPORT + '/admin/csv');
        return response;
    }  catch (error){
        throw error
    };
};

export const getExportManager = async () => {
    try{
        const response = await api.get(BASE_URL_EXPORT + '/manager/csv');
        return response;
    }  catch (error){
        throw error
    };
};