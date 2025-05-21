import {api} from './AxiosConfig';
import type {User} from "@/types/User.ts";

export const editUserApi = async (user: User): Promise<User> => {
    try{
        const response = await api.post('/user', user);
        return response.data;
    }  catch (error){
        throw error
    }
};
