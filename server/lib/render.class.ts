import * as Koa from 'koa';

export default class RenderCtx {
  constructor() {}

  public renderSuccess(ctx: Koa.Context, status: number, type: string, retmsg: string, data?: Object) {
    ctx.status = status;

    if ( data === undefined ) {
      ctx.body = {
        success: true,
        type: type,
        retmsg: retmsg
      };
    } else {
      ctx.body = {
        success: true,
        type: type,
        retmsg: retmsg,
        data: data
      };
    }
   
  }

  public renderFaild(ctx: Koa.Context, status: number, type: string, retmsg: string, data?: Object) {
    ctx.status = status;
    if ( data === undefined ) {
      ctx.body = {
        success: true,
        type: type,
        retmsg: retmsg
      };
    } else {
      ctx.body = {
        success: true,
        type: type,
        retmsg: retmsg,
        data: data
      };
    }
  }
}
