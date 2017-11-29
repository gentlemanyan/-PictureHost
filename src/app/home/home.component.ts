import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

@Component({
  selector: 'home',
  providers: [Title],
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public localState = { value: '' };
  public shoesArr = [{
    title: 'assets/img/ganbang.jpg',
    titleUrl: 'http://www.baidu.com',
    rows: [{
      shoes: [
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'}
      ]}],
    },
    {
    title: 'assets/img/ganbang.jpg',
    titleUrl: 'http://www.baidu.com',
    rows: [{
      shoes: [
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'},
        {shoeImg: 'assets/img/xiezi.jpg'}
      ],
    }]
  }];

  constructor(
    public appState: AppState,
    public title: Title
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
