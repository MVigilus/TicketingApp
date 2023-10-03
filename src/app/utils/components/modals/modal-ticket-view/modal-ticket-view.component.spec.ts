import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalTicketViewComponent} from './modal-ticket-view.component';

describe('ModalTicketViewComponent', () => {
    let component: ModalTicketViewComponent;
    let fixture: ComponentFixture<ModalTicketViewComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ModalTicketViewComponent]
        });
        fixture = TestBed.createComponent(ModalTicketViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
