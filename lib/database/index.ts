import { Sequelize } from 'sequelize';

class Database {
  db: Sequelize;

  constructor() {
    this.db = new Sequelize(
      process.env.DB_NAME as string,
      process.env.DB_NAME as string,
      process.env.DB_PASS as string,
      {
        host: 'remotemysql.com',
        dialect: 'mysql',
      },
    );
  }
}

export default new Database().db;
