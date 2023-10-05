import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditOperatoreModalComponent} from './edit-operatore-modal.component';

describe('EditOperatoreModalComponent', () => {
  let component: EditOperatoreModalComponent;
  let fixture: ComponentFixture<EditOperatoreModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOperatoreModalComponent]
    });
    fixture = TestBed.createComponent(EditOperatoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
