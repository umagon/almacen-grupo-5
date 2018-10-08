import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos/productos.service';
import { finalize } from 'rxjs/operators';
import { PedidosService } from './pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  loading=0;
  pedidos;
  get pedidosPendientes(){
    return this.pedidos.filter(x=>x.estado=='pendiente');
  }
  get pedidosEnviados(){
    return this.pedidos.filter(x=>x.estado=='enviado');
  }
  get pedidosEntregados(){
    return this.pedidos.filter(x=>x.estado=='entregado');
  }
  constructor(private pedidosService: PedidosService) { }


  ngOnInit() {
		this.loading++;
		this.pedidosService.getAll().pipe(
			finalize(() => this.loading--)
		).subscribe(pedidos => this.pedidos = pedidos);
  }

}
