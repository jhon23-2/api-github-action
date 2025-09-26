const express = require('express');
const app = express();
const Course = require('./models/Course');
const Student = require('./models/Student');
const cors = require('cors');
require('dotenv').config()
const morgan = require('morgan');
const sequelize = require('./config/database');




const port = process.env.SERVER_PORT || 5000;

// middleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// welcome route

app.get('/', (req, res) => {
  res.send('Welcome to the Student and Course Management API');
});


// CREATE new student
app.post('/student', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all students
app.get('/student', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json({ message: "Students retrieved successfully", students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//create course
app.post('/course', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all courses
app.get('/course', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    const studentCount = await Student.count();
    if (studentCount === 0) {
      await createSampleData();
    }

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

const createSampleData = async () => {
  try {
    await Course.create([
      {
        courseName: 'Mathematics 101',
        courseCode: 'MATH101',
        description: 'Basic mathematics course',
        credits: 3
      },
      {
        courseName: 'Computer Science 101',
        courseCode: 'CS101',
        description: 'Introduction to programming',
        credits: 4
      },
      {
        courseName: 'Physics 101',
        courseCode: 'PHYS101',
        description: 'Basic physics concepts',
        credits: 3
      }
    ]);

    await Student.create([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 20,
        grade: 'A'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        age: 19,
        grade: 'B'
      },
      {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        age: 21,
        grade: 'A'
      }
    ]);

  } catch (error) {
    console.error('Error creating sample data:', error);
  }
};


startServer();