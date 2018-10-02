'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductoSchema = new Schema({
    codTienda: String,
    codBarra: String,
    nombre: String,
    cantidad: { type: Number, default: 1 },
    estado: { type: [
      { type: String, enum: ['pending', 'ongoing', 'completed'] }
    ]},
    limiteStock: Number,
    pesoUnitario: Number
});

module.exports = mongoose.model('Productos', ProductoSchema);

