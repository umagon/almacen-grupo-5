# almacen-grupo-5

Trabajo práctico de Integración de aplicaciones

## Descripción

Aplicación encargada de administrar el stock, las compras realizadas y pedidos del sistema de gestión de Tienda.

Se divide en almacenApp y beAlmacen.

### almacenApp

Aplicación frontEnd en Angular, cuyo objetivo es permitir administrar usuarios, administrar el stock y los pedidos del negocio.
Se complementa consumiendo servicios de el beAlmacen.

## beAlmacen

Aplicación BackEnd destinada a alimentar a los distintos clientes con datos del negocio.
Ofrece interfaces para almacenApp, LOGISTICA y TIENDA.


## Models

### Usuario

- userName
- password
- perfil
- isBorrado

### Productos

- nombre
- descripcion
- stock
- stockLimite
- isBorrado
- proveedor - nombre - email

### Compras

- producto - nombre - descripcion
- cantidad
- precio
- fechaCompra
- fechaEntrega

### Pedidos

- producto - nombre - descripcion
- cantidad
- fechaCompra
- fechaEntrega
