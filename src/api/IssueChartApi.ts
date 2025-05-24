import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_ISSUE = 'http://localhost:8080/issues/gestor/filtered';

export const fetchIssuesDetailed = async (projectId : number, severity :string , priority: string) => {
    try{
        const response = await api.get(BASE_URL_ISSUE + '/' + projectId + '/' + severity + '/' + priority);
        return response.data;
    }  catch (error){
        throw error
    };
};
