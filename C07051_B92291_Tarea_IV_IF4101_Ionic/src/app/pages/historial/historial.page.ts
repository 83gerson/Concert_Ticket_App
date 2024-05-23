import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  reservas: any[] = [];

  constructor(private historialService: HistorialService) { }

  ngOnInit() {
    this.buscarReservasPorUsuario();
  }

  buscarReservasPorUsuario() {
    // Suponiendo que tienes el ID del usuario almacenado en alguna variable llamada 'idUsuario'
    const idUsuario = 1; // Reemplaza 1 con el ID real del usuario

    this.historialService.buscarReservasPorUsuario(idUsuario).subscribe(
      (reservas: any[]) => {
        this.reservas = reservas;
        // Por cada reserva, llamas a los otros métodos del servicio para obtener información adicional
        this.reservas.forEach(reserva => {
          this.buscarConcierto(reserva.idConcierto);
          this.buscarUsuario(reserva.correo, reserva.contrasenna);
        });
      },
      error => {
        console.error('Error al buscar reservas:', error);
      }
    );
  }

  buscarConcierto(idConcierto: number) {
    this.historialService.buscarConciertoPorId(idConcierto).subscribe(
      (concierto: any) => {
        // Aquí puedes hacer lo que necesites con la información del concierto
        console.log('Concierto:', concierto);
      },
      error => {
        console.error('Error al buscar concierto:', error);
      }
    );
  }

  buscarUsuario(correo: string, contrasenna: string) {
    this.historialService.buscarUsuario(correo, contrasenna).subscribe(
      (usuario: any) => {
        // Aquí puedes hacer lo que necesites con la información del usuario
        console.log('Usuario:', usuario);
      },
      error => {
        console.error('Error al buscar usuario:', error);
      }
    );
  }

}
