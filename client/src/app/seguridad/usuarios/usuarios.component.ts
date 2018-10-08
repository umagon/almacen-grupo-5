import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
	loading=0;
	usuarios;
	constructor(private usuarioService: UsuarioService) { }

	ngOnInit() {
		this.cargarUsuarios();
	}

	borrarUsuario(_id: string) {
		this.loading++;
		this.usuarioService.delete(_id)
		.pipe(finalize(()=>this.loading--))
		.subscribe(() => { 
			this.cargarUsuarios() });
	}
	cargarUsuarios() {
		this.loading++;
		this.usuarioService.getAll()
		.pipe(finalize(()=>this.loading--))
		.subscribe(usuarios => { 
			this.usuarios = usuarios; });
	}
}
