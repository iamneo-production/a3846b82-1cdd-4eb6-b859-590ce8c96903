import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskServiceService } from 'src/app/service/service/task-service.service';
import { UserService } from 'src/app/service/service/user.service';
import { TaskStatus } from 'src/app/service/service/TaskStatus';
import { Priority } from 'src/app/service/service/Priority';
import { User } from 'src/app/service/service/User';
import { Task } from 'src/app/service/service/task';

@Component({
  selector: 'app-update-task-tl',
  templateUrl: './update-task-tl.component.html',
  styleUrls: ['./update-task-tl.component.css']
})
export class UpdateTaskTLComponent {

  //task
  task: Task = new Task();

// User list
teamMember: User[] = [] ;

  // Validations
  updateTask = new FormGroup({
    taskName: new FormControl(''),
    taskDescription: new FormControl(''),
    status: new FormControl(''),
    priorityOfTask: new FormControl(''),
    dueDate: new FormControl<Date | null>(null),
    teamMem: new FormControl([], [Validators.required])
  });


  //task status from enum
  taskStatuses = Object.values(TaskStatus);

  //priority from enum
  taskPriority = Object.values(Priority);

  //cretae id property of number 
  id!: number;


  //Constructors
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private userService: UserService
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

    //assign id to route
    this.id = this.route.snapshot.params['id'];
    this.getTaskById();

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
    return this.updateTask.get('taskName')
  }

  get taskDescription() {
    return this.updateTask.get('taskDescription')
  }

  getTaskById(): void {
    //to populate data 
    this.taskService.getTaskById(this.id).subscribe(
      (task: Task) => {
        // Set the form values
        this.updateTask.patchValue({
          taskName: task.name,
          taskDescription: task.description,
          status: task.status,
          priorityOfTask: task.priority,
          dueDate: task.dueDate,
          teamMem: []
        });
        console.log(this.id);
      }
    )
  }

  getUsers(): void {
    this.userService.getUserList().subscribe(
      (users: User[]) => {
        this.teamMember = users;
      }
    );
  }
  

  get teamMem() {
    return this.updateTask.get('teamMem')
  }
  //selected team members --team details
  selectedMembers: User[] = [];

  onSelectionChange(event: any) {
    this.selectedMembers = event;
    console.log(event);
  }


  //done button method
  onSubmit() {

    if (this.updateTask.valid) {
      const taskDetails: Task = {
        name: this.updateTask.value.taskName as string,
        description: this.updateTask.value.taskDescription as string,
        status: this.updateTask.value.status as TaskStatus,
        priority: this.updateTask.value.priorityOfTask as Priority,
        dueDate: this.updateTask.value.dueDate as unknown as Date,
        user: null,
        id: this.id,
        createdDate: null,
        teamMembers: this.selectedMembers
      };

      console.log(taskDetails);
      console.log("task updated")
      this.taskService.updateTask(this.id, taskDetails)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['']);
        });
    }
  }

  //Cancel button method
  onCancel() {
    this.location.back();
  }

}
