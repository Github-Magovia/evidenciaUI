import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakcinaFormularComponent } from './vakcina-formular.component';

describe('VakcinaFormularComponent', () => {
  let component: VakcinaFormularComponent;
  let fixture: ComponentFixture<VakcinaFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakcinaFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VakcinaFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
