import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuardiesComponent } from './admin-guardies.component';

describe('AdminGuardiesComponent', () => {
  let component: AdminGuardiesComponent;
  let fixture: ComponentFixture<AdminGuardiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGuardiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGuardiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
