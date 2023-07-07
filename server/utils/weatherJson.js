import fetch from "node-fetch";
import dotenv from 'dotenv';
import WeatherData from './weatherData.js';
import { cToF, get12HourFormat, dateFormat, hourFormat, removeTime } from './weatherUtils.js'

dotenv.config();
const geoKey = process.env.geonames_key;
const aqiKey = process.env.aqi_key;
const projectData = new WeatherData();

//main function to return filled in weatherData object to send to client
export const getGeoData = async (city, lat, long) => {
    let geoData = '';
    if (city !== 'no') {
        geoData = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoKey}`);
        try {
            const data = await geoData.json();
            //console.log(data)
            //populate weatherData with api data
            projectData.zoneData.long = data.geonames[0].lng;
            projectData.zoneData.lat = data.geonames[0].lat;
            projectData.zoneData.country = data.geonames[0].countryName;
            projectData.zoneData.local = data.geonames[0].adminName1;
            projectData.zoneData.name = data.geonames[0].name;
            await getZoneData();
        } catch (e) {
            console.log("Geo search data error", e);
        }
    }
    else if (lat !== 'no' && long !== 'no') {
        geoData = await fetch(`http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${long}&maxRows=1&username=${geoKey}`);
        try {
            const data = await geoData.json();
            //console.log(data)
            //populate weatherData with api data
            projectData.zoneData.long = data.geonames[0].lng;
            projectData.zoneData.lat = data.geonames[0].lat;
            projectData.zoneData.country = data.geonames[0].countryName;
            projectData.zoneData.local = data.geonames[0].adminName1;
            projectData.zoneData.name = data.geonames[0].name;
            await getZoneData();
        } catch (e) {
            console.log("Geo postal data error", e);
        }
    }
    return projectData;
};

const getAstroData = async (date) => {
    const astroURL = await fetch(`https://api.sunrise-sunset.org/json?lat=${projectData.zoneData.lat}&lng=${projectData.zoneData.long}&date=${date}`);
    try {
        const astroData = await astroURL.json();
        const sunrise = astroData.results.sunrise;
        const sunset = astroData.results.sunset;
        return {sunrise: sunrise, sunset: sunset}
    } catch (e) {
        console.log("Astro data error: ", e);
    }
}

//gets urls for forcasts, zone data, and County info for the following functions
const getZoneData = async () => {
    const getForcastURL = await fetch(`https://api.weather.gov/points/${projectData.zoneData.lat},${projectData.zoneData.long}`);
    const zoneId = await fetch(`https://api.weather.gov/zones/county?point=${projectData.zoneData.lat},${projectData.zoneData.long}`);
    try {
        const urlJson = await getForcastURL.json();
        const zoneJson = await zoneId.json();
        projectData.zoneData.dailyForecastURL = urlJson.properties.forecast;
        projectData.zoneData.hourlyForecastURL = urlJson.properties.forecastHourly;
        projectData.zoneData.zoneId = zoneJson.features[0].properties.id;
        projectData.zoneData.county = zoneJson.features[0].properties.name;

        //need while loop because weather.gov api sometimes needs multiple calls before it returns anything.
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
        for (const day of forcastData.properties.periods) {
            forecast.push({
                name: day.name,
                day: dateFormat(day.startTime),
                isDaytime: day.isDaytime,
                astro: day.isDaytime == true ? await getAstroData(removeTime(day.startTime)) : "",
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
        }
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
        for(const hour of forcastData.properties.periods) {
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
        }
        //sliced out only the first 24 hours of the Hourly Forcast Data
        projectData.weatherData.hourlyForecast = forecastArr.slice(0, 23);
    } catch (e) {
        console.log("Hourly Forecast data error: ", e);
    }
};

const getAirQuality = async (lat, long) => {
    const aqiURL = await fetch(`https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${lat}&longitude=${long}&distance=50&API_KEY=${aqiKey}`);
    const aqiArr = [];
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
};

const getAlertData = async (zone) => {
    const alertURL = await fetch(`https://api.weather.gov/alerts/active?zone=${zone}`);
    let alertArr = [];
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