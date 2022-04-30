import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorrelativoService {

  private apiUrl = `${environment.URL_API}/correlativo`;

  constructor(private http: HttpClient) { }

  createCorrelativo(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getCorrelativo(data: any) {
    return this.http.get<any>(this.apiUrl, {
      params: data
    });
  }
  getUltimoCorrelativo() {
    return this.http.get<any>(this.apiUrl);
  }

  // getMatrizByIdForm(id_matriz: any) {
  //   return this.http.get<any>(`${this.apiUrl}/form/${id_matriz}`);
  // }

  deleteCorrelativo(id_correlativo: any) {
    return this.http.patch<any>(`${this.apiUrl}/${id_correlativo}`, { estado_registro: 0 });
  }
}
