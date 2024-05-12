import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import weatherRoute from './routes/weather.js';


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const port = process.env.PORT || 8081;


//route for weather data
app.use('/weather', weatherRoute);

//health check
app.get("/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});