import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { WelcomepageComponent } from "./components/welcomepage/welcomepage.component";
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { EducateComponent } from "./components/educate/educate.component";
import { GovdashboardComponent } from "./components/govdashboard/govdashboard.component";
import { ReportedIncidentsComponent } from "./components/reported-incidents/reported-incidents.component";
import { GovPollsComponent } from "./components/gov-polls/gov-polls.component";
import {adminnavComponent } from "./components/adminnav/adminnav.component";
import { UserManagementComponent } from "./components/admin-user-management/user-management.component";
import { GovNavbarComponent } from "./components/gov-navbar/gov-navbar.component";
import { ViewsummaryComponent } from './components/viewsummary/viewsummary.component';
// import { ViewsComponent } from "./components/views/views.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, SignupComponent, LoginComponent, EducateComponent, ViewsummaryComponent, GovdashboardComponent,ReportedIncidentsComponent, GovPollsComponent, adminnavComponent, UserManagementComponent, GovNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CitizenConnect360';
}
