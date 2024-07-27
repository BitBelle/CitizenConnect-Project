import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css'
})
export class WelcomepageComponent {
  constructor(private router: Router) {}

  onDragStart(event: MouseEvent) {
    event.preventDefault();
    console.log('Drag started');
    this.navigateToHome();
  }
    
  navigateToHome() {
    this.router.navigate(['/home']);
  }



}
