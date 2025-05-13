import {api} from './AxiosConfig';
import type {User} from "@/types/User.ts";

const BASE_URL_USERS = 'http://localhost:8080/user';


export const fetchAllUsers = async (): Promise<User[]> => {
    try{
        const response = await api.get(BASE_URL_USERS + '/' + 'all');
        return response.data;
    }  catch (error){
        throw error
    }
};
