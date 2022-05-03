import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  usuarios: any = []
  @ViewChild("ingresoUsuarioModal", { static: false }) ingresoUsuarioModal: TemplateRef<any> | undefined;

  RESPONSE_INACTIVAR_USUARIO: any = []

  roles: any = [];

  id_usuario: any
  id_rol: any = '-1'
  usuario: any
  cui: any
  nombres: any
  apellidos: any
  password: any
  cpassword: any

  constructor(private usuarioService: UsuarioService, private utils: UtilidadesService, private catalogosService: CatalogosService) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerUsuarios()
    this.catalogosService.getRoles().subscribe(roles => this.roles = roles)
  }

  async obtenerUsuarios() {
    const RESPONSE_USUARIOS: any = await this.usuarioService.obtenerUsuarios()
    this.usuarios = RESPONSE_USUARIOS
  }

  limpiarCampos() {
    this.id_rol = '-1'
    this.usuario = undefined
    this.cui = undefined
    this.nombres = undefined
    this.apellidos = undefined
    this.password = undefined
    this.cpassword = undefined
  }

  async nuevoUsuario() {
    if (!this.camposValidosNuevoUsuario()) return

    let data = {
      id_rol: this.id_rol,
      usuario: this.usuario,
      cui: this.cui,
      nombres: this.nombres,
      apellidos: this.apellidos,
      password: this.password,
      id_usuario_ingreso: 1
    }

    const RESPONSE_REGISTRO_USUARIO: any = await this.usuarioService.registrarUsuario(data)

    if (RESPONSE_REGISTRO_USUARIO.result = 'ok') {
      this.utils.mostrarExito(RESPONSE_REGISTRO_USUARIO.msg)
      document.getElementById("ingresoUsuarioCloseButton")?.click();
      this.limpiarCampos()
      this.obtenerUsuarios()
    } else {
      this.utils.mostrarError(RESPONSE_REGISTRO_USUARIO.msg)
    }
  }

  camposValidosNuevoUsuario() {
    if (this.id_rol == '-1') {
      this.utils.mostrarError('Debe seleccionar un rol')
      return false
    }
    if (!this.usuario) {
      this.utils.mostrarError('Debe ingresar un usuario')
      return false
    }
    if (!this.password) {
      this.utils.mostrarError('Debe ingresar una constraseña')
      return false
    }
    if (this.password != this.cpassword) {
      this.utils.mostrarError('Las contraseñas no coinciden')
      return false
    }
    if (!this.nombres) {
      this.utils.mostrarError('Debe ingresar los nombres')
      return false
    }
    if (!this.apellidos) {
      this.utils.mostrarError('Debe ingresar los apellidos')
      return false
    }
    if (!this.utils.cuiValido(this.cui, false)) {
      this.utils.mostrarError('Debe ingresar un CUI/DPI válido')
      return false
    }

    return true
  }

  async eliminarUsuario(idUsaurio: any) {
    Swal.fire({
      title: 'Estas seguro de eliminar este registro?',
      text: "No podrás revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.inactivarUsuario(idUsaurio).subscribe((value) => {
          Swal.fire({
            icon: 'success',
            text: 'El registro se elimino correctamente!'
          });
          this.RESPONSE_INACTIVAR_USUARIO = value;
          if (this.RESPONSE_INACTIVAR_USUARIO.result = 'ok') {
            this.utils.mostrarExito(this.RESPONSE_INACTIVAR_USUARIO.msg)
            this.obtenerUsuarios()
          } else {
            this.utils.mostrarError(this.RESPONSE_INACTIVAR_USUARIO.msg)
          }
        }, err => {
          Swal.fire({
            icon: 'error',
            text: 'No se pudo eliminar el registro!'
          })
        });
      }
    })








    // this.usuarioService.inactivarUsuario(idUsaurio).subscribe((value) => {
    //   Swal.fire({
    //     icon: 'success',
    //     text: 'El registro se elimino correctamente!'
    //   });
    //   this.RESPONSE_INACTIVAR_USUARIO = value;
    //   if (this.RESPONSE_INACTIVAR_USUARIO.result = 'ok') {
    //     this.utils.mostrarExito(this.RESPONSE_INACTIVAR_USUARIO.msg)
    //     this.obtenerUsuarios()
    //   } else {
    //     this.utils.mostrarError(this.RESPONSE_INACTIVAR_USUARIO.msg)
    //   }
    // }, err {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'No se pudo eliminar el registro!'
    //   })
    // })



    // const RESPONSE_INACTIVAR_USUARIO: any = await this.usuarioService.inactivarUsuario(idUsaurio)
  }

  buscarUsuarioParaActualizar(usuario: any) {
    this.id_usuario = usuario.id_usuario
    this.id_rol = usuario.id_rol
    this.usuario = usuario.usuario
    this.cui = usuario.cui
    this.nombres = usuario.nombres
    this.apellidos = usuario.apellidos
    document.getElementById("mostrarModalEditar")?.click();
  }

  async actualizarUsuario() {
    if (!this.camposValidosActualizarUsuario()) return

    let data = {
      id_usuario: this.id_usuario,
      id_rol: this.id_rol,
      cui: this.cui,
      nombres: this.nombres,
      apellidos: this.apellidos,
      password: this.password,
      id_usuario_ingreso: this.utils.getSessionStorageIdUsuario()
    }

    const RESPONSE_ACTUALIZAR_USUARIO: any = await this.usuarioService.actualizarUsuario(data)

    if (RESPONSE_ACTUALIZAR_USUARIO.result = 'ok') {
      this.utils.mostrarExito(RESPONSE_ACTUALIZAR_USUARIO.msg)
      document.getElementById("editarUsuarioCloseButton")?.click();
      this.limpiarCampos()
      this.obtenerUsuarios()
    } else {
      this.utils.mostrarError(RESPONSE_ACTUALIZAR_USUARIO.msg)
    }
  }

  camposValidosActualizarUsuario() {
    if (this.id_rol == '-1') {
      this.utils.mostrarError('Debe seleccionar un rol')
      return false
    }
    if (!this.usuario) {
      this.utils.mostrarError('Debe ingresar un usuario')
      return false
    }
    if (this.password && this.password != this.cpassword) {
      this.utils.mostrarError('Las contraseñas no coinciden')
      return false
    }
    if (!this.nombres) {
      this.utils.mostrarError('Debe ingresar los nombres')
      return false
    }
    if (!this.apellidos) {
      this.utils.mostrarError('Debe ingresar los apellidos')
      return false
    }
    if (!this.utils.cuiValido(this.cui.toString(), false)) {
      this.utils.mostrarError('Debe ingresar un CUI/DPI válido')
      return false
    }

    return true
  }

}
