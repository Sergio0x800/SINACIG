import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.URL_API}/usuario`;

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get(this.apiUrl).toPromise();
  }

  registrarUsuario(data: any) {
    return this.http.post(this.apiUrl, data).toPromise();
  }

  inactivarUsuario(idUsuario: any) {
    return this.http.delete(this.apiUrl + `/${idUsuario}`);
  }

  actualizarUsuario(data: any) {
    return this.http.put(this.apiUrl, data).toPromise();
  }

  autenticarUsuario(data: any) {
    return this.http.post(this.apiUrl + '/autenticar', data).toPromise();
  }
}
