import express, { request } from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js"; 

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to Task Manager');
});

app.use('/tasks', taskRoutes);

//connect the database
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

    
