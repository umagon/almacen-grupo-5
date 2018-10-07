'use strict';


var mongoose = require('mongoose'),
  Producto = mongoose.model('Producto');

//Acá irían los métodos de comunicación con otros sistemas...


exports.getStock = function(req, res) {
Producto.findById(req.params.productoId, function(err, producto) {
    if (err)
    res.send(err);
    res.json(producto);
});
};
