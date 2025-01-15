export default class Fetch {

  static get(url) {
    return Fetch.request('GET', url);
  }

  static post(url, payload) {
    return Fetch.request('POST', url, payload);
  }

  static put(url, payload) {
    return Fetch.request('PUT', url, payload);
  }

  static delete(url) {
    return Fetch.request('DELETE', url);
  }

  static request(method = 'GET', url = '', payload = {}) {
    let request;
    const hasNoContentType = (method === 'GET' || method === 'DELETE');

    if(hasNoContentType) {
      request = url;
    }

    if(!hasNoContentType) {
      request = new Request(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
    }

    return new Promise((resolve, reject) => {
      fetch(url).then(response => {
        resolve(response.text());
      }).catch(error => {
        reject(error);
      })
    });
  }
}
