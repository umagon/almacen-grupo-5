
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PedidoSchema = new Schema({
	compra: { type: {
		cantidad: Number,
		descripcion: Precio,
	},
	cantidad: { type: Number, default: 1 },
	fechaCompra: { type: Date, default: Date.now },
	fechaEntrega: { type: Date },
});

module.exports = mongoose.model('Pedidos', PedidoSchema);