import { Component ,OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/todo/todo-data.service';
import { CoreService } from '../core/core.service';
import { Task } from '../service/service/task';
import { UserService } from '../service/service/user.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
TewTaskodo: any;

  
  taskId:string;
  
  constructor( public todoService:TodoDataService,
    public router :Router,
    public _coreService: CoreService,
    public userService:UserService
    ){}

  Todo:Task[] | undefined; 
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
    this.filterTodos();
   
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
      this._coreService.openSnackBar('Task Deleted!!','done');
      this.refreshTodos();
    });
  }

  updateTodo(id: any) {
    console.log(`update todo ${id}`);
    this.router.navigate((['task',id, 'update']));
  }

  updateStatus(id: any) {
    console.log(`update todo ${id}`);
    this.router.navigate((['task',id, 'status']));
  }

  viewTask(id: number) {
    console.log(`View todo ${id}`);
    this.router.navigate((['task',id, 'view']));
  }

  assignTask(id: any) {
    console.log(`update todo ${id}`);
    this.router.navigate((['task',id, 'assign']));
  }

  filterTodos() {
    if (!this.Todo) return; // Return if Todo is not initialized
    if (this.selectedStatus === 'All' && !this.searchTerm) {
      this.filteredTodo = this.Todo; // Show all tasks when no status and search term are applied
    } else {
      this.filteredTodo = this.Todo.filter((todo) => {
        const statusFilter = this.selectedStatus === 'All' || todo.status === this.selectedStatus;
        const searchFilter = !this.searchTerm || todo.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        return statusFilter && searchFilter;
      });
    }
  }

  // Method to apply sorting
  sortTodos(sortBy: string) {
    this.sortedBy = sortBy;
    if (!this.Todo) return; // Return if Todo is not initialized
    this.Todo.sort((a: Task, b: Task) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });
  }

  // Method to reset filtering and sorting
  resetFiltersAndSorting() {
    this.selectedStatus = 'All';
    this.filterTodos();
    this.sortTodos('id'); // Default sorting by ID
  }

  // Initialize the filteredTodo with the Todo
  filteredTodo: Task[] | undefined;
}



