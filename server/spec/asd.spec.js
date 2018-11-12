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
    nombre: 'Coca-cola',
    codBarra: 33,
    descripcion: 'Gaseosa',
    stock: 150,
    stockLimite: 30,
    isBorrado: false,
    peso: 1.5,
    proveedor: {
      nombre: 'Coca-Cola Company',
      email: 'cocacola@mail.com'
    }
  };
  var pedidos = [];
  var orderTest = {
    compra: {
      nro_orden: 3,
      producto: {
        codBarra: 33,
        cantidad: 12
      },
      cliente: {
        nombre: 'Juan',
        apellido: 'Perez',
        email: 'juanperez@mail.com',
        direccion: 'calle 123'
      }
    },
    estado: 'Pendiente',
    fechaCompra: new Date(),
    fechaEntrega: null
  };

  beforeAll(function() {
    server = require('../server');
  });

  afterAll(() => {
    server.close();
  });

  describe('Creacion de usuario de prueba', function() {
    var data = {};
    var url = base_url + 'users/register';
    var params = {
      url: url,
      form: userTest
    };
    it('Creación de usuario de prueba', done => {
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        console.log('Creación de usuario de prueba');
        expect(data.status).toBe(200);
        done();
      });
    });
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
      //tokenSession = JSON.parse(data.body).token;
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
        form: orderTest
      };
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Creación de pedido de prueba 1', () => {
      console.log('Creación de pedido de prueba 1.');
      expect(data.status).toBe(200);
    });
  });

  describe('Crear pedido de prueba', function() {
    var data = {};
    beforeAll(done => {
      orderTest = {
        compra: {
          nro_orden: 1,
          producto: {
            codBarra: 33,
            cantidad: 5
          },
          cliente: {
            nombre: 'Pablo',
            apellido: 'Gomez',
            email: 'pablogomez@mail.com',
            direccion: 'Calle 23'
          }
        },
        estado: 'Entregado',
        fechaCompra: new Date('2018-01-01'),
        fechaEntrega: new Date('2018-01-06')
      };
      var url = base_url + 'orders';
      var params = {
        url: url,
        form: orderTest
      };
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Creación de pedido de prueba 2', () => {
      console.log('Creación de pedido de prueba 2.');
      expect(data.status).toBe(200);
    });
  });

  describe('Crear pedido de prueba', function() {
    var data = {};
    beforeAll(done => {
      orderTest = {
        compra: {
          nro_orden: 2,
          producto: {
            codBarra: 33,
            cantidad: 5
          },
          cliente: {
            nombre: 'Pablo',
            apellido: 'Gomez',
            email: 'pablogomez@mail.com',
            direccion: 'Calle 23'
          }
        },
        estado: 'Enviado',
        fechaCompra: new Date('2018-10-07'),
        fechaEntrega: null
      };
      var url = base_url + 'orders';
      var params = {
        url: url,
        form: orderTest
      };
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Creación de pedido de prueba 3', () => {
      console.log('Creación de pedido de prueba 3.');
      expect(data.status).toBe(200);
    });
  });

  describe('Productos', function() {
    var data = {};
    var url = base_url + 'products';
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
    it('Crear producto de prueba', () => {
      console.log('Crear producto de prueba.');
      expect(data.status).toBe(200);
    });
  });
});
