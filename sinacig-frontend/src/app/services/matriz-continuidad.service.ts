import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatrizContinuidadService {

  private apiUrl = `${environment.URL_API}`;

  constructor(private http: HttpClient) { }

  createMatrizContinuidad(data: any) {
    return this.http.post<any>(`${this.apiUrl}/matriz_continuidad`, data);
  }

  createMetodoMonitoreo(data: any) {
    return this.http.post<any>(`${this.apiUrl}/metodo_monitoreo`, data);
  }

  getMatrizContinuidadByIdRiesgo(id_riesgo: any) {
    return this.http.get<any>(`${this.apiUrl}/matriz_continuidad/${id_riesgo}`);
  }

  getMatrizContinuidadById(id_riesgo_continuidad: any) {
    return this.http.get<any>(`${this.apiUrl}/matriz_continuidad/update/${id_riesgo_continuidad}`);
  }

  getExistenciaMatrizContinuidad(id_matriz: any) {
    return this.http.get<any>(`${this.apiUrl}/matriz_continuidad/existencia/${id_matriz}`);
  }

  getMetodoMonitoreoByIdRiesgoContinuidad(id_riesgo_continuidad: any) {
    return this.http.get<any>(`${this.apiUrl}/metodo_monitoreo/update/${id_riesgo_continuidad}`);
  }

  deleteLogicoMetodoMonitoreo(id_detalle_monitoreo: any) {
    return this.http.patch<any>(`${this.apiUrl}/metodo_monitoreo/delete/${id_detalle_monitoreo}`, { estado_registro: 0 });
  }

  updateMatrizContinuidad(id_riesgo_continuidad: any, changes: any) {
    return this.http.patch<any>(`${this.apiUrl}/matriz_continuidad/updateData/${id_riesgo_continuidad}`, changes);
  }



}
