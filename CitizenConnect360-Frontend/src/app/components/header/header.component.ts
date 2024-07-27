import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Payload, User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SignupComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false
  // currentUser: User | null = null
  roleName: string | null = null

  user! : Payload

  // defining navigation links
  navLinks: { path: string, label: string }[] = [];


  constructor(private router: Router, public auth:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    const currentUser = localStorage.getItem('currentUser');
    this.roleName = currentUser ? JSON.parse(currentUser).roleName : null;
  }

  // logout(): void {
  //   this.auth.logout();
  //   this.router.navigate(['/login']);
  // }
  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.roleName = null;
  }
}
