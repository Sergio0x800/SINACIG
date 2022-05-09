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
import { AuthGuard } from './guards/auth.guard';
import { ExitGuard } from './guards/exit.guard';
import { LayoutComponent } from './components/layout/layout.component';

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
        canDeactivate: [ExitGuard],
        component: IngresoPlanTrabajoComponent
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
        path: 'plan-trabajo-reporte',
        canActivate: [AuthGuard],
        component: PlanTrabajoComponent,
      },
      {
        path: 'mapa-riesgo',
        canActivate: [AuthGuard],
        component: MapaRiesgoComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminLayoutRoutingModule { }
