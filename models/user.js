const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class User extends Model {};

User.init({
  username: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.TEXT
  },
  password: {
    type: DataTypes.TEXT
  },
  firstName: {
    type: DataTypes.TEXT
  },
  lastName: {
    type: DataTypes.TEXT
  },
  address: {
    type: DataTypes.TEXT
  },
  mobileNo: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false
})

module.exports = User;