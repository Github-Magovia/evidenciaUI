import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakcinyStrankaComponent } from './vakciny-stranka.component';

describe('VakcinyStrankaComponent', () => {
  let component: VakcinyStrankaComponent;
  let fixture: ComponentFixture<VakcinyStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakcinyStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VakcinyStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
