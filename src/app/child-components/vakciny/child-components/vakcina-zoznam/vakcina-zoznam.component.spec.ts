import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakcinaZoznamComponent } from './vakcina-zoznam.component';

describe('VakcinaZoznamComponent', () => {
  let component: VakcinaZoznamComponent;
  let fixture: ComponentFixture<VakcinaZoznamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakcinaZoznamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VakcinaZoznamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
