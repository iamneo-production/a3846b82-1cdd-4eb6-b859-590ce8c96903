import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskTLComponent } from './view-task-tl.component';

describe('ViewTaskTLComponent', () => {
  let component: ViewTaskTLComponent;
  let fixture: ComponentFixture<ViewTaskTLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskTLComponent]
    });
    fixture = TestBed.createComponent(ViewTaskTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
