import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTreballadorsXGuardiaComponent } from './admin-treballadors-x-guardia.component';

describe('AdminTreballadorsXGuardiaComponent', () => {
  let component: AdminTreballadorsXGuardiaComponent;
  let fixture: ComponentFixture<AdminTreballadorsXGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTreballadorsXGuardiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTreballadorsXGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
