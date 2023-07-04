import express from "express";
import cors from 'cors';
import { getTopHeadlineData, getArticleSummary } from '../utils/newsJson.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// host/news/headlines/category
app.get('/headlines/:category', async (req, res) => {
    const newsContent = await getTopHeadlineData(req.params.category);
    try {
        res.send(newsContent)
    } catch (e) {
        console.log("news get error", e)
    }
});

// host/news/summary?url=''
app.get('/summary', async (req, res) => {
    const articleSummary = await getArticleSummary(req.query.url);
    try {
        res.send(articleSummary)
    } catch (e) {
        console.log("summary get error", e)
    }
});

export default app;