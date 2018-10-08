'use strict';

var mongoose = require('mongoose'),
  Pedido = mongoose.model('Pedido');

exports.list_all_pedidos = function(req, res) {
  Pedido.find({}, function(err, pedido) {
    if (err) res.send(err);
    res.json(pedido);
  });
};

exports.list_all_pedidos = function(req, res) {
  Pedido.find({}, function(err, pedido) {
    if (err) res.send(err);
    res.json(pedido);
  });
};

exports.create_a_pedido = function(req, res) {
  var new_pedido = new Pedido(req.body);
  new_pedido.save(function(err, pedido) {
    if (err) res.send(err);
    res.json(pedido);
  });
};

exports.read_a_pedido = function(req, res) {
  Pedido.findById(req.params.pedidoId, function(err, pedido) {
    if (err) res.send(err);
    res.json(pedido);
  });
};

exports.update_a_pedido = function(req, res) {
  Pedido.findOneAndUpdate(
    { _id: req.params.pedidoId },
    req.body,
    { new: true },
    function(err, pedido) {
      if (err) res.send(err);
      res.json(pedido);
    }
  );
};

exports.delete_a_pedido = function(req, res) {
  Pedido.remove(
    {
      _id: req.params.pedidoId
    },
    function(err, pedido) {
      if (err) res.send(err);
      res.json({ message: 'Pedido successfully deleted' });
    }
  );
};
