import axios from "axios";

const api = axios.create({
    baseURL: "/spring-api",
});

export default api;
