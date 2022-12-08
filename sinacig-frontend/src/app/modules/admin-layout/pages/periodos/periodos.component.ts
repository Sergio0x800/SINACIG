import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { MatrizService } from 'src/app/services/matriz.service';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {

  formSearchPeriodo = new FormGroup({
    anioPeriodo: new FormControl('', Validators.required),
  })
  periodos: any = [];
  periodosTabla: any = [];

  constructor(private catalogsService: CatalogosService,
    private utilidades: UtilidadesService, private matrizService: MatrizService, private riesgoService: RiesgosService) { }

  ngOnInit(): void {
    this.utilidades.removeItem();
    this.catalogsService.getPeriodos().subscribe(periodos => {
      this.periodos = periodos
      this.periodosTabla = periodos
    })

    this.formSearchPeriodo.get('anioPeriodo')?.setValue('-1')

    this.formSearchPeriodo.get('anioPeriodo')?.valueChanges.subscribe((value: any) => {
      if (value == '-1') {
        this.periodosTabla = this.periodos
      } else {
        let periodosE = [];
        periodosE = this.periodos.filter((valuePeriodos: any) => {
          if (valuePeriodos.anio == value) {
            return valuePeriodos
          }
        })
        this.periodosTabla = periodosE
      }
    })
  }


  cerrarPeriodo(id_periodo: any, fecha_inicio: any, fecha_fin: any, periodo_anio: any) {
    const dataFindMatriz = {
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin
    }
    this.matrizService.findMatrizPeriodoAbierto(dataFindMatriz).subscribe((value: any) => {
      if (value < 1) {
        Swal.fire({
          title: '¿Está seguro de cerrar este periodo?',
          text: "¡No podrá revertir esta acción y los registros actuales solo podrán visualizarse!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, ¡cerrar periodo!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.catalogsService.cerrarPeriodo(id_periodo).subscribe((value: any) => {
              // let contadorE = 0;
              // let contadorO = 0;
              // let contadorCN = 0;
              // let contadorI = 0;

              this.riesgoService.getRiesgoByIdMatrizRef(periodo_anio).subscribe((value: any) => {
                // value.forEach((riesgo: any) => {
                //   if (riesgo.codigo_referencia === 'E-') {
                //     contadorE++
                //     this.riesgoService.updateRiesgo(riesgo.id_riesgo, { codigo_referencia: `E-${contadorE}` }).subscribe((value: any) => { })
                //   } else if (riesgo.codigo_referencia === 'O-') {
                //     contadorO++
                //     this.riesgoService.updateRiesgo(riesgo.id_riesgo, { codigo_referencia: `O-${contadorO}` }).subscribe((value: any) => { })
                //   } else if (riesgo.codigo_referencia === 'CN-') {
                //     contadorCN++
                //     this.riesgoService.updateRiesgo(riesgo.id_riesgo, { codigo_referencia: `CN-${contadorCN}` }).subscribe((value: any) => { })
                //   } else if (riesgo.codigo_referencia === 'I-') {
                //     contadorI++
                //     this.riesgoService.updateRiesgo(riesgo.id_riesgo, { codigo_referencia: `I-${contadorI}` }).subscribe((value: any) => { })
                //   }
                // })
                this.catalogsService.getPeriodos().subscribe(periodos => {
                  this.periodos = periodos
                  this.periodosTabla = periodos
                })
                Swal.fire({
                  icon: 'success',
                  text: '¡El periodo se ha cerrado correctamente!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Aceptar'
                });
              }, err => {
                this.utilidades.showError('Error en la solicitud', 'Algo salio mal mientras se procesaba la solicitud')
              })
            })
          }
        })
      } else {
        Swal.fire({
          icon: 'warning',
          text: '¡Aún existen unidades ejecutoras sin validar del periodo seleccionado!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      }
    }, err => {
      this.utilidades.showError('Error en la solicitud', 'Algo salio mal mientras se procesaba la solicitud')
    })
  }
}
