import fetch from "node-fetch";
import dotenv from 'dotenv';
import { dateFormat, describeScore, capitalize } from '../utils/newsUtils.js';

dotenv.config();
const newsKey = process.env.newsapi_key;
const meaningcloudKey = process.env.meaningcloud_key
const newsContent = {};
const articleSummary = {};

export const getTopHeadlineData = async (category) => {
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
        //console.log(newsData)
        newsContent.amount = newsArr.length
        newsContent.news = newsArr
    } catch (e) {
        console.log("News Data Error: ", e)
    }
    return newsContent
};

export const getArticleSummary = async (url) => {
    const formdata = new FormData();
    formdata.append("key", meaningcloudKey);
    formdata.append("url", url);
    formdata.append("sentences", 5);
    try {
        const response = await fetch(
            "https://api.meaningcloud.com/summarization-1.0",
            {
                method: "POST",
                body: formdata,
                redirect: "follow",
            }
        );
        const result = await response.json();
        articleSummary.summary = result;
        await getSentiment(url);
    } catch (error) {
        console.log("Error:", error);
    }
    return articleSummary
};

const getSentiment = async (url) => {
    const formdata = new FormData();
    formdata.append("key", meaningcloudKey);
    formdata.append("url", url);
    formdata.append("lang", "en");
    try {
        const response = await fetch(
            "https://api.meaningcloud.com/sentiment-2.1",
            {
                method: "POST",
                body: formdata,
                redirect: "follow",
            }
        );
        const result = await response.json();
        articleSummary.sentiment = {
            polarity: describeScore(result.score_tag),
            agreement: capitalize(result.agreement.toLowerCase()),
            subjectivity: capitalize(result.subjectivity.toLowerCase()),
            irony:
                result.irony === "NONIRONIC"
                    ? "Not Ironic"
                    : capitalize(result.irony.toLowerCase()),
            confidence: result.confidence + "%",
        };
    } catch (error) {
        console.log("Error:", error);
    }
};