import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DataShareServiceService } from '../service/data-share-service.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {
  
  //fetching data from create-new- task 
  task: any;
  
 // Validations
 assignTask = new FormGroup({
  taskName:new FormControl('',[Validators.required,Validators.pattern(/[\S]/g)]),
  taskDescription:new FormControl('',[Validators.required,Validators.pattern(/[\S]/g)]),
  status:new FormControl('',[Validators.required]),
  priorityOfTask:new FormControl('',[Validators.required]),
  dueDate:new FormControl('',[Validators.required]) ,
});


//For data tranfer from create-task  to assign-task comp


//Constructors
constructor(
  private location :Location,
  private route: ActivatedRoute,
  private shareData:DataShareServiceService
  ) { }

//for date picker  
date1 = new Date();
currentYear = this.date1.getUTCFullYear();
currentMonth = this.date1.getUTCMonth() + 1;
currentDay = this.date1.getUTCDate();

FinalMonth:any;
FinalDay:any;
minValue : any;
TodayDate : any;


ngOnInit(): void {
if(this.currentMonth<10){
  this.FinalMonth ="0"+this.currentMonth;
}
else{
  this.FinalMonth = this.currentMonth;
}

if(this.currentDay<10){
  this.FinalDay = "0"+ this.currentDay;
}
else{
  this.FinalDay = this.currentDay;
}
this.TodayDate = this.currentYear+"-"+ this.FinalMonth+"-"+this.FinalDay;
this.minValue = this.TodayDate;

// Retrieve task data from the shared service
this.task = this.shareData.getTaskData();
}

get taskName(){
  return this.assignTask.get('taskName')
}

get taskDescription(){
  return this.assignTask.get('taskDescription')
}


//done button functions
onSubmit(){ 
  console.log(this.assignTask.value) ;
  const task = this.shareData.getTaskData();
    if (task) {
      this.assignTask.patchValue(task);
    }
 }
 
 //Reset button function
 onReset(){
  this.assignTask.reset();
}

//Cancel button function
onCancel(){
  this.location.back();
}


}
