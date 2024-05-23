import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

interface Usuario {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  correo: string;
  contrasenna: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrarseService {

  private apiUrl = 'https://localhost:7239/api/Usuario';  

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: Usuario): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/RegistrarUsuario`, usuario);
  }
}
