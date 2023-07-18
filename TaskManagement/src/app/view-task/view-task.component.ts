import { Component ,OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/todo/todo-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';



export class Todo{
  constructor(
    public id: number,
    public taskname :string,
    public taskdescription :string,
    public status:boolean,
    public priority:boolean,
    public targetdate:Date,
    public teammember:string
  
  ){
    
  }
}
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Todo>;

  constructor( public todoService:TodoDataService,
    public router :Router){}

  Todo:Todo[] | undefined; 
  message: string | undefined;
 
  showTaskList = true;
  showAssignTaskList = false;

  toggleTables(showTaskList: boolean) {
    this.showTaskList = showTaskList;
    this.showAssignTaskList = !showTaskList;
  }

  ngOnInit(){
    this.refreshTodos();
   
    }
  
    refreshTodos() {
      this.todoService.retrieveAllTodos().subscribe(
        response => {
          console.log(response);
          this.Todo = response;
          this.dataSource = new MatTableDataSource(this.Todo);
          this.dataSource.sort = this.sort;
        }
      );
    }
    
  
    deleteTodo(id: any){
      console.log(`delete todo ${id}`)
      this.todoService.deleteTodo(id).subscribe(  
        response =>{
          this.message=`Delete of Todo ${id} Successful!`
          this.refreshTodos();
  
        }
      )
    } 
  
    updateTodo(id: any){
      console.log(`update todo ${id}`)
      this.router.navigate(['view-task',id]) 
      
    }

    
}
