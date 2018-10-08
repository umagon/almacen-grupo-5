var request = require('request');
var base_url = 'http://localhost:3003/';

describe('Server product test', function() {
  var server;
  var tokenSession = '';
  var userTest = {
    username: 'Pepe',
    password: 'asd'
  };
  var orders = [];
  var orderTest = {
    compra: {
      numeroCompra: 542,
      producto: {
        nombre: 'Sprite',
        descripcion: 'Gaseosa sabor limón',
        stock: 200,
        stockLimite: 50,
        isBorrado: false,
        proveedor: {
          nombre: 'Coca-Cola Company',
          email: 'company@cocacola.com'
        },
        cantidad: 32,
        descripcion: 'Compra minorista'
      },
      cantidad: { type: Number, default: 1 },
      fechaCompra: { type: Date, default: Date.now },
      fechaEntrega: { type: Date }
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
      tokenSession = JSON.parse(data.body).token;
      userTest.perfil = JSON.parse(data.body).perfil;
      userTest._id = JSON.parse(data.body)._id;
      expect(data.status).toBe(200);
    });
  });

  describe('Get all', function() {
    var data = {};
    var url = base_url + 'orders/';
    var params = {
      url: url,
      headers: {
        authorization: 'Bearer ' + tokenSession
      }
    };
    beforeAll(done => {
      request.get(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Get all', () => {
      orders = JSON.parse(data.body);
      expect(data.status).toBe(200);
    });
  });
});
