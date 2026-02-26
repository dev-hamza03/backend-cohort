import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
});

export async function register(username, email, password) {
    try {
        const respone = await api.post("/register", {
            username,
            email,
            password
        })

        return respone.data

    }
    catch (error) {
        throw error
    }
};

export async function login(username, password) {
    try {
        let respone = await api.post("/login", {
            username, password
        },)

        return respone.data
    }
    catch (error) {
        throw error
    }
};

export async function getMe() {
    try {
        const respone = await api.get("/get-me")

        return respone.data
    }
     catch (error) {
        throw error
    }
}