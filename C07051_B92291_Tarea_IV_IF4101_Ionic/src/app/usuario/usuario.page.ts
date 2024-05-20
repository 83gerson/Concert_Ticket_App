import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: 'usuario.page.html',
  styleUrls: ['usuario.page.scss'],
})
export class UsuarioPage {

  constructor() {}

  login() {
    console.log('Iniciar Sesión');
  }

  register() {
    console.log('Registrarse');
  }
}
