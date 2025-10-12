import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaladieComponentComponent } from './add-maladie-component.component';

describe('AddMaladieComponentComponent', () => {
  let component: AddMaladieComponentComponent;
  let fixture: ComponentFixture<AddMaladieComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMaladieComponentComponent]
    });
    fixture = TestBed.createComponent(AddMaladieComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
