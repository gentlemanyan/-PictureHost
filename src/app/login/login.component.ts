
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
  public isShow: boolean = false;

  constructor() {

  }
}