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
<<<<<<< HEAD
  cantidad: Number,
  fechaCompra: Date,
  fechaEntrega: Date
=======
  estado: { 
    type: [{ type: String, enum: ['Pendiente', 'Enviado', 'Entregado'] }]
  },
  cantidad: { type: Number, default: 1 },
  fechaCompra: { type: Date, default: Date.now },
  fechaEntrega: { type: Date }
>>>>>>> ea4bcbed185e0dd30d3ee3e15b851e9a26f1830c
});

module.exports = mongoose.model('Pedido', PedidoSchema);
