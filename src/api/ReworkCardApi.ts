import {api} from './AxiosConfig';
import type {IssueChartT} from "@/types/IssuaChartT.ts";

const BASE_URL_ISSUES = '/issues/gestor/issue';
const BASE_URL_TASKS = '/tasks';


export const fetchReworkCards= async (projId:number, severity: string, priority:string): Promise<IssueChartT[]> => {
    try{
        const response = await api.get(BASE_URL_ISSUES + '/' + projId + '/' + severity+ '/' + priority);
        return response.data;
    }  catch (error){
        throw error
    }
};

export const fetchReworkCardsTotal = async (projId:number) => {
    try{
        const response = await api.get(BASE_URL_TASKS + '/' + projId + '/reworks');
        return response.data;
    }  catch (error){
        throw error
    }
}