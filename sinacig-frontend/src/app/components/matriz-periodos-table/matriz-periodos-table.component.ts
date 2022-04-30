import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { MatrizService } from 'src/app/services/matriz.service';

import { IAngularMyDpOptions } from 'angular-mydatepicker';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-matriz-periodos-table',
  templateUrl: './matriz-periodos-table.component.html',
  styleUrls: ['./matriz-periodos-table.component.css']
})
export class MatrizPeriodosTableComponent implements OnInit {

  @Input() matriz_periodos: any = [];
  @Input() searchParams: any = {};
  @Input() showTable: any = false;
  @Output() id_matriz: any = new EventEmitter();

  //Configuracion mydatepicker
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  myDateInit: boolean = true;
  model: any = null;
  locale: string = 'es'

  unidadesEjecutoras: any = [];
  id_matriz_global: any = 0;

  routeIngresoRiesgos: any = '/admin/riesgos/'
  constructor(
    private catalogsService: CatalogosService,
    private matrizService: MatrizService,
  ) { }

  formUpdateMatriz = new FormGroup({
    id_unidad_ejecutora: new FormControl('', Validators.required),
    fecha_periodo_inicio: new FormControl('', Validators.required),
    fecha_periodo_fin: new FormControl('', Validators.required),
    usuario_registro: new FormControl('1')
  })

  ngOnInit(): void {
    this.catalogsService.getUnidadEjecutora().subscribe(unidades => this.unidadesEjecutoras = unidades);
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
        this.matrizService.deleteMatriz(id_matriz).subscribe(() => {
          Swal.fire({
            icon: 'success',
            text: '¡El registro se eliminó correctamente!'
          });
          this.showTable = false
          // const dataSearch = {
          //   ...this.searchParams.value,
          //   fecha_periodo_inicio: this.searchParams.value.fecha_periodo_inicio,
          //   fecha_periodo_fin: this.searchParams.value.fecha_periodo_fin
          // }
          // this.matrizService.getMatrizByParams(dataSearch)
          //   .subscribe(matriz => {
          //     this.matriz_periodos = matriz;
          //   })
        }, err => {
          Swal.fire({
            icon: 'error',
            text: '¡No se pudo eliminar el registro!'
          })
        });
      }
    })
  }

  updatePeriodoMatriz(id_matriz: any) {
    // this.formUpdateMatriz.valueChanges.subscribe((value) => {
    //   parseInt(value.id_area_evaluada)
    //   parseInt(value.id_eventos_identificados)
    //   parseInt(value.id_medida_riesgo)
    //   parseInt(value.id_probabilidad)
    //   parseInt(value.id_severidad)
    //   parseInt(value.id_tipo_objetivo)
    //   parseInt(value.id_unidad_ejecutora)
    // })
    const dataSearch = {
      ...this.formUpdateMatriz.value,
      // fecha_periodo_inicio: this.formUpdateMatriz.value.fecha_periodo_inicio.singleDate.formatted,
      // fecha_periodo_fin: this.formUpdateMatriz.value.fecha_periodo_fin.singleDate.formatted
    }
    this.matrizService.updateMatriz(id_matriz, dataSearch).subscribe(value => {
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

  setValues(id_matriz: any) {
    this.matrizService.getMatrizById(id_matriz).subscribe(value => {
      this.formUpdateMatriz.patchValue(value[0]);
    })
    this.id_matriz_global = id_matriz
  }

  resetFormPeriodoMatriz() {
    const dataSearch = {
      ...this.searchParams.value,
      fecha_periodo_inicio: this.searchParams.value.fecha_periodo_inicio.singleDate.formatted,
      fecha_periodo_fin: this.searchParams.value.fecha_periodo_fin.singleDate.formatted
    }
    this.matrizService.getMatrizByParams(this.formUpdateMatriz.value).subscribe(value => {
      this.matriz_periodos = value;
    })
  }




}
