'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductoSchema = new Schema({
	nombre: { type: String },
	descripcion: { type: String },
	stock: { type: Number, default: 0 },
	stockLimite: { type: Number },
	isBorrado: { type: Boolean },
	proveedor: {
		nombre: String,
		email: String,
	}
});

module.exports = mongoose.model('Productos', ProductoSchema);
