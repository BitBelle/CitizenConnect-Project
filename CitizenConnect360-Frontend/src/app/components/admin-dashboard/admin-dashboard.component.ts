import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto'; // Import Chart.js or your preferred chart library

@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Initialize charts on component initialization
    this.initCharts();
  }

  private initCharts(): void {
    const userManagementData = [5, 15, 30];
    const permissionsData = [20, 30, 10];
    const platformIntegrityData = [50, 60, 55, 70, 65, 75];

    // Initialize Chart.js for User Management
    new Chart('userManagementChart', {
      type: 'bar',
      data: {
        labels: ['Gov-Officials', 'Citizens'],
        datasets: [{
          label: 'User Management',
          data: userManagementData,
          backgroundColor: ['#36a2eb', '#ffcd56', '#ff6384'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
      }
    });

    // Initialize Chart.js for Permissions
    new Chart('permissionsChart', {
      type: 'pie',
      data: {
        labels: ['Read', 'Write', 'Admin'],
        datasets: [{
          label: 'Permissions',
          data: permissionsData,
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
      }
    });

    // Initialize Chart.js for Platform Integrity
    new Chart('platformIntegrityChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Platform Integrity',
          data: platformIntegrityData,
          fill: false,
          borderColor: '#4bc0c0',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        
      }
    });
  }

}
