import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTreballadorsGuardiesComponent } from './admin-treballadors-guardies.component';

describe('AdminTreballadorsGuardiesComponent', () => {
  let component: AdminTreballadorsGuardiesComponent;
  let fixture: ComponentFixture<AdminTreballadorsGuardiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTreballadorsGuardiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTreballadorsGuardiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
