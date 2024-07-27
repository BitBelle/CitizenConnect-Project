import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Polls } from '../../models/polls'
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { PollService } from '../../services/polls/polls.service'

@Component({
  selector: 'app-gov-polls',
  standalone: true,
  imports:[CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gov-polls.component.html',
  styleUrls: ['./gov-polls.component.css']
})
export class GovPollsComponent implements OnInit {

  pollForm: FormGroup;
  polls: Polls[] = [];
  successMessage: string | null = null;
  selectedPoll: Polls | null = null;

  constructor(private fb: FormBuilder, private pollService: PollService) {
    this.pollForm = this.fb.group({
      pollQuestion: ['', Validators.required],
      pollOption: this.fb.array([
        this.createOption() // Initialize with one answer option
      ]),
      pollStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPolls();
  }

  createOption(): FormGroup {
    return this.fb.group({
      pollOption: ['', Validators.required] // Form control for each pollOption
    });
  }

  get pollOptions(): FormArray {
    return this.pollForm.get('pollOption') as FormArray;
  }

  addOption(): void {
    this.pollOptions.push(this.createOption());
  }

  removeOption(index: number): void {
    this.pollOptions.removeAt(index);
  }

  addPoll(): void {
    if (this.pollForm.valid) {
      const newPoll: Polls = {
        pollQuestion: this.pollForm.value.pollQuestion,
        pollQuestionId: this.pollForm.value.pollQuestionId,
        pollOption: this.pollForm.value.pollOption.map((option: { option: string; }) => option.option), // Extract option values
        pollStatus: this.pollForm.value.pollStatus,
        pollsId: this.pollForm.value.pollsId,
        userId: this.pollForm.value.userId,
        isDeleted: 0
      };
      
      this.pollService.createPoll(newPoll).subscribe(response => {
        this.polls.push(newPoll);
        this.successMessage = 'Poll created successfully!';
        this.pollForm.reset();
        this.pollForm.setControl('pollOption', this.fb.array([this.createOption()])); // Reset options FormArray
      }, error => {
        console.error('Error creating poll option', error);
      });

    } else {
      // Mark all fields as touched to display validation messages
      this.markFormGroupTouched(this.pollForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  loadPolls(): void {
    this.pollService.getPolls().subscribe(polls => {
      this.polls = polls;
    }, error => {
      console.error('Error loading polls', error);
    });
  }

  editPoll(poll: Polls): void {
    // Implement edit functionality if needed
  }

  deletePoll(poll: Polls): void {
    this.pollService.deletePoll(poll.pollQuestionId).subscribe(() => {
      const index = this.polls.indexOf(poll);
      if (index !== -1) {
        this.polls.splice(index, 1);
        if (this.selectedPoll === poll) {
          this.selectedPoll = null;
        }
      }
    }, error => {
      console.error('Error deleting poll', error);
    });
  }

  showPollResults(poll: Polls): void {
    this.selectedPoll = poll;
    this.renderPollResultsChart(poll); // method to render poll results chart
  }

  renderPollResultsChart(poll: Polls): void {
    // Ensure poll.pollOption is an array of strings
    const labels = Array.isArray(poll.pollOption) ? poll.pollOption : [poll.pollOption];
  
    const data = {
      labels: labels, // This should be an array of strings
      datasets: [{
        data: [30, 20, 15, 35], // Example percentages for each option
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ]
      }]
    };
  
    // Get the canvas element
    const ctx = document.getElementById('pollResultsChart') as HTMLCanvasElement;
  
    // Create the chart
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
  

}
