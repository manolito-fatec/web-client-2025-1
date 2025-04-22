import { ref } from "vue";
import axios from "axios";

export const configHeader =ref<object>( {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
});

//Mocked login function to set the token in session storage.
export const mockedLogin = async () => {
    const loginResponse = await axios.post("http://localhost:8080/auth/login", {
        "email":"admin@admin.com",
        "password":"admin"
    })
    const token = loginResponse.data.token;
    sessionStorage.setItem("token", token);
}
