import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatrizService {

  private apiUrl = `${environment.URL_API}/matriz`;

  constructor(private http: HttpClient) { }

  createMatriz(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getMatrizByParams(data: any) {
    return this.http.get<any>(this.apiUrl, {
      params: data
    });
  }

  getMatrizByIdForm(id_matriz: any) {
    return this.http.get<any>(`${this.apiUrl}/form/${id_matriz}`);
  }

  deleteMatriz(id_matriz: any) {
    return this.http.patch<any>(`${this.apiUrl}/${id_matriz}`, { estado_registro: 0 });
  }

  //UPDATE

  getMatrizById(id_matriz: any) {
    return this.http.get<any>(`${this.apiUrl}/update/${id_matriz}`);
  }

  updateMatriz(id_matriz: any, dataMatrizChanges: any) {
    return this.http.patch<any>(`${this.apiUrl}/update/${id_matriz}`, dataMatrizChanges);
  }
}
