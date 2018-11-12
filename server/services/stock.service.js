var _ = require('lodash');
var Q = require('q');
var Producto = require('../models/producto');
var Pedido = require('../models/pedido');

var service = {};

service.getAllStock = getAllStock;
service.getStock = getStock;

module.exports = service;

function getAllStock() {
  var deferred = Q.defer();
  Producto.find({}, function(err, productos) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(productos);
  });
  return deferred.promise;
}

function getStock(_id) {
  var deferred = Q.defer();
  Producto.findOne({ codBarra: _id }, function(err, producto) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(producto);
  });
}
