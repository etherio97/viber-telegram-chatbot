import axios from 'axios';
import { env } from 'process';

const { DATABASE_URL, DATABASE_SECRET } = env;

class Database {
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
    let url = new URL(DATABASE_URL);

    for (let key in params) {
      url.searchParams.append(key, params[key]);
    }

    url.pathname = path;

    return url;
  }

  requestApi(method, url, data = null) {
    url.pathname += '.json';
    url.searchParams.append('auth', DATABASE_SECRET);

    return axios({
      method,
      url: url.toString(),
      data,
    }).then(({ data }) => data);
  }
}

export const db = new Database();
