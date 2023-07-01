import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserDetailsComponent } from './user-details/user-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = 
[{path:"**",component:UserDetailsComponent},
{path:"userdetails",component:UserDetailsComponent},
{path:"taskdetails",component:TaskDetailsComponent},
{path:"signup",component:SignupComponent},
{path:'profile',component:ProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
