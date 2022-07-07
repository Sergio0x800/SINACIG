import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private apiUrl = `${environment.URL_API}/log`;

  constructor(private http: HttpClient) { }

  createLog(data: any) {
    return this.http.post(this.apiUrl, data);
  }

}
