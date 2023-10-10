import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { TableModule } from 'ngx-easy-table';


import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { MapaRiesgoComponent } from './pages/reports/mapa-riesgo/mapa-riesgo.component';
import { MatrizPeriodosComponent } from './pages/matriz-periodos/matriz-periodos.component';
import { EvaluacionRiesgoReporteComponent } from './pages/reports/evaluacion-riesgo-reporte/evaluacion-riesgo-reporte.component';
import { PlanTrabajoComponent } from './pages/reports/plan-trabajo/plan-trabajo/plan-trabajo.component';
import { RiesgosComponent } from './pages/riesgos/riesgos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { IngresoRiesgosComponent } from './pages/ingreso-riesgos/ingreso-riesgos.component';
import { IngresoPlanTrabajoComponent } from './pages/ingreso-plan-trabajo/ingreso-plan-trabajo.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InterceptorService } from 'src/app/services/interceptor.service';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { PeriodosComponent } from './pages/periodos/periodos.component';
import { ContinuidadComponent } from './pages/continuidad/continuidad.component';
import { GridContinuidadComponent } from './pages/grid-continuidad/grid-continuidad.component';
import { MatrizContinuidadReporteComponent } from './pages/reports/matriz-continuidad-reporte/matriz-continuidad-reporte.component';
import { SeguimientoRiesgosComponent } from './pages/seguimiento-riesgos/seguimiento-riesgos.component';

@NgModule({
  declarations: [
    MapaRiesgoComponent,
    MatrizPeriodosComponent,
    FooterComponent,
    EvaluacionRiesgoReporteComponent,
    PlanTrabajoComponent,
    RiesgosComponent,
    UsuariosComponent,
    IngresoRiesgosComponent,
    IngresoPlanTrabajoComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    PeriodosComponent,
    ContinuidadComponent,
    GridContinuidadComponent,
    MatrizContinuidadReporteComponent,
    SeguimientoRiesgosComponent
  ],
  imports: [
    AdminLayoutRoutingModule,
    NgbModule,
    AngularMyDatePickerModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class AdminLayoutModule { }
