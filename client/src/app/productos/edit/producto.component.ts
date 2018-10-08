import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductosService } from '../productos.service';
import { AlertService } from '../../alert/alert.service';

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
	@Input() model;
	@Output() modelChange = new EventEmitter();
	loading = false;

	constructor(
		private usuarioService: ProductosService,
		private alertService: AlertService) { }

	crear() {
		this.loading = true;
		this.usuarioService.create(this.model)
			.subscribe(
				data => {
					this.alertService.success('Producto creado', true);
					this.modelChange.emit(null);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}

	cancelar(){
		this.modelChange.emit(null);
	}
}
