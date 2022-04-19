import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OckovanieFormularComponent } from './ockovanie-formular.component';

describe('OckovanieFormularComponent', () => {
  let component: OckovanieFormularComponent;
  let fixture: ComponentFixture<OckovanieFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OckovanieFormularComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OckovanieFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
