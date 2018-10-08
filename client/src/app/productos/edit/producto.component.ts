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
	@Output() exito = new EventEmitter();
	loading = false;

	constructor(
		private usuarioService: ProductosService,
		private alertService: AlertService) { }

	crear() {
		this.loading = true;
		const obs = this.model._id? this.usuarioService.update(this.model): this.usuarioService.create(this.model);
		obs.subscribe(
				data => {
					this.alertService.success('Producto creado', true);
					this.modelChange.emit(null);
					this.exito.emit(this.model);
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
