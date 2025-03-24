import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const User = db.define('users', {
    judul: DataTypes.STRING,
    catatan: DataTypes.TEXT,
    kategori: DataTypes.STRING
}, {
    freezeTableName: true
});

export default User;

(async()=>{
    await db.sync();
})();