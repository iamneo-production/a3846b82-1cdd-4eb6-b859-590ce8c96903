import { Component } from '@angular/core';

export class {
  constructor(
    public id: number,
    public description :string,
    public done:boolean,
    public targetDate:Date,
  
  ){
    
  }

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent {

}
