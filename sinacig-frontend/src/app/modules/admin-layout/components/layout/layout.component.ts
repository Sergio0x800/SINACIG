import { Component, OnInit } from '@angular/core';
import { Idle } from 'idlejs';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  idle = new Idle()
  .whenNotInteractive()
  .within(15)
  .do(() => this.logoutUser())
  .start();

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.tokenService.removeToken();
    this.router.navigate(['/auth/login'])
    Swal.fire({
      icon: 'warning',
      text: 'La sesión se ha cerrado por inactividad!'
    })
  }

}
