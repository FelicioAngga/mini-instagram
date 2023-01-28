import { Sequelize, DataTypes } from 'sequelize';
import mysql2 from 'mysql2/promise';

const conn = await mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});
await conn.execute(`CREATE DATABASE IF NOT EXISTS mini_ig`);

const sequelize = new Sequelize("mini_ig", "root", "", {
  host: 'localhost', dialect: 'mysql'
});
export { sequelize, DataTypes };
