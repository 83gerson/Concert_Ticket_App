import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage {

  constructor(private router: Router) { }

  confirmar() {
    console.log('Conformar');
  }

  atras() {
    console.log('Iniciar Sesión');
    this.router.navigate(['/usuario']);
  }

}
