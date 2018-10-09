var request = require('request');
var base_url = 'http://localhost:3003/';

describe('Almacen Test', function() {
  var server;
  var tokenSession = '';
  var userTest = {
    username: 'Pepe',
    password: 'asd',
    perfil: 'user',
    isBorrado: false
  };
  var productos = [];
  var productTest = {
    nombre: 'Producto Test',
    descripcion: 'Producto de Test',
    stock: 200,
    stockLimite: 50,
    isBorrado: false,
    proveedor: {
      nombre: 'Test',
      email: 'test@test.com'
    }
  };
  var pedidos = [];
  var orderTest = {
    compra: {
      numeroCompra: 45,
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
    estado: 'Pendiente',
    cantidad: 1,
    fechaCompra: new Date(),
    fechaEntrega: null
  };

  beforeAll(function() {
    server = require('../server');
  });

  afterAll(() => {
    server.close();
  });

  describe('Autenticación de usuario', function() {
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





  describe('Crear pedido de prueba', function() {
    var data = {};
    beforeAll(done => {
      orderTest = {
        compra: {
          numeroCompra: 12,
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
        estado: 'Entregado',
        cantidad: 1,
        fechaCompra: new Date("2018-01-01"),
        fechaEntrega: new Date("2018-01-06")
      };
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



  

  describe('Crear pedido de prueba', function() {
    var data = {};
    beforeAll(done => {
      orderTest = {
        compra: {
          numeroCompra: 39,
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
        estado: 'Enviado',
        cantidad: 1,
        fechaCompra: new Date("2018-10-07"),
        fechaEntrega: null
      };
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
});

