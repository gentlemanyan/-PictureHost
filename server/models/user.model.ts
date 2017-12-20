/**
 * @description User Model
 * @author zhangyan create by 2017/12/11 
 */
import {Schema, Model, model, ValidationError} from 'mongoose';
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as uniqValidator from 'mongoose-beautiful-unique-validation';

const userSchema: Schema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    unique: '用户名已经存在，请更换您的用户名',
    required: '用户名不能为空',
  },
  password: {
    type: String,
    required: '用户密码不能为空'
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
  }
});


userSchema.virtual('password').set(function(password: string){
  if (password !== undefined) {
    if (password.length < 4) {
      this.invalidate('password', '密码长度必须大于4位');
    }
    if (password.length > 16) {
      this.invalidate('password', '密码长度必须小于16位');
    }
    
    this._password = password;
    if (password) {
      this.saltPassword = crypto.randomBytes(128).toString('base64');
    }
  }
});

userSchema.plugin(uniqValidator);

export const User = model('User', userSchema);
