import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from '../../productos/productos.service';

@Component({
  selector: 'pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {

  @Input() pedidos;
  constructor(private productoService: ProductosService) { }

  ngOnInit() {
  }

	borrar(id){
		this.productoService.delete(id).subscribe(x=>{
			const i = this.pedidos.findIndex(x=>x._id == id);
			if(i+1) this.pedidos.splice(i,1);
		});
	}
}
