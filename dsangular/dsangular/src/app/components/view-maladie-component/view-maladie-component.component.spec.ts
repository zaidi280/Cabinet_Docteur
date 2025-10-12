import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaladieComponentComponent } from './view-maladie-component.component';

describe('ViewMaladieComponentComponent', () => {
  let component: ViewMaladieComponentComponent;
  let fixture: ComponentFixture<ViewMaladieComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMaladieComponentComponent]
    });
    fixture = TestBed.createComponent(ViewMaladieComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
