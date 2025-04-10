import axios from 'axios';

//const BASE_URL_TASKS = 'http://localhost:8080/projects';
const BASE_URL_PROD = 'http://http://191.232.189.186:8080/web-server/projects';

export const fetchTotalOfProjects = async (userId:number) => {
    try{
        const response = await axios.get(BASE_URL_PROD + '/get-count/' + userId);
        return response.data;
    }  catch (error){
        throw error
    };
};
