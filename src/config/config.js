require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    replication: {
      read: [
        {
          username: process.env.READ_DATABASE_USERNAME,
          password: process.env.READ_DATABASE_PASSWORD,
          database: process.env.READ_DATABASE_NAME,
          host: process.env.READ_DATABASE_HOST,
        }
      ],
      write: {
        username: process.env.WRITE_DATABASE_USERNAME,
        password: process.env.WRITE_DATABASE_PASSWORD,
        database: process.env.WRITE_DATABASE_NAME,
        host: process.env.WRITE_DATABASE_HOST,
      }
    },
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 30,
      idle: 30000,
      evict: 10000,
      acquire: 60000
    }
  },
  qa: {
    replication: {
      read: [
        {
          username: process.env.READ_DATABASE_USERNAME,
          password: process.env.READ_DATABASE_PASSWORD,
          database: process.env.READ_DATABASE_NAME,
          host: process.env.READ_DATABASE_HOST,
        }
      ],
      write: {
        username: process.env.WRITE_DATABASE_USERNAME,
        password: process.env.WRITE_DATABASE_PASSWORD,
        database: process.env.WRITE_DATABASE_NAME,
        host: process.env.WRITE_DATABASE_HOST,
      }
    },
    port: +(process.env.DATABASE_PORT),
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      idle: 30000,
      evict: 10000,
      acquire: 60000
    }
  },
  staging: {
    replication: {
      read: [
        {
          username: process.env.READ_DATABASE_USERNAME,
          password: process.env.READ_DATABASE_PASSWORD,
          database: process.env.READ_DATABASE_NAME,
          host: process.env.READ_DATABASE_HOST,
        }
      ],
      write: {
        username: process.env.WRITE_DATABASE_USERNAME,
        password: process.env.WRITE_DATABASE_PASSWORD,
        database: process.env.WRITE_DATABASE_NAME,
        host: process.env.WRITE_DATABASE_HOST,
      }
    },
    port: +(process.env.DATABASE_PORT),
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      idle: 30000,
      evict: 10000,
      acquire: 60000
    }
  },
  prod: {
    replication: {
      read: [
        {
          username: process.env.READ_DATABASE_USERNAME,
          password: process.env.READ_DATABASE_PASSWORD,
          database: process.env.READ_DATABASE_NAME,
          host: process.env.READ_DATABASE_HOST,
        }
      ],
      write: {
        username: process.env.WRITE_DATABASE_USERNAME,
        password: process.env.WRITE_DATABASE_PASSWORD,
        database: process.env.WRITE_DATABASE_NAME,
        host: process.env.WRITE_DATABASE_HOST,
      }
    },
    port: +(process.env.DATABASE_PORT),
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      idle: 30000,
      evict: 10000,
      acquire: 60000
    }
  }
};