import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page505Component } from './page505.component';

describe('Page505Component', () => {
  let component: Page505Component;
  let fixture: ComponentFixture<Page505Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Page505Component]
    });
    fixture = TestBed.createComponent(Page505Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
