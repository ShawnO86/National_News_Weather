import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretRight, faSun, faCloud, faCloudSunRain, faSnowflake, faIcicles, faCloudBolt, faHurricane, faWind, faTornado, faSmog, faTemperatureArrowUp, faTemperatureArrowDown, faCloudSun, faMoon, faCloudMoon, faCloudMoonRain } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretRight, faSun, faCloud, faCloudSunRain, faSnowflake, faIcicles, faCloudBolt, faHurricane, faWind, faTornado, faSmog, faTemperatureArrowUp, faTemperatureArrowDown, faCloudSun, faMoon, faCloudMoon, faCloudMoonRain);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
