import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  DATOS_USUARIO: any = {
    rol: 'rol',
    usuario: 'usuario',
    nombres: 'nombres',
    apellidos: 'apellidos',
    id_usuario: 'id_usuario',
  }

  constructor() { }

  private toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  })

  // private alertaExito = Swal.fire({
  //   icon: 'success',
  //   confirmButtonColor: '#3085d6',
  //   confirmButtonText: 'Aceptar'
  // })

  // alertaExito()

  mostrarError(mensaje: string) {
    this.toast.fire({
      icon: 'error',
      title: mensaje
    })
  }

  mostrarExito(mensaje: any) {
    this.toast.fire({
      icon: 'success',
      title: mensaje
    })
  }

  cuiValido(cui: string, notificarError: boolean = true, preMensaje: string = '') {
    if (!cui || cui.length < 13) {
      if (notificarError) this.mostrarError(`${preMensaje}CUI invalido, debe contener 13 dígitos.`)
      return false;
    }
    var depto = parseInt(cui.substring(9, 11), 10);
    var muni = parseInt(cui.substring(11, 13));
    var numero = cui.substring(0, 8);
    var verificador = parseInt(cui.substring(8, 9));

    // Se asume que la codificación de Municipios y 
    // departamentos es la misma que esta publicada en 
    // http://goo.gl/EsxN1a

    // Listado de municipios actualizado segun:
    // http://goo.gl/QLNglm

    // Este listado contiene la cantidad de municipios
    // existentes en cada departamento para poder 
    // determinar el código máximo aceptado por cada 
    // uno de los departamentos.
    var munisPorDepto = [
        /* 01 - Guatemala tiene:      */ 17 /* municipios. */,
        /* 02 - El Progreso tiene:    */  8 /* municipios. */,
        /* 03 - Sacatepéquez tiene:   */ 16 /* municipios. */,
        /* 04 - Chimaltenango tiene:  */ 16 /* municipios. */,
        /* 05 - Escuintla tiene:      */ 13 /* municipios. */,
        /* 06 - Santa Rosa tiene:     */ 14 /* municipios. */,
        /* 07 - Sololá tiene:         */ 19 /* municipios. */,
        /* 08 - Totonicapán tiene:    */  8 /* municipios. */,
        /* 09 - Quetzaltenango tiene: */ 24 /* municipios. */,
        /* 10 - Suchitepéquez tiene:  */ 21 /* municipios. */,
        /* 11 - Retalhuleu tiene:     */  9 /* municipios. */,
        /* 12 - San Marcos tiene:     */ 30 /* municipios. */,
        /* 13 - Huehuetenango tiene:  */ 32 /* municipios. */,
        /* 14 - Quiché tiene:         */ 21 /* municipios. */,
        /* 15 - Baja Verapaz tiene:   */  8 /* municipios. */,
        /* 16 - Alta Verapaz tiene:   */ 17 /* municipios. */,
        /* 17 - Petén tiene:          */ 14 /* municipios. */,
        /* 18 - Izabal tiene:         */  5 /* municipios. */,
        /* 19 - Zacapa tiene:         */ 11 /* municipios. */,
        /* 20 - Chiquimula tiene:     */ 11 /* municipios. */,
        /* 21 - Jalapa tiene:         */  7 /* municipios. */,
        /* 22 - Jutiapa tiene:        */ 17 /* municipios. */
    ];

    if (depto === 0 || muni === 0) {
      if (notificarError) this.mostrarError(`${preMensaje}CUI con código de municipio o departamento inválido.`);
      return false;
    }

    if (depto > munisPorDepto.length) {
      if (notificarError) this.mostrarError(`${preMensaje}CUI con código de departamento inválido.`);
      return false;
    }

    if (muni > munisPorDepto[depto - 1]) {
      if (notificarError) this.mostrarError(`${preMensaje}CUI con código de municipio inválido.`);
      return false;
    }

    // Se verifica el correlativo con base 
    // en el algoritmo del complemento 11.
    var total = 0;
    try {
      for (var i = 0; i < numero.length; i++) {
        total += parseInt(numero[i]) * (i + 2);
      }

      var modulo = (total % 11);

      if ((modulo === verificador) == false) {
        if (notificarError) this.mostrarError(`${preMensaje}CUI con verificador inválido.`);
        return false;
      }
    } catch (error) {
      return false;
    }

    return true;
  }

  setSessionStorageRol = (rol: any) => sessionStorage.setItem(this.DATOS_USUARIO.rol, rol)
  setSessionStorageUsuario = (usuario: any) => sessionStorage.setItem(this.DATOS_USUARIO.usuario, usuario)
  setSessionStorageNombres = (nombres: any) => sessionStorage.setItem(this.DATOS_USUARIO.nombres, nombres)
  setSessionStorageApellidos = (apellidos: any) => sessionStorage.setItem(this.DATOS_USUARIO.apellidos, apellidos)
  setSessionStorageIdUsuario = (id_usuario: any) => sessionStorage.setItem(this.DATOS_USUARIO.id_usuario, id_usuario)

  getSessionStorageRol = () => sessionStorage.getItem(this.DATOS_USUARIO.rol)
  getSessionStorageUsuario = () => sessionStorage.getItem(this.DATOS_USUARIO.usuario)
  getSessionStorageNombres = () => sessionStorage.getItem(this.DATOS_USUARIO.nombres)
  getSessionStorageApellidos = () => sessionStorage.getItem(this.DATOS_USUARIO.apellidos)
  getSessionStorageIdUsuario = () => sessionStorage.getItem(this.DATOS_USUARIO.id_usuario)

}
