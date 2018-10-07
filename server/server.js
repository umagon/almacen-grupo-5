require('rootpath')();
var config = require('config.json');
const express = require('express');
const mongoose = require('mongoose');
var expressJwt = require('express-jwt');
var cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(db.url);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', require('./controllers/usersController'));

app.use(
  expressJwt({
    secret: config.secret,
    getToken: function(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  }).unless({ path: ['/users/authenticate', '/users/register'] })
);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token');
  } else {
    throw err;
  }
});

//var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(config.serverPort, function() {
  console.log('Server listening on port ' + config.serverPort);
});
