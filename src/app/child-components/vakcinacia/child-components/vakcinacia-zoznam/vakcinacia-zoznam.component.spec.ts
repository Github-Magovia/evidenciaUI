import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VakcinaciaZoznamComponent } from './vakcinacia-zoznam.component';

describe('VakcinaciaZoznamComponent', () => {
  let component: VakcinaciaZoznamComponent;
  let fixture: ComponentFixture<VakcinaciaZoznamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VakcinaciaZoznamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VakcinaciaZoznamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
