import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../../app.config';
import { Usuario } from '../modelos/usuario';

const PATH = appConfig.apiUrl + '/users';

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Usuario[]>(PATH);
    }

    getById(_id: string) {
        return this.http.get(PATH + '/' + _id);
    }

    create(usuario: Usuario) {
        return this.http.post(PATH + '/register', usuario);
    }

    update(usuario: Usuario) {
        return this.http.put(PATH + '/' + usuario._id, usuario);
    }

    delete(_id: string) {
        return this.http.delete(PATH + '/' + _id);
    }
}