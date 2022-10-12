import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RiesgosService } from 'src/app/services/riesgos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanRiesgosService } from 'src/app/services/plan-riesgos.service';
import { LogsService } from 'src/app/services/logs.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { MatrizService } from 'src/app/services/matriz.service';
import { MatrizContinuidadService } from 'src/app/services/matriz-continuidad.service';

@Component({
  selector: 'app-grid-continuidad',
  templateUrl: './grid-continuidad.component.html',
  styleUrls: ['./grid-continuidad.component.css']
})
export class GridContinuidadComponent implements OnInit {
  id_matriz: string | null = null;
  id_riesgo: string | null = null;
  riesgos: any;
  showBtnOffset: boolean = false;
  offset: number = 10;
  matricesContinuidad: any;
  showTable = true;
  linkRiesgos: string = '';
  linkMatrizContinuidad: string = '';
  matrizObtenida: any = {
    periodo_abierto: 0
  };

  constructor(
    private riesgoService: RiesgosService,
    private route: ActivatedRoute,
    private catalogsService: CatalogosService,
    private planService: PlanRiesgosService,
    private usuarioService: UsuarioService,
    private router: Router,
    private logService: LogsService,
    private utilidades: UtilidadesService,
    private matrizService: MatrizService,
    private matrizContinuidadService: MatrizContinuidadService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id_matriz = param.get('id_matriz');
      this.id_riesgo = param.get('id_riesgo');
      this.linkRiesgos = `/admin/riesgos/${this.id_matriz}`;
      this.linkMatrizContinuidad = `/admin/ingreso-continuidad/${this.id_riesgo}/${this.id_matriz}`;
      this.matrizService.getMatrizById(this.id_matriz).subscribe((result: any) => {
        this.matrizObtenida = result[0]

        this.matrizContinuidadService.getMatrizContinuidadByIdRiesgo(this.id_riesgo).subscribe(matrices => {
          this.matricesContinuidad = matrices;
        }, err => {
          Swal.fire({
            icon: 'warning',
            text: '¡No existen registros para mostrar!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          })
          this.showTable = false

        })
      })
    })
  }

  editMatrizContinuidad(id_riesgo_continuidad: any) {
    this.router.navigate(['/admin/ingreso-continuidad-update/', id_riesgo_continuidad, this.id_riesgo, this.id_matriz])
  }

}
