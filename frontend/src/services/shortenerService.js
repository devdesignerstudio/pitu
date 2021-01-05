import baseAPI from './api';

class shortenerService {
    constructor(){
        this.api = baseAPI(process.env.REACT_APP_API)
    }

    async getLink(code){
        const result = await this.api.get(`links/${code}`);

        return result.data;
    }

    async getStats(code){
        const result = await this.api.get(`links/${code}/stats`);

        return result.data;
    }

    async generate(modelUrl){
        const result = await this.api.post('links',modelUrl)

        return result.data;
    }
}

export default shortenerService;