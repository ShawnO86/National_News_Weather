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
const projectData = {
    zoneData: {},
    weatherData: {}
};

app.get('/:city?/:lat?/:long?', async (req, res) => {
    await getGeoData(req);
    await getZoneData(projectData.zoneData.lat, projectData.zoneData.long)
    try {
        //console.log(weatherData)
        res.send(projectData)
    } catch (e) {
        console.log("Geo error", e)
    }
});

//celsius to fahrenheit
const cToF = (deg) => {
    return deg * 1.8 + 32;
};

const getGeoData = async (req) => {
    let geoData = ''
    if (req.params.city !== 'no') {
        geoData = await fetch(`http://api.geonames.org/searchJSON?q=${req.params.city}&maxRows=1&username=${geoKey}`);
        try {
            const data = await geoData.json();
            //console.log(data)
            //populate weatherData with api data
            projectData.zoneData = {
                long: data.geonames[0].lng,
                lat: data.geonames[0].lat,
                country: data.geonames[0].countryName,
                local: data.geonames[0].adminName1,
                name: data.geonames[0].name
            }
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
            projectData.zoneData = {
                long: data.geonames[0].lng,
                lat: data.geonames[0].lat,
                country: data.geonames[0].countryName,
                local: data.geonames[0].adminName1,
                name: data.geonames[0].name
            }
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
        projectData.zoneData = {
            dailyForecastURL: urlJson.properties.forecast,
            hourlyForecastURL: urlJson.properties.forecastHourly,
            zoneId: zoneJson.features[0].properties.id,
            county: zoneJson.features[0].properties.name
        }
        await getDailyForcastData(projectData.zoneData.dailyForecastURL);
        await getHourlyForcastData(projectData.zoneData.hourlyForecastURL);
        await getAlertData(projectData.zoneData.zoneId);
    } catch (e) {
        console.log("forecast URL error:", e);
    }
};

const getDailyForcastData = async (url) => {
    const forcastURL = await fetch(url);
    let forecast = [];
    try {
        const forcastData = await forcastURL.json();
        //console.log(forcastData.properties.periods)
        forcastData.properties.periods.forEach(day => {
            forecast.push({
                name: day.name,
                day: day.startTime,
                temp: day.temperature + day.temperatureUnit,
                precip: day.probabilityOfPrecipitation.value == null ? 0 + '%' : day.probabilityOfPrecipitation.value + '%',
                dewpoint: cToF(day.dewpoint.value) + "F",
                humidity: day.relativeHumidity.value + "%",
                wind: day.windSpeed + " " + day.windDirection,
                icon: day.icon,
                shortDesc: day.shortForecast,
                detailDesc: day.detailedForecast
            })
        })
        projectData.weatherData.dailyForecast = forecast;
    } catch (e) {
        console.log("Forcast data error: ", e)
    }
};

const getHourlyForcastData = async (url) => {
    const forcastURL = await fetch(url)
    let forecast = []
    try {
        const forcastData = await forcastURL.json()
        let forcastDataArr = forcastData.properties.periods;
        //only need 24 hours
        forcastDataArr.slice(0, 23)
        forcastDataArr.forEach(hour => {
            forecast.push({
                time: hour.startTime,
                temp: hour.temperature + hour.temperatureUnit,
                precip: hour.probabilityOfPrecipitation.value == null ? 0 + '%' : hour.probabilityOfPrecipitation.value + '%',
                humidity: hour.relativeHumidity.value + "%",
                wind: hour.windSpeed + " " + hour.windDirection,
                icon: hour.icon,
                shortDesc: hour.shortForecast
            })
        })
        projectData.weatherData.hourlyForecast = forecast;
    } catch (e) {
        console.log("Hourly Forecast data error: ", e);
    }
};

const getAlertData = async (zone) => {
    const alertURL = await fetch(`https://api.weather.gov/alerts/active?zone=${zone}`)
    try {
        const alertData = await alertURL.json();
        projectData.weatherData.alert = {
            alertHeadline: alertData.features[0].properties.headline,
            alertAreas: "The Following Counties are Affected: " + alertData.features[0].properties.areaDesc,
            alertTextDesc: alertData.features[0].properties.description,
            alertStartTime: alertData.features[0].properties.effective,
            alertEndTime: alertData.features[0].properties.expires,
        }
    } catch (e) {
        console.log("Alert Data error: ", e)
    }
};

export default app;