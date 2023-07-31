# National_Weather

Weather web app built using Node.js, Express.js, Vue.js, and bundled using Vite.

Users can search for any location in the US by entering a city name and state or a ZIP code. The app will retrieve the weather data for the specified location and display it on the interface.

Weather information for the entered location includes temperature, humidity, wind speed/direction, rain chance, dewpoint, sunrise/sunset times, weather conditions (e.g., sunny, cloudy, rainy), weather alerts, and current air quality in 7-day forecast, current conditions, and a hourly forecast of the next 48 hours.

The app is designed to be responsive, adapting to different screen sizes and devices.

Node.js: Server-side scripting.

Express.js: Web framework for Node.js, is used to handle routing and middleware integration.

Vue.js: For dynamic and interactive user interface and data binding for single page application.

HTML/CSS: The app's structure and styling are implemented using HTML and CSS with a responsive design.

Geographic Location API: https://www.geonames.org/ API to fetch location data based on user input. Returns latitude and longitude for use in weather search (for accuracy).

Weather API: https://www.weather.gov API to fetch real-time weather data. The API provides access to various weather parameters with daily/hourly forecast information.

Air Quality API: https://docs.airnowapi.org/ API providing forecast and real-time observed air quality information across the United States.

Hosted at: https://weather-app-e871.onrender.com/ 

```[tasklist]
### TO DO: 
- [ ] Nighttime color styling and ability to switch automatically based on local time,
- [ ] Learn and implement chart.js for vue to display graphs of different weather info.
```

### Project Setup & Install Package

```sh
npm install
```

### Compile and Hot-Reload for Development with Vite

```sh
npm run dev
```

### Start express server with Node

```sh
npm run serve
```

### Compile and Minify for Production with Vite

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```