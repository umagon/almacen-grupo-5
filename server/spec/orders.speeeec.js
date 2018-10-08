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
      numeroCompra: 0,
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
      cantidad: 1,
      descripcion: 'Compra test'
    },
    cantidad: 1,
    fechaCompra: 1,
    fechaEntrega: 1
  };

  beforeAll(function() {
    server = require('../server');
  });

  afterAll(() => {
    server.close();
  });

  describe('Autenticación de usuario.', function() {
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
    it('Autenticación de usuario.', () => {
      tokenSession = JSON.parse(data.body).token;
      userTest.perfil = JSON.parse(data.body).perfil;
      userTest._id = JSON.parse(data.body)._id;
      console.log('Autenticación de usuario.');
      expect(data.status).toBe(200);
    });
  });

  describe('Crear pedido de prueba', function() {
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
    it('Creación de producto de prueba', () => {
      console.log('Creación de producto de prueba.');
      expect(data.status).toBe(200);
    });
  });

  describe('Crear pedido duplicado', function() {
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
    it('Verificación de duplicado', () => {
      console.log('Prohibir creación de producto duplicado.');
      expect(data.status).toBe(400);
    });
  });

  describe('Obtener todos los pedidos', function() {
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
    it('Obtener todos los pedidos.', () => {
      pedidos = JSON.parse(data.body);
      console.log('Obtener todos los pedidos.');
      expect(data.status).toBe(200);
    });
  });

  describe('Borrar pedido de prueba.', function() {
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
    it('Borrar pedido de prueba.', () => {
      console.log('Borrar pedido de prueba');
      expect(data.status).toBe(200);
    });
  });
});
