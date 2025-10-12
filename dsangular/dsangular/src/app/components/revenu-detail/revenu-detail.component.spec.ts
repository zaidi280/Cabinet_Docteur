import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuDetailComponent } from './revenu-detail.component';

describe('RevenuDetailComponent', () => {
  let component: RevenuDetailComponent;
  let fixture: ComponentFixture<RevenuDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevenuDetailComponent]
    });
    fixture = TestBed.createComponent(RevenuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
