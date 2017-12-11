import config from '../config/config';
import * as crypto from 'crypto';
import * as Koa from 'koa';

export function saltHash( data ) {
  const salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
  return crypto.pbkdf2Sync(data, salt, 1, config.crypto.hash.length, 'sha1').toString();
}
