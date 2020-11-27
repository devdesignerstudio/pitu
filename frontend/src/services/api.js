import axios from 'axios'; //biblioteca para fazer chamadas HTTP

const baseAPI = (baseURL) => {
    const api = axios.create({
        baseURL,
    });

    return api;
}

export default baseAPI;