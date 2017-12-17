import { isNull } from '../lib/tool';
import { saltHash } from '../lib/auth';
import { User } from '../models/user.model';

class SessionController {
  constructor() {}

  public async create(ctx, next) {
    const reqObj = ctx.request.body;
    if ( isNull(reqObj.username) ) {
      ctx.throw('用户名为空，请检查!');
    }
    if ( isNull(reqObj.password) ) {
      ctx.throw('密码为空，请检查!');
    }

    const user: any = await User.findOne({username: reqObj.username});
    if ( user ) {
      if ( reqObj.password === user.password ) {
        ctx.cookies.set('username', reqObj.username);
        ctx.cookies.set('password', reqObj.password);
        ctx.status = 200;
        ctx.body = {
          retmsg: '登录成功!',
        };
      }
      else {
        ctx.status = 401;
        ctx.body = {
          retmsg: '用户名或密码错误!',
        };
      }
      
    } else {
      ctx.status = 401;
      ctx.body = {
        retmsg: '用户不存在!',
      };
    }
    // reqObj.password = saltHash(reqObj.password);  password salt and hash
  }

  public async delete(ctx, next) {

  }
}

export default new SessionController();
