import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: any) {
    localStorage.setItem('token', token)
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  }

}
