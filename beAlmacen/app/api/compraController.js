'use strict';

var mongoose = require('mongoose'),
	Compra = mongoose.model('Compra');

exports.list_all_compras = function (req, res) {
	Compra.find({}, function (err, compra) {
		if (err)
			res.send(err);
		res.json(compra);
	});
};


exports.create_a_compra = function (req, res) {
	var new_compra = new Compra(req.body);
	new_compra.save(function (err, compra) {
		if (err)
			res.send(err);
		res.json(compra);
	});
};

exports.read_a_compra = function (req, res) {
	Compra.findById(req.params.compraId, function (err, compra) {
		if (err)
			res.send(err);
		res.json(compra);
	});
};


exports.update_a_compra = function (req, res) {
	Compra.findOneAndUpdate({ _id: req.params.compraId }, req.body, { new: true }, function (err, compra) {
		if (err)
			res.send(err);
		res.json(compra);
	});
};


exports.delete_a_compra = function (req, res) {
	Compra.remove({
		_id: req.params.compraId
	}, function (err, compra) {
		if (err)
			res.send(err);
		res.json({ message: 'Compra successfully deleted' });
	});
};