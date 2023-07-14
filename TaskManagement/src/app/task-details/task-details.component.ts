import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '/home/coder/project/workspace/TaskManagement/src/app/service/data/taskservice.service'

export class Task{
  constructor(
    public taskdescription:string,
	  public taskname:string,
	  public taskduedate:Date,
	  public id:number,
	  public username:string,
	  public taskstatus:boolean
  ){
  
  }
}
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  message:any;
  constructor(public taskservice :TaskserviceService){

  }
  
  ngOnInit(): void {
    this.refreshTasks()
  }
  refreshTasks(){
    this.taskservice.retrieveTasks().subscribe(
      response=>{
        this.tasks=response
      }
    )
  }
  deleteTask(id:any){
    this.taskservice.deleteTask(id).subscribe(
      response=>{
        this.message=`Deletion of Task ${id} successful`
        this.refreshTasks()
      }
    )
  }
  tasks:Task[] | undefined
  // Tasks=[new task('To do','In progress',true),
  // new task('assign','In progress',true),
  // new task('evaluate','In progress',true)]
}
