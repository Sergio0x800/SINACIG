import { Component, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MapaRiesgoService } from '../services/mapa-riesgo/mapa-riesgo.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mapa-riesgo',
  templateUrl: './mapa-riesgo.component.html',
  styleUrls: ['./mapa-riesgo.component.css']
})
export class MapaRiesgoComponent implements OnInit {
  //Inicializando Catalogos
  unidadesEjecutoras: any = [];
  periodos: any = []
  //fechas
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  locale: string = 'es';

  //Forms Control Search by Params
  generarReporte = new FormGroup({
    unidadEjecutora: new FormControl('', Validators.required),
    id_periodo: new FormControl('', Validators.required),
  })
  usuario: any;
  constructor(
    private catalogsService: CatalogosService,
    private reporteService: MapaRiesgoService,
    private utilidades: UtilidadesService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.catalogsService.getPeriodos().subscribe(periodos => this.periodos = periodos)
    this.usuarioService.obtenerUsuario().subscribe((result: any) => {
      this.usuario = result
      if (this.usuario.id_rol == 1) {
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
    const dataSearch = {
      ...this.generarReporte.value,
      fechaInicio: periodoSeleccionado.fecha_inicio,
      fechaFin: periodoSeleccionado.fecha_fin
    }

    this.reporteService.generarReporte(dataSearch).subscribe(res => {
      const dataType = res.type;
      const binaryData = [];
      binaryData.push(res);

      const filePath = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      const downloadlink = document.createElement('a');
      downloadlink.href = filePath;
      downloadlink.setAttribute('download', "Mapa_de_riesgo.xlsx");
      document.body.appendChild(downloadlink)
      downloadlink.click();
    });

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

}
