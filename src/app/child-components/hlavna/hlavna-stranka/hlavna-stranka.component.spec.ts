import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HlavnaStrankaComponent } from './hlavna-stranka.component';

describe('HlavnaStrankaComponent', () => {
  let component: HlavnaStrankaComponent;
  let fixture: ComponentFixture<HlavnaStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HlavnaStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HlavnaStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
