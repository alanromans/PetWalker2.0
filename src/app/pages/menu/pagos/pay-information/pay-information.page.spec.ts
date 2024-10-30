import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayInformationPage } from './pay-information.page';

describe('PayInformationPage', () => {
  let component: PayInformationPage;
  let fixture: ComponentFixture<PayInformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PayInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
