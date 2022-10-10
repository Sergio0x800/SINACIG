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

}
