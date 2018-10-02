'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsuarioSchema = new Schema({
  userName: { type: String, required: 'Debe ingresar el usuario' },
  password: { type: String, required: 'Debe ingresar una contraseña' },
  perfil: { type: String },
  estado: { type: [
    { type: String, enum: ['pending', 'ongoing', 'completed'] }
  ]}
});

module.exports = mongoose.model('Usuarios', UsuarioSchema);