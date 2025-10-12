// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { LogoutComponent } from './authentification/logout/logout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { RendezVousFormComponent } from './components/rendez-vous-form/rendez-vous-form.component';
import { RenderVousComponent } from './components/render-vous/render-vous.component';
import { AddRendezVousComponent } from './components/add-rendez-vous/add-rendez-vous.component';
import { MaladieComponent } from './components/maladie/maladie.component';
import { ViewMaladieComponentComponent } from './components/view-maladie-component/view-maladie-component.component';
import { AddMaladieComponent } from './components/add-maladie-component/add-maladie-component.component';
import { EditMaladieComponent } from './components/edit-maladie-component/edit-maladie-component.component';
import { RevenuComponent } from './components/revenu/revenu.component';
import { RevenuFormComponent } from './components/revenu-form/revenu-form.component';
import { RevenuDetailComponent } from './components/revenu-detail/revenu-detail.component';
import { DepenseComponent } from './components/depense/depense.component';
import { DepenseFormComponent } from './components/depense-form/depense-form.component';
import { DepenceDetailComponent } from './components/depence-detail/depence-detail.component';
import { CalanderComponent } from './components/calander/calander.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent },
  // Route des patients
  { path: 'patients',pathMatch :"full", component: PatientComponent } ,
  { path: 'patients/add',pathMatch :"full", component: PatientFormComponent },
  { path: 'patients/edit/:id',pathMatch :"full", component: PatientFormComponent },
  { path: 'patients/:id',pathMatch :"full", component: PatientDetailComponent },
  // Route des rendez-vous
  { path: 'rendezvous',pathMatch :"full", component: RenderVousComponent },  
  { path: 'rendezvous/edit/:id',pathMatch :"full", component: RendezVousFormComponent },  
  { path: 'rendezvous/add',pathMatch :"full", component: AddRendezVousComponent },  
  
  // Route des maladies
  { path: 'maladies', component: MaladieComponent  },
  { path: 'maladies/add', component:  AddMaladieComponent },
  { path: 'maladies/edit/:id', component:  EditMaladieComponent },
  { path: 'maladies/view/:id', component:  ViewMaladieComponentComponent  },
  // Route des revenues
     { path: 'revenues', component: RevenuComponent },
      { path: 'revenues/add', component: RevenuFormComponent }, 
      { path: 'revenues/edit/:id', component: RevenuFormComponent },
      { path: 'revenues/view/:id', component: RevenuDetailComponent }, 
    // Route des depenses
    { path: 'depenses', component: DepenseComponent  },
    { path: 'depenses/add', component: DepenseFormComponent },
    { path: 'depenses/edit/:id', component: DepenseFormComponent }, 
    { path: 'depenses/view/:id', component: DepenceDetailComponent }, 
    { path: 'calender', component: CalanderComponent },

  // { path: '**',pathMatch :"full" ,component: LoginComponent },// ** n'importe quel url


  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
