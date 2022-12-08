import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
import { PlanTrabajoService } from '../../services/plan-trabajo/plan-trabajo.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-plan-trabajo',
  templateUrl: './plan-trabajo.component.html',
  styleUrls: ['./plan-trabajo.component.css']
})
export class PlanTrabajoComponent implements OnInit {
  //Inicializando Catalogos
  unidadesEjecutoras: any = [];

  //Forms Control Search by Params
  generarReporte = new FormGroup({
    unidadEjecutora: new FormControl('', Validators.required),
    id_periodo: new FormControl('', Validators.required),
    // fechaInicio: new FormControl('', Validators.required),
    // fechaFin: new FormControl('', Validators.required)
  })
  usuario: any;
  periodos: any;
  constructor(
    private catalogsService: CatalogosService,
    private reporteService: PlanTrabajoService,
    private utilidades: UtilidadesService,
    private usuarioService: UsuarioService,
  ) { }

  //fechas
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy',
  };
  locale: string = 'es'

  ngOnInit(): void {
    this.utilidades.removeItem();
    this.catalogsService.getPeriodos().subscribe(periodos => this.periodos = periodos)
    this.usuarioService.obtenerUsuario().subscribe((result: any) => {
      this.usuario = result
      if (this.usuario.id_rol == 1 || this.usuario.id_rol == 3) {
        this.catalogsService.getUnidadEjecutora().subscribe(unidades => {
          let todas = []
          todas = unidades.filter((unidad: any) => unidad.codigo_unidad == 999)
          this.unidadesEjecutoras = unidades.filter((unidad: any) => unidad.codigo_unidad < 999)
          this.unidadesEjecutoras.unshift(todas[0])
        });
      } else {
        this.catalogsService.getUnidadEjecutoraById(this.usuario.id_unidad_ejecutora).subscribe(unidades => {
          this.unidadesEjecutoras = unidades
        })
      }
    })
  }

  descargarReporte(): void {
    const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.generarReporte.get('id_periodo')?.value)
    const dataReporte = {
      unidadEjecutora: this.generarReporte.get('unidadEjecutora')?.value,
      fechaInicio: periodoSeleccionado.fecha_inicio,
      fechaFin: periodoSeleccionado.fecha_fin
    }

    const fechaCorrecta: boolean = this.validarFechas(dataReporte.fechaInicio, dataReporte.fechaFin);
    if (!fechaCorrecta) {
      Swal.fire({
        icon: 'error',
        text: '¡La fecha final ingresada no es válida!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
    } else {
      this.reporteService.generarReporte(dataReporte).subscribe(res => {
        const dataType = res.type;
        const binaryData = [];
        binaryData.push(res);

        const filePath = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        const downloadlink = document.createElement('a');
        downloadlink.href = filePath;
        downloadlink.setAttribute('download', "Plan_de_trabajo.xlsx");
        document.body.appendChild(downloadlink)
        downloadlink.click();
      }, err => {
        this.utilidades.showError('¡Error al generar el reporte!', 'Algo salió mal mientras se procesaba la solicitud, por favor vuelva a intentarlo')
      });
    }
  }

  validarFormPlan() {
    if (this.generarReporte.get('unidadEjecutora')?.invalid) {
      this.utilidades.mostrarError('Selecciona una unidad ejecutora')
    } else if (this.generarReporte.get('fechaInicio')?.invalid) {
      this.utilidades.mostrarError('Selecciona una fecha inicial')
    } else if (this.generarReporte.get('fechaFin')?.invalid) {
      this.utilidades.mostrarError('Seleccione una fecha final')
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
