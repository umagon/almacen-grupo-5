'use strict';

var ftp = require('ftp'),
  c = new ftp(),
  config = require('/config.json');

module.exports = {
  obtenerPedidosEntregados: obtenerPedidosEntregados(),
  subirPedidosAEntregar: subirPedidosAEntregar()
};

//Upload local file 'foo.txt' to the server:
function obtenerPedidosEntregados() {
  c.on('ready', function() {
    const hoy = new Date();
    const DD = hoy.getDate(),
      MM = hoy.getMonth() + 1,
      YYYY = hoy.getFullYear();

    c.get(`ordenes-${DD}${MM}${YYYY}.json`, function(err, stream) {
      if (err) throw err;
      stream.once('close', function() {
        c.end();
      });
      stream.pipe(function(response) {
        const pedidosEntregados = response.json();

        //Actualizar los pedidos en la base
      });
    });
  });

  c.connect({ host: config.ftpLogistica });
}

//Upload local file 'foo.txt' to the server:
function subirPedidosAEntregar() {
  c.on('ready', function() {

    let pedidosPendientes = ordersService.getAll({estado: 'Pendiente'});

    var buf = Buffer.from(JSON.stringify(pedidosPendientes));
    const hoy = new Date();
    const DD = hoy.getDate(),
      MM = hoy.getMonth() + 1,
      YYYY = hoy.getFullYear();
      
      c.put(buf, `ordenes-${YYYY}-${MM}-${DD}.json`, function(err) {
      if (err) throw err;
      c.end();
    });
  });

  c.connect({ host: config.ftpAlmacen });
}
