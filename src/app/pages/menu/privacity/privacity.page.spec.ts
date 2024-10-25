import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacityPage } from './privacity.page';

describe('PrivacityPage', () => {
  let component: PrivacityPage;
  let fixture: ComponentFixture<PrivacityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
