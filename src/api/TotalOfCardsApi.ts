import axios from 'axios';

const BASE_URL_TASKS = 'http://localhost:8080/web-server/tasks';
//const BASE_URL_TASKS_LOCAL = 'http://localhost:8080/tasks';

export const fetchTotalOfCards = async (userId:number) => {
    try{
        const response = await axios.get(BASE_URL_TASKS + '/get-count/' + userId);
        return response.data;
    }  catch (error){
        throw error
    };
};
