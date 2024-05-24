import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Zona {
  idZona: number,
  nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  constructor(private http: HttpClient) { }

  private apiUrlZona= 'https://localhost:7239/api/Zona/';

  buscarZonasPorConcierto(idConcierto: string): Observable<Zona[]> {
    return this.http.get<Zona[]>(this.apiUrlZona+'BuscarZonasPorConcierto/'+idConcierto);
  }

  buscarZonaPorConciertoYAsiento(idConcierto: string, idAsiento: string): Observable<Zona> {
    return this.http.get<Zona>(this.apiUrlZona+'buscarZonaPorConciertoYAsiento?idConcierto='+idConcierto+'&idAsiento='+idAsiento);
  }

  buscarPrecioZona(idConcierto: string, idZona: string):Observable<number> {
    return this.http.get<number>(this.apiUrlZona+'BuscarPrecioDeZona?idConcierto='+idConcierto+'&idZona='+idZona);
  }

}
