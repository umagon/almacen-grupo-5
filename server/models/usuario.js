'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
  username: { type: String, required: 'Debe ingresar el usuario' },
  password: { type: String, required: 'Debe ingresar una contraseña' },
  perfil: {
    type: [{ type: String, enum: ['admin', 'user'] }]
  },
  isBorrado: { type: Boolean }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
