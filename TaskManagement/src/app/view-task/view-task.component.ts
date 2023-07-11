import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/todo/todo-data.service';


export class Todo{
  constructor(
    public id: number,
    public taskName :string,
    public taskDescription :string,
    public status:boolean,
    public priority:boolean,
    public dueDate:Date,
  
  ){
    
  }
}
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor( public todoService:TodoDataService,
    public router :Router){}

  Todo:Todo[] | undefined; 

  ngOnInit(){ }

}
