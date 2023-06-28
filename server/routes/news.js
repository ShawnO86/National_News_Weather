import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const newsKey = process.env.newsapi_key;



export default app;