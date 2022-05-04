import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import Swal from 'sweetalert2'
import { CatalogosService } from 'src/app/services/catalogos.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: any = undefined;
  password: any = undefined;
  token: any = '';


  constructor(private router: Router, private utilidades: UtilidadesService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    return
  }

  async iniciarSesion() {
    if (!this.usuario) {
      this.utilidades.mostrarError('Debe ingresar el usuario')
      return
    }
    if (!this.password) {
      this.utilidades.mostrarError('Debe ingresar la contraseña')
      return
    }

    this.usuarioService.autenticarUsuario({
      usuario: this.usuario,
      password: this.password
    }).subscribe((usuarioAuth: any) => {
      this.token = usuarioAuth.token
      if (this.token) {
        this.utilidades.mostrarExito("Bienvenido al sistema SINACIG")
        this.utilidades.setSessionStorageRol(usuarioAuth.id_rol)
        this.utilidades.setSessionStorageIdUsuario(usuarioAuth.id_usuario)
        this.utilidades.setSessionStorageUsuario(usuarioAuth.usuario)
        this.router.navigate(['/admin']); //redirigimos
      } else {
        this.utilidades.mostrarError(usuarioAuth.msg)
      }
    })

  }

}
