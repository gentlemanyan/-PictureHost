export default {
  secret: 'secret-api',
  jwtSecret: 'secret-jwt',
  url: '127.0.0.1',
  port: 4000,
  session: {
    secrets: 'zhangyan',
    cookie: {
      maxAge: 60 * 60 * 5,      
    },
  },
  mongoose: {
    uri: 'mongodb://localhost:27017/zy_img',
    options: {
      useMongoClient: true,
      autoIndex: true
    },
  },
  crypto: {
    hash: {
      length: 128,
    },
  },
};
