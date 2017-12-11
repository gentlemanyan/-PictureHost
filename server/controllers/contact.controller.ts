// import * as Koa from 'koa';
// import { Contacts } from './../models/contact.model';

// class ContactController {
//     constructor() {}

//     public async create(ctx: Koa.Context, next) {
//         const reqObj = ctx.request.body;
        
//         if ( reqObj.avatar === '' || reqObj.avatar == null ) {
//           ctx.throw('avatar is null');
//         }
//         if ( reqObj.name === '' || reqObj.name == null ) {
//           ctx.throw('name is null');
//         }
//         if ( reqObj.phone === '' || reqObj.phone == null ) {
//           ctx.throw('phone is null');
//         }
//         const contact = new Contacts({
//           avatar: ctx.request.body.avatar,
//           name: ctx.request.body.name,
//           phone: ctx.request.body.phone,    
//         });
    
//         const result = contact.save();
//         if (result) {
//           ctx.status = 200;
//           ctx.body = {
//             retCode: '0000',
//             retMsg: 'add contact success',
//           };
//         } else {
//           ctx.status = 500;
//           ctx.body = {
//             retCode: '0000',
//             retMsg: 'add contact fail',
//           };
//         }
//     }

//     public async select(ctx: Koa.Context, next) {
//       const reqObj = ctx.params;  

//       if ( reqObj.name === null || reqObj.name === '' ) {
//         ctx.throw('name is null');
//       }
//       let data: any;
//       if ( reqObj.name === 'all' ) {
//         data = await Contacts.find();        
//       } else {
//         data = await Contacts.find({name: reqObj.name});            
//       }
    
//       ctx.status = 200;
//       ctx.body = {
//         data: data,
//         retCode: '0000',
//         retMsg: 'search contacts success',
//       };
//     }

//     public async delete(ctx: Koa.Context, next) {
//       const reqObj = ctx.params;
      
//       if ( reqObj.name === '' || reqObj.name == null ) {
//         ctx.throw('name is null');
//       }
    
//       const result = await Contacts.remove({name: reqObj.name});
    
//       if (result) {
//         ctx.status = 200;
//         ctx.body = {
//           retCode: '0000',
//           retMsg: 'delete contact success',
//         };
//       } else {
//         ctx.status = 500;
//         ctx.body = {
//           retCode: '0000',
//           retMsg: 'delete contact fail',
//         };
//       }
//     }

//     public async update(ctx: Koa.Context, next) {
        
//     }
// }

// export default new ContactController();
