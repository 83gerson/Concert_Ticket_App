import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ConciertoService } from 'src/app/services/concierto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.page.html',
  styleUrls: ['./concierto.page.scss'],
})
export class ConciertoPage implements OnInit{

  constructor(private router: Router,private conciertoService: ConciertoService, private usuarioService: UsuarioService) { }

  usuarioSesion = null as any;

  conciertos: any[] = [];

  ionViewWillEnter(): void {
    this.obtenerUsuarioSesion();
    this.obtenerConciertos();
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

  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
    const año = fechaObj.getFullYear().toString(); // Tomamos los últimos dos dígitos del año
    return `${dia}/${mes}/${año}`;
  }

  obtenerConciertos(){
    this.conciertoService.listarConciertos().subscribe(response => {
      this.conciertos = response.map(concierto => {
        return {
          ...concierto,
          fechaEvento: this.formatearFecha(concierto.fechaEvento)
        };
      });
    });
  }


}
