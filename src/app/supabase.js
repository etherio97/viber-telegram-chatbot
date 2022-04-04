import axios from 'axios';
import { env } from 'process';

const { SUPABASE_URL, SUPABASE_KEY } = env;

class Supabase {
    get(path, params = {}) {
        return this.requestApi('GET', this.buildUrl(path, params));
    }

    push(path, data) {
        return this.requestApi('POST', this.buildUrl(path), data);
    }

    put(path, data) {
        return this.requestApi('PUT', this.buildUrl(path), data);
    }

    update(path, data) {
        return this.requestApi('PATCH', this.buildUrl(path), data);
    }

    remove(path) {
        return this.requestApi('DELETE', this.buildUrl(path));
    }

    buildUrl(path, params = {}) {
        let url = new URL(SUPABASE_URL);

        for (let key in params) {
            url.searchParams.append(key, params[key]);
        }

        url.pathname = path;

        return url;
    }

    requestApi(method, url, data = null) {
        console.log('request', url.toString());
        return axios({
            method,
            url: url.toString(),
            data,
            headers: {
                apiKey: SUPABASE_KEY,
                Authorization: 'Bearer ' + SUPABASE_KEY
            }
        }).then(({ data }) => data).catch(() => []);
    }
}

export default new Supabase();