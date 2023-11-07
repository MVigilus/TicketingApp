import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTicketComponent } from './login-ticket.component';

describe('LoginTicketComponent', () => {
  let component: LoginTicketComponent;
  let fixture: ComponentFixture<LoginTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginTicketComponent]
    });
    fixture = TestBed.createComponent(LoginTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
