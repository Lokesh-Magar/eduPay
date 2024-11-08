import Student from '../models/student.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
// const Notification = require('../models/notification.model');
import Notification from '../models/notification.model.js';

export const studsignup=async (req, res, next)=>{

const {username,email,phone,password}=req.body;
if(
    !username||
    !email||
    !phone||
    !password||
    username===''||
    email===''||
    phone===0||
    password===''
){
    next(errorHandler(400, 'All fields are required'));
}

const hashedPassword=bcryptjs.hashSync(password,10);

const newStudent = new Student({
    username,
    email,
    phone,
    password: hashedPassword,
});

try {
    newStudent.save();
    // It is used to send a JSON response to the client
    res.json('Student Signup successful');


    //Creating Notification for the new user
    const notification = new Notification({
        title: 'New Student Registered',
        message: `A new student has been registered with email ${newStudent.email} under the name ${newStudent.username}`,
        userId: newStudent._id,
}   
    );
    await notification.save();
}
catch (error) {
    next(error);
}
};

export const studsignin = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'));
    }
  
    try {
      const validUser = await Student.findOne({ email });
      
      if (!validUser) {
        return next(errorHandler(404, 'Student not found'));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
      }
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        process.env.JWT_SECRET
      );
  
      const { password: pass, ...rest } = validUser._doc;
  
      res
        .status(200)
        .cookie('access_token', token, )
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
  
  export const studsignout = async (req, res, next) => {
    try {
      
      res.clearCookie('access_token', {
        httpOnly: true, // Ensure that cookie cannot be accessed via client-side scripts
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', // (lax, strict, or none)
      });
  
      // You can add additional logic here, like invalidating the token if stored in a database
  
      res.status(200).json({ message: 'Signed out successfully' });
    } catch (error) {
      console.error('Signout Error:', error);
      res.status(500).json({ message: 'Server Error: Unable to sign out' });
    }
  };
  