'use strict';


var mongoose = require('mongoose'),
  config = require('/config.json'),
  ordersService = require('../services/orders.service'),
  Producto = mongoose.model('Producto'),
  Pedido = mongoose.model('Pedido'),
  ftp = require('ftp'),
  c = new ftp(),
;


//Acá irían los métodos de comunicación con otros sistemas...


exports.getStock = function(req, res) {
Producto.findById(req.params.productoId, function(err, producto) {
    if (err)
    res.send(err);
    res.json(producto);
});
};

//Upload local file 'foo.txt' to the server:
exports.obtenerPedidosEntregados(){
  c.on('ready', function() {
    const hoy = new Date();
    const DD = hoy.getDate(), MM = hoy.getMonth()+1, YYYY= hoy.getFullYear();

    c.get(`ordenes-${DD}${MM}${YYYY}.json`, function(err, stream) {
      if (err) throw err;
      stream.once('close', function() { c.end(); });
      stream.pipe(function(response){
        const pedidosEntregados = response.json();

        //Actualizar los pedidos en la base

      });
    });
  });

  c.connect({host:config.ftpLogistica});
}

//Upload local file 'foo.txt' to the server:
exports.subirPedidosAEntregar(){
  c.on('ready', function() {
    
    //Obtener pedidos pendientes.
    let pedidosPendientes = ordersService.getAll({estado: 'Pendiente'});

    var buf = Buffer.from(JSON.stringify(pedidosPendientes));
    const hoy = new Date();
    const DD = hoy.getDate(), MM = hoy.getMonth()+1, YYYY= hoy.getFullYear();
    c.put(buf, `ordenes-${YYYY}-${MM}-${DD}.json`, function(err) {
      if (err) throw err;
      c.end();
    });
  });

  c.connect({host: config.ftpAlmacen});

}