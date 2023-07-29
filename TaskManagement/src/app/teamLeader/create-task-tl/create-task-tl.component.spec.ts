import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskTLComponent } from './create-task-tl.component';

describe('CreateTaskTLComponent', () => {
  let component: CreateTaskTLComponent;
  let fixture: ComponentFixture<CreateTaskTLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskTLComponent]
    });
    fixture = TestBed.createComponent(CreateTaskTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
