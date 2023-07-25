import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { Task } from '../task-details/task-details.component';
import { TaskserviceService } from '../service/data/taskservice.service';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  completedTaskCount: number;
  todoTaskCount: number;
  inProgressTaskCount: number;
  doneTaskCount: number;
  tasks: Task[] = [];

  constructor(private taskService: TaskserviceService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.getCompletedTaskCount();
    this.getTodoTaskCount();
    this.getInProgressTaskCount();
    this.getDoneTaskCount();
  }

  loadTasks() {
    this.taskService.retrieveTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  getCompletedTaskCount(): void {
    this.taskService.getCompletedTaskCount().subscribe(
      (count: number) => {
        this.completedTaskCount = count;
      },
      (error) => {
        console.error('Error fetching completed task count:', error);
      }
    );
  }

  getTodoTaskCount(): void {
    this.taskService.getTodoTaskCount().subscribe(
      (count: number) => {
        this.todoTaskCount = count;
      },
      (error) => {
        console.error('Error fetching Todo task count:', error);
      }
    );
  }

  getInProgressTaskCount(): void {
    this.taskService.getInProgressTaskCount().subscribe(
      (count: number) => {
        this.inProgressTaskCount = count;
      },
      (error) => {
        console.error('Error fetching Inprogress task count:', error);
      }
    );
  }

  getDoneTaskCount(): void {
    this.taskService.getDoneTaskCount().subscribe(
      (count: number) => {
        this.doneTaskCount = count;
      },
      (error) => {
        console.error('Error fetching Done task count:', error);
      }
    );
  }
}
