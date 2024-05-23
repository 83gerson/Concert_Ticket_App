import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http: HttpClient) { }

  buscarReservasPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7239/api/Reserva/listarReservasPorUsuario/${idUsuario}`);
  }

  buscarAsientoPorId(idAsiento: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7239/api/Asiento/buscarAsientosPorId/${idAsiento}`);
  }

  buscarConciertoPorId(idConcierto: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7239/api/Concierto/BuscarConciertoPorId/${idConcierto}`);
  }

  buscarZonaPorId(idZona: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7239/api/Zona/buscarZonaPorId/${idZona}`);
  }

  buscarUsuario(correo: string, contrasenna: string): Observable<any> {
    return this.http.get<any>(`https://localhost:7239/api/Usuario/BuscarUsuario?correo=${correo}&contrasenna=${contrasenna}`);
  }
}
