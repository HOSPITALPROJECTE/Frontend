import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTreballadorsComponent } from './admin-treballadors.component';

describe('AdminTreballadorsComponent', () => {
  let component: AdminTreballadorsComponent;
  let fixture: ComponentFixture<AdminTreballadorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTreballadorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTreballadorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
