import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.page.html',
  styleUrls: ['./concierto.page.scss'],
})
export class ConciertoPage implements OnInit {

  constructor() { }

  usuarioSesion = null as any;

  ngOnInit() {
    this.obtenerUsuarioSesion();
  }

  obtenerUsuarioSesion() {
    const usuarioSesion = sessionStorage.getItem('usuarioSesion');
    if (usuarioSesion) {
      const datosUsuario = JSON.parse(usuarioSesion);
      this.usuarioSesion = datosUsuario;
      console.log(JSON.stringify(this.usuarioSesion));
    } else {
      console.error("No se encontraron datos de usuario en sessionStorage");
    }
  }
}
