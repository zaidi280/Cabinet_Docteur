import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaladieComponentComponent } from './edit-maladie-component.component';

describe('EditMaladieComponentComponent', () => {
  let component: EditMaladieComponentComponent;
  let fixture: ComponentFixture<EditMaladieComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaladieComponentComponent]
    });
    fixture = TestBed.createComponent(EditMaladieComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
