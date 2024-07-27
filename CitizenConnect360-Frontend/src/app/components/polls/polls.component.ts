import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-polls',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './polls.component.html',
  styleUrl: './polls.component.css'
})
export class PollsComponent implements OnInit{
  question = `Considering the recent implementation of the new financial bill,
             which of the following aspects do you believe will have the most significant 
             impact on the local economy, and what measures should be taken to mitigate any negative effects?`
  options = [
    { text: 'Tax Increases on Small Businesses', votes: 0, percentage: 0 },
    { text: 'Reduction in Public Service Funding', votes: 0, percentage: 0 },
    { text: 'Increased Import Tariffs', votes: 0, percentage: 0 },
    { text: 'Changes in Social Welfare Programs', votes: 0, percentage: 0 }
  ];

  thankYouMessageVisible = false;
  hasVoted = false;

  ngOnInit(): void {
    this.hasVoted = !!localStorage.getItem('hasVoted');
  }

  vote(index: number): void {
    if (!this.hasVoted) {
      this.options[index].votes++;
      this.updatePercentages();
      this.thankYouMessageVisible = true;
      localStorage.setItem('hasVoted', 'true');
      this.hasVoted = true;
    } else {
      alert('You have already voted!');
    }
  }

  updatePercentages(): void {
    const totalVotes = this.options.reduce((total, option) => total + option.votes, 0);
    this.options.forEach(option => {
      option.percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
    });
  }
}
