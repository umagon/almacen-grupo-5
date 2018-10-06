### PASOS PARA YISUS

#1 - Crear los proyectos

Tomar los ejemplos de MEANS/LoginExample
Ahí está la aplicación client/server, si queres probala (npm i en cada folder)
Agregar Karma/Jasmine al proyecto
Crear los .spec.ts en las folder que correspondan (todo lugar donde haya un .ts)
Traducir los usuarios!!! HDP HACEME CASO :3
Una vez que funque todo esto, agregas tus modulos y armas los servicios
Después queda agregar componentes (de acuerdo a la imagen de tu pizarrón - la copio acá puto)
Para las tablas, tomar el ejemplo de MEANS/ABMExample, que tiene un ABM muy copado, super fácil.
TODO TIENE MONGO, NO TENES QUE TOCAR NADA DE ESO!!!!

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
