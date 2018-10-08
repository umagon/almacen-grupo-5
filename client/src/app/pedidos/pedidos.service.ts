import { Injectable } from '@angular/core';
import { appConfig } from '../app.config';
import { Pedido } from './pedido';
import { HttpClient } from '@angular/common/http';


const PATH = appConfig.apiUrl + '/orders';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
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
