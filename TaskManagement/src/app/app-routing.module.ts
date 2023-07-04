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
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { VerificationComponent } from './verification/verification.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = 
[{path:"userdetails",component:UserDetailsComponent},
{path:"events",component:CalendarComponent},
{path:"taskdetails",component:TaskDetailsComponent},
{path:"signup",component:SignupComponent},
{path:"profile",component:ProfileComponent},
{path:"login",component:LoginComponent},
{path:"report",component:ReportingComponent},
{path:"tasks",component:CreateTaskComponent},
{path:"view-task",component:ViewTaskComponent},
{path:"assign",component:AssignTaskComponent},
{path:"verification",component:VerificationComponent},
{path:"home",component:HomeComponent},
{path:"**",component:HomeComponent},


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
