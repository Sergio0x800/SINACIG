import { Component, Input, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { MatrizService } from 'src/app/services/matriz.service';
import { PlanRiesgosService } from 'src/app/services/plan-riesgos.service';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

import { IAngularMyDpOptions } from 'angular-mydatepicker';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';
import { DocServiceService } from 'src/app/services/doc-service.service';
@Component({
  selector: 'app-seguimiento-riesgos',
  templateUrl: './seguimiento-riesgos.component.html',
  styleUrls: ['./seguimiento-riesgos.component.css']
})
export class SeguimientoRiesgosComponent implements OnInit {
  @ViewChild('id_probabilidad', { static: false }) id_probabilidad!: ElementRef;
  seguimientos: any = []
  archivosSeguimiento: any = [];
  public configuration!: Config;
  public columns: Columns[] = [
    // { key: 'id_riesgo', title: 'Comunidad' },
    { key: 'comentario_seguimiento', title: 'Comentario' },
    { key: 'fecha_registro', title: 'Fecha de registro' },
    { key: '', title: 'Acciones' },
  ];
  public columns2: Columns[] = [
    // { key: 'id_riesgo', title: 'Comunidad' },
    { key: 'nombre_archivo', title: 'Nombre del archivo' },
    { key: 'tipo_archivo', title: 'Extención' },
    { key: '', title: 'Acciones' },
  ];
  //parametros recibidos por url de otras paginas
  id_matriz: string | null = null;

  //variable que almacena el id_riesgo devuelto al crear un nuevo riesgo
  id_riesgo: any = 0;

  //variable que almacena la matriz a la cual pertenecera el riesgo actualmente creado
  matrizEncontrada: any = [];

  //variables con string para agregar a los imputs
  routerLinkRiesgo: any = ''
  codigoReferenciaToInput: any = '';
  concatCodigoUnidad: any = ''

  //variables que almacenan el tipo de objetivo y medida riesgo encontrado al hacer calculos para el codigo_referencia y la media riesgo
  tipoObjetivoEncontrado: any = '';
  medidaRiesgoEncontrado: any = [];

  //variable que almacena el ultimo maximo correlativo encontrado al colocar el tipo de objetivo
  maximoCorrelativoEncontrado: any = {};

  //configuracion de fecahas para la dependencia mydatepicker
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd'
  };
  myDateInit: boolean = true;
  model: any = null;
  myDateInicioFin: any = {};
  locale: string = 'es'

  //Inicializando Catalogos
  probabilidades: any = [];
  severidades: any = [];
  control_mitigador: any;
  medidasRiesgo: any = [];
  prioridades: any = [];

  resultadoRI: any = 0;
  resultadoRR: any = 0;
  medidaRiesgoInput: any = ''
  probabilidadInvalid = false;
  probabilidadValid = false;
  severidadInvalid = false;
  severidadValid = false;
  controlMitigadorInvalid = false;
  controlMitigadorValid = false;

  formSeguimiento = new FormGroup({
    id_seguimiento_riesgo: new FormControl(''),
    id_riesgo: new FormControl(''),
    id_probabilidad: new FormControl(0, Validators.required),
    id_severidad: new FormControl(0, Validators.required),
    id_control_mitigador: new FormControl(0, Validators.required),
    id_medida_riesgo: new FormControl(0),
    riesgo_inherente: new FormControl(0),
    riesgo_residual: new FormControl(0),
    comentario_seguimiento: new FormControl('', Validators.required),
    archivos: new FormControl([]),
    id_usuario_registro: new FormControl(''),
  })

  usuario: any = {};
  confirm: any = true;
  nextPagePlan: any = false;

  selectedFiles: File[] = [];
  isLoadinDoc: boolean = false;
  contentEmdebIsImg: any;
  documentURL: string = '';
  id_seguimiento_riesgo: any = 0;

  constructor(
    private catalogsService: CatalogosService,
    private riesgosService: RiesgosService,
    private route: ActivatedRoute,
    private matrizService: MatrizService,
    private router: Router,
    private planService: PlanRiesgosService,
    private usuarioService: UsuarioService,
    private utilidades: UtilidadesService,
    private docsService: DocServiceService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((param: any) => {
      this.id_matriz = param.get('id_matriz');
      this.id_riesgo = param.get('id_riesgo')
      this.routerLinkRiesgo = '/admin/riesgos/' + this.id_matriz;
      this.matrizService.getMatrizById(this.id_matriz).subscribe(matriz => {
        this.matrizEncontrada = matriz[0]
        this.concatCodigoUnidad = this.matrizEncontrada.codigo_unidad + '  -  ' +
          this.matrizEncontrada.nombre_unidad
      })
    })
    this.configuration = { ...DefaultConfig }
    this.configuration.searchEnabled = true
    this.getCatalogos();
    this.calculos();
  }

  getCatalogos() {
    this.catalogsService.getProbabilidad().subscribe(prob => this.probabilidades = prob);
    this.catalogsService.getSeveridad().subscribe(severidades => this.severidades = severidades);
    this.catalogsService.getControlMitigador().subscribe(controlM => this.control_mitigador = controlM)
    this.catalogsService.getMedidaRiesgo().subscribe(medidas => this.medidasRiesgo = medidas);
    this.catalogsService.getPrioridad().subscribe(prioridades => this.prioridades = prioridades);
    this.usuarioService.obtenerUsuario().subscribe((result: any) => this.usuario = result)
    this.docsService.getSeguimientos(this.id_riesgo).subscribe((result: any) => this.seguimientos = result)
  }

  // calculos() {
  //   this.formSeguimiento.get('id_severidad')?.valueChanges.subscribe((severidad_input: any) => {
  //     this.formSeguimiento.patchValue({ riesgo_inherente: this.formSeguimiento.get('id_probabilidad')?.value * severidad_input })
  //     this.resultadoRI = this.formSeguimiento.get('riesgo_inherente')?.value

  //     if (this.formSeguimiento.get('id_control_mitigador')?.value && this.formSeguimiento.get('id_probabilidad')?.value) {
  //       this.formSeguimiento.patchValue({ riesgo_residual: this.formSeguimiento.get('riesgo_inherente')?.value / this.formSeguimiento.get('id_control_mitigador')?.value })
  //       this.resultadoRR = this.formSeguimiento.get('riesgo_residual')?.value
  //       this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
  //         if (this.formSeguimiento.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
  //           return medida
  //         }
  //       })
  //       this.formSeguimiento.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
  //       this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
  //     }
  //   })
  //   this.formSeguimiento.get('id_probabilidad')?.valueChanges.subscribe((probabilidad_input: any) => {
  //     this.formSeguimiento.patchValue({ riesgo_inherente: this.formSeguimiento.get('id_severidad')?.value * probabilidad_input })
  //     this.resultadoRI = this.formSeguimiento.get('riesgo_inherente')?.value

  //     if (this.formSeguimiento.get('id_control_mitigador')?.value && this.formSeguimiento.get('id_severidad')?.value) {
  //       this.formSeguimiento.patchValue({ riesgo_residual: this.formSeguimiento.get('riesgo_inherente')?.value / this.formSeguimiento.get('id_control_mitigador')?.value })
  //       this.resultadoRR = this.formSeguimiento.get('riesgo_residual')?.value
  //       this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
  //         if (this.formSeguimiento.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
  //           return medida
  //         }
  //       })
  //       this.formSeguimiento.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
  //       this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
  //     }
  //   })
  //   this.formSeguimiento.get('id_control_mitigador')?.valueChanges.subscribe((mitigador_input: any) => {
  //     this.formSeguimiento.patchValue({ riesgo_residual: this.formSeguimiento.get('riesgo_inherente')?.value / mitigador_input })
  //     this.resultadoRR = this.formSeguimiento.get('riesgo_residual')?.value
  //     this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
  //       if (this.formSeguimiento.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
  //         return medida
  //       }
  //     })
  //     this.formSeguimiento.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
  //     this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
  //   })
  // }

  calculos() {

    const updateRiesgoInherente = () => {
      const severidad = this.formSeguimiento.get('id_severidad')?.value;
      const probabilidad = this.formSeguimiento.get('id_probabilidad')?.value;
      this.formSeguimiento.patchValue({ riesgo_inherente: severidad * probabilidad });
      this.resultadoRI = this.formSeguimiento.get('riesgo_inherente')?.value;
    };

    const updateRiesgoResidual = () => {
      const controlMitigador = this.formSeguimiento.get('id_control_mitigador')?.value;
      const riesgoInherente = this.formSeguimiento.get('riesgo_inherente')?.value;
      this.formSeguimiento.patchValue({ riesgo_residual: riesgoInherente / controlMitigador });
      this.resultadoRR = this.formSeguimiento.get('riesgo_residual')?.value;
    };

    const updateMedidaRiesgo = () => {
      const riesgoResidual = this.formSeguimiento.get('riesgo_residual')?.value;
      this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
        return riesgoResidual >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo;
      });

      if (this.medidaRiesgoEncontrado) {
        this.formSeguimiento.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo });
        this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion;
      }
    };

    this.formSeguimiento.get('id_severidad')?.valueChanges.subscribe(() => {
      updateRiesgoInherente();
      updateRiesgoResidual();
      updateMedidaRiesgo();
    });

    this.formSeguimiento.get('id_probabilidad')?.valueChanges.subscribe(() => {
      updateRiesgoInherente();
      updateRiesgoResidual();
      updateMedidaRiesgo();
    });

    this.formSeguimiento.get('id_control_mitigador')?.valueChanges.subscribe(() => {
      updateRiesgoResidual();
      updateMedidaRiesgo();
    });
  }


  onFilesSelected(event: any) {
    const files = event.target.files;
    const allowedExtensions = ['.pdf', '.xls', '.xlsx', '.jpg', '.png', '.doc', '.docx'];

    // Validar el formato
    const invalidFormatFiles = Array.from(files).filter((file: any) => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return !allowedExtensions.includes('.' + fileExtension);
    });

    if (invalidFormatFiles.length > 0) {
      this.utilidades.mostrarErrorNoti('Formato de archivos no permitido');
      const inputElement: any = document.getElementById('archivos');
      inputElement.value = '';
    } else {
      // Si el formato es válido, validar el tamaño
      const maxFileSizeInBytes = 100 * 1024 * 1024; // 100MB
      const invalidSizeFiles = Array.from(files).filter((file: any) => {
        const fileSize = file.size;
        return fileSize > maxFileSizeInBytes;
      });

      if (invalidSizeFiles.length > 0) {
        this.utilidades.mostrarErrorNoti('Tamaño de archivo excede el límite permitido (100MB)');
        const inputElement: any = document.getElementById('archivos');
        inputElement.value = '';
      } else {
        this.formSeguimiento.get('archivos')?.setValue(files);
      }
    }
  }


  createNewSeguimiento() {
    const formData = new FormData();
    const archivos = this.formSeguimiento.get('archivos')?.value;
    for (let i = 0; i < archivos.length; i++) {
      formData.append('archivos', archivos[i], `${this.id_riesgo}|${archivos[i].name}`);
    }
    formData.append('id_riesgo', this.id_riesgo)
    formData.append('id_usuario_registro', this.usuario.id_usuario)


    const dataSeguimiento = {
      ...this.formSeguimiento.value,
      id_seguimiento_riesgo: this.id_seguimiento_riesgo,
      id_riesgo: this.id_riesgo,
      id_usuario_registro: this.usuario.id_usuario
    }

    if (this.id_seguimiento_riesgo > 0) {
      this.docsService.updateSeguimiento(dataSeguimiento).subscribe((value: any) => {
        formData.append('id_seguimiento_riesgo', value)
        const archivos = this.formSeguimiento.get('archivos')?.value
        if (archivos.length > 0) {
          this.docsService.insertarArchivos(formData).subscribe((value) => {
          }, err => {
            this.utilidades.mostrarErrorNoti("Error al intentar guardar los archivos")
          });
        }
        this.docsService.getSeguimientos(this.id_riesgo).subscribe((result: any) => this.seguimientos = result)
        this.utilidades.mostrarExito('Registro actualizado correctamente')
        this.resetCamposSeguimiento()
      })
    } else {
      this.docsService.createSeguimiento(dataSeguimiento).subscribe((value: any) => {
        formData.append('id_seguimiento_riesgo', value)
        const archivos = this.formSeguimiento.get('archivos')?.value
        if (archivos.length > 0) {
          this.docsService.insertarArchivos(formData).subscribe((value) => {
          }, err => {
            (err)
          });
        }
        this.docsService.getSeguimientos(this.id_riesgo).subscribe((result: any) => this.seguimientos = result)
        this.utilidades.mostrarExito('Registro ingresado correctamente')
        this.resetCamposSeguimiento()
      },
        err => {
          Swal.fire({
            icon: 'error',
            text: 'Error al ingresar el registro!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          })
        })
    }


  }

  validarFormularioRiesgo() {
    if (this.formSeguimiento.invalid) {
      this.utilidades.mostrarErrorNoti("Por favor llene los campos obligatorios")
    } else {
      this.createNewSeguimiento()
    }
  }

  editSeguimiento(row: any) {
    this.id_seguimiento_riesgo = row.id_seguimiento_riesgo
    this.formSeguimiento.get('id_probabilidad')?.setValue(row.id_probabilidad);
    this.formSeguimiento.get('id_severidad')?.setValue(row.id_severidad);
    this.catalogsService.getControlMitigador().subscribe(controlM => this.control_mitigador = controlM)
    this.formSeguimiento.get('id_control_mitigador')?.setValue(row.id_control_mitigador);
    this.formSeguimiento.get('comentario_seguimiento')?.setValue(row.comentario_seguimiento);
    this.id_probabilidad.nativeElement.scrollIntoView();
    this.id_probabilidad.nativeElement.focus();
  }
  resetCamposSeguimiento() {
    // this.formSeguimiento.reset();
    this.formSeguimiento.get('id_medida_riesgo')?.setValue(0);
    this.formSeguimiento.get('id_probabilidad')?.setValue(0);
    this.formSeguimiento.get('id_severidad')?.setValue(0);
    this.formSeguimiento.get('id_control_mitigador')?.setValue(0);
    this.formSeguimiento.get('comentario_seguimiento')?.setValue('');
    this.medidaRiesgoInput = ''
    const inputElement: any = document.getElementById('archivos');

    // Establece su valor a una cadena vacía para borrar la selección
    inputElement.value = '';

    this.id_seguimiento_riesgo = 0
  }
  deleteSeguimiento(id_seguimiento: any) {
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
        this.docsService.deleteSeguimiento(id_seguimiento).subscribe((value: any) => {
          this.utilidades.mostrarExito('Registro eliminado correctamente')
          this.docsService.getSeguimientos(this.id_riesgo).subscribe((result: any) => this.seguimientos = result)
        }, err => {
          this.utilidades.mostrarErrorNoti('El registro no se pudo eliminar')
        })
      }
    })
  }
  deleteSeguimientoArchivo(row: any) {
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
        this.docsService.deleteSeguimientoArchivo(row.id_seguimiento_riesgo_archivo).subscribe((value: any) => {
          this.docsService.getArchivosSeguimiento(row.id_seguimiento_riesgo).subscribe((result: any) => {
            this.archivosSeguimiento = result
          })
          this.utilidades.mostrarExito('Registro eliminado correctamente')
        }, err => {
          this.utilidades.mostrarErrorNoti('El registro no se pudo eliminar')
        })
      }
    })
  }
  verArchivos(id_seguimiento: any) {
    this.docsService.getArchivosSeguimiento(id_seguimiento).subscribe((result: any) => this.archivosSeguimiento = result)
  }
  descargarArchivo(nombreArchivo: any) {
    this.docsService.getArchivosDescarga(nombreArchivo, this.id_riesgo).subscribe((response: any) => {
      const blob = new Blob([response], { type: response.type });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = nombreArchivo;
      document.body.appendChild(a);

      a.click();

      window.URL.revokeObjectURL(url);
    }, err => {
      this.utilidades.mostrarErrorNoti("Error al intentar descargar el archivo")
    });
  }
}
