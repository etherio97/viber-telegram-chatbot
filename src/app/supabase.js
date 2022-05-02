import axios from 'axios';
import { env } from 'process';

const requestApi = (method, path, params = {}, data = undefined, headers = {}) => axios({
  method,
  data,
  url: [env.SUPABASE_URL, path, '?', new URLSearchParams(params).toString()].join(''),
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: 'Bearer ' + env.SUPABASE_KEY,
    ...headers,
  },
})
.then(({ data }) => data);

class Supabase {
  rpc(name, data) {
    return this.post('/rest/v1/rpc/' + name, {}, data);
  }
  
  find(name, params = {}, data) {
    return this.post('/rest/v1/' + name, params, data);
  }

  get(path, params = {}) {
    return requestApi('GET', path, params);
  }

  post(path, params = {}, data) {
    return requestApi('POST', path, params, data);
  }

  put(path, params = {}, data) {
    return requestApi('PUT', path, params, data);
  }

  patch(path, params = {}, data) {
    return requestApi('PATCH', path, params, data);
  }

  delete(path, params = {}) {
    return requestApi('DELETE', path, params);
  }
}

export default new Supabase();
