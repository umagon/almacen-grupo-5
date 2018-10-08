import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { appConfig } from '../../app.config';

const PATH = appConfig.apiUrl + '/users';

@Injectable()
export class AutenticacionService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(PATH, { username: username, password: password })
            .pipe(map(usuario => {
                // Login exitoso si hay un token jwt en localstorage
                if (usuario && usuario.token) {
                    // Metemos los datos del usuario y el token jwt en el localstorage
                    // para logear al usuario
                    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
                }

                return usuario;
            }));
    }

    logout() {
        // Sacamos al usuario del local storage para salir.
        localStorage.removeItem('usuarioActual');
    }
}