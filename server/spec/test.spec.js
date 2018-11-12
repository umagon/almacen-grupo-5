var request = require('request');
var base_url = 'http://localhost:3003/';

describe('Almacen Test', function() {
  var server;
  var tokenSession = '';
  var userTest = {
    username: 'Pepeee',
    password: 'asddd',
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
    var paramsCreacion = {
      url: base_url + 'users/register',
      form: userTest
    };
    it('Creación de usuario de prueba', done => {
      request.post(paramsCreacion, (error, response, body) => {
        console.log('Creación de usuario de prueba');
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    var paramsAuth = {
      url: base_url + 'users/',
      form: userTest
    };

    it('Autenticación de usuario de prueba', done => {
      request.post(paramsAuth, (error, response, body) => {
        console.log('Autenticación de usuario de prueba');
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    var paramsAuthError = {
      url: base_url + 'users/',
      form: {
        username: '',
        password: ''
      }
    };

    it('Autenticación de usuario incorrecto.', done => {
      request.post(paramsAuthError, (error, response, body) => {
        console.log('Autenticación de usuario incorrecto.');
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it('Autenticación de usuario.', done => {
      request.post(paramsAuth, (error, response, body) => {
        userTest.perfil = JSON.parse(body).perfil;
        userTest._id = JSON.parse(body)._id;
        console.log(userTest);
        console.log('Autenticación de usuario.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    var paramsUserNotExist = {
      url: base_url + 'users/' + 'IDNOEXISTENTE'
    };
    it('Borrar usuario de prueba no existente.', done => {
      request.delete(paramsUserNotExist, (error, response, body) => {
        console.log('Borrar usuario de prueba no existente.');
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    var paramsAllUsers = {
      url: base_url + 'users/'
    };

    it('Obtener todos los usuarios.', done => {
      request.get(paramsAllUsers, (error, response, body) => {
        console.log('Obtener todos los usuarios.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  /*
  describe('Usuario - update', function() {
    var paramsUserUpdate = {
      url: base_url + 'users/' + userTest._id,
      form: {
        username: 'PePEE'
      }
    };

    it('Actualización de usuario.', done => {
      request.put(paramsUserUpdate, (error, response, body) => {
        console.log('Actualización de usuario.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    var paramsAllUsers = {
      url: base_url + 'users/'
    };

    it('Obtener todos los usuarios.', done => {
      request.get(paramsAllUsers, (error, response, body) => {
        console.log('Obtener todos los usuarios.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
*/
  describe('Productos', function() {
    var data = {};
    var url = base_url + 'products';
    var params = {
      url: url,
      form: productTest
    };
    it('Crear producto de prueba', done => {
      request.post(params, (error, response, body) => {
        console.log('Crear producto de prueba.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    var paramsProductsGetAll = {
      url: base_url + 'products/'
    };

    it('Obtener todos los productos', done => {
      request.get(paramsProductsGetAll, (error, response, body) => {
        productos = JSON.parse(body);
        console.log('Obtener todos los productos.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  /*
  productTest = productos.find(function(producto) {
      return producto.nombre === productTest.nombre;
    });

    var paramsUpdateProduct = {
      url: base_url + 'products/' + productTest._id,
      form: {
        descripcion: 'Nueva descripcion'
      }
    };
    it('Actualización de producto.', done => {
      request.put(paramsUpdateProduct, (error, response, body) => {
        console.log('Actualización de producto.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('Obtener todos los productos', done => {
      request.get(paramsProductsGetAll, (error, response, body) => {
        productos = JSON.parse(data.body);
        console.log('Obtener todos los productos.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    productTest = productos.find(function(producto) {
      return producto.nombre === productTest.nombre;
    });

    var paramsDeleteProduct = {
      url: base_url + 'products/' + productTest._id
    };

    it('Borrar producto de prueba.', done => {
      request.delete(paramsDeleteProduct, (error, response, body) => {
        console.log('Borrar producto de prueba.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  

*/

  describe('Pedidos', function() {
    var data = {};
    var url = base_url + 'orders';
    var params = {
      url: url,
      form: orderTest
    };

    it('Creación de producto de prueba', done => {
      request.post(params, (error, response, body) => {
        console.log('Creación de producto de prueba.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    var paramsVerifyDuplicateProduct = {
      url: base_url + 'orders',
      form: orderTest
    };

    it('Verificación de duplicado', done => {
      request.post(paramsVerifyDuplicateProduct, (error, response, body) => {
        console.log('Verificación de producto duplicado.');
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    var paramsGetAllOrders = {
      url: base_url + 'orders/'
    };
    it('Obtener todos los pedidos.', done => {
      request.get(paramsGetAllOrders, (error, response, body) => {
        pedidos = JSON.parse(body);
        console.log('Obtener todos los pedidos.');
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  /*
orderTest = pedidos.find(function(pedido) {
      return pedido.compra.nro_orden === orderTest.compra.nro_orden;
    });
    url = base_url + 'orders/' + orderTest._id;
    params = {
      url: url,
      form: {
        estado: 'Enviado',
        cantidad: 999
      }
    };

    it('Actualización de pedido.', done => {
      request.put(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        console.log('Actualización de pedido.');
        expect(data.status).toBe(200);
        done();
      });
    });

    data = {};
    url = base_url + 'orders/';
    params = {
      url: url
    };

    it('Obtener todos los pedidos.', done => {
      request.get(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        pedidos = JSON.parse(data.body);
        console.log('Obtener todos los pedidos.');
        expect(data.status).toBe(200);
        done();
      });
    });

    data = {};

    orderTest = pedidos.find(function(pedido) {
      return pedido.compra.nro_orden === orderTest.compra.nro_orden;
    });
    url = base_url + 'orders/' + orderTest._id;
    params = {
      url: url
    };
    it('Borrar pedido de prueba.', done => {
      request.delete(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        console.log('Borrar pedido de prueba');
        expect(data.status).toBe(200);
        done();
      });
    });


    describe('Usuarios', function() {
    var data = {};
    var url = base_url + 'users/' + userTest._id;
    var params = {
      url: url
    };
    it('Borrar usuario de prueba.', () => {
      request.delete(params, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        console.log('Borrar usuario de prueba.');
        expect(data.status).toBe(200);
        done();
      });
    });
  });
  */
});
