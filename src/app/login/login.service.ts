import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { promise } from 'selenium-webdriver';

// 用户信息接口定义
export interface IUser {
  username: string,
  password: string,
  passwordConfirm?: string,
  email?: string,
}

export interface IUserMethod {
  login(user: IUser): Promise<any>,
  register(user: IUser): Promise<any>
}

/**
 * 用户服务，包括登陆，注册，修改密码等功能
 **/
@Injectable()
export class UserService implements IUserMethod {
  public user: IUser;

  constructor(
    public http: Http
  ) {}

  public login( user: IUser ): Promise<any> {
    return this.http.post('/session', user) 
      .toPromise()
      .then((response) => response.json().data as any[])
      .then((data) => { console.log(data);})
      .catch((e) => {
        console.error('登录错误');
        return Promise.reject( e );
      });
  }

  /**
   * 注册用户
   * @param user 用户对象
   */
  public register( user: IUser ): Promise<any> {
    return this.http.post('/user', user) 
    .toPromise()
    .then((response) => response.json().data as any[])
    .then((data) => { console.log(data);})
    .catch((e) => {
      console.error('登录错误');
      return Promise.reject( e );
    });
  }
}
