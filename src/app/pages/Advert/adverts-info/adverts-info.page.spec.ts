import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertsInfoPage } from './adverts-info.page';

describe('AdvertsInfoPage', () => {
  let component: AdvertsInfoPage;
  let fixture: ComponentFixture<AdvertsInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
