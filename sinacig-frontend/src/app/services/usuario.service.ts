import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.URL_API}`;

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get(`${this.apiUrl}/usuario`).toPromise();
  }

  registrarUsuario(data: any) {
    return this.http.post(`${this.apiUrl}/usuario`, data).toPromise();
  }

  inactivarUsuario(idUsuario: any) {
    return this.http.delete(`${this.apiUrl}/usuario` + `/${idUsuario}`);
  }

  actualizarUsuario(data: any) {
    return this.http.put(`${this.apiUrl}/usuario`, data).toPromise();
  }

  autenticarUsuario(data: any) {
    return this.http.post(this.apiUrl + '/auth/login', data).toPromise();
  }
}
