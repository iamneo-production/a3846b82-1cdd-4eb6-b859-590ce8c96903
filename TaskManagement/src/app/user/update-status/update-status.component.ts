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
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent {

  
  //task
 task :Task = new Task();
  

 // Validations
 updateStatus = new FormGroup({
   taskName: new FormControl('', [Validators.required, Validators.pattern(/\S/g)]),
   taskDescription: new FormControl('', [Validators.required, Validators.pattern(/\S/g)]),
   status: new FormControl('', [Validators.required]),
   priorityOfTask: new FormControl('', [Validators.required]),
   dueDate: new FormControl<Date | null>(null),
  });


 //task status from enum
 taskStatuses = Object.values(TaskStatus);

 //priority from enum
 taskPriority = Object.values(Priority);

 //selected members
 selectedMembers: User[]=[];

 //For data tranfer from create-task  to assign-task comp


 //Constructors
 constructor(
  public _coreService: CoreService,
   private location: Location,
   private router: Router,
   private route: ActivatedRoute,
   private taskService : TodoDataService,
   private userService:UserService
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
   return this.updateStatus.get('taskName')
 }

 get taskDescription() {
   return this.updateStatus.get('taskDescription')
 }

 getTaskById(): void {
  //to populate data 
  this.taskService.getTaskById(this.id).subscribe(
    (task: Task) => {
      // Set the form values
      this.updateStatus.patchValue({
        taskName: task.name,
        taskDescription: task.description,
        status: task.status,
        priorityOfTask: task.priority,
        dueDate: task.dueDate,
      });
      console.log(this.id);
    }
  )
}


//cretae id property of number 
id!: number;
 

 //done button method
 onSubmit() {

   if (this.updateStatus.valid) {
     const taskDetails : Task = {
       name: this.updateStatus.value.taskName as string,
       description: this.updateStatus.value.taskDescription as string,
       status: this.updateStatus.value.status as TaskStatus,
       priority: this.updateStatus.value.priorityOfTask as Priority,
       dueDate: this.updateStatus.value.dueDate as unknown as Date,
       user: null,
       id:  this.id,
       createdDate: null,
     };
     
     console.log(taskDetails);
     console.log("task updated")
     this.taskService.updateTask(this.id,taskDetails)
       .subscribe(data => {
         console.log(data);
         this._coreService.openSnackBar('Task Status Updated !!','done');
         this.router.navigate(['dashboard']);
       });
   }
 }

 //Cancel button method
 onCancel() {
   this.location.back();
 }


}
