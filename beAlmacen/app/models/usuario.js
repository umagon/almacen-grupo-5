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
/* 
  name: {
    type: String,
    required: 'Kindly enter the name of the Usuario'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
   */
});

module.exports = mongoose.model('Usuarios', UsuarioSchema);