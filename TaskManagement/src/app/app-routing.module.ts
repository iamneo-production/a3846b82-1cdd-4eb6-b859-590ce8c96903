import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserDetailsComponent } from './user-details/user-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = 
[{path:"userdetails",component:UserDetailsComponent},
{path:"events",component:CalendarComponent},
{path:"taskdetails",component:TaskDetailsComponent},
{path:"signup",component:SignupComponent},
{path:"profile",component:ProfileComponent},
{path:"report",component:ReportingComponent},
{path:"**",component:UserDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
