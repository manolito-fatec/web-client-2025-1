import {api} from "@/api/AxiosConfig.ts";

const BASE_URL_CARDS = 'http://web0:8080/tasks';

export const fetchTotalOfCards = async (userId: number) => {
  try {
    const response = await api.get(`${BASE_URL_CARDS}/get-count/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar total de cartões:', error);
    throw error;
  }
};
