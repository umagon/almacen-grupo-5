const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = require('./app/config/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 8082;

mongoose.Promise = global.Promise;
mongoose.connect(db.url);

app.use('/users', require('./controllers/users.controller'));
