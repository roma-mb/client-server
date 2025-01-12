let restify = require('restify-clients');
let assert = require('assert');
let express = require('express');
let router = express.Router();

let client = restify.createJsonClient({
  url: 'http://localhost:4000'
});

/* GET users listing. */
router.get('/', (request, response, next) => {
  client.get('/users', (error, clientRequest, clientResponse, object) => {
    assert.ifError(error);

    response.json(object);
  });
});

router.post('/', (request, response, next) => {
  client.post('/users', request.body, (error, clientRequest, clientResponse, object) => {
    assert.ifError(error);

    response.json(object);
  });
});

router.put('/:id', (request, response, next) => {
  client.put(`/user/${request.params.id}`, request.body, (error, clientRequest, clientResponse, object) => {
    assert.ifError(error);
    
    response.json(object);
  });
});

router.delete('/:id', (request, response, next) => {
  client.delete(`/user/${request.params.id}`, (error, clientRequest, clientResponse, object) => {
    assert.ifError(error);

    response.json(object);
  });
});

module.exports = router;
