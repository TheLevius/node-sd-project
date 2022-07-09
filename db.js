const {
  Sequelize,
  DataTypes
} = require('sequelize');

const sequelize = new Sequelize('sacred-dev', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});
const fieldCaption = {
  field: "caption",
  type: DataTypes.STRING
};
const users = sequelize.define('user', {
  caption: fieldCaption
});
const userData = {
  caption: 'Hello, from project'
}

const auth = async (sequelizeInstance) => {
  try {
    await sequelizeInstance.authenticate();
    console.log('Connection has been established successfully.');
    await users.sync();
    console.log('Sync table users');
    const user = await users.create(userData);
    console.log(user);
    console.log(user.id, user.caption, user.createdAt);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
auth(sequelize);