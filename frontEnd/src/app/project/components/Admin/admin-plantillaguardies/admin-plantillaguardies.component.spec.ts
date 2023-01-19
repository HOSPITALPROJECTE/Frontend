import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlantillaguardiesComponent } from './admin-plantillaguardies.component';

describe('AdminPlantillaguardiesComponent', () => {
  let component: AdminPlantillaguardiesComponent;
  let fixture: ComponentFixture<AdminPlantillaguardiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlantillaguardiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlantillaguardiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
