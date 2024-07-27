import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ViewService } from '../../services/views/view.service';
import { Views } from '../../models/view';

@Component({
  selector: 'app-viewsummary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './viewsummary.component.html',
  styleUrls: ['./viewsummary.component.css']
})
export class ViewsummaryComponent implements OnInit {
  @ViewChild('summaryElement') summaryElement!: ElementRef;
  userMessage: string = '';
  views: Views[] = [];  // Replace with your actual view model

  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    this.loadViews();
  }

  loadViews(): void {
    this.viewService.getViews().subscribe(
      (data: any[]) => {
        this.views = data;
      },
      error => {
        console.error('Error fetching views:', error);
      }
    );
  }

  summarizeViews(): void {
    if (this.userMessage.trim() !== '') {
      this.addMessage(`User: ${this.userMessage}`, 'user-message');
      this.userMessage = '';

      // Send user message to chatbot backend
      this.viewService.getChatbotSummary(this.userMessage).subscribe(
        response => {
          const summary = `Chatbot: ${response.answerGiven}`;
          this.addMessage(summary, 'chatbot-message');
        },
        error => {
          console.error('Error getting chatbot summary:', error);
        }
      );
    }
  }

  addMessage(message: string, messageType: string): void {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.className = `chat-message ${messageType}`;
    this.summaryElement.nativeElement.appendChild(messageElement);
    this.summaryElement.nativeElement.scrollTop = this.summaryElement.nativeElement.scrollHeight;
  }
}
