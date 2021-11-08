const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Contact extends Model {};

Contact.init({
  fname: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.TEXT
  },
  phone: {
    type: DataTypes.TEXT
  },
  comment: {
    type: DataTypes.TEXT
  },
  
}, {
  sequelize,
  modelName: 'contact',
  timestamps: false
})

module.exports = Contact;