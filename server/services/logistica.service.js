var ftp = require('ftp'),
  ftpClient = new ftp(),
  config = require('/config.json'),
  ordersService = require('../services/orders.service');

var service = {};
service.obtenerPedidosEntregados = obtenerPedidosEntregados;
service.subirPedidosAEntregar = subirPedidosAEntregar;

module.exports = service;

//Upload local file 'foo.txt' to the server:
function obtenerPedidosEntregados() {
  ftpClient.on('ready', function() {
    const hoy = new Date();
    const DD = hoy.getDate(),
      MM = hoy.getMonth() + 1,
      YYYY = hoy.getFullYear();

    ftpClient.get(`ordenes-${DD}${MM}${YYYY}.json`, function(err, stream) {
      if (err) throw err;

      console.log('El stream: ', stream);
      stream.once('close', function() {
        ftpClient.end();
      });
      stream.pipe(function(response) {
        console.log('El response: ', response);
        const pedidosEntregados = response.json();

        ordersService.updateList(
          { _id: pedidosEntregados.map(x => x._id) },
          { estado: 'Entregado' }
        );
      });
    });
  });

  ftpClient.connect({ host: config.ftpLogistica });
}

//Upload local file 'foo.txt' to the server:
function subirPedidosAEntregar() {
  ftpClient.on('ready', function() {
    let pedidosPendientes = ordersService.getAll({ estado: 'Pendiente' });

    if (!pedidosPendientes.length)
      console.log('No hay pedidos pendientes de entregar.');

    var buf = Buffer.from(JSON.stringify(pedidosPendientes));
    const hoy = new Date();
    const DD = hoy.getDate(),
      MM = hoy.getMonth() + 1,
      YYYY = hoy.getFullYear();

    ftpClient.put(buf, `ordenes-${YYYY}-${MM}-${DD}.json`, function(err) {
      if (err) throw err;
      ftpClient.end();
    });
  });

  ftpClient.connect({ host: config.ftpAlmacen });
}
