'use strict';

var mongoose = require('mongoose'),
  Usuario = mongoose.model('Usuario');

exports.list_all_usuarios = function(req, res) {
  Usuario.find({}, function(err, usuario) {
    if (err) res.send(err);
    res.json(usuario);
  });
};

exports.create_a_usuario = function(req, res) {
  var new_usuario = new Usuario(req.body);
  new_usuario.save(function(err, usuario) {
    if (err) res.send(err);
    res.json(usuario);
  });
};

exports.read_a_usuario = function(req, res) {
  Usuario.findById(req.params.usuarioId, function(err, usuario) {
    if (err) res.send(err);
    res.json(usuario);
  });
};

exports.update_a_usuario = function(req, res) {
  Usuario.findOneAndUpdate(
    { _id: req.params.usuarioId },
    req.body,
    { new: true },
    function(err, usuario) {
      if (err) res.send(err);
      res.json(usuario);
    }
  );
};

exports.delete_a_usuario = function(req, res) {
  Usuario.remove(
    {
      _id: req.params.usuarioId
    },
    function(err, usuario) {
      if (err) res.send(err);
      res.json({ message: 'Usuario successfully deleted' });
    }
  );
};
