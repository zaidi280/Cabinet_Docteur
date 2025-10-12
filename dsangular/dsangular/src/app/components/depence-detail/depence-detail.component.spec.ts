import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenceDetailComponent } from './depence-detail.component';

describe('DepenceDetailComponent', () => {
  let component: DepenceDetailComponent;
  let fixture: ComponentFixture<DepenceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepenceDetailComponent]
    });
    fixture = TestBed.createComponent(DepenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
