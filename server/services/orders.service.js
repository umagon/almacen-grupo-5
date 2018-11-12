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
  Pedido.findOne({ 'compra.nro_orden': orderParams.compra.nro_orden }, function(
    err,
    order
  ) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (order) {
      deferred.reject(
        'Pedido "' + orderParams.compra.nro_orden + '" ya existe.'
      );
    } else {
      console.log('ASDASD');
      console.log(orderParams);
      orderParams.peso_total = 42;
      createOrder(orderParams);

      /* Producto.findOne(
        { codBarra: orderParams.compra.producto.codBarra },
        function(err, product) {
          if (err) {
            console.log(orderParams);
            deferred.reject(err.name + ': ' + err.message);
          }
          console.log('ASDSAD333');
          console.log(orderParams);

          orderParams.peso_total =
            product.peso * orderParams.compra.producto.cantidad;
          console.log('ASDSAD444');
          console.log(orderParams);
          createOrder(orderParams);
        }
      ); */
    }
  });

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

function updateList(ordersIds, estado) {
  var set = {};
  set.estado = estado;
  ordersIds.forEach(orderId => {
    Pedido.findOneAndUpdate(
      { 'compra.nro_orden': '' + orderId },
      set,
      { new: true },
      function(err, pedido) {
        if (err) console.log(err);
      }
    );
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
