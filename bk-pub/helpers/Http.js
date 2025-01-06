let xmlRequest = new XMLHttpRequest();

xmlRequest.addEventListener('load', (event) => {
  console.log(request.response);
})

request.open('GET', '/userstest');
request.send();

function onLoad() {
    
}

function get(url) {
    let promise = new Promise((resolve, reject) => {
      xmlRequest.onload = () => {
        const done = xmlRequest.readyState === XMLHttpRequest.DONE;
        const status = xmlRequest.status;
        const success = done && (status >= 200 && status < 400); 
  
        if(success) {
          return resolve('{test: "foi"}');
        }

        reject('{error: "error"}');
      }
    });

    xmlRequest.open('GET', url, true);

    xmlRequest.send();
}


module.exports {

}