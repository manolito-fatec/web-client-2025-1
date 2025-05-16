import {api} from './AxiosConfig';
import type {User} from "@/types/User.ts";
import type {UserPag} from "@/types/PagUser.ts";

const BASE_URL_USERS = 'http://localhost:8080/user';
const BASE_URL_USERS_PAG = 'http://localhost:8080/users/paginated';


export const fetchAllUsers = async (): Promise<User[]> => {
    try{
        const response = await api.get(BASE_URL_USERS + '/' + 'all');
        return response.data;
    }  catch (error){
        throw error
    }
};

export const fetchPaginatedUsers = async (): Promise<UserPag[]> => {
    try{
        const response = await api.get(BASE_URL_USERS_PAG , {
            data: {
                page : 1,
                size : 1000
            }
        });
        return response.data.content;
    }  catch (error){
        throw error
    }
}
