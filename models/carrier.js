const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Carrier extends Model {};

Carrier.init({
  Title: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.TEXT
  },
  phone: {
    type: DataTypes.TEXT
  },
  country: {
    type: DataTypes.TEXT
  },
  notes: {
    type: DataTypes.TEXT
  },
  FirstName: {
    type: DataTypes.TEXT
  },
  SurName: {
    type: DataTypes.TEXT
  },
  PreName: {
    type: DataTypes.TEXT
  },
  mydate: {
    type: DataTypes.TEXT
  },
  major: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'carrier',
  timestamps: false
})

module.exports = Carrier;