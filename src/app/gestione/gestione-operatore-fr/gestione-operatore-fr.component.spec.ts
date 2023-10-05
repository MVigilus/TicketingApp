import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestioneOperatoreFRComponent} from './gestione-operatore-fr.component';

describe('GestioneOperatoreFRComponent', () => {
  let component: GestioneOperatoreFRComponent;
  let fixture: ComponentFixture<GestioneOperatoreFRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneOperatoreFRComponent]
    });
    fixture = TestBed.createComponent(GestioneOperatoreFRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
