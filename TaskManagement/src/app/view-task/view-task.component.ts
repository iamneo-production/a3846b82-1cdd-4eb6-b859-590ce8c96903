import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/todo/todo-data.service';
import { CoreService } from '../core/core.service';

export class Todo {
  constructor(
    public id: number,
    public taskname: string,
    public taskdescription: string,
    public status: string,
    public targetdate: Date,
    public teammember: string
  ) {}
}

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  Todo: Todo[] = [];
  message: string | undefined;

  showTaskList = true;
  showAssignTaskList = false;
  sortedBy: string = 'id';

  constructor(
    public todoService: TodoDataService,
    public router: Router,
    public _coreService: CoreService
  ) {}

  ngOnInit() {
    this.refreshTodos();
  }

  toggleTables(showTaskList: boolean) {
    this.showTaskList = showTaskList;
    this.showAssignTaskList = !showTaskList;
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos().subscribe(
      (response) => {
        console.log(response);
        this.Todo = response;
        this.filterTodos(); // Apply initial filtering
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteTodo(id: any) {
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo(id).subscribe(
      (response) => {
        this.message = `Delete of Todo ${id} Successful!`;
        this._coreService.openSnackBar('Task Deleted!!', 'done');
        this.refreshTodos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateTodo(id: any) {
    console.log(`update todo ${id}`);
    this.router.navigate(['view-task', id]);
  }

  selectedStatus: string = 'All';
  searchTerm: string = '';

  filteredTodo: Todo[] = [];

  filterTodos() {
    if (this.selectedStatus === 'All' && !this.searchTerm) {
      this.filteredTodo = this.Todo; // Show all tasks when no status and search term are applied
    } else {
      this.filteredTodo = this.Todo.filter((todo) => {
        const statusFilter =
          this.selectedStatus === 'All' || todo.status === this.selectedStatus;
        const searchFilter =
          !this.searchTerm ||
          todo.taskname.toLowerCase().includes(this.searchTerm.toLowerCase());
        return statusFilter && searchFilter;
      });
    }
  }

  // Method to apply sorting
  sortTodos(sortBy: string) {
    this.sortedBy = sortBy;
    this.Todo.sort((a: Todo, b: Todo) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });
    this.filterTodos(); // Apply filtering after sorting
  }

  // Method to reset filtering and sorting
  resetFiltersAndSorting() {
    this.selectedStatus = 'All';
    this.filterTodos();
    this.sortTodos('id'); // Default sorting by ID
  }
}
