import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import newsRoute from './routes/news.js';
import weatherRoute from './routes/weather.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(morgan('tiny'));

const port = process.env.PORT || 8081;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/dist'));

//routes /weather.js
app.use('/weather', weatherRoute);
//routes /news.js
app.use('/news', newsRoute);

//serve production files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

//health check
app.get("/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});