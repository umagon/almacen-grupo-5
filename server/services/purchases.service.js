var _ = require('lodash');
var Q = require('q');
var Producto = require('../models/producto');
var Pedido = require('../models/pedido');

var service = {};

service.crearPedido = crearPedido;

module.exports = service;

function crearPedido(compra) {
  var deferred = Q.defer();
  var pedido = compraToPedido(compra);

  pedido.save(function(err, order) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve();
  });
  return deferred.promise;
}

function compraToPedido(compra) {
  var pedido = new Pedido();
  pedido.compra = compra;
  pedido.estado = 'Pendiente';
  pedido.fechaCompra = new Date();
  return pedido;
}
