import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MatrizService } from 'src/app/services/matriz.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RiesgosService } from 'src/app/services/riesgos.service';

import { IAngularMyDpOptions } from 'angular-mydatepicker';
import Swal from 'sweetalert2'
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-matriz-periodos',
  templateUrl: './matriz-periodos.component.html',
  styleUrls: ['./matriz-periodos.component.css']
})

export class MatrizPeriodosComponent implements OnInit {
  //Datos usuario
  usuario: any = {}

  //Configuracion mydatepicker
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  myDateInit: boolean = true;
  model: any = null;
  locale: string = 'es'

  //Inicializando Catalogos
  unidadesEjecutoras: any = [];
  periodos: any = [];
  showTablePeriodos: boolean = false;
  routeIngresoRiesgos: any = '/admin/riesgos/'

  //array que almacena matriz periodos encontrados
  matrizPeriodosEncontrados: any = []

  //Forms Control Search by Params
  formSearchCreateMatrizPeriodo = new FormGroup({
    id_unidad_ejecutora: new FormControl('', Validators.required),
    id_periodo: new FormControl('', Validators.required),
  })

  constructor(
    private catalogsService: CatalogosService,
    private matrizService: MatrizService,
    private usuarioService: UsuarioService,
    private utilidades: UtilidadesService,
    private riesgoService: RiesgosService
  ) { }

  ngOnInit(): void {
    this.catalogsService.getPeriodos().subscribe(periodos => this.periodos = periodos)
    this.usuarioService.obtenerUsuario().subscribe((result: any) => {
      this.usuario = result
      if (this.usuario.id_rol == 1) {
        this.catalogsService.getUnidadEjecutora().subscribe(unidades => this.unidadesEjecutoras = unidades);
      } else {
        this.catalogsService.getUnidadEjecutoraById(this.usuario.id_unidad_ejecutora).subscribe(unidades => {
          this.unidadesEjecutoras = unidades
        })
      }
    })
  }

  createNewMatrizPeriodo() {
    const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value)
    const dataSearch = {
      ...this.formSearchCreateMatrizPeriodo.value,
      fecha_periodo_inicio: periodoSeleccionado.fecha_inicio,
      fecha_periodo_fin: periodoSeleccionado.fecha_fin
    }
    this.matrizService.getMatrizByParams(dataSearch).subscribe((value) => {

      Swal.fire({
        icon: 'warning',
        text: 'Actualmente existe un registro con estos parametros!'
      })

    }, err => {
      const newPeriodo = {
        ...dataSearch,
        usuario_registro: this.usuario.id_usuario
      }
      this.matrizService.createMatriz(newPeriodo).subscribe(() => {
        Swal.fire({
          icon: 'success',
          text: 'El registro se agrego correctamente!'
        })
        this.matrizService.getMatrizByParams(dataSearch).subscribe((value: any) => {
          this.showTablePeriodos = true;
          this.matrizPeriodosEncontrados = value;
        })
      },
        err => {
          Swal.fire({
            icon: 'error',
            text: 'Error al ingresar el registro!'
          })
        })
    })
  }

  validarFormMatriz() {
    if (this.formSearchCreateMatrizPeriodo.get('id_unidad_ejecutora')?.invalid) {
      this.utilidades.mostrarError('Selecciona una unidad ejecutora')
    } else if (this.formSearchCreateMatrizPeriodo.get('id_periodo')?.invalid) {
      this.utilidades.mostrarError('Selecciona un periodo')
    } else {
      this.createNewMatrizPeriodo()
    }
  }
  findMatrizPeriodo() {
    const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value)
    const dataSearch = {
      ...this.formSearchCreateMatrizPeriodo.value,
      fecha_periodo_inicio: periodoSeleccionado.fecha_inicio,
      fecha_periodo_fin: periodoSeleccionado.fecha_fin
    }
    this.matrizService.getMatrizByParams(dataSearch)
      .subscribe(matriz => {
        this.showTablePeriodos = true;
        this.matrizPeriodosEncontrados = matriz;
      },
        err => {
          this.showTablePeriodos = false;
          if (err.error.statusCode == 404) {
            Swal.fire({
              icon: 'error',
              text: '¡No existe ningún registro con estos parámetros!'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: '¡No se pudo realizar la búsqueda correctamente!'
            })
          }
        })
  }

  validarFormBusqueda() {
    if (this.formSearchCreateMatrizPeriodo.get('id_unidad_ejecutora')?.invalid) {
      this.utilidades.mostrarError('Selecciona una unidad ejecutora')
    } else if (this.formSearchCreateMatrizPeriodo.get('id_periodo')?.invalid) {
      this.utilidades.mostrarError('Selecciona un periodo')
    } else {
      this.findMatrizPeriodo()
    }
  }

  deletePeriodoMatriz(id_matriz: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este registro?',
      text: "¡No podrás revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.matrizService.deleteMatriz(id_matriz).subscribe((value: any) => {
          Swal.fire({
            icon: 'success',
            text: '¡El registro se eliminó correctamente!'
          });
          this.riesgoService.deleteRiesgoByIdMatriz(value[0]).subscribe((value: any) => {
            console.log(value)
          })
          this.showTablePeriodos = false
        }, err => {
          Swal.fire({
            icon: 'error',
            text: '¡No se pudo eliminar el registro!'
          })
        });
      }
    })
  }

  cerrarPeriodo(id_matriz: any) {
    if (this.matrizPeriodosEncontrados[0].periodo_abierto === 1) {
      Swal.fire({
        title: 'Esta seguro de cerrar este periodo?',
        text: "¡No podra revertir ni realizar alguna acción que no sea visualizar los registros!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, ¡cerrar periodo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.matrizService.updateMatriz(id_matriz).subscribe(() => {
            Swal.fire({
              icon: 'success',
              text: '¡El periodo se ha cerrado correctamente!'
            });
            let contadorE = 0
            let contadorO = 0
            let contadorCN = 0
            let contadorI = 0
            this.riesgoService.getRiesgoByIdMatrizRef(id_matriz).subscribe((value: any) => {
              value.forEach((riesgo: any) => {
                if (riesgo.codigo_referencia === 'E-') {
                  contadorE++
                  this.riesgoService.updateRiesgo(riesgo.id_riesgo, { codigo_referencia: `E-${contadorE}` }).subscribe((value: any) => { })
                } else if (riesgo.codigo_referencia === 'O-') {
                  contadorO++
                  this.riesgoService.updateRiesgo(riesgo.id_riesgo, { codigo_referencia: `O-${contadorO}` }).subscribe((value: any) => { })
                } else if (riesgo.codigo_referencia === 'CN-') {
                  contadorCN++
                  this.riesgoService.updateRiesgo(riesgo.id_riesgo, { codigo_referencia: `CN-${contadorCN}` }).subscribe((value: any) => { })
                } else if (riesgo.codigo_referencia === 'I-') {
                  contadorI++
                  this.riesgoService.updateRiesgo(riesgo.id_riesgo, { codigo_referencia: `I-${contadorI}` }).subscribe((value: any) => { })
                }
              })
            })

            const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value)
            const dataSearch = {
              ...this.formSearchCreateMatrizPeriodo.value,
              fecha_periodo_inicio: periodoSeleccionado.fecha_inicio,
              fecha_periodo_fin: periodoSeleccionado.fecha_fin
            }
            this.matrizService.getMatrizByParams(dataSearch)
              .subscribe(matriz => {
                this.showTablePeriodos = true;
                this.matrizPeriodosEncontrados = matriz;
              })
          }, err => {
            Swal.fire({
              icon: 'error',
              text: '¡No se pudo cerrar el registro, ha ocurrido un error!'
            })
          });
        }
      })
    } else {
      Swal.fire({
        text: 'El periodo ya se encuentra cerrado',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    }
  }
}
