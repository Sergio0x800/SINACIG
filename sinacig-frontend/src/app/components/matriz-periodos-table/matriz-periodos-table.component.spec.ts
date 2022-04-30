import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizPeriodosTableComponent } from './matriz-periodos-table.component';

describe('MatrizPeriodosTableComponent', () => {
  let component: MatrizPeriodosTableComponent;
  let fixture: ComponentFixture<MatrizPeriodosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizPeriodosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizPeriodosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
