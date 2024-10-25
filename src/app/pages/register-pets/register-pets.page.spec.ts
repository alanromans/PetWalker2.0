import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPetsPage } from './register-pets.page';

describe('RegisterPetsPage', () => {
  let component: RegisterPetsPage;
  let fixture: ComponentFixture<RegisterPetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
