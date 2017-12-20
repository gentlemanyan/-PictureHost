import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Routes, Router, RouterModule, ActivatedRoute, PreloadAllModules } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { IUser, UserService } from './login.service';
import * as md5 from 'md5';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './login.component.scss'
  ],
  providers: [UserService],
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public loginFormIsShow: boolean = true;   // 是否显示登录框
  public loginError: boolean = false;       // 是否登录成功
  public isloadding: boolean = false; 

  constructor(public userService: UserService, private fb: FormBuilder,
              public router: Router, public route: ActivatedRoute,
              private _message: NzMessageService ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [''],
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required], [this.loginValidControl]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      phone: ['', [Validators.required, this.phoneValidator]],
      passwordConfirm: ['', [this.passwordConfirmationValidator]],
      email: ['', [Validators.required], [this.emailValidControl]]
    });
  }

  ngOnInit() {
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
          observer.next({ error: true, username: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 100);
    });
  }

  /**
   * 邮箱校验控制器
   * @param {FormControl} control - 表单控制对象
   * @memberof UserComponent
   */
  public emailValidControl(control: FormControl): any {
    return Observable.create((observer) => {
      setTimeout( () => {
        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(control.value)) {
          observer.next({ error: true, email: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 100)
    })
  }

  public phoneValidator(control: FormControl): { [s: string]: boolean } {
    if ( !control.value ) {
      return { required: true };
    }
    else if ( !/^1[3|4|5|8|9][0-9]\d{8}$/.test(control.value) ) {
      return {phone: true, error: true};
    }
  }
  
  public validateConfirmPassword = () => {
    setTimeout(_ => {
      this.registerForm.controls[ 'passwordConfirm' ].updateValueAndValidity();
    })
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
    } else if (control.value !== this.registerForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  }

  /**
   * 返回表单控件
   * @param form 表单名称
   * @param name 控件名称
   */
  public getFormControl(form, name) {
    return this[form].controls[ name ];
  }

  /**
   * @param form表单名称
   * @param {Boolean} 是否显示登录表单
   */
  public toggleFormShow(form, loginFormIsShow: boolean) {
      this.clearForm(form);
      this.loginFormIsShow = loginFormIsShow;
  }

  /**
   * 清除表单信息
   * @param form 指定表单名称
   */
  public clearForm( form ) {
    this[form].reset();
    for (const key in this[form].controls) {
      this[form].controls[key].markAsPristine();
    }
  }

  /**
   * 用户登录
   */
  public login() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
    }
    if ( this.loginForm.invalid ) {
      return;
    }

    this.isloadding = true;

    this.userService.loginParam.username = this.getFormControl('loginForm', 'username').value;
    this.userService.loginParam.password = md5(this.getFormControl('loginForm', 'password').value);
    const promise = this.userService.login(this.userService.loginParam);
    promise.then((data) => {
      // 手动导航到首页
      this._message.success(data.retmsg);
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
      this.isloadding = false;
    }, (error) => {
      this.loginError = true;
      setTimeout(() => {
        this.loginError = false;
      }, 2000)
      this.isloadding = false;
    });
  }

  public register() {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[ i ].markAsDirty();
    }
    if ( this.registerForm.invalid ) {
      return;
    }

    this.userService.registerParam.username = this.getFormControl('registerForm', 'username').value;
    this.userService.registerParam.password = md5(this.getFormControl('registerForm', 'password').value);
    this.userService.registerParam.passwordConfirm = md5(this.getFormControl('registerForm', 'passwordConfirm').value);
    this.userService.registerParam.email = this.getFormControl('registerForm', 'email').value;
    this.userService.registerParam.phone = this.getFormControl('registerForm', 'phone').value;

    const promise = this.userService.register( this.userService.registerParam );
    promise.then((data) => {
      this._message.success(data.retmsg);
    }, (data) => {
      this._message.error(data.error.retmsg);
    })
  }
}
