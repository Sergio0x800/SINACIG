import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocServiceService {
  private apiUrl = `${environment.URL_API}/seguimiento`;


  constructor(private http: HttpClient) { }

  createSeguimiento(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  insertarArchivos(formData: any) {
    return this.http.post(`${this.apiUrl}/archivosSeguimiento`, formData);
  }

  // async getBase64FileCementerio(id_requisito: any) {

  //   return this.http.get<any>(`${this.apiUrl}/utils/doc`, {
  //     params: id_requisito
  //   });

  //   // let params: HttpParams = new HttpParams();
  //   // params = params.set('idRequisito', id_requisito);
  //   // let archivo: any = await this.httpService.get(`${this.ulr_base_cementerio}/utils/doc`, {params: params})
  //   //   .toPromise()
  //   //   .catch(() => {
  //   //     this.toast.error('Error al consultar el archivo de los trámites de cementerio', '');
  //   //   })
  //   // return archivo?.base64;
  // }
}
