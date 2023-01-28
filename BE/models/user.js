import { sequelize, DataTypes } from "./model.js";
import { BLOB } from "sequelize";

const User = sequelize.define('user', {
  username: DataTypes.STRING, 
  password: DataTypes.STRING,
  image: BLOB('long'),
});

User.sync();
export default User;