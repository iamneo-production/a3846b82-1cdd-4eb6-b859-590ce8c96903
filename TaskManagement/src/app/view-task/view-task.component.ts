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

  sortBy: string | undefined;
  sortDirection: string | undefined;

  // Properties for filtering
  searchText: string = '';
  
  
  sortTable(property: string) {
    if (this.sortBy === property) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = property;
      this.sortDirection = 'asc';
    }

    // Perform the sorting
    this.Todo = this.Todo?.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
  }

  applyFilter() {
    const searchText = this.searchText.toLowerCase().trim();

    if (searchText === '') {
      this.refreshTodos(); // Reset the filter and show all todos
    } else {
      this.Todo = this.Todo?.filter(
        (todo) =>
          todo.taskname.toLowerCase().includes(searchText) ||
          todo.taskdescription.toLowerCase().includes(searchText) ||
          todo.teammember.toLowerCase().includes(searchText)
      );
    }
  }

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
    
}
