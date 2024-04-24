import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { MatrizService } from 'src/app/services/matriz.service';
import { PlanRiesgosService } from 'src/app/services/plan-riesgos.service';
import { CorrelativoService } from 'src/app/services/correlativo.service';

import { IAngularMyDpOptions } from 'angular-mydatepicker';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';
import { OnExit } from '../../guards/exit.guard';

@Component({
  selector: 'app-ingreso-riesgos',
  templateUrl: './ingreso-riesgos.component.html',
  styleUrls: ['./ingreso-riesgos.component.css']
})
export class IngresoRiesgosComponent implements OnInit, OnExit {

  //parametros recibidos por url de otras paginas
  id_matriz: string | null = null;

  //variable que almacena el id_riesgo devuelto al crear un nuevo riesgo
  id_riesgo: any = 0;

  //variable que almacena la matriz a la cual pertenecera el riesgo actualmente creado
  matrizEncontrada: any = [];

  //variables con string para agregar a los imputs
  routerLinkRiesgo: any = ''
  codigoReferenciaToInput: any = '';
  concatCodigoUnidad: any = ''

  //variables que almacenan el tipo de objetivo y medida riesgo encontrado al hacer calculos para el codigo_referencia y la media riesgo
  tipoObjetivoEncontrado: any = '';
  medidaRiesgoEncontrado: any = [];

  //variable que almacena el ultimo maximo correlativo encontrado al colocar el tipo de objetivo
  maximoCorrelativoEncontrado: any = {};

  //configuracion de fecahas para la dependencia mydatepicker
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  myDateInit: boolean = true;
  model: any = null;
  myDateInicioFin: any = {};
  locale: string = 'es'

  //Inicializando Catalogos
  tipoObjetivos: any = [];
  areas_evaluadas: any = [];
  probabilidades: any = [];
  severidades: any = [];
  control_mitigador: any;
  medidasRiesgo: any = [];
  prioridades: any = [];

  //variables de resultados de los calculos echos en el formulario
  resultadoRI: any = 0;
  resultadoRR: any = 0;
  medidaRiesgoInput: any = ''

  //variable que guarda en memoria los controles internos agregados para luego hacer un sulo insert
  controlInternoMemory: any = []
  controlInternoMemory2: any = []

  //formulario reactivo para la creacion de riesgos y controles internos
  tipoObjetivoInvalid = false;
  tipoObjetivoValid = false;
  areaEvaluadaInvalid = false;
  areaEvaluadaValid = false;
  eventosIdentificadosInvalid = false;
  eventosIdentificadosValid = false;
  probabilidadInvalid = false;
  probabilidadValid = false;
  severidadInvalid = false;
  severidadValid = false;
  controlMitigadorInvalid = false;
  controlMitigadorValid = false;
  descripcionRiesgoInvalid = false;
  descripcionRiesgoValid = false;
  descripcionControlInvalid = false;
  descripcionControlValid = false;

  formCreateRiesgo = new FormGroup({
    id_tipo_objetivo: new FormControl('', Validators.required),
    id_area_evaluada: new FormControl('', Validators.required),
    id_eventos_identificados: new FormControl('', Validators.required),
    id_probabilidad: new FormControl(0, Validators.required),
    id_severidad: new FormControl(0, Validators.required),
    id_control_mitigador: new FormControl(0, Validators.required),
    id_medida_riesgo: new FormControl(0, Validators.required),
    id_matriz: new FormControl(0),
    codigo_referencia: new FormControl(0, Validators.required),
    descripcion_riesgo: new FormControl('', Validators.required),
    riesgo_inherente: new FormControl(0, Validators.required),
    riesgo_residual: new FormControl(0, Validators.required),
    observaciones: new FormControl(''),
    usuario_registro: new FormControl(''),
  })
  formCreateControlInterno = new FormGroup({
    id_riesgo: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
    usuario_registro: new FormControl(''),
  })
  usuario: any = {};
  confirm: any = true;
  nextPagePlan: any = false;
  constructor(
    private catalogsService: CatalogosService,
    private riesgosService: RiesgosService,
    private route: ActivatedRoute,
    private matrizService: MatrizService,
    private router: Router,
    private planService: PlanRiesgosService,
    private correlativoService: CorrelativoService,
    private usuarioService: UsuarioService,
    private utilidades: UtilidadesService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((param: any) => {
      this.id_matriz = param.get('id_matriz');
      this.routerLinkRiesgo = '/admin/riesgos/' + this.id_matriz;
      this.matrizService.getMatrizById(this.id_matriz).subscribe(matriz => {
        this.matrizEncontrada = matriz[0]
        this.concatCodigoUnidad = this.matrizEncontrada.codigo_unidad + '  -  ' +
          this.matrizEncontrada.nombre_unidad
      })
    })

    //validacion de formulario
    this.formCreateRiesgo.get('id_tipo_objetivo')?.valueChanges.subscribe((value: any) => {
      if (this.tipoObjetivoInvalid && this.formCreateRiesgo.get('id_tipo_objetivo')?.dirty) {
        this.tipoObjetivoValid = true
        this.tipoObjetivoInvalid = false
      }
    })
    this.formCreateRiesgo.get('id_area_evaluada')?.valueChanges.subscribe((value: any) => {
      if (this.areaEvaluadaInvalid && this.formCreateRiesgo.get('id_area_evaluada')?.dirty) {
        this.areaEvaluadaValid = true
        this.areaEvaluadaInvalid = false
      }
    })
    this.formCreateRiesgo.get('id_eventos_identificados')?.valueChanges.subscribe((value: any) => {
      if (this.eventosIdentificadosInvalid && this.formCreateRiesgo.get('id_eventos_identificados')?.dirty) {
        this.eventosIdentificadosValid = true
        this.eventosIdentificadosInvalid = false
      }
    })
    this.formCreateRiesgo.get('descripcion_riesgo')?.valueChanges.subscribe((value: any) => {
      if (this.descripcionRiesgoInvalid && this.formCreateRiesgo.get('descripcion_riesgo')?.dirty) {
        this.descripcionRiesgoValid = true
        this.descripcionRiesgoInvalid = false
      }
    })
    this.formCreateRiesgo.get('id_probabilidad')?.valueChanges.subscribe((value: any) => {
      if (this.probabilidadInvalid && this.formCreateRiesgo.get('id_probabilidad')?.dirty) {
        this.probabilidadValid = true
        this.probabilidadInvalid = false
      }
    })
    this.formCreateRiesgo.get('id_severidad')?.valueChanges.subscribe((value: any) => {
      if (this.severidadInvalid && this.formCreateRiesgo.get('id_severidad')?.dirty) {
        this.severidadValid = true
        this.severidadInvalid = false
      }
    })
    this.formCreateRiesgo.get('id_control_mitigador')?.valueChanges.subscribe((value: any) => {
      if (this.controlMitigadorInvalid && this.formCreateRiesgo.get('id_control_mitigador')?.dirty) {
        this.controlMitigadorValid = true
        this.controlMitigadorInvalid = false
      }
    })
    this.formCreateControlInterno.get('descripcion')?.valueChanges.subscribe((value: any) => {
      if (this.descripcionControlInvalid && this.controlInternoMemory.length > 0) {
        this.descripcionControlValid = true
        this.descripcionControlInvalid = false
      }
    })

    //llamado a catalogos
    this.catalogsService.getTipoObjetivo().subscribe(obj => this.tipoObjetivos = obj);
    this.catalogsService.getAreaEvaluada().subscribe(areas => this.areas_evaluadas = areas);
    this.catalogsService.getProbabilidad().subscribe(prob => this.probabilidades = prob);
    this.catalogsService.getSeveridad().subscribe(severidades => this.severidades = severidades);
    this.catalogsService.getControlMitigador().subscribe(controlM => this.control_mitigador = controlM)
    this.catalogsService.getMedidaRiesgo().subscribe(medidas => this.medidasRiesgo = medidas);
    this.catalogsService.getPrioridad().subscribe(prioridades => this.prioridades = prioridades);
    this.usuarioService.obtenerUsuario().subscribe((result: any) => this.usuario = result)

    this.formCreateRiesgo.get('id_severidad')?.valueChanges.subscribe((severidad_input: any) => {
      this.formCreateRiesgo.patchValue({ riesgo_inherente: this.formCreateRiesgo.get('id_probabilidad')?.value * severidad_input })
      this.resultadoRI = this.formCreateRiesgo.get('riesgo_inherente')?.value

      if (this.formCreateRiesgo.get('id_control_mitigador')?.value && this.formCreateRiesgo.get('id_probabilidad')?.value) {
        this.formCreateRiesgo.patchValue({ riesgo_residual: this.formCreateRiesgo.get('riesgo_inherente')?.value / this.formCreateRiesgo.get('id_control_mitigador')?.value })
        this.resultadoRR = this.formCreateRiesgo.get('riesgo_residual')?.value
        this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
          if (this.formCreateRiesgo.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
            return medida
          }
        })
        this.formCreateRiesgo.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
        this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
      }
    })
    this.formCreateRiesgo.get('id_probabilidad')?.valueChanges.subscribe((probabilidad_input: any) => {
      this.formCreateRiesgo.patchValue({ riesgo_inherente: this.formCreateRiesgo.get('id_severidad')?.value * probabilidad_input })
      this.resultadoRI = this.formCreateRiesgo.get('riesgo_inherente')?.value

      if (this.formCreateRiesgo.get('id_control_mitigador')?.value && this.formCreateRiesgo.get('id_severidad')?.value) {
        this.formCreateRiesgo.patchValue({ riesgo_residual: this.formCreateRiesgo.get('riesgo_inherente')?.value / this.formCreateRiesgo.get('id_control_mitigador')?.value })
        this.resultadoRR = this.formCreateRiesgo.get('riesgo_residual')?.value
        this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
          if (this.formCreateRiesgo.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
            return medida
          }
        })
        this.formCreateRiesgo.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
        this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
      }
    })
    this.formCreateRiesgo.get('id_control_mitigador')?.valueChanges.subscribe((mitigador_input: any) => {
      this.formCreateRiesgo.patchValue({ riesgo_residual: this.formCreateRiesgo.get('riesgo_inherente')?.value / mitigador_input })
      this.resultadoRR = this.formCreateRiesgo.get('riesgo_residual')?.value
      this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
        if (this.formCreateRiesgo.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
          return medida
        }
      })
      this.formCreateRiesgo.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
      this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
    })
  }
  //
  onExit() {
    if (this.nextPagePlan) {
      this.confirm = true
    } else if (this.formCreateRiesgo.touched || this.formCreateControlInterno.touched) {
      this.confirm = Swal.fire({
        title: '¿Está seguro de salir?',
        text: 'Perderá los datos ingresados',
        icon: "question",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        }
        return false
      });
    }
    return this.confirm
  }

  //metodo para la creacion de nuevos riesgos y nuevos controles internos
  createNewRiesgo() {
    ///llamado de los inputs del formulario reactivo para realizar los calculos del ingreso de riesgos
    let tipo_objetivo_input = this.formCreateRiesgo.get('id_tipo_objetivo')?.value
    //Se encuentra el tipo de objetivo seleccionado
    this.tipoObjetivoEncontrado = this.tipoObjetivos.find((objetivo: any) => tipo_objetivo_input == objetivo.id_tipo_objetivo)
    //busca una conicidencia, si no la encuentra incicializa a zero el correlativo
    // this.correlativoService.getCorrelativo({ id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo }).subscribe(maximoEncontrado => {
    //   if (!maximoEncontrado) {
    //     const newCorrelativo = {
    //       id_matriz: this.id_matriz,
    //       id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo,
    //       correlativo_maximo: 0,
    //       usuario_registro: 1
    //     }
    //     this.correlativoService.createCorrelativo(newCorrelativo).subscribe(initCorrelativo => {
    //       //nuevamente busca una coincidencia, cuando la encuentra aumenta a 1 el correlativo
    //       this.correlativoService.getCorrelativo({ id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo }).subscribe(maximo => {
    //         this.formCreateRiesgo.patchValue({ codigo_referencia: this.tipoObjetivoEncontrado.codigo_referencia + (maximo.correlativo_maximo + 1) })
    //         this.codigoReferenciaToInput = this.formCreateRiesgo.get('codigo_referencia')?.value
    //         //este atributo sirve para al momento de crear el nuevo correlativo
    //         this.maximoCorrelativoEncontrado = maximo
    //         const dataRiesgo = {
    //           ...this.formCreateRiesgo.value,
    //           id_matriz: this.id_matriz,
    //           usuario_registro: this.usuario.id_usuario
    //         }
    //         //se crea el
    //       })
    //     })
    //   } else {
    //     //si el correlativo ya esta inicializado, solo aumenta a 1 el correlativo maximo
    //     this.correlativoService.getCorrelativo({ id_matriz: this.id_matriz, id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo }).subscribe(maximo => {
    //       this.formCreateRiesgo.patchValue({ codigo_referencia: this.tipoObjetivoEncontrado.codigo_referencia + (maximo.correlativo_maximo + 1) })
    //       this.codigoReferenciaToInput = this.formCreateRiesgo.get('codigo_referencia')?.value
    //       this.maximoCorrelativoEncontrado = maximo
    //       const dataRiesgo = {
    //         ...this.formCreateRiesgo.value,
    //         id_matriz: this.id_matriz,
    //         usuario_registro: this.usuario.id_usuario
    //       }
    //       //se crea el riesgo
    //       this.riesgosService.createRiesgo(dataRiesgo).subscribe((value) => {
    //         this.id_riesgo = value;
    //         //si el riesgo se crea correctamente se ingresan los controles internos que estan en memoria
    //         this.controlInternoMemory.map((control: any) => {
    //           // const indice = this.controlInternoMemory.indexOf(control);
    //           const controlInterno = {
    //             ...control,
    //             // descripcion: ((indice + 1) + '. ') + control.descripcion,
    //             id_riesgo: this.id_riesgo,
    //             usuario_registro: this.usuario.id_usuario

    //           }
    //           this.planService.createControlInterno(controlInterno).subscribe(value => { })
    //         })
    //         //se empieza con el proceso de eliminacion y creacion del antiguo y nuevo correlativo respectivamente
    //         this.correlativoService.deleteCorrelativo(this.maximoCorrelativoEncontrado.id_correlativo_maximo).subscribe(value => {
    //           delete this.maximoCorrelativoEncontrado.id_correlativo_maximo
    //           delete this.maximoCorrelativoEncontrado.fecha_registro
    //           delete this.maximoCorrelativoEncontrado.usuario_registro
    //           const newCorrelativo = {
    //             ...this.maximoCorrelativoEncontrado,
    //             usuario_registro: this.usuario.id_usuario,
    //             correlativo_maximo: this.maximoCorrelativoEncontrado.correlativo_maximo + 1
    //           }
    //           this.correlativoService.createCorrelativo(newCorrelativo).subscribe(value => { })
    //         })
    //         this.router.navigate(['/admin/ingreso-plan-trabajo', this.id_riesgo, this.id_matriz]);
    //       },
    //         err => {
    //           Swal.fire({
    //             icon: 'error',
    //             text: 'Error al ingresar el registro!'
    //           })
    //         })
    //     })
    //   }
    // })


    const dataRiesgo = {
      ...this.formCreateRiesgo.value,
      codigo_referencia: this.tipoObjetivoEncontrado.codigo_referencia,
      id_matriz: this.id_matriz,
      usuario_registro: this.usuario.id_usuario
    }

    this.riesgosService.createRiesgo(dataRiesgo).subscribe((value) => {
      this.id_riesgo = value;
      //si el riesgo se crea correctamente se ingresan los controles internos que estan en memoria
      this.controlInternoMemory.map((control: any) => {
        const controlInterno = {
          ...control,
          id_riesgo: this.id_riesgo,
          usuario_registro: this.usuario.id_usuario
        }
        this.planService.createControlInterno(controlInterno).subscribe(value => { })
      })
      //se empieza con el proceso de eliminacion y creacion del antiguo y nuevo correlativo respectivamente
      // this.correlativoService.deleteCorrelativo(this.maximoCorrelativoEncontrado.id_correlativo_maximo).subscribe(value => {
      //   delete this.maximoCorrelativoEncontrado.id_correlativo_maximo
      //   delete this.maximoCorrelativoEncontrado.fecha_registro
      //   delete this.maximoCorrelativoEncontrado.usuario_registro
      //   const newCorrelativo = {
      //     ...this.maximoCorrelativoEncontrado,
      //     usuario_registro: this.usuario.id_usuario,
      //     correlativo_maximo: this.maximoCorrelativoEncontrado.correlativo_maximo + 1
      //   }
      //   this.correlativoService.createCorrelativo(newCorrelativo).subscribe(value => { })
      // })
      this.router.navigate(['/admin/ingreso-plan-trabajo', this.id_riesgo, this.id_matriz]);
    },
      err => {
        Swal.fire({
          icon: 'error',
          text: 'Error al ingresar el registro!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
      })
  }

  validarFormularioRiesgo() {
    if (this.formCreateRiesgo.get('id_tipo_objetivo')?.invalid) {
      this.tipoObjetivoInvalid = true
    } if (this.formCreateRiesgo.get('id_area_evaluada')?.invalid) {
      this.areaEvaluadaInvalid = true
    } if (this.formCreateRiesgo.get('id_eventos_identificados')?.invalid) {
      this.eventosIdentificadosInvalid = true
    } if (!this.formCreateRiesgo.get('id_probabilidad')?.dirty) {
      this.probabilidadInvalid = true
    } if (!this.formCreateRiesgo.get('id_severidad')?.dirty) {
      this.severidadInvalid = true
    } if (!this.formCreateRiesgo.get('id_control_mitigador')?.dirty) {
      this.controlMitigadorInvalid = true
    } if (this.formCreateRiesgo.get('descripcion_riesgo')?.invalid) {
      this.descripcionRiesgoInvalid = true
    } if (this.controlInternoMemory.length < 1) {
      this.descripcionControlInvalid = true
    }
    if (this.controlInternoMemory.length < 1 || this.formCreateRiesgo.invalid || !this.formCreateRiesgo.get('id_control_mitigador')?.dirty || !this.formCreateRiesgo.get('id_severidad')?.dirty || !this.formCreateRiesgo.get('id_probabilidad')?.dirty) {
      this.utilidades.mostrarErrorNoti("Por favor llene los campos obligatorios")
    } else {
      this.nextPagePlan = true
      this.createNewRiesgo()
    }
  }

  //metodo para ingresar controles internos en memoria
  pushControlInterno() {
    if (this.controlInternoMemory2.includes(this.formCreateControlInterno.get('descripcion')?.value)) {
      Swal.fire({
        icon: 'warning',
        text: '¡Ya existe un registro con esta descripción!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    } else {
      const newValue = {
        ...this.formCreateControlInterno.value,
        descripcion: `- ${this.formCreateControlInterno.get('descripcion')?.value}`
      }
      this.controlInternoMemory.push(newValue);
      this.controlInternoMemory2.push(newValue.descripcion);
    }
    this.formCreateControlInterno.get('descripcion')?.reset();
  }

  //metodo que elimina controles internos de la memoria
  deleteControlInterno(descripcion: any) {
    const id = this.controlInternoMemory.findIndex((control: any) => control.descripcion === descripcion)
    const idMemory2 = this.controlInternoMemory2.findIndex((control: any) => control === descripcion)
    this.controlInternoMemory.splice(id, 1)
    this.controlInternoMemory2.splice(idMemory2, 1)
  }
}
