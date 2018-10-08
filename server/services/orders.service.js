var _ = require('lodash');
var Q = require('q');
var Pedido = require('../models/pedido');

var service = {};

service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
  var deferred = Q.defer();
  Pedido.find({}, function(err, [pedidos]) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve([pedidos]);
  });
  return deferred.promise;
}

function create(productParams) {
  var deferred = Q.defer();
  Pedido.findOne({ nombre: productParams.nombre }, function(err, product) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (product) {
      deferred.reject('Pedido "' + productParams.nombre + '" ya existe.');
    } else {
      createProduct(productParams);
    }
  });

  function createProduct(product) {
    var new_producto = new Pedido(product);
    new_producto.save(function(err, producto) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  }
  return deferred.promise;
}

function update() {
  Pedido.findOneAndUpdate(
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
  console.log(id);
  Pedido.deleteMany({ _id: id }, function(err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve();
  });
  return deferred.promise;
}
