import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestioneClienteComponent} from './gestione-cliente.component';

describe('GestioneClienteComponent', () => {
  let component: GestioneClienteComponent;
  let fixture: ComponentFixture<GestioneClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneClienteComponent]
    });
    fixture = TestBed.createComponent(GestioneClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
