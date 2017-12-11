import {Schema, Model, model} from 'mongoose';
import * as mongoose from 'mongoose';

const contactSchema: Schema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: 'name is required',
  },
  phone: {
    type: String,
    unique: 'This phone already exist',
    required: 'phone is required',
    validate: [
      {
        validator: function checkPhone(value) {
          return /^1(3|4|5|7|8)\d{9}$/.test(value);
        },
        msg: 'Please add valid phone',
      },
    ],
  },
});

export const Contacts = model('Contacts', contactSchema);
