var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var Producto = require('../models/producto');

var mailService = require('../services/email.service');

var service = {};

service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;
service.updateStock = updateStock;

module.exports = service;

function getAll() {
  var deferred = Q.defer();
  Producto.find({}, function(err, productos) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(productos);
  });
  return deferred.promise;
}

function create(productParams) {
  var deferred = Q.defer();
  Producto.findOne({ nombre: productParams.nombre }, function(err, product) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (product) {
      deferred.reject('Producto "' + productParams.nombre + '" ya existe.');
    } else {
      createProduct(productParams);
    }
  });

  function createProduct(product) {
    var new_producto = new Producto(product);
    new_producto.save(function(err, producto) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  }
  return deferred.promise;
}

function update(_id, productParam) {
  var deferred = Q.defer();
  Producto.findById(_id, function(err, product) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (product.nombre !== productParam.nombre) {
      Producto.findOne({ nombre: productParam.nombre }, function(err, product) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (product) {
          deferred.reject(
            'Username "' + productParam.nombre + '" is already taken'
          );
        } else {
          updateProduct(_id, productParam);
        }
      });
    } else {
      updateProduct(_id, productParam);
    }
  });

  function updateProduct(_id, productParam) {
    var set = {};
    if (productParam.nombre) {
      set.nombre = productParam.nombre;
    }
    if (productParam.descripcion) {
      set.descripcion = productParam.descripcion;
    }
    if (productParam.stock) {
      set.stock = productParam.stock;
    }
    if (productParam.stockLimite) {
      set.stockLimite = productParam.stockLimite;
    }
    if (productParam.proveedor) {
      set.proveedor = productParam.proveedor;
    }

    Producto.findOneAndUpdate({ _id: _id }, set, { new: true }, function(
      err,
      producto
    ) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  }

  return deferred.promise;
}

function updateStock(codBarra, cantidad, email) {
  var deferred = Q.defer();

  Producto.findOne({ codBarra: codBarra }, function(err, product) {
    if (err) deferred.reject(false);

    var peso = product.peso * cantidad;

    if (product.stock >= cantidad) {
      if (product.stock - cantidad < product.stockLimite) {
        mailService.enviarMail(email);
      }
      updateProduct(product._id, product.stock - cantidad, peso);
    } else {
      deferred.reject(false);
    }
  });

  function updateProduct(_id, nuevoStock, peso) {
    Producto.findOneAndUpdate(
      { _id: _id },
      { stock: nuevoStock },
      { new: true },
      function(err, producto) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(peso);
      }
    );
  }

  return deferred.promise;
}

function _delete(id) {
  var deferred = Q.defer();
  Producto.deleteMany({ _id: id }, function(err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve();
  });
  return deferred.promise;
}
