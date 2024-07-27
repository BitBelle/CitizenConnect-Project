import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { incidentRequest, incidentResponse, Incidents } from '../../models/incidents';
import { IncidentService } from '../../services/incidents/incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css'
})
export class IncidentsComponent implements OnInit {
  incidents: Incidents[] = [];

  incidentDesc: string = '';
  // incidentImg!:string
  userId!: string

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadIncidents();
    this.getUserId()
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // this.incidentImg = reader.result as string; // Base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  getUserId(): void {
    this.userId = localStorage.getItem('userId') || ''
    console.log('Retrieved userId:', this.userId)
  }


  loadIncidents(): void {
    this.incidentService.getIncidents().subscribe(
      data => this.incidents = data,
      error => console.error(error)
    );
  }


  addIncident(): void {
    console.log('UserId:', this.userId);
    console.log('Incident Description:', this.incidentDesc);


    if (this.incidentDesc.trim() === '' || this.userId === '') {
      console.warn('Invalid data: either incidentDesc or userId is missing.');
      return;
    }

    const newIncident: incidentRequest = {
      userId: this.userId,
      incidentDesc: this.incidentDesc.trim(),
      // incidentImg: this.incidentImg,
      createdAt: '',
      incidentId: '',
      userName: ''
    };

    console.log('Posting new Incident:', newIncident);  // Log the new view data

    this.incidentService.addIncident(newIncident).subscribe(
      response => {
        console.log('Incident added successfully:', response);
        this.loadIncidents()

        // to update the views array when userposts
        // this.incidents.unshift(response)
        this.incidentDesc = '';
        // this.incidentImg = ''
      
      },
      error => console.error('Error adding view:', error)
    );
  }

}
