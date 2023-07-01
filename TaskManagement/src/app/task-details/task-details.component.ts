import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '/home/coder/project/workspace/TaskManagement/src/app/service/data/taskservice.service'
export class Task{
  constructor(
    public task_name:string,
    public task_description:string,
    public task_status:boolean,
    public id:number,
    public task_duedate:Date,
    public username:string
  ){
  
  }
}
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
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
  tasks:Task[] | undefined
  // Tasks=[new task('To do','In progress',true),
  // new task('assign','In progress',true),
  // new task('evaluate','In progress',true)]
}
