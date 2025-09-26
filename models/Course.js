const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  courseName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  courseCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  tableName: 'courses',
  timestamps: true
});

module.exports = Course;
