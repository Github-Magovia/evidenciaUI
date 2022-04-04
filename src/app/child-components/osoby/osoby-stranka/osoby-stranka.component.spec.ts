import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobyStrankaComponent } from './osoby-stranka.component';

describe('OsobyStrankaComponent', () => {
  let component: OsobyStrankaComponent;
  let fixture: ComponentFixture<OsobyStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsobyStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsobyStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
