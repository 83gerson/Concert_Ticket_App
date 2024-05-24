import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConciertoService } from 'src/app/services/concierto.service';
import { AlertController } from '@ionic/angular';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.page.html',
  styleUrls: ['./crear-reserva.page.scss'],
})
export class CrearReservaPage implements OnInit {

  conciertoId: string = '';
  concierto = null as any;

  constructor(
    private actRoute: ActivatedRoute,
    private conciertoService: ConciertoService,
    private alertController: AlertController,
    private reservaService: ReservaService
  ) 
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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  comprar(){
    // Se obtiene como tal un valor válido del para la reserva
    this.reservaService.buscarIdDisponile().subscribe(
      response => {
        if (response) {
          console.log("idDisponibla: "+response);
          const usuarioSesion = sessionStorage.getItem('usuarioSesion');
          const zonaSeleccionada = sessionStorage.getItem('zonaElegida');
          const asientosSeleccionados = sessionStorage.getItem('asientosSeleccionados');

          let asientosArray: number[] = [];
          let usuario: any = null;

          if (asientosSeleccionados !== null &&
              usuarioSesion !== null) 
          {
            asientosArray = JSON.parse(asientosSeleccionados);
            usuario = JSON.parse(usuarioSesion);
          }

          const promises = [];

          for (let index = 0; index < asientosArray.length; index++) {
            // Se debe agrear las promesas, que son los subscribe para cada asiento, lo cual se usará con Promise.all
            if (usuarioSesion && zonaSeleccionada && asientosSeleccionados) {
              // Objeto reserva que se insertará
              const reserva = {
                idReserva: response,
                idUsuario: usuario.idUsuario,
                idConcierto: parseInt(this.conciertoId),
                idAsiento: asientosArray[index],
              }
              // Guardar las promesas
              promises.push(new Promise<boolean>((resolve) => {
                this.reservaService.registrarReserva(reserva).subscribe(response => {
                  if (response) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                });
              }));
            }
          }

          //Ejecutar las promesas
          Promise.all(promises).then(results => {
            // Se hacen todas las promesas y se verifica un resultado
            const funciono = results.some(result => result);
            console.log(funciono ? 1 : 0);
            if (funciono) {
              this.presentAlert('Reserva Exitosa!');
            }
          }).catch(error => {
            console.error('Error en una de las peticiones', error);
            this.presentAlert('Error en una de las peticiones');
          });
        }
      },
      error => {
        console.error('Error en el servicio', error);
        this.presentAlert('Error en el servicio');
      }
    );
  }

}
