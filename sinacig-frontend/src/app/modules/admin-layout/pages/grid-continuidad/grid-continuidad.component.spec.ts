import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContinuidadComponent } from './grid-continuidad.component';

describe('GridContinuidadComponent', () => {
  let component: GridContinuidadComponent;
  let fixture: ComponentFixture<GridContinuidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridContinuidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridContinuidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
