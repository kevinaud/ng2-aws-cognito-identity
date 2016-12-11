import { Component, OnInit } from '@angular/core';
import { UserService } from 'ng2-aws-cognito';

import { QuestionService } from '../forms/question.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  questions;
  waiting = false;
  responseReceived = false;
  response = {
    success: false,
    message: ''
  };

  constructor(
    private questionService: QuestionService,
    private userService: UserService) { }

  ngOnInit() {
    this.questions = this.questionService.getSignUpQuestions();
  }

  onSubmit(event) {

    let user = {
      email: event.email,
      username: event.username,
      password: event.password
    };

    console.log(user);

    /*this.waiting = true;
    this.userService.signUp(user).then(
      (success) => {
      
        console.log(success);
        this.waiting = false;

        /*this.response = { 
          success: true,
          message: success
        };

        this.responseReceived = true;

      },
      (error) => {
        this.waiting = false;
        console.log(error);
      });*/

  }

}
