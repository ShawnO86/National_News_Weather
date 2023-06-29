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
const meaningcloudKey = process.env.meaningcloud_key
const newsContent = {};
const articleSummary = {};

// host/news/headlines/category
app.get('/headlines/:category', async (req, res) => {

    await getTopHeadlineData(req.params.category);
    try {
        res.send(newsContent)
    } catch (e) {
        console.log("news get error", e)
    }
});

// host/news/summary?url=''
app.get('/summary', async (req, res) => {
    await getArticleSummary(req.query.url);
    await getSentiment(req.query.url)
    try {
        res.send(articleSummary)
    } catch (e) {
        console.log("summary get error", e)
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
        //console.log(newsData)
        newsContent.amount = newsArr.length
        newsContent.news = newsArr
    } catch (e) {
        console.log("News Data Error: ", e)
    }
};

const getArticleSummary = async (url) => {
    const formdata = new FormData();
    formdata.append("key", meaningcloudKey);
    formdata.append("url", url);
    formdata.append("sentences", 5);

    await fetch("https://api.meaningcloud.com/summarization-1.0", {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
    })
        .then(response => response.json())
        .then(result => 
            articleSummary.summary = result
            )
        .catch(error => console.log('error', error));
}

const describeScore = (score) => {
    let polarity = ''
    switch(score) {
        case 'P+':
            polarity = "Strong Positive";
            break;
        case 'P':
            polarity = "Positive";
            break;
        case 'NEU':
            polarity = "Neutral";
            break;
        case 'N':
            polarity = "Negative";
            break;
        case 'N+':
            polarity = "Strong Negative";
            break;
        case 'NONE':
            polarity = "No Polarity"
            break;
    }
    return polarity;
}

const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

const getSentiment = async (url) => {
    const formdata = new FormData();
    formdata.append("key", meaningcloudKey);
    formdata.append("url", url);
    formdata.append("lang", "en");

    await fetch("https://api.meaningcloud.com/sentiment-2.1", {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(result => 
        articleSummary.sentiment = {
            polarity: describeScore(result.score_tag),
            agreement: capitalize(result.agreement.toLowerCase()),
            subjectivity: capitalize(result.subjectivity.toLowerCase()),
            confidence: result.confidence + "%",
            irony: result.irony === "NONIRONIC" ? "Not Ironic" : capitalize(result.irony.toLowerCase()),
        }
        )
    .catch(error => console.log('error', error));
}

export default app;