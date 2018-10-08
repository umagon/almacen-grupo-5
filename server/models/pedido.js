'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PedidoSchema = new Schema({
  compra: {
    numeroCompra: Number,
    producto: Producto,
    cantidad: Number,
    descripcion: String
  },
  estado: { 
    type: [{ type: String, enum: ['Pendiente', 'Enviado', 'Entregado'] }]
  },
  cantidad: { type: Number, default: 1 },
  fechaCompra: { type: Date, default: Date.now },
  fechaEntrega: { type: Date }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
