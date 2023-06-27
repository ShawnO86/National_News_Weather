# National_News_Weather

Weather web app built using Node.js, Express.js, Vue.js, and bundled with Vite.

Users can search for any location by entering a city name or ZIP code. The app will retrieve the weather data for the specified location and display it on the interface.

Weather information for the selected location includes temperature, humidity, wind speed, UV index, rain chance, sunrise/sunset times, and weather conditions (e.g., sunny, cloudy, rainy) in a 7-day forecast.

The app is designed to be responsive, adapting to different screen sizes and devices.

Node.js: server-side scripting, enabling efficient handling of API requests and data processing.

Express.js: a web framework for Node.js, is used to handle routing and middleware integration, simplifying the development of server-side functionality.

Vue.js: allows for the creation of dynamic and interactive user interfaces, enabling seamless data binding and smooth user experience.

HTML/CSS: The app's structure and styling are implemented using HTML and CSS, ensuring a visually appealing and responsive design.

Geographic Location API: https://www.geonames.org/ API to fetch location data based on user input. Returns latitude and longitude for use in weather search (for accuracy).

Weather API: https://www.weatherbit.io/ API to fetch real-time weather data. The API provides access to various weather parameters, such as temperature, humidity, wind speed, and forecast information.

Air Quality API: https://docs.airnowapi.org/ API providing forecast and real-time observed air quality information across the United States.

News API: https://newsapi.org/ API to fetch articles and news headlines from many different sources and blogs across the web.

Sentiment Analysis & Document Summary and Analytics API: https://www.meaningcloud.com/ API to analyze key concepts and sentiment of the news articles and blogs provided by the news API.

Hosted at: https://weather-app-e871.onrender.com/ 

### TO DO: 
~~Use current weather endpoint for weather by the hour + severe weather alerts for header area,~~
~~Use GeoLocation for inital load of weather data,~~
Set up airnow api and functionality
Seperate get endpoints to send weather and news data seperatly,
Implement meaningcloud API for news article summary and anaylisis,
Add conditional styles to weather/news buttons when active,
Add nighttime color styling and ability to switch automatically based on local time



## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Start server to serve index.html and css/js frontend with custom API

```sh
npm run serve
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
