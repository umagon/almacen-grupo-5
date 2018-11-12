import { Producto } from '../productos/producto';

export class Pedido {
  _id: string;
  compra: {
    nro_orden: number;
    producto: Producto;
    cantidad: number;
    descripcion: number;
  };
  estado: string;
  cantidad: number;
  fechaCompra: Date;
  fechaEntrega: Date;
}
