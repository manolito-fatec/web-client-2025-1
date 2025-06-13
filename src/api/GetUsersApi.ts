import {api} from './AxiosConfig';
import type {UserPag} from "@/types/PagUser.ts";

const BASE_URL_USERS_PAG = '/users/paginated';


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
