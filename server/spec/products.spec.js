var request = require('request');
var base_url = 'http://localhost:3003/';

describe('Server product test', function() {
  var server;
  var tokenSession = '';
  var userTest = {
    username: 'Pepe',
    password: 'asd'
  };
  var productTest = {
    nombre: 'Seven Up',
    descripcion: 'Gaseosa sabor limón',
    stock: 200,
    stockLimite: 50,
    isBorrado: false,
    proveedor: {
      nombre: 'Coca-Cola Company',
      email: 'company@cocacola.com'
    }
  };

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
      console.log('Auth');
      console.log(data.body);
      tokenSession = JSON.parse(data.body).token;
      userTest.perfil = JSON.parse(data.body).perfil;
      userTest._id = JSON.parse(data.body)._id;
      expect(data.status).toBe(200);
    });
  });

  describe('Create', function() {
    var data = {};
    var url = base_url + 'products';
    var params = {
      url: url,
      form: productTest,
      headers: {
        authorization: 'Bearer ' + tokenSession
      }
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
      console.log(data.body);
      expect(data.status).toBe(200);
    });
  });
});
