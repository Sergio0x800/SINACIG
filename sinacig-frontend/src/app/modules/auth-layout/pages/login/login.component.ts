import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: any = undefined;
  password: any = undefined;
  token: any = '';
  noAutorizado: any = false
  recordarme: boolean = false;


  constructor(private router: Router, private utilidades: UtilidadesService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('SINACIG_USUARIO')
    this.recordarme = !!this.usuario
    this.utilidades.removeItem();
    return
  }

  async iniciarSesion() {
    if (!this.usuario) {
      this.utilidades.mostrarErrorNoti('Debe ingresar un usuario')
      return
    }
    if (!this.password) {
      this.utilidades.mostrarErrorNoti('Debe ingresar una contraseña')
      return
    }

    this.usuarioService.autenticarUsuario({
      usuario: this.usuario,
      password: this.password
    }).subscribe((usuarioAuth: any) => {
      this.token = usuarioAuth.token
      if (this.token) {
        this.utilidades.setSessionStorageRol(usuarioAuth.id_rol)
        this.utilidades.setSessionStorageIdUsuario(usuarioAuth.id_usuario)
        this.utilidades.setSessionStorageUsuario(usuarioAuth.usuario)
        if (this.recordarme) localStorage.setItem('SINACIG_USUARIO', this.usuario)
        else localStorage.removeItem('SINACIG_USUARIO')
        this.router.navigate(['/admin']); //redirigimos
      }
    }, err => {
      if (err.status === 401) {
        this.noAutorizado = true
        this.utilidades.mostrarErrorNoti("Usuario o contraseña incorrecto")
      } else {
        this.utilidades.mostrarErrorNoti('Problemas al conectar con los servicios')
      }
    })

  }

}
