import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiesgosService {
  private apiUrl = `${environment.URL_API}/riesgo`;

  constructor(private http: HttpClient) { }

  createRiesgo(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getRiesgosByParams(data: any) {
    const result = this.http.get<any>(this.apiUrl, {
      params: data
    });
    return result;
  }

  getRiesgoByIdMatriz(id_riesgo: any, offset: any) {
    return this.http.get<any>(`${this.apiUrl}/${id_riesgo}/${offset}`);
  }
  getRiesgoById(id_riesgo: any) {
    return this.http.get<any>(`${this.apiUrl}/search/${id_riesgo}`);
  }

  deleteRiesgo(id_riesgo: any) {
    return this.http.patch<any>(`${this.apiUrl}/${id_riesgo}`, { estado_registro: 0 });
  }
  ///update service riesgo
  updateRiesgo(id_riesgo: any, data: any) {
    return this.http.patch<any>(`${this.apiUrl}/update/${id_riesgo}`, data);
  }
  getRiesgoToEdit(id_riesgo: any) {
    return this.http.get<any>(`${this.apiUrl}/update/${id_riesgo}`);
  }

}
