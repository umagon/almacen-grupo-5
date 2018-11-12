var _ = require('lodash');
var Q = require('q');
var Pedido = require('../models/pedido');

var service = {};

service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;
service.updateList = updateList;
service.getByStatus = getByStatus;

module.exports = service;

function getByStatus(status) {
  var deferred = Q.defer();
  Pedido.find({ estado: status }, function(err, pedidos) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(pedidos);
  });
  return deferred.promise;
}

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

function update(_id, orderParam) {
  var deferred = Q.defer();
  Pedido.findById(_id, function(err, order) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    updateOrder(_id, orderParam);
  });

  function updateOrder(_id, orderParam) {
    var set = {};
    if (orderParam.estado) {
      set.estado = orderParam.estado;
    }
    if (orderParam.cantidad) {
      set.cantidad = orderParam.cantidad;
    }
    if (orderParam.fechaEntrega) {
      set.fechaEntrega = orderParam.fechaEntrega;
    }

    Pedido.findOneAndUpdate({ _id: _id }, set, { new: true }, function(
      err,
      pedido
    ) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  }

  return deferred.promise;
}

function updateList(ordersIds) {
  ordersIds.array.forEach(orderId => {});
  var set = {};
  set.estado = 'Entregado';

  Pedido.findOneAndUpdate({ orderId: orderId }, set, { new: true }, function(
    err,
    pedido
  ) {
    if (err) console.log(err);
  });
}

function _delete(id) {
  var deferred = Q.defer();
  Pedido.deleteMany({ _id: id }, function(err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve();
  });
  return deferred.promise;
}
