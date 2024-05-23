import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Concierto {
  idConcierto: number,
  artista: string,
  imagen: string,
  fechaEvento: string,
  lugar: string
}

@Injectable({
  providedIn: 'root'
})
export class ConciertoService {

  constructor(private http: HttpClient) { }

  private apiUrlConcierto = 'https://localhost:7239/api/Concierto/';

  listarConciertos(): Observable<Concierto[]> {
    return this.http.get<Concierto[]>(this.apiUrlConcierto+'ListarConciertos');
  }
}
