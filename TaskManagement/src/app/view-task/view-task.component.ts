import { Component ,OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/todo/todo-data.service';


export class Todo{
  constructor(
    public id: number,
    public taskname :string,
    public taskdescription :string,
    public status:boolean,
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
    
  refreshTodos(){
    this.todoService.retrieveAllTodos().subscribe( 
      response => {
        console.log(response);
        this.Todo=response;
      }
     )
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
    
    filteredTodos: Todo[] | undefined;

    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      if (!filterValue) {
        this.filteredTodos = this.Todo; // If the filter is empty, show all tasks
        return;
      }
    
      const lowerCaseFilter = filterValue.toLowerCase();
      this.filteredTodos = this.Todo?.filter((todo) => {
        // Filter tasks based on taskname and taskdescription
        return (
          todo.taskname.toLowerCase().includes(lowerCaseFilter) ||
          todo.taskdescription.toLowerCase().includes(lowerCaseFilter)
        );
      });
    }
    
    
}
