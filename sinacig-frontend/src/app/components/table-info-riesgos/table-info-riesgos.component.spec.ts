import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInfoRiesgosComponent } from './table-info-riesgos.component';

describe('TableInfoRiesgosComponent', () => {
  let component: TableInfoRiesgosComponent;
  let fixture: ComponentFixture<TableInfoRiesgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInfoRiesgosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInfoRiesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
