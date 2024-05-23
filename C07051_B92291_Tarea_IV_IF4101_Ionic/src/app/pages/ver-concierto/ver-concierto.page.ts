import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConciertoService } from 'src/app/services/concierto.service';
import { ZonaService } from 'src/app/services/zona.service';

@Component({
  selector: 'app-ver-concierto',
  templateUrl: './ver-concierto.page.html',
  styleUrls: ['./ver-concierto.page.scss'],
})
export class VerConciertoPage implements OnInit {

  conciertoId: string = '';
  concierto = null as any;
  limiteAsientos: number = 3;

  zonas: any[] = [];

  asientosSeleccionados: any[] = [];
  asientos: any[] = [
    { id: 1, nombre: 'Asiento 1' },
    { id: 2, nombre: 'Asiento 2' },
    { id: 3, nombre: 'Asiento 3' },
    { id: 4, nombre: 'Asiento 4' },
    { id: 5, nombre: 'Asiento 5' }
  ];

  constructor(private actRoute: ActivatedRoute, private conciertoService: ConciertoService, private zonaService: ZonaService) 
  { 
    this.conciertoId = this.actRoute.snapshot.paramMap.get('id') as string
    console.log(this.conciertoId);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerConcierto();
    this.obtenerZonas();
  }

  limitarAsientos() {
    if (this.asientosSeleccionados.length > this.limiteAsientos) {
      this.asientosSeleccionados = this.asientosSeleccionados.slice(0, this.limiteAsientos);
    }
  }

  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11
    const año = fechaObj.getFullYear().toString(); // Tomamos el año completo
    return `${dia}/${mes}/${año}`;
  }

  obtenerConcierto() {
    this.conciertoService.buscarConciertoPorId(this.conciertoId).subscribe({
      next: (res: any) => {
        res.fechaEvento = this.formatearFecha(res.fechaEvento);
        this.concierto = res;
      },
      error: (error: any) => {
        console.error('Error al obtener el concierto', error);
      }
    });
  }

  obtenerZonas(){
    this.zonaService.buscarZonasPorConcierto(this.conciertoId).subscribe(response => {
      this.zonas = response;
    });
  }
}
