import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobyFormularComponent } from './osoby-formular.component';

describe('OsobyFormularComponent', () => {
  let component: OsobyFormularComponent;
  let fixture: ComponentFixture<OsobyFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsobyFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsobyFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
