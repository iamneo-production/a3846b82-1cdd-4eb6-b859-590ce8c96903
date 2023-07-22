import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/service/service/task';
import { User } from 'src/app/service/service/User';
import { UserService } from 'src/app/service/service/user.service';
import { TaskServiceService } from 'src/app/service/service/task-service.service';
import { TaskStatus } from 'src/app/service/service/TaskStatus';
import { Priority } from 'src/app/service/service/Priority';

@Component({
  selector: 'app-view-task-tl',
  templateUrl: './view-task-tl.component.html',
  styleUrls: ['./view-task-tl.component.css']
})
export class ViewTaskTLComponent {

   //task
   task: Task = new Task();

   // User list
   teamMember: User[] = [] ;
  
   // Validations
   viewTask = new FormGroup({
     taskName: new FormControl(''),
     taskDescription: new FormControl(''),
     status: new FormControl(''),
     priorityOfTask: new FormControl(''),
     dueDate: new FormControl<Date | null>(null),
     teamMem: new FormControl([])
   });
  
   
  
   //cretae id property of number 
   id!: number;
  
  
   //Constructors
   constructor(
     private location: Location,
     private router: Router,
     private route: ActivatedRoute,
     private userService: UserService,
     private tskService: TaskServiceService,
     
   ) { }
  
  
   //task status from enum
   taskStatuses = Object.values(TaskStatus);
  
   //priority from enum
   taskPriority = Object.values(Priority);
  
  
   ngOnInit(): void {
     //assign id to route
     this.route.params.subscribe(params => {
      this.id = +params['id'];
  
      //get task by id is subscribed to data
      this.tskService.getTaskById(this.id).subscribe((task: Task) => {
        this.task = task;
        this.dataTransfer();
      });
    });
   }
  
   dataTransfer(){
    this.viewTask.patchValue({
      taskName: this.task.name,
      taskDescription: this.task.description,
      status: this.task.status,
      priorityOfTask: this.task.priority,
      dueDate: this.task.dueDate,
    });
   }
  
  
   //Cancel button method
   onCancel() {
     this.location.back();
   }
}
