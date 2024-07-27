import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-adminnav',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adminnav.component.html',
  styleUrl: './adminnav.component.css'
})
export class adminnavComponent implements OnInit{
  constructor(private router: Router, private auth:AuthService){}

  isLoggedIn: boolean = false

  ngOnInit(): void { }


}
