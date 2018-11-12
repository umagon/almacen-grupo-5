'use strict';

var purchaseService = require('../services/purchases.service');
var express = require('express');
var router = express.Router();

router.post('/', crearPedido);

module.exports = router;

function crearPedido(req, res) {
  purchaseService
    .crearPedido(req.body)
    .then(function() {
      res.json('Order created!');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}
