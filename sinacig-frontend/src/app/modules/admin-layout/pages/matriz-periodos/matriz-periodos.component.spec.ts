import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizPeriodosComponent } from './matriz-periodos.component';

describe('MatrizPeriodosComponent', () => {
  let component: MatrizPeriodosComponent;
  let fixture: ComponentFixture<MatrizPeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizPeriodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
