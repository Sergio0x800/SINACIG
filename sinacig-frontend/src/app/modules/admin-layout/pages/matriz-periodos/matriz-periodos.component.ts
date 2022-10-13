import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { MatrizService } from 'src/app/services/matriz.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

import Swal from 'sweetalert2'
import { PlanRiesgosService } from 'src/app/services/plan-riesgos.service';
import { MatrizContinuidadService } from 'src/app/services/matriz-continuidad.service';

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

  //Se hace la inyeccion de los servicios
  constructor(
    private catalogsService: CatalogosService,
    private matrizService: MatrizService,
    private usuarioService: UsuarioService,
    private utilidades: UtilidadesService,
    private riesgoService: RiesgosService,
    private planService: PlanRiesgosService,
    private matrizContinuidadService: MatrizContinuidadService
  ) { }

  ngOnInit(): void {
    //Se obtienen los periodos
    this.catalogsService.getPeriodos().subscribe(resultPeriodos => {
      this.periodos = resultPeriodos
      if (sessionStorage.getItem('Unidad') && sessionStorage.getItem('Periodo')) {
        this.formSearchCreateMatrizPeriodo.setValue({
          id_unidad_ejecutora: sessionStorage.getItem('Unidad'),
          id_periodo: sessionStorage.getItem('Periodo')
        })
        this.validarFormBusqueda();
      }
      //Se obtiene el usuario actual y en base a el se limitan las UE
      this.usuarioService.obtenerUsuario().subscribe((resultUsuarios: any) => {
        this.usuario = resultUsuarios
        if (this.usuario.id_rol == 1) {
          this.catalogsService.getUnidadEjecutora().subscribe(unidades => {
            this.unidadesEjecutoras = unidades.filter((unidad: any) => unidad.codigo_unidad < 999)
          }, err => {
            this.utilidades.showErrorCatalogos();
          });
        } else {
          this.catalogsService.getUnidadEjecutoraById(this.usuario.id_unidad_ejecutora).subscribe(unidades => {
            this.unidadesEjecutoras = unidades
          }, err => {
            this.utilidades.showErrorCatalogos();
          })
        }
      }, err => {
        this.utilidades.showErrorCatalogos();
      })
    }, err => {
      this.utilidades.showErrorCatalogos();
    })
  }

  saveInCache() {
    sessionStorage.setItem('Unidad', this.formSearchCreateMatrizPeriodo.get('id_unidad_ejecutora')?.value)
    sessionStorage.setItem('Periodo', this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value)
  }


  validarFormMatriz() {
    if (this.formSearchCreateMatrizPeriodo.get('id_unidad_ejecutora')?.invalid) {
      this.utilidades.showWarning('¡Faltan campos por llenar!', 'Por favor ingrese una unidad ejecutora')
    } else if (this.formSearchCreateMatrizPeriodo.get('id_periodo')?.invalid) {
      this.utilidades.showWarning('¡Faltan campos por llenar!', 'Por favor ingrese un periodo')
    } else if (this.periodoSeleccionado[0].periodo_abierto == 0) {
      this.utilidades.showWarning('¡Periodo cerrado!', 'El periodo ya se encuentra cerrado, no puede ingresar nuevos registros')
    } else {
      this.createNewMatrizPeriodo()
    }
  }

  //Se agrega el metodo crear nueva matriz periodo para la creacion de los encabezados
  createNewMatrizPeriodo() {
    const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value)
    const dataSearch = {
      ...this.formSearchCreateMatrizPeriodo.value,
      fecha_periodo_inicio: periodoSeleccionado.fecha_inicio,
      fecha_periodo_fin: periodoSeleccionado.fecha_fin
    }

    //Se verifica que el encabezado no exista actualmente en la DB
    this.matrizService.getMatrizByParams(dataSearch).subscribe((value) => {
      this.utilidades.showWarning('¡El registro ya existe!', 'Actualmente existe un registro con estos parametros')
    }, err => {
      if (err.error.statusCode == 404) {
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
      } else {
        this.utilidades.showError('¡Error en el proceso de registro!', 'Ocurrió un error mientras se ingresaban los datos, por favor intente nuevamente')
      }
    })
  }


  findMatrizPeriodo() {

    //Se asigna el periodo seleccionado a la variable para saber si esta abierto o cerrado
    const valuePeriodo = this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value
    this.periodoSeleccionado = this.periodos.filter((item: any) => item.id_periodo == valuePeriodo)

    const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value)
    const dataSearch = {
      ...this.formSearchCreateMatrizPeriodo.value,
      fecha_periodo_inicio: periodoSeleccionado.fecha_inicio,
      fecha_periodo_fin: periodoSeleccionado.fecha_fin
    }
    this.matrizService.getMatrizByParams(dataSearch)
      .subscribe(matriz => {
        if (matriz.length == 0) {
          Swal.fire({
            icon: 'error',
            text: '¡No existe ningún registro con estos parámetros!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          })
        } else {
          this.showTablePeriodos = true;
          this.matrizPeriodosEncontrados = matriz;
        }
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
    this.planService.getExistenciaPlanTrabajoPendiente(id_matriz).subscribe((resultPlan: any) => {

      this.matrizContinuidadService.getExistenciaMatrizContinuidad(id_matriz).subscribe((resultMatrizContinuidad: any) => {
        if (resultPlan > 0 || resultMatrizContinuidad > 0) {
          Swal.fire({
            icon: 'warning',
            text: `¡Aún existen planes de trabajo y matrices de continuidad por ingresar!`,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          })
        } else {
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
      })
    })
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
