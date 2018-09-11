
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PedidoSchema = new Schema({
	producto: { type: {
		nombre: String,
		descripcion: String,
	},
	cantidad: { type: Number, default: 1 },
	fechaCompra: { type: Date, default: Date.now },
	fechaEntrega: { type: Date },
});

module.exports = mongoose.model('Pedidos', PedidoSchema);