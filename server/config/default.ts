export default {
  secret: 'secret-api',
  jwtSecret: 'secret-jwt',
  session: {
    secret: 'cat_test',
    cookie: {
      maxAge: 60 * 60 * 5,      
    },
  },
  mongoose: {
    uri: 'mongodb://localhost:27017',
    options: {
      useMongoClient: true,
      server: {
        socketOption: {
          keepAlive: 1,
        },
        pollSize: 5,
      },
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    },
  },
  crypto: {
    hash: {
      length: 128,
    },
  },
};
