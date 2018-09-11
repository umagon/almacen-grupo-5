import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor() {}

  logIn(userName: string, password: string) {
    console.log('Se intenta loguear');
  }
}
