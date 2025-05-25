import {api} from './AxiosConfig';
import type {ProjectDto, ProjectTable} from "@/types/ProjectTable.ts";
import type {UserDto} from "@/types/User.ts";

const BASE_URL_PROJECTS = 'http://localhost:8080/projects';
const BASE_URL_USERS = 'http://localhost:8080/users';


export const fetchPaginatedProjects = async (projectId: number): Promise<UserDto[]> => {
    try{
        const response = await api.get(BASE_URL_USERS + '/' + projectId);
        return response.data;
    }  catch (error){
        throw error
    }
}

export const fetchProjectsByTollId = async (tool: number): Promise<ProjectDto[]> => {
    try{
        const response = await api.get(BASE_URL_PROJECTS + '/' + tool);
        return response.data;
    } catch(error){
        throw error
    }
}
