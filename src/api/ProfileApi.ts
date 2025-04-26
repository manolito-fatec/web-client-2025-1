import axios from 'axios';
import type {UserProfile} from "@/types/UserProfile.ts";
import {configHeader} from "@/api/AxiosConfig.ts";

const BASE_URL_USER = 'http://localhost:8080/user';

export const fetchUserProfile = async (userId:number): Promise<UserProfile> => {
    try{
        const response = await axios.get(BASE_URL_USER + '/id/' + userId, configHeader.value);
        return response.data;
    }  catch (error){
        console.log(error);
        throw error;
    };
};