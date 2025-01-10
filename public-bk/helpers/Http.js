export default class Http {
  #xmlRequest;

  constructor() {
    this.#xmlRequest = new XMLHttpRequest();
  }

  get(url) {
    let response = new Promise((resolve, reject) => {
      this.#xmlRequest.onload = () => {
        const done = this.#xmlRequest.readyState === XMLHttpRequest.DONE;
        const status = this.#xmlRequest.status;
        const success = done && (status >= 200 && status < 400); 
        const jsonResponse = this.#xmlRequest.responseText;
  
        if(success) {
          return resolve(jsonResponse);
        }

        reject(jsonResponse);
      }
    });

    this.#xmlRequest.open('GET', url, true);

    this.#xmlRequest.send();

    return response;
  }
}
