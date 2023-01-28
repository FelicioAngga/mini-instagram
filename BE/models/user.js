import { sequelize, DataTypes } from "./model.js";

const User = sequelize.define('user', {
  username: DataTypes.STRING, 
  password: DataTypes.STRING,
});

User.sync();
export default User;