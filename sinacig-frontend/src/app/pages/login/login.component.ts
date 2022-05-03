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

    const RESPONSE_AUTENTICACION: any = await this.usuarioService.autenticarUsuario({
      usuario: this.usuario,
      password: this.password
    })

    if (RESPONSE_AUTENTICACION.usuario.id_usuario) {
      this.utilidades.mostrarExito("Bienvenido al sistema SINACIG")
      this.utilidades.setSessionStorageRol(RESPONSE_AUTENTICACION.id_rol)
      this.utilidades.setSessionStorageIdUsuario(RESPONSE_AUTENTICACION.id_usuario)
      this.utilidades.setSessionStorageUsuario(RESPONSE_AUTENTICACION.usuario)
      this.router.navigate(['/admin']); //redirigimos
    } else {
      this.utilidades.mostrarError(RESPONSE_AUTENTICACION.msg)
    }
  }

}
