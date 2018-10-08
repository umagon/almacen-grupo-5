import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { AlertService } from '../../alert/alert.service';
import { log } from 'util';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private autenticacionService: AutenticacionService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.autenticacionService.logout();

        // get return url from route parameters or default to '/'
        this.route.queryParams.subscribe(params=> {
            this.returnUrl = params.returnUrl;
        });
    }

    login() {
        this.loading = true;
        this.autenticacionService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl||'/']);
                },
                error => {
                    this.alertService.error(error.message);
                    this.loading = false;
                });
    }
}
