import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogoClienteComponent } from './edit-logo-cliente.component';

describe('EditLogoClienteComponent', () => {
  let component: EditLogoClienteComponent;
  let fixture: ComponentFixture<EditLogoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLogoClienteComponent]
    });
    fixture = TestBed.createComponent(EditLogoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
