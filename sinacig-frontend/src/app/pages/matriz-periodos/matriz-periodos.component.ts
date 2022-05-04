import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { CatalogosService } from 'src/app/services/catalogos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatrizService } from 'src/app/services/matriz.service';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-matriz-periodos',
  templateUrl: './matriz-periodos.component.html',
  styleUrls: ['./matriz-periodos.component.css']
})
export class MatrizPeriodosComponent implements OnInit {
  //Datos usuario
  usuario: any = {}
  //Configuracion mydatepicker
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  myDateInit: boolean = true;
  model: any = null;
  locale: string = 'es'

  //Inicializando Catalogos
  unidadesEjecutoras: any = [];
  periodos: any = [];
  showTablePeriodos: boolean = false;

  //array que almacena matriz periodos encontrados
  matrizPeriodosEncontrados: any = []

  //Forms Control Search by Params
  formSearchCreateMatrizPeriodo = new FormGroup({
    id_unidad_ejecutora: new FormControl('', Validators.required),
    id_periodo: new FormControl('', Validators.required),
  })

  constructor(
    private catalogsService: CatalogosService,
    private matrizService: MatrizService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.catalogsService.getUnidadEjecutora().subscribe(unidades => this.unidadesEjecutoras = unidades);
    this.catalogsService.getPeriodos().subscribe(periodos => this.periodos = periodos)
    this.usuarioService.user$.subscribe(usuario => this.usuario = usuario)
  }

  createNewMatrizPeriodo() {
    const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value)
    const dataSearch = {
      ...this.formSearchCreateMatrizPeriodo.value,
      fecha_periodo_inicio: periodoSeleccionado.fecha_inicio,
      fecha_periodo_fin: periodoSeleccionado.fecha_fin
    }
    this.matrizService.getMatrizByParams(dataSearch).subscribe((value) => {

      Swal.fire({
        icon: 'warning',
        text: 'Actualmente existe un registro con estos parametros!'
      })

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

  findMatrizPeriodo() {
    const periodoSeleccionado = this.periodos.find((value: any) => value.id_periodo == this.formSearchCreateMatrizPeriodo.get('id_periodo')?.value)
    const dataSearch = {
      ...this.formSearchCreateMatrizPeriodo.value,
      fecha_periodo_inicio: periodoSeleccionado.fecha_inicio,
      fecha_periodo_fin: periodoSeleccionado.fecha_fin
    }
    this.matrizService.getMatrizByParams(dataSearch)
      .subscribe(matriz => {
        this.showTablePeriodos = true;
        this.matrizPeriodosEncontrados = matriz;
      },
        err => {
          this.showTablePeriodos = false;
          if (err.error.statusCode == 404) {
            Swal.fire({
              icon: 'error',
              text: '¡No existe ningún registro con estos parámetros!'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: '¡No se pudo realizar la búsqueda correctamente!'
            })
          }
        })
  }

  deleteMatrizPeriodo(id_matriz: any) {
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
          this.showTablePeriodos = false
        }, err => {
          Swal.fire({
            icon: 'error',
            text: '¡No se pudo eliminar el registro!'
          })
        });
      }
    })
  }

}
