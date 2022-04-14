import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakcinaciaStrankaComponent } from './vakcinacia-stranka.component';

describe('VakcinaciaStrankaComponent', () => {
  let component: VakcinaciaStrankaComponent;
  let fixture: ComponentFixture<VakcinaciaStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakcinaciaStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VakcinaciaStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
