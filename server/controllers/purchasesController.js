'use strict';
var purchasesService = require('../services/purchases.service');
var express = require('express');
var router = express.Router();

router.get('/', getAll);

module.exports = router;

function getAll(req, res) {
  purchasesService
    .getAll()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

}




