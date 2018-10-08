import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { SeguridadModule } from './seguridad/seguridad.module';
import { AlertModule } from './alert/alert.module';
import { AuthGuard } from './seguridad/guards/auth.guard';
import { ProductosModule } from './productos/productos.module';
import { PedidosModule } from './pedidos/pedidos.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        
        routing,
        SeguridadModule,
        AlertModule,
        ProductosModule,
        PedidosModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    providers: [
        AuthGuard
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule { }
