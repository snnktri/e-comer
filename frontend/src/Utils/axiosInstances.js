import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8040/api/v1",
    timeout: 50000,
})

export { api };