import { BLOB } from "sequelize";
import { sequelize, DataTypes } from "./model.js";

const Post = sequelize.define('post', {
  caption: DataTypes.STRING, 
  image: BLOB('long'),
  user_id: DataTypes.INTEGER,
});

Post.sync();
export default Post;