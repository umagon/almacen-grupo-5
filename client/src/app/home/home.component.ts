import { Component, OnInit } from '@angular/core';
import { Usuario } from '../seguridad/modelos/usuario';
import { UsuarioService } from '../seguridad/servicios/usuario.service';


@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    usuarioActual: Usuario;
    usuarios: Usuario[] = [];

    constructor(private usuarioService: UsuarioService) {
        this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    }

    ngOnInit() {
        this.cargarUsuarios();
    }

    borrarUsuario(_id: string) {
        this.usuarioService.delete(_id).subscribe(() => { this.cargarUsuarios() });
    }

    private cargarUsuarios() {
        this.usuarioService.getAll().subscribe(usuarios => { this.usuarios = usuarios; });
    }
}