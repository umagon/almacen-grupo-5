var _ = require('lodash');
var Q = require('q');
var Producto = require('../models/producto');
var Pedido = require('../models/pedido');
var productService = require('../services/products.service');
var mailService = require('../services/email.service');

var service = {};

service.crearPedido = crearPedido;

module.exports = service;

function crearPedido(compra) {
  var deferred = Q.defer();
  var pedido = compraToPedido(compra);

  console.log('LA COMPRA');
  console.log(compra);
  productService
    .updateStock(
      compra.producto.codBarra,
      compra.producto.cantidad,
      compra.cliente.mail
    )
    .then(function(peso) {
      pedido.peso_total = peso;
      pedido.save(function(err, order) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve();
      });
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
}

function compraToPedido(compra) {
  var pedido = new Pedido();
  pedido.compra = compra;
  pedido.estado = 'Pendiente';
  pedido.fechaCompra = new Date();
  pedido.peso_total = 0;
  return pedido;
}
