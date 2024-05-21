import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: 'usuario.page.html',
  styleUrls: ['usuario.page.scss'],
})
export class UsuarioPage {

  constructor(private router: Router) {}

  login() {
    console.log('Iniciar Sesión');
    this.router.navigate(['/concierto']);
  }

  register() {
    console.log('Registrarse');
    this.router.navigate(['/registrarse'])
  }
}
