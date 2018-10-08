import { Component, OnInit } from '@angular/core';
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
    return this.pedidos.filter(x=>x.estado=='Pendiente');
  }
  get pedidosEnviados(){
    return this.pedidos.filter(x=>x.estado=='Enviado');
  }
  get pedidosEntregados(){
    return this.pedidos.filter(x=>x.estado=='Entregado');
  }
  constructor(private pedidosService: PedidosService) { }


  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
		this.loading++;
		this.pedidosService.getAll().pipe(
			finalize(() => this.loading--)
    ).subscribe(pedidos => 
      this.pedidos = pedidos);
  }

}
