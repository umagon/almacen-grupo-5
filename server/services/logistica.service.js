var ftp = require('ftp'),
  config = require('../config.json'),
  ordersService = require('../services/orders.service');

var service = {};
service.obtenerPedidosEntregados = obtenerPedidosEntregados;
service.subirPedidosAEntregar = subirPedidosAEntregar;

const PATH = '/grupo5/almacen';

module.exports = service;

//Upload local file 'foo.txt' to the server:
function obtenerPedidosEntregados(ftpClient) {
  const hoy = new Date();
  const DD = hoy.getDate(),
    MM = hoy.getMonth() + 1,
    YYYY = hoy.getFullYear();

  console.log('Obteniendo pedidos entregados... buscando '+ `${PATH}/delivered-${YYYY}-${MM}-${DD}.json`);
  ftpClient.get(`${PATH}/delivered-${YYYY}-${MM}-${DD}.json`, function(err, stream) {
    if (err) return console.error('zero results');

    stream.once('close', function() {
      ftpClient.end();
    });
    stream.on('data', function(response) {
      const pedidosEntregados = JSON.parse(response.toString().trim());

      console.log(pedidosEntregados);
      const ids = pedidosEntregados.map(x => x._id);
      if(!ids.length) return console.error('No hay nuevos pedidos entregados.');
      ordersService.updateList(
        ids,
        { estado: 'Entregado' }
      ).then(()=> stream.close() );
    });
  });
}

//Upload local file 'foo.txt' to the server:
function subirPedidosAEntregar(ftpClient) {
  console.log('Enviando pedidos pendientes...');
  ordersService.getAll().then(function(pedidosPendientes){
      if (!pedidosPendientes.length)
      console.log('No hay pedidos pendientes de entregar.');

    var buf = Buffer.from(JSON.stringify(pedidosPendientes));
    const hoy = new Date();
    const DD = hoy.getDate(),
      MM = hoy.getMonth() + 1,
      YYYY = hoy.getFullYear();

    ftpClient.put(buf, `${PATH}/ordenes-${DD}${MM}${YYYY}.json`, function(err) {
      if (err) return console.error('zero results');
      ftpClient.end();
    });
  });

}
