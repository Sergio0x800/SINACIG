import { Component, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { EvaluacionRiesgoReporteService } from '../services/evaluacion-riesgo/evaluacion-riesgo-reporte.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
@Component({
  selector: 'app-evaluacion-riesgo-reporte',
  templateUrl: './evaluacion-riesgo-reporte.component.html',
  styleUrls: ['./evaluacion-riesgo-reporte.component.css']
})
export class EvaluacionRiesgoReporteComponent implements OnInit {
  //Inicializando Catalogos
  unidadesEjecutoras: any = [];
  periodos: any = []

  //Forms Control Search by Params
  generarReporte = new FormGroup({
    unidadEjecutora: new FormControl('', Validators.required),
    id_periodo: new FormControl('', Validators.required),
  })
  constructor(
    private catalogsService: CatalogosService,
    private reporteService: EvaluacionRiesgoReporteService,
    private utilidades: UtilidadesService
  ) { }

  //fechas
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  locale: string = 'es'

  ngOnInit(): void {
    this.catalogsService.getUnidadEjecutora().subscribe(unidades => this.unidadesEjecutoras = unidades);
    this.catalogsService.getPeriodos().subscribe(periodos => this.periodos = periodos)
  }

  descargarReporte(): void {
    const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.generarReporte.get('id_periodo')?.value)
    const dataSearch = {
      ...this.generarReporte.value,
      fechaInicio: periodoSeleccionado.fecha_inicio,
      fechaFin: periodoSeleccionado.fecha_fin
    }
    // const dataReporte = {
    //   unidadEjecutora: this.generarReporte.get('unidadEjecutora')?.value,
    //   fechaInicio: this.generarReporte.get('fechaInicio')?.value.singleDate.formatted,
    //   fechaFin: this.generarReporte.get('fechaFin')?.value.singleDate.formatted,
    // }
    const fechaCorrecta: boolean = this.validarFechas(dataSearch.fechaInicio, dataSearch.fechaFin);
    if (!fechaCorrecta) {
      Swal.fire({
        icon: 'error',
        text: '¡La fecha final ingresada no es válida!'
      })
    } else {
      this.reporteService.generarReporte(dataSearch).subscribe(res => {
        const dataType = res.type;
        const binaryData = [];
        binaryData.push(res);

        const filePath = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        const downloadlink = document.createElement('a');
        downloadlink.href = filePath;
        downloadlink.setAttribute('download', "Matriz_evaluacion_riesgos.xlsx");
        document.body.appendChild(downloadlink)
        downloadlink.click();
      });
    }
  }

  validarFormSearch() {
    if (this.generarReporte.get('unidadEjecutora')?.invalid) {
      this.utilidades.mostrarError('Selecciona una unidad ejecutora')
    } else if (this.generarReporte.get('id_periodo')?.invalid) {
      this.utilidades.mostrarError('Selecciona un periodo')
    } else {
      this.descargarReporte()
    }
  }

  validarFechas(fechaInicio: string, fechaFinal: string): boolean {
    let fechaCorrecta = true;
    let inicioFecha = fechaInicio.split("-");
    let finalFecha = fechaFinal.split("-");
    let anioInicio = parseInt(inicioFecha[0])
    let mesInicio = parseInt(inicioFecha[1])
    let diaInicio = parseInt(inicioFecha[2])
    let anioFinal = parseInt(finalFecha[0])
    let mesFinal = parseInt(finalFecha[1])
    let diaFinal = parseInt(finalFecha[2])

    if (anioFinal < anioInicio) {
      fechaCorrecta = false;
    } else if (mesFinal < mesInicio) {
      fechaCorrecta = false;
    } else if (diaFinal < diaInicio) {
      fechaCorrecta = false;
    }

    return fechaCorrecta;
  }

}
