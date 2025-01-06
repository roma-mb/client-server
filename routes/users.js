let restify = require('restify-clients');
let assert = require('assert');
let express = require('express');
let router = express.Router();

let client = restify.createJsonClient({
  url: 'http://localhost:4000'
});

/* GET users listing. */
router.get('/', function(request, response, next) {
  client.get('/users', (error, clientRequest, clientResponse, obj) => {
    assert.ifError(error);
    response.end(JSON.stringify(obj, null, 2));
  });
});

module.exports = router;
