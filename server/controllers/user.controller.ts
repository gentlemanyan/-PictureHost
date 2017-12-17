import * as Koa from 'koa';
import {User} from '../models/user.model';
import config from '../config/config';
import * as crypto from 'crypto';
import {saltHash} from '../lib/auth';

class UserController {
  constructor() {}

  public async create(ctx: Koa.Context) {  
    const reqObj = {
      username: ctx.request.body.username,
      password: ctx.request.body.password,
      phone: ctx.request.body.phone,      
      email: ctx.request.body.email,    
    };

    const user = new User(reqObj);
    try {
      const result = await user.save();
      if ( result ) {
        ctx.status = 200;
        ctx.body = {
          retcode: '0000',
          retmsg: '注册成功'
        };
      }
      else {
        ctx.status = 500;
        ctx.body = {
          retcode: '0001',
          retmsg: '服务器异常，注册失败'
        }
      }
    }
    catch(e) {
      console.log(e);
      ctx.status = 500;
      ctx.body = {
        retcode: '0001',
        retmsg: '服务器异常，注册失败'
      }
    }
 
  }

  public async get(ctx: Koa.Context) {
        
  }

  public async update(ctx: Koa.Context) {
    
  }

  public async delete(ctx: Koa.Context) {
    
  }
}

export const user = new UserController();
