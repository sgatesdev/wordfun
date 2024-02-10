import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'pgpass', {
  host: 'localhost',
  dialect: 'postgres',
  schema: 'wordfun'
});

export { sequelize };