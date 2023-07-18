# National_News_Weather

Weather web app built using Node.js, Express.js, Vue.js, and bundled with Vite.

Users can search for any location by entering a city name or ZIP code. The app will retrieve the weather data for the specified location and display it on the interface.

Weather information for the entered location includes temperature, humidity, wind speed/direction, rain chance, dewpoint, sunrise/sunset times, weather conditions (e.g., sunny, cloudy, rainy), and air quality in a 7-day forecast, current conditions, and hourly forecast for the next 48 hours.

The app is designed to be responsive, adapting to different screen sizes and devices.

Node.js: server-side scripting, enabling efficient handling of API requests and data processing.

Express.js: a web framework for Node.js, is used to handle routing and middleware integration, simplifying the development of server-side functionality.

Vue.js: allows for the creation of dynamic and interactive user interfaces, enabling seamless data binding and smooth user experience.

HTML/CSS: The app's structure and styling are implemented using HTML and CSS, ensuring a visually appealing and responsive design.

Geographic Location API: https://www.geonames.org/ API to fetch location data based on user input. Returns latitude and longitude for use in weather search (for accuracy).

Weather API: https://www.weather.gov API to fetch real-time weather data. The API provides access to various weather parameters with daily/hourly forecast information.

Air Quality API: https://docs.airnowapi.org/ API providing forecast and real-time observed air quality information across the United States.

Hosted at: https://weather-app-e871.onrender.com/ 

### TO DO: 
Use Vue composition API instead of options,
Have option to use GeoLocation for inital load of weather data,
~~Set up weather.gov api calls~~
~~Set up airnow api and functionality~~
Connditional styles to weather/news buttons when active,
Nighttime color styling and ability to switch automatically based on local time


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Start express server

```sh
npm run serve
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```