import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoService {
  private readonly apiReportes = environment.URL_API_REPORTES
  constructor(
    private http: HttpClient
  ) { }

  public generarReporte(dataReporte: any): Observable<any>{
    return this.http.post(`${this.apiReportes}/evaluacion_plan_trabajo`, dataReporte, {
      responseType: 'blob' as 'json'
    })    
  }
}
