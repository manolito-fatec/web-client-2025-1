import {api} from './AxiosConfig';
import type {User} from "@/types/User.ts";

const BASE_URL_USERS = 'http://web0:8080/user';


export const editUserApi = async (user: User): Promise<User> => {
    try{
        const response = await api.post(BASE_URL_USERS, user);
        return response.data;
    }  catch (error){
        throw error
    }
};
