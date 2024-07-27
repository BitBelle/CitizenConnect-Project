import { Component, OnInit } from '@angular/core';
import { AddView, Views } from '../../models/view';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewService } from '../../services/views/view.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
  views: Views[] = [];

  viewContent!:string;
  userId!:string

  constructor(
    private fb: FormBuilder, 
    private viewService: ViewService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadViews()
    this.getUserId()
  }

  getUserId():void{
     this.userId = localStorage.getItem('userId') || ''
     console.log('Retrieved userId:', this.userId)
  }


  loadViews(): void {
    this.viewService.getViews().subscribe(
      data => this.views = data,
      error => console.error(error)
    );
  }

  addView(): void {
    console.log('UserId:', this.userId);
    console.log('View Content:', this.viewContent); 
    

    if (this.viewContent.trim() === '' || this.userId === '') {
      console.warn('Invalid data: either viewContent or userId is missing.');
      return;
    }
  
    const newView: AddView = {
      userId: this.userId,
      viewContent: this.viewContent.trim()
    };
  
    console.log('Posting new view:', newView);  // Log the new view data
  
    this.viewService.addView(newView).subscribe(
      response => {
        console.log('View added successfully:', response);
        // this.loadViews()

        // to update the views array when userposts
        this.views.unshift(response)
        this.viewContent = '';
      },
      error => console.error('Error adding view:', error)
    );
  }


  deleteView(viewId: string): void {
    this.viewService.deleteView(viewId).subscribe(
      () => {
        this.views = this.views.filter(view => view.userId !== viewId);
        console.log('View deleted successfully');
      },
      error => console.error('Error deleting view:', error)
    );
  }
  
  
}
