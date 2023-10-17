import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceTicketLavorazioneComponent } from './advance-ticket-lavorazione.component';

describe('AdvanceTicketLavorazioneComponent', () => {
  let component: AdvanceTicketLavorazioneComponent;
  let fixture: ComponentFixture<AdvanceTicketLavorazioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvanceTicketLavorazioneComponent]
    });
    fixture = TestBed.createComponent(AdvanceTicketLavorazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
