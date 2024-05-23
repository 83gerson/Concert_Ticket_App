import { Component, OnInit } from '@angular/core';
import { ConciertoService } from 'src/app/services/concierto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ZonaService } from 'src/app/services/zona.service';
import { AsientoService } from 'src/app/services/asiento.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  reservas: any[] = [];
  usuarioSesion: any;

  constructor(
    private conciertoService: ConciertoService,
    private usuarioService: UsuarioService,
    private reservaService: ReservaService,
    private zonaService: ZonaService,
    private asientoService: AsientoService
  ) { }

  ngOnInit() {
    const usuarioSesionString = sessionStorage.getItem('usuarioSesion');
    if (usuarioSesionString) {
      this.usuarioSesion = JSON.parse(usuarioSesionString);
      console.log('Usuario en sesión:', this.usuarioSesion);
      this.buscarReservasPorUsuario(this.usuarioSesion.idUsuario);
    } else {
      console.error('No hay usuario en sesión');
    }
  }

  buscarReservasPorUsuario(idUsuario: number) {
    this.reservaService.listarReservasPorUsuario(idUsuario).subscribe(
      (reservas: any) => {
        console.log('Reservas encontradas:', reservas);
        const reservasMap = new Map<number, any>();

        reservas.forEach((reserva: any) => {
          if (!reservasMap.has(reserva.idReserva)) {
            reservasMap.set(reserva.idReserva, { ...reserva, asientos: [] });
          }
          this.buscarConcierto(reserva.idConcierto, reservasMap.get(reserva.idReserva));
          this.buscarZonaPorConciertoYAsiento(reserva.idConcierto, reserva.idAsiento, reservasMap.get(reserva.idReserva));
          this.buscarAsiento(reserva.idAsiento, reservasMap.get(reserva.idReserva));
        });

        this.reservas = Array.from(reservasMap.values());
      },
      error => {
        console.error('Error al buscar reservas:', error);
      }
    );
  }

  buscarConcierto(idConcierto: string, reserva: any) {
    this.conciertoService.buscarConciertoPorId(idConcierto).subscribe(
      (concierto: any) => {
        console.log('Concierto encontrado:', concierto);
        reserva.concierto = concierto;
      },
      error => {
        console.error('Error al buscar concierto:', error);
      }
    );
  }

  buscarZonaPorConciertoYAsiento(idConcierto: string, idAsiento: string, reserva: any) {
    this.zonaService.buscarZonaPorConciertoYAsiento(idConcierto, idAsiento).subscribe(
      (zona: any) => {
        console.log('Zona encontrada:', zona);
        reserva.zona = zona;
      },
      error => {
        console.error('Error al buscar zona:', error);
      }
    );
  }

  buscarAsiento(idAsiento: string, reserva: any) {
    this.asientoService.buscarAsientoPorId(idAsiento).subscribe(
      (asiento: any) => {
        console.log('Asiento encontrado:', asiento);
        if (!reserva.asientos) {
          reserva.asientos = [];
        }
        reserva.asientos.push(asiento.numero);
      },
      error => {
        console.error('Error al buscar asiento:', error);
      }
    );
  }
}
