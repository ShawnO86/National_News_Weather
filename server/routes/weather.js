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
            "dailyForecast": {
                "July 31": [
                    {
                        "name": "Today",
                        "date": "July 31",
                        "isDaytime": true,
                        "astro": {
                            "sunrise": "2023-07-31T10:46:42+00:00",
                            "sunset": "2023-08-01T01:18:52+00:00"
                        },
                        "temp": "83F",
                        "precip": "0%",
                        "dewpoint": "62F",
                        "humidity": "84%",
                        "windSpeed": "5 mph",
                        "windDirection": "W",
                        "shortDesc": "Sunny",
                        "detailDesc": "Sunny, with a high near 83. West wind around 5 mph.",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "name": "Tonight",
                        "date": "July 31",
                        "isDaytime": false,
                        "astro": "",
                        "temp": "60F",
                        "precip": "0%",
                        "dewpoint": "61F",
                        "humidity": "90%",
                        "windSpeed": "0 to 5 mph",
                        "windDirection": "ENE",
                        "shortDesc": "Partly Cloudy",
                        "detailDesc": "Partly cloudy, with a low around 60. East northeast wind 0 to 5 mph.",
                        "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                    }
                ],
                "August 1": [
                    {
                        "name": "Tuesday",
                        "date": "August 1",
                        "isDaytime": true,
                        "astro": {
                            "sunrise": "2023-08-01T10:47:43+00:00",
                            "sunset": "2023-08-02T01:17:44+00:00"
                        },
                        "temp": "85F",
                        "precip": "0%",
                        "dewpoint": "63F",
                        "humidity": "93%",
                        "windSpeed": "0 to 5 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Mostly Sunny",
                        "detailDesc": "Mostly sunny, with a high near 85. East southeast wind 0 to 5 mph.",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "name": "Tuesday Night",
                        "date": "August 1",
                        "isDaytime": false,
                        "astro": "",
                        "temp": "64F",
                        "precip": "0%",
                        "dewpoint": "63F",
                        "humidity": "87%",
                        "windSpeed": "5 to 10 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Cloudy",
                        "detailDesc": "Mostly cloudy, with a low around 64. Southeast wind 5 to 10 mph.",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
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
                        "temp": "84F",
                        "precip": "20%",
                        "dewpoint": "66F",
                        "humidity": "87%",
                        "windSpeed": "5 to 10 mph",
                        "windDirection": "S",
                        "shortDesc": "Slight Chance Rain Showers",
                        "detailDesc": "A slight chance of rain showers after 7am. Mostly sunny, with a high near 84. South wind 5 to 10 mph, with gusts as high as 20 mph. Chance of precipitation is 20%.",
                        "icon": "https://api.weather.gov/icons/land/day/rain_showers,20?size=small"
                    },
                    {
                        "name": "Wednesday Night",
                        "date": "August 2",
                        "isDaytime": false,
                        "astro": "",
                        "temp": "64F",
                        "precip": "20%",
                        "dewpoint": "66F",
                        "humidity": "100%",
                        "windSpeed": "5 to 10 mph",
                        "windDirection": "S",
                        "shortDesc": "Slight Chance Rain Showers",
                        "detailDesc": "A slight chance of rain showers. Partly cloudy, with a low around 64. Chance of precipitation is 20%.",
                        "icon": "https://api.weather.gov/icons/land/night/rain_showers,20?size=small"
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
                        "precip": "20%",
                        "dewpoint": "69F",
                        "humidity": "100%",
                        "windSpeed": "5 to 10 mph",
                        "windDirection": "SE",
                        "shortDesc": "Slight Chance Rain Showers then Mostly Sunny",
                        "detailDesc": "A slight chance of rain showers before 7am. Mostly sunny, with a high near 87. Chance of precipitation is 20%.",
                        "icon": "https://api.weather.gov/icons/land/day/rain_showers,20/sct?size=small"
                    },
                    {
                        "name": "Thursday Night",
                        "date": "August 3",
                        "isDaytime": false,
                        "astro": "",
                        "temp": "66F",
                        "precip": "0%",
                        "dewpoint": "68F",
                        "humidity": "97%",
                        "windSpeed": "5 to 10 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Mostly Cloudy",
                        "detailDesc": "Mostly cloudy, with a low around 66.",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
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
                        "temp": "86F",
                        "precip": "0%",
                        "dewpoint": "68F",
                        "humidity": "97%",
                        "windSpeed": "10 mph",
                        "windDirection": "NNE",
                        "shortDesc": "Mostly Sunny then Slight Chance Showers And Thunderstorms",
                        "detailDesc": "A slight chance of showers and thunderstorms after 1pm. Mostly sunny, with a high near 86.",
                        "icon": "https://api.weather.gov/icons/land/day/sct/tsra_hi?size=small"
                    },
                    {
                        "name": "Friday Night",
                        "date": "August 4",
                        "isDaytime": false,
                        "astro": "",
                        "temp": "60F",
                        "precip": "0%",
                        "dewpoint": "64F",
                        "humidity": "97%",
                        "windSpeed": "10 to 15 mph",
                        "windDirection": "ENE",
                        "shortDesc": "Slight Chance Showers And Thunderstorms",
                        "detailDesc": "A slight chance of showers and thunderstorms before 1am. Partly cloudy, with a low around 60.",
                        "icon": "https://api.weather.gov/icons/land/night/tsra_hi?size=small"
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
                        "temp": "83F",
                        "precip": "0%",
                        "dewpoint": "64F",
                        "humidity": "100%",
                        "windSpeed": "10 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Sunny",
                        "detailDesc": "Mostly sunny, with a high near 83.",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "name": "Saturday Night",
                        "date": "August 5",
                        "isDaytime": false,
                        "astro": "",
                        "temp": "60F",
                        "precip": "0%",
                        "dewpoint": "63F",
                        "humidity": "100%",
                        "windSpeed": "10 to 15 mph",
                        "windDirection": "E",
                        "shortDesc": "Slight Chance Showers And Thunderstorms",
                        "detailDesc": "A slight chance of showers and thunderstorms after 7pm. Partly cloudy, with a low around 60.",
                        "icon": "https://api.weather.gov/icons/land/night/tsra_hi?size=small"
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
                        "temp": "82F",
                        "precip": "0%",
                        "dewpoint": "64F",
                        "humidity": "100%",
                        "windSpeed": "10 to 15 mph",
                        "windDirection": "N",
                        "shortDesc": "Slight Chance Showers And Thunderstorms",
                        "detailDesc": "A slight chance of showers and thunderstorms. Mostly sunny, with a high near 82.",
                        "icon": "https://api.weather.gov/icons/land/day/tsra_hi?size=small"
                    },
                    {
                        "name": "Sunday Night",
                        "date": "August 6",
                        "isDaytime": false,
                        "astro": "",
                        "temp": "61F",
                        "precip": "0%",
                        "dewpoint": "62F",
                        "humidity": "90%",
                        "windSpeed": "10 to 15 mph",
                        "windDirection": "NNW",
                        "shortDesc": "Slight Chance Showers And Thunderstorms",
                        "detailDesc": "A slight chance of showers and thunderstorms. Partly cloudy, with a low around 61.",
                        "icon": "https://api.weather.gov/icons/land/night/tsra_hi?size=small"
                    }
                ]
            },
            "airQualityCurrent": [
                {
                    "hour": "7:00 am",
                    "type": "Ozone",
                    "value": 10,
                    "categoryValue": 1,
                    "categoryDesc": "Good"
                },
                {
                    "hour": "7:00 am",
                    "type": "PM2.5",
                    "value": 34,
                    "categoryValue": 1,
                    "categoryDesc": "Good"
                }
            ],
            "hourlyForecast": {
                "July 31": [
                    {
                        "date": "July 31",
                        "time": "8:00 am",
                        "isDaytime": true,
                        "temp": "65F",
                        "precip": "0%",
                        "humidity": "84%",
                        "windSpeed": "5 mph",
                        "windDirection": "W",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "9:00 am",
                        "isDaytime": true,
                        "temp": "68F",
                        "precip": "0%",
                        "humidity": "78%",
                        "windSpeed": "5 mph",
                        "windDirection": "WSW",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "10:00 am",
                        "isDaytime": true,
                        "temp": "73F",
                        "precip": "0%",
                        "humidity": "66%",
                        "windSpeed": "5 mph",
                        "windDirection": "WSW",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "11:00 am",
                        "isDaytime": true,
                        "temp": "75F",
                        "precip": "0%",
                        "humidity": "62%",
                        "windSpeed": "5 mph",
                        "windDirection": "WSW",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "12:00 pm",
                        "isDaytime": true,
                        "temp": "77F",
                        "precip": "0%",
                        "humidity": "60%",
                        "windSpeed": "5 mph",
                        "windDirection": "WSW",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "1:00 pm",
                        "isDaytime": true,
                        "temp": "78F",
                        "precip": "0%",
                        "humidity": "58%",
                        "windSpeed": "5 mph",
                        "windDirection": "W",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "2:00 pm",
                        "isDaytime": true,
                        "temp": "81F",
                        "precip": "0%",
                        "humidity": "53%",
                        "windSpeed": "5 mph",
                        "windDirection": "W",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "3:00 pm",
                        "isDaytime": true,
                        "temp": "82F",
                        "precip": "0%",
                        "humidity": "49%",
                        "windSpeed": "5 mph",
                        "windDirection": "NW",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "4:00 pm",
                        "isDaytime": true,
                        "temp": "82F",
                        "precip": "0%",
                        "humidity": "49%",
                        "windSpeed": "5 mph",
                        "windDirection": "NNW",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "5:00 pm",
                        "isDaytime": true,
                        "temp": "83F",
                        "precip": "0%",
                        "humidity": "47%",
                        "windSpeed": "5 mph",
                        "windDirection": "NNW",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "6:00 pm",
                        "isDaytime": false,
                        "temp": "82F",
                        "precip": "0%",
                        "humidity": "49%",
                        "windSpeed": "5 mph",
                        "windDirection": "NNW",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "7:00 pm",
                        "isDaytime": false,
                        "temp": "80F",
                        "precip": "0%",
                        "humidity": "52%",
                        "windSpeed": "5 mph",
                        "windDirection": "N",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "8:00 pm",
                        "isDaytime": false,
                        "temp": "78F",
                        "precip": "0%",
                        "humidity": "56%",
                        "windSpeed": "0 mph",
                        "windDirection": "N",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "9:00 pm",
                        "isDaytime": false,
                        "temp": "74F",
                        "precip": "0%",
                        "humidity": "64%",
                        "windSpeed": "5 mph",
                        "windDirection": "ENE",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "10:00 pm",
                        "isDaytime": false,
                        "temp": "70F",
                        "precip": "0%",
                        "humidity": "71%",
                        "windSpeed": "5 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "July 31",
                        "time": "11:00 pm",
                        "isDaytime": false,
                        "temp": "67F",
                        "precip": "0%",
                        "humidity": "78%",
                        "windSpeed": "5 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    }
                ],
                "August 1": [
                    {
                        "date": "August 1",
                        "time": "12:00 am",
                        "isDaytime": false,
                        "temp": "66F",
                        "precip": "0%",
                        "humidity": "81%",
                        "windSpeed": "0 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "1:00 am",
                        "isDaytime": false,
                        "temp": "64F",
                        "precip": "0%",
                        "humidity": "84%",
                        "windSpeed": "0 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "2:00 am",
                        "isDaytime": false,
                        "temp": "64F",
                        "precip": "0%",
                        "humidity": "84%",
                        "windSpeed": "0 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "3:00 am",
                        "isDaytime": false,
                        "temp": "63F",
                        "precip": "0%",
                        "humidity": "87%",
                        "windSpeed": "0 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Clear",
                        "icon": "https://api.weather.gov/icons/land/night/few?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "4:00 am",
                        "isDaytime": false,
                        "temp": "62F",
                        "precip": "0%",
                        "humidity": "87%",
                        "windSpeed": "0 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Partly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "5:00 am",
                        "isDaytime": false,
                        "temp": "61F",
                        "precip": "0%",
                        "humidity": "90%",
                        "windSpeed": "0 mph",
                        "windDirection": "ENE",
                        "shortDesc": "Partly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "6:00 am",
                        "isDaytime": true,
                        "temp": "60F",
                        "precip": "0%",
                        "humidity": "93%",
                        "windSpeed": "0 mph",
                        "windDirection": "ENE",
                        "shortDesc": "Mostly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "7:00 am",
                        "isDaytime": true,
                        "temp": "62F",
                        "precip": "0%",
                        "humidity": "90%",
                        "windSpeed": "0 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "8:00 am",
                        "isDaytime": true,
                        "temp": "66F",
                        "precip": "0%",
                        "humidity": "84%",
                        "windSpeed": "0 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "9:00 am",
                        "isDaytime": true,
                        "temp": "71F",
                        "precip": "0%",
                        "humidity": "76%",
                        "windSpeed": "5 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "10:00 am",
                        "isDaytime": true,
                        "temp": "77F",
                        "precip": "0%",
                        "humidity": "62%",
                        "windSpeed": "5 mph",
                        "windDirection": "SE",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "11:00 am",
                        "isDaytime": true,
                        "temp": "80F",
                        "precip": "0%",
                        "humidity": "56%",
                        "windSpeed": "5 mph",
                        "windDirection": "SE",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "12:00 pm",
                        "isDaytime": true,
                        "temp": "81F",
                        "precip": "0%",
                        "humidity": "54%",
                        "windSpeed": "5 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "1:00 pm",
                        "isDaytime": true,
                        "temp": "82F",
                        "precip": "0%",
                        "humidity": "51%",
                        "windSpeed": "5 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/few?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "2:00 pm",
                        "isDaytime": true,
                        "temp": "83F",
                        "precip": "0%",
                        "humidity": "49%",
                        "windSpeed": "5 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Mostly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "3:00 pm",
                        "isDaytime": true,
                        "temp": "84F",
                        "precip": "0%",
                        "humidity": "49%",
                        "windSpeed": "5 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "4:00 pm",
                        "isDaytime": true,
                        "temp": "85F",
                        "precip": "0%",
                        "humidity": "48%",
                        "windSpeed": "5 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "5:00 pm",
                        "isDaytime": true,
                        "temp": "85F",
                        "precip": "0%",
                        "humidity": "48%",
                        "windSpeed": "5 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Mostly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "6:00 pm",
                        "isDaytime": false,
                        "temp": "84F",
                        "precip": "0%",
                        "humidity": "49%",
                        "windSpeed": "5 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "7:00 pm",
                        "isDaytime": false,
                        "temp": "81F",
                        "precip": "5%",
                        "humidity": "54%",
                        "windSpeed": "5 mph",
                        "windDirection": "E",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "8:00 pm",
                        "isDaytime": false,
                        "temp": "78F",
                        "precip": "5%",
                        "humidity": "60%",
                        "windSpeed": "5 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "9:00 pm",
                        "isDaytime": false,
                        "temp": "74F",
                        "precip": "5%",
                        "humidity": "66%",
                        "windSpeed": "5 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "10:00 pm",
                        "isDaytime": false,
                        "temp": "71F",
                        "precip": "5%",
                        "humidity": "73%",
                        "windSpeed": "5 mph",
                        "windDirection": "ESE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 1",
                        "time": "11:00 pm",
                        "isDaytime": false,
                        "temp": "69F",
                        "precip": "5%",
                        "humidity": "78%",
                        "windSpeed": "5 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    }
                ],
                "August 2": [
                    {
                        "date": "August 2",
                        "time": "12:00 am",
                        "isDaytime": false,
                        "temp": "68F",
                        "precip": "5%",
                        "humidity": "78%",
                        "windSpeed": "10 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 2",
                        "time": "1:00 am",
                        "isDaytime": false,
                        "temp": "67F",
                        "precip": "11%",
                        "humidity": "81%",
                        "windSpeed": "10 mph",
                        "windDirection": "SE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 2",
                        "time": "2:00 am",
                        "isDaytime": false,
                        "temp": "67F",
                        "precip": "11%",
                        "humidity": "81%",
                        "windSpeed": "10 mph",
                        "windDirection": "SSE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 2",
                        "time": "3:00 am",
                        "isDaytime": false,
                        "temp": "66F",
                        "precip": "11%",
                        "humidity": "81%",
                        "windSpeed": "10 mph",
                        "windDirection": "SSE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 2",
                        "time": "4:00 am",
                        "isDaytime": false,
                        "temp": "65F",
                        "precip": "11%",
                        "humidity": "84%",
                        "windSpeed": "10 mph",
                        "windDirection": "SSE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 2",
                        "time": "5:00 am",
                        "isDaytime": false,
                        "temp": "64F",
                        "precip": "11%",
                        "humidity": "87%",
                        "windSpeed": "10 mph",
                        "windDirection": "SSE",
                        "shortDesc": "Mostly Cloudy",
                        "icon": "https://api.weather.gov/icons/land/night/bkn?size=small"
                    },
                    {
                        "date": "August 2",
                        "time": "6:00 am",
                        "isDaytime": true,
                        "temp": "64F",
                        "precip": "11%",
                        "humidity": "87%",
                        "windSpeed": "5 mph",
                        "windDirection": "SSE",
                        "shortDesc": "Partly Sunny",
                        "icon": "https://api.weather.gov/icons/land/day/bkn?size=small"
                    },
                    {
                        "date": "August 2",
                        "time": "7:00 am",
                        "isDaytime": true,
                        "temp": "65F",
                        "precip": "20%",
                        "humidity": "87%",
                        "windSpeed": "5 mph",
                        "windDirection": "SSE",
                        "shortDesc": "Slight Chance Rain Showers",
                        "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
                    },
                    {
                        "date": "August 2",
                        "time": "8:00 am",
                        "isDaytime": true,
                        "temp": "68F",
                        "precip": "20%",
                        "humidity": "81%",
                        "windSpeed": "5 mph",
                        "windDirection": "SSE",
                        "shortDesc": "Slight Chance Rain Showers",
                        "icon": "https://api.weather.gov/icons/land/day/rain_showers?size=small"
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