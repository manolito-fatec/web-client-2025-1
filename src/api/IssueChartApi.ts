import { SeverityEnum } from '../enums/SeverityEnum';
import { PriorityEnum } from '../enums/PriorityEnum';
import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_ISSUE = 'http://localhost:8080/gestor/issue';

export const fetchIssuesDetailed = async (projectId : number, severity :SeverityEnum , priority: PriorityEnum) => {
    try{
        const response = await api.get(BASE_URL_ISSUE + '/' + projectId + '/' + severity + '/' + priority);
        return response.data;
    }  catch (error){
        throw error
    };
};
