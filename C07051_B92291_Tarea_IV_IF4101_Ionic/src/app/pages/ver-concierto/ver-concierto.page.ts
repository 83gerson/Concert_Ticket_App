import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsientoService } from 'src/app/services/asiento.service';
import { ConciertoService } from 'src/app/services/concierto.service';
import { ZonaService } from 'src/app/services/zona.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ver-concierto',
  templateUrl: './ver-concierto.page.html',
  styleUrls: ['./ver-concierto.page.scss'],
})
export class VerConciertoPage implements OnInit {

  conciertoId: string = '';
  concierto = null as any;
  limiteAsientos: number = 0;

  zonas: any[] = [];
  zonaSeleccionada: string = '';
  precioZonaSleccionada: number = 0;

  asientosSeleccionados: any[] = [];
  asientos: any[] = [];

  constructor(private router: Router, private actRoute: ActivatedRoute, private conciertoService: ConciertoService, private zonaService: ZonaService, private asientoService: AsientoService, private alertController: AlertController) 
  { 
    this.conciertoId = this.actRoute.snapshot.paramMap.get('id') as string;
    console.log(this.conciertoId);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerConcierto();
    this.obtenerZonas();
  }

  async reservar() {
    if (!this.zonaSeleccionada || this.asientosSeleccionados.length === 0 || this.asientosSeleccionados.length === this.limiteAsientos) {
      await this.presentAlert('Error', 'Por favor selecciona una zona, al menos un asiento y no más de 3 asientos');
      return;
    }
    sessionStorage.setItem('zonaElegida', this.zonaSeleccionada);
    sessionStorage.setItem('asientosSeleccionados', JSON.stringify(this.asientosSeleccionados));
    this.router.navigate(['/crear-reserva/', this.conciertoId]);
  }  

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  limitarAsientos() {
    if (this.asientosSeleccionados.length > this.limiteAsientos) {
      this.asientosSeleccionados = this.asientosSeleccionados.slice(0, this.limiteAsientos);
    }
  }

  cambiarZona(idZonaSeleccionada: string) {
    this.obtenerAsientos(idZonaSeleccionada);
    this.obtenerPreioZona(idZonaSeleccionada);
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
      //Obtener los asientos la primera vez
      if (this.zonas.length > 0) {
        this.obtenerAsientos(this.zonas[0].idZona);
      }
    });
  }

  obtenerAsientos(idZona: string){
    this.asientoService.buscarAsientosDisponibles(this.conciertoId, idZona).subscribe(response => {
      this.asientos = response;
    });
  }

  obtenerPreioZona(idZona: string){
    this.zonaService.buscarPrecioZona(this.conciertoId, idZona).subscribe(response => {
      if (response) {
        this.precioZonaSleccionada = response;
      }
    });
  }
}
