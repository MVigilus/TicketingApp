import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestioneOperatoreComponent} from './gestione-operatore.component';

describe('GestioneOperatoreComponent', () => {
  let component: GestioneOperatoreComponent;
  let fixture: ComponentFixture<GestioneOperatoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneOperatoreComponent]
    });
    fixture = TestBed.createComponent(GestioneOperatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
