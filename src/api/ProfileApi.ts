import type {UserProfile} from "@/types/UserProfile.ts";
import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_USER = 'http://localhost:8080/user';

export const fetchUserProfile = async (userId:number): Promise<UserProfile> => {
    try{
        const response = await api.get(BASE_URL_USER + '/id/' + userId);
        return response.data;
    }  catch (error){
        console.log(error);
        throw error;
    };
};