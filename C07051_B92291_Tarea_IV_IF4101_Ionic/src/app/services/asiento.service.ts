import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Asiento {
  idAsiento: number,
  numero: string
}

@Injectable({
  providedIn: 'root'
})
export class AsientoService {

  constructor(private http: HttpClient) { }

  private apiUrlZona= 'https://localhost:7239/api/Asiento/';

  buscarAsientoPorId(idAsiento: string): Observable<Asiento> {
    return this.http.get<Asiento>(this.apiUrlZona+'buscarAsientosPorId/'+idAsiento);
  }

  buscarAsientosDisponibles(idConcierto: string, idZona: string): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(this.apiUrlZona+'buscarAsientosDisponibles?idConcierto='+idConcierto+'&idZona='+idZona);
  }
}
