// import * as passport from 'koa-passport';
// import {Strategy} from 'passport-local';
// import {IUserModel, User} from '../../models/user.model';

// const localStrategy = new Strategy({
//     usernameField: 'account',
//     passwordField: 'password',
//     passReqToCallback: true,
//   },
//   (req, account, password, done) => {
//   User.findOne({account: account}, (err, user: IUserModel) => {
//     if (err) {
//       return done(err);
//     }

//     if (!user || !user.checkPassword(password)) {
//       return done(null, false, {message: 'Not Found User, or Password incorrect'});
//     }
//     return done(null, user);
//   });
// });

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// passport.serializeUser(this.serialize);
// passport.deserializeUser(this.deserialize);

// passport.use('local', localStrategy);
      
// export default passport;
