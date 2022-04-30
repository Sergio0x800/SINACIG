import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-table-info-riesgos',
  templateUrl: './table-info-riesgos.component.html',
  styleUrls: ['./table-info-riesgos.component.css']
})
export class TableInfoRiesgosComponent implements OnInit {

  @Input() tableInfo: any = [];
  @Input() paramsDate: any = {};
  @Output() Id_riesgo: any = new EventEmitter();

  tableInfoDate: any = []

  //config fechas
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  myDateInit: boolean = true;
  model: any = null;
  myDateInicioFin: any = {};
  locale: string = 'es'

  //updated Riesgo//
  id_riesgo_table: any = 0;
  riesgoUpdate: any = {};
  riesgoUpdateSp: any = {};


  routePlanRiesgo = '/admin/plan/'
  routeActualizarRiesgo = '/actualizar-riesgo/'

  unidadesEjecutoras: any = [];
  tipoObjetivos: any = [];
  referencias: any = [];
  areas_evaluadas: any = [];
  eventos: any = [];
  probabilidades: any = [];
  medidasRiesgo: any = [];
  severidades: any = [];
  prioridades: any = [];

  resultadoRI: any = 0;
  resultadoRR: any = 0;

  formUpdateRiesgo = new FormGroup({
    id_unidad_ejecutora: new FormControl(''),
    fecha_encontrado: new FormControl(''),
    id_tipo_objetivo: new FormControl(''),
    codigo_referencia: new FormControl({ value: '', disabled: true }),
    id_area_evaluada: new FormControl(''),
    id_eventos_identificados: new FormControl(''),
    descripcion_riesgo: new FormControl(''),
    observaciones: new FormControl(''),
    id_probabilidad: new FormControl(''),
    id_severidad: new FormControl(''),
    riesgo_inherente: new FormControl({ value: 0, disabled: true }),
    valor_control_mitigador: new FormControl(''),
    riesgo_residual: new FormControl({ value: 0, disabled: true }),
    id_medida_riesgo: new FormControl({ value: '', disabled: true })
  })

  constructor(private catalogsService: CatalogosService,
    private riesgosService: RiesgosService) { }

  ngOnInit(): void {
    this.catalogsService.getUnidadEjecutora().subscribe(unidades => this.unidadesEjecutoras = unidades);
    this.catalogsService.getTipoObjetivo().subscribe(obj => this.tipoObjetivos = obj);
    // this.catalogsService.getReferencia().subscribe(ref => this.referencias = ref);
    this.catalogsService.getAreaEvaluada().subscribe(areas => this.areas_evaluadas = areas);
    this.catalogsService.getEventos().subscribe(event => this.eventos = event);
    this.catalogsService.getProbabilidad().subscribe(prob => this.probabilidades = prob);
    this.catalogsService.getMedidaRiesgo().subscribe(medidas => this.medidasRiesgo = medidas);
    this.catalogsService.getSeveridad().subscribe(severidades => this.severidades = severidades);
    this.catalogsService.getPrioridad().subscribe(prioridades => this.prioridades = prioridades);

    this.formUpdateRiesgo.valueChanges.subscribe((value) => {
      parseInt(value.id_probabilidad)
      parseInt(value.id_severidad)
      this.resultadoRI = value.id_probabilidad * value.id_severidad
      value.riesgo_inherente = this.resultadoRI
      parseInt(value.valor_control_mitigador)
      this.resultadoRR = value.riesgo_inherente / value.valor_control_mitigador
      value.riesgo_residual = this.resultadoRR
    })
  }

  deleteRiesgo(id_riesgo: any) {
    this.Id_riesgo.emit(id_riesgo);
  }

  createNewRiesgo() {
    this.formUpdateRiesgo.valueChanges.subscribe((value) => {
      parseInt(value.id_area_evaluada)
      parseInt(value.id_eventos_identificados)
      parseInt(value.id_medida_riesgo)
      parseInt(value.id_probabilidad)
      parseInt(value.id_severidad)
      parseInt(value.id_tipo_objetivo)
      parseInt(value.id_unidad_ejecutora)
    })
    this.riesgosService.createRiesgo(this.formUpdateRiesgo.value).subscribe(() => {
      Swal.fire({
        icon: 'success',
        text: 'El registro se agrego correctamente!'
      })
    },
      err => {
        Swal.fire({
          icon: 'error',
          text: 'Error al ingresar el registro!'
        })
      })
  }

  updateRiesgo() {
    this.formUpdateRiesgo.valueChanges.subscribe((value) => {
      parseInt(value.id_area_evaluada)
      parseInt(value.id_eventos_identificados)
      parseInt(value.id_medida_riesgo)
      parseInt(value.id_probabilidad)
      parseInt(value.id_severidad)
      parseInt(value.id_tipo_objetivo)
      parseInt(value.id_unidad_ejecutora)
    })
    this.riesgosService.updateRiesgo(this.id_riesgo_table, this.formUpdateRiesgo.value).subscribe(value => {
      Swal.fire({
        icon: 'success',
        text: 'El registro se actualizo correctamente!'
      })
    },
      err => {
        Swal.fire({
          icon: 'error',
          text: 'Error al actualizar el registro!'
        })
      })
  }

  // editRiesgo(id_riesgo: any) {
  //   this.id_riesgo_table = id_riesgo
  //   this.riesgosService.getRiesgoById(id_riesgo).subscribe(riesgo => {
  //     this.formUpdateRiesgo.patchValue(riesgo)
  //   })
  //   this.riesgosService.getRiesgoSP(id_riesgo).subscribe(riesgo => {
  //     this.riesgoUpdateSp = riesgo[0];
  //   })
  // }

  resetForm() {
    this.formUpdateRiesgo.reset();
    const dataSearch = {
      ...this.paramsDate,
      fechaInicio: this.paramsDate.fechaInicio.singleDate.formatted,
      fechaFin: this.paramsDate.fechaFin.singleDate.formatted
    }
    this.riesgosService.getRiesgosByParams(dataSearch).subscribe(value => {
      this.tableInfo = value
    })
  }

}