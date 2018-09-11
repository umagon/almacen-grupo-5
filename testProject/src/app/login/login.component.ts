import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    userName: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  login() {
    this.userService.logIn(this.user.userName, this.user.password);
  }

  ngOnInit() {}
}
