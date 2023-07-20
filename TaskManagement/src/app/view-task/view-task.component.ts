import { Component ,OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/todo/todo-data.service';
import { MatSelectChange } from '@angular/material/select';


export class Todo{
  constructor(
    public id: number,
    public taskname :string,
    public taskdescription :string,
    public status:string,
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

  sortedBy: string = 'id';
  
 

  toggleTables(showTaskList: boolean) {
    this.showTaskList = showTaskList;
    this.showAssignTaskList = !showTaskList;
  }

  ngOnInit(){
    this.refreshTodos();
   
    } 
 
  selectedStatus: string = 'All';
  searchTerm: string = '';

  
  refreshTodos() {
    this.todoService.retrieveAllTodos().subscribe((response) => {
      console.log(response);
      this.Todo = response;
      this.filterTodos(); // Apply initial filtering
    });
  }

  deleteTodo(id: any) {
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo(id).subscribe((response) => {
      this.message = `Delete of Todo ${id} Successful!`;
      this.refreshTodos();
    });
  }

  updateTodo(id: any) {
    console.log(`update todo ${id}`);
    this.router.navigate(['view-task', id]);
  }

  // Method to filter tasks based on the selected status
  filterTodos() {
    if (!this.Todo) return; // Return if Todo is not initialized
    if (this.selectedStatus === 'All') {
      this.filteredTodo = this.Todo; // Show all tasks
    } else {
      this.filteredTodo = this.Todo.filter((todo) => todo.status === this.selectedStatus);
    }
  }

  // Method to search tasks based on the task name
  searchTodos() {
    if (!this.Todo) return; // Return if Todo is not initialized
    if (this.searchTerm.trim() === '') {
      this.filterTodos(); // Show filtered tasks if search term is empty
    } else {
      this.filteredTodo = this.Todo.filter((todo) =>
        todo.taskname.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Method to apply sorting
  sortTodos(sortBy: string) {
    this.sortedBy = sortBy;
    if (!this.Todo) return; // Return if Todo is not initialized
    this.Todo.sort((a: Todo, b: Todo) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });
  }

  // Method to reset filtering and sorting
  resetFiltersAndSorting() {
    this.selectedStatus = 'All';
    this.searchTerm = '';
    this.filterTodos();
    this.sortTodos('id'); // Default sorting by ID
  }

  // Initialize the filteredTodo with the Todo
  filteredTodo: Todo[] | undefined;
}
  

