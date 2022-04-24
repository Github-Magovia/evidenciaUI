import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminyFormularComponent } from './terminy-formular.component';

describe('TerminyFormularComponent', () => {
  let component: TerminyFormularComponent;
  let fixture: ComponentFixture<TerminyFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminyFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminyFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
