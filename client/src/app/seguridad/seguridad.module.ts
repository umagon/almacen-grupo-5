import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AlertModule } from "../alert/alert.module";

import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistracionComponent } from "./registracion/registracion.component";
import { AutenticacionService } from "./servicios/autenticacion.service";
import { UsuarioService } from "./servicios/usuario.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule,
        AlertModule,
        HttpClientModule
    ],
    exports: [
        LoginComponent,
        RegistracionComponent
    ],
    declarations: [
        LoginComponent,
        RegistracionComponent
    ],
    providers: [
        AutenticacionService,
        UsuarioService
    ],
})
export class SeguridadModule { }
