'use strict';

var stockService = require('../services/stock.service');
var express = require('express');
var router = express.Router();

router.get('/', getAllStock);
router.get('/:_id', getStock);

module.exports = router;

function getAllStock(req, res) {
  stockService
    .getAllStock()
    .then(function(products) {
      res.send(productsToStock(products));
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function productsToStock(products) {
  var stock = [];
  products.forEach(function(product) {
    stock.push(productToStock(product));
  });
  return stock;
}

function productToStock(product) {
  var prod = {};
  prod.codBarra = product.codBarra;
  prod.cantidad = product.stock;
  return prod;
}

function getStock(req, res) {
  stockService
    .getStock(req.params._id)
    .then(function(product) {
      res.send(productToStock(product));
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}
