import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusTLComponent } from './update-status-tl.component';

describe('UpdateStatusTLComponent', () => {
  let component: UpdateStatusTLComponent;
  let fixture: ComponentFixture<UpdateStatusTLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStatusTLComponent]
    });
    fixture = TestBed.createComponent(UpdateStatusTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
