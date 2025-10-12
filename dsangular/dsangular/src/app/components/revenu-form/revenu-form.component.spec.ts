import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuFormComponent } from './revenu-form.component';

describe('RevenuFormComponent', () => {
  let component: RevenuFormComponent;
  let fixture: ComponentFixture<RevenuFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevenuFormComponent]
    });
    fixture = TestBed.createComponent(RevenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
