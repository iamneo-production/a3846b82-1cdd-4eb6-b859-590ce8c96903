import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent {
  constructor(
 
    private router :Router
    
    ){}

    createTask(){
    this.router.navigate(['createTask',-1])  
  }
}
