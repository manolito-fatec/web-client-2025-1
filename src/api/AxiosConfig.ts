import { ref } from "vue";
import axios from "axios";
import {useAuthStore} from "@/api/session/stores/auth.ts";

export const configHeader =ref<object>( {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
});

export const api = axios.create({
    baseURL: "http://localhost:3439/",
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${useAuthStore().token}`;
    return config;
})