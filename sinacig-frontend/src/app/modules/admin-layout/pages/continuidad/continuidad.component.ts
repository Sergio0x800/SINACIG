import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { MatrizContinuidadService } from 'src/app/services/matriz-continuidad.service';

import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { MatrizService } from 'src/app/services/matriz.service';

@Component({
  selector: 'app-continuidad',
  templateUrl: './continuidad.component.html',
  styleUrls: ['./continuidad.component.css']
})
export class ContinuidadComponent implements OnInit {
  //parametro enviado por url desde ingreso riesgos y riesgos
  id_riesgo: string | null = null;
  id_matriz: string | null = null;
  linkPageRiesgo: string | null = null;
  //variable que almacena el riesgo asociado a este plan de trabajo
  riesgo: any = {};
  formMatrizContinuidad = new FormGroup({
    id_riesgo: new FormControl(''),
    subtema: new FormControl('', Validators.required),
    id_nivel_tolerancia: new FormControl('', Validators.required),
    id_frecuencia_monitoreo: new FormControl('', Validators.required),
    id_puesto_responsable: new FormControl('', Validators.required),
    id_severidad: new FormControl('', Validators.required),
    usuario_registro: new FormControl('')
  })

  formMetodoMonitoreo = new FormGroup({
    id_riesgo_continuidad: new FormControl(''),
    descripcion_monitoreo: new FormControl('', Validators.required),
    usuario_registro: new FormControl('')
  })

  puestos: any = [];
  usuario: any = [];
  frecuenciaMonitoreo: any = [];
  nivelTolerancia: any = [];
  severidad: any = [];

  actualizarContinuidad: boolean = false;
  severidadInvalid = false;
  severidadValid = false;
  frecuenciaInvalid = false;
  frecuenciaValid = false;
  toleranciaInvalid = false;
  toleranciaValid = false;
  puestoInvalid = false;
  puestoValid = false;
  subtemaInvalid = false;
  subtemaValid = false;
  descripcionMetodoMonitoreoInvalid = false;
  descripcionMetodoMonitoreoValid = false;
  metodoMonitoreoDB: any = [];
  metodoMonitoreoMemory: any = [];
  showTableMetodoMonitoreo: boolean = false;
  id_matriz_continuidad: any;
  id_riesgo_continuidad: string | null = '';
  showTableMetodoMonitoreoDB: boolean = false;
  actualizar: boolean = false;
  metodoMonitoreoDBdelete: any = [];
  matrizObtenida: any = {
    periodo_abierto: 0
  };

  constructor(
    private catalogosService: CatalogosService,
    private riesgosService: RiesgosService,
    private matrizContinuidadService: MatrizContinuidadService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private utilidades: UtilidadesService,
    private matrizService: MatrizService
  ) { }

  ngOnInit(): void {
    //Parametros URL
    this.route.paramMap.subscribe(param => {
      this.id_riesgo_continuidad = param.get('id_riesgo_continuidad');
      this.id_riesgo = param.get('id_riesgo');
      this.id_matriz = param.get('id_matriz');
      this.linkPageRiesgo = `/admin/grid-continuidad/${this.id_riesgo}/${this.id_matriz}`
      this.riesgosService.getRiesgoById(this.id_riesgo).subscribe(riesgoObtenido => {
        this.riesgo = riesgoObtenido[0]
      })

      this.matrizService.getMatrizById(this.id_matriz).subscribe((result: any) => {
        this.matrizObtenida = result[0]
      })
    })

    //Setear datos para actualizar
    if (this.id_riesgo_continuidad) {
      this.matrizContinuidadService.getMatrizContinuidadById(this.id_riesgo_continuidad).subscribe((result: any) => {
        this.formMatrizContinuidad.patchValue(result);
        this.matrizContinuidadService.getMetodoMonitoreoByIdRiesgoContinuidad(this.id_riesgo_continuidad).subscribe((result: any) => {
          this.metodoMonitoreoDB = result;
          this.showTableMetodoMonitoreoDB = true;
          this.actualizar = true;
        })
      })
    }

    //Catalogos
    this.catalogosService.getPuestoResponsable().subscribe(puesto => this.puestos = puesto);
    this.catalogosService.getSeveridad().subscribe((result: any) => {
      this.severidad = result
    })
    this.catalogosService.getFrecuenciaMonitoreo().subscribe((result: any) => {
      this.frecuenciaMonitoreo = result
    })
    this.catalogosService.getNivelTolerancia().subscribe((result: any) => this.nivelTolerancia = result)
    this.usuarioService.obtenerUsuario().subscribe((result: any) => this.usuario = result);

    //Validaciones
    this.formMatrizContinuidad.get('subtema')?.valueChanges.subscribe((value: any) => {
      if (this.subtemaInvalid && this.formMatrizContinuidad.get('subtema')?.dirty) {
        this.subtemaValid = true
        this.subtemaInvalid = false
      }
    })
    this.formMatrizContinuidad.get('id_nivel_tolerancia')?.valueChanges.subscribe((value: any) => {
      if (this.toleranciaInvalid && this.formMatrizContinuidad.get('id_nivel_tolerancia')?.dirty) {
        this.toleranciaValid = true
        this.toleranciaInvalid = false
      }
    })
    this.formMatrizContinuidad.get('id_frecuencia_monitoreo')?.valueChanges.subscribe((value: any) => {
      if (this.frecuenciaInvalid && this.formMatrizContinuidad.get('id_frecuencia_monitoreo')?.dirty) {
        this.frecuenciaValid = true
        this.frecuenciaInvalid = false
      }
    })
    this.formMatrizContinuidad.get('id_puesto_responsable')?.valueChanges.subscribe((value: any) => {
      if (this.puestoInvalid && this.formMatrizContinuidad.get('id_puesto_responsable')?.dirty) {
        this.puestoValid = true
        this.puestoInvalid = false
      }
    })
    this.formMatrizContinuidad.get('id_severidad')?.valueChanges.subscribe((value: any) => {
      if (this.severidadInvalid && this.formMatrizContinuidad.get('id_severidad')?.dirty) {
        this.severidadValid = true
        this.severidadInvalid = false
      }
    })
    this.formMetodoMonitoreo.get('descripcion_monitoreo')?.valueChanges.subscribe((value: any) => {
      if (this.descripcionMetodoMonitoreoInvalid && this.metodoMonitoreoMemory.length > 0) {
        this.descripcionMetodoMonitoreoValid = true
        this.descripcionMetodoMonitoreoInvalid = false
      }
    })
  }

  createNewMetodoMonitoreoToMemory() {
    const newValue = {
      ...this.formMetodoMonitoreo.value,
      descripcion_monitoreo: `- ${this.formMetodoMonitoreo.get('descripcion_monitoreo')?.value}`
    }
    this.metodoMonitoreoMemory.push(newValue)
    this.formMetodoMonitoreo.get('descripcion_monitoreo')?.reset();
    this.showTableMetodoMonitoreo = true
  }

  deleteMetodoMonitoreoFromMemory(descripcion: any) {
    const id = this.metodoMonitoreoMemory.findIndex((metodo: any) => metodo.descripcion === descripcion)
    this.metodoMonitoreoMemory.splice(id, 1)
  }

  deleteMetodoMonitoreoFromDB(id_detalle_monitoreo: any) {
    const id = this.metodoMonitoreoDB.findIndex((metodo: any) => metodo.id_detalle_monitoreo == id_detalle_monitoreo)
    this.metodoMonitoreoDB.splice(id, 1)

    this.metodoMonitoreoDBdelete.push(id_detalle_monitoreo);

    // this.matrizContinuidadService.deleteLogicoMetodoMonitoreo(id_detalle_monitoreo).subscribe((result: any) => {

    // });

  }

  validarFormContinuidad() {
    //Plan
    if (this.formMatrizContinuidad.get('subtema')?.invalid) {
      this.subtemaInvalid = true
    } if (this.formMatrizContinuidad.get('id_nivel_tolerancia')?.invalid) {
      this.toleranciaInvalid = true
    } if (this.formMatrizContinuidad.get('id_frecuencia_monitoreo')?.invalid) {
      this.frecuenciaInvalid = true
    } if (this.formMatrizContinuidad.get('id_puesto_responsable')?.invalid) {
      this.puestoInvalid = true
    } if (this.formMatrizContinuidad.get('id_severidad')?.invalid) {
      this.severidadInvalid = true
    }

    //controles

    if (this.metodoMonitoreoMemory.length < 1 && !this.actualizar) {
      this.descripcionMetodoMonitoreoInvalid = true
    }

    if ((this.metodoMonitoreoMemory.length < 1 && this.metodoMonitoreoDB.length < 1) || this.formMatrizContinuidad.invalid) {
      this.utilidades.mostrarErrorNoti("Por favor llene los campos obligatorios")
    } else {
      if (this.actualizar) {
        this.actualizarMatrizContinuidad();
      } else {
        this.createNewMatrizContinuidad();
      }
    }
  }

  createNewMatrizContinuidad() {
    const newContinuidad = {
      ...this.formMatrizContinuidad.value,
      id_riesgo: this.id_riesgo,
      usuario_registro: this.usuario.id_usuario
    }

    this.matrizContinuidadService.createMatrizContinuidad(newContinuidad).subscribe((value: any) => {
      this.id_matriz_continuidad = value;

      this.subtemaInvalid = false
      this.subtemaValid = false
      this.toleranciaInvalid = false
      this.toleranciaValid = false
      this.frecuenciaInvalid = false
      this.frecuenciaValid = false
      this.puestoInvalid = false
      this.puestoValid = false
      this.severidadInvalid = false
      this.severidadValid = false
      this.descripcionMetodoMonitoreoInvalid = false
      this.descripcionMetodoMonitoreoValid = false


      this.metodoMonitoreoMemory.map((metodoObt: any) => {
        const metodoMonitoreo = {
          ...metodoObt,
          id_riesgo_continuidad: this.id_matriz_continuidad,
          usuario_registro: this.usuario.id_usuario,
        }
        this.matrizContinuidadService.createMetodoMonitoreo(metodoMonitoreo).subscribe(value => {
        })
      })
      this.formMatrizContinuidad.reset();
      this.metodoMonitoreoMemory = [];
      // this.router.navigate([`/admin/ingreso-continuidad/${this.id_riesgo}/${this.id_matriz}`]);
      Swal.fire({
        title: '¡El registro se guardó correctamente!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {

        }
      })
    })
  }

  actualizarMatrizContinuidad() {
    this.matrizContinuidadService.updateMatrizContinuidad(this.id_riesgo_continuidad, this.formMatrizContinuidad.value).subscribe((result: any) => {
      this.metodoMonitoreoMemory.map((metodoObt: any) => {
        const metodoMonitoreo = {
          ...metodoObt,
          id_riesgo_continuidad: this.id_riesgo_continuidad,
          usuario_registro: this.usuario.id_usuario,
        }
        this.matrizContinuidadService.createMetodoMonitoreo(metodoMonitoreo).subscribe(value => {
        })
      })

      this.metodoMonitoreoDBdelete.map((idMetodoMonitoreo: any) => {
        this.matrizContinuidadService.deleteLogicoMetodoMonitoreo(idMetodoMonitoreo, { estado_registro: 0, usuario_registro: this.usuario.id_usuario }).subscribe(value => {
        })
      })
      this.router.navigate([`/admin/grid-continuidad/${this.id_riesgo}/${this.id_matriz}`]);
      Swal.fire({
        title: '¡El registro se actualizó correctamente!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {

        }
      })
    })
  }

}
