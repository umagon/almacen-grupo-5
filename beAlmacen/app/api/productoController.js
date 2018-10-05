'use strict';

var mongoose = require('mongoose'),
	Producto = mongoose.model('Producto');

exports.list_all_productos = function (req, res) {
	Producto.find({}, function (err, producto) {
		if (err)
			res.send(err);
		res.json(producto);
	});
};


exports.create_a_producto = function (req, res) {
	var new_producto = new Producto(req.body);
	new_producto.save(function (err, producto) {
		if (err)
			res.send(err);
		res.json(producto);
	});
};

exports.read_a_producto = function (req, res) {
	Producto.findById(req.params.productoId, function (err, producto) {
		if (err)
			res.send(err);
		res.json(producto);
	});
};


exports.update_a_producto = function (req, res) {
	Producto.findOneAndUpdate({ _id: req.params.productoId }, req.body, { new: true }, function (err, producto) {
		if (err)
			res.send(err);
		res.json(producto);
	});
};


exports.delete_a_producto = function (req, res) {
	Producto.remove({
		_id: req.params.productoId
	}, function (err, producto) {
		if (err)
			res.send(err);
		res.json({ message: 'Producto successfully deleted' });
	});
};