import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { AccordionModule } from "primeng/accordion";
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosService } from './pedidos.service';
import { appConfig } from '../app.config';
import { Pedido } from '../pedidos/pedido';
import { HttpClient } from '@angular/common/http';

const PATH = appConfig.apiUrl + '/pedidos';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
  ],
  exports: [PedidosComponent],
  declarations: [PedidosComponent, PedidosListComponent],
  providers: [PedidosService]
})
export class PedidosModule {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Pedido[]>(PATH);
  }

  getById(_id: string) {
    return this.http.get(PATH + '/' + _id);
  }

  create(pedido: Pedido) {
    return this.http.post(PATH, pedido);
  }

  update(pedido: Pedido) {
    return this.http.put(PATH + '/' + pedido._id, pedido);
  }

  delete(_id: string) {
    return this.http.delete(PATH + '/' + _id);
  }
}
