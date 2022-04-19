import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OckovanieStrankaComponent } from './ockovanie-stranka.component';

describe('OckovanieStrankaComponent', () => {
  let component: OckovanieStrankaComponent;
  let fixture: ComponentFixture<OckovanieStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OckovanieStrankaComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OckovanieStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
