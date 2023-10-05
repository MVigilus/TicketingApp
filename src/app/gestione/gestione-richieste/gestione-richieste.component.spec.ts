import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestioneRichiesteComponent} from './gestione-richieste.component';

describe('GestioneRichiesteComponent', () => {
  let component: GestioneRichiesteComponent;
  let fixture: ComponentFixture<GestioneRichiesteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneRichiesteComponent]
    });
    fixture = TestBed.createComponent(GestioneRichiesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
