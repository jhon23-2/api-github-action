const sequelize = require('../config/database');
const Student = require('./Student');
const Course = require('./Course');

// Define relationships
Student.belongsToMany(Course, { through: 'StudentCourses' });
Course.belongsToMany(Student, { through: 'StudentCourses' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  Student,
  Course
};
