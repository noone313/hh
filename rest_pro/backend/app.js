import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { errorMiddleware } from "./error/error.js";
import reservationRoute from './routes/reservationRoute.js'


const dbConnection = () => {
    mongoose.connect('database_uri', {
        dbName: "rest",
      })
      .then(() => {
        console.log("Connected to database!");
      })
      .catch((err) => {
        console.log(`Some error occured while connecing to database: ${err}`);
      });
  };

const app = express();


app.use(cors({origin: "http://localhost:5173",methods: ["POST"],credentials: true,}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/reservation', reservationRoute)

dbConnection();

app.use(errorMiddleware);

export default app;
