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

const geoKey = process.env.geonames_key;
/* let geoData = {}; */
const projectData = {}
const weatherData = {}
app.get('/:city?/:lat?/:long?', async (req, res) => {
    await getGeoData(req);
    await getZoneData(projectData.lat, projectData.long)
    try {
        //console.log(weatherData)
        res.send(weatherData)
    } catch (e) {
        console.log("Geo error", e)
    }
});

const getGeoData = async (req) => {
    let geoData = ''
    if (req.params.city !== 'no') {
        geoData = await fetch(`http://api.geonames.org/searchJSON?q=${req.params.city}&maxRows=1&username=${geoKey}`);
        try {
            const data = await geoData.json();
            //console.log(data)
            //populate weatherData with api data
            projectData.long = data.geonames[0].lng
            projectData.lat = data.geonames[0].lat
            projectData.country = data.geonames[0].countryName
            projectData.local = data.geonames[0].adminName1
            projectData.name = data.geonames[0].name
        } catch (e) {
            console.log("Geo search data error", e);
        }
    }
    else if (req.params.lat !== 'no' && req.params.long !== 'no') {
        geoData = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${req.params.lat}&lng=${req.params.long}&maxRows=1&username=${geoKey}`)
        try {
            const data = await geoData.json();
            //console.log(data)
            //populate weatherData with api data
            projectData.long = data.postalCodes[0].lng
            projectData.lat = data.postalCodes[0].lat
            projectData.country = data.postalCodes[0].countryCode
            projectData.local = data.postalCodes[0].adminName1
            projectData.name = data.postalCodes[0].placeName
        } catch (e) {
            console.log("Geo postal data error", e);
        }
    }
};

const getZoneData = async (lat, long) => {
    const getForcastURL = await fetch(`https://api.weather.gov/points/${lat},${long}`);
    const zoneId = await fetch(`https://api.weather.gov/zones/county?point=${lat},${long}`);
    try {
        const urlJson = await getForcastURL.json();
        const zoneJson = await zoneId.json();
        projectData.dailyForcastURL = urlJson.properties.forecast;
        projectData.zoneId = zoneJson.features[0].properties.id;
        //console.log("forecast url = ", projectData.dailyForcastURL);
        console.log("zone id = ", projectData.zoneId);
        await getDailyForcastData(projectData.dailyForcastURL);
        await getAlertData(projectData.zoneId);
    } catch (e) {
        console.log("forecast URL error:", e);
    }
}

const getDailyForcastData = async (url) => {
    const forcastURL = await fetch(url);
    let forcast = [];
    try {
        const forcastData = await forcastURL.json();
        //console.log(forcastData.properties.periods)
        forcastData.properties.periods.forEach(day => {
            forcast.push({
                name: day.name,
                day: day.startTime,
                temp: day.temperature + day.temperatureUnit,
                precip:  day.probabilityOfPrecipitation.value == null ? 0 + '%' : day.probabilityOfPrecipitation.value + '%',
                dewpoint: day.dewpoint.value,
                humidity: day.relativeHumidity.value + "%",
                wind: day.windSpeed + " " + day.windDirection,
                icon: day.icon,
                shortDesc: day.shortForecast,
                detailDesc: day.detailedForecast
            })
        })
        weatherData.dailyForcast = forcast;
    } catch (e) {
        console.log("Forcast data error: ", e)
    }
}

const getAlertData = async (zone) => {
    const alertURL = await fetch(`https://api.weather.gov/alerts/active?zone=${zone}`)
    try {
        const alertData = await alertURL.json();
        projectData.alert = alertData
        weatherData.alert = {
            alertHeadline: alertData.features[0].properties.headline,
            alertAreas: "The Following Counties are Affected: " + alertData.features[0].properties.areaDesc,
            alertTextDesc: alertData.features[0].properties.description,
            alertStartTime: alertData.features[0].properties.effective,
            alertEndTime: alertData.features[0].properties.expires,
        }

    } catch(e) {
        console.log("Alert Data error: ", e)
    }
}

export default app;