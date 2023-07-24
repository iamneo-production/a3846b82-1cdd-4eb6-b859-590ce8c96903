import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { Todo } from '../view-task/view-task.component';
import { User } from '../user-details/user-details.component';
import { UserserviceService } from '../service/data/userservice.service';
import { TodoDataService } from '../service/todo/todo-data.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit, AfterViewInit {
  todos: Todo[] = [];
  users: User[] = [];

  @ViewChild('taskCompletionRateChart') taskCompletionRateChartRef: ElementRef;
  @ViewChild('taskCompletionTimeChart') taskCompletionTimeChartRef: ElementRef;
  @ViewChild('taskSuccessRateChart') taskSuccessRateChartRef: ElementRef;
  @ViewChild('errorRateChart') errorRateChartRef: ElementRef;

  constructor(
    private userService: UserserviceService,
    private todoService: TodoDataService
  ) {}

  ngOnInit(): void {
    this.loadTodos();
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.createTaskCompletionRateChart();
    this.createTaskSuccessRateChart();
    this.createErrorRateChart();
  }

  loadTodos() {
    this.todoService.retrieveAllTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  loadUsers() {
    this.userService.retrieveUsers().subscribe(users => {
      this.users = users;
    });
  }

  // Task Completion Rate Chart
  createTaskCompletionRateChart(): void {
    const completionRates = this.users.map(user => this.getCompletionRate(user));
    const labels = this.users.map(user => user.name);

    const ctx = this.taskCompletionRateChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Completion Rate',
          data: completionRates,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  // Task Completion Time Chart
  // Task Success Rate Chart
  createTaskSuccessRateChart(): void {
    const successRates = this.users.map(user => this.getSuccessRate(user));
    const labels = this.users.map(user => user.name);

    const ctx = this.taskSuccessRateChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Success Rate',
          data: successRates,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  // Error Rate Chart
  createErrorRateChart(): void {
    const errorCounts = this.users.map(user => this.getErrorCount(user));
    const labels = this.users.map(user => user.name);

    const ctx = this.errorRateChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Error Count',
          data: errorCounts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Rest of the functions to calculate metrics

  getCompletedTasks(user: User): number {
    return this.todos.filter(todo => todo.status === 'completed' && todo.id === user.id).length;
  }

  getTotalTasks(user: User): number {
    return this.todos.filter(todo => todo.id === user.id).length;
  }

  getCompletionRate(user: User): number {
    const totalTasks = this.getTotalTasks(user);
    if (totalTasks === 0) {
      return 0;
    }
    return (this.getCompletedTasks(user) / totalTasks) * 100;
  }

  // Task Success Rate
  getAttemptedTasks(user: User): number {
    return this.todos.filter(todo => todo.id === user.id).length;
  }

  getSuccessRate(user: User): number {
    const attemptedTasks = this.getAttemptedTasks(user);
    if (attemptedTasks === 0) {
      return 0;
    }
    return (this.getCompletedTasks(user) / attemptedTasks) * 100;
  }

  // Error Rate
  getErrorCount(user: User): number {
    return this.todos.filter(todo => todo.status === 'error' && todo.id === user.id).length;
  }
}