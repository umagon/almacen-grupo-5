'use strict';

var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function authenticate(req, res) {
  userService
    .authenticate(req.body.username, req.body.password)
    .then(function(user) {
      if (user) {
        // authentication successful
        res.send(user);
      } else {
        // authentication failed
        res.status(400).send('Username or password is incorrect');
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function register(req, res) {
  userService
    .create(req.body)
    .then(function() {
      res.json('success');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  exports.list_all_usuarios = function(req, res) {
    Usuario.find({}, function(err, usuario) {
      if (err) res.send(err);
      res.json(usuario);
    });
  };

  userService
    .getAll()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function getCurrent(req, res) {
  userService
    .getById(req.user.sub)
    .then(function(user) {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function update(req, res) {
  userService
    .update(req.params._id, req.body)
    .then(function() {
      res.json('success');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  userService
    .delete(req.params._id)
    .then(function() {
      res.json('success');
    })
    .catch(function(err) {
      res.status(400).send(err);
    });
}

exports.create_a_usuario = function(req, res) {
  var new_usuario = new Usuario(req.body);
  new_usuario.save(function(err, usuario) {
    if (err) res.send(err);
    res.json(usuario);
  });
};

exports.read_a_usuario = function(req, res) {
  Usuario.findById(req.params.usuarioId, function(err, usuario) {
    if (err) res.send(err);
    res.json(usuario);
  });
};

exports.update_a_usuario = function(req, res) {
  Usuario.findOneAndUpdate(
    { _id: req.params.usuarioId },
    req.body,
    { new: true },
    function(err, usuario) {
      if (err) res.send(err);
      res.json(usuario);
    }
  );
};

exports.delete_a_usuario = function(req, res) {
  Usuario.remove(
    {
      _id: req.params.usuarioId
    },
    function(err, usuario) {
      if (err) res.send(err);
      res.json({ message: 'Usuario successfully deleted' });
    }
  );
};
