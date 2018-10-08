var request = require('request');
var base_url = 'http://localhost:3003/users/';

describe('Server users test', function() {
  var server;
  var tokenSession = '';
  var userTest = {
    username: 'Pepe',
    password: 'asd',
    perfil: 'user',
    isBorrado: false
  };

  beforeAll(function() {
    server = require('../server');
  });

  afterAll(() => {
    server.close();
  });

  describe('Authenticate', function() {
    var data = {};
    var url = base_url;
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
      console.log('Auth');
      tokenSession = JSON.parse(data.body).token;
      userTest.perfil = JSON.parse(data.body).perfil;
      userTest._id = JSON.parse(data.body)._id;
      expect(data.status).toBe(200);
    });
  });

  describe('Delete', function() {
    var data = {};

    beforeAll(done => {
      var url = base_url + '/' + userTest._id;
      var params = {
        url: url,
        headers: {
          authorization: 'Bearer ' + tokenSession
        }
      };
      request.delete(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status code 200', () => {
      console.log('Delete');
      expect(data.status).toBe(200);
    });
  });

  describe('Create', function() {
    var data = {};
    var url = base_url + 'register';
    var params = {
      url: url,
      form: userTest
    };
    beforeAll(done => {
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Create', () => {
      console.log('Create');
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
    it('Status code 200', () => {
      console.log('Get all');
      console.log(data.body);
      expect(data.status).toBe(200);
    });
  });
});
