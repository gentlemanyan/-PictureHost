import { isNull } from '../lib/tool';
import { User, IUserModel } from '../models/user.model';
import RenderCtx from '../lib/render.class';

class SessionController {
  private renderCtx = new RenderCtx();

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
        ctx.cookies.set('username', reqObj.username);
        ctx.cookies.set('password', reqObj.password);
        this.renderCtx.renderSuccess(ctx, 200, 'login', {
          retmsg: '登录成功!'
        });
      } else {
        this.renderCtx.renderFaild(ctx, 400, 'login', {
          retmsg: '用户名或密码错误!'
        });
      }
    });
  }

  public async delete(ctx, next) {

  }
}

export default new SessionController();
