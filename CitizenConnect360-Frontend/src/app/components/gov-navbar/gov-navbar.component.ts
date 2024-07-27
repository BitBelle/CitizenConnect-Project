import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gov-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gov-navbar.component.html',
  styleUrl: './gov-navbar.component.css'
})
export class GovNavbarComponent implements OnInit{

  constructor(private route: Router){}

  ngOnInit(): void {}

}
