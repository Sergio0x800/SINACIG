import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public listTitles: any[] = [];
  public location: Location;
  usuario: any = {};

  // private user = new BehaviorSubject<any>([]);
  // user$ = this.user.asObservable();

  constructor(location: Location, private usuarioService: UsuarioService, private tokenService: TokenService, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    // this.usuarioService.user$.subscribe((usuario: any) => {
    //   this.usuario = usuario.usuario;
    // })
    this.usuarioService.obtenerUsuario().subscribe((result: any) => this.usuario = result)
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    // var titlee = this.location.prepareExternalUrl(this.location.path());
    // return titlee.split('/')[titlee.split('/').length - 1].toUpperCase()
    return 'Ministerio de Salud Pública y Asistencia Social -MSPAS-'
  }

  logOut() {
    this.tokenService.removeToken();
    this.router.navigate(['/auth/login'])
  }

}
