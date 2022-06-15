import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private apiUrl = `${environment.URL_API}/catalogos`;

  constructor(private http: HttpClient) { }

  getUnidadEjecutora() {
    return this.http.get<any>(this.apiUrl + '/unidad_ejecutora');
  }
  getUnidadEjecutoraById(id_unidad: any) {
    return this.http.get<any>(this.apiUrl + '/unidad_ejecutoraById/' + id_unidad);
  }
  getRoles() {
    return this.http.get<any>(this.apiUrl + '/roles');
  }
  getPeriodos() {
    return this.http.get<any>(this.apiUrl + '/periodos');
  }

  cerrarPeriodo(id_periodo: any) {
    return this.http.patch<any>(`${this.apiUrl}/periodos/${id_periodo}`, { cierre_periodo: 0 });
  }

  getTipoObjetivo() {
    return this.http.get<any>(this.apiUrl + '/tipo_objetivo')
  }
  getSeveridad() {
    return this.http.get<any>(this.apiUrl + '/severidad')
  }
  getAreaEvaluada() {
    return this.http.get<any>(this.apiUrl + '/area_evaluada')
  }
  getEventos() {
    return this.http.get<any>(this.apiUrl + '/eventos')
  }
  getProbabilidad() {
    return this.http.get<any>(this.apiUrl + '/probabilidad')
  }
  getMedidaRiesgo() {
    return this.http.get<any>(this.apiUrl + '/medida_riesgo')
  }
  getPrioridad() {
    return this.http.get<any>(this.apiUrl + '/prioridad')
  }
  getPuestoResponsable() {
    return this.http.get<any>(this.apiUrl + '/puesto_responsable')
  }
  getControlMitigador() {
    return this.http.get<any>(this.apiUrl + '/control_mitigador')
  }

}
