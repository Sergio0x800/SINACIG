import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoRiesgosComponent } from './pages/ingreso-riesgos/ingreso-riesgos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MatrizPeriodosComponent } from './pages/matriz-periodos/matriz-periodos.component';
import { MatrizPeriodosIngresoComponent } from './pages/matriz-periodos-ingreso/matriz-periodos-ingreso.component';
import { RiesgosComponent } from './pages/riesgos/riesgos.component';
import { IngresoPlanTrabajoComponent } from './pages/ingreso-plan-trabajo/ingreso-plan-trabajo.component';
import { EvaluacionRiesgoReporteComponent } from './components/reports/evaluacion-riesgo-reporte/evaluacion-riesgo-reporte.component';
import { PlanTrabajoComponent } from './components/reports/plan-trabajo/plan-trabajo/plan-trabajo.component';
import { MapaRiesgoComponent } from './components/reports/mapa-riesgo/mapa-riesgo.component';
const routes: Routes = [

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'matriz',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'matriz',
        component: MatrizPeriodosComponent
      },
      {
        path: 'matriz-periodos-ingreso',
        component: MatrizPeriodosIngresoComponent
      },
      {
        path: 'riesgos/:id_matriz',
        component: RiesgosComponent
      },
      {
        path: 'ingreso-riesgos/:id_matriz',
        component: IngresoRiesgosComponent
      },
      {
        path: 'ingreso-plan-trabajo/:id_riesgo/:id_matriz',
        component: IngresoPlanTrabajoComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'evaluacion-riesgo-reporte',
        component: EvaluacionRiesgoReporteComponent

      },
      {
        path: 'plan-trabajo-reporte',
        component: PlanTrabajoComponent,
      },
      {
        path: 'mapa-riesgo',
        component: MapaRiesgoComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
