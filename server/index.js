import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
/* const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args)); */
import newsRoute from './routes/news.js';
import weatherRoute from './routes/weather.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 8081;

dotenv.config();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/dist'));

app.use('/weather', weatherRoute);
app.use('/news', newsRoute);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get("/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});

