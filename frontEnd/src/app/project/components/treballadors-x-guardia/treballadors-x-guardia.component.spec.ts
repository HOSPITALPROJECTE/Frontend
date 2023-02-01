import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreballadorsXGuardiaComponent } from './treballadors-x-guardia.component';

describe('TreballadorsXGuardiaComponent', () => {
  let component: TreballadorsXGuardiaComponent;
  let fixture: ComponentFixture<TreballadorsXGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreballadorsXGuardiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreballadorsXGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
