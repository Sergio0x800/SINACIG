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
  metodoMonitoreoMemory: any = [];
  showTableMetodoMonitoreo: boolean = false;
  id_matriz_continuidad: any;

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
    this.route.paramMap.subscribe(param => {
      this.id_riesgo = param.get('id_riesgo');
      this.id_matriz = param.get('id_matriz');
      this.linkPageRiesgo = `/admin/riesgos/${this.id_matriz}`
      this.riesgosService.getRiesgoById(this.id_riesgo).subscribe(riesgoObtenido => {
        this.riesgo = riesgoObtenido[0]
      })
    })
    this.catalogosService.getPuestoResponsable().subscribe(puesto => this.puestos = puesto);
    this.catalogosService.getSeveridad().subscribe((result: any) => this.severidad = result)
    this.catalogosService.getFrecuenciaMonitoreo().subscribe((result: any) => {
      this.frecuenciaMonitoreo = result
    })
    this.catalogosService.getNivelTolerancia().subscribe((result: any) => this.nivelTolerancia = result)
    this.usuarioService.obtenerUsuario().subscribe((result: any) => {
      this.usuario = result
    });

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
      descripcion: `- ${this.formMetodoMonitoreo.get('descripcion_monitoreo')?.value}`
    }
    this.metodoMonitoreoMemory.push(newValue)
    this.formMetodoMonitoreo.get('descripcion_monitoreo')?.reset();
    this.showTableMetodoMonitoreo = true
  }

  deleteMetodoMonitoreoFromMemory(descripcion: any) {
    const id = this.metodoMonitoreoMemory.findIndex((metodo: any) => metodo.descripcion === descripcion)
    this.metodoMonitoreoMemory.splice(id, 1)
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
    if (this.metodoMonitoreoMemory.length < 1) {
      this.descripcionMetodoMonitoreoInvalid = true
    }

    if (this.metodoMonitoreoMemory.length < 1 || this.formMatrizContinuidad.invalid) {
      this.utilidades.mostrarError("Por favor llene los campos obligatorios")
    } else {
      this.createNewMatrizContinuidad()
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

      this.metodoMonitoreoMemory.map((metodoObt: any) => {
        const metodoMonitoreo = {
          ...metodoObt,
          id_riesgo_continuidad: this.id_matriz_continuidad,
          usuario_registro: this.usuario.id_usuario,
        }
        this.matrizContinuidadService.createMetodoMonitoreo(metodoMonitoreo).subscribe(value => {
        })
      })

      this.router.navigate(['/admin/riesgos/', this.id_matriz]);
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

}
