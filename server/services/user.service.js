﻿var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var Usuario = require('../models/usuario');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
  var deferred = Q.defer();
  Usuario.findOne({ username: username }, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (user && bcrypt.compareSync(password, user.password)) {
      deferred.resolve({
        _id: user._id,
        username: user.username,
        perfil: user.perfil,
        token: jwt.sign({ sub: user._id }, config.secret)
      });
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function getAll() {
  var deferred = Q.defer();

  Usuario.find({}, function(err, usuarios) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    usuarios = _.map(usuarios, function(user) {
      user = _.omit(user, 'password');
      return _.omit(user, 'isBorrado');
    });
    deferred.resolve(usuarios);
  });
  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  Usuario.findById(_id, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user) {
      // return user (without hashed password)
      deferred.resolve(_.omit(user, 'password'));
    } else {
      // user not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function create(userParam) {
  var deferred = Q.defer();
  Usuario.findOne({ username: userParam.username }, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (user) {
      deferred.reject('Username "' + userParam.username + '" is already taken');
    } else {
      createUser(userParam);
    }
  });

  function createUser(user) {
    user.password = bcrypt.hashSync(userParam.password, 10);
    var myUser = new Usuario({
      username: user.username,
      password: user.password,
      perfil: user.perfil,
      isBorrado: user.isBorrado
    });
    myUser.save(function(err, usuario) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  }

  return deferred.promise;
}

function update(_id, userParam) {
  var deferred = Q.defer();

  // validation
  Usuario.findById(_id, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user.username !== userParam.username) {
      // username has changed so check if the new username is already taken
      Usuario.findOne({ username: userParam.username }, function(err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
          // username already exists
          deferred.reject(
            'Username "' + req.body.username + '" is already taken'
          );
        } else {
          updateUser();
        }
      });
    } else {
      updateUser();
    }
  });

  function updateUser() {
    // fields to update
    var set = {
      firstName: userParam.firstName,
      lastName: userParam.lastName,
      username: userParam.username
    };

    // update password if it was entered
    if (userParam.password) {
      set.hash = bcrypt.hashSync(userParam.password, 10);
    }

    Usuario.update(
      { _id: mongo.helper.toObjectID(_id) },
      { $set: set },
      function(err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
      }
    );
  }

  return deferred.promise;
}

function _delete(id) {
  var deferred = Q.defer();
  Usuario.deleteMany({ _id: id }, function(err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve();
  });
  return deferred.promise;
}
