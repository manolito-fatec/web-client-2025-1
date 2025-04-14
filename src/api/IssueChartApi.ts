import axios from 'axios';
import { SeverityEnum } from '../enums/SeverityEnum';
import { PriorityEnum } from '../enums/PriorityEnum';

const BASE_URL_ISSUE = 'http://localhost:8080/gestor/issue';

export const fetchIssuesDetailed = async (projectId : number, severity :SeverityEnum , priority: PriorityEnum) => {
    try{
        const response = await axios.get(BASE_URL_ISSUE + '/' + projectId + '/' + severity + '/' + priority);
        return response.data;
    }  catch (error){
        throw error
    };
};
