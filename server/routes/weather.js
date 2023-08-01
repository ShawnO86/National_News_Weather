import express from "express";
import cors from 'cors';
import { getGeoData } from "../utils/weatherJson.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// host/weather/city(optional)/lat(optional)/long(optional)
app.get('/getData:city?/:lat?/:long?', async (req, res) => {
    try {
        const weatherData = await getGeoData(req.params.city, req.params.lat, req.params.long);
        res.send(weatherData);
    } catch (e) {
        console.log("Geo error", e);
        res.status(500).send('Internal Server Error');
    }
});

const testData =
{
    "zoneData": {
        "long": "-89.094",
        "lat": "42.27113",
        "country": "US",
        "local": "Illinois",
        "name": "Rockford",
        "dailyForecastURL": "https://api.weather.gov/gridpoints/LOT/25,89/forecast",
        "hourlyForecastURL": "https://api.weather.gov/gridpoints/LOT/25,89/forecast/hourly",
        "zoneId": "ILC201",
        "county": "Winnebago"
    },
    "weatherData": {
        "dateUpdated": "2023-08-01",
        "dailyForecast": {
            "August 1": [
                {
                    "name": "This Afternoon",
                    "date": "August 1",
                    "isDaytime": true,
                    "astro": {
                        "sunrise": "2023-08-01T10:47:43+00:00",
                        "sunset": "2023-08-02T01:17:44+00:00"
                    },
                    "temp": "85F",
                    "precip": "20%",
                    "dewpoint": "65F",
                    "humidity": "58%",
                    "windSpeed": "5 to 10 mph",
                    "windDirection": "SSW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "detailDesc": "A slight chance of rain showers. Partly sunny. High near 85, with temperatures falling to around 83 in the afternoon. South southwest wind 5 to 10 mph. Chance of precipitation is 20%.",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers,20?size=small"
                },
                {
                    "name": "Tonight",
                    "date": "August 1",
                    "isDaytime": false,
                    "astro": "",
                    "temp": "64F",
                    "precip": "20%",
                    "dewpoint": "65F",
                    "humidity": "84%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Slight Chance Rain Showers then Mostly Cloudy",
                    "detailDesc": "A slight chance of rain showers before 7pm. Mostly cloudy, with a low around 64. South wind around 5 mph. Chance of precipitation is 20%.",
                    "icon": "https://api.weather.gov/icons/land/night/rain_showers,20/bkn?size=small"
                }
            ],
            "August 2": [
                {
                    "name": "Wednesday",
                    "date": "August 2",
                    "isDaytime": true,
                    "astro": {
                        "sunrise": "2023-08-02T10:48:44+00:00",
                        "sunset": "2023-08-03T01:16:34+00:00"
                    },
                    "temp": "87F",
                    "precip": "0%",
                    "dewpoint": "63F",
                    "humidity": "84%",
                    "windSpeed": "5 to 10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "detailDesc": "Mostly sunny, with a high near 87. South wind 5 to 10 mph.",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "name": "Wednesday Night",
                    "date": "August 2",
                    "isDaytime": false,
                    "astro": "",
                    "temp": "63F",
                    "precip": "0%",
                    "dewpoint": "66F",
                    "humidity": "100%",
                    "windSpeed": "5 to 10 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "detailDesc": "Partly cloudy, with a low around 63. South wind 5 to 10 mph.",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                }
            ],
            "August 3": [
                {
                    "name": "Thursday",
                    "date": "August 3",
                    "isDaytime": true,
                    "astro": {
                        "sunrise": "2023-08-03T10:49:46+00:00",
                        "sunset": "2023-08-04T01:15:23+00:00"
                    },
                    "temp": "87F",
                    "precip": "0%",
                    "dewpoint": "69F",
                    "humidity": "100%",
                    "windSpeed": "5 mph",
                    "windDirection": "WSW",
                    "shortDesc": "Mostly Sunny",
                    "detailDesc": "Mostly sunny, with a high near 87. West southwest wind around 5 mph, with gusts as high as 10 mph.",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "name": "Thursday Night",
                    "date": "August 3",
                    "isDaytime": false,
                    "astro": "",
                    "temp": "65F",
                    "precip": "0%",
                    "dewpoint": "69F",
                    "humidity": "97%",
                    "windSpeed": "5 to 10 mph",
                    "windDirection": "NE",
                    "shortDesc": "Partly Cloudy",
                    "detailDesc": "Partly cloudy, with a low around 65.",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                }
            ],
            "August 4": [
                {
                    "name": "Friday",
                    "date": "August 4",
                    "isDaytime": true,
                    "astro": {
                        "sunrise": "2023-08-04T10:50:48+00:00",
                        "sunset": "2023-08-05T01:14:11+00:00"
                    },
                    "temp": "85F",
                    "precip": "0%",
                    "dewpoint": "65F",
                    "humidity": "100%",
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "NE",
                    "shortDesc": "Mostly Sunny",
                    "detailDesc": "Mostly sunny, with a high near 85.",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "name": "Friday Night",
                    "date": "August 4",
                    "isDaytime": false,
                    "astro": "",
                    "temp": "60F",
                    "precip": "0%",
                    "dewpoint": "62F",
                    "humidity": "100%",
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "ENE",
                    "shortDesc": "Mostly Cloudy then Slight Chance Rain Showers",
                    "detailDesc": "A slight chance of rain showers after 1am. Mostly cloudy, with a low around 60.",
                    "icon": "https://api.weather.gov/icons/land/night/bkn/rain_showers?size=small"
                }
            ],
            "August 5": [
                {
                    "name": "Saturday",
                    "date": "August 5",
                    "isDaytime": true,
                    "astro": {
                        "sunrise": "2023-08-05T10:51:50+00:00",
                        "sunset": "2023-08-06T01:12:57+00:00"
                    },
                    "temp": "82F",
                    "precip": "0%",
                    "dewpoint": "63F",
                    "humidity": "100%",
                    "windSpeed": "10 mph",
                    "windDirection": "E",
                    "shortDesc": "Chance Rain Showers",
                    "detailDesc": "A chance of rain showers. Partly sunny, with a high near 82.",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
                },
                {
                    "name": "Saturday Night",
                    "date": "August 5",
                    "isDaytime": false,
                    "astro": "",
                    "temp": "62F",
                    "precip": "0%",
                    "dewpoint": "62F",
                    "humidity": "100%",
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "ESE",
                    "shortDesc": "Chance Showers And Thunderstorms",
                    "detailDesc": "A chance of rain showers before 7pm, then a chance of showers and thunderstorms. Mostly cloudy, with a low around 62.",
                    "icon": "https://api.weather.gov/icons/land/night/tsra_sct?size=small"
                }
            ],
            "August 6": [
                {
                    "name": "Sunday",
                    "date": "August 6",
                    "isDaytime": true,
                    "astro": {
                        "sunrise": "2023-08-06T10:52:53+00:00",
                        "sunset": "2023-08-07T01:11:41+00:00"
                    },
                    "temp": "80F",
                    "precip": "0%",
                    "dewpoint": "65F",
                    "humidity": "100%",
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Chance Showers And Thunderstorms",
                    "detailDesc": "A chance of showers and thunderstorms. Mostly sunny, with a high near 80.",
                    "icon": "https://api.weather.gov/icons/land/day/tsra_hi?size=small"
                },
                {
                    "name": "Sunday Night",
                    "date": "August 6",
                    "isDaytime": false,
                    "astro": "",
                    "temp": "60F",
                    "precip": "0%",
                    "dewpoint": "64F",
                    "humidity": "100%",
                    "windSpeed": "15 mph",
                    "windDirection": "W",
                    "shortDesc": "Chance Showers And Thunderstorms",
                    "detailDesc": "A chance of showers and thunderstorms. Partly cloudy, with a low around 60.",
                    "icon": "https://api.weather.gov/icons/land/night/tsra_hi?size=small"
                }
            ],
            "August 7": [
                {
                    "name": "Monday",
                    "date": "August 7",
                    "isDaytime": true,
                    "astro": {
                        "sunrise": "2023-08-07T10:53:55+00:00",
                        "sunset": "2023-08-08T01:10:24+00:00"
                    },
                    "temp": "81F",
                    "precip": "0%",
                    "dewpoint": "64F",
                    "humidity": "100%",
                    "windSpeed": "15 mph",
                    "windDirection": "WNW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "detailDesc": "A slight chance of rain showers. Mostly sunny, with a high near 81.",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
                },
                {
                    "name": "Monday Night",
                    "date": "August 7",
                    "isDaytime": false,
                    "astro": "",
                    "temp": "60F",
                    "precip": "0%",
                    "dewpoint": "64F",
                    "humidity": "97%",
                    "windSpeed": "10 to 15 mph",
                    "windDirection": "WNW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "detailDesc": "A slight chance of rain showers before 1am. Mostly cloudy, with a low around 60.",
                    "icon": "https://api.weather.gov/icons/land/night/rain_showers?size=small"
                }
            ]
        },
        "airQualityCurrent": [],
        "airQualityForecast": [
            {
                "date": "August 1",
                "type": "Ozone",
                "categoryValue": 2,
                "categoryDesc": "Moderate"
            },
            {
                "date": "August 1",
                "type": "PM2.5",
                "categoryValue": 2,
                "categoryDesc": "Moderate"
            },
            {
                "date": "August 2",
                "type": "Ozone",
                "categoryValue": 2,
                "categoryDesc": "Moderate"
            },
            {
                "date": "August 2",
                "type": "PM2.5",
                "categoryValue": 2,
                "categoryDesc": "Moderate"
            }
        ],
        "hourlyForecast": {
            "August 1": [
                {
                    "date": "August 1",
                    "time": "1:00 pm",
                    "isDaytime": true,
                    "temp": "81F",
                    "precip": "15%",
                    "humidity": "58%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
                },
                {
                    "date": "August 1",
                    "time": "2:00 pm",
                    "isDaytime": true,
                    "temp": "82F",
                    "precip": "15%",
                    "humidity": "55%",
                    "windSpeed": "10 mph",
                    "windDirection": "SSW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
                },
                {
                    "date": "August 1",
                    "time": "3:00 pm",
                    "isDaytime": true,
                    "temp": "83F",
                    "precip": "15%",
                    "humidity": "54%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
                },
                {
                    "date": "August 1",
                    "time": "4:00 pm",
                    "isDaytime": true,
                    "temp": "84F",
                    "precip": "15%",
                    "humidity": "52%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
                },
                {
                    "date": "August 1",
                    "time": "5:00 pm",
                    "isDaytime": true,
                    "temp": "83F",
                    "precip": "15%",
                    "humidity": "53%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
                },
                {
                    "date": "August 1",
                    "time": "6:00 pm",
                    "isDaytime": false,
                    "temp": "83F",
                    "precip": "15%",
                    "humidity": "54%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSW",
                    "shortDesc": "Slight Chance Rain Showers",
                    "icon": "https://api.weather.gov/icons/land/night/rain_showers?size=small"
                },
                {
                    "date": "August 1",
                    "time": "7:00 pm",
                    "isDaytime": false,
                    "temp": "81F",
                    "precip": "2%",
                    "humidity": "57%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                },
                {
                    "date": "August 1",
                    "time": "8:00 pm",
                    "isDaytime": false,
                    "temp": "79F",
                    "precip": "2%",
                    "humidity": "62%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                },
                {
                    "date": "August 1",
                    "time": "9:00 pm",
                    "isDaytime": false,
                    "temp": "76F",
                    "precip": "2%",
                    "humidity": "68%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Mostly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                },
                {
                    "date": "August 1",
                    "time": "10:00 pm",
                    "isDaytime": false,
                    "temp": "73F",
                    "precip": "2%",
                    "humidity": "73%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Mostly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                },
                {
                    "date": "August 1",
                    "time": "11:00 pm",
                    "isDaytime": false,
                    "temp": "71F",
                    "precip": "2%",
                    "humidity": "76%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Mostly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                }
            ],
            "August 2": [
                {
                    "date": "August 2",
                    "time": "12:00 am",
                    "isDaytime": false,
                    "temp": "71F",
                    "precip": "2%",
                    "humidity": "76%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "1:00 am",
                    "isDaytime": false,
                    "temp": "69F",
                    "precip": "3%",
                    "humidity": "78%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "2:00 am",
                    "isDaytime": false,
                    "temp": "69F",
                    "precip": "3%",
                    "humidity": "78%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "3:00 am",
                    "isDaytime": false,
                    "temp": "67F",
                    "precip": "3%",
                    "humidity": "81%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "4:00 am",
                    "isDaytime": false,
                    "temp": "66F",
                    "precip": "3%",
                    "humidity": "81%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "5:00 am",
                    "isDaytime": false,
                    "temp": "65F",
                    "precip": "3%",
                    "humidity": "84%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "6:00 am",
                    "isDaytime": true,
                    "temp": "64F",
                    "precip": "3%",
                    "humidity": "84%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "7:00 am",
                    "isDaytime": true,
                    "temp": "66F",
                    "precip": "5%",
                    "humidity": "81%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSE",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "8:00 am",
                    "isDaytime": true,
                    "temp": "71F",
                    "precip": "5%",
                    "humidity": "71%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "9:00 am",
                    "isDaytime": true,
                    "temp": "76F",
                    "precip": "5%",
                    "humidity": "62%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "10:00 am",
                    "isDaytime": true,
                    "temp": "80F",
                    "precip": "5%",
                    "humidity": "54%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "11:00 am",
                    "isDaytime": true,
                    "temp": "82F",
                    "precip": "5%",
                    "humidity": "51%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "12:00 pm",
                    "isDaytime": true,
                    "temp": "84F",
                    "precip": "5%",
                    "humidity": "48%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "1:00 pm",
                    "isDaytime": true,
                    "temp": "85F",
                    "precip": "6%",
                    "humidity": "48%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "2:00 pm",
                    "isDaytime": true,
                    "temp": "86F",
                    "precip": "6%",
                    "humidity": "46%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "3:00 pm",
                    "isDaytime": true,
                    "temp": "87F",
                    "precip": "6%",
                    "humidity": "45%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "4:00 pm",
                    "isDaytime": true,
                    "temp": "87F",
                    "precip": "6%",
                    "humidity": "45%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "5:00 pm",
                    "isDaytime": true,
                    "temp": "86F",
                    "precip": "6%",
                    "humidity": "46%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "6:00 pm",
                    "isDaytime": false,
                    "temp": "83F",
                    "precip": "6%",
                    "humidity": "51%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                },
                {
                    "date": "August 2",
                    "time": "7:00 pm",
                    "isDaytime": false,
                    "temp": "80F",
                    "precip": "3%",
                    "humidity": "58%",
                    "windSpeed": "10 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "8:00 pm",
                    "isDaytime": false,
                    "temp": "76F",
                    "precip": "3%",
                    "humidity": "69%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "9:00 pm",
                    "isDaytime": false,
                    "temp": "72F",
                    "precip": "3%",
                    "humidity": "79%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "10:00 pm",
                    "isDaytime": false,
                    "temp": "69F",
                    "precip": "3%",
                    "humidity": "90%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 2",
                    "time": "11:00 pm",
                    "isDaytime": false,
                    "temp": "68F",
                    "precip": "3%",
                    "humidity": "90%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                }
            ],
            "August 3": [
                {
                    "date": "August 3",
                    "time": "12:00 am",
                    "isDaytime": false,
                    "temp": "67F",
                    "precip": "3%",
                    "humidity": "93%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "1:00 am",
                    "isDaytime": false,
                    "temp": "67F",
                    "precip": "6%",
                    "humidity": "93%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "2:00 am",
                    "isDaytime": false,
                    "temp": "66F",
                    "precip": "6%",
                    "humidity": "97%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "3:00 am",
                    "isDaytime": false,
                    "temp": "65F",
                    "precip": "6%",
                    "humidity": "100%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "4:00 am",
                    "isDaytime": false,
                    "temp": "64F",
                    "precip": "6%",
                    "humidity": "100%",
                    "windSpeed": "5 mph",
                    "windDirection": "SSW",
                    "shortDesc": "Mostly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                },
                {
                    "date": "August 3",
                    "time": "5:00 am",
                    "isDaytime": false,
                    "temp": "63F",
                    "precip": "6%",
                    "humidity": "100%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Partly Cloudy",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "6:00 am",
                    "isDaytime": true,
                    "temp": "63F",
                    "precip": "6%",
                    "humidity": "100%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "7:00 am",
                    "isDaytime": true,
                    "temp": "64F",
                    "precip": "5%",
                    "humidity": "100%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "8:00 am",
                    "isDaytime": true,
                    "temp": "67F",
                    "precip": "5%",
                    "humidity": "97%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "9:00 am",
                    "isDaytime": true,
                    "temp": "70F",
                    "precip": "5%",
                    "humidity": "90%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "10:00 am",
                    "isDaytime": true,
                    "temp": "74F",
                    "precip": "5%",
                    "humidity": "82%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "11:00 am",
                    "isDaytime": true,
                    "temp": "77F",
                    "precip": "5%",
                    "humidity": "76%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "12:00 pm",
                    "isDaytime": true,
                    "temp": "80F",
                    "precip": "5%",
                    "humidity": "69%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                },
                {
                    "date": "August 3",
                    "time": "1:00 pm",
                    "isDaytime": true,
                    "temp": "82F",
                    "precip": "9%",
                    "humidity": "65%",
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "shortDesc": "Mostly Sunny",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                }
            ]
        },
        "alerts": []
    }
}

app.get('/test', async (req, res) => {
    res.send(testData)
})

export default app;