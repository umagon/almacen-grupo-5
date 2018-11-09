# almacen-grupo-5

Trabajo práctico de Integración de aplicaciones

## Descripción

Aplicación encargada de administrar el stock, las compras realizadas y pedidos del sistema de gestión de Tienda.

Se divide en almacenApp y beAlmacen.

### client

Aplicación frontEnd (Angular + Bootstrap), cuyo objetivo es permitir administrar usuarios, administrar el stock y los pedidos del negocio.
Se complementa consumiendo servicios de el beAlmacen.

## server

Aplicación BackEnd (Node.js + Jasmine + MongoDB + Express) destinada a brindar servicios para los distintos clientes del negocio.
Ofrece interfaces para almacenApp, LOGISTICA y TIENDA.

## Comandos para correr la aplicación

Se debe correr el server primero - 'npm start' desde la raíz del server.
Luego el cliente - 'ng serve' desde raíz del cliente.

Para probar los test - 'npm test' desde raíz del server.

## Models

### Usuario

-producto
-cantidad
-precio
-fechaCompra
-fechaEntrega

### Productos

-nombre
-descripcion
-stock
-stockLimite
-isBorrado
-proveedor

### Pedidos

-compra
-estado
-cantidad
-fechaCompra
-fechaEntrega
