import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OckovanieZoznamComponent } from './ockovanie-zoznam.component';

describe('OckovanieZoznamComponent', () => {
  let component: OckovanieZoznamComponent;
  let fixture: ComponentFixture<OckovanieZoznamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OckovanieZoznamComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OckovanieZoznamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
