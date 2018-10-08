'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PedidoSchema = new Schema({
  compra: {
    numeroCompra: Number,
    producto: {
      nombre: String,
      descripcion: String,
      stock: Number,
      stockLimite: Number,
      isBorrado: Boolean,
      proveedor: {
        nombre: String,
        email: String
      }
    },
    cantidad: Number,
    descripcion: String
  },
  cantidad: Number,
  fechaCompra: Date,
  fechaEntrega: Date
});

module.exports = mongoose.model('Pedido', PedidoSchema);
