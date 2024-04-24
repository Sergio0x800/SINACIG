import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ActivatedRoute } from '@angular/router';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanRiesgosService } from 'src/app/services/plan-riesgos.service';
import { LogsService } from 'src/app/services/logs.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { MatrizService } from 'src/app/services/matriz.service';


@Component({
  selector: 'app-riesgos',
  templateUrl: './riesgos.component.html',
  styleUrls: ['./riesgos.component.css']
})
export class RiesgosComponent implements OnInit {

  public configuration!: Config;
  public columns: Columns[] = [
    // { key: 'id_riesgo', title: 'Comunidad' },
    { key: 'descripcion_riesgo', title: 'Descripción' },
    { key: 'riesgo_inherente', title: 'Riesgo Inherente' },
    { key: 'riesgo_residual', title: 'Riesgo Residual' },
    { key: 'medida_riesgo', title: 'Medida de Riesgo' },
    // { key: 'objetivo', title: 'Fecha' },
    // { key: 'area_evaluada', title: 'Tipo de censo' },
    // { key: 'eventos', title: 'Población total' },
    // { key: 'fecha_registro', title: 'Población sin agua' },
    // { key: 'probabilidad', title: 'Sistema de agua' },
    // { key: 'severidad', title: 'Estado' },
    // { key: 'valor_control_mitigador', title: 'Estado' },
    // { key: 'observaciones', title: 'Estado' },
    // { key: 'id_matriz', title: 'Estado' },
    // { key: 'codigo_referencia', title: 'Estado' },
    { key: '', title: 'Acciones' },
  ];

  //config fecha
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy'
  };
  myDateInit: boolean = true;
  model: any = null;
  myDateInicioFin: any = {};
  locale: string = 'es'

  modalElse: boolean = false

  //inicializar catalogos
  unidadesEjecutoras: any = [];
  tipoObjetivos: any = [];
  areas_evaluadas: any = [];
  probabilidades: any = [];
  medidasRiesgo: any = [];
  severidades: any = [];
  prioridades: any = [];
  puestos: any = [];


  ///pendiente revisar
  controlesImplementacionObtenidos: any = []
  controlesInternosObtenidos: any = [];
  riesgoToEdit: any = {};

  //Forms Control Create Riesgo
  resultadoRI: any = 0;
  resultadoRR: any = 0;

  //almacena los recursos llamados por id_riesgo
  recursosObtenidos: any = [];
  controlesInternosPlanObtenidos: any = [];


  //muestran los campos al momento de darle en nuevo en el modal de controles y recursos
  showInputsModalController: boolean = false;
  showInputsModalControlInternoPlan: boolean = false
  showInputsModalRecursos: boolean = false;
  showInputsModalInterno: boolean = false;
  tableModalController: boolean = false;
  tableModalRecursos: boolean = false;
  tableModalControlesInternosPlan: boolean = false;
  tableModalInterno: boolean = false;

  //desbloquea el select de control mitigador
  showBtnControlP: boolean = true
  showBtnControlI: boolean = true

  //params y id's
  id_matriz: string | null = null;
  riesgos: any = [];
  id_riesgo_from_table: any = 0;
  id_riesgo_plan_trabajo: any = 0;
  id_riesgo_for_control_interno: any = 0;
  offset: number = 10;

  //variables para colocar en los value de los inputs
  codigoReferenciaToInput: any = '';

  //links para regresar a la matriz-periodos y para ir a el ingreso de plan de trabajo
  linkMatrizPeriodos: string = '';
  linkPlanTrabajo: string = ''

  //utilizados en los subscribe de los formularios reactivos
  tipoObjetivoEncontrado: any = '';
  maximoCorrelativoEncontrado: any = {};
  medidaRiesgoEncontrado: any = [];


  //controles y recursos en memoria
  controlesMemory: any = [];
  controlesMemoryDelete: any = [];
  recursosMemory: any = [];
  controlInternoPlanMemory: any = [];
  recursosMemoryDelete: any = [];
  controlInternoPlanMemoryDelete: any = [];
  internosMemory: any = [];
  internosMemoryDelete: any = [];
  countIndice: any = 0;


  //Formularios reactivos para riesgo, plan, control, recursos
  formUpdateRiesgo = new FormGroup({
    id_tipo_objetivo: new FormControl(''),
    id_area_evaluada: new FormControl(''),
    id_eventos_identificados: new FormControl(''),
    id_probabilidad: new FormControl(0),
    id_severidad: new FormControl(0),
    id_control_mitigador: new FormControl(0),
    id_medida_riesgo: new FormControl({ value: 0, disabled: true }),
    id_matriz: new FormControl(0),
    codigo_referencia: new FormControl({ value: '', disabled: true }),
    descripcion_riesgo: new FormControl(''),
    riesgo_inherente: new FormControl({ value: 0, disabled: true }),
    riesgo_residual: new FormControl({ value: 0, disabled: true }),
    observaciones: new FormControl(''),
    usuario_registro: new FormControl('1'),
  })
  formUpdateControlInterno = new FormGroup({
    id_riesgo: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
    usuario_registro: new FormControl('')
  })
  formUpdatePlan = new FormGroup({
    id_prioridad: new FormControl('', Validators.required),
    id_puesto_responsable: new FormControl('', Validators.required),
    fecha_inicio: new FormControl('', Validators.required),
    fecha_fin: new FormControl('', Validators.required),
    comentario: new FormControl(''),
    usuario_registro: new FormControl(''),
  })
  formUpdateControlImplementacion = new FormGroup({
    que: new FormControl('', Validators.required),
    como: new FormControl('', Validators.required),
    quien: new FormControl('', Validators.required),
    cuando: new FormControl('', Validators.required),
    usuario_registro: new FormControl(''),
  })
  formUpdateRecursos = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    usuario_registro: new FormControl(''),
  })
  formUpdateControlesInternosPlan = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    usuario_registro: new FormControl(''),
  })
  formMatrizContinuidad = new FormGroup({
    id_riesgo: new FormControl(''),
    subtema: new FormControl('', Validators.required),
    id_nivel_tolerancia: new FormControl('', Validators.required),
    id_frecuencia_monitoreo: new FormControl('', Validators.required),
    id_puesto_responsable: new FormControl('', Validators.required),
    id_severidad: new FormControl('', Validators.required),
    usuario_registro: new FormControl('')
  })

  formMetodoMonitoreo = new FormGroup({
    id_riesgo_continuidad: new FormControl(''),
    descripcion_monitoreo: new FormControl('', Validators.required),
    usuario_registro: new FormControl('')
  })

  formFiltroRiesgo = new FormGroup({
    medida_riesgo: new FormControl(''),
    plan_faltante: new FormControl(''),
    matriz_continuidad_faltante: new FormControl('')
  })

  medidaRiesgoInput: any = '';
  riesgoEncontrado: any = {};
  validarExistenciaPlan: boolean = false;
  usuario: any = {};
  matrizObtenida: any = {
    periodo_abierto: 0
  };

  constructor(
    private riesgoService: RiesgosService,
    private route: ActivatedRoute,
    private catalogsService: CatalogosService,
    private planService: PlanRiesgosService,
    private usuarioService: UsuarioService,
    private router: Router,
    private utilidades: UtilidadesService,
    private matrizService: MatrizService

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id_matriz = param.get('id_matriz');
      this.linkMatrizPeriodos = `/admin/ingreso-riesgos/${this.id_matriz}`
      this.matrizService.getMatrizById(this.id_matriz).subscribe((result: any) => {
        this.matrizObtenida = result[0]
        if (sessionStorage.getItem('medida_riesgo') || sessionStorage.getItem('planes_trabajo') || sessionStorage.getItem('matrices_continuidad')) {
          this.formFiltroRiesgo.patchValue({
            medida_riesgo: sessionStorage.getItem('medida_riesgo'),
            plan_faltante: sessionStorage.getItem('planes_trabajo') == "1" ? 1 : 0,
            matriz_continuidad_faltante: sessionStorage.getItem('matrices_continuidad') == "1" ? 1 : 0,
          });
        } else {
          this.formFiltroRiesgo.patchValue({
            medida_riesgo: -1,
            plan_faltante: false,
            matriz_continuidad_faltante: false,
          });
        }
      })
    })
    this.configuration = { ...DefaultConfig }
    this.configuration.searchEnabled = true
    this.getCatalogos()
    this.getAllRiesgoByIdMatriz()
    this.suscripcionCamposRiesgo();
  }

  getCatalogos() {
    this.catalogsService.getUnidadEjecutora().subscribe(unidades => this.unidadesEjecutoras = unidades);
    this.catalogsService.getTipoObjetivo().subscribe(obj => this.tipoObjetivos = obj);
    this.catalogsService.getAreaEvaluada().subscribe(areas => this.areas_evaluadas = areas);
    this.catalogsService.getProbabilidad().subscribe(prob => this.probabilidades = prob);
    this.catalogsService.getMedidaRiesgo().subscribe(medidas => this.medidasRiesgo = medidas);
    this.catalogsService.getSeveridad().subscribe(severidades => this.severidades = severidades);
    this.catalogsService.getPrioridad().subscribe(prioridades => this.prioridades = prioridades);
    this.catalogsService.getPuestoResponsable().subscribe(puestos => this.puestos = puestos);
    this.usuarioService.obtenerUsuario().subscribe((result: any) => this.usuario = result);
  }

  //get riesgos by id_matriz
  getAllRiesgoByIdMatriz() {
    this.riesgoService.getAllRiesgoByIdMatriz(this.id_matriz).subscribe(riesgos => {
      this.riesgos = riesgos.res;
    }, err => {
      Swal.fire({
        icon: 'warning',
        text: '¡Algo salió mal al buscar los registros, por favor vuelva a intentarlo!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  //Eliminacion y Actualizacion de Riesgos
  updateRiesgo() {
    ///llamado de los inputs del formulario reactivo para realizar los calculos del ingreso de riesgos
    const tipo_objetivo_input = this.formUpdateRiesgo.get('id_tipo_objetivo')?.value
    //Se encuentra el tipo de objetivo seleccionado
    this.tipoObjetivoEncontrado = this.tipoObjetivos.find((objetivo: any) => tipo_objetivo_input == objetivo.id_tipo_objetivo)


    const updateRiesgo = {
      ...this.formUpdateRiesgo.value,
      codigo_referencia: this.tipoObjetivoEncontrado.codigo_referencia,
      riesgo_inherente: this.resultadoRI,
      riesgo_residual: this.resultadoRR,
      id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo,
      usuario_registro: this.usuario.id_usuario
    }

    this.riesgoService.updateRiesgo(this.id_riesgo_from_table, updateRiesgo).subscribe((value) => {
      //crear
      this.internosMemory.map((control: any) => {
        const newController = {
          ...control,
          // descripcion: ((this.countIndice += 1) + '. ') + control.descripcion,
          id_riesgo: this.id_riesgo_for_control_interno,
          usuario_registro: this.usuario.id_usuario
        }
        this.planService.createControlInterno(newController).subscribe((value) => { })
      })
      this.internosMemory = []
      //eliminar
      this.internosMemoryDelete.map((id_control: any) => {
        this.planService.deleteControlInterno(id_control, { estado_registro: 0, usuario_registro: this.usuario.id_usuario }).subscribe((value) => { })
      })

      this.internosMemoryDelete = []
      Swal.fire({
        icon: 'success',
        text: '¡El registro se actualizo correctamente!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })

      this.riesgoService.getRiesgoByIdMatriz(this.id_matriz, this.offset).subscribe(riesgo => {
        this.riesgos = riesgo.res
      })
    },
      err => {
        Swal.fire({
          icon: 'error',
          text: '¡Error al actualizar el registro!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
      })
  }

  deleteRiesgo(id_riesgo: any) {
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
        this.riesgoService.deleteRiesgo(id_riesgo).subscribe(() => {
          Swal.fire({
            icon: 'success',
            text: '¡El registro se elimino correctamente!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
          this.getAllRiesgoByIdMatriz()
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

  //Actualizacion de plan de trabajo, controles y recursos
  updatePlanTrabajoControlesRecursos() {
    this.planService.updatePlan(this.id_riesgo_plan_trabajo, { ...this.formUpdatePlan.value, usuario_registro: this.usuario.id_usuario }).subscribe((planObtenido) => {
      //crear
      this.controlesMemory.map((control: any) => {
        const indice = this.controlesMemory.indexOf(control);
        const newController = {
          ...control,
          descripcion: ((indice + 1) + '. ') + control.descripcion,
          id_riesgo_plan_trabajo: this.id_riesgo_plan_trabajo,
          usuario_registro: this.usuario.id_usuario
        }
        this.planService.createControlImplementacion(newController).subscribe((value) => {
          //obtener
          this.planService.getControlImplementacionByIdRiesgo(this.id_riesgo_from_table).subscribe((value: any) => {
            this.controlesImplementacionObtenidos = value;
            this.controlesMemory = []
            this.showInputsModalController = false
          }, err => {
            this.tableModalController = false
          })

        })
      })
      //eliminar
      this.controlesMemoryDelete.map((id_control: any) => {
        this.planService.deleteControlImplementacion(id_control, { estado_registro: 0, usuario_registro: this.usuario.id_usuario }).subscribe((value) => { })
      })



      this.recursosMemory.map((recurso: any) => {
        const newRecurso = {
          ...recurso,
          id_riesgo_plan_trabajo: this.id_riesgo_plan_trabajo,
          usuario_registro: this.usuario.id_usuario
        }
        this.planService.createRecurso(newRecurso).subscribe((value) => {
          this.planService.getRecursosByIdRiesgo(this.id_riesgo_from_table).subscribe(recursosObt => {
            this.recursosObtenidos = recursosObt;
            this.recursosMemory = []
            this.showInputsModalRecursos = false
          }, err => {
            this.showInputsModalRecursos = false
          })
        })
      })
      this.recursosMemoryDelete.map((id_recurso: any) => {
        this.planService.deleteRecursos(id_recurso, { estado_registro: 0, usuario_registro: this.usuario.id_usuario }).subscribe((value) => { })
      })


      this.controlInternoPlanMemory.map((controle: any) => {
        const newControlesInternosPlan = {
          ...controle,
          id_riesgo_plan_trabajo: this.id_riesgo_plan_trabajo,
          usuario_registro: this.usuario.id_usuario
        }
        this.planService.createControlInternoPlan(newControlesInternosPlan).subscribe((value) => {
          this.planService.getControlInternoPlanByIdRiesgo(this.id_riesgo_from_table).subscribe(controlObt => {
            this.controlesInternosPlanObtenidos = controlObt;
            this.controlInternoPlanMemory = []
            this.showInputsModalControlInternoPlan = false
          }, err => {
            this.showInputsModalControlInternoPlan = false
          })
        })
      })
      this.controlInternoPlanMemoryDelete.map((id_plan: any) => {
        this.planService.deleteControlInternoPlan(id_plan, { estado_registro: 0, usuario_registro: this.usuario.id_usuario }).subscribe((value) => { })
      })



      // this.logService.createLog(planObtenido).subscribe((value: any) => { })
      Swal.fire({
        icon: 'success',
        text: '¡El registro se actualizo correctamente!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
      this.resetVariables()
    }, err => {
      Swal.fire({
        icon: 'error',
        text: '¡Error al actualizar el registro!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
      this.resetVariables()
    })
  }

  //edit son metodos  que cargan la informacion a los formularios y tablas al momento de dar click en los btn en la tabla
  editRiesgo(id_riesgo: any) {
    this.id_riesgo_from_table = id_riesgo
    this.riesgoService.getRiesgoToEdit(id_riesgo).subscribe(riesgo => {
      this.formUpdateRiesgo.patchValue(riesgo)
      this.id_riesgo_for_control_interno = riesgo.id_riesgo
      this.riesgoEncontrado = riesgo
      this.planService.getControlInterno(id_riesgo).subscribe(controlInterno => {
        this.controlesInternosObtenidos = controlInterno;
        this.tableModalInterno = true
      })
    })
  }


  editPlanTrabajoControlesRecursos(id_riesgo: any) {
    this.id_riesgo_from_table = id_riesgo
    this.linkPlanTrabajo = `/admin/ingreso-plan-trabajo/${id_riesgo}/${this.id_matriz}`

    //llenamos el formulario del plan y  llenamos la variave id_riesgo_plan_trabajo
    this.planService.getPlanTrabajoByIdRiesgo(id_riesgo).subscribe(plan => {
      if (plan.existencia == 1) {
        this.formUpdatePlan.patchValue(plan.res[0])
        this.id_riesgo_plan_trabajo = plan.res[0].id_riesgo_plan_trabajo
        this.validarExistenciaPlan = true;
        //llenamos la variable controles con los controles obtenidos, adicional mostramos la tabla
        this.planService.getControlImplementacionByIdRiesgo(id_riesgo).subscribe(controlesImple => {
          this.controlesImplementacionObtenidos = controlesImple;
          this.tableModalController = true
        })
        //llenamos la variable recursos con los recursos obtenidos, adicional mostamos la tabla
        this.planService.getRecursosByIdRiesgo(id_riesgo).subscribe(recursos => {
          this.recursosObtenidos = recursos
          this.tableModalRecursos = true
        })

        this.planService.getControlInternoPlanByIdRiesgo(id_riesgo).subscribe(controles => {
          this.controlesInternosPlanObtenidos = controles
          this.tableModalControlesInternosPlan = true
        })
      } else if (plan.existencia == 0) {
        this.validarExistenciaPlan = false;
      }
    })

  }
  //push y splice en memorias controles y recursos
  //Controles Internos Memory
  addInternoInMemory() {
    if (this.formUpdateControlInterno.invalid) {
      this.utilidades.mostrarErrorNoti("Ingrese una descripción")
    } else {
      const dataFormControl = this.formUpdateControlInterno.value;
      if (dataFormControl.descripcion) {
        const newValue = {
          ...dataFormControl,
          descripcion: `- ${dataFormControl.descripcion}`
        }
        this.internosMemory.push(newValue);
        this.formUpdateControlInterno.reset()
      }
    }
  }
  deleteInternoInMemory(descripcion: any) {
    const indice = this.internosMemory.findIndex((value: any) => value.descripcion == descripcion)
    this.internosMemory.splice(indice, 1)
  }
  deleteInternoInMemoryTablaGet(id_control: any) {
    const indice = this.controlesInternosObtenidos.findIndex((value: any) => value.id_riesgo_control_interno == id_control);
    this.controlesInternosObtenidos.splice(indice, 1);
    this.internosMemoryDelete.push(id_control);
  }

  //Controles Memory
  addControlInMemory() {
    if (this.formUpdateControlImplementacion.invalid) {
      this.utilidades.mostrarErrorNoti('Debe de llenar todos los campos obligatorios!')
    } else {
      const dataFormControl = this.formUpdateControlImplementacion.value;
      if (dataFormControl.que || dataFormControl.como || dataFormControl.quien || dataFormControl.cuando) {
        const newValue = {
          ...dataFormControl,
          que: `- QUÉ: ${dataFormControl.que}`,
          como: `- CÓMO: ${dataFormControl.como}`,
          quien: `- QUIÉN: ${dataFormControl.quien}`,
          cuando: `- CUÁNDO: ${dataFormControl.cuando}`,
        }
        this.controlesMemory.push(newValue);
        this.formUpdateControlImplementacion.reset()
      }
    }
  }
  deleteControlInMemory(que: any, como: any, quien: any, cuando: any) {
    const indice = this.controlesMemory.findIndex((value: any) => value.que == que && value.como == como && value.quien == quien && value.cuando == cuando)
    this.controlesMemory.splice(indice, 1)
  }
  deleteControlInMemoryTablaGet(id_control: any) {
    const indice = this.controlesImplementacionObtenidos.findIndex((value: any) => value.id_implementacion == id_control);
    this.controlesImplementacionObtenidos.splice(indice, 1);
    this.controlesMemoryDelete.push(id_control);
  }

  //Memory Recursos
  addRecursoMemory() {
    if (this.formUpdateRecursos.invalid) {
      this.utilidades.mostrarErrorNoti('Debe de llenar los campos obligatorios!')
    } else {
      const dataFormControl = this.formUpdateRecursos.value;
      if (dataFormControl.descripcion) {
        const newValue = {
          ...dataFormControl,
          descripcion: `- ${dataFormControl.descripcion}`
        }
        this.recursosMemory.push(newValue);
        this.formUpdateRecursos.reset()
      }
    }
  }
  deleteRecursoMemory(descripcion: any) {
    const indice = this.recursosMemory.findIndex((value: any) => value.descripcion == descripcion)
    this.recursosMemory.splice(indice, 1)
  }
  deleteRecursoInMemoryTablaGet(id_recursos: any) {
    const indice = this.recursosObtenidos.findIndex((value: any) => value.id_recursos == id_recursos);
    this.recursosObtenidos.splice(indice, 1);
    this.recursosMemoryDelete.push(id_recursos);
  }
  addControlInternoPlanMemory() {
    if (this.formUpdateControlesInternosPlan.invalid) {
      this.utilidades.mostrarErrorNoti('Debe de llenar los campos obligatorios!')
    } else {
      const dataFormControl = this.formUpdateControlesInternosPlan.value;
      if (dataFormControl.descripcion) {
        const newValue = {
          ...dataFormControl,
          descripcion: `- ${dataFormControl.descripcion}`
        }
        this.controlInternoPlanMemory.push(newValue);
        this.formUpdateControlesInternosPlan.reset()
      }
    }
  }

  deleteControlInternoPlanInMemory(descripcion: any) {
    const indice = this.controlInternoPlanMemory.findIndex((value: any) => value.descripcion == descripcion)
    this.controlInternoPlanMemory.splice(indice, 1)
  }

  deleteControlInternoPlanInMemoryTablaGet(id_plan_control: any) {
    const indice = this.controlesInternosPlanObtenidos.findIndex((value: any) => value.id_plan_control_interno == id_plan_control);
    this.controlesInternosPlanObtenidos.splice(indice, 1);
    this.controlInternoPlanMemoryDelete.push(id_plan_control);
  }

  //muestran los inputs para ingresar nuevos controles y recursos
  mostrarCampos() {
    this.showInputsModalController = !this.showInputsModalController
  }
  mostrarCamposRecursos() {
    this.showInputsModalRecursos = !this.showInputsModalRecursos
  }
  mostrarCamposControlesInternosPlan() {
    this.showInputsModalControlInternoPlan = !this.showInputsModalControlInternoPlan
  }
  mostrarCamposInterno() {
    this.showInputsModalInterno = !this.showInputsModalInterno
  }

  cancelarUpdate() {
    this.internosMemoryDelete = []

  }

  verificarPlanes() {
    this.planService.getExistenciaPlanTrabajoPendiente(this.id_matriz).subscribe((result: any) => {
      if (result > 0) {
        Swal.fire({
          icon: 'warning',
          text: `¡Planes de trabajo pedientes de ingresar!`,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
      } else {
        this.router.navigate(['/admin/ingreso-riesgos/', this.id_matriz])
        this.utilidades.removeFiltroCache();
      }
    }, err => {
      Swal.fire({
        icon: 'warning',
        text: `¡Algo salio mal al procesar la solicitud, por favor intente de nuevo!`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  resetVariables() {
    this.validarExistenciaPlan = false;
  }

  goToMatrizContinuidad(riesgoGrid: any) {
    // this.linkMatrizContinuidad = `/admin/grid-continuidad/${riesgoGrid}/${this.id_matriz}`
    this.router.navigate(['/admin/grid-continuidad/', riesgoGrid, this.id_matriz])
  }
  goToSeguimientoRiesgo(riesgoGrid: any) {
    // this.linkMatrizContinuidad = `/admin/grid-continuidad/${riesgoGrid}/${this.id_matriz}`
    this.router.navigate(['/admin/seguimiento-riesgo/', riesgoGrid, this.id_matriz])
  }

  saveInCache() {
    sessionStorage.setItem('medida_riesgo', this.formFiltroRiesgo.get('medida_riesgo')?.value)
    sessionStorage.setItem('planes_trabajo', this.formFiltroRiesgo.get('plan_faltante')?.value == true ? "1" : "0")
    sessionStorage.setItem('matrices_continuidad', this.formFiltroRiesgo.get('matriz_continuidad_faltante')?.value == true ? "1" : "0")
  }

  removeCache() {
    this.utilidades.removeFiltroCache();
  }

  suscripcionCamposRiesgo() {
    this.formUpdateRiesgo.get('id_severidad')?.valueChanges.subscribe((severidad_input: any) => {
      this.showBtnControlI = false
      this.formUpdateRiesgo.patchValue({ riesgo_inherente: this.formUpdateRiesgo.get('id_probabilidad')?.value * severidad_input })
      this.resultadoRI = this.formUpdateRiesgo.get('riesgo_inherente')?.value

      if (this.formUpdateRiesgo.get('id_control_mitigador')?.value && this.formUpdateRiesgo.get('id_probabilidad')?.value) {
        this.formUpdateRiesgo.patchValue({ riesgo_residual: this.formUpdateRiesgo.get('riesgo_inherente')?.value / this.formUpdateRiesgo.get('id_control_mitigador')?.value })
        this.resultadoRR = this.formUpdateRiesgo.get('riesgo_residual')?.value
        this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
          if (this.formUpdateRiesgo.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
            return medida
          }
        })
        this.formUpdateRiesgo.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
        this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
      }
    })
    this.formUpdateRiesgo.get('id_probabilidad')?.valueChanges.subscribe((probabilidad_input: any) => {
      this.showBtnControlP = false
      this.formUpdateRiesgo.patchValue({ riesgo_inherente: this.formUpdateRiesgo.get('id_severidad')?.value * probabilidad_input })
      this.resultadoRI = this.formUpdateRiesgo.get('riesgo_inherente')?.value

      if (this.formUpdateRiesgo.get('id_control_mitigador')?.value && this.formUpdateRiesgo.get('id_severidad')?.value) {
        this.formUpdateRiesgo.patchValue({ riesgo_residual: this.formUpdateRiesgo.get('riesgo_inherente')?.value / this.formUpdateRiesgo.get('id_control_mitigador')?.value })
        this.resultadoRR = this.formUpdateRiesgo.get('riesgo_residual')?.value
        this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
          if (this.formUpdateRiesgo.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
            return medida
          }
        })
        this.formUpdateRiesgo.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
        this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
      }
    })
    this.formUpdateRiesgo.get('id_control_mitigador')?.valueChanges.subscribe((mitigador_input: any) => {
      this.formUpdateRiesgo.patchValue({ riesgo_residual: this.formUpdateRiesgo.get('riesgo_inherente')?.value / mitigador_input })
      this.resultadoRR = this.formUpdateRiesgo.get('riesgo_residual')?.value
      this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
        if (this.formUpdateRiesgo.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
          return medida
        }
      })
      this.formUpdateRiesgo.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
      this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
    })
  }
}
