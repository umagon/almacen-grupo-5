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
    codBarra: 1235,
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
      nro_orden: 32,
      producto: {
        codBarra: 1234,
        cantidad: 12
      },
      cliente: {
        nombre: 'Juan',
        apellido: 'Perez',
        mail: 'juanperez@mail.com',
        direccion: 'calle 123'
      }
    },
    estado: 'Pendiente',
    fechaCompra: 1,
    fechaEntrega: 1
  };

  beforeAll(function() {
    server = require('../server');
  });

  afterAll(() => {
    server.close();
  });

  describe('Usuarios', function() {
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

    data = {};
    url = base_url + 'users/';
    params = {
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

    url = base_url + 'users/';
    params = {
      url: url,
      form: {
        username: '',
        password: ''
      }
    };

    it('Autenticación de usuario incorrecto.', done => {
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        console.log('Autenticación de usuario incorrecto.');
        expect(data.status).toBe(400);
        done();
      });
    });

    url = base_url + 'users/';
    params = {
      url: url,
      form: {
        username: userTest.username,
        password: userTest.password
      }
    };

    it('Autenticación de usuario.', done => {
      request.post(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;

        tokenSession = JSON.parse(data.body).token;
        userTest.perfil = JSON.parse(data.body).perfil;
        userTest._id = JSON.parse(data.body)._id;
        console.log('Autenticación de usuario.');
        expect(data.status).toBe(200);
        done();
      });
    });

    url = base_url + 'users/' + 'IDNOEXISTENTE';
    params = {
      url: url
    };

    it('Borrar usuario de prueba no existente.', () => {
      request.delete(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;

        console.log('Borrar usuario de prueba no existente.');
        expect(data.status).toBe(400);
        done();
      });
    });
  });

  /*
  describe('Usuarios', function() {
    var data = {};
    var url = base_url + 'users/';
    var params = {
      url: url,
      headers: {
        authorization: 'Bearer TOKENINVALIDO'
      }
    };
    beforeAll(done => {
      request.get(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Obtener todos los usuarios sin autenticación.', () => {
      console.log('Obtener todos los usuarios sin autenticación.');
      expect(data.status).toBe(400);
    });
  });
  */

  describe('Usuarios', function() {
    var data = {};
    var url = base_url + 'users/';
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
    it('Obtener todos los usuarios.', () => {
      console.log('Obtener todos los usuarios.');
      expect(data.status).toBe(200);
    });
  });

  describe('Actualización de usuario', function() {
    var data = {};
    beforeAll(done => {
      var url = base_url + 'users/' + userTest._id;
      var params = {
        url: url,
        form: {
          username: 'PePEE'
        }
      };
      request.put(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Actualización de usuario.', () => {
      console.log('Actualización de usuario.');
      expect(data.status).toBe(200);
    });
  });

  describe('Usuarios', function() {
    var data = {};
    var url = base_url + 'users/';
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
    it('Obtener todos los usuarios.', () => {
      console.log('Obtener todos los usuarios.');
      expect(data.status).toBe(200);
    });
  });

  describe('Productos', function() {
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
    it('Crear producto de prueba', () => {
      console.log('Crear producto de prueba.');
      expect(data.status).toBe(200);
    });
  });

  describe('Productos', function() {
    var data = {};
    var url = base_url + 'products/';
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
    it('Obtener todos los productos', () => {
      productos = JSON.parse(data.body);
      console.log('Obtener todos los productos.');
      expect(data.status).toBe(200);
    });
  });

  describe('Actualización de producto', function() {
    var data = {};
    beforeAll(done => {
      productTest = productos.find(function(producto) {
        return producto.nombre === productTest.nombre;
      });
      var url = base_url + 'products/' + productTest._id;
      var params = {
        url: url,
        form: {
          descripcion: 'Nueva descripcion'
        }
      };
      request.put(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Actualización de producto.', () => {
      console.log('Actualización de producto.');
      expect(data.status).toBe(200);
    });
  });

  describe('Productos', function() {
    var data = {};
    var url = base_url + 'products/';
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
    it('Obtener todos los productos', () => {
      productos = JSON.parse(data.body);
      console.log('Obtener todos los productos.');
      expect(data.status).toBe(200);
    });
  });

  describe('Productos', function() {
    var data = {};
    beforeAll(done => {
      productTest = productos.find(function(producto) {
        return producto.nombre === productTest.nombre;
      });
      var url = base_url + 'products/' + productTest._id;
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
    it('Borrar producto de prueba.', () => {
      console.log('Borrar producto de prueba.');
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

  describe('Actualización de pedido', function() {
    var data = {};
    beforeAll(done => {
      orderTest = pedidos.find(function(pedido) {
        return pedido.compra.nro_orden === orderTest.compra.nro_orden;
      });
      var url = base_url + 'orders/' + orderTest._id;
      var params = {
        url: url,
        form: {
          estado: 'Enviado',
          cantidad: 999
        }
      };
      request.put(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Actualización de pedido.', () => {
      console.log('Actualización de pedido.');
      expect(data.status).toBe(200);
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
        return pedido.compra.nro_orden === orderTest.compra.nro_orden;
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

  describe('Usuarios', function() {
    var data = {};
    beforeAll(done => {
      var url = base_url + 'users/' + userTest._id;
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
    it('Borrar usuario de prueba.', () => {
      console.log('Borrar usuario de prueba.');
      expect(data.status).toBe(200);
    });
  });
});