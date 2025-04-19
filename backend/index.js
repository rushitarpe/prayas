import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import figlet from 'figlet';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

// figlet("Welcome to Rushi's Website", function (err, data) {
//     if (err) {
//       console.log("Something went wrong...");
//       console.dir(err);
//       return;
//     }
//     console.log(data);
//   });

mongoose.connect(process.env.MONGODB_URI).then( ()=> {
    console.log('Connected to the database');
    
}).catch((err) => {
    console.log('Connection failed');
});
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})