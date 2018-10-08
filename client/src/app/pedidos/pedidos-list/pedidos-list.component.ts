import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PedidosService } from '../pedidos.service';

@Component({
  selector: 'pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

  @Input() pedidos;
  @Output() borrado = new EventEmitter();
  constructor(private pedidoService: PedidosService) { }

  ngOnInit() {
  }

	borrar(id){
		this.pedidoService.delete(id).subscribe(x=>{
			this.borrado.emit(id);
		});
	}
}
