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
  Producto.find({}, function(err, producto) {
    if (err) res.send(err);
    res.json(producto);
  });
}

function create() {
  var deferred = Q.defer();
  Proudcto.findOne({ _id: product._id }, function(err, product) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (product) {
      deferred.reject('Producto con "' + productParams._id + '" ya existe.');
    } else {
      createProduct(productParams);
    }
  });
}

function createProduct(product) {
  var new_producto = new Producto(req.body);
  new_producto.save(function(err, producto) {
    if (err) res.send(err);
    res.json(producto);
  });
}

function read_a_producto() {
  Producto.findById(req.params.productoId, function(err, producto) {
    if (err) res.send(err);
    res.json(producto);
  });
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

function _delete() {
  Producto.remove(
    {
      _id: req.params.productoId
    },
    function(err, producto) {
      if (err) res.send(err);
      res.json({ message: 'Producto successfully deleted' });
    }
  );
}
