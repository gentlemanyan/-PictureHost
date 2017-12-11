import * as Koa from 'koa';
import config from '../config/config';
import * as crypto from 'crypto';
import {saltHash} from '../lib/auth';

class UserController {
  constructor() {}

  public async create(ctx: Koa.Context) {  
    const reqObj = {
      account: ctx.request.body.account,
      password: ctx.request.body.password,
      username: ctx.request.body.username,      
      email: ctx.request.body.email,    
    };

    //const promise = User.insert( reqObj );

    // await promise.then( (data) => {
    //   ctx.status = 200;
    //   ctx.body = {
    //     retCode: '0000',
    //     retMsg: 'register success',
    //   };
    // }, (err) => {
    //   ctx.throw(err);
    // });
}

  public async get(ctx: Koa.Context) {
        
  }

  public async update(ctx: Koa.Context) {
    
  }

  public async delete(ctx: Koa.Context) {
    
  }
}

export const user = new UserController();
