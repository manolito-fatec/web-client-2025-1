import {api} from './AxiosConfig';
import type {User} from "@/types/User.ts";

const BASE_URL_AUTH = 'http://localhost:8080/auth';


export const signupUser = async (user: User): Promise<User> => {
    try{
        const response = await api.post(BASE_URL_AUTH + '/signup', user);
        return response.data;
    }  catch (error){
        throw error
    }
};
