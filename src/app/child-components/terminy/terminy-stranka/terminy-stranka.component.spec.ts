import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminyStrankaComponent } from './terminy-stranka.component';

describe('TerminyStrankaComponent', () => {
  let component: TerminyStrankaComponent;
  let fixture: ComponentFixture<TerminyStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminyStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminyStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
