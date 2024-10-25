import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePetsPage } from './profile-pets.page';

describe('ProfilePetsPage', () => {
  let component: ProfilePetsPage;
  let fixture: ComponentFixture<ProfilePetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
