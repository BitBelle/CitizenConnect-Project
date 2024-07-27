import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { HomeComponent } from './components/home/home.component';
import { EducateComponent } from './components/educate/educate.component';
import { ViewsComponent } from './components/views/views.component';
import { IncidentsComponent } from './components/incidents/incidents.component';
import { PollsComponent } from './components/polls/polls.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ViewsummaryComponent } from './components/viewsummary/viewsummary.component';
import { adminnavComponent } from './components/adminnav/adminnav.component';
import { UserManagementComponent } from './components/admin-user-management/user-management.component';
import { GovdashboardComponent } from './components/govdashboard/govdashboard.component';
import { GovNavbarComponent } from './components/gov-navbar/gov-navbar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReportedIncidentsComponent } from './components/reported-incidents/reported-incidents.component';
import { GovPollsComponent } from './components/gov-polls/gov-polls.component';
import { authGuard } from './Guards/auth.guard';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';

export const routes: Routes = [
    {path: '', component:WelcomepageComponent},
    {path: 'home', component:HomeComponent},
    {path: 'signup', component:SignupComponent}, //the user signup part
    {path: 'login', component:LoginComponent},//the login
    

    {
      path: 'admin', canActivate:[authGuard],
      children: [
        { path: 'admin', component: AdminDashboardComponent },
        { path: 'user-management', component: UserManagementComponent },
      ]
    },

    // {path: 'government-official-dashboard',
    //   component: GovdashboardComponent,
    //   children: [
    //     {path: '', 
    //       component:GovNavbarComponent,
    //     children:[
    //       {path: 'citizen-views', component:ViewsummaryComponent},
    //     ]},

    //   ]
    // },

    //home page for the citizen
    {path: 'educate', component:EducateComponent},//educate page for the citizen
    {path: 'views', component:ViewsComponent},//views page for te citizen
    {path: 'incidents', component:IncidentsComponent},//report incident page for the citizen
    {path: 'polls', component:PollsComponent},//poll participation page for the citizen
    {path: 'views-summary', component:ViewsummaryComponent},//viewssummary for the gov-official
    {path: 'gov-dash', component:GovdashboardComponent},//the government official dashboard
    {path: 'user-management', component:UserManagementComponent},//the usermanagement for the government official
    {path: 'reported-incidents', component:ReportedIncidentsComponent},
    {path: 'create-poll', component:GovPollsComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    
    
    
    // canActivate:[authGuard]

    

    



];
