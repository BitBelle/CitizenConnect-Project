import { Component } from '@angular/core';
import { Incidents } from '../../models/incidents';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { IncidentService } from '../../services/incidents/incident.service';

@Component({
  selector: 'app-reported-incidents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reported-incidents.component.html',
  styleUrl: './reported-incidents.component.css'
})
export class ReportedIncidentsComponent {
  
  incidents: Incidents[] = [];
  filteredIncidents: Incidents[] = this.incidents

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.loadIncidents();
    this.createCategoryChart();
    this.createTrendChart();
  }

  loadIncidents(): void {
    this.incidentService.getIncidents().subscribe(
      (data: Incidents[]) => {
        this.incidents = data;
        this.filteredIncidents = data;
      },
      (error) => {
        console.error('Error fetching incidents:', error);
      }
    );
  }

  filterIncidents(event: any): void {
    const selectedType = event.target.value;
    if (selectedType === 'all') {
      this.filteredIncidents = this.incidents; // Reset to all incidents
    } else {
      this.filteredIncidents = this.incidents.filter(incident => incident.incidentType === selectedType); // Filter based on selected incident type
    }
  }


  markAsPriority(incident: any): void {
    // marked-incident as priority
    console.log('Marked as priority:', incident);
  }

  createCategoryChart(): void {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Theft', 'Vandalism', 'Accidents'],
        datasets: [{
          data: [12, 19, 7],
          backgroundColor: ['#9FE2BF', '#d3d8c8', '#FF7F7F']
        }]
      }
    });
  }

  createTrendChart(): void {
    const ctx = document.getElementById('trendChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Incidents',
          data: [3, 7, 4, 5, 8, 6],
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true
        }]
      }
    });
  }
  
}
