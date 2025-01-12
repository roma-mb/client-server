export default class Http {

  static get(url) {
    return Http.request('GET', url);
  }

  static post(url, payload) {
    return Http.request('POST', url, payload);
  }

  static put(url, payload) {
    return Http.request('PUT', url, payload);
  }

  static request(method = 'GET', url = '', payload = {}) {
    let request = new XMLHttpRequest();

    let response = new Promise((resolve, reject) => {
      request.onload = () => {
        const done = request.readyState === XMLHttpRequest.DONE;
        const status = request.status;
        const success = done && (status >= 200 && status < 400); 
        const jsonResponse = request.responseText;
  
        if(success) {
          return resolve(jsonResponse);
        }

        reject(jsonResponse);
      }
    });

    request.open(method.toUpperCase(), url, true);

    if(method === 'POST' || method === 'PUT') {
      request.setRequestHeader('Content-Type', 'application/json');
    }

    request.send(payload);

    return response;
  }
}
