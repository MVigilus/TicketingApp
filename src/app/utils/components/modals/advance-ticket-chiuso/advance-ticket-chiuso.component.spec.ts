import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceTicketChiusoComponent } from './advance-ticket-chiuso.component';

describe('AdvanceTicketChiusoComponent', () => {
  let component: AdvanceTicketChiusoComponent;
  let fixture: ComponentFixture<AdvanceTicketChiusoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvanceTicketChiusoComponent]
    });
    fixture = TestBed.createComponent(AdvanceTicketChiusoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
