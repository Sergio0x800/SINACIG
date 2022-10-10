import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuidadComponent } from './continuidad.component';

describe('ContinuidadComponent', () => {
  let component: ContinuidadComponent;
  let fixture: ComponentFixture<ContinuidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
