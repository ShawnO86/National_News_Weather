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
const newsContent = {};

app.get('/:category', async (req, res) => {
    await getTopHeadlineData(req.params.category);
    try {
        res.send(newsContent)
    } catch (e) {
        console.log("Geo error", e)
    }
});

//changes ISO to (Month Day, Year) format
const dateFormat = (date) => {
    const d = new Date(date)
    const monthValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthValues[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
};

const getTopHeadlineData = async (category) => {
    const newsURL = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=${newsKey}&language=en&category=${category}`);
    const newsArr = [];
    try {
        const newsData = await newsURL.json();
        newsData.articles.forEach(article => {
            if (article.urlToImage === null) {
                return
            } else {
                newsArr.push({
                    source: article.source.name,
                    author: article.author,
                    title: article.title,
                    url: article.url,
                    imgUrl: article.urlToImage,
                    datePublished: dateFormat(article.publishedAt)
                })
            }
        })
        console.log(newsData)
        newsContent.amount = newsArr.length
        newsContent.news = newsArr
    } catch (e) {
        console.log("News Data Error: ", e)
    }
};

export default app;