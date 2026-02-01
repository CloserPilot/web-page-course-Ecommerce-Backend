import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // archivo SQLite
  logging: false // opcional: quita logs SQL
});

export default sequelize;
