'use strict';

var productService = require('../services/products.service');
var express = require('express');
var router = express.Router();

router.get('/', getAll);
router.delete('/:id', _delete);
router.post('/', create);
router.put('/:_id', update);

module.exports = router;

function create(req, res) {
  productService
    .create(req.body)
    .then(function() {
      res.json('Product created!');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  productService
    .getAll()
    .then(function(products) {
      res.send(products);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function update(req, res) {
  productService
    .update(req.params._id, req.body)
    .then(function() {
      res.json('success');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  productService
    .delete(req.params.id)
    .then(function() {
      res.json('success');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}
