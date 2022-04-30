import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public listTitles: any[] = [];
  public location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    // var titlee = this.location.prepareExternalUrl(this.location.path());
    // return titlee.split('/')[titlee.split('/').length - 1].toUpperCase()
    return 'Ministerio de Salud Pública y Asistencia Social -MSPAS-'
  }

}
