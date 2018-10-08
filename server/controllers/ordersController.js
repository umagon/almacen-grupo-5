'use strict';

var ordersService = require('../services/orders.service');
var express = require('express');
var router = express.Router();

router.get('/', getAll);
router.delete('/:id', _delete);
router.post('/', create);
router.put('/:_id', update);

module.exports = router;

function create(req, res) {
  ordersService
    .create(req.body)
    .then(function() {
      res.json('Order created!');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  ordersService
    .getAll()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function update(req, res) {
  ordersService
    .update(req.params._id, req.body)
    .then(function() {
      res.json('success');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  ordersService
    .delete(req.params.id)
    .then(function() {
      res.json('success');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}
