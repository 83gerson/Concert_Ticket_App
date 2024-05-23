import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarseService } from 'src/app/services/registrarse.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage {

  usuario: any;
  constructor(private router: Router, private registrarseService: RegistrarseService, private alertController: AlertController) {
    this.usuario = {
      idUsuario: 0,
      nombre: '',
      apellidos: '',
      fechaNacimiento: '',
      correo: '',
      contrasenna: ''
    };
   }

   confirmar() {
    this.registrarseService.registrarUsuario(this.usuario).subscribe(
      response => {
        if (response) {
          console.log('Usuario registrado exitosamente');
          this.presentAlert('Usuario registrado exitosamente')
          this.limpiarCampos();
        } else {
          console.log('Error al registrar usuario');
        }
      },
      error => {
        console.error('Error en el servicio', error);
        this.presentAlert('Error en el servicio');
      }
    );
  }

  limpiarCampos() {
    this.usuario = {
      idUsuario: 0,
      nombre: '',
      apellidos: '',
      fechaNacimiento: '',
      correo: '',
      contrasenna: ''
    };
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  atras() {
    console.log('Iniciar Sesión');
    this.router.navigate(['/usuario']);
  }

}
