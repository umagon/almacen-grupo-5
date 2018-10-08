var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var Producto = require('../models/producto');

var service = {};

service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

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

function update() {
  Producto.findOneAndUpdate(
    { _id: req.params.productoId },
    req.body,
    { new: true },
    function(err, producto) {
      if (err) res.send(err);
      res.json(producto);
    }
  );
}

function _delete(id) {
  var deferred = Q.defer();
  Producto.deleteMany({ _id: id }, function(err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve();
  });
  return deferred.promise;
}
