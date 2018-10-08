var request = require('request');
var base_url = 'http://localhost:3003/';

describe('Server product test', function() {
  var server;
  var tokenSession = '';
  var userTest = {
    username: 'Pepe',
    password: 'asd'
  };
  var productTest = {};

  beforeAll(function() {
    server = require('../server');
  });

  afterAll(() => {
    server.close();
  });

  describe('Authenticate', function() {
    var data = {};
    var url = base_url + 'users/';
    var params = {
      url: url,
      form: {
        username: userTest.username,
        password: userTest.password
      }
    };
    beforeAll(done => {
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status code 200', () => {
      tokenSession = JSON.parse(data.body).token;
      expect(data.status).toBe(200);
    });
  });

  describe('Create', function() {
    var data = {};
    var url = base_url + 'products/';
    var params = {
      url: url,
      form: productTest
    };
    beforeAll(done => {
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Create', () => {
      console.log('1');
      console.log(data.body);
      expect(data.status).toBe(200);
    });
  });

  describe('Get all', function() {
    var data = {};
    var url = base_url;
    var params = {
      url: url,
      headers: {
        authorization: 'Bearer ' + tokenSession
      }
    };
    //(params);
    beforeAll(done => {
      request.get(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Get all', () => {
      console.log('3');
      console.log(body.data);
      expect(data.status).toBe(200);
    });
  });

  describe('Delete', function() {
    //('Delete ');

    var data = {};

    var url = base_url + '/' + userTest._id;
    //(url);

    var params = {
      url: url,
      form: {
        username: userTest.username,
        password: userTest.password
      },
      headers: {
        authorization: 'Bearer ' + tokenSession
      }
    };
    //(params);

    //('Delete ');
    beforeAll(done => {
      request.delete(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status code 200', () => {
      //(data.body);
      console.log('4');
      console.log(data.body);
      expect(data.status).toBe(200);
    });
  });
});
