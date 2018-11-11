# TO-DO

Preguntar lo siguiente:
- Estructura de la respuesta que espera Almacen del método "enviarCompra".
- Cómo espera Logística que sea el método que recibe un JSON de los pedidos que ya fueron entregados.
- Cómo se debe llamar el archivo .json que se les deja en el ftp (y la url, user/contraseña) a Logistica.
- Qué es eso de getOrdenExpedicion en el DOC que está en el drive de COMUNICACION ALMACEN LOGISTICA.docx? Las ordenes de expedición se dejan en archivo formato .json en un ftp...


- Separar el archivo de spec (el de test jasmine) en distintos scopes con las distintas pruebas, agregar los que faltan (faltan varios).
- Agregar Test Unitario de Front!
- Verificar los nombres del front, hay duplicados en distintos archivos
- Completar las funcionalidades del front/back.
Front:
	- Mejorar las funciones de login y de administracion de usuarios.
	- Cuando se manda mail para comprar tras pasar el stock minimo, hay que mostrarlo en algnu lado.
Back:
	- Cuando se hace un pedido, y el stock de un producto queda por debajo del minimo, enviar mail.
	- Hacer los métodos HTTP:
		- getStock: consulta de stock de un producto
			- GET -> getStock/{codBarra}: 
			- Response: {"codBarra":"56565", "cantidad": 30 }
		- enviarCompra: reserva cierto stock de un producto, creando un pedido.
			- POST -> enviarCompra:
			- Request Body: {
					nro_orden: “001242”,
					cliente:{
						nombre:”nombre”,
						apellido:”apellido”,
						mail:”mail”,
						direccion:”direccion”
					},
					producto:{
						codBarra: “012201”,
						cantidad: 3
					}
				}
			- Response: ?
	- Hacer un cron que diariamente deje un archivo "ordenes-DDMMYYYY.json" y recupere un archivo "delivered-YYYY-MM-DD.json".

- Acomodar las tarjetas de trello.
	Basarse en las funcionalidades ya hechas para hacer las faltantes, que serían los métodos HTTP de la integración (con Logistica, que es uno, y con Almacen, que son 2, uno de consulta de stock de un producto y otro que registra una compra)

- Agregar todos los casos de prueba. De este tipo, usar la imaginación:

    Prueba: Se intento loguear al sistema con un usuario que no existe.
    Se espera: No se puede ingresar al sistema. Mostrar un error descriptivo
    Resultado: OK / No Ok

- Discriminar criticidad: clasificar en alta, media, baja. Hacer una tablita que informe la cantidad de casos de cada clasificación.

- Definir criterios de aceptación
