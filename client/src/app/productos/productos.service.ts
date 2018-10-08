import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Producto } from './producto';


const PATH = appConfig.apiUrl + '/products';

@Injectable()
export class ProductosService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Producto[]>(PATH);
    }

    getById(_id: string) {
        return this.http.get(PATH + '/' + _id);
    }

    create(producto: Producto) {
        return this.http.post(PATH, producto);
    }

    update(producto: Producto) {
        return this.http.put(PATH + '/' + producto._id, producto);
    }

    delete(_id: string) {
        return this.http.delete(PATH + '/' + _id);
    }
}