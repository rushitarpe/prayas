import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import figlet from 'figlet';
dotenv.config();

figlet("Welcome to Rushi's Website", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });

mongoose.connect(process.env.MONGODB_URI).then( ()=> {
    console.log('Connected to the database');
    
}).catch((err) => {
    console.log('Connection failed');
});
const app = express();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});