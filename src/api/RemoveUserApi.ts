import {api} from './AxiosConfig';

const BASE_URL_USERS = '/user';


export const removeUserApi = async (userid: number) => {
    try{
        const response = await api.delete(BASE_URL_USERS + '?id=' + userid);
        return response.data;
    }  catch (error){
        throw error
    }
};
