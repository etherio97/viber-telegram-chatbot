import axios from 'axios';

const BASE_URL = 'https://www.metaweather.com';

class Weather {
  searchLocation(query) {
    return this._sendApi('GET', '/api/search', { query });
  }

  getLocation(geoid) {
    return this._sendApi('GET', '/api/location/' + geoid);
  }
  
  getLocationDay(geoid, date = []) {
    return this._sendApi('GET', '/api/location/' + geoid + '/' + date.join('/'));
  }
  
  _sendApi(method, path, params = {}, data = undefined, headers = {}) {
    return axios({
      headers,
      method,
      url: [BASE_URL, path, '?', new URLSearchParams(params).toString()].join(''),
      data,
    }).then(({ data }) => data);
  }
}

export default new Weather();
