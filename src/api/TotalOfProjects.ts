import axios from 'axios';

const BASE_URL_TASKS = 'http://localhost:8080/web-server/projects';
//const BASE_URL_TASKS_LOCAL = 'http://localhost:8080/projects';

export const fetchTotalOfProjects = async (userId:number) => {
    try{
        const response = await axios.get(BASE_URL_TASKS + '/get-count/' + userId);
        return response.data;
    }  catch (error){
        throw error
    };
};
