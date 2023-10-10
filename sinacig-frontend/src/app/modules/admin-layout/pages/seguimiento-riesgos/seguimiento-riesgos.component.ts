import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { MatrizService } from 'src/app/services/matriz.service';
import { PlanRiesgosService } from 'src/app/services/plan-riesgos.service';

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
    id_medida_riesgo: new FormControl(0, Validators.required),
    riesgo_inherente: new FormControl(0, Validators.required),
    riesgo_residual: new FormControl(0, Validators.required),
    comentario_seguimiento: new FormControl(''),
    archivos: new FormControl(null),
    id_usuario_registro: new FormControl(''),
  })

  usuario: any = {};
  confirm: any = true;
  nextPagePlan: any = false;

  selectedFiles: File[] = [];
  isLoadinDoc: boolean = false;
  contentEmdebIsImg: any;
  documentURL: string = '';

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
  }

  calculos() {
    this.formSeguimiento.get('id_severidad')?.valueChanges.subscribe((severidad_input: any) => {
      this.formSeguimiento.patchValue({ riesgo_inherente: this.formSeguimiento.get('id_probabilidad')?.value * severidad_input })
      this.resultadoRI = this.formSeguimiento.get('riesgo_inherente')?.value

      if (this.formSeguimiento.get('id_control_mitigador')?.value && this.formSeguimiento.get('id_probabilidad')?.value) {
        this.formSeguimiento.patchValue({ riesgo_residual: this.formSeguimiento.get('riesgo_inherente')?.value / this.formSeguimiento.get('id_control_mitigador')?.value })
        this.resultadoRR = this.formSeguimiento.get('riesgo_residual')?.value
        this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
          if (this.formSeguimiento.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
            return medida
          }
        })
        this.formSeguimiento.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
        this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
      }
    })
    this.formSeguimiento.get('id_probabilidad')?.valueChanges.subscribe((probabilidad_input: any) => {
      this.formSeguimiento.patchValue({ riesgo_inherente: this.formSeguimiento.get('id_severidad')?.value * probabilidad_input })
      this.resultadoRI = this.formSeguimiento.get('riesgo_inherente')?.value

      if (this.formSeguimiento.get('id_control_mitigador')?.value && this.formSeguimiento.get('id_severidad')?.value) {
        this.formSeguimiento.patchValue({ riesgo_residual: this.formSeguimiento.get('riesgo_inherente')?.value / this.formSeguimiento.get('id_control_mitigador')?.value })
        this.resultadoRR = this.formSeguimiento.get('riesgo_residual')?.value
        this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
          if (this.formSeguimiento.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
            return medida
          }
        })
        this.formSeguimiento.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
        this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
      }
    })
    this.formSeguimiento.get('id_control_mitigador')?.valueChanges.subscribe((mitigador_input: any) => {
      this.formSeguimiento.patchValue({ riesgo_residual: this.formSeguimiento.get('riesgo_inherente')?.value / mitigador_input })
      this.resultadoRR = this.formSeguimiento.get('riesgo_residual')?.value
      this.medidaRiesgoEncontrado = this.medidasRiesgo.find((medida: any) => {
        if (this.formSeguimiento.get('riesgo_residual')?.value >= medida.rango_minimo && this.resultadoRR <= medida.rango_maximo) {
          return medida
        }
      })
      this.formSeguimiento.patchValue({ id_medida_riesgo: this.medidaRiesgoEncontrado.id_medida_riesgo })
      this.medidaRiesgoInput = this.medidaRiesgoEncontrado.descripcion
    })
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    this.formSeguimiento.get('archivos')?.setValue(files);
  }

  createNewSeguimiento() {
    const formData = new FormData();
    const archivos = this.formSeguimiento.get('archivos')?.value;
    for (let i = 0; i < archivos.length; i++) {
      formData.append('archivos', archivos[i],);
    }
    formData.append('id_riesgo', this.id_riesgo)
    formData.append

    const dataSeguimiento = {
      ...this.formSeguimiento.value,
      id_riesgo: this.id_riesgo,
      id_usuario_registro: this.usuario.id_usuario
    }

    this.docsService.createSeguimiento(dataSeguimiento).subscribe((value) => {
      this.docsService.insertarArchivos(formData).subscribe((value) => { }, err => {
        console.log(err)
      })
      this.utilidades.mostrarExito('Registro ingresado correctamente')
    },
      err => {
        Swal.fire({
          icon: 'error',
          text: 'Error al ingresar el registro!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
      })




    // this.http.post('URL_DE_TU_BACKEND', formData)
    //   .subscribe(response => {
    //     // Manejar la respuesta del backend aquí
    //   });

    // const formData = new FormData();
    // const dataSeguimiento = {
    //   ...this.formSeguimiento.value,
    //   archivos: this.archivosSeleccionados,
    //   usuario_registro: this.usuario.id_usuario
    // }
    // this.docsService.createSeguimiento(dataSeguimiento).subscribe((value) => {
    //   // this.router.navigate(['/admin/ingreso-plan-trabajo', this.id_riesgo, this.id_matriz]);
    //   this.utilidades.mostrarExito('Registro ingresado correctamente')
    // },
    //   err => {
    //     Swal.fire({
    //       icon: 'error',
    //       text: 'Error al ingresar el registro!',
    //       confirmButtonColor: '#3085d6',
    //       confirmButtonText: 'Aceptar'
    //     })
    //   })
  }

  validarFormularioRiesgo() {
    if (!this.formSeguimiento.get('id_probabilidad')?.dirty) {
      this.probabilidadInvalid = true
    } if (!this.formSeguimiento.get('id_severidad')?.dirty) {
      this.severidadInvalid = true
    } if (!this.formSeguimiento.get('id_control_mitigador')?.dirty) {
      this.controlMitigadorInvalid = true
    }
    if (this.formSeguimiento.invalid || !this.formSeguimiento.get('id_control_mitigador')?.dirty || !this.formSeguimiento.get('id_severidad')?.dirty || !this.formSeguimiento.get('id_probabilidad')?.dirty) {
      this.utilidades.mostrarError("Por favor llene los campos obligatorios")
    } else {
      this.nextPagePlan = true
      this.createNewSeguimiento()
    }
  }
}
