import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuarioActual;
  constructor(){
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
  }
}
