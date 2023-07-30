import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskTLComponent } from './update-task-tl.component';

describe('UpdateTaskTLComponent', () => {
  let component: UpdateTaskTLComponent;
  let fixture: ComponentFixture<UpdateTaskTLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTaskTLComponent]
    });
    fixture = TestBed.createComponent(UpdateTaskTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
