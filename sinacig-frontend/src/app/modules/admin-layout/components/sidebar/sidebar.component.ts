import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  // { path: 'dashboard', title: 'dashboard', icon: 'ni-archive-2 text-default', class: '' },
  { path: 'matriz', title: 'Matriz de riesgos', icon: 'ni-chart-bar-32 text-default', class: '' },
  { path: 'usuarios', title: 'Usuarios', icon: 'ni-circle-08 text-default', class: '' },
];

export const ROUTES_DIGITADOR: RouteInfo[] = [
  // { path: 'dashboard', title: 'dashboard', icon: 'ni-archive-2 text-default', class: '' },
  { path: 'matriz', title: 'Matriz de riesgos', icon: 'ni-chart-bar-32 text-default', class: '' }
];

export const ROUTES_REPORT: RouteInfo[] = [
  { path: 'evaluacion-riesgo-reporte', title: 'Evaluación Riesgo', icon: '', class: '' },
  { path: 'plan-trabajo-reporte', title: 'Plan de Trabajo', icon: '', class: '' },
  { path: 'mapa-riesgo', title: 'Mapa de Riesgo', icon: '', class: '' }
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[] = [];
  public menuItemsReport: any[] = [];
  public isCollapsed = true;
  usuario: any;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.obtenerUsuario().subscribe((result: any) => {
      this.usuario = result
      if (this.usuario.id_rol == 1) {
        this.menuItems = ROUTES
      } else {
        this.menuItems = ROUTES_DIGITADOR
      }
      this.menuItemsReport = ROUTES_REPORT
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    })
  }
}
