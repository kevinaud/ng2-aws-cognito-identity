import { Component, OnInit } from '@angular/core';
import { UserService } from 'ng2-aws-cognito';

import { QuestionService } from '../forms/question.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    this.questions = this.questionService.getLoginQuestions();
  }

  onSubmit(event) {

    let authDetails = {
      username: event.username,
      password: event.password
    }

    console.log(authDetails);

    /*this.waiting = true;
    this.userService.login(event.username, event.password).then(
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
