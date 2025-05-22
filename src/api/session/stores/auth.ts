import { defineStore } from 'pinia';
import axios from 'axios';
import { setSessionItem } from "../SessionManagement.ts";
import { fetchUserProfile } from "@/api/ProfileApi.ts";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: sessionStorage.getItem("token") || null,
        userId: sessionStorage.getItem("userId") || null,
        configHeader: {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        }
    }),
    actions: {
        async loginAndStore(email: string, psw: string) {
            try {
                const response = await axios.post("http://dashflow_server:8080/auth/login", {
                    email: email,
                    password: psw
                });


                this.token = response.data.token;
                setSessionItem("token", this.token!);

                const userProfile = await fetchUserProfile(1);
                this.userId = userProfile.id.toString();
                setSessionItem("userId", this.userId);

                this.configHeader.headers.Authorization = `Bearer ${this.token}`;

                console.log("Login successful");
                return true;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 403) {
                    console.error("Access forbidden - invalid credentials");
                    return false;
                }
                console.error("Login failed:", error);
                throw error;
            }
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getConfigHeader: (state) => state.configHeader
    }
});