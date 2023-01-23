import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFestiusComponent } from './admin-festius.component';

describe('AdminFestiusComponent', () => {
  let component: AdminFestiusComponent;
  let fixture: ComponentFixture<AdminFestiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFestiusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFestiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
