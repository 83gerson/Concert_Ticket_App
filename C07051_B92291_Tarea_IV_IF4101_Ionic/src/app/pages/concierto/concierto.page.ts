import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.page.html',
  styleUrls: ['./concierto.page.scss'],
})
export class ConciertoPage implements OnInit{

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  usuarioSesion = null as any;

  ionViewWillEnter(): void {
    this.obtenerUsuarioSesion();
  }

  ngOnInit() {
    //this.obtenerUsuarioSesion();
  }

  obtenerUsuarioSesion() {
    // this.usuarioSesion = this.usuarioService.retornarUsuarioSesion();
    // if (this.usuarioSesion) {
    //   console.log(JSON.stringify(this.usuarioSesion));
    // } else {
    //   //console.error("No se encontraron datos de usuario en sessionStorage");
    //   if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    //     this.router.navigate(['/usuario']);
    //   }
    // }

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
