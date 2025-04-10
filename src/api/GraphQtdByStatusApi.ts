import axios from 'axios';

//const BASE_URL_STATUS = 'http://localhost:8080/status';
const BASE_URL_PROD = 'http://191.232.189.186:8080/web-server/status';

export const fetchTaskStatus = async (userId: number, projectOriginalId: number) => {
    try{
        const response = await axios.get(BASE_URL_PROD + '/' + userId + '/' + projectOriginalId);
        return response.data;
    }  catch (error){
        throw error
    };
};
