import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserDetailsComponent } from './user-details/user-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';


const routes: Routes = 
[{path:"**",component:UserDetailsComponent},
{path:"userdetails",component:UserDetailsComponent},
{path:"taskdetails",component:TaskDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
