require('rootpath')();
var request = require('request');
var config = require('config.json');
const express = require('express');
const mongoose = require('mongoose');
var expressJwt = require('express-jwt');
var cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cron = require('node-cron');
const logisticaService = require('./services/logistica.service');
const ftp = require('ftp');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(db.url);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', require('./controllers/usersController'));
app.use('/products', require('./controllers/productsController'));
app.use('/orders', require('./controllers/ordersController'));
app.use('/getStock', require('./controllers/stockController'));
app.use('/enviarCompra', require('./controllers/purchasesController'));

let upload = false;
let ftpAlmacen = new ftp({ host: config.ftpAlmacen });
let ftpLogistica = new ftp({ host: config.ftpLogistica });

ftpAlmacen.on('ready', function() {
  cron.schedule('10,30,50 * * * * *', () => {
    logisticaService.subirPedidosAEntregar(ftpAlmacen);
  });
});
ftpLogistica.on('ready', function() {
  cron.schedule('0,20,40 * * * * *', () => {
    logisticaService.obtenerPedidosEntregados(ftpLogistica);
  });
});

//ftpAlmacen.connect({ host: config.ftpAlmacen, user: 'grupo5', password: 'grupo5'  });
//ftpLogistica.connect({ host: config.ftpLogistica, /* user: 'sgesnouin', password: 'Martes38*t' */ });

//var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(config.serverPort, function() {
  console.log('Server listening on port ' + config.serverPort);
});

module.exports = server;
