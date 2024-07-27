import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { GovDashboardService } from '../../services/gov-dashboard/gov-dashboard.service';
@Component({
  selector: 'app-govdashboard',
  standalone: true,
  imports: [],
  templateUrl: './govdashboard.component.html',
  styleUrl: './govdashboard.component.css'
})
export class GovdashboardComponent implements OnInit{
  totalUsers: number = 10;
  totalViews: number = 5;
  totalIncidents: number = 3;

  constructor(private router: Router, private dashboardService: GovDashboardService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadData();
    this.renderViewsChart();
    this.renderIncidentsChart();
  }

  loadData(): void {
    this.dashboardService.getTotalUsers().subscribe(users => this.totalUsers = users);
    // this.dashboardService.getTotalViews().subscribe(views => this.totalViews = views);
    // this.dashboardService.getTotalIncidents().subscribe(incidents => this.totalIncidents = incidents);
  }

  navigateToUserViews(): void {
    this.router.navigate(['/viewsummary']);
  }

  renderViewsChart(): void {
    const ctx = document.getElementById('viewsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Views',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: '#0b5004',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true
          },
          y: {
            display: true
          }
        }
      }
    });
  }

  renderIncidentsChart(): void {
    const ctx = document.getElementById('incidentsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Theft', 'Assault', 'Vandalism', 'Fraud', 'Robbery'],
        datasets: [{
          label: 'Incidents',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgb(168, 177, 180)',
          borderColor: 'rgb(168, 177, 185)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true
          },
          y: {
            display: true
          }
        }
      }
    });
  }
}

