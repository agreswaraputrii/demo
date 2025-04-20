import { Sequelize } from "sequelize";

const db = new Sequelize('catatan', 'root', '', {
    host: '104.154.233.135',
    dialect: 'mysql'
});

export default db;