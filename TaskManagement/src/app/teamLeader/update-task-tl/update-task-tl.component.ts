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
import { TodoDataService } from 'src/app/service/todo/todo-data.service';

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
  assignTask = new FormGroup({
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
    private userService: UserService,
    private tskService: TodoDataService
  ) { }



  ngOnInit(): void {
    //assign id to route
    this.id = this.route.snapshot.params['id'];
    this.getTaskById();
    this.getUsers();
  }
  
  getTaskById(): void {
    //to populate data 
    this.tskService.getTaskById(this.id).subscribe(
      (task: Task) => {
        // Set the form values
        this.assignTask.patchValue({
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
 

  get taskName() {
    return this.assignTask.get('taskName')
  }

  get taskDescription() {
    return this.assignTask.get('taskDescription')
  }

  get teamMem() {
    return this.assignTask.get('teamMem')
  }
  //selected team members --team details
  selectedMembers: User[] = [];

  onSelectionChange(event: any) {
    this.selectedMembers = event;
    console.log(event);
  }

  //done button method
  onSubmit() {
    const taskDetails: Task = {
      name: this.assignTask.value.taskName as string,
      description: this.assignTask.value.taskDescription as string,
      status: this.assignTask.value.status as TaskStatus,
      priority: this.assignTask.value.priorityOfTask as Priority,
      dueDate: typeof this.assignTask.value.dueDate === 'string' ? new Date(this.assignTask.value.dueDate) : null,
      user: null,
      id: this.id, 
      createdDate: null, 
      teamMembers: this.selectedMembers
    };
    console.log(taskDetails);
    console.log("task updated")
    this.tskService.updateTask(this.id,taskDetails)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['dashboard']);
      });
  }



  //Cancel button method
  onCancel() {
    this.location.back();
  }
}
 