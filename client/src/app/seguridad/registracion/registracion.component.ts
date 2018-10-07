import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { AlertService } from '../../alert/alert.service';

@Component({
    templateUrl: 'registracion.component.html'
})

export class RegistracionComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private usuarioService: UsuarioService,
        private alertService: AlertService) { }

    registrarse() {
        this.loading = true;
        this.usuarioService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registración exitosa', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
