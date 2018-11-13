var ftp = require('ftp'),
  config = require('../config.json'),
  ordersService = require('../services/orders.service');

var service = {};
service.obtenerPedidosEntregados = obtenerPedidosEntregados;
service.subirPedidosAEntregar = subirPedidosAEntregar;

module.exports = service;

//Upload local file 'foo.txt' to the server:
function obtenerPedidosEntregados(ftpClient, PATH = '') {
  const hoy = new Date();
  const DD = hoy.getDate() + 1,
    MM = hoy.getMonth() + 1,
    YYYY = hoy.getFullYear();

  const path = `${PATH}/delivered-${YYYY}-${MM}-${DD}.json`;
  console.log('Obteniendo pedidos entregados... buscando ' + path);

  ftpClient.get(path, function(err, stream) {
    if (err) return console.error('zero results');

    stream.once('close', function() {
      console.log('Cierra stream obtener pedidos entregados');
    });
    stream.on('data', function(response) {
      const nrosOrden = JSON.parse(response.toString().trim());

      console.log(nrosOrden);
      const ids = nrosOrden.map(x => x.ordenId);
      if (!ids.length)
        return console.error('No hay nuevos pedidos entregados.');

      ordersService.updateList(ids, 'Entregado');
    });
  });
}

//Upload local file 'foo.txt' to the server:
function subirPedidosAEntregar(ftpClient, PATH = '') {
  console.log('Enviando pedidos pendientes...');

  ordersService.getByStatus('Pendiente').then(function(pedidosPendientes) {
    if (!pedidosPendientes.length)
      return console.log('No hay pedidos pendientes de entregar.');

    let ordenes = pedidosPendientes.map(x => {
      return {
        orden_id: x.compra.nro_orden,
        cliente: x.compra.cliente,
        peso_total: x.peso_total,
        producto: {
          id: x.compra.producto.codBarra,
          nombre: x.compra.producto.nombre
        }
      };
    });

    var buf = Buffer.from(JSON.stringify(ordenes));
    const hoy = new Date();
    const DD = hoy.getDate(),
      MM = hoy.getMonth() + 1,
      YYYY = hoy.getFullYear();

    const path = `${PATH}/ordenes-${DD}${MM}${YYYY}.json`; //${PATH}
    console.log(path);
    ftpClient.put(buf, path, function(err) {
      if (err) return console.error(err);

      const ids = pedidosPendientes.map(x => x.compra.nro_orden);
      console.log(ids);
      ordersService.updateList(ids, 'Enviado');
    });
  });
}
