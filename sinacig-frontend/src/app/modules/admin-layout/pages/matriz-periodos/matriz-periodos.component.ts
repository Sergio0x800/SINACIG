import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MatrizService } from 'src/app/services/matriz.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-matriz-periodos',
  templateUrl: './matriz-periodos.component.html',
  styleUrls: ['./matriz-periodos.component.css']
})

export class MatrizPeriodosComponent implements OnInit {
  //Datos usuario
  usuario: any = {}

  //Inicializando Catalogos
  unidadesEjecutoras: any = [];
  periodos: any = [];
  showTablePeriodos: boolean = false;
  routeIngresoRiesgos: any = '/admin/riesgos/'
  periodoSeleccionado: any;

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
        this.catalogsService.getUnidadEjecutora().subscribe(unidades => {
          this.unidadesEjecutoras = unidades.filter((unidad: any) => unidad.codigo_unidad < 999)
        });
      } else {
        this.catalogsService.getUnidadEjecutoraById(this.usuario.id_unidad_ejecutora).subscribe(unidades => {
          this.unidadesEjecutoras = unidades
        })
      }
    })
    this.formSearchCreateMatrizPeriodo.get('id_periodo')?.valueChanges.subscribe((value: any) => {
      this.periodoSeleccionado = this.periodos.filter((item: any) => item.id_periodo == value)
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
        text: '¡Actualmente existe un registro con estos parametros!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })

    }, err => {
      const newPeriodo = {
        ...dataSearch,
        usuario_registro: this.usuario.id_usuario
      }
      this.matrizService.createMatriz(newPeriodo).subscribe(() => {
        Swal.fire({
          icon: 'success',
          text: '¡El registro se agrego correctamente!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
        this.matrizService.getMatrizByParams(dataSearch).subscribe((value: any) => {
          this.showTablePeriodos = true;
          this.matrizPeriodosEncontrados = value;
        })
      },
        err => {
          Swal.fire({
            icon: 'error',
            text: '¡Error al ingresar el registro!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          })
        })
    })
  }

  validarFormMatriz() {
    if (this.formSearchCreateMatrizPeriodo.get('id_unidad_ejecutora')?.invalid) {
      this.utilidades.mostrarError('Selecciona una unidad ejecutora')
    } else if (this.formSearchCreateMatrizPeriodo.get('id_periodo')?.invalid) {
      this.utilidades.mostrarError('Selecciona un periodo')
    } else if (this.periodoSeleccionado[0].periodo_abierto == 0) {
      Swal.fire({
        text: '¡El periodo ya se encuentra cerrado, no puede ingresar nuevos registros!',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
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
              text: '¡No existe ningún registro con estos parámetros!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: '¡No se pudo realizar la búsqueda correctamente!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
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
            text: '¡El registro se eliminó correctamente!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
          this.riesgoService.deleteRiesgoByIdMatriz(value[0]).subscribe((value: any) => {
          })
          this.showTablePeriodos = false
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
  }

  cerrarPeriodo(id_matriz: any) {
    if (this.matrizPeriodosEncontrados[0].periodo_abierto === 1) {
      Swal.fire({
        title: '¿Está seguro de validar este registro?',
        text: "¡Si realiza esta acción los riesgos solo podrán visualizarse!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, validar registro!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.matrizService.updateMatriz(id_matriz, 0).subscribe(() => {
            Swal.fire({
              icon: 'success',
              text: '¡El registro se ha validado correctamente!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            });

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
              text: '¡No se pudo validar el registro, ha ocurrido un error!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          });
        }
      })
    } else {
      Swal.fire({
        text: 'El registro ya se encuentra validado',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  abrirPeriodo(id_matriz: any) {
    if (this.matrizPeriodosEncontrados[0].periodo_abierto === 0) {
      Swal.fire({
        title: '¿Está seguro de habilitar nuevamente este registro?',
        text: "¡Se habilitarán las opciones de editar nuevamente",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, habilitar registro!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.matrizService.updateMatriz(id_matriz, 1).subscribe(() => {
            Swal.fire({
              icon: 'success',
              text: '¡El registro se ha habilitado correctamente!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            });

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
              text: '¡No se pudo habilitar el registro, ha ocurrido un error!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          });
        }
      })
    } else {
      Swal.fire({
        text: 'El registro ya se encuentra habilitado',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    }
  }
}
