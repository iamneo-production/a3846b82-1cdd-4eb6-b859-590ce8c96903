import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataShareServiceService } from '../service/task/data-share-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  // Validations
  createTask = new FormGroup({
    taskName:new FormControl('',[Validators.required,Validators.pattern(/\S/g)]),
    taskDescription:new FormControl('',[Validators.required,Validators.pattern(/\S/g)]),
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
  //done button method
  onSubmit(){ 
    
    if (this.createTask.valid) {
      const task = this.createTask.value;
      console.log(task);
    }
   }
   
   //Reset button method
   onReset(){
    this.createTask.reset();
  }

  //Cancel button method
  onCancel(){
    this.location.back();
  }

  // Assign task
  onAssignTask(){
    if (this.createTask.valid) {
      // Get the task 
      const task = this.createTask.value;
      // Set the task in the shared service
      this.shareData.addTaskData(task); 
      this.router.navigate(['/assign']);

    } 
  }
}