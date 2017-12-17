import { type } from "os";

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port: number = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export default { normalizePort }; 

export interface IPromise {

}
// 手写一个Promise
export class Promise {
  public fn: Function;
  public state = 'pending';
  public method = {};
  public index = 0;

  constructor(fn) {
    fn(this.resolve, this.reject);
    this.method[this.index] = [];
    this.method['onrejected'] = [];
  }

  public resolve(data) {
    this.state = 'onfulfilled';
    
    if ( Array.isArray(this.method['onfulfilled']) ) {
      let i = 0;
      let len = this.method['onfulfilled'].length;
      while ( i < len ) {
        this.method['onfulfilled'][i++]();
      }
    }
    return this;
  }

  public reject() {
    this.state = 'onrejected ';

    return this;
  }

  // 注册resolve方法和reject方法
  public then( onfulfilled, onrejected ) {
    this.method['onfulfilled'].push(onfulfilled);
    this.method['onrejected'].push(onrejected);

    // if ( this.state === 'onfulfilled' ) {
    //   if ( onfulfilled && typeof onfulfilled === 'function' ) {
    //     onfulfilled();
    //   }
    //   else {
    //     throw new TypeError("onfulfilled must be a function")
    //   }
    // }

    // if ( this.state === 'onrejected' ) {
    //   if ( onrejected && typeof onrejected === 'function' ) {
    //     onrejected();
    //   }
    //   else {
    //     throw new TypeError("onrejected must be a function")
    //   }
    // }
    
    return this;
  }
}