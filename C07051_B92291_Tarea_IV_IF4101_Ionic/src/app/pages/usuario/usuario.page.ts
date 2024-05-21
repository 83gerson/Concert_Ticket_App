import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: 'usuario.page.html',
  styleUrls: ['usuario.page.scss'],
})
export class UsuarioPage{

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  @ViewChild('emailInput', { static: false }) emailInput!: IonInput;
  @ViewChild('passwordInput', { static: false }) passwordInput!: IonInput;

  usuario = null as any;

  login() {
    const email = this.emailInput.value?.toString();
    const password = this.passwordInput.value?.toString();
    // Verificamos los datos del formulario
    if (email !== undefined && password !== undefined) {
      this.usuarioService.buscarUsuario(email, password).subscribe(response => {
        if (response!=null) {
          // Obtenemos el usuario
          this.usuario = response;
          // Se crean los datos necesarios para guardar en la sesión
          const datosUsuario = {
            idUsuario: this.usuario.idUsuario,
            nombre: this.usuario.nombre,
            apellidos: this.usuario.apellidos,
            fechaNacimiento: this.usuario.fechaNacimiento,
            correo: this.usuario.correo
          };
          // Se guarda en sesión
          sessionStorage.setItem('usuarioSesion', JSON.stringify(datosUsuario));
          // Se pasa a la siguiente página
          this.router.navigate(['/concierto'])
        }
      });
    }
  }

  register() {
    console.log('Registrarse');
    this.router.navigate(['/registrarse'])
  }
}
