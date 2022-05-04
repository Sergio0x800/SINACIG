import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanRiesgosService } from 'src/app/services/plan-riesgos.service';
import { CorrelativoService } from 'src/app/services/correlativo.service';


@Component({
  selector: 'app-riesgos',
  templateUrl: './riesgos.component.html',
  styleUrls: ['./riesgos.component.css']
})
export class RiesgosComponent implements OnInit {

  //mostrar tabla
  showTablePlanesTrabajo = true;
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


  //muestran los campos al momento de darle en nuevo en el modal de controles y recursos
  showInputsModalController: boolean = false;
  showInputsModalRecursos: boolean = false;
  showInputsModalInterno: boolean = false;
  tableModalController: boolean = false;
  tableModalRecursos: boolean = false;
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
  recursosMemoryDelete: any = [];
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
    usuario_registro: new FormControl('1', Validators.required),
  })




  formUpdatePlan = new FormGroup({
    id_prioridad: new FormControl('', Validators.required),
    id_puesto_responsable: new FormControl('', Validators.required),
    fecha_inicio: new FormControl('', Validators.required),
    fecha_fin: new FormControl('', Validators.required),
    comentario: new FormControl(''),
    usuario_registro: new FormControl('1', Validators.required),
  })
  formUpdateControlImplementacion = new FormGroup({
    que: new FormControl('', Validators.required),
    como: new FormControl('', Validators.required),
    quien: new FormControl('', Validators.required),
    cuando: new FormControl('', Validators.required),
    usuario_registro: new FormControl('1', Validators.required),
  })
  formUpdateRecursos = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    usuario_registro: new FormControl('1', Validators.required),
  })
  medidaRiesgoInput: any = '';
  riesgoEncontrado: any = {};
  validarExistenciaPlan: any = {};
  usuario: any = {};




  constructor(
    private riesgoService: RiesgosService,
    private route: ActivatedRoute,
    private catalogsService: CatalogosService,
    private planService: PlanRiesgosService,
    private correlativoService: CorrelativoService,
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id_matriz = param.get('id_matriz');
      this.linkMatrizPeriodos = `/admin/ingreso-riesgos/${this.id_matriz}`
    })

    this.riesgoService.getRiesgoByIdMatriz(this.id_matriz).subscribe(riesgos => {
      this.riesgos = riesgos;
    }, err => {
      Swal.fire({
        icon: 'warning',
        text: '¡No existen registros para mostrar!'
      })
      this.showTablePlanesTrabajo = false
    })

    this.catalogsService.getUnidadEjecutora().subscribe(unidades => this.unidadesEjecutoras = unidades);
    this.catalogsService.getTipoObjetivo().subscribe(obj => this.tipoObjetivos = obj);
    this.catalogsService.getAreaEvaluada().subscribe(areas => this.areas_evaluadas = areas);
    this.catalogsService.getProbabilidad().subscribe(prob => this.probabilidades = prob);
    this.catalogsService.getMedidaRiesgo().subscribe(medidas => this.medidasRiesgo = medidas);
    this.catalogsService.getSeveridad().subscribe(severidades => this.severidades = severidades);
    this.catalogsService.getPrioridad().subscribe(prioridades => this.prioridades = prioridades);
    this.catalogsService.getPuestoResponsable().subscribe(puestos => this.puestos = puestos);
    this.usuarioService.user$.subscribe(user => this.usuario = user.usuario)


    ///llamado de los inputs del formulario reactivo para realizar los calculos del ingreso de riesgos
    this.formUpdateRiesgo.get('id_tipo_objetivo')?.valueChanges.subscribe((tipo_objetivo_input: any) => {
      //Se encuentra el tipo de objetivo seleccionado
      this.tipoObjetivoEncontrado = this.tipoObjetivos.find((objetivo: any) => tipo_objetivo_input == objetivo.id_tipo_objetivo)
      //busca una conicidencia, si no la encuentra incicializa a zero el correlativo
      this.correlativoService.getCorrelativo({ id_matriz: this.id_matriz, id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo }).subscribe(maximoEncontrado => {
        if (!maximoEncontrado) {
          const newCorrelativo = {
            id_matriz: this.id_matriz,
            id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo,
            correlativo_maximo: 0,
            usuario_registro: 1
          }
          this.correlativoService.createCorrelativo(newCorrelativo).subscribe(initCorrelativo => {
            //nuevamente busca una coincidencia, cuando la encuentra aumenta a 1 el correlativo
            this.correlativoService.getCorrelativo({ id_matriz: this.id_matriz, id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo }).subscribe(maximo => {
              this.formUpdateRiesgo.patchValue({ codigo_referencia: this.tipoObjetivoEncontrado.codigo_referencia + (maximo.correlativo_maximo + 1) })
              this.codigoReferenciaToInput = this.formUpdateRiesgo.get('codigo_referencia')?.value
              //este atributo sirve para al momento de crear el nuevo correlativo
              this.maximoCorrelativoEncontrado = maximo
            })
          })
        } else {
          //si el correlativo ya esta inicializado, solo aumenta a 1 el correlativo maximo
          this.correlativoService.getCorrelativo({ id_matriz: this.id_matriz, id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo }).subscribe(maximo => {
            this.formUpdateRiesgo.patchValue({ codigo_referencia: this.tipoObjetivoEncontrado.codigo_referencia + (maximo.correlativo_maximo + 1) })
            this.codigoReferenciaToInput = this.formUpdateRiesgo.get('codigo_referencia')?.value
            this.maximoCorrelativoEncontrado = maximo
          })
        }
      })
    })

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

  //Eliminacion y Actualizacion de Riesgos
  updateRiesgo() {
    // this.countIndice = this.controlesInternosObtenidos.length
    let updateRiesgo = {}
    if (this.tipoObjetivoEncontrado.id_tipo_objetivo == this.riesgoEncontrado.id_tipo_objetivo) {
      updateRiesgo = {
        ...this.formUpdateRiesgo.value,
        codigo_referencia: this.riesgoEncontrado.codigo_referencia,
        riesgo_inherente: this.resultadoRI,
        riesgo_residual: this.resultadoRR,
        id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo,
        usuario_registro: this.usuario.id_usuario
      }
    } else {
      updateRiesgo = {
        ...this.formUpdateRiesgo.value,
        codigo_referencia: this.codigoReferenciaToInput,
        riesgo_inherente: this.resultadoRI,
        riesgo_residual: this.resultadoRR,
        id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo,
        usuario_registro: this.usuario.id_usuario
      }
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
        this.planService.deleteControlInterno(id_control).subscribe((value) => { })
      })





      this.internosMemoryDelete = []
      Swal.fire({
        icon: 'success',
        text: 'El registro se actualizo correctamente!'
      })
      if (this.tipoObjetivoEncontrado.id_tipo_objetivo == this.riesgoEncontrado.id_tipo_objetivo) {
      } else {
        this.correlativoService.deleteCorrelativo(this.maximoCorrelativoEncontrado.id_correlativo_maximo).subscribe(value => {
          delete this.maximoCorrelativoEncontrado.id_correlativo_maximo
          delete this.maximoCorrelativoEncontrado.fecha_registro
          delete this.maximoCorrelativoEncontrado.usuario_registro
          const newCorrelativo = {
            ...this.maximoCorrelativoEncontrado,
            usuario_registro: this.usuario.id_usuario,
            correlativo_maximo: this.maximoCorrelativoEncontrado.correlativo_maximo + 1
          }
          this.correlativoService.createCorrelativo(newCorrelativo).subscribe(value => {
          })
        }, err => {
          const newCorrelativo = {
            id_matriz: this.id_matriz,
            id_tipo_objetivo: this.tipoObjetivoEncontrado.id_tipo_objetivo,
            correlativo_maximo: 1,
            usuario_registro: this.usuario.id_usuario
          }
          this.correlativoService.createCorrelativo(newCorrelativo).subscribe(initCorrelativo => {
          })
        })
      }


      this.riesgoService.getRiesgoByIdMatriz(this.id_matriz).subscribe(riesgo => {
        this.riesgos = riesgo
      })
    },
      err => {
        Swal.fire({
          icon: 'error',
          text: 'Error al actualizar el registro!'
        })
      })
  }

  deleteRiesgo(id_riesgo: any) {
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
        this.riesgoService.deleteRiesgo(id_riesgo).subscribe(() => {
          Swal.fire({
            icon: 'success',
            text: 'El registro se elimino correctamente!'
          });
          this.riesgoService.getRiesgoByIdMatriz(this.id_matriz).subscribe(riesgos => {
            this.riesgos = riesgos
          }, err => {
            this.showTablePlanesTrabajo = false
          })
        }, err => {
          Swal.fire({
            icon: 'error',
            text: 'No se pudo eliminar el registro!'
          })
        });
      }
    })
  }

  //Actualizacion de plan de trabajo, controles y recursos
  updatePlanTrabajoControlesRecursos() {
    this.planService.updatePlan(this.id_riesgo_plan_trabajo, this.formUpdatePlan.value).subscribe((planObtenido) => {
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
        this.planService.deleteControlImplementacion(id_control).subscribe((value) => { })
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
        this.planService.deleteRecursos(id_recurso).subscribe((value) => { })
      })
      Swal.fire({
        icon: 'success',
        text: 'El registro se actualizo correctamente!'
      })
    }, err => {
      Swal.fire({
        icon: 'error',
        text: 'Error al actualizar el registro!'
      })
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
        console.log(this.controlesInternosObtenidos)
        this.tableModalInterno = true
      })
    })
  }


  editPlanTrabajoControlesRecursos(id_riesgo: any) {
    this.id_riesgo_from_table = id_riesgo
    this.linkPlanTrabajo = `/admin/ingreso-plan-trabajo/${id_riesgo}/${this.id_matriz}`

    //llenamos el formulario del plan y  llenamos la variave id_riesgo_plan_trabajo
    this.planService.getPlanTrabajoByIdRiesgo(id_riesgo).subscribe(plan => {
      this.formUpdatePlan.patchValue(plan[0])
      this.id_riesgo_plan_trabajo = plan[0].id_riesgo_plan_trabajo
      this.validarExistenciaPlan = plan[0]
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
    })

  }
  //push y splice en memorias controles y recursos
  //Controles Internos Memory
  addInternoInMemory() {
    const dataFormControl = this.formUpdateControlInterno.value;
    if (dataFormControl.descripcion) {
      this.internosMemory.push(dataFormControl);
      this.formUpdateControlInterno.reset()
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
    console.log(this.controlesInternosObtenidos)
  }



  //Controles Memory
  addControlInMemory() {
    const dataFormControl = this.formUpdateControlImplementacion.value;
    if (dataFormControl.que || dataFormControl.como || dataFormControl.quien || dataFormControl.cuando) {
      this.controlesMemory.push(dataFormControl);
      this.formUpdateControlImplementacion.reset()
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
    const dataFormControl = this.formUpdateRecursos.value;
    if (dataFormControl.descripcion) {
      this.recursosMemory.push(dataFormControl);
      this.formUpdateRecursos.reset()
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

  //muestran los inputs para ingresar nuevos controles y recursos
  mostrarCampos() {
    this.showInputsModalController = !this.showInputsModalController
  }
  mostrarCamposRecursos() {
    this.showInputsModalRecursos = !this.showInputsModalRecursos
  }
  mostrarCamposInterno() {
    this.showInputsModalInterno = !this.showInputsModalInterno
  }

  cancelarUpdate() {
    this.internosMemoryDelete = []
  }

  verificarPlanes() {
    this.planService.getExistenciaPlanTrabajo(this.id_matriz).subscribe((result: any) => {
      Swal.fire({
        icon: 'warning',
        text: `¡Para ingresar un nuevo riesgo debe de asignar un plan de trabajo a todos los riesgos del periodo actual!`
      })
    }, err => {
      this.router.navigate(['/admin/ingreso-riesgos/', this.id_matriz])
    })
  }
}
