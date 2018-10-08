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
	constructor(private productoService: ProductosService) {
	}

	ngOnInit() {

		this.loading++;
		this.productoService.getAll().pipe(
			finalize(() => this.loading--)
		).subscribe(prods => this.productos = prods);
	}

}
