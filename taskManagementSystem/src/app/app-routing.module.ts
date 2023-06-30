import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {path:'tasks',component:CreateTaskComponent},
  { path: 'assign', component: AssignTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
