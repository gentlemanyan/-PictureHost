import { isNull } from '../lib/tool';
import { User, IUserModel } from '../models/user.model';
import RenderCtx from '../lib/render.class';
const renderCtx = new RenderCtx();

export default class SessionController {
  constructor() {}

  private setCookies(ctx, obj: Object, opts?: Object) {
    for ( var prop in obj ) {
      if ( opts === undefined ) {
        ctx.cookies.set(prop, obj[prop]);
      } else {
        ctx.cookies.set(prop, obj[prop], opts);
      }
    }
  }

  public async create(ctx, next) {
    const reqObj = ctx.request.body;
    if ( isNull(reqObj.username) ) {
      ctx.throw('用户名为空，请检查!');
    }
    if ( isNull(reqObj.password) ) {
      ctx.throw('密码为空，请检查!');
    }

    const user: IUserModel = await User.findOne({username: reqObj.username});
    if (user.checkPassword( reqObj.password )) {
      console.log( `当前登录的用户${ctx.session[reqObj.username].username}` );
      
      if ( ctx.session.isNew ) {
        // renderCtx.renderFaild(ctx, 401, 'login', '用户已经登录');
        delete ctx.session[reqObj.username];
      }
      ctx.session[reqObj.username] = reqObj;
      // this.setCookies(ctx, reqObj, {signed: false});
      renderCtx.renderSuccess(ctx, 200, 'login', '登录成功!', {username: reqObj.username});
    } else {
      renderCtx.renderFaild(ctx, 400, 'login', '用户名或密码错误!');
    }
  }

  public async delete(ctx, next) {

  }
}