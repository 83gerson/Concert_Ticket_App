import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConciertoService } from 'src/app/services/concierto.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.page.html',
  styleUrls: ['./crear-reserva.page.scss'],
})
export class CrearReservaPage implements OnInit {

  conciertoId: string = '';
  concierto = null as any;

  constructor(private actRoute: ActivatedRoute, private conciertoService: ConciertoService) 
  { 
    this.conciertoId = this.actRoute.snapshot.paramMap.get('id') as string;
    console.log(this.conciertoId);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerConcierto();
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

  comprar(){}

}
