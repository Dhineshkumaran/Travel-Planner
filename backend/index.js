import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import reviewRoute from './routes/reviews.js';
import authRoute from './routes/auth.js';
import bookingRoute from "./routes/bookings.js";
import paymentRoute from "./routes/payment.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:3000', 'http://13.239.183.126:3000'];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true
};

mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://boomeshp:qfKApZEY3lGKtclD@cluster0.ndihl.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('Not connected');
    }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/v1/tours', tourRoute);
app.use("/api/v1/users", userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/create-order', paymentRoute);

app.listen(port, '0.0.0.0', () => {
    connect();
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
