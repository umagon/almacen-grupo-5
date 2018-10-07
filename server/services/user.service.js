var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongoose = require('mongoose');
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
  console.log(' autenticacion');
  var deferred = Q.defer();

  Usuario.findOne({ username: username }, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user && bcrypt.compareSync(password, user.hash)) {
      // authentication successful
      deferred.resolve({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: jwt.sign({ sub: user._id }, config.secret)
      });
    } else {
      // authentication failed
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function getAll() {
  var deferred = Q.defer();
  console.log('GET ALL');
  Usuario.find().toArray(function(err, users) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    // return users (without hashed passwords)
    users = _.map(users, function(user) {
      return _.omit(user, 'hash');
    });

    deferred.resolve(users);
  });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  Usuario.findById(_id, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user) {
      // return user (without hashed password)
      deferred.resolve(_.omit(user, 'hash'));
    } else {
      // user not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function create(userParam) {
  var deferred = Q.defer();

  console.log(userParam);
  // validation
  Usuario.findOne({ username: userParam.username }, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user) {
      // username already exists
      deferred.reject('Username "' + userParam.username + '" is already taken');
    } else {
      createUser(userParam);
    }
  });

  function createUser(user) {
    user.password = bcrypt.hashSync(userParam.password, 10);
    console.log('llega?');
    var asd = new Usuario({
      username: user.username,
      password: user.password,
      perfil: user.perfil,
      isBorrado: user.isBorrado
    });
    console.log(asd);
    asd.save(function(err, usuario) {
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

function _delete(_id) {
  var deferred = Q.defer();

  Usuario.remove({ _id: mongo.helper.toObjectID(_id) }, function(err) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    deferred.resolve();
  });

  return deferred.promise;
}
