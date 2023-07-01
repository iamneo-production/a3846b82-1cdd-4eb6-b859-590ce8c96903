import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AssignTaskComponent } from '../assign-task/assign-task.component';
import { DataShareServiceService } from '../service/data-share-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  // Validations
  createTask = new FormGroup({
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
    private router: Router,
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
  }

  get taskName(){
    return this.createTask.get('taskName')
  }
  
  get taskDescription(){
    return this.createTask.get('taskDescription')
  }

  //data transfer
  task: any;
  //done button functions
  onSubmit(){ 
    console.log(this.createTask.value) ;
    if (this.createTask.valid) {
      const data = this.createTask.value;
     console.log('Form is valid');
     // Create task and update task data in the shared service
    this.shareData.addTaskData(this.task);
   } 
   }
   
   //Reset button function
   onReset(){
    this.createTask.reset();
  }

  //Cancel button function
  onCancel(){
    this.location.back();
  }
}