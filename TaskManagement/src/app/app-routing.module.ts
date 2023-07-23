import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UpdateTaskComponent } from './user/update-task/update-task.component';
import { ViewComponent } from './user/view/view.component';
import { UpdateStatusComponent } from './user/update-status/update-status.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { VerificationComponent } from './verification/verification.component';
import { HomeComponent } from './home/home.component';
import { CreateTaskComponent } from './user/create-task/create-task.component';
import { CreateTaskTLComponent } from './teamLeader/create-task-tl/create-task-tl.component';
import { ViewTaskTLComponent } from './teamLeader/view-task-tl/view-task-tl.component';
import { UpdateTaskTLComponent } from './teamLeader/update-task-tl/update-task-tl.component';
import { UpdateStatusTLComponent } from './teamLeader/update-status-tl/update-status-tl.component';
import { AssignTaskComponent } from './teamLeader/assign-task/assign-task.component';
import { authGuard } from './auth_guard/auth.guard';

const routes: Routes =
  [  

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "home", component: HomeComponent },
    { path: "signup", component: SignupComponent },
    { path: "profile", component: ProfileComponent },
    { path: "login", component: LoginComponent },
    { path: "verification", component: VerificationComponent },
    { path: "forbidden", component:ForbiddenComponent},

    //ADMIN
    { path: "userdetails", component: UserDetailsComponent },
    { path: "taskdetails", component: TaskDetailsComponent },
    { path: "users", component: CreateUserComponent },

    //USER AND TEAMLEADER
    { path: "events", component: CalendarComponent },
    { path: "report", component: ReportingComponent},
    { path: "dashboard", component:ViewTaskComponent },

   // { path: "events", component: CalendarComponent,canActivate:[authGuard],data:{role:['TEAMLEADER','USER']} },
   // { path: "report", component: ReportingComponent,canActivate:[authGuard],data:{role:['TEAMLEADER','USER']}},
   // { path: "dashboard", component:ViewTaskComponent ,canActivate:[authGuard],data:{role:['TEAMLEADER','USER']} },


   // TEAMLEADER
    {path: 'tasks',component:CreateTaskTLComponent},
    {path:'tasks/:id/view', component:ViewTaskTLComponent},
    {path:'tasks/:id/update', component:UpdateTaskTLComponent},
    {path:'tasks/:id/status', component:UpdateStatusTLComponent},
    {path:'tasks/:id/view', component:ViewTaskTLComponent},
    {path:'tasks/:id/assign', component:AssignTaskComponent},

  //  {path: 'tasks',component:CreateTaskTLComponent,canActivate:[authGuard],data:{role:['TEAMLEADER']}},
  //  {path:'tasks/:id/view', component:ViewTaskTLComponent,canActivate:[authGuard],data:{role:['TEAMLEADER']}},
  //  {path:'tasks/:id/update', component:UpdateTaskTLComponent,canActivate:[authGuard],data:{role:['TEAMLEADER']}},
  //  {path:'tasks/:id/status', component:UpdateStatusTLComponent,canActivate:[authGuard],data:{role:['TEAMLEADER']}},
  //  {path:'tasks/:id/view', component:ViewTaskTLComponent,canActivate:[authGuard],data:{role:['TEAMLEADER']}},
  //  {path:'tasks/:id/assign', component:AssignTaskComponent,canActivate:[authGuard],data:{role:['TEAMLEADER']}},

    //USER

   // {path: 'task' ,component:CreateTaskComponent,canActivate:[authGuard],data:{role:['USER']}},
    {path: 'task' ,component:CreateTaskComponent},
    //{path:'task/:id/', component:ViewTaskComponent,canActivate:[authGuard],data:{role:['USER']}},
    {path:'task/:id/update', component:UpdateTaskComponent},
    {path:'task/:id/status', component:UpdateStatusComponent},
    {path:'task/:id/view', component:ViewComponent},
    //{path:'task/:id/update', component:UpdateTaskComponent,canActivate:[authGuard],data:{role:['USER']}},
   // {path:'task/:id/status', component:UpdateStatusComponent,canActivate:[authGuard],data:{role:['USER']}},
   // {path:'task/:id/view', component:ViewComponent,canActivate:[authGuard],data:{role:['USER']}},
    //{ path: "view-task", component: ViewTaskComponent,canActivate:[authGuard],data:{role:['USER']} },*/
  ];

  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }