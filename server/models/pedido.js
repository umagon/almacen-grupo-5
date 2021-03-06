'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PedidoSchema = new Schema({
  compra: {
    nro_orden: Number,
    producto: {
      codBarra: String,
      cantidad: Number
    },
    cliente: {
      nombre: String,
      apellido: String,
      email: String,
      direccion: String
    }
  },
  peso_total: Number,
  estado: String,
  fechaCompra: Date,
  fechaEntrega: Date
});

module.exports = mongoose.model('Pedido', PedidoSchema);
