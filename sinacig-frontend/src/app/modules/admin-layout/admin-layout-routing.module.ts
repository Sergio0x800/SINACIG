import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionRiesgoReporteComponent } from './pages/reports/evaluacion-riesgo-reporte/evaluacion-riesgo-reporte.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MatrizPeriodosComponent } from './pages/matriz-periodos/matriz-periodos.component';
import { PlanTrabajoComponent } from './pages/reports/plan-trabajo/plan-trabajo/plan-trabajo.component';
import { MapaRiesgoComponent } from './pages/reports/mapa-riesgo/mapa-riesgo.component';
import { IngresoRiesgosComponent } from './pages/ingreso-riesgos/ingreso-riesgos.component';
import { RiesgosComponent } from './pages/riesgos/riesgos.component';
import { IngresoPlanTrabajoComponent } from './pages/ingreso-plan-trabajo/ingreso-plan-trabajo.component';
import { ContinuidadComponent } from './pages/continuidad/continuidad.component';
import { AuthGuard } from './guards/auth.guard';
import { ExitGuard } from './guards/exit.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { PeriodosComponent } from './pages/periodos/periodos.component';
import { GridContinuidadComponent } from './pages/grid-continuidad/grid-continuidad.component';
import { MatrizContinuidadReporteComponent } from './pages/reports/matriz-continuidad-reporte/matriz-continuidad-reporte.component';
import { SeguimientoRiesgosComponent } from './pages/seguimiento-riesgos/seguimiento-riesgos.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'matriz',
        pathMatch: 'full'
      },
      {
        path: 'matriz',
        canActivate: [AuthGuard],
        component: MatrizPeriodosComponent
      },
      {
        path: 'periodos',
        canActivate: [AuthGuard],
        component: PeriodosComponent
      },
      {
        path: 'riesgos/:id_matriz',
        canActivate: [AuthGuard],
        component: RiesgosComponent
      },
      {
        path: 'ingreso-riesgos/:id_matriz',
        canActivate: [AuthGuard],
        canDeactivate: [ExitGuard],
        component: IngresoRiesgosComponent
      },
      {
        path: 'ingreso-plan-trabajo/:id_riesgo/:id_matriz',
        canActivate: [AuthGuard],
        // canDeactivate: [ExitGuard],
        component: IngresoPlanTrabajoComponent
      },
      {
        path: 'grid-continuidad/:id_riesgo/:id_matriz',
        canActivate: [AuthGuard],
        // canDeactivate: [ExitGuard],
        component: GridContinuidadComponent
      },
      {
        path: 'ingreso-continuidad/:id_riesgo/:id_matriz',
        canActivate: [AuthGuard],
        // canDeactivate: [ExitGuard],
        component: ContinuidadComponent
      },
      {
        path: 'ingreso-continuidad-update/:id_riesgo_continuidad/:id_riesgo/:id_matriz',
        canActivate: [AuthGuard],
        // canDeactivate: [ExitGuard],
        component: ContinuidadComponent
      },
      {
        path: 'usuarios',
        canActivate: [AuthGuard],
        component: UsuariosComponent
      },
      {
        path: 'evaluacion-riesgo-reporte',
        canActivate: [AuthGuard],
        component: EvaluacionRiesgoReporteComponent
      },
      {
        path: 'matriz-continuidad-reporte',
        canActivate: [AuthGuard],
        component: MatrizContinuidadReporteComponent
      },
      {
        path: 'plan-trabajo-reporte',
        canActivate: [AuthGuard],
        component: PlanTrabajoComponent,
      },
      {
        path: 'mapa-riesgo',
        canActivate: [AuthGuard],
        component: MapaRiesgoComponent
      },
      {
        path: 'seguimiento-riesgo/:id_riesgo/:id_matriz',
        canActivate: [AuthGuard],
        component: SeguimientoRiesgosComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminLayoutRoutingModule { }
