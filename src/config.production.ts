module.exports = {
    port: process.env.NODE_PORT,
    database: {
      host: process.env.HOST,
      dialect: "mysql",
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.PORT,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      operatorAliases: false
    },
    auth: {
      secretKey: process.env.SECRET_KEY,
      session: false
    },
    googleAuth: {
      clientId: process.env.GOOGLE_CID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGE_CALLBACK
    }
  }
  