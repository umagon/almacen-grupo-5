// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = require('./app/config/db');

mongoose.Promise = global.Promise;
mongoose.connect(db.url);

const port = 8082;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes')(app, {});

app.listen(port, () => {
  console.log('We are live on ' + port);
});
