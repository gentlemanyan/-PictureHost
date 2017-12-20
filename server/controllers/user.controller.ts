import * as Koa from 'koa';
import { User, IUserModel } from '../models/user.model';
import config from '../config/config';
import RenderCtx from '../lib/render.class';

class UserController {
  private renderCtx = new RenderCtx();
  
  constructor() {}

  public async create(ctx: Koa.Context) {
    const user = new User({
      username: ctx.request.body.username,
      password: ctx.request.body.password,
      phone: ctx.request.body.phone,
      email: ctx.request.body.email
    });
    try {
      const result = await user.save();
      if ( result ) {
        this.renderCtx.renderSuccess(ctx, 200, 'register', {
          retcode: '0000',
          retmsg: '注册成功'
        });
      }
      else {
        this.renderCtx.renderFaild(ctx, 500, 'register', {
          retcode: '0001',
          retmsg: '服务器异常，注册失败'
        });
      }
    }
    catch(e) {
      console.log(e);
      ctx.status = 400;
      ctx.body = {
        retcode: '0001',
        retmsg: e.errors.message || e._message
      }
    }
  }

  public get(ctx: Koa.Context, next) {
    const reqObj = {
      username: ctx.body.username,
      password: ctx.body.password
    };

    User.findOne({username: reqObj.username}, (err, user: IUserModel) => {
      if (err) {
        next();
      }
      if (user.checkPassword( reqObj.password )) {
        this.renderCtx.renderSuccess(ctx, 200, 'users', {});
      }
      else {
        this.renderCtx.renderFaild(ctx, 400, 'users', {});
      }
    });

  }

  public async update(ctx: Koa.Context) {
    const reqObj = {
      username: ctx.body.usernmae,
      password: ctx.body.password,
    };

  }

  public async delete(ctx: Koa.Context) {
    
  }
}

export const user = new UserController();
