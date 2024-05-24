import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Reserva {
  idReserva: number,
  idUsuario: number,
  idConcierto: number,
  idAsiento: number,
  total?: number 
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  private apiUrlReserva = 'https://localhost:7239/api/Reserva/';

  listarReservasPorUsuario(idUsuario: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrlReserva+'listarReservasPorUsuario/'+idUsuario);
  }

  calcularTotal(idReserva: number): Observable<number> {
    return this.http.get<number>(this.apiUrlReserva+'calcularTota/'+idReserva);
  }

}
