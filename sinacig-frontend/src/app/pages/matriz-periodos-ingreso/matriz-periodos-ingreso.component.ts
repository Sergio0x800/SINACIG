import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { CatalogosService } from 'src/app/services/catalogos.service';
import { MatrizService } from 'src/app/services/matriz.service';

import { IAngularMyDpOptions } from 'angular-mydatepicker';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-matriz-periodos-ingreso',
  templateUrl: './matriz-periodos-ingreso.component.html',
  styleUrls: ['./matriz-periodos-ingreso.component.css']
})
export class MatrizPeriodosIngresoComponent implements OnInit {

  //config fechas
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  myDateInit: boolean = true;
  model: any = null;
  myDateInicioFin: any = {};
  locale: string = 'es'
  //Inicializando Catalogos
  unidadesEjecutoras: any = [];

  //Forms Control Create Riesgo
  formCreateMatrizPeriodo = new FormGroup({
    id_unidad_ejecutora: new FormControl(0, Validators.required),
    fecha_periodo_inicio: new FormControl('', Validators.required),
    fecha_periodo_fin: new FormControl('', Validators.required)
  })

  constructor(
    private catalogsService: CatalogosService,
    private matrizService: MatrizService
  ) { }

  ngOnInit(): void {
    this.catalogsService.getUnidadEjecutora().subscribe(unidades => this.unidadesEjecutoras = unidades);
  }

  createNewMatrizPeriodo() {
    this.formCreateMatrizPeriodo.valueChanges.subscribe((value) => {
      value.id_unidad_ejecutora = parseInt(value.id_unidad_ejecutora)
    })
    const dataSearch = {
      ...this.formCreateMatrizPeriodo.value,
      fecha_periodo_inicio: this.formCreateMatrizPeriodo.value.fecha_periodo_inicio.singleDate.formatted,
      fecha_periodo_fin: this.formCreateMatrizPeriodo.value.fecha_periodo_fin.singleDate.formatted
    }
    this.matrizService.getMatrizByParams(dataSearch).subscribe((value) => {
      if (value) {
        Swal.fire({
          icon: 'warning',
          text: 'Actualmente existe un registro con estos parametros!'
        })
      }
    }, err => {
      this.matrizService.createMatriz(dataSearch).subscribe(() => {
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
    })
  }
}
