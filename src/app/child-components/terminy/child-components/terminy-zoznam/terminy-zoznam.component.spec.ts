import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminyZoznamComponent } from './terminy-zoznam.component';

describe('TerminyZoznamComponent', () => {
  let component: TerminyZoznamComponent;
  let fixture: ComponentFixture<TerminyZoznamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminyZoznamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminyZoznamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
