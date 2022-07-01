import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MatrizService {

  private apiUrl = `${environment.URL_API}/matriz`;

  constructor(private http: HttpClient) { }

  //Crear encabezado matriz periodo
  createMatriz(data: any) {
    return this.http.post(this.apiUrl, {
      ...data
    });
  }

  //buscar encabezado periodo matriz por parametros UE y Fecha
  getMatrizByParams(data: any) {
    return this.http.get<any>(`${this.apiUrl}/byParams`, {
      params: data
    });
  }

  //buscar encabezado periodo matriz por id_matriz
  getMatrizById(id_matriz: any) {
    return this.http.get<any>(`${this.apiUrl}/${id_matriz}`);
  }

  //Encontrar encabezados matriz periodos con periodos abiertos 
  findMatrizPeriodoAbierto(data: any) {
    return this.http.get<any>(`${this.apiUrl}/periodoAbierto`, { params: data });
  }

  //Modificar el estado periodo de encabezados matriz periodos
  updateMatriz(id_matriz: any, estado: any) {
    return this.http.patch<any>(`${this.apiUrl}/update/${id_matriz}`, { estado });
  }

  //Eliminacion encabezado matriz periodos
  deleteMatriz(id_matriz: any) {
    return this.http.patch<any>(`${this.apiUrl}/${id_matriz}`, {});
  }

}
