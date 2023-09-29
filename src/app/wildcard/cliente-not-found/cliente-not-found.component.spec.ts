import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNotFoundComponent } from './cliente-not-found.component';

describe('ClienteNotFoundComponent', () => {
  let component: ClienteNotFoundComponent;
  let fixture: ComponentFixture<ClienteNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteNotFoundComponent]
    });
    fixture = TestBed.createComponent(ClienteNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
