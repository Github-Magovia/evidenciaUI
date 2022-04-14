import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakcinaciaFormularComponent } from './vakcinacia-formular.component';

describe('VakcinaciaFormularComponent', () => {
  let component: VakcinaciaFormularComponent;
  let fixture: ComponentFixture<VakcinaciaFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakcinaciaFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VakcinaciaFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
