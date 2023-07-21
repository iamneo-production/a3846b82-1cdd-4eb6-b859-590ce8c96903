import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TaskServiceService } from 'src/app/service/service/task-service.service';
import { TaskStatus } from 'src/app/service/service/TaskStatus';
import { Priority } from 'src/app/service/service/Priority';
import { User } from 'src/app/service/service/User';
import { Task } from 'src/app/service/service/task';
import { UserService } from 'src/app/service/service/user.service';

@Component({
  selector: 'app-create-task-tl',
  templateUrl: './create-task-tl.component.html',
  styleUrls: ['./create-task-tl.component.css']
})
export class CreateTaskTLComponent {

  //task
  task :Task = new Task();
  

  // Validations
  createTask = new FormGroup({
    taskName: new FormControl('', [Validators.required, Validators.pattern(/\S/g)]),
    taskDescription: new FormControl('', [Validators.required, Validators.pattern(/\S/g)]),
    status: new FormControl('', [Validators.required]),
    priorityOfTask: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
  });


  //task status from enum
  taskStatuses = Object.values(TaskStatus);

  //priority from enum
  taskPriority = Object.values(Priority);

  //selected members
  selectedMembers: User[]=[];
  id !: number | null;



  //Constructors
  constructor(
    private location: Location,
    private router: Router,
    private taskService : TaskServiceService,
    public userService:UserService
  ) { }

  //for date picker  
  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDay = this.date1.getUTCDate();

  FinalMonth: any;
  FinalDay: any;
  minValue: any;
  TodayDate: any;


  ngOnInit(): void {

    if (this.currentMonth < 10) {
      this.FinalMonth = "0" + this.currentMonth;
    }
    else {
      this.FinalMonth = this.currentMonth;
    }

    if (this.currentDay < 10) {
      this.FinalDay = "0" + this.currentDay;
    }
    else {
      this.FinalDay = this.currentDay;
    }
    this.TodayDate = this.currentYear + "-" + this.FinalMonth + "-" + this.FinalDay;
    this.minValue = this.TodayDate;
  }

  get taskName() {
    return this.createTask.get('taskName')
  }

  get taskDescription() {
    return this.createTask.get('taskDescription')
  }

  //assign task
  assign: boolean = false;

  toggle() {
    this.assign = !this.assign;
  }
  
  taskId !:number;

  //done button method
  onSubmit() {

    if (this.createTask.valid) {
      const taskDetails : Task = {
        name: this.createTask.value.taskName as string,
        description: this.createTask.value.taskDescription as string,
        status: this.createTask.value.status as TaskStatus,
        priority: this.createTask.value.priorityOfTask as Priority,
        dueDate: this.createTask.value.dueDate as unknown as Date,
        user: null,
        id:null,
        createdDate: null,
        teamMembers: this.assign ? null : this.selectedMembers
      };
      
     
      console.log(taskDetails);
      this.taskService.createTask(taskDetails)
      .subscribe((data:any) => {
        if (this.assign) {
          this.taskId = data.id;
          console.log(this.taskId);
          this.router.navigate(['tasks',this.taskId, 'assign']); 
        }
      });
    }
  }

  //Reset button method
  onReset() {
    this.createTask.reset();
  }

  //Cancel button method
  onCancel() {
    this.location.back();
  }

  // Assign task
  onAssignTask() {
    this.assign = true;
  }


}
