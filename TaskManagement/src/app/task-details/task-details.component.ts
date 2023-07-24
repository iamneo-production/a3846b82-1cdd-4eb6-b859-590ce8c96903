import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from '/home/coder/project/workspace/TaskManagement/src/app/service/data/taskservice.service'

export interface Task {
  id: number;
  username: string;
  name: string;
  description: string;
  dueDate: Date;
  status: boolean;
}

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  message: any;
  tasks: Task[] | undefined;

  constructor(public taskservice: TaskserviceService) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks() {
    this.taskservice.retrieveTasks().subscribe((response: Task[]) => {
      this.tasks = response;
    });
  }

  deleteTask(id: any) {
    this.taskservice.deleteTask(id).subscribe((response) => {
      this.message = `Deletion of Task ${id} successful`;
      this.refreshTasks();
    });
  }
}