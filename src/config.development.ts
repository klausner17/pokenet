module.exports = {
  port: 3000,
  database: {
    connectionString: 'postgres://postgres:root@localhost:5432/pokenet',
    host: 'localhost',
    dialect: 'postgres',
    user: 'postgres',
    password: 'root',
    database: 'pokenet',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorAliases: false
  },
  auth: {
    secretKey: 'POKENET@123',
    session: false
  },
  googleAuth: {
    clientId: '51381765033-s1cuat81euq3754f5hdl0d07r54brvaj.apps.googleusercontent.com',
    clientSecret: '-32qbfBbvArw6tBeln-aePFC',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }
};
