// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { LogoutComponent } from './authentification/logout/logout.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaladieComponent } from './components/maladie/maladie.component';
import { PatientComponent } from './components/patient/patient.component';
import { RenderVousComponent } from './components/render-vous/render-vous.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { AddRendezVousComponent } from './components/add-rendez-vous/add-rendez-vous.component';
import { EditMaladieComponent } from './components/edit-maladie-component/edit-maladie-component.component';
import { ViewMaladieComponentComponent } from './components/view-maladie-component/view-maladie-component.component';
import { AddMaladieComponent } from './components/add-maladie-component/add-maladie-component.component';
import { RendezVousFormComponent } from './components/rendez-vous-form/rendez-vous-form.component';

import { RevenuComponent } from './components/revenu/revenu.component';
import { RevenuDetailComponent } from './components/revenu-detail/revenu-detail.component';
import { RevenuFormComponent } from './components/revenu-form/revenu-form.component';
import { DepenseComponent } from './components/depense/depense.component';
import { DepenseFormComponent } from './components/depense-form/depense-form.component';
import { DepenceDetailComponent } from './components/depence-detail/depence-detail.component';
import { CalanderComponent } from './components/calander/calander.component';
import { FullCalendarModule } from '@fullcalendar/angular';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    DashboardComponent,
    SidebarComponent,

    MaladieComponent,
    PatientComponent,
    RenderVousComponent,

    PatientFormComponent,
    PatientDetailComponent,
    AddRendezVousComponent,
    EditMaladieComponent,
    ViewMaladieComponentComponent,
    AddMaladieComponent,
    RendezVousFormComponent,

    RevenuComponent,
    RevenuDetailComponent,
    RevenuFormComponent,


    DepenseComponent,
    DepenseFormComponent,
    DepenceDetailComponent,
    CalanderComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    
    MatSnackBarModule
  
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

