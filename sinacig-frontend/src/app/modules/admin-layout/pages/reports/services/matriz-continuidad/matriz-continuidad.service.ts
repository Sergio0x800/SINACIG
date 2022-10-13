import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatrizContinuidadService {

  private readonly apiReportes = environment.URL_API_REPORTES

  constructor(
    private http: HttpClient
  ) { }

  public generarReporte(dataReporte: any): Observable<any> {
    return this.http.post(`${this.apiReportes}/matriz_continuidad`, dataReporte, {
      responseType: 'blob' as 'json'
    })
  }
}
