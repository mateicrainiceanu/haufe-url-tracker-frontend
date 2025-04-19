import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {

        if (!config.headers) {
            config.headers = {};
        }
        if (!config.headers.authorization) {
            config.headers.authorization = "";
        }
        if (!localStorage.getItem("token")) {
            return config;
        }

        config.headers!.authorization = `Bearer ${localStorage.getItem("token")}`;
        return config
    });

export default api;