import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserDetailsComponent } from './user-details/user-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = 
[{path:"userdetails",component:UserDetailsComponent},
{path:"events",component:CalendarComponent},
{path:"taskdetails",component:TaskDetailsComponent},
{path:"signup",component:SignupComponent},
{path:"profile",component:ProfileComponent},
{path:"login",component:LoginComponent},
{path:"report",component:ReportingComponent},
{path:"create-task",component:CreateTaskComponent},
{path:"view-task",component:ViewTaskComponent},
{path:"**",component:UserDetailsComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
