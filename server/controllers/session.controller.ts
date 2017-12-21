import { isNull } from '../lib/tool';
import { User, IUserModel } from '../models/user.model';
import RenderCtx from '../lib/render.class';
const renderCtx = new RenderCtx();

function setCookies(ctx, obj: Object, opts?: Object) {
  for ( var prop in obj ) {
    if ( opts === undefined ) {
      ctx.cookies.set(prop, obj[prop]);
    } else {
      ctx.cookies.set(prop, obj[prop], opts);
    }
  }
}

export default class SessionController {
  constructor() {}

  public async create(ctx, next) {
    const reqObj = ctx.request.body;
    if ( isNull(reqObj.username) ) {
      ctx.throw('用户名为空，请检查!');
    }
    if ( isNull(reqObj.password) ) {
      ctx.throw('密码为空，请检查!');
    }

    User.findOne({username: reqObj.username}, (err, user: IUserModel) => {
      if (err) {
        next();
      }
      if (user.checkPassword( reqObj.password )) {
        if ( ctx.session[reqObj.username] ) {
          renderCtx.renderFaild(ctx, 401, 'login', {retmsg: '用户已经登录'});
        }
        else {
          ctx.session[reqObj.username] = user;
        }
        
        setCookies(ctx, user);

        renderCtx.renderSuccess(ctx, 200, 'login', {
          retmsg: '登录成功!'
        });
      } else {
        renderCtx.renderFaild(ctx, 400, 'login', {
          retmsg: '用户名或密码错误!'
        });
      }
    });
  }

  public async delete(ctx, next) {

  }
}