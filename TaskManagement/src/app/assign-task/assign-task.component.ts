import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DataShareServiceService } from '../service/task/data-share-service.service';
import { UserService } from '../service/task/user.service';
import { userList } from '../service/task/user-list';
import { User } from '../service/task/user';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {
  
  //fetching data from create-new- task 
  task: any;
  taskStatus: string = '';
  
 // Validations
 assignTask = new FormGroup({
  taskName:new FormControl('',[Validators.required,Validators.pattern(/[\S]/g)]),
  taskDescription:new FormControl('',[Validators.required,Validators.pattern(/[\S]/g)]),
  status:new FormControl('',[Validators.required]),
  priorityOfTask:new FormControl('',[Validators.required]),
  dueDate:new FormControl('',[Validators.required]) ,
  teamMem : new FormControl([],[Validators.required])
});


//For data tranfer from create-task  to assign-task comp
teamMembers=[];

//Constructors
constructor(
  private location :Location,
  private route: ActivatedRoute,
  private shareData:DataShareServiceService,
  private userdetails:UserService
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

//for team
teamLead !: User[];
teamMember!:userList[] ;


ngOnInit(): void {


  // Date
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

  //Date Format
  this.TodayDate = this.currentYear+"-"+ this.FinalMonth+"-"+this.FinalDay;

  //assigning the minimum value of date to present date 
  this.minValue = this.TodayDate;

  // Retrieve task data from the shared service
  this.task = this.shareData.getTaskData();

  // Populate the form fields with the task data
  if (this.task) {
    this.assignTask.patchValue(this.task);
  }

  //teamLeader is the cuurent user
  this.teamLead=this.userdetails.getUserDetails();

  //teamMember from user-list
  this.teamMember= this.userdetails.getFriendList();

  

}

get taskName(){
  return this.assignTask.get('taskName')
}

get taskDescription(){
  return this.assignTask.get('taskDescription')
}

get teamMem(){
  return this.assignTask.get('teamMem')
}

get teamLeader(){
  return this.assignTask.get('teamLeader')
}

//click function for preview button
clicked:boolean=false;  // boolean value for click function
onClick(){
  this.clicked = !this.clicked;
  console.log(this.clicked)
}

//selected team members --team details
selectedMembers: any[] = [];

onSelectionChange(event: any) {
  this.selectedMembers = event;
  console.log(event);
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
