var request = require('request');
var base_url = 'http://localhost:3003/users';

describe('Server test', function() {
  var server;
  beforeAll(function() {
    server = require('../server');
  });
  afterAll(() => {
    server.close();
  });

  describe('GET /Users/sarasa', function() {
    var data = {};
    beforeAll(done => {
      request.get(base_url, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status code 200', () => {
      console.log(data.status);
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      console.log(data.body);
      expect(data.body).toBe('testtt');
    });
  });
});
