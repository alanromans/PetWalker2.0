import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticPage } from './politic.page';

describe('PoliticPage', () => {
  let component: PoliticPage;
  let fixture: ComponentFixture<PoliticPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
