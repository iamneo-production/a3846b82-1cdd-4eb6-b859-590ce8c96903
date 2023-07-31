import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerificationComponent } from './verification/verification.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserserviceService } from './service/data/userservice.service';
import {UserProfileService} from './service/profile/user-profile.service';
import { ViewTaskComponent } from './view-task/view-task.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewTaskTLComponent } from './teamLeader/view-task-tl/view-task-tl.component';
import { UpdateStatusTLComponent } from './teamLeader/update-status-tl/update-status-tl.component';
import { UpdateStatusComponent } from './user/update-status/update-status.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AssignTaskComponent } from './teamLeader/assign-task/assign-task.component';
import { CreateTaskTLComponent } from './teamLeader/create-task-tl/create-task-tl.component';
import { UpdateTaskTLComponent } from './teamLeader/update-task-tl/update-task-tl.component';
import { CreateTaskComponent } from './user/create-task/create-task.component';
import { UpdateTaskComponent } from './user/update-task/update-task.component';
import { ViewComponent } from './user/view/view.component';
import { AuthInterceptor } from './auth_guard/auth.interceptor';
import { CreateUserComponent } from './create-user/create-user.component';
import { DatePipe } from '@angular/common';


 


@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    VerificationComponent,
    UserDetailsComponent,
    TaskDetailsComponent,
    SignupComponent,
    FooterComponent,
    LoginComponent,
    AssignTaskComponent,
    CreateTaskComponent,
    CreateUserComponent,
    ReportingComponent,
    CalendarComponent,
    ProfileComponent,
    SidenavComponent,
    ViewTaskComponent,
    HomeComponent,
    ViewTaskTLComponent,
    UpdateStatusTLComponent,
    UpdateStatusComponent,
    ForbiddenComponent,
    AssignTaskComponent,
    CreateTaskTLComponent,
    UpdateTaskTLComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ViewComponent,
    
   
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModalModule,
    CommonModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory}),
    FontAwesomeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    NgSelectModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [DatePipe,UserserviceService,
    UserProfileService,
    //Http interceptors
    {
      provide:HTTP_INTERCEPTORS,
      useClass :AuthInterceptor,
      multi:true
    }
  
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

}
