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
const aqiKey = process.env.aqi_key;
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
//changes 24 hour time to 12 hour with suffix
const get12HourFormat = (time) => {
    let timeSuffix;
    timeSuffix = (time >= 12) ? 'pm' : 'am';
    time = (time % 12 === 0) ? time = 12 : time % 12;
    return `${time}:00 ${timeSuffix}`
};
//changes ISO to (Month Day) format
const dateFormat = (date) => {
    const d = new Date(date)
    const monthValues = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthValues[d.getMonth()]} ${d.getDate()}`
};
//changes ISO to 12 hour time
const hourFormat = (date) => {
    const t = new Date(date)
    return get12HourFormat(t.getHours())
};

const getGeoData = async (req) => {
    let geoData = ''
    if (req.params.city !== 'no') {
        geoData = await fetch(`http://api.geonames.org/searchJSON?q=${req.params.city}&maxRows=1&username=${geoKey}`);
        try {
            const data = await geoData.json();
            //console.log(data)
            //populate weatherData with api data
            projectData.zoneData.long = data.geonames[0].lng;
            projectData.zoneData.lat = data.geonames[0].lat;
            projectData.zoneData.country = data.geonames[0].countryName;
            projectData.zoneData.local = data.geonames[0].adminName1;
            projectData.zoneData.name = data.geonames[0].name;
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
            projectData.zoneData.long = data.geonames[0].lng;
            projectData.zoneData.lat = data.geonames[0].lat;
            projectData.zoneData.country = data.geonames[0].countryName;
            projectData.zoneData.local = data.geonames[0].adminName1;
            projectData.zoneData.name = data.geonames[0].name;
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
        projectData.zoneData.dailyForecastURL = urlJson.properties.forecast;
        projectData.zoneData.hourlyForecastURL = urlJson.properties.forecastHourly;
        projectData.zoneData.zoneId = zoneJson.features[0].properties.id;
        projectData.zoneData.county = zoneJson.features[0].properties.name;

        while (projectData.weatherData.dailyForecast === undefined) {
            await getDailyForcastData(projectData.zoneData.dailyForecastURL);
        }
        while (projectData.weatherData.hourlyForecast === undefined) {
            await getHourlyForcastData(projectData.zoneData.hourlyForecastURL);
        }
        await getAirQuality(projectData.zoneData.lat, projectData.zoneData.long)
        await getAlertData(projectData.zoneData.zoneId);
    } catch (e) {
        console.log("forecast URL error:", e);
    }
};

const getDailyForcastData = async (url) => {
    const forcastURL = await fetch(url);
    const forecast = [];
    try {
        const forcastData = await forcastURL.json();
        //console.log(forcastData.properties.periods)
        forcastData.properties.periods.forEach(day => {
            forecast.push({
                name: day.name,
                day: dateFormat(day.startTime),
                temp: day.temperature + day.temperatureUnit,
                precip: day.probabilityOfPrecipitation.value == null ? 0 + '%' : day.probabilityOfPrecipitation.value + '%',
                dewpoint: cToF(day.dewpoint.value) + "F",
                humidity: day.relativeHumidity.value + "%",
                windSpeed: day.windSpeed,
                windDirection: day.windDirection,
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
    const forcastURL = await fetch(url);
    const forecastArr = [];
    try {
        const forcastData = await forcastURL.json()
        forcastData.properties.periods.forEach(hour => {
            forecastArr.push({
                time: hourFormat(hour.startTime),
                temp: hour.temperature + hour.temperatureUnit,
                precip: hour.probabilityOfPrecipitation.value == null ? 0 + '%' : hour.probabilityOfPrecipitation.value + '%',
                humidity: hour.relativeHumidity.value + "%",
                windSpeed: hour.windSpeed,
                windDirection: hour.windDirection,
                icon: hour.icon,
                shortDesc: hour.shortForecast
            })
        })
        //sliced out only the first 24 hours of the Hourly Forcast Data
        projectData.weatherData.hourlyForecast = forecastArr.slice(0, 23);
    } catch (e) {
        console.log("Hourly Forecast data error: ", e);
    }
};

const getAirQuality = async (lat, long) => {
    const aqiURL = await fetch(`https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${lat}&longitude=${long}&distance=50&API_KEY=${aqiKey}`);
    const aqiArr = []
    try {
        const aqiData = await aqiURL.json();
        aqiData.forEach(result => {
            aqiArr.push({
                hour: get12HourFormat(result.HourObserved),
                type: result.ParameterName === "O3" ? "Ozone" : result.ParameterName,
                value: result.AQI,
                categoryValue: result.Category.Number,
                categoryDesc: result.Category.Name
            })
        })
        projectData.weatherData.airQuality = aqiArr;
    } catch (e) {
        console.log("AQI data error: ", e);
    }
}

const getAlertData = async (zone) => {
    const alertURL = await fetch(`https://api.weather.gov/alerts/active?zone=${zone}`)
    let alertArr = []
    try {
        const alertData = await alertURL.json();
        alertData.features.forEach(alertItem => {
            alertArr.push({
                alertHeadline: alertItem.properties.headline,
                alertAreas: "The Following Counties are Affected: " + alertItem.properties.areaDesc,
                alertTextDesc: alertItem.properties.description,
                alertStartTime: alertItem.properties.effective,
                alertEndTime: alertItem.properties.expires,
            })
        })
        projectData.weatherData.alerts = alertArr;
    } catch (e) {
        console.log("Alert Data error: ", e);
    }
};

export default app;