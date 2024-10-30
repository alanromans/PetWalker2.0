import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayTogglePage } from './pay-toggle.page';

describe('PayTogglePage', () => {
  let component: PayTogglePage;
  let fixture: ComponentFixture<PayTogglePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTogglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
