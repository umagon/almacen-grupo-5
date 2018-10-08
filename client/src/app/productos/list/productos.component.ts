import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { finalize, tap } from 'rxjs/operators';

@Component({
	selector: 'productos',
	templateUrl: './productos.component.html',
	styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
	loading = 0;

	productoActual;
	productos;
	copy = Object.assign;
	constructor(private productoService: ProductosService) {
	}

	ngOnInit() {
		this.loading++;
		this.productoService.getAll().pipe(
			finalize(() => this.loading--)
		).subscribe(prods => this.productos = prods);
	}

	nuevo(producto){
		if(producto){
			const i = this.productos.findIndex(x=>x._id == producto._id);
			if(i+1) this.productos.splice(i,1, producto);
			else this.productos.push(producto);
		}
	}

	borrar(id){
		this.productoService.delete(id).subscribe(x=>{
			const i = this.productos.findIndex(x=>x._id == id);
			if(i+1) this.productos.splice(i,1);
		});
	}
}
