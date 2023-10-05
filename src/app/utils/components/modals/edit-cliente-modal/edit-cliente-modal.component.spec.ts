import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditClienteModalComponent} from './edit-cliente-modal.component';

describe('EditClienteModalComponent', () => {
  let component: EditClienteModalComponent;
  let fixture: ComponentFixture<EditClienteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditClienteModalComponent]
    });
    fixture = TestBed.createComponent(EditClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
