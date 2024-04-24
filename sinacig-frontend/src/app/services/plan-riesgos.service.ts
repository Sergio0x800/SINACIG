import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanRiesgosService {

  private apiUrl = `${environment.URL_API}`;

  constructor(private http: HttpClient) { }

  createPlanRiesgo(data: any) {
    return this.http.post<any>(`${this.apiUrl}/riesgo_plan_trabajo`, data);
  }

  createControlInterno(data: any) {
    return this.http.post<any>(`${this.apiUrl}/riesgo_control_interno`, data);
  }

  createRecurso(data: any) {
    return this.http.post<any>(`${this.apiUrl}/recursos`, data);
  }

  createControlInternoPlan(data: any) {
    return this.http.post<any>(`${this.apiUrl}/controlInternoPlan`, data);
  }

  createControlImplementacion(data: any) {
    return this.http.post<any>(`${this.apiUrl}/implementacion`, data);
  }

  /////////////GETS/////////////////////

  getPlanTrabajoByIdRiesgo(id_riesgo: any) {
    return this.http.get<any>(`${this.apiUrl}/riesgo_plan_trabajo/${id_riesgo}`);
  }
  getExistenciaPlanTrabajoPendiente(id_matriz: any) {
    return this.http.get<any>(`${this.apiUrl}/riesgo_plan_trabajo/existencia_plan/${id_matriz}`);
  }
  getRecursos(id_plan: any) {
    return this.http.get<any>(`${this.apiUrl}/recursos/${id_plan}`);
  }

  getRecursosByIdRiesgo(id_riesgo: any) {
    return this.http.get<any>(`${this.apiUrl}/recursos/riesgos/${id_riesgo}`);
  }

  getControlInternoPlanByIdRiesgo(id_riesgo: any) {
    return this.http.get<any>(`${this.apiUrl}/controlInternoPlan/riesgos/${id_riesgo}`);
  }

  getControlInterno(id_plan: any) {
    return this.http.get<any>(`${this.apiUrl}/riesgo_control_interno/${id_plan}`);
  }

  getControlImplementacion(id_plan: any) {
    return this.http.get<any>(`${this.apiUrl}/implementacion/${id_plan}`);
  }

  getControlImplementacionByIdRiesgo(id_riesgo: any) {
    return this.http.get<any>(`${this.apiUrl}/implementacion/riesgo/${id_riesgo}`);
  }
  ////////delete/////////
  deletePlan(id_plan: any) {
    return this.http.patch<any>(`${this.apiUrl}/riesgo_plan_trabajo/${id_plan}`, { estado_registro: 0 });
  }
  deleteRecursos(id_plan: any, changes: any) {
    return this.http.patch<any>(`${this.apiUrl}/recursos/${id_plan}`, changes);
  }
  deleteControlInternoPlan(id_plan: any, changes: any) {
    return this.http.patch<any>(`${this.apiUrl}/controlInternoPlan/${id_plan}`, changes);
  }
  deleteControlInterno(id_plan: any, changes: any) {
    return this.http.patch<any>(`${this.apiUrl}/riesgo_control_interno/${id_plan}`, changes);
  }
  deleteControlImplementacion(id_plan: any, changes: any) {
    return this.http.patch<any>(`${this.apiUrl}/implementacion/${id_plan}`, changes);
  }

  ///Update
  getPlanById(id_plan: any) {
    return this.http.get<any>(`${this.apiUrl}/riesgo_plan_trabajo/update/${id_plan}`);
  }

  updateEstadoPlanByIdRiesgo(id_riesgo: any, data: any) {
    return this.http.patch<any>(`${this.apiUrl}/estadoPlanByRiesgo/${id_riesgo}`, data);
  }
  updatePlan(id_plan: any, data: any) {
    return this.http.patch<any>(`${this.apiUrl}/riesgo_plan_trabajo/${id_plan}`, data);
  }

}
