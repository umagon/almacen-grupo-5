import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './list/productos.component';
import { ProductosService } from './productos.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductosComponent],
  providers: [ProductosService]
})
export class ProductosModule { }
