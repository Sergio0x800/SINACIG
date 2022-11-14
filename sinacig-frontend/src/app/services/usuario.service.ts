import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.URL_API}`;

  private user = new BehaviorSubject<any>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  obtenerUsuarios() {
    return this.http.get(`${this.apiUrl}/usuario`);
  }

  obtenerUsuariosByCui(data: any) {
    return this.http.get(`${this.apiUrl}/usuario/verifica`, {
      params: data
    });
  }

  obtenerUsuario() {
    return this.http.get(`${this.apiUrl}/usuario/profile`)
      .pipe(
        tap((user: any) => this.user.next(user))
      );
  }

  registrarUsuario(data: any) {
    return this.http.post(`${this.apiUrl}/usuario`, data);
  }

  inactivarUsuario(idUsuario: any) {
    return this.http.delete(`${this.apiUrl}/usuario` + `/${idUsuario}`);
  }

  actualizarUsuario(data: any) {
    return this.http.put(`${this.apiUrl}/usuario`, data).toPromise();
  }

  autenticarUsuario(data: any) {
    return this.http.post(this.apiUrl + '/auth/login', data)
      .pipe(
        tap((response: any) => this.tokenService.saveToken(response.token)),
        tap((user: any) => this.user.next(user))
      );
  }
}
