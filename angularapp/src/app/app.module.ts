import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {enableProdMode} from '@angular/core';
import { userService } from './user.service';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


enableProdMode();


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule
   
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [userService],
  bootstrap: [AppComponent]
})
export class AppModule { }
