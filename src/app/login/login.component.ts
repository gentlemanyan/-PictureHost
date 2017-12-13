import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Routes, Router, RouterModule, ActivatedRoute, PreloadAllModules } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { IUser, UserService } from './login.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './login.component.scss'
  ],
  providers: [UserService],
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  public loginParam: IUser = {
    username: '',
    password: ''
  };
  public loginForm: FormGroup;
  public loginFormIsShow: boolean;

  constructor(public userservice: UserService, private fb: FormBuilder,
              public router: Router, public route: ActivatedRoute,
              private _message: NzMessageService ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required], [this.loginValidControl]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]]
    });
  }

  ngOnInit() {
    this.loginFormIsShow = true;
  }

  /**
   * 用户名和密码校验控制器,只接受字母开头，后可接.=+-@等字符
   * @param {FormControl} control - 表单控制对象
   * @memberof UserComponent
   */
  public loginValidControl = (control: FormControl): any => {
    return Observable.create((observer) => {
      setTimeout(() => {
        if (!/^[A-z](\w|\.|\=|\+|\-|\@)*$/g.test(control.value)) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 100);
    });
  }

  /**
   * 两次输入密码一致性校验
   * @param {FormControl} control - 表单控制对象
   * @memberof UserComponent
   * @return {Object} 验证成功或者错误
   */
  public passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.loginForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
  }

  /**
   * 返回表单空间
   * @param name 控件名称
   */
  public getFormControl(name) {
    return this.loginForm.controls[ name ];
  }

  public toggleFormShow(loginFormIsShow: boolean) {
      this.loginFormIsShow = loginFormIsShow;
      this.clearForm();
  }

  /**
   * 清楚表单信息
   */
  public clearForm() {
    this.loginForm.reset();
    for (const key in this.loginForm.controls) {
      this.loginForm.controls[key].markAsPristine();
    }
  }

  /**
   * 用户登录
   */
  public login($loginForm) {
    if ( this.loginForm.hasError('username') ) {
      alert('用户名错误');
    }
    if (this.loginForm.hasError('password' )) {
      alert('密码错误');
    }

    this.loginParam.username = this.getFormControl('username').value;
    this.loginParam.password = this.getFormControl('password').value;
    const promise = this.userservice.login(this.loginParam);
    promise.then((data) => {
      // 手动导航到首页
      this._message.success(data.retmsg);
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }, (data) => {
      this._message.error(data.retmsg, {nzDuration: 2000});
    });
  }
}
