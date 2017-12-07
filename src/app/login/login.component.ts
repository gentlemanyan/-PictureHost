
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './login.component.scss'
  ],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  public login: boolean = false;
  public loginFormIsShow: boolean = true;

  constructor() {
  }

  public showLogin() {
    this.loginFormIsShow = true;
  }
}