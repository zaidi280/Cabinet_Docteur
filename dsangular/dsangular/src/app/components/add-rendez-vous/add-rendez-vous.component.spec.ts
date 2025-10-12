import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRendezVousComponent } from './add-rendez-vous.component';

describe('AddRendezVousComponent', () => {
  let component: AddRendezVousComponent;
  let fixture: ComponentFixture<AddRendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRendezVousComponent]
    });
    fixture = TestBed.createComponent(AddRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
