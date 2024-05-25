import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConciertoService } from 'src/app/services/concierto.service';
import { AlertController } from '@ionic/angular';
import { ReservaService } from 'src/app/services/reserva.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.page.html',
  styleUrls: ['./crear-reserva.page.scss'],
})
export class CrearReservaPage implements OnInit {
  @ViewChild('tarjetaHabienteInput', { static: false }) tarjetaHabienteInput!: IonInput;
  @ViewChild('numeroTarjetaInput', { static: false }) numeroTarjetaInput!: IonInput;
  @ViewChild('fechaVencimientoInput', { static: false }) fechaVencimientoInput!: IonInput;
  @ViewChild('cvvInput', { static: false }) cvvInput!: IonInput;

  conciertoId: string = '';
  concierto = null as any;

  constructor(
    private actRoute: ActivatedRoute,
    private conciertoService: ConciertoService,
    private alertController: AlertController,
    private reservaService: ReservaService,
    private router: Router
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
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaObj.getFullYear().toString();
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

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  validarNumeroTarjeta(numeroTarjeta: string): boolean {
    let suma = 0;
    let longitud = numeroTarjeta.length;
    let esPar = false;

    for (let i = longitud - 1; i >= 0; i--) {
      let digito = parseInt(numeroTarjeta.charAt(i));
      
      if (esPar) {
        digito *= 2;

        if (digito > 9) {
          digito -= 9;
        }
      }

      suma += digito;
      esPar = !esPar;
    }

    return suma % 10 === 0;
  }

  async comprar() {
    const tarjetaHabiente = this.tarjetaHabienteInput.value?.toString() || '';
    const numeroTarjeta = this.numeroTarjetaInput.value?.toString() || '';
    const fechaVencimiento = this.fechaVencimientoInput.value?.toString() || '';
    const cvv = this.cvvInput.value?.toString() || '';

    if (!tarjetaHabiente || !numeroTarjeta || !fechaVencimiento || !cvv) {
      await this.presentAlert('Error', 'Por favor llenar todos los campos');
      return;
    }

    if (!this.validarNumeroTarjeta(numeroTarjeta)) {
      await this.presentAlert('Error', 'Número de tarjeta inválido');
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      await this.presentAlert('Error', 'CVV debe ser un número de 3 dígitos');
      return;
    }

    // Aquí continúa el resto de la lógica de la función comprar...
    this.reservaService.buscarIdDisponile().subscribe(
      response => {
        if (response) {
          console.log("idDisponible: " + response);
          const usuarioSesion = sessionStorage.getItem('usuarioSesion');
          const zonaSeleccionada = sessionStorage.getItem('zonaElegida');
          const asientosSeleccionados = sessionStorage.getItem('asientosSeleccionados');

          let asientosArray: number[] = [];
          let usuario: any = null;

          if (asientosSeleccionados !== null && usuarioSesion !== null) {
            asientosArray = JSON.parse(asientosSeleccionados);
            usuario = JSON.parse(usuarioSesion);
          }

          const promises = [];

          for (let index = 0; index < asientosArray.length; index++) {
            if (usuarioSesion && zonaSeleccionada && asientosSeleccionados) {
              const reserva = {
                idReserva: response,
                idUsuario: usuario.idUsuario,
                idConcierto: parseInt(this.conciertoId),
                idAsiento: asientosArray[index],
              }
              promises.push(new Promise<boolean>((resolve) => {
                this.reservaService.registrarReserva(reserva).subscribe(response => {
                  resolve(!!response);
                });
              }));
            }
          }

          Promise.all(promises).then(results => {
            const funciono = results.some(result => result);
            console.log(funciono ? 1 : 0);
            if (funciono) {
              this.presentAlert('Registro', 'Reserva Exitosa!');
              this.limpiarCampos();
              this.router.navigate(['/concierto']);
            }
          }).catch(error => {
            console.error('Error en una de las peticiones', error);
            this.presentAlert('Error', 'Error en una de las peticiones');
          });
        }
      },
      error => {
        console.error('Error en el servicio', error);
        this.presentAlert('Error', 'Error en el servicio');
      }
    );
  }

  limpiarCampos() {
    this.tarjetaHabienteInput.value = '';
    this.numeroTarjetaInput.value = '';
    this.fechaVencimientoInput.value = '';
    this.cvvInput.value = '';
  }
}
