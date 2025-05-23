import {api} from './AxiosConfig';
import type {ProjectDto, ProjectTable} from "@/types/ProjectTable.ts";

const BASE_URL_PROJECTS = 'http://localhost:8080/projects/paginated';


export const fetchPaginatedProjects = async (): Promise<ProjectTable[]> => {
    try{
        const response = await api.get(BASE_URL_PROJECTS , {
            data: {
                page : 1,
                size : 100
            }
        });
        return response.data.content;
    }  catch (error){
        throw error
    }
}

export const fetchProjectsByTollId = async (tool: number): Promise<ProjectDto[]> => {
    try{
        const response = await api.get(BASE_URL_PROJECTS + '/' + tool);
        return response.data.content;
    } catch(error){
        throw error
    }
}
