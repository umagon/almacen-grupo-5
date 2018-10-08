var request = require('request');
var base_url = 'http://localhost:3003/';

describe('Server orders test', function() {
  var server;
  var tokenSession = '';
  var userTest = {
    username: 'Pepe',
    password: 'asd'
  };
  var pedidos = [];
  var orderTest = {
    compra: {
      numeroCompra: 412,
      producto: {
        nombre: 'Coca-cola',
        descripcion: 'Gaseosa sabor cola',
        stock: 200,
        stockLimite: 50,
        isBorrado: false,
        proveedor: {
          nombre: 'Coca-Cola Company',
          email: 'company@cocacola.com'
        }
      },
      cantidad: 71,
      descripcion: 'Compra mayorista'
    },
    cantidad: 18,
    fechaCompra: Date.now,
    fechaEntrega: Date.now
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
      console.log('HOLA 1');
      console.log(orders);
      console.log('HOLA 2');

      expect(data.status).toBe(200);
    });
  });

  describe('Delete', function() {
    var data = {};
    beforeAll(done => {
      orderTest = pedidos.find(function(pedido) {
        return pedido.compra.numeroCompra === orderTest.compra.numeroCompra;
      });
      var url = base_url + 'orders/' + orderTest._id;
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
      console.log(data.body);
      expect(data.status).toBe(200);
    });
  });

  describe('Create', function() {
    var data = {};

    beforeAll(done => {
      var url = base_url + 'orders';
      var params = {
        url: url,
        form: orderTest,
        headers: {
          authorization: 'Bearer ' + tokenSession
        }
      };
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Create', () => {
      expect(data.status).toBe(200);
    });
  });
});
