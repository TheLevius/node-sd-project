const {
  Sequelize,
  DataTypes
} = require('sequelize');

const sequelize = new Sequelize('single_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
auth();