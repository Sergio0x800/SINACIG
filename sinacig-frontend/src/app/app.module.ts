import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EvaluacionRiesgoReporteComponent } from './components/reports/evaluacion-riesgo-reporte/evaluacion-riesgo-reporte.component';
import { PlanTrabajoComponent } from './components/reports/plan-trabajo/plan-trabajo/plan-trabajo.component';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IngresoRiesgosComponent } from './pages/ingreso-riesgos/ingreso-riesgos.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { InterceptorService } from './services/interceptor.service';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { NgxMaskModule } from 'ngx-mask'
import { MatrizPeriodosComponent } from './pages/matriz-periodos/matriz-periodos.component';
import { MatrizPeriodosTableComponent } from './components/matriz-periodos-table/matriz-periodos-table.component';
import { MatrizPeriodosIngresoComponent } from './pages/matriz-periodos-ingreso/matriz-periodos-ingreso.component';
import { RiesgosComponent } from './pages/riesgos/riesgos.component';
import { IngresoPlanTrabajoComponent } from './pages/ingreso-plan-trabajo/ingreso-plan-trabajo.component';
import { TableInfoRiesgosComponent } from './components/table-info-riesgos/table-info-riesgos.component';
import { MapaRiesgoComponent } from './components/reports/mapa-riesgo/mapa-riesgo.component';
import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    IngresoRiesgosComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    LoginComponent,
    UsuariosComponent,
    MatrizPeriodosComponent,
    MatrizPeriodosTableComponent,
    MatrizPeriodosIngresoComponent,
    RiesgosComponent,
    IngresoPlanTrabajoComponent,
    TableInfoRiesgosComponent,
    EvaluacionRiesgoReporteComponent,
    PlanTrabajoComponent,
    MapaRiesgoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    AngularMyDatePickerModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
