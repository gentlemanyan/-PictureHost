/**
 * @description User Model
 * @author zhangyan create by 2017/12/11
 */
import { Schema, Model, model, ValidationError } from 'mongoose';
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as uniqValidator from 'mongoose-beautiful-unique-validation';
import config from '../config/config';
import PubDefine from '../lib/pubdefine';

export interface IUserModel extends mongoose.Document {
  username: string;
  name?: string;
  passwordHash: string;
  email: string;
  phone?: number;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  checkPassword(password: string): boolean;
}

const userSchema: Schema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    unique: '用户名已经存在，请更换您的用户名',
    required: '用户名不能为空',
  },
  name: {
    type: String,
    default: 'test' + Date.now
  },
  passwordHash: {
    type: String,
    required: '密码不能为空'
  },
  email: {
    type: String,
    unique: '邮箱已被使用，请使用其他邮箱',
    validate: [
      {
        validator: (value) => {
          return /[A-z0-9_]+@[A-z0-9]+\.[a-z0-9]{2,5}$/.test(value);
        },
        msg: '无效的邮箱格式，请使用正确的邮箱'
      }
    ]
  },
  phone: {
    type: Number,
    unique: '手机号已被使用，请更换手机号',
    validate: [
      {
        validator: function checkPhone(value) {
          return /^1(3|4|5|7|8|9)\d{9}$/.test(value);
        },
        msg: '手机号格式不正确，请使用正确的手机号',
      },
    ],
  },
  role: {
    type: String,
    required: true,
    default: PubDefine.USERLEVEL.COMMONUSER
  },
  salt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updateAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

userSchema.virtual('password').set(function(password: string) {
  if (password !== undefined) {
    if (password.length < 4) {
      this.invalidate('password', '密码长度必须大于4位');
    }

    this._password = password;
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64');
      this.passwordHash =  crypto.pbkdf2Sync( password, this.salt, 1,
        config.saltHash.length, 'sha1').toString();
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  }
}).get(function() {
  return this._password;
});

userSchema.methods.checkPassword = function(password): boolean {
  if (!password) {
    return false;
  }
  if (!this.passwordHash) {
    return false;
  }
  return crypto.pbkdf2Sync(password, this.salt, 1,
    config.saltHash.length, 'sha1').toString() === this.passwordHash;
};

userSchema.plugin(uniqValidator);

export const User: Model<IUserModel> = model<IUserModel>('User', userSchema);
