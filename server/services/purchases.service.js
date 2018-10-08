var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var Compra = require('../models/compra');

var service = {};

service.getAll = getAll;

module.exports = service;

function getAll() {
  var deferred = Q.defer();
  Compra.find({}, function(err, purchases) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(purchases);
  });
  return deferred.promise;
}
