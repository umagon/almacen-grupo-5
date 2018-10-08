import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './list/productos.component';
import { ProductosService } from './productos.service';
import { ProductoComponent } from './edit/producto.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ProductosComponent,
    ProductoComponent
  ],
  providers: [ProductosService]
})
export class ProductosModule { }
