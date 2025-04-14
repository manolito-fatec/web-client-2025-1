import axios from 'axios';

const BASE_URL_STATUS = 'http://localhost:8080/web-server/status';
//const BASE_URL_STATUS_LOCAL = 'http://localhost:8080/status';

export const fetchTaskStatus = async (userId: number, projectOriginalId: number) => {
    try{
        const response = await axios.get(BASE_URL_STATUS + '/' + userId + '/' + projectOriginalId);
        return response.data;
    }  catch (error){
        throw error
    };
};
