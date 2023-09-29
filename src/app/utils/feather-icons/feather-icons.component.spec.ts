import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatherIconsComponent } from './feather-icons.component';

describe('FeatherIconsComponent', () => {
  let component: FeatherIconsComponent;
  let fixture: ComponentFixture<FeatherIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatherIconsComponent]
    });
    fixture = TestBed.createComponent(FeatherIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
