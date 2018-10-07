import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../../app.config';
import { Usuario } from '../modelos/usuario';

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Usuario[]>(appConfig.apiUrl + '/usuarios');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/usuarios/' + _id);
    }

    create(usuario: Usuario) {
        return this.http.post(appConfig.apiUrl + '/usuarios/register', usuario);
    }

    update(usuario: Usuario) {
        return this.http.put(appConfig.apiUrl + '/usuarios/' + usuario._id, usuario);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/usuarios/' + _id);
    }
}