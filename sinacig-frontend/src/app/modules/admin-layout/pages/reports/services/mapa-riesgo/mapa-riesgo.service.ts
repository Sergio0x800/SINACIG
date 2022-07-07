import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapaRiesgoService {
  private readonly apiReportes = environment.URL_API_REPORTES

  constructor(
    private http: HttpClient
  ) { }

  public generarReporte(dataReporte: any): Observable<any>{
    return this.http.post(`${this.apiReportes}/mapa_riesgo`, dataReporte, {
      responseType: 'blob' as 'json'
    })    
  }
}
