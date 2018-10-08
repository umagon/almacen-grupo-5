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
  Pedido.find({}, function(err, pedidos) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(pedidos);
  });
  return deferred.promise;
}

function create(orderParams) {
  var deferred = Q.defer();
  Pedido.findOne(
    { 'compra.numeroCompra': orderParams.compra.numeroCompra },
    function(err, order) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (order) {
        deferred.reject(
          'Pedido "' + orderParams.compra.numeroCompra + '" ya existe.'
        );
      } else {
        createOrder(orderParams);
      }
    }
  );

  function createOrder(order) {
    var new_order = new Pedido(order);
    new_order.save(function(err, order) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  }
  return deferred.promise;
}

function update() {
  Pedido.findOneAndUpdate(
    { _id: req.params.orderoId },
    req.body,
    { new: true },
    function(err, ordero) {
      if (err) res.send(err);
      res.json(ordero);
    }
  );
}

function _delete(id) {
  var deferred = Q.defer();
  Pedido.deleteMany({ _id: id }, function(err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve();
  });
  return deferred.promise;
}
