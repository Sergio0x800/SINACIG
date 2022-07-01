import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  filtroUsuarios: any = []
  @ViewChild("ingresoUsuarioModal", { static: false }) ingresoUsuarioModal: TemplateRef<any> | undefined;

  RESPONSE_INACTIVAR_USUARIO: any = []

  roles: any = [];
  unidades: any = [];


  id_usuario: any
  id_rol: any = '-1'
  usuario: any
  cui: any
  nombres: any
  apellidos: any
  password: any
  cpassword: any
  usuarioEncontrado: any = {}
  id_unidad_ejecutora: any = '-1'

  formFiltroRiesgo = new FormGroup({
    unidadFiltro: new FormControl(''),
    usuarioFiltro: new FormControl(''),
  })



  constructor(private usuarioService: UsuarioService, private utils: UtilidadesService, private catalogosService: CatalogosService) { }

  async ngOnInit(): Promise<void> {
    await this.obtenerUsuarios()
    this.catalogosService.getRoles().subscribe(roles => this.roles = roles)
    this.catalogosService.getUnidadEjecutora().subscribe(unidad => this.unidades = unidad)
    this.usuarioService.obtenerUsuario().subscribe((result: any) => {
      this.usuarioEncontrado = result
      this.formFiltroRiesgo.get('unidadFiltro')?.setValue(this.usuarioEncontrado.id_unidad_ejecutora)
    })

    this.formFiltroRiesgo.get('unidadFiltro')?.valueChanges.subscribe(unidad => {
      if (unidad == -1) {
        this.filtroUsuarios = this.usuarios
      } else {
        this.filtroUsuarios = this.usuarios.filter((usuario: any) => usuario.id_unidad_ejecutora == unidad)
      }
    })
    this.formFiltroRiesgo.get('usuarioFiltro')?.valueChanges.subscribe(usuarioFil => {
      if (!usuarioFil) {
        if (this.formFiltroRiesgo.get('unidadFiltro')?.value == -1) {
          this.filtroUsuarios = this.usuarios
        } else {
          this.filtroUsuarios = this.usuarios.filter((usuario: any) => usuario.id_unidad_ejecutora == this.formFiltroRiesgo.get('unidadFiltro')?.value)
        }
      } else {
        this.filtroUsuarios = this.filtroUsuarios.filter((usuario: any) => {
          const nameUsuario = usuario.usuario.toLowerCase();
          if (nameUsuario.includes(usuarioFil.toLowerCase())) {
            return usuario
          }
        })
      }
    })
  }

  async obtenerUsuarios() {
    const RESPONSE_USUARIOS: any = await this.usuarioService.obtenerUsuarios()
    this.usuarios = RESPONSE_USUARIOS
  }

  limpiarCampos() {
    this.id_rol = '-1'
    this.id_unidad_ejecutora = '-1'
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
      id_usuario_ingreso: this.usuarioEncontrado.id_usuario,
      id_unidad_ejecutora: this.id_unidad_ejecutora
    }



    this.usuarioService.obtenerUsuariosByCui({ cui: data.cui, user: data.usuario }).subscribe((usuario: any) => {
      let dataUsuario = data.usuario.toLowerCase();
      let getUsuario = usuario.usuario.toLowerCase();
      if (getUsuario == dataUsuario) {
        Swal.fire({
          icon: 'warning',
          text: `¡El nombre de usuario ingresado ya existe en los registros!`,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
      } else {
        Swal.fire({
          icon: 'warning',
          text: `¡El CUI ingresado ya existe en los registros!`,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
      }
    }, err => {
      this.usuarioService.registrarUsuario(data).subscribe((result: any) => {
        this.utils.mostrarExito("Usuario ingresado exitosamente!")
        document.getElementById("ingresoUsuarioCloseButton")?.click();
        this.limpiarCampos()
        this.obtenerUsuarios()
      }, err => {
        this.utils.mostrarError("Error al ingresar el usuario")
      })
    })

    // const RESPONSE_REGISTRO_USUARIO: any = await this.usuarioService.registrarUsuario(data)

  }

  camposValidosNuevoUsuario() {
    if (this.id_rol == '-1') {
      this.utils.mostrarError('Debe seleccionar un rol')
      return false
    }
    if (this.id_unidad_ejecutora == '-1') {
      this.utils.mostrarError('Debe seleccionar una unidad ejecutora')
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
    if (!this.utils.cuiValido(this.cui.toString(), false)) {
      this.utils.mostrarError('Debe ingresar un CUI/DPI válido')
      return false
    }

    return true
  }

  async eliminarUsuario(idUsaurio: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "¡No podrá revertir este cambio!",
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
            text: '¡El registro se elimino correctamente!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
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
            text: '¡No se pudo eliminar el registro!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
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
    this.id_unidad_ejecutora = usuario.id_unidad_ejecutora
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
      id_unidad_ejecutora: this.id_unidad_ejecutora,
      cui: this.cui,
      nombres: this.nombres,
      apellidos: this.apellidos,
      password: this.password,
      id_usuario_ingreso: this.usuarioEncontrado.id_usuario
    }

    const usuariosToEdit = this.usuarios.filter((usuario: any) => {
      if (data.cui == usuario.cui && data.id_usuario != usuario.id_usuario) {
        return usuario
      }
    })

    if (usuariosToEdit.length > 0) {
      Swal.fire({
        icon: 'warning',
        text: `¡El CUI ingresado ya existe en los registros!`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    } else {
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
  }

  camposValidosActualizarUsuario() {
    if (this.id_rol == '-1') {
      this.utils.mostrarError('Debe seleccionar un rol')
      return false
    }
    if (this.id_unidad_ejecutora == '-1') {
      this.utils.mostrarError('Debe seleccionar una unidad ejecutora')
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
