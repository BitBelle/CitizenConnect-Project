import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Polls } from '../../models/polls'
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { PollService } from '../../services/polls/polls.service'
import jwt_decode, {JwtPayload} from 'jwt-decode';
import { Payload } from '../../models/user';


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


  constructor(private fb: FormBuilder, private pollService: PollService) {
    this.pollForm = this.fb.group({
      pollQuestion: ['', Validators.required],
      pollOptions: this.fb.array([this.fb.control('', Validators.required)]),
      pollStatus: ['active', Validators.required]
    });
  }


  ngOnInit(): void {
    this.loadPolls();
  }



  get pollOptions() {
    return this.pollForm.get('pollOptions') as FormArray;
  }



  addOption(): void {
    this.pollOptions.push(this.fb.control('', Validators.required));
  }



  removeOption(index: number): void {
    this.pollOptions.removeAt(index);
  }



  onSubmit(): void {
    if (this.pollForm.valid) {
      const formValue = this.pollForm.value;
      const pollOptions = formValue.pollOptions.map((option: string) => option);

      const formattedPoll = {
        pollQuestion: formValue.pollQuestion,
        pollOptions,
        pollStatus: formValue.pollStatus
      };

      this.pollService.addPoll(formattedPoll).subscribe(
        response => {
          console.log(response);
          this.loadPolls(); // Reload polls after adding a new one
          this.pollForm.reset(); // Reset form after submission
          // Optionally, add a success message or notification here
        },
        error => {
          console.error(error);
          // Optionally, add error handling or notification here
        }
      );
    }
  }

  



  loadPolls(): void {
    this.pollService.getPolls().subscribe(
      data => {
        this.polls = data;
      },
      error => {
        console.error(error);
      }
    );
  }



  editPoll(poll: any): void {
    // eedit functionality
  }



  deletePoll(pollQuestionId: string): void {
    this.pollService.deletePoll(pollQuestionId).subscribe(
      response => {
        console.log(response);
        this.loadPolls();
      },
      error => {
        console.error(error);
      }
    );
  }

}
