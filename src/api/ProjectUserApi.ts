
import {api} from "@/api/AxiosConfig.ts";
import type { ProjectUser } from "@/types/ProjectUser";

const BASE_URL_USER = 'http://localhost:3439/users';

/**
 * Fetches a list of users and their associated projects managed by a specific user.
 *
 * @param userId - The ID of the manager.
 * @returns A promise resolving to an array of ProjectUser objects.
 * @throws Error if the request fails.
 */
export const fetchProjectUser = async (userId:number): Promise<Array<ProjectUser>> => {
    try{
        const response = await api.get(BASE_URL_USER + '/get-by-manager/' + userId);
        return response.data;
    }  catch (error){
        console.log(error);
        throw error;
    };
};